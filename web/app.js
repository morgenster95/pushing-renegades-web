/*
  Vykreslení webu. Texty, sportovci a fotky jsou v content.js – tady je jen šablona a chování.
  Podstránky běží přes parametry URL: ?page=athletes, ?page=media, ?athlete=<slug>, ?project=<slug>, &lang=en
*/
const C = window.CONTENT;
const athletes = C.athletes;
const projects = C.projects || [];

const params = new URLSearchParams(location.search);
let lang = params.get('lang') === 'en' ? 'en' : 'cs';
let athlete = athletes.findIndex(a => a.slug === params.get('athlete'));
let project = athlete >= 0 ? -1 : projects.findIndex(p => p.slug === params.get('project'));
let page = ['athletes', 'media'].includes(params.get('page')) ? params.get('page') : 'home';
let motionOff = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- pomocníci ---------- */
const en = () => lang === 'en';
const t = (cs, enText) => en() ? enText : cs;
// Text z content.js: buď prostý řetězec, nebo { cs, en }.
const L = value => value && typeof value === 'object' && !Array.isArray(value) ? (value[lang] ?? value.cs) : value;
const pad = n => String(n).padStart(2, '0');
// Čísla sekcí (01 / …) se doplní až podle pořadí ve výsledné stránce.
const NUM = '%%N%%';
const numbered = html => { let n = 0; return html.replace(/%%N%%/g, () => pad(++n)); };
const bySlug = slug => athletes.findIndex(a => a.slug === slug);

const url = (i = -1, hash = '') => `?lang=${lang}${i >= 0 ? '&athlete=' + athletes[i].slug : ''}${hash ? '#' + hash : ''}`;
const rosterUrl = () => `?lang=${lang}&page=athletes`;
const pageUrl = name => `?lang=${lang}&page=${name}`;
const projectUrl = (k, hash = '') => `?lang=${lang}&project=${projects[k].slug}${hash ? '#' + hash : ''}`;
const currentUrl = () => athlete >= 0 ? url(athlete) : project >= 0 ? projectUrl(project) : page !== 'home' ? pageUrl(page) : url();
// Odkaz z content.js: '?athlete=x' / '?project=x' dostane jazyk, ostatní odkazy zůstanou.
const link = u => u && u.startsWith('?') ? `?lang=${lang}&${u.slice(1)}` : u;
// Štítek MOCKUP u položek s draft: true (vypíná brand.showDrafts v content.js).
const draftTag = o => o && o.draft && C.brand && C.brand.showDrafts ? '<span class="draft-tag">MOCKUP</span>' : '';
const img = (src, alt, loading = 'lazy', cls = '') => `<img src="${src}" alt="${alt}" loading="${loading}"${cls ? ` class="${cls}"` : ''}>`;
const button = (text, href, ghost = false) => `<a class="button ${ghost ? 'ghost' : ''}" href="${href}">${text}<span aria-hidden="true">↗</span></a>`;
const anyIllustrative = list => list.some(a => a.illustrative);

/* ---------- navigace ---------- */
// Logo agentury: brand.logo (SVG) v content.js, jinak textový nápis.
const wordmark = () => `<a class="wordmark${C.brand && C.brand.logo ? ' has-logo' : ''}" href="${url()}" aria-label="Pushing Renegades — ${t('úvod', 'home')}">${C.brand && C.brand.logo ? `<img class="brand-logo" src="${C.brand.logo}" alt="Pushing Renegades">` : 'PUSHING<br>RENEGADES<b>↗</b>'}</a>`;
function nav() {
  const links = `<a href="${rosterUrl()}">${t('Sportovci', 'Athletes')}</a><a href="${url(-1, 'projects')}">${t('Projekty', 'Projects')}</a><a href="${url(-1, 'services')}">${t('Co děláme', 'What we do')}</a><a href="${pageUrl('media')}">${t('Média', 'Press')}</a>`;
  return `<header class="site-nav">
    ${wordmark()}
    <nav id="main-nav" aria-label="${t('Hlavní navigace', 'Main navigation')}">${links}<a class="nav-cta" href="#contact">${t('Pojďme do toho', 'Let’s make moves')} ↗</a></nav>
    <div class="nav-tools">
      <button id="language" aria-label="${en() ? 'Switch to Czech' : 'Přepnout do angličtiny'}">${en() ? 'CS' : 'EN'}</button>
      <button id="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="${t('Otevřít menu', 'Open menu')}"><span></span><span></span></button>
    </div>
  </header>`;
}

/* ---------- scéna: pozadí, slovo, postava, prach (karusel i profil) ---------- */
// Slovo, pozadí a výřez se berou z „hero“ sportovce; položka karuselu je může přepsat.
const sceneOf = f => ({ ...((athletes[bySlug(f.athlete)] || {}).hero || {}), ...f });

function sceneLayers(sc, alt, loading = 'eager') {
  return `<div class="cinema-orbit" aria-hidden="true"></div>
      <div class="scene-background">${img(sc.background, '', 'eager')}</div>
      <div class="scene-rays" aria-hidden="true"></div>
      <div class="scene-shade"></div>
      <div class="scene-fog" aria-hidden="true"><i></i><i></i></div>
      <div class="scene-lines" aria-hidden="true"></div>
      <div class="scene-word" aria-hidden="true">${sc.word || ''}</div>
      ${sc.cutout ? `<div class="scene-figure">${img(sc.cutout, alt, loading)}</div>` : ''}
      <div class="scene-grit" aria-hidden="true"></div>`;
}

