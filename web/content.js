/*
  OBSAH WEBU PUSHING RENEGADES
  ============================
  Tady se mění všechny texty, sportovci a fotky. Kód stránky (app.js) není potřeba upravovat.

  - Každý text má českou (cs) a anglickou (en) verzi.
  - Fotky patří do složky assets/ (ideálně formát .webp, viz README.md).
  - <br> v textu = zalomení řádku.
  - Pole, která u sportovce chybí nebo jsou prázdná, se nahradí ukázkovým textem / prázdným místem.
*/
window.CONTENT = {

  /* ---------- SPORTOVCI ----------
     slug       … adresa profilu (?athlete=slug), malými písmeny bez diakritiky, nesmí se opakovat
     name       … celé jméno
     sport      … disciplína (zobrazí se na profilu), { cs, en }
     photo      … hlavní fotka na profilu (a na kartě, pokud není cardPhoto)
     cardPhoto  … volitelně jiná fotka na kartu v seznamu
     cardCutout … true, pokud je cardPhoto výřez postavy s průhledným pozadím
     illustrative … true = fotka je jen ilustrační (zobrazí se upozornění); u skutečných fotek dejte false
     tagline    … krátký podtitulek na profilu, { cs, en }
     bio        … medailonek: nadpis + odstavce, { cs: { title, paragraphs: [...] }, en: {...} }
     socials    … odkazy: [{ label: 'Instagram', url: 'https://...' }]
     partners   … [{ level: { cs, en }, name: 'Značka', logo: 'assets/partneri/x.webp', url: 'https://...', note: { cs, en } }]
     gallery    … fotky na profilu: [{ src: 'assets/...', alt: { cs, en } }]
     video      … odkaz na YouTube / Vimeo (embed), např. 'https://www.youtube.com/embed/XXXX'
  */
  athletes: [
    {
      slug: 'barbora-zavodnik',
      name: 'Barbora Závodník',
      photo: 'assets/ridge.webp',
      illustrative: true
    },
    {
      slug: 'honza-dvoracek',
      name: 'Honza Dvořáček',
      photo: 'assets/trail.webp',
      illustrative: true
    },
    {
      slug: 'jakub-house-vana',
      name: 'Jakub „House“ Váňa',
      photo: 'assets/mountain.webp',
      cardPhoto: 'assets/house-portrait.webp',
      cardCutout: true,
      illustrative: true
    },
    {
      slug: 'jana-svecova',
      name: 'Jana Švecová',
      photo: 'assets/climb.webp',
      illustrative: true
    },
    {
      slug: 'patrik-vebr',
      name: 'Patrik Vebr',
      photo: 'assets/forest.webp',
      illustrative: true
    },
    {
      slug: 'tomas-stverak',
      name: 'Tomáš Štverák',
      photo: 'assets/trail.webp',
      illustrative: true
    }
  ],

  /* ---------- ÚVODNÍ KARUSEL (hero) ----------
     athlete    … slug sportovce ze seznamu výše
     word       … velké slovo v pozadí
     title      … nadpis na slidu
     background … fotka pozadí
     cutout     … výřez postavy s průhledným pozadím (.webp nebo .png)
     illustrative … true = AI ilustrace (zobrazí se upozornění), u skutečných fotek false
  */
  featured: [
    { athlete: 'jakub-house-vana', word: 'HOUSE', title: 'JAKUB „HOUSE“ VÁŇA', background: 'assets/ridge.webp', cutout: 'assets/house-portrait.webp', illustrative: true },
    { athlete: 'barbora-zavodnik', word: 'ZÁVODNÍK', title: 'BARBORA ZÁVODNÍK', background: 'assets/forest.webp', cutout: 'assets/athlete-cutout.webp', illustrative: true },
    { athlete: 'patrik-vebr', word: 'VEBR', title: 'PATRIK VEBR', background: 'assets/mountain.webp', cutout: 'assets/runner-cutout.webp', illustrative: true }
  ],

  /* Sportovci zobrazení na hlavní stránce v sekci „The Renegades“ (slugy, v tomto pořadí). */
  homeAthletes: ['jakub-house-vana', 'barbora-zavodnik', 'patrik-vebr'],

  /* ---------- TEXTY HLAVNÍ STRÁNKY ---------- */
  home: {
    heroEyebrow: 'SPORTS PR / OFF THE BEATEN PATH',
    heroTitle: 'WE PUSH <em>RENEGADES.</em>',
    heroText: {
      cs: 'Výkon je váš. Pozornost zařídíme my. Sportovní PR pro ty, kteří si svou cestu musí vydřít.',
      en: 'Your performance. Our push. Sports PR for those who earn every step of their own path.'
    },
    heroDisciplines: 'CLIMBING / RUNNING / MOUNTAINEERING',
    tape: ['WE PUSH RENEGADES ↗', 'PUBLIC RELATIONS × PERSONAL RECORDS', 'PUSH. PUSH. PUSH.'],

    stance: {
      eyebrow: { cs: 'Náš postoj', en: 'Our stance' },
      title: {
        cs: 'Výkon si zaslouží<br>víc než potlesk<br>u cílové pásky.',
        en: 'Great performance<br>deserves more<br>than finish-line applause.'
      },
      paragraphs: {
        cs: [
          'Ne každý silný příběh je slyšet. Někdy se odehrává vysoko ve stěně. Někdy na posledních kilometrech v dešti. A někdy roky předtím, než přijde první velký výsledek.',
          'Jsme Pushing Renegades. Sportovní PR agentura pro lidi, kteří jdou vlastní cestou. Pomáháme jejich výkonům získat pozornost a budujeme partnerství, která mají smysl pro sportovce i značky.'
        ],
        en: [
          'Not every powerful story gets heard. Some happen high on a rock face. Some in the final kilometres in the rain. And some begin years before the first big result.',
          'We are Pushing Renegades. A sports PR agency for people who take their own path. We help their achievements earn attention and build partnerships that matter to athletes and brands.'
        ]
      }
    },

    renegades: {
      title: { cs: 'Vlastní cesta.<br>Společný tah.', en: 'Their own path.<br>A shared push.' },
      text: {
        cs: 'Za každým jménem je jiný příběh. Za každým příběhem odhodlání, které si zaslouží být vidět.',
        en: 'Every name has a different story. Behind every story is determination that deserves to be seen.'
      }
    },

    services: {
      title: { cs: 'Ty posouváš<br>hranice.<br>My tvůj příběh.', en: 'You push<br>your limits.<br>We push<br>your story.' },
      items: [
        {
          title: { cs: 'PR & média', en: 'PR & media' },
          text: {
            cs: 'Najdeme silnou linku příběhu a dostaneme ji k lidem, kteří ji mají slyšet. Od mediální strategie po rozhovory a tiskové výstupy.',
            en: 'We find the strongest thread in your story and bring it to the people who need to hear it. From media strategy to interviews and press coverage.'
          }
        },
        {
          title: { cs: 'Značka & obsah', en: 'Brand & content' },
          text: {
            cs: 'Dáme sportovnímu příběhu jasný hlas a obraz. Fotografie, video a sociální sítě s osobností, která patří sportovci.',
            en: 'We give an athlete’s story a clear voice and visual identity. Photography, video and social content with a personality that belongs to the athlete.'
          }
        },
        {
          title: { cs: 'Partneři & příležitosti', en: 'Partners & opportunities' },
          text: {
            cs: 'Propojujeme sportovce se značkami na základě společných hodnot. Navrhujeme spolupráce i to, jak je smysluplně ukázat světu.',
            en: 'We connect athletes and brands through shared values. We shape partnerships and find meaningful ways to bring them to life.'
          }
        }
      ]
    },

    landscape: {
      image: 'assets/mountain.webp',
      alt: { cs: 'Hory a cesta v přírodě', en: 'Mountains and an outdoor trail' },
      text: { cs: 'Dřina má svůj příběh.<br>Dejme mu hlas.', en: 'Hard work has a story.<br>Let’s give it a voice.' }
    }
  },

  /* ---------- STRÁNKA VŠICHNI SPORTOVCI ---------- */
  roster: {
    title: { cs: 'VLASTNÍ CESTY.<br><em>JEDEN TÝM.</em>', en: 'INDIVIDUAL PATHS.<br><em>ONE TEAM.</em>' },
    text: {
      cs: 'Poznej všechny sportovce Pushing Renegades. Každý má svůj příběh. Společně mu dáváme sílu být slyšet.',
      en: 'Meet the Pushing Renegades athletes. Each has a story. Together, we help it be heard.'
    }
  },

  /* ---------- KONTAKT ---------- */
  contact: {
    title: { cs: 'Pojďme to posunout.', en: 'Let’s make moves.' },
    text: {
      cs: 'Tvůj příběh. Naše společná cesta. Napiš nám, co chceš ve sportu nebo se svou značkou dokázat.',
      en: 'Your story. Our shared journey. Tell us what you want to achieve in sport or with your brand.'
    }
  },

  /* ---------- PATIČKA ---------- */
  footer: {
    left: 'PUSHING RENEGADES / WE PUSH RENEGADES.',
    right: { cs: 'SPORTOVNÍ PR VLASTNÍ CESTOU', en: 'SPORTS PR OUR OWN WAY' }
  }
};
