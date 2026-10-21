/*
  Vykreslení webu. Texty, sportovci a fotky jsou v content.js – tady je jen šablona a chování.
  Podstránky běží přes parametry URL: ?page=athletes, ?athlete=<slug>, &lang=en
*/
const C = window.CONTENT;
const athletes = C.athletes;

const params = new URLSearchParams(location.search);
let lang = params.get('lang') === 'en' ? 'en' : 'cs';
let athlete = athletes.findIndex(a => a.slug === params.get('athlete'));
let page = params.get('page') === 'athletes' ? 'athletes' : 'home';
let motionOff = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- pomocníci ---------- */
const en = () => lang === 'en';
const t = (cs, enText) => en() ? enText : cs;
// Text z content.js: buď prostý řetězec, nebo { cs, en }.
const L = value => value && typeof value === 'object' && !Array.isArray(value) ? (value[lang] ?? value.cs) : value;
const pad = n => String(n).padStart(2, '0');
const bySlug = slug => athletes.findIndex(a => a.slug === slug);

const url = (i = -1, hash = '') => `?lang=${lang}${i >= 0 ? '&athlete=' + athletes[i].slug : ''}${hash ? '#' + hash : ''}`;
const rosterUrl = () => `?lang=${lang}&page=athletes`;
const img = (src, alt, loading = 'lazy', cls = '') => `<img src="${src}" alt="${alt}" loading="${loading}"${cls ? ` class="${cls}"` : ''}>`;
const button = (text, href, ghost = false) => `<a class="button ${ghost ? 'ghost' : ''}" href="${href}">${text}<span aria-hidden="true">↗</span></a>`;
const anyIllustrative = list => list.some(a => a.illustrative);

/* ---------- navigace ---------- */
function nav() {
  const links = `<a href="${rosterUrl()}">${t('Sportovci', 'Athletes')}</a><a href="${url(-1, 'approach')}">${t('Náš přístup', 'Our approach')}</a><a href="${url(-1, 'services')}">${t('Co děláme', 'What we do')}</a>`;
  return `<header class="site-nav">
    <a class="wordmark" href="${url()}" aria-label="Pushing Renegades — ${t('úvod', 'home')}">PUSHING<br>RENEGADES<b>↗</b></a>
    <nav id="main-nav" aria-label="${t('Hlavní navigace', 'Main navigation')}">${links}<a class="nav-cta" href="#contact">${t('Pojďme do toho', 'Let’s make moves')} ↗</a></nav>
    <div class="nav-tools">
      <button id="language" aria-label="${en() ? 'Switch to Czech' : 'Přepnout do angličtiny'}">${en() ? 'CS' : 'EN'}</button>
      <button id="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="${t('Otevřít menu', 'Open menu')}"><span></span><span></span></button>
    </div>
  </header>`;
}

/* ---------- úvodní karusel ---------- */
function hero() {
  const figureAlt = f => f.illustrative ? t('Ilustrační AI postava, nejde o fotografii uvedeného sportovce', 'Illustrative AI figure, not a photograph of the named athlete') : f.title;
  const slides = C.featured.map((f, k) => `<article class="depth-slide ${k === 0 ? 'is-current' : ''}" data-slide="${k}" aria-roledescription="slide" aria-label="${k + 1} / ${C.featured.length} — ${f.title}" ${k ? 'inert aria-hidden="true"' : 'aria-hidden="false"'}>
      <div class="cinema-orbit" aria-hidden="true"></div>
      <div class="scene-background">${img(f.background, '', 'eager')}</div>
      <div class="scene-rays" aria-hidden="true"></div>
      <div class="scene-shade"></div>
      <div class="scene-fog" aria-hidden="true"><i></i><i></i></div>
      <div class="scene-lines" aria-hidden="true"></div>
      <div class="scene-word" aria-hidden="true">${f.word}</div>
      <div class="scene-figure">${img(f.cutout, figureAlt(f), k ? 'lazy' : 'eager')}</div>
      <div class="scene-grit" aria-hidden="true"></div>
      <div class="scene-copy"><span class="scene-index">${pad(k + 1)} / THE RENEGADES</span><h2>${f.title}</h2>${button(t('Otevřít profil', 'Explore profile'), url(bySlug(f.athlete)))}</div>
      ${f.illustrative ? `<span class="scene-caption">${t('AI ILUSTRACE · SKUTEČNÉ FOTKY DOPLNÍME', 'AI ILLUSTRATION · REAL PHOTOS TO FOLLOW')}</span>` : ''}
      <span class="scene-cross" aria-hidden="true">+</span>
    </article>`).join('');
  const tabs = C.featured.map((f, k) => `<button class="carousel-tab ${k === 0 ? 'selected' : ''}" data-select="${k}" aria-pressed="${k === 0}"><small>${pad(k + 1)}</small><span>${f.word}</span><i></i></button>`).join('');
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
  return `<a class="athlete" href="${url(i)}">
    <div class="picture">${img(src, alt, 'lazy', a.cardCutout ? 'roster-portrait' : '')}<span class="number">RENEGADE / ${pad(i + 1)}</span><span class="arrow" aria-hidden="true">↗</span></div>
    <div class="caption"><h3>${a.name}</h3><small>${t('Poznej příběh', 'Explore the story')} ↗</small></div>
  </a>`;
}