/* ---------- úvodní karusel ---------- */
function hero() {
  const figureAlt = f => f.illustrative ? t('Ilustrační AI postava, nejde o fotografii uvedeného sportovce', 'Illustrative AI figure, not a photograph of the named athlete') : f.title;
  const featured = C.featured.map(sceneOf);
  const slides = featured.map((f, k) => `<article class="depth-slide ${k === 0 ? 'is-current' : ''}" data-slide="${k}" aria-roledescription="slide" aria-label="${k + 1} / ${featured.length} — ${f.title}" ${k ? 'inert aria-hidden="true"' : 'aria-hidden="false"'}>
      ${sceneLayers(f, figureAlt(f), k ? 'lazy' : 'eager')}
      <div class="scene-copy"><span class="scene-index">${pad(k + 1)} / THE RENEGADES</span><h2>${f.title}</h2>${button(t('Otevřít profil', 'Explore profile'), url(bySlug(f.athlete)))}</div>
      ${f.illustrative ? `<span class="scene-caption">${t('AI ILUSTRACE · SKUTEČNÉ FOTKY DOPLNÍME', 'AI ILLUSTRATION · REAL PHOTOS TO FOLLOW')}</span>` : ''}
      <span class="scene-cross" aria-hidden="true">+</span>
    </article>`).join('');
  const tabs = featured.map((f, k) => `<button class="carousel-tab ${k === 0 ? 'selected' : ''}" data-select="${k}" aria-pressed="${k === 0}"><small>${pad(k + 1)}</small><span>${f.word}</span><i></i></button>`).join('');
  return `<section class="showcase cinematic" aria-roledescription="carousel" aria-label="${t('Hlavní sportovci', 'Featured athletes')}" tabindex="0">
    <div class="showcase-head">
      <div><span class="eyebrow">${L(C.home.heroEyebrow)}</span><h1>${L(C.home.heroTitle)}</h1></div>
      <p>${L(C.home.heroText)}</p>
      <button id="push-depth" aria-pressed="false"><span>PUSH ↗</span><small>${t('ROZBIJ RÁM', 'BREAK THE FRAME')}</small></button>
    </div>
    <div class="depth-stage">${slides}</div>
    <div class="carousel-controls">
      <div class="carousel-tabs" role="group" aria-label="${t('Vybrat sportovce', 'Select an athlete')}">${tabs}</div>
      <div class="carousel-arrows"><button data-step="-1" aria-label="${t('Předchozí sportovec', 'Previous athlete')}">←</button><button data-step="1" aria-label="${t('Další sportovec', 'Next athlete')}">→</button><button class="pause-carousel" aria-label="${t('Pozastavit automatické přehrávání', 'Pause autoplay')}">Ⅱ</button></div>
    </div>
    <div class="interaction-hint"><span>${t('POHYB MYŠÍ / TAŽENÍ NA MOBILU', 'MOVE YOUR CURSOR / SWIPE ON MOBILE')}</span><span>${L(C.home.heroDisciplines)}</span></div>
  </section>${tape()}`;
}

function tape() {
  const group = C.home.tape.map(s => `<span>${L(s)}</span>`).join('');
  const track = `<div class="tape-track"><div>${group}</div><div aria-hidden="true">${group}</div></div>`;
  return `<div class="tapes"><div class="motion-tape">${track}</div><div class="motion-tape second">${track}</div></div>`;
}

/* ---------- karta sportovce ---------- */
function card(i) {
  const a = athletes[i];
  const src = a.cardPhoto || a.photo;
  const alt = a.illustrative
    ? (a.cardCutout ? t('Ilustrační AI portrét, nejde o skutečnou podobu sportovce', 'Illustrative AI portrait, not the actual athlete') : t('Ilustrační fotografie přírody a outdooru — nejde o portrét sportovce', 'Illustrative outdoor photography — not an athlete portrait'))
    : a.name;
  return `<a class="athlete" href="${url(i)}"${a.accent ? ` style="--accent:${a.accent}"` : ''}>
    <div class="picture">${img(src, alt, 'lazy', a.cardCutout ? 'roster-portrait' : '')}<span class="number">RENEGADE / ${pad(i + 1)}${a.sport ? ' · ' + L(a.sport) : ''}</span><span class="arrow" aria-hidden="true">↗</span></div>
    <div class="caption"><h3>${a.name}</h3><small>${t('Poznej příběh', 'Explore the story')} ↗</small></div>
  </a>`;
}

/* ---------- hlavní stránka ---------- */
function home() {
  const h = C.home;
  const homeList = C.homeAthletes.map(bySlug).filter(i => i >= 0);
  const num = () => NUM;
  const pillars = has(h.pillars) ? `<dl class="pillars">${h.pillars.map(x => `<div><dt>${L(x.label)}${draftTag(x)}</dt><dd>${L(x.text)}</dd></div>`).join('')}</dl>` : '';
  const featuredProjects = projects.map((p, k) => p.featured ? k : -1).filter(k => k >= 0);
  const otherProjects = projects.map((p, k) => p.featured ? -1 : k).filter(k => k >= 0);
  const projectsSection = projects.length ? `<section id="projects" class="section projects-section">
    <div class="section-head"><div><span class="eyebrow">${num()} / ${t('Projekty', 'Projects')}</span><h2>${L(h.projects.title)}</h2></div><p>${L(h.projects.text)}</p></div>
    ${featuredProjects.length ? `<div class="project-grid">${featuredProjects.map(k => projectCard(k)).join('')}</div>` : ''}
    ${otherProjects.length ? `<div class="project-rows">${otherProjects.map(projectRow).join('')}</div>` : ''}
  </section>` : '';
  const partners = C.partners && has(C.partners.tiers) ? partnersSection(C.partners.tiers, `${num()} / ${t('Partneři', 'Partners')}`, L(C.partners.title), L(C.partners.text), 'partners') : '';
  const news = has(C.news) ? newsSection(C.news.slice(0, 4), `${num()} / ${t('Aktuality', 'News')}`) : '';
  return `${hero()}
  <section id="approach" class="section manifesto">
    <div><span class="eyebrow">${num()} / ${L(h.stance.eyebrow)}</span><div class="pr-stamp">PR<span>↗</span></div><p class="pr-lines">PUBLIC RELATIONS<br>PERSONAL RECORDS<br>PUSHING RENEGADES</p></div>
    <div><div class="finish-line"><h2 class="finish-title">${L(h.stance.title).split('<br>').map((line, i) => `<span style="--i:${i}">${line}</span>`).join('')}</h2></div>${L(h.stance.paragraphs).map(p => `<p>${p}</p>`).join('')}${pillars}</div>
  </section>
  ${C.film ? filmBand(C.film, 'home') : ''}
  <section id="athletes" class="section">
    <div class="section-head"><div><span class="eyebrow">${num()} / THE RENEGADES</span><h2>${L(h.renegades.title)}</h2></div><p>${L(h.renegades.text)}</p></div>
    <div class="athletes">${homeList.map(card).join('')}</div>
    <div class="roster-link">${button(t('Všichni sportovci', 'All athletes'), rosterUrl(), true)}</div>
    ${anyIllustrative(homeList.map(i => athletes[i])) ? `<p class="note">${t('Fotografie jsou ilustrační a nezobrazují uvedené sportovce.', 'Photographs are illustrative and do not depict the listed athletes.')}</p>` : ''}
  </section>
  ${projectsSection}
  <section id="services" class="section services">
    <div><span class="eyebrow">${num()} / THE PUSH</span><h2>${L(h.services.title)}</h2></div>
    <div>${h.services.items.map((s, i) => `<div class="service"><small>${pad(i + 1)}</small><div><h3>${L(s.title)}</h3><p>${L(s.text)}</p></div></div>`).join('')}</div>
  </section>
  ${partners}${news}
  <div class="landscape">${img(h.landscape.image, L(h.landscape.alt))}<p>${L(h.landscape.text)}</p></div>
  ${contact()}`;
}

