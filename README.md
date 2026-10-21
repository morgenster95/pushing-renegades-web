# Pushing Renegades — web

Statický web (HTML/CSS/JS), bez buildu. Vše, co se nasazuje, je ve složce `web/`.

- **Živě:** https://morgenster95.github.io/pushing-renegades-web/
- **Nasazení:** každý push do `main` se automaticky nasadí na GitHub Pages (`.github/workflows/pages.yml`).
- **Lokálně:** stačí otevřít `web/index.html` v prohlížeči.

## Struktura

| Soubor | Co obsahuje |
| --- | --- |
| `web/content.js` | **Veškerý obsah**: sportovci, fotky, texty CZ/EN. Tady se dělá většina úprav. |
| `web/app.js` | Šablona stránek a chování (karusel, menu, formulář). |
| `web/style.css` | Vzhled. |
| `web/assets/` | Obrázky (.webp). |
| `tools/optimize-images.py` | Převod nových fotek do .webp. |

Podstránky: `?page=athletes` (všichni sportovci), `?athlete=<slug>` (profil), `&lang=en` (angličtina).

## Jak změnit obsah

### Výměna fotky sportovce
1. Převeď fotku: `python tools/optimize-images.py moje-fotka.jpg` → vznikne `moje-fotka.webp`.
2. Ulož ji do `web/assets/athletes/`, pojmenuj podle sportovce, např. `jakub-house-vana-portrait.webp`.
3. V `web/content.js` u sportovce změň `photo: 'assets/athletes/jakub-house-vana-portrait.webp'`
   a nastav `illustrative: false` (zmizí upozornění „ilustrační snímek“).

### Úvodní karusel
V `content.js` → `featured`. Každý slide má pozadí (`background`) a výřez postavy s průhledným
pozadím (`cutout`, PNG → převést na .webp, průhlednost zůstane). Ideální výřez: na výšku, cca 1024×1536 px.

### Nový sportovec
Přidej blok do `athletes` v `content.js` (zkopíruj existující, změň `slug` a `name`).
Na hlavní stránce se zobrazí, jen pokud jeho slug přidáš do `homeAthletes`.

### Medailonek, sítě, partneři, video
U sportovce v `content.js` doplň `bio`, `socials`, `partners`, `gallery`, `video` (popis polí je na začátku souboru).
Dokud pole chybí, zobrazuje se ukázkový text.

### Texty stránek
Sekce `home`, `roster`, `contact`, `footer` v `content.js`. Každý text má `cs` a `en`.

## Před ostrým spuštěním
- Kontaktní formulář zatím nic neodesílá — je potřeba ho napojit (Formspree / Web3Forms / vlastní backend).
- Fotky a AI postavy jsou ilustrační — nahradit schválenými portréty.
