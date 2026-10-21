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

### Fotky sportovce
Každý sportovec má složku `web/assets/athletes/<slug>/`:

| Soubor | Kde se zobrazí | Doporučení |
| --- | --- | --- |
| `cutout.webp` | výřez postavy v úvodním karuselu | průhledné pozadí, na výšku |
| `hero.webp` | pozadí slidu v karuselu | na šířku, bez výrazné postavy |
| `portrait.webp` | hlavní fotka profilu | na výšku |
| `card.webp` | karta v seznamu sportovců | na výšku 3:4 |
| `gallery-1…6.webp` | galerie na profilu | 6 fotek, 1. a 4. se zobrazí na výšku |

Výměna: převeď fotku (`python tools/optimize-images.py moje-fotka.jpg`), ulož ji pod stejným názvem
do složky sportovce a je hotovo. Jiné názvy / počet fotek se nastaví v `web/content.js`.

### Úvodní karusel
V `content.js` → `featured`: sportovec, velké slovo v pozadí, nadpis, pozadí a výřez.

### Nový sportovec
Zkopíruj blok sportovce v `athletes` v `content.js`, změň `slug`, `name`, `accent` (barva) a texty,
vytvoř složku `web/assets/athletes/<slug>/` s fotkami. Na hlavní stránku ho přidáš do `homeAthletes`.
Sekce profilu (úspěchy, cíle, pro partnery, galerie…) se zobrazí jen tehdy, když pro ně vyplníš data.

### Partneři, video
U sportovce doplň `partners` (loga) nebo `video` (YouTube/Vimeo embed) – popis polí je na začátku `content.js`.

### Texty stránek
Sekce `home`, `roster`, `contact`, `footer` v `content.js`. Každý text má `cs` a `en`.

## Před ostrým spuštěním
- Kontaktní formulář zatím nic neodesílá — je potřeba ho napojit (Formspree / Web3Forms / vlastní backend).
- Ověřit práva k fotkám od fotografů závodů (RunCzech, Malopolska aj.) a doplnit loga partnerů sportovců.