/* ---------- projekty: karta, řádek ---------- */
function projectCard(k) {
  const p = projects[k];
  return `<a class="athlete project-card" href="${projectUrl(k)}"${p.accent ? ` style="--accent:${p.accent}"` : ''}>
    <div class="picture">${img(p.hero.background, '', 'lazy')}<span class="project-word" aria-hidden="true">${p.hero.word || p.title}</span><span class="number">${L(p.kicker)}${draftTag(p)}</span><span class="arrow" aria-hidden="true">↗</span></div>
    <div class="caption"><h3>${p.title}</h3><small>${t('Detail projektu', 'Explore project')} ↗</small></div>
    ${p.tagline ? `<p class="project-tagline">${L(p.tagline)}</p>` : ''}
  </a>`;
}
function projectRow(k) {
  const p = projects[k];
  return `<a class="project-row" href="${projectUrl(k)}"><small>${L(p.kicker)}${draftTag(p)}</small><h3>${p.title}</h3><p>${L(p.tagline) || ''}</p><span class="arrow" aria-hidden="true">↗</span></a>`;
}

/* ---------- loga partnerů ----------
   Každé logo sedí ve stejně vysokém rámečku. Po načtení se výška dorovná podle poměru stran
   (široká loga se zmenší, čtvercová zvětší), aby všechna působila stejně velká. Viz README → Loga partnerů. */
function logoItem(p) {
  const name = L(p.name) || '';
  const inner = p.logo
    ? `<img class="logo-img${p.color ? ' logo-color' : ''}" src="${p.logo}" alt="${name}" loading="lazy">`
    : `<span class="logo-placeholder"><b>LOGO</b><small>${name}</small></span>`;
  return p.url
    ? `<li><a class="logo-slot" href="${p.url}" target="_blank" rel="noopener" title="${name}">${inner}</a></li>`
    : `<li><span class="logo-slot" title="${name}">${inner}</span></li>`;
}
const logoWall = (items, tier = 'partner') => `<ul class="logo-wall logo-${tier}">${items.map(logoItem).join('')}</ul>`;
const tierBlocks = tiers => tiers.filter(x => has(x.items)).map(x => `<div class="logo-tier"><span class="eyebrow">${L(x.title)}</span>${logoWall(x.items, x.tier)}</div>`).join('');

function partnersSection(tiers, eyebrow, title, text, id) {
  const blocks = tierBlocks(tiers || []);
  if (!blocks) return '';
  return `<section${id ? ` id="${id}"` : ''} class="section partners-section">
    <div class="section-head"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2></div>${text ? `<p>${text}</p>` : ''}</div>
    ${blocks}
  </section>`;
}

// Partneři sportovce: ploché pole s tier 'main' / 'partner' / 'media' → skupiny.
function athleteTiers(list) {
  const pick = tier => list.filter(p => (p.tier || 'partner') === tier);
  return [
    { tier: 'general', title: { cs: 'Hlavní partner', en: 'Main partner' }, items: pick('main') },
    { tier: 'partner', title: { cs: 'Partneři', en: 'Partners' }, items: pick('partner') },
    { tier: 'media', title: { cs: 'Mediální partneři', en: 'Media partners' }, items: pick('media') }
  ];
}

function initLogos() {
  document.querySelectorAll('.logo-img').forEach(el => {
    const fit = () => {
      if (!el.naturalWidth) return;
      const ratio = el.naturalWidth / el.naturalHeight;
      el.style.setProperty('--k', Math.min(1.3, Math.max(.55, Math.sqrt(2.4 / ratio))).toFixed(3));
    };
    if (el.complete) fit(); else el.addEventListener('load', fit, { once: true });
  });
}

/* ---------- video pás (úvodní spot / video projektu) ---------- */
function filmBand(f, key) {
  const ready = f.video || f.videoVertical;
  return `<section class="film-band">
    <div class="film-frame">
      ${img(f.poster, '', 'lazy')}<div class="film-shade" aria-hidden="true"></div>
      <div class="film-copy">
        <span class="eyebrow">${L(f.eyebrow) || 'VIDEO'}${draftTag(f)}</span>
        ${(f.lines || []).map(l => `<p>${L(l)}</p>`).join('')}
        ${f.claim ? `<h2>${L(f.claim)}</h2>` : ''}
      </div>
      <button class="film-play" data-action="film" data-film="${key}" aria-label="${t('Přehrát video', 'Play video')}"><span aria-hidden="true">▷</span><small>${ready ? t('Přehrát', 'Play') : (L(f.premiere) || t('Video připravujeme', 'Coming soon'))}</small></button>
    </div>
  </section>`;
}

/* ---------- aktuality ---------- */
function newsSection(items, eyebrow) {
  return `<section class="section news-section">
    <div class="section-head"><div><span class="eyebrow">${eyebrow}</span><h2>${t('Co je<br>nového.', 'What’s<br>new.')}</h2></div></div>
    <ul class="news-grid">${items.map(x => {
      const body = `<small>${L(x.date)}${draftTag(x)}</small><h3>${L(x.title)}</h3>${x.text ? `<p>${L(x.text)}</p>` : ''}${x.url ? '<span class="arrow" aria-hidden="true">↗</span>' : ''}`;
      return `<li>${x.url ? `<a href="${link(x.url)}">${body}</a>` : `<div>${body}</div>`}</li>`;
    }).join('')}</ul>
  </section>`;
}

/* ---------- sekce Pro partnery (sportovec i projekt) ---------- */
function offerSection(o, eyebrow, buttonLabel) {
  if (!o) return '';
  return `<section id="partners" class="section partner-offer">
    <div><span class="eyebrow">${eyebrow}</span><h2>${t('Pojďme do toho<br>spolu.', 'Let’s do this<br>together.')}</h2>
      ${has(o.reach) ? `<dl class="reach">${o.reach.map(r => `<div><dt>${L(r.value)}</dt><dd>${L(r.label)}</dd></div>`).join('')}</dl>` : ''}</div>
    <div><p class="offer-text">${L(o.text)}</p>
      <ul class="offer-list">${(L(o.items) || []).map(x => `<li>${x}</li>`).join('')}</ul>
      ${button(buttonLabel || t('Poptat spolupráci', 'Request a partnership'), '#contact')}</div>
  </section>`;
}

/* ---------- Moje cesta / příběh ---------- */
function storySection(story, eyebrow, photo, alt) {
  if (!story) return '';
  const head = `<span class="eyebrow">${eyebrow}</span><h2>${L(story.title)}</h2>`;
  const paras = (L(story.paragraphs) || []).map(p => `<p>${p}</p>`).join('');
  const quote = story.quote ? `<blockquote>„${L(story.quote)}“</blockquote>` : '';
  return photo
    ? `<section class="section story story-with-photo">
    <figure class="story-photo">${img(photo, alt)}</figure>
    <div class="story-text">${head}${paras}${quote}</div>
  </section>`
    : `<section class="section story">
    <div>${head}${quote}</div>
    <div>${paras}</div>
  </section>`;
}

