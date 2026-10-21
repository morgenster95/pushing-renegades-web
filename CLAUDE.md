# Pushing Renegades – web

Web sportovní PR agentury Pushing Renegades. Statický web (HTML/CSS/JS), bez buildu a bez npm.
Komunikace s uživatelem česky.

- **Repo:** https://github.com/morgenster95/pushing-renegades-web (veřejné)
- **Živě:** https://morgenster95.github.io/pushing-renegades-web/
- **Nasazení:** push do `main` → GitHub Actions (`.github/workflows/pages.yml`) nasadí složku `web/` na GitHub Pages.
- **Později:** vlastní doména + Firebase Hosting (zdarma), `firebase.json` s `"public": "web"`.

## Struktura

| Soubor | Obsah |
| --- | --- |
| `web/content.js` | **Veškerý obsah**: sportovci, texty CZ/EN, karusel. Popis polí je na začátku souboru. |
| `web/app.js` | Šablony stránek a chování (karusel, profil, menu, formulář, animace odhalení). |
| `web/effects.js` | Prach/vítr ve scéně (`initDust`), cílová páska přes nadpis (`initFinishLine`). |
| `web/style.css` | Veškerý vzhled (jeden soubor). |
| `web/assets/athletes/<slug>/` | Fotky sportovce: `cutout`, `hero`, `portrait`, `card`, `gallery-1…6` (.webp). |
| `tools/optimize-images.py` | Převod fotek do .webp (max 1800 px, průhlednost zachová). |
| `podklady-sport/` | Zdrojové prezentace a fotky sportovců – **v .gitignore, nikdy necommitovat** (osobní telefony/e-maily). |

Podstránky přes URL: `?page=athletes`, `?athlete=<slug>`, `&lang=en`.

## Rozhodnutí (dodržovat)

- **Vizuál:** jen směr *RAW / Break the Frame* (tmavá `#171817` + acid žlutá `#edff38`, Barlow Condensed / DM Sans / IBM Plex Mono). Ostatní koncepty, palety a přepínače byly odstraněny – nevracet.
- **Sportovci:** jen Jana Švecová, Patrik Vebr, Tomáš Štverák. Další přidávat až s dodanými podklady.
- **Barva sportovce** (`accent` v content.js) se použije na jeho profilu a kartě: Jana `#ff4fa0`, Patrik `#ffd400`, Tomáš `#ff6a1a`. Karusel na hlavní stránce zůstává žlutý.
- **Kontakty:** na web nedávat osobní telefony ani e-maily sportovců/manažerů. Poptávky jdou přes formulář agentury (předvyplní jméno sportovce).
- **Profil sportovce** = scéna jako na HP (výřez postavy + velké slovo v barvě sportovce + prach), pod ní čísla (časomíra), Moje cesta (velká fotka vlevo, text vpravo), Úspěchy (karty s ikonami), Cíle, případně Mimo závody (charita), Pro partnery (zkrácená obchodní sekce), galerie 6 fotek, kontakt. Sekce bez dat se nezobrazí.
- **Postavy ve scéně nesmí přesahovat rám fotky** (uživatel výslovně nechce). `.depth-stage { overflow: hidden }`, slidy jsou ploché (`transform-style: flat`), pořadí vrstev řídí z-index. Nevracet 3D `translateZ` – na mobilu pak postava překrývala text a na desktopu se ořezávala jména.
- **Úspěchy:** ikona se vybírá automaticky (`achievementIcon` v app.js: medal/summit/flag/hold/time/finish/streak/star), lze přepsat `icon:` v content.js.
- **Animace** respektují `prefers-reduced-motion` a přepínač „Pohyb“ v patičce; prach se pauzuje mimo obrazovku.

## Jak na běžné změny

- **Vyměnit fotku:** převést `python tools/optimize-images.py foto.jpg`, uložit pod stejným názvem do `web/assets/athletes/<slug>/`.
- **Výřez postavy (cutout):** z prezentací v PDF jdou vytáhnout hotové výřezy (PyMuPDF, obrázky se smask); z běžné fotky odstranit pozadí přes `rembg` (model `isnet-general-use`). Výřez useknutý v pase je OK – postava sedí na spodní hraně rámu.
- **Nový sportovec:** zkopírovat blok v `athletes` (content.js), nová složka s fotkami, přidat do `homeAthletes`, případně do `featured`.
- **Ověření vzhledu:** Claude in Chrome nebývá připojený → headless Chrome přes DevTools protokol (screenshoty desktop 1440 px a mobil 390 px). Headless vykresluje pomalu – animace (reveal, prach) na snímcích občas nejsou doběhlé, to není chyba.

## Otevřené úkoly

- Kontaktní formulář nic neodesílá – napojit (Formspree / Web3Forms / vlastní backend).
- Ověřit práva k fotkám od fotografů závodů (RunCzech, Malopolska, tiskové zprávy).
- Doplnit odkazy na Stravu, ověřit Instagram Patrika (`patrik.vebr` – přečteno ze screenshotu v prezentaci).
- Loga partnerů sportovců (Jana má v prezentaci jen jako obrázek) a případně YouTube video Jany.
- Výřez Tomáše je malý (362×1012 px) – při dodání většího vyměnit.
- Favicon a OG náhled pro sdílení.
