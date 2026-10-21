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
     photo      … hlavní fotka na profilu (na výšku)
     cardPhoto  … fotka na kartu v seznamu (na výšku 3:4)
     illustrative … true = fotka je jen ilustrační (zobrazí se upozornění)
     stats      … velká čísla v hlavičce profilu: [{ value, label: { cs, en } }]
     story      … „Moje cesta“: { title: { cs, en }, paragraphs: { cs: [...], en: [...] }, quote: { cs, en } }
     achievements … úspěchy: [{ value, title: { cs, en }, detail: { cs, en } }]
     goals      … cíle: { title: { cs, en }, intro: { cs, en }, items: [{ label, title: { cs, en }, detail: { cs, en } }] }
     impact     … volitelná sekce navíc (např. charita), stejná struktura jako goals
     partnerOffer … sekce Pro partnery: { text: { cs, en }, items: { cs: [...], en: [...] }, reach: [{ value, label: { cs, en } }] }
     socials    … odkazy: [{ label: 'Instagram', url: 'https://...' }]
     partners   … loga partnerů: [{ name, logo: 'assets/partneri/x.webp', url }] – prázdné = sekce se nezobrazí
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
      partners: [],
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
        { value: '3×', title: { cs: 'Nejlepší Čech na Pražském půlmaratonu', en: 'Best Czech at the Prague Half Marathon' }, detail: { cs: '2023, 2024, 2025 · v roce 2025 i první Evropan celkově', en: '2023, 2024, 2025 · in 2025 also first European overall' } },
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
      partners: [],
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
      partners: [],
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
     athlete    … slug sportovce ze seznamu výše
     word       … velké slovo v pozadí
     title      … nadpis na slidu
     background … fotka pozadí
     cutout     … výřez postavy s průhledným pozadím (.webp nebo .png)
     illustrative … true = AI ilustrace (zobrazí se upozornění), u skutečných fotek false
  */
  featured: [
    { athlete: 'jana-svecova', word: 'JANE', title: 'JANA „CLIMBING JANE“ ŠVECOVÁ', background: 'assets/athletes/jana-svecova/hero.webp', cutout: 'assets/athletes/jana-svecova/cutout.webp' },
    { athlete: 'patrik-vebr', word: 'VEBR', title: 'PATRIK VEBR', background: 'assets/athletes/patrik-vebr/hero.webp', cutout: 'assets/athletes/patrik-vebr/cutout.webp' },
    { athlete: 'tomas-stverak', word: 'ULTRA', title: 'TOMÁŠ ŠTVERÁK', background: 'assets/athletes/tomas-stverak/hero.webp', cutout: 'assets/athletes/tomas-stverak/cutout.webp' }
  ],

  /* Sportovci zobrazení na hlavní stránce v sekci „The Renegades“ (slugy, v tomto pořadí). */
  homeAthletes: ['jana-svecova', 'patrik-vebr', 'tomas-stverak'],

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