/* ---------- podstránka projektu ---------- */
function projectPage(k) {
  const p = projects[k];
  const next = (k + 1) % projects.length;
  const num = () => NUM;
  const stats = has(p.stats) ? `<section class="profile-stats-band"><dl class="profile-stats">${p.stats.map(s => `<div><dt>${L(s.value)}</dt><dd>${L(s.label)}</dd></div>`).join('')}</dl></section>` : '';
  const team = has(p.team) ? timeline({
    title: { cs: 'Kdo za tím<br>stojí.', en: 'Who’s<br>behind it.' },
    items: p.team.map(m => {
      const i = m.athlete ? bySlug(m.athlete) : -1;
      return { label: i >= 0 ? `<a href="${url(i)}">${m.name} ↗</a>` : m.name, title: m.role, detail: m.detail };
    })
  }, `${num()} / ${t('Tým', 'Team')}`, 'team') : '';
  const story = storySection(p.story, `${num()} / ${t('Příběh', 'The story')}`);
  const plan = p.timeline ? timeline(p.timeline, `${num()} / ${t('Plán', 'The plan')}`) : '';
  const offer = offerSection(p.offer, `${num()} / ${t('Pro partnery', 'For partners')}`, t('Chci být partnerem', 'Become a partner'));
  const partners = partnersSection(p.partners, `${num()} / ${t('Partneři projektu', 'Project partners')}`, t('S kým<br>to táhneme.', 'Who we<br>push with.'), '', 'project-partners');
  const cta = p.offer ? '#partners' : '#contact';
  return `<div class="athlete-profile project-page"${p.accent ? ` style="--accent:${p.accent}"` : ''}>
  <div class="profile-back"><a class="eyebrow" href="${url(-1, 'projects')}">← ${t('Všechny projekty', 'All projects')}</a><span class="eyebrow">${t('PROJEKT', 'PROJECT')} / ${pad(k + 1)} / ${pad(projects.length)}${draftTag(p)}</span></div>
  <section class="profile-stage cinematic${p.hero.cutout ? '' : ' no-figure'}" aria-label="${p.title}">
    <div class="depth-stage"><div class="depth-slide is-current">
      ${sceneLayers(p.hero, p.title)}
      <div class="scene-copy profile-scene-copy">
        <span class="scene-index">${L(p.kicker)}</span>
        <h1>${p.title}</h1>
        ${p.tagline ? `<p>${L(p.tagline)}</p>` : ''}
        <div class="profile-actions">${button(p.offer ? t('Partnerství', 'Partnership') : t('Mám zájem', 'I’m interested'), cta)}</div>
      </div>
      ${p.illustrative ? `<span class="scene-caption">${t('ILUSTRAČNÍ FOTO', 'ILLUSTRATIVE PHOTO')}</span>` : ''}
      <span class="scene-cross" aria-hidden="true">+</span>
    </div></div>
  </section>
  ${stats}${story}${plan}${team}
  ${p.video ? filmBand({ eyebrow: { cs: 'Video', en: 'Video' }, premiere: { cs: 'Video připravujeme', en: 'Coming soon' }, ...p.video }, 'project') : ''}
  ${offer}${partners}
  ${contact(L(p.inquiry))}
  ${projects.length > 1 ? `<section class="section next-athlete"><span class="eyebrow">${t('DALŠÍ PROJEKT', 'NEXT PROJECT')}</span>${button(projects[next].title, projectUrl(next), true)}</section>` : ''}
  </div>`;
}

/* ---------- média ---------- */
function mediaPage() {
  const m = C.media;
  const num = () => NUM;
  const press = has(m.press) ? timeline({
    title: { cs: 'Tiskové<br>zprávy.', en: 'Press<br>releases.' },
    items: m.press.map(x => ({ label: x.date, title: { cs: L(x.title) + draftTag(x), en: L(x.title) + draftTag(x) }, detail: L(x.text) + (x.file ? ` <a class="inline-link" href="${x.file}" download>${t('Stáhnout PDF', 'Download PDF')} ↗</a>` : '') }))
  }, `${num()} / ${t('Tiskové zprávy', 'Press releases')}`, 'press') : '';
  const c = m.contact;
  const kit = c || m.kit ? `<section class="section partner-offer media-contact">
    <div><span class="eyebrow">${num()} / ${L(c.name)}${draftTag(c)}</span><h2>${t('Napište<br>nám.', 'Get in<br>touch.')}</h2>
      <p class="offer-text">${L(c.text)}</p><a class="media-email" href="mailto:${c.email}">${c.email} ↗</a></div>
    <div><p class="offer-text"><strong>PRESS KIT</strong></p>
      <ul class="offer-list">${(L(m.kit.items) || []).map(x => `<li>${x}</li>`).join('')}</ul>
      ${m.kit.file ? button(t('Stáhnout press kit', 'Download press kit'), m.kit.file) : button(t('Press kit připravujeme · napište si o něj', 'Press kit coming soon · ask for it'), '#contact')}</div>
  </section>` : '';
  const faq = has(m.faq) ? `<section class="section faq-section">
    <div class="section-head"><div><span class="eyebrow">${num()} / FAQ</span><h2>${t('Časté<br>otázky.', 'Frequently<br>asked.')}</h2></div></div>
    <div class="faq">${m.faq.map(x => `<details><summary>${L(x.q)}${draftTag(x)}<span aria-hidden="true">+</span></summary><p>${L(x.a)}</p></details>`).join('')}</div>
  </section>` : '';
  return `<section class="section roster-page media-page">
    <div class="roster-heading"><div><span class="eyebrow">MEDIA / PRESS</span><h1>${L(m.title)}</h1></div><p>${L(m.text)}</p></div>
  </section>
  ${press}${kit}${faq}
  ${contact('', 'media')}`;
}

/* ---------- všichni sportovci ---------- */
function rosterPage() {
  return `<section class="section roster-page">
    <div class="roster-heading"><div><span class="eyebrow">THE RENEGADES / ${pad(athletes.length)}</span><h1>${L(C.roster.title)}</h1></div><p>${L(C.roster.text)}</p></div>
    <div class="roster-toolbar"><label for="athlete-search">${t('NAJDI SVÉHO RENEGÁDA', 'FIND YOUR RENEGADE')}</label><input id="athlete-search" type="search" placeholder="${t('Hledat podle jména…', 'Search by name…')}" autocomplete="off"><span id="roster-count" role="status">${athletes.length} / ${athletes.length}</span></div>
    <div class="athletes" id="full-roster">${athletes.map((_, i) => card(i)).join('')}</div>
    <p id="roster-empty" hidden>${t('Žádné jméno neodpovídá hledání. Zkus jiné nebo hledání vymaž.', 'No matching names. Try another name or clear the search.')}</p>
    ${anyIllustrative(athletes) ? `<p class="note">${t('Fotografie jsou ilustrační. Finální portréty sportovců doplníme.', 'Images are illustrative. Final athlete portraits will be added.')}</p>` : ''}
  </section>${contact()}`;
}

