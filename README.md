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

Podstránky: `?page=athletes` (všichni sportovci), `?athlete=<slug>` (profil), `?project=<slug>` (projekt: `k2`, `rekord`, `tracking`),
`?page=media` (tiskové zprávy, mediální kontakt, FAQ), `&lang=en` (angličtina).

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

### Projekty
V `content.js` → `projects`. Každý projekt má vlastní podstránku postavenou stejně jako profil sportovce
(scéna, čísla, příběh, plán, tým, video, pro partnery, partneři projektu, kontakt). `featured: true` = velká karta
na hlavní stránce, ostatní se zobrazí jako řádek. `athletes: ['slug']` = projekt se ukáže i na profilu sportovce.

### Úvodní spot, aktuality, média
`film` (úvodní PR spot: odkaz na verzi na šířku i na výšku), `news` (aktuality na hlavní stránce),
`media` (tiskové zprávy, mediální kontakt, press kit, FAQ).

### Mockupy
Texty a loga, která jsou zatím jen návrh, mají v `content.js` `draft: true` a na webu štítek **MOCKUP**.
Před spuštěním: nahradit skutečným obsahem a `brand.showDrafts` přepnout na `false`.

### Partneři, video
Partneři jsou na třech místech a každé má svá loga:
- **Pushing Renegades** (hlavní stránka): `partners.tiers` – generální partner / partneři / mediální partneři.
- **Projekt**: `projects[].partners` – stejné skupiny.
- **Sportovec**: `athletes[].partners` – každý má vlastní partnery a sponzory, `tier: 'main' | 'partner' | 'media'`.

Logo bez souboru se zobrazí jako šedý rámeček „LOGO“ (mockup). U sportovce lze doplnit i `video` (YouTube/Vimeo embed).

## Loga partnerů – jak je dodávat

Aby loga vypadala stejně dobře na mobilu i na velké obrazovce, platí pro všechna:

| | Požadavek |
| --- | --- |
| **Formát** | **SVG** (vektor, texty převedené na křivky). Když SVG není, tak **PNG s průhledným pozadím**, nejméně 1200 px na delší straně. JPG ne. |
| **Pozadí** | **Průhledné, bez podkladu.** Žádný obdélník, kruh ani rámeček kolem loga. |
| **Ořez** | Těsně k logu, bez okrajů (mezery kolem přidá web sám). |
| **Verze** | Ideálně **jednobarevná bílá** (negativ) nebo černá – web loga zobrazuje jednobarevně bíle, aby ladila s tmavým designem. Plnobarevné logo jde taky, ale musí fungovat na tmavém pozadí `#171817`. |
| **Tvar** | Vodorovná (ležatá) verze loga, pokud ji značka má. Čtvercová / vysoká loga web automaticky zvětší, široká zmenší, aby všechna působila stejně velká. |
| **Velikost souboru** | SVG do 100 kB, PNG do 300 kB. |
| **Název** | malými písmeny bez diakritiky: `nazev-znacky.svg` |
| **Odkaz** | URL webu značky (volitelné) – logo pak bude klikací. |

**Kam soubor uložit:**
- partneři Pushing Renegades a projektů: `web/assets/partneri/<nazev>.svg`
- partneři sportovce: `web/assets/athletes/<slug>/partneri/<nazev>.svg`

**Zápis v `content.js`:** `{ name: 'Název značky', logo: 'assets/partneri/nazev.svg', url: 'https://…' }`.
Plnobarevné logo, které nemá být převedené na bílou: přidej `color: true`.

> Logo s plným podkladem (např. bílý text v červeném obdélníku) se v jednobarevném zobrazení slije do bílého bloku.
> U takových značek si vyžádat verzi bez podkladu, nebo použít `color: true`.

**Velikost na webu:** generální partner je samostatně a největší (cca 76 px na výšku, mobil 56 px), partneři v mřížce
(44 px / 36 px), mediální partneři nejmenší (32 px / 28 px). Rámečky mají pevnou výšku, takže se nic nerozhodí.

## Logo Pushing Renegades
Až bude hotové: uložit jako `web/assets/logo.svg` (bílá / světlá verze pro tmavé pozadí, bez podkladu)
a v `content.js` nastavit `brand.logo: 'assets/logo.svg'`. Zobrazí se v menu i v patičce místo textového nápisu.

### Texty stránek
Sekce `home`, `roster`, `contact`, `footer` v `content.js`. Každý text má `cs` a `en`.

## Před ostrým spuštěním
- Nahradit mockupy (štítek MOCKUP) a vypnout `brand.showDrafts`.
- Zřídit e-maily `info@` a `media@` (v `brand.email` a `media.contact.email`).
- Kontaktní formulář zatím nic neodesílá — je potřeba ho napojit (Formspree / Web3Forms / vlastní backend).
- Ověřit práva k fotkám od fotografů závodů (RunCzech, Malopolska aj.) a doplnit loga partnerů sportovců.