/* ---------- hlavní stránka ---------- */
function home() {
  const h = C.home;
  const homeList = C.homeAthletes.map(bySlug).filter(i => i >= 0);
  return `${hero()}
  <section id="approach" class="section manifesto">
    <div><span class="eyebrow">01 / ${L(h.stance.eyebrow)}</span><div class="pr-stamp">PR<span>↗</span></div><p class="pr-lines">PUBLIC RELATIONS<br>PERSONAL RECORDS<br>PUSHING RENEGADES</p></div>
    <div><div class="finish-line"><h2 class="finish-title">${L(h.stance.title).split('<br>').map((line, i) => `<span style="--i:${i}">${line}</span>`).join('')}</h2></div>${L(h.stance.paragraphs).map(p => `<p>${p}</p>`).join('')}</div>
  </section>
  <section id="athletes" class="section">
    <div class="section-head"><div><span class="eyebrow">02 / THE RENEGADES</span><h2>${L(h.renegades.title)}</h2></div><p>${L(h.renegades.text)}</p></div>
    <div class="athletes">${homeList.map(card).join('')}</div>
    <div class="roster-link">${button(t('Všichni sportovci', 'All athletes'), rosterUrl(), true)}</div>
    ${anyIllustrative(homeList.map(i => athletes[i])) ? `<p class="note">${t('Fotografie jsou ilustrační a nezobrazují uvedené sportovce.', 'Photographs are illustrative and do not depict the listed athletes.')}</p>` : ''}
  </section>
  <section id="services" class="section services">
    <div><span class="eyebrow">03 / THE PUSH</span><h2>${L(h.services.title)}</h2></div>
    <div>${h.services.items.map((s, i) => `<div class="service"><small>${pad(i + 1)}</small><div><h3>${L(s.title)}</h3><p>${L(s.text)}</p></div></div>`).join('')}</div>
  </section>
  <div class="landscape">${img(h.landscape.image, L(h.landscape.alt))}<p>${L(h.landscape.text)}</p></div>
  ${contact()}`;
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
function profile(i) {
  const a = athletes[i];
  const next = (i + 1) % athletes.length;
  const bio = L(a.bio);
  const socials = a.socials && a.socials.length
    ? a.socials.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')
    : ['Instagram', 'YouTube', 'Strava'].map(s => `<button data-action="social" data-label="${s}">${s} ↗</button>`).join('');

  const partners = a.partners && a.partners.length
    ? a.partners.map(p => {
        const inner = `<small>${L(p.level) || ''}</small><strong>${p.logo ? img(p.logo, p.name, 'lazy', 'partner-logo') : p.name}${p.url ? ' ↗' : ''}</strong><small>${L(p.note) || ''}</small>`;
        return p.url ? `<a class="partner" href="${p.url}" target="_blank" rel="noopener">${inner}</a>` : `<div class="partner">${inner}</div>`;
      }).join('')
    : `<div class="partner"><small>${t('Hlavní partner', 'Main partner')}</small><strong>${t('LOGO PARTNERA', 'PARTNER LOGO')} ↗</strong><small>${t('Společný příběh spolupráce', 'The story of the partnership')}</small></div><div class="partner"><small>Partner</small><strong>${t('LOGO ZNAČKY', 'BRAND LOGO')}</strong><small>${t('Podpora na cestě', 'Support along the way')}</small></div><div class="partner"><small>${t('Technický partner', 'Technical partner')}</small><strong>${t('LOGO ZNAČKY', 'BRAND LOGO')}</strong><small>${t('Vybavení do terénu', 'Equipment for the outdoors')}</small></div>`;

  const gallery = a.gallery && a.gallery.length ? a.gallery : [
    { src: 'assets/climb.webp', alt: { cs: 'Ilustrační fotografie lezení', en: 'Illustrative climbing photograph' } },
    { src: 'assets/ridge.webp', alt: { cs: 'Ilustrační fotografie hor', en: 'Illustrative mountain photograph' } }
  ];
  const videoThumb = gallery[0].src === 'assets/climb.webp' ? 'assets/trail.webp' : gallery[0].src;

  return `<section class="profile-hero">
    <div class="profile-copy">
      <a class="eyebrow" href="${rosterUrl()}">← ${t('Všichni renegádi', 'All renegades')}</a>
      <div><small>RENEGADE / ${pad(i + 1)}${a.sport ? ' · ' + L(a.sport) : ''}</small><h1>${a.name}</h1><p>${L(a.tagline) || t('Vlastní cesta. Každodenní práce. Příběh, který stojí za pozornost.', 'An individual path. Daily dedication. A story worth telling.')}</p></div>
      <div class="socials">${socials}</div>
    </div>
    <div class="profile-image">${img(a.photo, a.illustrative ? t('Ilustrační outdoorová fotografie, nikoli portrét uvedeného sportovce', 'Illustrative outdoor photography, not a portrait of the named athlete') : a.name, 'eager')}${a.illustrative ? `<small>${t('ILUSTRAČNÍ SNÍMEK · PORTRÉT K DOPLNĚNÍ', 'ILLUSTRATIVE IMAGE · PORTRAIT TO BE ADDED')}</small>` : ''}</div>
  </section>
  <section class="section story">
    <div><span class="eyebrow">01 / ${t('Příběh', 'The story')}</span><h2>${t('Za jménem<br>je cesta.', 'Behind the name<br>is a journey.')}</h2></div>
    <div>${bio
      ? `<h3>${bio.title || ''}</h3>${(bio.paragraphs || []).map(p => `<p>${p}</p>`).join('')}`
      : `<h3>${t('Tady začíná osobní příběh.', 'This is where the personal story begins.')}</h3><p>${t('V této části dostane prostor vlastní hlas sportovce: jak se ke sportu dostal, co ho žene dál a k jakému cíli právě směřuje. Doplníme autentický medailonek, sportovní disciplínu a ověřené milníky.', 'This section will feature the athlete’s own voice: how they found their sport, what keeps them going and the goal they are working towards. An authentic biography, discipline and verified milestones will be added.')}</p><p class="note">${t('Ukázka jednotné šablony. Medailonek doplníme.', 'Shared template preview. The biography will be added.')}</p>`}
      ${button(t('Poznej partnery', 'Meet the partners'), '#partners', true)}</div>
  </section>
  <section id="partners" class="section partners">
    <div class="section-head"><div><span class="eyebrow">02 / ${t('Lidé a značky, kteří stojí za mnou', 'The people and brands behind me')}</span><h2>${t('Nikdo nejde<br>celou cestu sám.', 'Nobody goes<br>all the way alone.')}</h2></div><p>${t('Partneři, kteří jsou součástí cesty.', 'The partners who are part of the journey.')}</p></div>
    <div class="partnergrid">${partners}</div>
    ${a.partners && a.partners.length ? '' : `<p class="note">${t('Ukázková místa pro loga — partneři zatím nebyli doplněni.', 'Placeholder areas for logos — partners have not been added yet.')}</p>`}
  </section>
  <section class="section">
    <div class="section-head"><div><span class="eyebrow">03 / ${t('Z terénu', 'From the field')}</span><h2>${t('Blíž skutečnosti.', 'Closer to the real thing.')}</h2></div><p>${t('Fotografie, film a momenty mezi startem a cílem.', 'Photography, film and the moments between start and finish.')}</p></div>
    <div class="gallery">
      <button data-action="video" aria-label="${t('Přehrát video', 'Play video')}">${img(videoThumb, t('Náhled videa', 'Video thumbnail'))}<span class="play">▷</span><label>${a.video ? 'VIDEO' : t('VIDEO / Připravujeme', 'VIDEO / Coming soon')}</label></button>
      ${gallery.map(g => `<button data-action="photo" data-src="${g.src}" data-alt="${L(g.alt) || ''}" aria-label="${t('Zvětšit fotografii', 'Enlarge photograph')}">${img(g.src, L(g.alt) || '')}</button>`).join('')}
    </div>
  </section>
  ${contact()}
  <section class="section next-athlete"><span class="eyebrow">${t('DALŠÍ RENEGADE', 'NEXT RENEGADE')}</span>${button(athletes[next].name, url(next), true)}</section>`;
}

/* ---------- kontakt ---------- */
function contact() {
  return `<section id="contact" class="section contact contact-compact"><div class="contact-shell">
    <div class="contact-intro"><div><span class="eyebrow">LET’S PUSH TOGETHER ↗</span><h2>${L(C.contact.title)}</h2></div><p>${L(C.contact.text)}</p></div>
    <div class="contact-panel">${contactForm()}</div>
  </div></section>`;
}

function contactForm() {
  return `<form class="inquiry-form">
    <fieldset><legend>${t('JAK SE PROPOJÍME?', 'HOW CAN WE CONNECT?')}</legend><div class="inquiry-types">
      <label><input type="radio" name="kind" value="brand" checked><span>${t('Jsem značka', 'I am a brand')} ↗</span></label>
      <label><input type="radio" name="kind" value="athlete"><span>${t('Jsem sportovec', 'I am an athlete')} ↗</span></label>
      <label><input type="radio" name="kind" value="other"><span>${t('Něco jiného', 'Something else')} ↗</span></label>
    </div></fieldset>
    <div class="form-grid">
      <label>${t('Tvoje jméno', 'Your name')} *<input name="name" autocomplete="name" required placeholder="${t('Jméno a příjmení', 'Full name')}"></label>
      <label>E-mail *<input type="email" name="email" autocomplete="email" required placeholder="you@example.com"></label>
      <label class="context-label"><span>${t('Značka / společnost', 'Brand / company')}</span><input name="context" autocomplete="organization" placeholder="${t('Koho zastupuješ?', 'Who do you represent?')}"></label>
      <label>${t('Telefon', 'Phone')}<input name="phone" type="tel" autocomplete="tel" placeholder="+420"></label>
      <label class="form-wide">${t('Co spolu posuneme?', 'What can we push together?')} *<textarea name="message" required rows="4" placeholder="${t('Pár slov o tvém příběhu, nápadu nebo spolupráci…', 'A few words about your story, idea or partnership…')}">${athlete >= 0 ? t('Mám zájem o spolupráci: ', 'I am interested in working with: ') + athletes[athlete].name + '.' : ''}</textarea></label>
    </div>
    <div class="form-bottom"><p>${t('Náhled formuláře · údaje se neukládají ani neodesílají.', 'Form preview · no data is saved or sent.')}</p><button class="button" type="submit">${t('Odeslat', 'Send')} ↗</button></div>
    <p class="form-status" role="status" tabindex="-1"></p>
  </form>`;
}

function footer() {
  return `<footer><span>${L(C.footer.left)}</span><span>© ${new Date().getFullYear()} · ${L(C.footer.right)}</span>
    <span class="footer-tools"><button id="motion-toggle" aria-pressed="${!motionOff}">${motionOff ? t('POHYB: VYP', 'MOTION: OFF') : t('POHYB: ZAP', 'MOTION: ON')}</button><a href="#" data-action="credits">${t('Fotografie', 'Photography')} ↗</a></span></footer>`;
}

/* ---------- vykreslení ---------- */
function render() {
  cleanupMotion();
  document.body.classList.toggle('motion-off', motionOff);
  document.documentElement.lang = lang;
  document.title = `${athlete >= 0 ? athletes[athlete].name + ' — ' : page === 'athletes' ? t('Sportovci — ', 'Athletes — ') : ''}Pushing Renegades`;
  const main = athlete >= 0 ? profile(athlete) : page === 'athletes' ? rosterPage() : home();
  document.getElementById('app').innerHTML = nav() + `<main>${main}</main>` + footer();
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
    history.replaceState(null, '', athlete >= 0 ? url(athlete) : page === 'athletes' ? rosterUrl() : url());
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
  if (action === 'social') show(`<h2>${a.dataset.label}</h2><p>${t('Odkaz na profil sportovce doplníme.', 'The link to the athlete’s profile will be added.')}</p>`);
  if (action === 'credits') show(`<h2>${t('Fotografie', 'Photography')}</h2><p>${t('Web používá ilustrační fotografie z Unsplash a anonymní postavy vytvořené pomocí AI. Nejde o podobizny uvedených sportovců.', 'This site uses illustrative Unsplash photography and anonymous AI-generated figures, not portraits of the named athletes.')}</p><p><a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash ↗</a></p>`);
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
  f.querySelector('.context-label span').textContent = isAthlete ? t('Sport / disciplína', 'Sport / discipline') : t('Značka / společnost', 'Brand / company');
  f.elements.context.placeholder = isAthlete ? t('Čemu se věnuješ?', 'What is your sport?') : t('Koho zastupuješ?', 'Who do you represent?');
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

  if (!motionOff && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    }), { threshold: .1 });
    document.querySelectorAll('.section-head,.service,.manifesto>div,.athlete,.partner,.contact-shell>div').forEach((el, i) => {
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