/* ---------- profil sportovce ---------- */
// Sekce profilu se vykreslí jen tehdy, když pro ni má sportovec v content.js data.
const has = list => Array.isArray(list) && list.length > 0;

function timeline(block, eyebrow, cls = '') {
  if (!block || !has(block.items)) return '';
  return `<section class="section profile-timeline ${cls}">
    <div class="section-head"><div><span class="eyebrow">${eyebrow}</span><h2>${L(block.title)}</h2></div>${block.intro ? `<p>${L(block.intro)}</p>` : ''}</div>
    <ol class="timeline">${block.items.map(item => `<li><span class="timeline-label">${L(item.label)}</span><div><h3>${L(item.title)}</h3><p>${L(item.detail)}</p></div></li>`).join('')}</ol>
  </section>`;
}

/* Ikony úspěchů: tahové SVG v barvě sportovce, při odhalení se „nakreslí“ (pathLength=1). */
const ICONS = {
  medal: r => `<polyline pathLength="1" points="20,4 29,24"/><polyline pathLength="1" points="44,4 35,24"/><circle pathLength="1" cx="32" cy="40" r="17"/><text x="32" y="47" text-anchor="middle">${r}</text>`,
  summit: () => `<polyline pathLength="1" points="4,58 24,24 32,36 40,26 60,58 4,58"/><polyline pathLength="1" points="24,24 24,4 40,9 24,14"/>`,
  flag: () => `<polyline pathLength="1" points="14,60 14,4"/><path pathLength="1" d="M14 6 C24 0 34 14 50 6 L50 30 C34 38 24 24 14 30"/>`,
  hold: () => `<path pathLength="1" d="M12 40 C8 24 22 10 37 13 C52 16 58 31 51 43 C44 55 17 55 12 40"/><circle pathLength="1" cx="34" cy="31" r="5"/>`,
  time: () => `<circle pathLength="1" cx="32" cy="37" r="21"/><polyline pathLength="1" points="26,4 38,4"/><polyline pathLength="1" points="32,4 32,16"/><polyline pathLength="1" points="32,37 32,24 "/><polyline pathLength="1" points="32,37 42,42"/>`,
  finish: () => `<path pathLength="1" d="M8 60 L8 22 Q32 2 56 22 L56 60"/><polyline pathLength="1" points="8,30 56,30"/><polyline pathLength="1" points="16,46 26,46"/><polyline pathLength="1" points="38,46 48,46"/>`,
  streak: () => `<polyline pathLength="1" points="8,14 22,32 8,50"/><polyline pathLength="1" points="25,14 39,32 25,50"/><polyline pathLength="1" points="42,14 56,32 42,50"/>`,
  star: () => `<polygon pathLength="1" points="32,4 40,24 61,24 44,37 50,58 32,45 14,58 20,37 3,24 24,24"/>`
};

function achievementIcon(x) {
  const value = String(L(x.value) || '');
  const text = `${L(x.title) || ''} ${L(x.detail) || ''}`.toLowerCase();
  const rank = (value.match(/^([1-3])\.$/) || text.match(/\b([1-3])\. (?:místo|place)/) || [])[1];
  let kind = x.icon;
  if (!kind) {
    if (/prvopřelez|first ascent/.test(text)) kind = 'summit';
    else if (/první|first/.test(text)) kind = 'flag';
    else if (rank) kind = 'medal';
    else if (/finisher/.test(text) || /^\d+\.$/.test(value)) kind = 'finish';
    else if (/\d:\d\d/.test(value)) kind = 'time';
    else if (/^\d[abc]/i.test(value)) kind = 'hold';
    else if (/×/.test(value)) kind = 'streak';
    else kind = 'star';
  }
  const svg = (ICONS[kind] || ICONS.star)(rank || '1');
  return { kind, rank, svg: `<svg class="achv-icon" viewBox="0 0 64 64" aria-hidden="true">${svg}</svg>` };
}

