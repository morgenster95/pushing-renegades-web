/*
  OBSAH WEBU PUSHING RENEGADES
  ============================
  Tady se mění všechny texty, sportovci a fotky. Kód stránky (app.js) není potřeba upravovat.

  - Každý text má českou (cs) a anglickou (en) verzi.
  - Fotky patří do složky assets/ (ideálně formát .webp, viz README.md).
  - <br> v textu = zalomení řádku.
  - Sekce, která u sportovce chybí nebo je prázdná, se na jeho profilu nezobrazí.
*/
window.CONTENT = {

  /* ---------- SPORTOVCI ----------
     Fotky každého sportovce jsou ve složce assets/athletes/<slug>/.

     slug       … adresa profilu (?athlete=slug), malými písmeny bez diakritiky, nesmí se opakovat
     name       … celé jméno
     nickname   … přezdívka (volitelné)
     accent     … barva sportovce (zvýraznění na jeho profilu), např. '#ff4fa0'
     sport      … disciplína, { cs, en }
     tagline    … krátký podtitulek na profilu, { cs, en }
     hero       … scéna v úvodu profilu i v karuselu: { word: velké slovo, background: pozadí, cutout: výřez postavy }
     photo      … portrét (na profilu v sekci Moje cesta)
     cardPhoto  … fotka na kartu v seznamu (na výšku 3:4)
     illustrative … true = fotka je jen ilustrační (zobrazí se upozornění)
     stats      … velká čísla v hlavičce profilu: [{ value, label: { cs, en } }]
     story      … „Moje cesta“: { title: { cs, en }, paragraphs: { cs: [...], en: [...] }, quote: { cs, en } }
     achievements … úspěchy: [{ value, title: { cs, en }, detail: { cs, en }, icon }]
                  icon (volitelné) – jinak se vybere sama podle textu:
                  'medal' (1.–3. místo), 'summit' (prvopřelez), 'flag' (první přelez / první místo v něčem),
                  'hold' (lezecká obtížnost), 'time' (čas), 'finish' (dokončení / umístění), 'streak' (opakované), 'star'
     goals      … cíle: { title: { cs, en }, intro: { cs, en }, items: [{ label, title: { cs, en }, detail: { cs, en } }] }
     impact     … volitelná sekce navíc (např. charita), stejná struktura jako goals
     partnerOffer … sekce Pro partnery: { text: { cs, en }, items: { cs: [...], en: [...] }, reach: [{ value, label: { cs, en } }] }
     socials    … odkazy: [{ label: 'Instagram', url: 'https://...' }]
     partners   … partneři a sponzoři sportovce (každý má vlastní): [{ name, logo, url, tier, color }]
                  tier: 'main' (hlavní partner, větší logo) / 'partner' (výchozí) / 'media'
                  logo: cesta k souboru (SVG ideálně, viz README → Loga partnerů). Bez loga = šedý mockup rámeček.
                  color: true = logo se zobrazí v původních barvách (jinak jednobarevně, aby ladilo s webem)
                  prázdné = sekce Partneři se nezobrazí
     values     … volitelně „Mise a hodnoty“, stejná struktura jako goals
     news       … volitelně aktuality sportovce: [{ date, title: { cs, en }, text: { cs, en }, url }]
     gallery    … fotky: [{ src, alt: { cs, en } }]
     video      … odkaz na YouTube / Vimeo (embed), např. 'https://www.youtube.com/embed/XXXX'
  */
  athletes: [
    {
      slug: 'jana-svecova',
      name: 'Jana Švecová',
      nickname: 'Climbing Jane',
      accent: '#ff4fa0',
      sport: { cs: 'Skalní bouldering', en: 'Rock bouldering' },
      tagline: { cs: 'Profesionální skalní boulderistka. Tři skalní 8C, z toho dva vlastní prvopřelezy.', en: 'Professional rock boulderer. Three 8C boulders on rock, two of them first ascents.' },
      hero: { word: 'JANE', background: 'assets/athletes/jana-svecova/hero.webp', cutout: 'assets/athletes/jana-svecova/cutout.webp' },
      photo: 'assets/athletes/jana-svecova/portrait.webp',
      cardPhoto: 'assets/athletes/jana-svecova/card.webp',
      stats: [
        { value: '3× 8C', label: { cs: 'skalní bouldery', en: 'rock boulders' } },
        { value: '2×', label: { cs: 'prvopřelez na úrovni 8C', en: 'first ascents at 8C' } },
        { value: '5×', label: { cs: 'Výstup roku ČHS', en: 'Czech Ascent of the Year' } }
      ],
      story: {
        title: { cs: 'Lezu od sedmi let.', en: 'I’ve been climbing since I was seven.' },
        paragraphs: {
          cs: [
            'Z dětské radosti se postupně staly tréninky, závody a reprezentace Česka. V patnácti jsem vyhrála závod Evropského poháru mládeže v Kranji. O dva roky později jsem skončila a téměř dva roky jsem na chyty nesáhla. Právě tehdy mi došlo, jak moc mi lezení chybí.',
            'V roce 2019 jsem se k lezení vrátila. Začala jsem lézt venku a právě v boulderingu jsem našla cestu, po které chci lézt co nejvýš to půjde. Bouldering je lezení krátkých, fyzicky a technicky náročných linií bez lana, s dopadem do bouldermatek. Obtížnost 8C patří ke světové špičce ženského boulderingu.',
            'V Prostějově jsme s manželem vybudovali vlastní boulderovku a tréninkové zázemí. Postupně kolem něj budujeme prostor pro další lezce a chceme část toho, co nám lezení přineslo, vracet zpátky do komunity.'
          ],
          en: [
            'Childhood fun gradually turned into training, competitions and representing the Czech Republic. At fifteen I won a European Youth Cup event in Kranj. Two years later I quit and didn’t touch a hold for almost two years. That’s when I realised how much I missed climbing.',
            'I came back in 2019. I started climbing outdoors and found my path in bouldering, a path I want to follow as high as it goes. Bouldering means short, physically and technically demanding lines without a rope, with crash pads below. The 8C grade is at the very top of women’s bouldering worldwide.',
            'In Prostějov, my husband and I built our own bouldering gym and training base. We are gradually opening it up to other climbers and want to give part of what climbing has given us back to the community.'
          ]
        },
        quote: { cs: 'See what happens when you don’t give up.', en: 'See what happens when you don’t give up.' }
      },
      achievements: [
        { value: '8C', title: { cs: 'Tokyo Drift', en: 'Tokyo Drift' }, detail: { cs: '2026 · prvopřelez', en: '2026 · first ascent' } },
        { value: '8C', title: { cs: 'Drift', en: 'Drift' }, detail: { cs: '2026', en: '2026' } },
        { value: '8C/V15', title: { cs: 'Nova', en: 'Nova' }, detail: { cs: '2023 · prvopřelez · první český ženský přelez 8C · Výstup roku ČHS', en: '2023 · first ascent · first Czech female 8C · Czech Ascent of the Year' } },
        { value: '8B+', title: { cs: 'Mild Abuse of Terminology', en: 'Mild Abuse of Terminology' }, detail: { cs: '2025 · první ženský přelez · Výstup roku ČHS', en: '2025 · first female ascent · Czech Ascent of the Year' } },
        { value: '8B+', title: { cs: 'Supertussi Low, Brione', en: 'Supertussi Low, Brione' }, detail: { cs: '2024 · první ženský přelez · Výstup roku ČHS', en: '2024 · first female ascent · Czech Ascent of the Year' } },
        { value: '8B+', title: { cs: 'Roof der Wildnis', en: 'Roof der Wildnis' }, detail: { cs: '2022 · první český ženský přelez 8B+ · Výstup roku ČHS', en: '2022 · first Czech female 8B+ · Czech Ascent of the Year' } },
        { value: '8B', title: { cs: 'Conquistador', en: 'Conquistador' }, detail: { cs: '2020 · první český ženský přelez 8B · Výstup roku ČHS', en: '2020 · first Czech female 8B · Czech Ascent of the Year' } },
        { value: '8B', title: { cs: 'Margo', en: 'Margo' }, detail: { cs: '2022 · prvopřelez · vlastní linie v Moravském krasu', en: '2022 · first ascent · own line in the Moravian Karst' } }
      ],
      goals: {
        title: { cs: 'Od 8C k 8C+.<br>A dál k 9A.', en: 'From 8C to 8C+.<br>And on to 9A.' },
        intro: { cs: 'Chci zjistit, kam až se dokážu v boulderingu posunout. Podobný výsledek nejde slíbit ani naplánovat na přesné datum. Můžu mu ale věnovat svůj čas, soustředění a práci.', en: 'I want to find out how far I can go in bouldering. A result like this can’t be promised or scheduled. But I can give it my time, focus and work.' },
        items: [
          { label: '2027', title: { cs: 'První 8C+', en: 'First 8C+' }, detail: { cs: 'Terranova 8C+, Moravský kras – dlouhodobý projekt v domácí oblasti. Dále Compass North 8B+ (Švýcarsko), Jade 8B+ (USA), Spray of Light 8C (Rocklands, JAR).', en: 'Terranova 8C+, Moravian Karst – a long-term project at home. Plus Compass North 8B+ (Switzerland), Jade 8B+ (USA), Spray of Light 8C (Rocklands, South Africa).' } },
          { label: '2028', title: { cs: 'Výhled k 9A', en: 'Looking towards 9A' }, detail: { cs: 'Arrival of the Birds 9A (Švýcarsko) jako dlouhodobá ambice. Dále Stairway to Hell 8C (Slovinsko), From Dirt Grows the Flower 8C a Brain Rot 8C (Švýcarsko).', en: 'Arrival of the Birds 9A (Switzerland) as the long-term ambition. Plus Stairway to Hell 8C (Slovenia), From Dirt Grows the Flower 8C and Brain Rot 8C (Switzerland).' } }
        ]
      },
      partnerOffer: {
        text: { cs: 'Partnerství stavím na důvěře, osobních zkušenostech a dlouhodobé spolupráci. Obsah kolem projektů si s manželem tvoříme sami – od natáčení na skalách po střih pro YouTube a sociální sítě. Partner se tak přirozeně objeví v tréninku, na cestách i ve finálním přelezu.', en: 'I build partnerships on trust, personal experience and long-term cooperation. My husband and I create all the content ourselves – from filming on the rock to editing for YouTube and social media. A partner naturally appears in training, on trips and in the final send.' },
        items: {
          cs: ['Dlouhodobé ambasadorství i partnerství na konkrétním projektu, tripu nebo sezóně', 'Testování produktů, prototypů a upřímná zpětná vazba k vybavení', 'Instagram Reels, YouTube série, foto a video pro kanály značky', 'Vlastní ilustrace, custom design a limitované kolekce', 'Workshopy, community sessions a eventy v boulderovce v Prostějově'],
          en: ['Long-term ambassadorship or partnership on a specific project, trip or season', 'Product and prototype testing with honest gear feedback', 'Instagram Reels, YouTube series, photo and video for the brand’s channels', 'Own illustrations, custom design and limited collections', 'Workshops, community sessions and events at the Prostějov bouldering gym']
        },
        reach: [
          { value: '12,7 tis.', label: { cs: 'odběratelů YouTube', en: 'YouTube subscribers' } },
          { value: '1,3 mil.', label: { cs: 'zhlédnutí', en: 'views' } }
        ]
      },
      socials: [
        { label: 'Instagram', url: 'https://www.instagram.com/jane_svecova/' },
        { label: 'YouTube', url: 'https://www.youtube.com/@janesvecova' }
      ],
      partners: [
        { name: 'Hlavní partner', tier: 'main', draft: true },
        { name: 'Partner', draft: true },
        { name: 'Partner', draft: true },
        { name: 'Partner', draft: true }
      ],
      gallery: [
        { src: 'assets/athletes/jana-svecova/gallery-1.webp', alt: { cs: 'Jana Švecová v boulderu', en: 'Jana Švecová on a boulder' } },
        { src: 'assets/athletes/jana-svecova/gallery-2.webp', alt: { cs: 'Jana Švecová při lezení', en: 'Jana Švecová climbing' } },
        { src: 'assets/athletes/jana-svecova/gallery-3.webp', alt: { cs: 'Portrét Jany Švecové', en: 'Portrait of Jana Švecová' } },
        { src: 'assets/athletes/jana-svecova/gallery-4.webp', alt: { cs: 'Jana Švecová pod skálou', en: 'Jana Švecová at the crag' } },
        { src: 'assets/athletes/jana-svecova/gallery-5.webp', alt: { cs: 'Lezecká komunita na skalách', en: 'Climbing community at the crag' } },
        { src: 'assets/athletes/jana-svecova/gallery-6.webp', alt: { cs: 'Trénink v boulderovce', en: 'Training at the bouldering gym' } }
      ]
    },
    {
      slug: 'patrik-vebr',
      name: 'Patrik Vebr',
      accent: '#ffd400',
      sport: { cs: 'Maraton', en: 'Marathon' },
      tagline: { cs: 'Špičkový český maratonec na cestě za národním rekordem.', en: 'Top Czech marathoner on the road to the national record.' },
      hero: { word: 'VEBR', background: 'assets/athletes/patrik-vebr/hero.webp', cutout: 'assets/athletes/patrik-vebr/cutout.webp' },
      photo: 'assets/athletes/patrik-vebr/portrait.webp',
      cardPhoto: 'assets/athletes/patrik-vebr/card.webp',
      stats: [
        { value: '2:16:27', label: { cs: 'maraton · Barcelona 2026', en: 'marathon · Barcelona 2026' } },
        { value: '1:03:24', label: { cs: 'půlmaraton · Valencia 2024', en: 'half marathon · Valencia 2024' } },
        { value: '2:11:57', label: { cs: 'cíl: český rekord', en: 'target: Czech record' } }
      ],
      story: {
        title: { cs: 'Od koníčku k profesionálnímu sportu.', en: 'From a hobby to professional sport.' },
        paragraphs: {
          cs: [
            'S atletikou jsem začínal v Ústí nad Orlicí a postupně se od kratších tratí propracoval až k maratonu. Běhání se z koníčku stalo životním stylem a nakonec i cestou k profesionálnímu sportu. Za poslední roky mám za sebou tisíce naběhaných kilometrů, náročná soustředění v Keni a řadu závodů doma i v zahraničí.',
            'V březnu 2026 jsem v Barceloně zaběhl maraton za 2:16:27, nejrychlejší český výkon za posledních šest let. Byl to důležitý milník, ale rozhodně ne konečná stanice.',
            'Mým cílem je překonat český maratonský rekord 2:11:57, který v roce 1993 zaběhl Karel David. Tomu jsem podřídil poslední dva roky přípravy. První pokus proběhne 7. prosince 2026 ve Valencii.'
          ],
          en: [
            'I started athletics in Ústí nad Orlicí and gradually worked my way up from shorter distances to the marathon. Running turned from a hobby into a lifestyle and eventually into a professional career. Over the last years I’ve logged thousands of kilometres, tough training camps in Kenya and many races at home and abroad.',
            'In March 2026 I ran 2:16:27 in Barcelona, the fastest Czech marathon in six years. An important milestone, but definitely not the finish line.',
            'My goal is to break the Czech marathon record of 2:11:57, set by Karel David in 1993. I’ve dedicated the last two years of training to it. The first attempt takes place on 7 December 2026 in Valencia.'
          ]
        }
      },
      achievements: [
        { value: '1.', title: { cs: 'Mistrovství ČR v půlmaratonu', en: 'Czech Half Marathon Championships' }, detail: { cs: '2025', en: '2025' } },
        { value: '1.', title: { cs: 'Mistrovství ČR na 5 km', en: 'Czech 5 km Championships' }, detail: { cs: '2025', en: '2025' } },
        { value: '3×', icon: 'streak', title: { cs: 'Nejlepší Čech na Pražském půlmaratonu', en: 'Best Czech at the Prague Half Marathon' }, detail: { cs: '2023, 2024, 2025 · v roce 2025 i první Evropan celkově', en: '2023, 2024, 2025 · in 2025 also first European overall' } },
        { value: '1.', title: { cs: 'Nejlepší Čech na půlmaratonech RunCzech', en: 'Best Czech at RunCzech half marathons' }, detail: { cs: 'České Budějovice 2024, 2025, 2026 · Karlovy Vary 2023 · Olomouc 2023', en: 'České Budějovice 2024, 2025, 2026 · Karlovy Vary 2023 · Olomouc 2023' } },
        { value: '2.', title: { cs: 'Mistrovství ČR v maratonu', en: 'Czech Marathon Championships' }, detail: { cs: '2024 · 2. místo také v přespolním běhu 2023, 2024 a na 5 000 m 2023', en: '2024 · also 2nd in cross country 2023, 2024 and 5,000 m 2023' } },
        { value: '3.', title: { cs: 'Běchovice–Praha', en: 'Běchovice–Prague' }, detail: { cs: 'Legendární MČR na 10 km, 2026', en: 'Legendary Czech 10 km championships, 2026' } }
      ],
      goals: {
        title: { cs: 'REKORD.<br>Jak se mění historie.', en: 'REKORD.<br>How history changes.' },
        intro: { cs: 'Cestu za českým maratonským rekordem zachycuje připravovaný dokumentární film v režii Jana Šimánka. Natáčení probíhá už teď, kdy ještě nikdo neví, jak celý příběh dopadne.', en: 'The road to the Czech marathon record is being captured in an upcoming documentary directed by Jan Šimánek. Filming is already underway – while nobody yet knows how the story ends.' },
        items: [
          { label: '7. 12. 2026', title: { cs: 'První pokus o rekord', en: 'First record attempt' }, detail: { cs: 'Maraton ve Valencii. Cíl: pokořit 2:11:57 Karla Davida z roku 1993.', en: 'Valencia Marathon. Target: beat Karel David’s 2:11:57 from 1993.' } },
          { label: 'FILM', title: { cs: 'Zákulisí vrcholového sportu', en: 'Behind the scenes of elite sport' }, detail: { cs: 'Tréninky, soustředění v Keni, spolupráce s trenérem, osobní život i rekordní pokusy. A příběh nové generace českých vytrvalců.', en: 'Training, camps in Kenya, work with the coach, personal life and the record attempts. And the story of a new generation of Czech distance runners.' } }
        ]
      },
      partnerOffer: {
        text: { cs: 'Partnerství vnímám jako dlouhodobou spolupráci postavenou na důvěře, výsledcích a společných hodnotách. Nechci být jen logo na dresu. Díky zázemí managementu nabízím kompletní obsahový servis – od strategie přes texty a fotografie až po video.', en: 'I see partnership as long-term cooperation built on trust, results and shared values. I don’t want to be just a logo on a vest. Thanks to my management team I offer a complete content service – from strategy to copy, photography and video.' },
        items: {
          cs: ['Zapojení značky do připravovaného dokumentárního filmu', 'Přednášky na firemních akcích (motivační, o tréninku, na zadání)', 'Reprezentace na Instagramu, Stravě a YouTube', 'Vlastní foto a video obsah, recenze z reálného používání', 'Vývoj a testování produktů, společné tréninkové kempy'],
          en: ['Brand involvement in the upcoming documentary', 'Talks at corporate events (motivational, on training, made to brief)', 'Representation on Instagram, Strava and YouTube', 'Own photo and video content, reviews from real use', 'Product development and testing, joint training camps']
        },
        reach: [
          { value: '23 tis.', label: { cs: 'sledujících na Instagramu', en: 'Instagram followers' } },
          { value: '44 200', label: { cs: 'průměrné zhlédnutí reels', en: 'average reel views' } },
          { value: '7,99 %', label: { cs: 'engagement rate', en: 'engagement rate' } },
          { value: '6 200+', label: { cs: 'sledujících na Stravě', en: 'Strava followers' } }
        ]
      },
      socials: [
        { label: 'Instagram', url: 'https://www.instagram.com/patrik.vebr/' }
      ],
      partners: [
        { name: 'Hlavní partner', tier: 'main', draft: true },
        { name: 'Partner', draft: true },
        { name: 'Partner', draft: true },
        { name: 'Partner', draft: true }
      ],
      gallery: [
        { src: 'assets/athletes/patrik-vebr/gallery-1.webp', alt: { cs: 'Patrik Vebr na Pražském půlmaratonu', en: 'Patrik Vebr at the Prague Half Marathon' } },
        { src: 'assets/athletes/patrik-vebr/gallery-2.webp', alt: { cs: 'Patrik Vebr s fanoušky', en: 'Patrik Vebr with fans' } },
        { src: 'assets/athletes/patrik-vebr/gallery-3.webp', alt: { cs: 'Patrik Vebr s vlajkou v cíli', en: 'Patrik Vebr with a flag at the finish' } },
        { src: 'assets/athletes/patrik-vebr/gallery-4.webp', alt: { cs: 'Patrik Vebr v cíli závodu', en: 'Patrik Vebr at the finish line' } },
        { src: 'assets/athletes/patrik-vebr/gallery-5.webp', alt: { cs: 'Patrik Vebr po vítězství', en: 'Patrik Vebr after a win' } },
        { src: 'assets/athletes/patrik-vebr/gallery-6.webp', alt: { cs: 'Patrik Vebr na horách', en: 'Patrik Vebr in the mountains' } }
      ]
    },
    {
      slug: 'tomas-stverak',
      name: 'Tomáš Štverák',
      accent: '#ff6a1a',
      sport: { cs: 'Ultra trail', en: 'Ultra trail' },
      tagline: { cs: 'Ultra trailový běžec z Beskyd. Výkonnost a vytrvalost na nejtěžších horských tratích.', en: 'Ultra trail runner from the Beskydy mountains. Performance and endurance on the toughest mountain courses.' },
      hero: { word: 'ULTRA', background: 'assets/athletes/tomas-stverak/hero.webp', cutout: 'assets/athletes/tomas-stverak/cutout.webp' },
      photo: 'assets/athletes/tomas-stverak/portrait.webp',
      cardPhoto: 'assets/athletes/tomas-stverak/card.webp',
      stats: [
        { value: '4×', label: { cs: 'finisher UTMB', en: 'UTMB finisher' } },
        { value: '3×', label: { cs: 'vítěz LH24', en: 'LH24 winner' } },
        { value: '21.', label: { cs: 'Tor des Géants · nejlepší český čas', en: 'Tor des Géants · best Czech time' } }
      ],
      story: {
        title: { cs: 'Od Beskydské sedmičky k UTMB.', en: 'From the Beskydy Seven to UTMB.' },
        paragraphs: {
          cs: [
            'Pocházím z Beskyd a sportu se věnuji od dětství. K ultra trailu jsem se dostal v šestnácti letech při svém prvním závodě Beskydská sedmička. Od té doby se běh stal nedílnou součástí mého života.',
            'Od roku 2013 se běhu věnuji aktivně a systematicky. Vedle zaměstnání trénuji a závodím na poloprofesionální úrovni s cílem dlouhodobě se posouvat směrem k profesionálnímu sportu a obstát v mezinárodní konkurenci.',
            'Výsledky stavím na systematické přípravě, závodních zkušenostech a schopnosti zvládat dlouhodobou zátěž. Jsem pořád obyčejný kluk z České republiky, ale s velkými plány, ambicemi a chutí vítězit.'
          ],
          en: [
            'I come from the Beskydy mountains and have done sport since childhood. I found ultra trail at sixteen, at my first race, the Beskydy Seven. Since then running has been an essential part of my life.',
            'I’ve been running seriously and systematically since 2013. Alongside my job I train and race at a semi-professional level, with the long-term goal of moving towards professional sport and holding my own in international competition.',
            'My results are built on systematic preparation, race experience and the ability to handle long-term load. I’m still an ordinary guy from the Czech Republic – with big plans, ambition and the will to win.'
          ]
        }
      },
      achievements: [
        { value: '3×', title: { cs: 'LH24 · 1. místo', en: 'LH24 · 1st place' }, detail: { cs: '24 hodin na Lysé hoře', en: '24 hours on Lysá hora' } },
        { value: '3×', title: { cs: 'Pražská stovka · 1. místo', en: 'Prague 100 · 1st place' }, detail: { cs: 'Česko', en: 'Czech Republic' } },
        { value: '1.', title: { cs: 'MČR 100 km na silnici', en: 'Czech 100 km Road Championships' }, detail: { cs: 'Česko', en: 'Czech Republic' } },
        { value: '1.', title: { cs: '100 miles of Istria', en: '100 miles of Istria' }, detail: { cs: '100 mil · Chorvatsko', en: '100 miles · Croatia' } },
        { value: '1.', title: { cs: 'Malopolskie Biegi Górskie', en: 'Malopolskie Biegi Górskie' }, detail: { cs: 'Polsko', en: 'Poland' } },
        { value: '5.', title: { cs: 'Istria 100 by UTMB · 70K', en: 'Istria 100 by UTMB · 70K' }, detail: { cs: '11. 4. 2026 · 69 km / 2 250 m+ · 6:03:29', en: '11 Apr 2026 · 69 km / 2,250 m+ · 6:03:29' } },
        { value: '3.', title: { cs: 'MČR UltraSky LHUT', en: 'Czech UltraSky Champs LHUT' }, detail: { cs: 'Lysohorský Ultra Trail', en: 'Lysohorský Ultra Trail' } },
        { value: '31.', title: { cs: 'UTMB', en: 'UTMB' }, detail: { cs: '4× finisher, nejlepší výsledek 31. místo', en: '4× finisher, best result 31st place' } }
      ],
      goals: {
        title: { cs: 'Směr 2027–2028:<br>TOP 10 v UTMB.', en: 'Heading for 2027–2028:<br>UTMB TOP 10.' },
        intro: { cs: 'Mým cílem je dlouhodobě se prosazovat mezi nejlepšími ultra trailovými běžci a krok za krokem posouvat české jméno na mezinárodní scéně.', en: 'My goal is to establish myself among the best ultra trail runners and step by step put the Czech name on the international map.' },
        items: [
          { label: '2026', title: { cs: 'Sezóna UTMB World Series', en: 'UTMB World Series season' }, detail: { cs: 'LH24 (2. místo), Istria by UTMB 70K (5. celkově), MČR UltraSky LHUT, Stubai 100, Beskydská sedmička a v listopadu Mallorca by UTMB. Posunout UTMB a ITRA index a přiblížit se kvalifikaci na CCC 2027.', en: 'LH24 (2nd), Istria by UTMB 70K (5th overall), Czech UltraSky Champs LHUT, Stubai 100, Beskydy Seven and Mallorca by UTMB in November. Raise the UTMB and ITRA index and get closer to qualifying for CCC 2027.' } },
          { label: '2027', title: { cs: 'CCC · TOP 10', en: 'CCC · TOP 10' }, detail: { cs: 'Na Tenerife Bluetrail by UTMB se kvalifikovat na UTMB World Series Finals 2028 a na CCC bojovat o co nejlepší umístění.', en: 'Qualify for the 2028 UTMB World Series Finals at Tenerife Bluetrail by UTMB and fight for the best possible result at CCC.' } },
          { label: '2028', title: { cs: 'UTMB · TOP 10', en: 'UTMB · TOP 10' }, detail: { cs: 'Výsledek na úrovni TOP 10 na UTMB, místo v reprezentaci České republiky a start na mistrovství světa a Evropy.', en: 'A TOP 10 level result at UTMB, a spot on the Czech national team and starts at the World and European Championships.' } }
        ]
      },
      impact: {
        title: { cs: 'Běh, který<br>pomáhá.', en: 'Running that<br>helps.' },
        intro: { cs: 'Sport pro mě není jen o výsledku, ale také o možnosti využít jeho sílu pro dobrou věc a přinášet inspiraci i mimo závodní prostředí.', en: 'Sport isn’t just about results for me – it’s also a chance to use its power for a good cause and inspire beyond racing.' },
        items: [
          { label: '165 535 Kč', title: { cs: 'Double Everesting pro Kubu', en: 'Double Everesting for Kuba' }, detail: { cs: '176 km · 18 000 m+ · 43 h 13 min · 5. běžecky dokončený double everesting na světě', en: '176 km · 18,000 m+ · 43 h 13 min · 5th double everesting completed on foot worldwide' } },
          { label: '163 832 Kč', title: { cs: 'FKT Cesta hrdinů SNP pro Adélku', en: 'FKT Path of SNP Heroes for Adélka' }, detail: { cs: '770 km · 30 000 m+ · 6 dní 19 hodin · nový FKT', en: '770 km · 30,000 m+ · 6 days 19 hours · new FKT' } },
          { label: '107 484 Kč', title: { cs: 'Okres Vsetín loop pro ZOO Zlín', en: 'Vsetín District loop for Zlín ZOO' }, detail: { cs: '210 km · 7 000 m+ · 39 h 11 min · v zimních podmínkách', en: '210 km · 7,000 m+ · 39 h 11 min · in winter conditions' } }
        ]
      },
      partnerOffer: {
        text: { cs: 'Partnerství nevnímám jako jednorázové umístění loga nebo vychválení produktu. Stavím ho na spolupráci, tréninkové i závodní konzistenci, důvěryhodnosti a originálním obsahu. Svou sílu vidím v upřímné reprezentaci značky v komunitě extrémních závodů a běžců.', en: 'To me, partnership isn’t a one-off logo placement or product praise. I build it on cooperation, consistency in training and racing, credibility and original content. My strength is honest brand representation in the community of extreme races and runners.' },
        items: {
          cs: ['Reprezentace značky na trailových a skyrunningových závodech po celém světě', 'Instagram a Strava, vlastní foto a video obsah', 'Přirozené zapojení produktů do tréninku a závodní přípravy', 'Vývoj a testování produktů, recenze z reálného používání', 'Společné tréninkové kempy, komunitní aktivity a charitativní projekty'],
          en: ['Brand representation at trail and skyrunning races worldwide', 'Instagram and Strava, own photo and video content', 'Natural use of products in training and race preparation', 'Product development and testing, reviews from real use', 'Joint training camps, community activities and charity projects']
        },
        reach: [
          { value: '3 000+', label: { cs: 'sledujících na Stravě', en: 'Strava followers' } },
          { value: '436 tis. Kč', label: { cs: 'vybráno na charitu', en: 'raised for charity' } }
        ]
      },
      socials: [
        { label: 'Instagram', url: 'https://www.instagram.com/stveraktomas/' }
      ],
      partners: [
        { name: 'Hlavní partner', tier: 'main', draft: true },
        { name: 'Partner', draft: true },
        { name: 'Partner', draft: true },
        { name: 'Partner', draft: true }
      ],
      gallery: [
        { src: 'assets/athletes/tomas-stverak/gallery-1.webp', alt: { cs: 'Tomáš Štverák s čelovkou za soumraku', en: 'Tomáš Štverák with a headlamp at dusk' } },
        { src: 'assets/athletes/tomas-stverak/gallery-2.webp', alt: { cs: 'Výstup po skalách', en: 'Climbing over rocks' } },
        { src: 'assets/athletes/tomas-stverak/gallery-3.webp', alt: { cs: 'Zimní trénink na horách', en: 'Winter training in the mountains' } },
        { src: 'assets/athletes/tomas-stverak/gallery-4.webp', alt: { cs: 'Tomáš Štverák na závodě', en: 'Tomáš Štverák racing' } },
        { src: 'assets/athletes/tomas-stverak/gallery-5.webp', alt: { cs: 'Cíl Lysohorského Ultra Trailu', en: 'Finish of the Lysohorský Ultra Trail' } },
        { src: 'assets/athletes/tomas-stverak/gallery-6.webp', alt: { cs: 'Tomáš Štverák na UTMB', en: 'Tomáš Štverák at UTMB' } }
      ]
    }
  ],

  /* ---------- ÚVODNÍ KARUSEL (hero) ----------
     athlete … slug sportovce; slovo, pozadí a výřez se berou z jeho „hero“ (lze tu přepsat: word, background, cutout)
     title   … nadpis na slidu
  */
  featured: [
    { athlete: 'jana-svecova', title: 'JANA „CLIMBING JANE“ ŠVECOVÁ' },
    { athlete: 'patrik-vebr', title: 'PATRIK VEBR' },
    { athlete: 'tomas-stverak', title: 'TOMÁŠ ŠTVERÁK' }
  ],

  /* Sportovci zobrazení na hlavní stránce v sekci „The Renegades“ (slugy, v tomto pořadí). */
  homeAthletes: ['jana-svecova', 'patrik-vebr', 'tomas-stverak'],

  /* ---------- ZNAČKA ----------
     logo        … soubor loga agentury (SVG). null = zobrazí se textový nápis PUSHING RENEGADES.
     showDrafts  … true = mockupové texty a loga mají štítek MOCKUP. Před spuštěním přepnout na false
                   (a mockupy nahradit nebo smazat). Mockup se v datech značí draft: true.
     email       … obecný kontakt agentury (patička). Osobní kontakty sportovců a manažerů na web nedáváme.
     socials     … sítě agentury: [{ label, url }]
  */
  brand: {
    logo: null,
    showDrafts: true,
    email: 'info@pushingrenegades.cz',
    socials: [
      { label: 'Instagram', url: '#', draft: true },
      { label: 'Facebook', url: '#', draft: true },
      { label: 'YouTube', url: '#', draft: true },
      { label: 'LinkedIn', url: '#', draft: true }
    ]
  },

  /* ---------- ÚVODNÍ PR SPOT (hlavní stránka) ----------
     video          … embed odkaz na verzi na šířku (YouTube / Vimeo), např. 'https://www.youtube-nocookie.com/embed/XXXX'
     videoVertical  … embed odkaz na verzi na výšku (zobrazí se na mobilu); když chybí, použije se video
     poster         … obrázek pod tlačítkem přehrát
     lines          … text přes obraz (voiceover spotu)
     Dokud video chybí, tlačítko ukáže „Premiéra“.
  */
  film: {
    video: null,
    videoVertical: null,
    poster: 'assets/mountain.webp',
    eyebrow: { cs: 'Úvodní spot', en: 'Launch film' },
    premiere: { cs: 'Premiéra v lednu 2027', en: 'Premiere in January 2027' },
    lines: [
      'In our mad world obsessed with numbers, limits and records,',
      'we believe that hard work, dedication and story still matter.',
      'We support true underdogs unafraid to show courage,<br>beating heart and unbreakable determination.'
    ],
    claim: 'WE PUSH <em>RENEGADES!</em>'
  },

  /* ---------- PROJEKTY ----------
     Každý projekt má vlastní podstránku (?project=slug) postavenou stejně jako profil sportovce.
     slug, title, kicker (typ projektu), tagline, accent (barva, výchozí žlutá)
     featured  … true = velká karta mezi hlavními projekty na úvodní stránce
     athletes  … slugy sportovců, kteří v projektu jsou (projekt se ukáže i na jejich profilu)
     hero      … { word, background, cutout } jako u sportovce (cutout je volitelný)
     stats, story, timeline (stejně jako goals), team: [{ name, role: { cs, en }, detail: { cs, en }, athlete: slug }]
     offer     … sekce Pro partnery (stejně jako partnerOffer u sportovce)
     partners  … partneři projektu ve skupinách: [{ tier: 'general' | 'partner' | 'media', title: { cs, en }, items: [{ name, logo, url, color }] }]
     video     … { video, videoVertical, poster, lines, claim } – stejně jako úvodní spot
     inquiry   … předvyplněný text do formuláře
     draft     … true = mockup (štítek MOCKUP)
  */
  projects: [
    {
      slug: 'k2',
      featured: true,
      draft: true,
      title: 'K2',
      kicker: { cs: 'Expedice', en: 'Expedition' },
      tagline: { cs: 'Jakub Váňa a Tomáš Petreček míří na druhou nejvyšší horu světa. Hora, které se říká hora hor.', en: 'Jakub Váňa and Tomáš Petreček are heading for the second highest mountain on Earth. The one they call the mountain of mountains.' },
      hero: { word: 'K2', background: 'assets/mountain.webp' },
      illustrative: true,
      stats: [
        { value: '8 611 m', label: { cs: 'nadmořská výška', en: 'elevation' } },
        { value: 'KARAKORAM', label: { cs: 'Pákistán / Čína', en: 'Pakistan / China' } },
        { value: '2', label: { cs: 'renegádi v jádru týmu', en: 'renegades at the core' } }
      ],
      story: {
        title: { cs: 'Ne každý vrchol je o tom, kdo tam stál první.', en: 'Not every summit is about who stood there first.' },
        paragraphs: {
          cs: [
            'K2 není hora, na kterou se jde pro fotku z vrcholu. Je to zkouška trpělivosti, týmu a rozhodnutí, která se dělají v řídkém vzduchu a na hraně možností.',
            'Projekt K2 je pro Pushing Renegades víc než expedice. Je to příběh dvou lidí, kteří si svou cestu vydřeli, a týmu, který jim pomáhá ji ukázat. Od přípravy přes aklimatizaci až po návrat domů.',
            'Celou cestu zachytíme na video a otevřeme ji partnerům, kteří chtějí být součástí něčeho skutečného.'
          ],
          en: [
            'K2 is not a mountain you climb for a summit selfie. It tests patience, the team and decisions made in thin air, right at the edge of what is possible.',
            'For Pushing Renegades, K2 is more than an expedition. It is the story of two people who earned their own path, and of a team that helps them show it. From preparation and acclimatisation all the way back home.',
            'We will capture the whole journey on film and open it to partners who want to be part of something real.'
          ]
        },
        quote: { cs: 'Hora rozhodne. My jen musíme být připravení.', en: 'The mountain decides. We just have to be ready.' }
      },
      timeline: {
        title: { cs: 'Cesta<br>na K2.', en: 'The road<br>to K2.' },
        intro: { cs: 'Termíny a detaily expedice doplníme podle prezentace projektu.', en: 'Dates and expedition details will follow from the project presentation.' },
        items: [
          { label: { cs: 'FÁZE 01', en: 'PHASE 01' }, title: { cs: 'Příprava', en: 'Preparation' }, detail: { cs: 'Trénink, výběr týmu, logistika, vybavení a partneři.', en: 'Training, team selection, logistics, equipment and partners.' } },
          { label: { cs: 'FÁZE 02', en: 'PHASE 02' }, title: { cs: 'Aklimatizace', en: 'Acclimatisation' }, detail: { cs: 'Cesta do základního tábora a postupné zvykání na výšku.', en: 'The trek to base camp and gradual adaptation to altitude.' } },
          { label: { cs: 'FÁZE 03', en: 'PHASE 03' }, title: { cs: 'Výstup', en: 'The climb' }, detail: { cs: 'Okno na vrchol. Rozhodnutí, která se nedají vrátit.', en: 'The summit window. Decisions that cannot be undone.' } },
          { label: { cs: 'FÁZE 04', en: 'PHASE 04' }, title: { cs: 'Příběh', en: 'The story' }, detail: { cs: 'Film, přednášky a obsah pro partnery i fanoušky.', en: 'Film, talks and content for partners and fans.' } }
        ]
      },
      team: [
        { name: 'Jakub Váňa', role: { cs: 'Horolezec', en: 'Mountaineer' }, detail: { cs: 'Profil doplníme.', en: 'Profile coming soon.' } },
        { name: 'Tomáš Petreček', role: { cs: 'Horolezec', en: 'Mountaineer' }, detail: { cs: 'Profil doplníme.', en: 'Profile coming soon.' } }
      ],
      offer: {
        text: { cs: 'Expedice na K2 je příběh, který lidé sledují od prvního tréninku až po návrat domů. Partnerům nabízíme místo přímo v něm, ne jen na reklamní ploše.', en: 'A K2 expedition is a story people follow from the first training session all the way home. We offer partners a place inside it, not just ad space.' },
        items: {
          cs: ['Značka ve filmu a v obsahu z expedice', 'Testování vybavení v extrémních podmínkách', 'Přednášky a firemní akce po návratu', 'Exkluzivní obsah pro sítě partnera'],
          en: ['Brand presence in the film and expedition content', 'Gear testing in extreme conditions', 'Talks and corporate events after the return', 'Exclusive content for the partner’s channels']
        }
      },
      partners: [
        { tier: 'general', title: { cs: 'Generální partner expedice', en: 'Expedition title partner' }, items: [{ name: 'Generální partner', draft: true }] },
        { tier: 'partner', title: { cs: 'Partneři', en: 'Partners' }, items: [{ name: 'Outdoor', draft: true }, { name: 'Technologie', draft: true }, { name: 'Výživa', draft: true }] }
      ],
      video: { poster: 'assets/mountain.webp', lines: ['The mountain decides.'], claim: 'K2 / <em>SOON</em>' },
      inquiry: { cs: 'Mám zájem o partnerství projektu K2.', en: 'I am interested in partnering on the K2 project.' }
    },
    {
      slug: 'rekord',
      featured: true,
      draft: true,
      title: 'REKORD',
      kicker: { cs: 'Dokumentární film', en: 'Documentary' },
      athletes: ['patrik-vebr'],
      accent: '#ffd400',
      tagline: { cs: 'Patrik Vebr jde po českém maratonském rekordu, který drží od roku 1993 Karel David. Film o tom, jak se mění historie. Pracovní název.', en: 'Patrik Vebr is chasing the Czech marathon record held by Karel David since 1993. A film about how history changes. Working title.' },
      hero: { word: '2:11:57', background: 'assets/athletes/patrik-vebr/hero.webp', cutout: 'assets/athletes/patrik-vebr/cutout.webp' },
      stats: [
        { value: '2:11:57', label: { cs: 'český rekord · 1993', en: 'Czech record · 1993' } },
        { value: '2:16:27', label: { cs: 'Patrikův maraton · 2026', en: 'Patrik’s marathon · 2026' } },
        { value: '7. 12.', label: { cs: 'první pokus · Valencia', en: 'first attempt · Valencia' } }
      ],
      story: {
        title: { cs: 'Natáčíme, i když nikdo neví, jak to dopadne.', en: 'We are filming, even though nobody knows how it ends.' },
        paragraphs: {
          cs: [
            'Rekord 2:11:57 vydržel přes třicet let. Patrik Vebr mu podřídil poslední dva roky: tisíce kilometrů, soustředění v Keni a závody doma i v zahraničí.',
            'Dokumentární film v režii Jana Šimánka zachycuje cestu za rekordem zevnitř. Tréninky, spolupráci s trenérem, osobní život i samotné rekordní pokusy. A příběh nové generace českých vytrvalců.'
          ],
          en: [
            'The 2:11:57 record has stood for over thirty years. Patrik Vebr has dedicated the last two years to it: thousands of kilometres, training camps in Kenya and races at home and abroad.',
            'The documentary directed by Jan Šimánek follows the road to the record from the inside. Training, work with the coach, personal life and the record attempts themselves. And the story of a new generation of Czech distance runners.'
          ]
        }
      },
      timeline: {
        title: { cs: 'Jak se mění<br>historie.', en: 'How history<br>changes.' },
        items: [
          { label: '2024–26', title: { cs: 'Příprava', en: 'Preparation' }, detail: { cs: 'Soustředění v Keni, závody a postupné zlepšování až na 2:16:27 v Barceloně.', en: 'Camps in Kenya, races and steady progress down to 2:16:27 in Barcelona.' } },
          { label: '7. 12. 2026', title: { cs: 'Valencia', en: 'Valencia' }, detail: { cs: 'První pokus o český rekord.', en: 'First attempt at the Czech record.' } },
          { label: 'FILM', title: { cs: 'Premiéra', en: 'Premiere' }, detail: { cs: 'Termín premiéry oznámíme.', en: 'Premiere date to be announced.' } }
        ]
      },
      team: [
        { name: 'Patrik Vebr', athlete: 'patrik-vebr', role: { cs: 'Maratonec', en: 'Marathon runner' }, detail: { cs: 'Hlavní postava filmu.', en: 'The film’s protagonist.' } },
        { name: 'Jan Šimánek', role: { cs: 'Režie', en: 'Director' }, detail: { cs: 'Režisér dokumentu.', en: 'Director of the documentary.' } }
      ],
      offer: {
        text: { cs: 'Film o rekordu je příležitost spojit značku s příběhem, který se teprve píše. Partneři projektu jsou ve filmu i v obsahu kolem něj.', en: 'A film about the record is a chance to tie a brand to a story that is still being written. Project partners appear in the film and in the content around it.' },
        items: {
          cs: ['Zapojení značky do dokumentárního filmu', 'Obsah ze zákulisí přípravy a závodů', 'Premiéra, projekce a přednášky'],
          en: ['Brand involvement in the documentary', 'Behind-the-scenes content from training and races', 'Premiere, screenings and talks']
        }
      },
      partners: [
        { tier: 'partner', title: { cs: 'Partneři filmu', en: 'Film partners' }, items: [{ name: 'Partner filmu', draft: true }, { name: 'Partner filmu', draft: true }] }
      ],
      video: { poster: 'assets/athletes/patrik-vebr/gallery-4.webp', lines: ['Teaser'], claim: 'REKORD / <em>TEASER</em>' },
      inquiry: { cs: 'Mám zájem o partnerství filmu REKORD.', en: 'I am interested in partnering on the REKORD film.' }
    },
    {
      slug: 'tracking',
      draft: true,
      title: 'TRACKING',
      kicker: { cs: 'Služba', en: 'Service' },
      tagline: { cs: 'Živé sledování závodníků na trati. Pro fanoušky, partnery i média. Ve spolupráci s Pavlem Paloncým.', en: 'Live tracking of athletes on course. For fans, partners and media. In cooperation with Pavel Paloncý.' },
      hero: { word: 'LIVE', background: 'assets/athletes/tomas-stverak/gallery-1.webp' },
      illustrative: true,
      stats: [
        { value: 'LIVE', label: { cs: 'poloha v reálném čase', en: 'real-time position' } },
        { value: '24/7', label: { cs: 'ultra, expedice, FKT', en: 'ultra, expeditions, FKT' } },
        { value: '1 odkaz', label: { cs: 'pro fanoušky i partnery', en: 'for fans and partners' } }
      ],
      story: {
        title: { cs: 'Ať lidé vidí, kde se příběh právě odehrává.', en: 'Let people see where the story is happening right now.' },
        paragraphs: {
          cs: [
            'Ultra závod, expedice nebo pokus o FKT trvá hodiny i dny. Tracking dává fanouškům, rodině, partnerům a médiím možnost sledovat závodníka živě na mapě.',
            'Postaráme se o tracker, mapu i komunikaci. Ty se soustředíš na výkon.'
          ],
          en: [
            'An ultra race, an expedition or an FKT attempt lasts hours or days. Tracking lets fans, family, partners and media follow the athlete live on a map.',
            'We take care of the tracker, the map and the communication. You focus on the performance.'
          ]
        }
      },
      timeline: {
        title: { cs: 'Jak to<br>funguje.', en: 'How it<br>works.' },
        items: [
          { label: '01', title: { cs: 'Tracker', en: 'Tracker' }, detail: { cs: 'Závodník dostane GPS tracker a my nastavíme trasu.', en: 'The athlete gets a GPS tracker and we set up the route.' } },
          { label: '02', title: { cs: 'Živá mapa', en: 'Live map' }, detail: { cs: 'Fanoušci sledují polohu, tempo a průběh na jednom odkazu.', en: 'Fans follow position, pace and progress on a single link.' } },
          { label: '03', title: { cs: 'Příběh a data', en: 'Story and data' }, detail: { cs: 'Z trasy vznikne obsah pro sítě, partnery a média.', en: 'The route becomes content for social media, partners and the press.' } }
        ]
      },
      team: [
        { name: 'Pavel Paloncý', role: { cs: 'Tracking', en: 'Tracking' }, detail: { cs: 'Profil doplníme.', en: 'Profile coming soon.' } }
      ],
      inquiry: { cs: 'Mám zájem o tracking na závodě: ', en: 'I am interested in tracking for a race: ' }
    }
  ],

  /* ---------- PARTNEŘI PUSHING RENEGADES (hlavní stránka) ----------
     Skupiny podle úrovně. Pořadí = pořadí na webu. Prázdná skupina se nezobrazí.
     items: [{ name, logo, url, color }] – logo podle pravidel v README (Loga partnerů).
  */
  partners: {
    title: { cs: 'Partneři,<br>kteří tlačí s námi.', en: 'Partners who<br>push with us.' },
    text: { cs: 'Spolupracujeme se značkami, které sdílejí naše hodnoty. Partneři jednotlivých sportovců jsou na jejich profilech.', en: 'We work with brands that share our values. Each athlete’s own partners are listed on their profile.' },
    tiers: [
      { tier: 'general', title: { cs: 'Generální partner', en: 'Title partner' }, items: [{ name: 'Generální partner', draft: true }] },
      { tier: 'partner', title: { cs: 'Partneři', en: 'Partners' }, items: [{ name: 'Technologie', draft: true }, { name: 'Outdoor', draft: true }, { name: 'Finance', draft: true }, { name: 'E-commerce', draft: true }] },
      { tier: 'media', title: { cs: 'Mediální partneři', en: 'Media partners' }, items: [{ name: 'Médium', draft: true }, { name: 'Médium', draft: true }, { name: 'Médium', draft: true }] }
    ]
  },

  /* ---------- AKTUALITY (hlavní stránka) ----------
     [{ date, title: { cs, en }, text: { cs, en }, url (volitelně, i odkaz na profil: '?athlete=slug') }] – nejnovější nahoře, zobrazí se 4.
  */
  news: [
    { date: '12/2026', draft: true, title: { cs: 'Patrik Vebr jde ve Valencii po rekordu', en: 'Patrik Vebr goes for the record in Valencia' }, text: { cs: '7. prosince první pokus o český maratonský rekord 2:11:57.', en: 'First attempt at the 2:11:57 Czech marathon record on 7 December.' }, url: '?project=rekord' },
    { date: '12/2026', draft: true, title: { cs: 'Natáčíme úvodní spot', en: 'Shooting the launch film' }, text: { cs: 'Renegádi před kamerou. Premiéra v lednu 2027.', en: 'The renegades in front of the camera. Premiere in January 2027.' } },
    { date: '2026', draft: true, title: { cs: 'Jana Švecová: prvopřelez Tokyo Drift 8C', en: 'Jana Švecová: first ascent of Tokyo Drift 8C' }, text: { cs: 'Už třetí skalní 8C v Janině kariéře.', en: 'The third 8C on rock in Jana’s career.' }, url: '?athlete=jana-svecova' }
  ],

  /* ---------- MÉDIA (?page=media) ----------
     press   … tiskové zprávy: [{ date, title: { cs, en }, text: { cs, en }, file: 'assets/media/tz.pdf' }]
     contact … mediální kontakt agentury (ne osobní kontakty sportovců)
     kit     … co je v press kitu + soubor ke stažení
     faq     … [{ q: { cs, en }, a: { cs, en } }]
  */
  media: {
    title: { cs: 'PRO<br><em>MÉDIA.</em>', en: 'FOR THE<br><em>PRESS.</em>' },
    text: { cs: 'Tiskové zprávy, fotky ke stažení a kontakt pro novináře. Rozhovor se sportovcem domluvíme rychle.', en: 'Press releases, downloadable photos and a press contact. We arrange athlete interviews quickly.' },
    press: [
      { date: '01/2027', draft: true, title: { cs: 'Startuje Pushing Renegades: sportovní PR pro ty, kdo jdou vlastní cestou', en: 'Pushing Renegades launches: sports PR for those who take their own path' }, text: { cs: 'Tisková zpráva ke spuštění projektu. Text doplníme.', en: 'Launch press release. Text to follow.' }, file: null }
    ],
    contact: {
      draft: true,
      name: { cs: 'Mediální kontakt', en: 'Press contact' },
      email: 'media@pushingrenegades.cz',
      text: { cs: 'Rozhovory, fotky, natáčení a akreditace. Ozveme se do 24 hodin.', en: 'Interviews, photos, filming and accreditation. We reply within 24 hours.' }
    },
    kit: {
      items: {
        cs: ['Logo Pushing Renegades (SVG, PNG)', 'Fotky sportovců v tiskové kvalitě', 'Medailonky sportovců', 'Úvodní spot'],
        en: ['Pushing Renegades logo (SVG, PNG)', 'Athlete photos in print quality', 'Athlete bios', 'Launch film']
      },
      file: null
    },
    faq: [
      { draft: true, q: { cs: 'Co je Pushing Renegades?', en: 'What is Pushing Renegades?' }, a: { cs: 'Sportovní PR agentura. Zastupujeme sportovce, kteří jdou vlastní cestou, plánujeme jejich projekty, hledáme partnery a pomáháme jejich příběhům dostat se k lidem.', en: 'A sports PR agency. We represent athletes who take their own path, plan their projects, find partners and help their stories reach people.' } },
      { draft: true, q: { cs: 'Jak domluvit rozhovor se sportovcem?', en: 'How do I arrange an interview with an athlete?' }, a: { cs: 'Napište na mediální kontakt nebo přes formulář. Domluvíme termín i formu.', en: 'Write to the press contact or use the form. We will arrange the time and format.' } },
      { draft: true, q: { cs: 'Můžu použít fotky z webu?', en: 'Can I use photos from the website?' }, a: { cs: 'Pro média jsou fotky v press kitu. U každé uveďte autora podle popisku.', en: 'Photos for the media are in the press kit. Please credit the photographer as listed.' } },
      { draft: true, q: { cs: 'Jak se stát partnerem?', en: 'How do I become a partner?' }, a: { cs: 'Ozvěte se přes formulář. Připravíme nabídku na míru, ať jde o sportovce, projekt, nebo celou agenturu.', en: 'Get in touch via the form. We will prepare a tailored offer for an athlete, a project or the whole agency.' } },
      { draft: true, q: { cs: 'Jsem sportovec. Můžu se přidat?', en: 'I am an athlete. Can I join?' }, a: { cs: 'Napiš nám o sobě přes formulář (volba „Jsem sportovec“). Každou zprávu čteme.', en: 'Tell us about yourself via the form (choose “I am an athlete”). We read every message.' } }
    ]
  },

  /* ---------- TEXTY HLAVNÍ STRÁNKY ---------- */
  home: {
    heroEyebrow: 'SPORTS PR / OFF THE BEATEN PATH',
    heroTitle: 'WE PUSH <em>RENEGADES.</em>',
    heroText: {
      cs: 'Výkon je váš. Pozornost zařídíme my. Sportovní PR pro ty, kteří si svou cestu musí vydřít.',
      en: 'Your performance. Our push. Sports PR for those who earn every step of their own path.'
    },
    heroDisciplines: 'BOULDERING / MARATHON / ULTRA TRAIL',
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

    // Mise, vize, filozofie – krátce pod postojem. Smazat = nezobrazí se.
    pillars: [
      { draft: true, label: { cs: 'Mise', en: 'Mission' }, text: { cs: 'Podporovat výjimečné sportovce, jejich příběhy, odhodlání a cestu za vlastními cíli.', en: 'To support exceptional athletes, their stories, their determination and the road to their own goals.' } },
      { draft: true, label: { cs: 'Vize', en: 'Vision' }, text: { cs: 'Svět, kde se vedle čísel a rekordů počítá i dřina, odvaha a příběh.', en: 'A world where hard work, courage and story count alongside numbers and records.' } },
      { draft: true, label: { cs: 'Filozofie', en: 'Philosophy' }, text: { cs: 'Neděláme z lidí reklamu. Dáváme hlas tomu, co už v nich je.', en: 'We don’t turn people into ads. We give a voice to what is already there.' } }
    ],

    projects: {
      title: { cs: 'Projekty,<br>které posouvají hranice.', en: 'Projects that<br>push limits.' },
      text: { cs: 'Expedice, filmy a služby, které stavíme se sportovci a partnery.', en: 'Expeditions, films and services we build with athletes and partners.' }
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
    claim: { cs: 'Sportovní PR agentura pro sportovce, kteří jdou vlastní cestou. Zastupujeme je, plánujeme projekty a propojujeme je se značkami.', en: 'A sports PR agency for athletes who take their own path. We represent them, plan projects and connect them with brands.' },
    left: 'PUSHING RENEGADES / WE PUSH RENEGADES.',
    right: { cs: 'SPORTOVNÍ PR VLASTNÍ CESTOU', en: 'SPORTS PR OUR OWN WAY' }
  }
};