function profile(i) {
  const a = athletes[i];
  const next = (i + 1) % athletes.length;
  const num = () => NUM;

  const socials = has(a.socials)
    ? `<div class="socials">${a.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</div>`
    : '';
  const stats = has(a.stats)
    ? `<dl class="profile-stats">${a.stats.map(s => `<div><dt>${L(s.value)}</dt><dd>${L(s.label)}</dd></div>`).join('')}</dl>`
    : '';

  const storyPhoto = a.hero && a.photo; // portrét je v úvodu jen tehdy, když sportovec nemá scénu
  const story = a.story ? storySection(a.story, `${num()} / ${t('Moje cesta', 'My journey')}`, storyPhoto ? a.photo : null, a.name) : '';
  const values = a.values && has(a.values.items) ? timeline(a.values, `${num()} / ${t('Mise a hodnoty', 'Mission & values')}`) : '';

  const achievements = has(a.achievements) ? `<section class="section achievements">
    <div class="section-head"><div><span class="eyebrow">${num()} / ${t('Úspěchy', 'Achievements')}</span><h2>${t('Výsledky,<br>které mluví.', 'Results that<br>speak for themselves.')}</h2></div></div>
    <ul class="achievement-grid">${a.achievements.map(x => {
      const icon = achievementIcon(x);
      return `<li class="achv achv-${icon.kind}${icon.rank === '1' ? ' is-gold' : ''}"><span class="achv-ghost" aria-hidden="true">${L(x.value)}</span><div class="achv-top">${icon.svg}<strong>${L(x.value)}</strong></div><h3>${L(x.title)}</h3>${x.detail ? `<p>${L(x.detail)}</p>` : ''}</li>`;
    }).join('')}</ul>
  </section>` : '';

  const goals = a.goals && has(a.goals.items) ? timeline(a.goals, `${num()} / ${t('Cíle', 'Goals')}`) : '';
  const impact = a.impact && has(a.impact.items) ? timeline(a.impact, `${num()} / ${t('Mimo závody', 'Beyond racing')}`, 'impact') : '';

  const myProjects = projects.map((p, k) => (p.athletes || []).includes(a.slug) ? k : -1).filter(k => k >= 0);
  const projectBlock = myProjects.length ? `<section class="section projects-section">
    <div class="section-head"><div><span class="eyebrow">${num()} / ${t('Projekty', 'Projects')}</span><h2>${t('Víc než<br>závod.', 'More than<br>a race.')}</h2></div></div>
    <div class="project-grid">${myProjects.map(k => projectCard(k)).join('')}</div>
  </section>` : '';
  const offer = offerSection(a.partnerOffer, `${num()} / ${t('Pro partnery', 'For partners')}`);
  const partners = has(a.partners) ? partnersSection(athleteTiers(a.partners), `${num()} / ${t('Partneři', 'Partners')}`, t('Kdo mě<br>podporuje.', 'Who backs<br>me.'), '', 'athlete-partners') : '';

  const tiles = (a.video ? [{ video: true }] : []).concat(a.gallery || []);
  const gallery = has(tiles) ? `<section class="section">
    <div class="section-head"><div><span class="eyebrow">${num()} / ${t('Z terénu', 'From the field')}</span><h2>${t('Blíž skutečnosti.', 'Closer to the real thing.')}</h2></div></div>
    <div class="gallery">${tiles.map(g => g.video
      ? `<button data-action="video" aria-label="${t('Přehrát video', 'Play video')}">${img(a.gallery && a.gallery[0] ? a.gallery[0].src : a.photo, '')}<span class="play">▷</span></button>`
      : `<button data-action="photo" data-src="${g.src}" data-alt="${L(g.alt) || ''}" aria-label="${t('Zvětšit fotografii', 'Enlarge photograph')}">${img(g.src, L(g.alt) || '')}</button>`).join('')}</div>
  </section>` : '';

  const news = has(a.news) ? newsSection(a.news, `${num()} / ${t('Aktuality', 'News')}`) : '';

  const actions = `<div class="profile-actions">${socials}${button(t('Spolupráce', 'Partnership'), a.partnerOffer ? '#partners' : '#contact')}</div>`;
  const head = a.hero && a.hero.cutout ? `<div class="profile-back"><a class="eyebrow" href="${rosterUrl()}">← ${t('Všichni renegádi', 'All renegades')}</a><span class="eyebrow">RENEGADE / ${pad(i + 1)} / ${pad(athletes.length)}</span></div>
  <section class="profile-stage cinematic" aria-label="${a.name}">
    <div class="depth-stage"><div class="depth-slide is-current">
      ${sceneLayers(a.hero, a.name)}
      <div class="scene-copy profile-scene-copy">
        <span class="scene-index">${a.sport ? L(a.sport) : 'RENEGADE'}</span>
        <h1>${a.name}</h1>${a.nickname ? `<span class="nickname">„${a.nickname}“</span>` : ''}
        ${a.tagline ? `<p>${L(a.tagline)}</p>` : ''}
        ${actions}
      </div>
      <span class="scene-cross" aria-hidden="true">+</span>
    </div></div>
  </section>
  ${stats ? `<section class="profile-stats-band">${stats}</section>` : ''}` : '';

  return `<div class="athlete-profile"${a.accent ? ` style="--accent:${a.accent}"` : ''}>
  ${head || `<section class="profile-hero">
    <div class="profile-copy">
      <a class="eyebrow" href="${rosterUrl()}">← ${t('Všichni renegádi', 'All renegades')}</a>
      <div><small>RENEGADE / ${pad(i + 1)}${a.sport ? ' · ' + L(a.sport) : ''}</small>
        <h1>${a.name}</h1>${a.nickname ? `<span class="nickname">„${a.nickname}“</span>` : ''}
        ${a.tagline ? `<p>${L(a.tagline)}</p>` : ''}</div>
      ${stats}
      ${actions}
    </div>
    <div class="profile-image">${img(a.photo, a.name, 'eager')}${a.illustrative ? `<small>${t('ILUSTRAČNÍ SNÍMEK · PORTRÉT K DOPLNĚNÍ', 'ILLUSTRATIVE IMAGE · PORTRAIT TO BE ADDED')}</small>` : ''}</div>
  </section>`}
  ${story}${values}${achievements}${goals}${impact}${projectBlock}${offer}${partners}${gallery}${news}
  ${contact()}
  <section class="section next-athlete"><span class="eyebrow">${t('DALŠÍ RENEGADE', 'NEXT RENEGADE')}</span>${button(athletes[next].name, url(next), true)}</section>
  </div>`;
}

/* ---------- kontakt ---------- */
function contact(prefill = '', kind = 'brand') {
  return `<section id="contact" class="section contact contact-compact"><div class="contact-shell">
    <div class="contact-intro"><div><span class="eyebrow">LET’S PUSH TOGETHER ↗</span><h2>${L(C.contact.title)}</h2></div><p>${L(C.contact.text)}</p></div>
    <div class="contact-panel">${contactForm(prefill, kind)}</div>
  </div></section>`;
}

function contactForm(prefill = '', kind = 'brand') {
  const opt = (value, label) => `<label><input type="radio" name="kind" value="${value}"${value === kind ? ' checked' : ''}><span>${label} ↗</span></label>`;
  return `<form class="inquiry-form">
    <fieldset><legend>${t('JAK SE PROPOJÍME?', 'HOW CAN WE CONNECT?')}</legend><div class="inquiry-types">
      ${opt('brand', t('Jsem značka', 'I am a brand'))}
      ${opt('athlete', t('Jsem sportovec', 'I am an athlete'))}
      ${opt('media', t('Jsem z médií', 'I am press'))}
      ${opt('other', t('Něco jiného', 'Something else'))}
    </div></fieldset>
    <div class="form-grid">
      <label>${t('Tvoje jméno', 'Your name')} *<input name="name" autocomplete="name" required placeholder="${t('Jméno a příjmení', 'Full name')}"></label>
      <label>E-mail *<input type="email" name="email" autocomplete="email" required placeholder="you@example.com"></label>
      <label class="context-label"><span>${kind === 'media' ? t('Médium / redakce', 'Outlet / newsroom') : t('Značka / společnost', 'Brand / company')}</span><input name="context" autocomplete="organization" placeholder="${kind === 'media' ? t('Pro koho píšeš?', 'Who do you write for?') : t('Koho zastupuješ?', 'Who do you represent?')}"></label>
      <label>${t('Telefon', 'Phone')}<input name="phone" type="tel" autocomplete="tel" placeholder="+420"></label>
      <label class="form-wide">${t('Co spolu posuneme?', 'What can we push together?')} *<textarea name="message" required rows="4" placeholder="${t('Pár slov o tvém příběhu, nápadu nebo spolupráci…', 'A few words about your story, idea or partnership…')}">${prefill || (athlete >= 0 ? t('Mám zájem o spolupráci: ', 'I am interested in working with: ') + athletes[athlete].name + '.' : '')}</textarea></label>
    </div>
    <div class="form-bottom"><p>${t('Náhled formuláře · údaje se neukládají ani neodesílají.', 'Form preview · no data is saved or sent.')}</p><button class="button" type="submit">${t('Odeslat', 'Send')} ↗</button></div>
    <p class="form-status" role="status" tabindex="-1"></p>
  </form>`;
}

function footer() {
  const b = C.brand || {};
  const socials = has(b.socials) ? `<div class="socials">${b.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</div>` : '';
  return `<footer class="site-footer">
  <div class="footer-main">
    <div class="footer-brand">${wordmark()}<p>${L(C.footer.claim) || ''}</p></div>
    <nav class="footer-links" aria-label="${t('Patička', 'Footer')}"><a href="${rosterUrl()}">${t('Sportovci', 'Athletes')} ↗</a><a href="${url(-1, 'projects')}">${t('Projekty', 'Projects')} ↗</a><a href="${url(-1, 'partners')}">${t('Partneři', 'Partners')} ↗</a><a href="${pageUrl('media')}">${t('Média', 'Press')} ↗</a><a href="#contact">${t('Kontakt', 'Contact')} ↗</a></nav>
    <div class="footer-contact"><span class="eyebrow">${t('Kontakt', 'Contact')}${draftTag(b.socials && b.socials[0])}</span>${b.email ? `<a class="footer-email" href="mailto:${b.email}">${b.email}</a>` : ''}${socials}</div>
  </div>
  <div class="footer-bottom"><span>${L(C.footer.left)}</span><span>© ${new Date().getFullYear()} · ${L(C.footer.right)}</span>
    <span class="footer-tools"><button id="motion-toggle" aria-pressed="${!motionOff}">${motionOff ? t('POHYB: VYP', 'MOTION: OFF') : t('POHYB: ZAP', 'MOTION: ON')}</button><a href="#" data-action="credits">${t('Fotografie', 'Photography')} ↗</a></span></div>
  </footer>`;
}

/* ---------- vykreslení ---------- */
function render() {
  cleanupMotion();
  document.body.classList.toggle('motion-off', motionOff);
  document.documentElement.lang = lang;
  document.title = `${athlete >= 0 ? athletes[athlete].name + ' — ' : project >= 0 ? projects[project].title + ' — ' : page === 'athletes' ? t('Sportovci — ', 'Athletes — ') : page === 'media' ? t('Média — ', 'Press — ') : ''}Pushing Renegades`;
  const main = numbered(athlete >= 0 ? profile(athlete) : project >= 0 ? projectPage(project) : page === 'athletes' ? rosterPage() : page === 'media' && C.media ? mediaPage() : home());
  document.getElementById('app').innerHTML = nav() + `<main>${main}</main>` + footer();
  initLogos();
  initMotion();
}

/* ---------- modální okno ---------- */
function show(html) {
  document.getElementById('modalbody').innerHTML = html;
  document.getElementById('modal').showModal();
}
document.getElementById('close').onclick = () => document.getElementById('modal').close();
document.getElementById('modal').addEventListener('click', e => { if (e.target === e.currentTarget) e.currentTarget.close(); });
document.getElementById('modal').addEventListener('close', () => { document.getElementById('modalbody').innerHTML = ''; });

/* ---------- kliknutí ---------- */
document.addEventListener('click', e => {
  if (e.target.closest('#language')) {
    lang = en() ? 'cs' : 'en';
    history.replaceState(null, '', currentUrl());
    render();
    return;
  }
  if (e.target.closest('#motion-toggle')) { motionOff = !motionOff; render(); return; }

  const menu = e.target.closest('#menu-toggle');
  if (menu) {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-label', open ? t('Zavřít menu', 'Close menu') : t('Otevřít menu', 'Open menu'));
    document.querySelector('.site-nav').classList.toggle('menu-open', open);
    return;
  }
  if (e.target.closest('#main-nav a')) {
    document.querySelector('.site-nav').classList.remove('menu-open');
    document.getElementById('menu-toggle').setAttribute('aria-expanded', 'false');
  }

  const a = e.target.closest('[data-action]');
  if (!a) return;
  e.preventDefault();
  const action = a.dataset.action;
  const current = athlete >= 0 ? athletes[athlete] : null;
  if (action === 'photo') show(img(a.dataset.src, a.dataset.alt, 'eager'));
  if (action === 'video') {
    if (current && current.video) show(`<div class="video-frame"><iframe src="${current.video}" title="Video — ${current.name}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`);
    else show(`<small>VIDEO</small><h2 style="margin-top:25px">${t('Tady poběží<br>skutečný příběh.', 'The real story<br>will play here.')}</h2><p>${t('Video připravujeme.', 'The video is coming soon.')}</p>`);
  }
  if (action === 'film') {
    const f = a.dataset.film === 'project' && project >= 0 ? projects[project].video : C.film;
    const vertical = f.videoVertical && window.matchMedia('(max-width: 600px)').matches;
    const src = vertical ? f.videoVertical : f.video || f.videoVertical;
    if (src) show(`<div class="video-frame${vertical ? ' is-vertical' : ''}"><iframe src="${src}" title="Video — Pushing Renegades" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`);
    else show(`<small>VIDEO</small><h2 style="margin-top:25px">${t('Premiéra<br>se blíží.', 'Premiere<br>is coming.')}</h2><p>${L(f.premiere) || t('Video připravujeme.', 'The video is coming soon.')}</p>`);
  }
  if (action === 'credits') show(`<h2>${t('Fotografie', 'Photography')}</h2><p>${t('Fotografie sportovců pocházejí z jejich archivů a od fotografů jednotlivých závodů. Krajinné fotografie: Unsplash.', 'Athlete photographs come from the athletes’ own archives and race photographers. Landscape photography: Unsplash.')}</p><p><a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash ↗</a></p>`);
});

/* ---------- vyhledávání a formulář ---------- */
document.addEventListener('input', e => {
  if (e.target.id !== 'athlete-search') return;
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const q = norm(e.target.value);
  let count = 0;
  document.querySelectorAll('#full-roster .athlete').forEach((el, i) => {
    const match = norm(athletes[i].name).includes(q);
    el.hidden = !match;
    if (match) count++;
  });
  document.getElementById('roster-count').textContent = count + ' / ' + athletes.length;
  document.getElementById('roster-empty').hidden = count > 0;
});

document.addEventListener('change', e => {
  if (e.target.name !== 'kind') return;
  const f = e.target.closest('form');
  const isAthlete = e.target.value === 'athlete';
  const isMedia = e.target.value === 'media';
  f.querySelector('.context-label span').textContent = isAthlete ? t('Sport / disciplína', 'Sport / discipline') : isMedia ? t('Médium / redakce', 'Outlet / newsroom') : t('Značka / společnost', 'Brand / company');
  f.elements.context.placeholder = isAthlete ? t('Čemu se věnuješ?', 'What is your sport?') : isMedia ? t('Pro koho píšeš?', 'Who do you write for?') : t('Koho zastupuješ?', 'Who do you represent?');
});

document.addEventListener('submit', e => {
  if (!e.target.matches('.inquiry-form')) return;
  e.preventDefault();
  const status = e.target.querySelector('.form-status');
  status.textContent = t('Vše je vyplněné správně. Formulář zatím není napojený — zpráva nebyla odeslána.', 'Everything is filled in correctly. The form is not connected yet — the message was not sent.');
  status.focus();
});

/* ---------- pohyb: karusel, parallax, postupné odhalení ---------- */
let motionCleanup = () => {};
function cleanupMotion() { motionCleanup(); }

function initMotion() {
  const cleanup = [];
  const stage = document.querySelector('.showcase');
  if (stage) {
    const slides = [...stage.querySelectorAll('.depth-slide')];
    const tabs = [...stage.querySelectorAll('.carousel-tab')];
    const pause = stage.querySelector('.pause-carousel');
    let current = 0, paused = motionOff, hover = false, focused = false, timer = null, startX = 0, startY = 0;
    const dust = !motionOff && typeof initDust === 'function' ? initDust(stage) : null;
    if (dust) cleanup.push(dust.cleanup);

    const labelPause = () => {
      pause.textContent = paused ? '▶' : 'Ⅱ';
      pause.setAttribute('aria-label', paused ? t('Spustit automatické přehrávání', 'Start autoplay') : t('Pozastavit automatické přehrávání', 'Pause autoplay'));
      pause.setAttribute('aria-pressed', paused);
    };
    const run = () => {
      clearInterval(timer);
      timer = null;
      const playing = !paused && !hover && !focused && !document.hidden;
      stage.classList.toggle('autoplay-on', playing);
      if (playing) timer = setInterval(() => select(current + 1), 6500);
    };
    const select = n => {
      current = (n + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-current', i === current);
        slide.inert = i !== current;
        slide.setAttribute('aria-hidden', i !== current);
      });
      tabs.forEach((tab, i) => {
        tab.classList.toggle('selected', i === current);
        tab.setAttribute('aria-pressed', i === current);
      });
      if (dust) dust.burst();
      run();
    };

    tabs.forEach((tab, i) => tab.onclick = () => select(i));
    stage.querySelectorAll('[data-step]').forEach(b => b.onclick = () => select(current + Number(b.dataset.step)));
    pause.onclick = () => { paused = !paused; labelPause(); run(); };
    labelPause();

    const depth = document.getElementById('push-depth');
    depth.onclick = () => {
      const expanded = !stage.classList.contains('depth-expanded');
      stage.classList.toggle('depth-expanded', expanded);
      depth.setAttribute('aria-pressed', expanded);
    };

    stage.addEventListener('pointerenter', () => { hover = true; run(); });
    stage.addEventListener('pointerleave', () => { hover = false; stage.style.setProperty('--mx', '0'); stage.style.setProperty('--my', '0'); run(); });
    stage.addEventListener('focusin', () => { focused = true; run(); });
    stage.addEventListener('focusout', e => { if (!stage.contains(e.relatedTarget)) { focused = false; run(); } });
    stage.addEventListener('pointermove', e => {
      if (motionOff || e.pointerType === 'touch') return;
      const r = stage.getBoundingClientRect();
      stage.style.setProperty('--mx', ((e.clientX - r.left) / r.width - .5).toFixed(3));
      stage.style.setProperty('--my', ((e.clientY - r.top) / r.height - .5).toFixed(3));
    });
    stage.addEventListener('touchstart', e => { startX = e.changedTouches[0].clientX; startY = e.changedTouches[0].clientY; }, { passive: true });
    stage.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX, dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3) select(current + (dx < 0 ? 1 : -1));
    }, { passive: true });
    stage.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); select(current + (e.key === 'ArrowRight' ? 1 : -1)); }
    });

    const visibility = () => run();
    document.addEventListener('visibilitychange', visibility);
    cleanup.push(() => { clearInterval(timer); document.removeEventListener('visibilitychange', visibility); });
    run();
  }

  const profileStage = document.querySelector('.profile-stage');
  if (profileStage) {
    const move = e => {
      if (motionOff || e.pointerType === 'touch') return;
      const r = profileStage.getBoundingClientRect();
      profileStage.style.setProperty('--mx', ((e.clientX - r.left) / r.width - .5).toFixed(3));
      profileStage.style.setProperty('--my', ((e.clientY - r.top) / r.height - .5).toFixed(3));
    };
    const leave = () => { profileStage.style.setProperty('--mx', '0'); profileStage.style.setProperty('--my', '0'); };
    profileStage.addEventListener('pointermove', move);
    profileStage.addEventListener('pointerleave', leave);
    const dust = !motionOff && typeof initDust === 'function' ? initDust(profileStage) : null;
    if (dust) cleanup.push(dust.cleanup);
  }

  // Čísla „naskáčou“ jako na časomíře, když se objeví na obrazovce.
  if (!motionOff && 'IntersectionObserver' in window) {
    const timers = [];
    const scramble = el => {
      const final = el.textContent;
      const start = performance.now(), duration = 900 + final.length * 40;
      const tick = now => {
        const p = Math.min(1, (now - start) / duration);
        const locked = Math.floor(p * final.length);
        el.textContent = [...final].map((ch, k) => k < locked || !/\d/.test(ch) ? ch : Math.floor(Math.random() * 10)).join('');
        if (p < 1) timers.push(requestAnimationFrame(tick)); else el.textContent = final;
      };
      timers.push(requestAnimationFrame(tick));
    };
    const counter = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { scramble(entry.target); counter.unobserve(entry.target); }
    }), { threshold: .6 });
    document.querySelectorAll('.profile-stats dt, .reach dt, .achv strong').forEach(el => counter.observe(el));
    cleanup.push(() => { counter.disconnect(); timers.forEach(cancelAnimationFrame); });
  }

  if (!motionOff && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    }), { threshold: .1 });
    document.querySelectorAll('.section-head,.service,.manifesto>div,.athlete,.achievement-grid li,.timeline li,.contact-shell>div,.logo-tier,.news-grid li,.project-row,.faq details,.film-copy').forEach((el, i) => {
      el.classList.add('reveal');
      el.style.setProperty('--reveal-delay', (i % 3) * 70 + 'ms');
      observer.observe(el);
    });
    cleanup.push(() => observer.disconnect());
  }
  if (!motionOff && typeof initFinishLine === 'function') {
    document.querySelectorAll('.finish-line').forEach(el => cleanup.push(initFinishLine(el)));
  }
  motionCleanup = () => cleanup.forEach(fn => fn());
}

render();
