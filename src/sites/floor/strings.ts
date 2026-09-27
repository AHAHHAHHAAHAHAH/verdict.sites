// FloorVerdict copy in every published language. Generic interface text lives in src/i18n/ui.ts.
import type { PerLang, SiteStrings } from '../../lib/pack';

export const strings = {
  en: {
    tagline: 'Clean floors, chosen on the data',
    nav: { find: 'Find yours' },
    quiz: {
      title: 'What do the floors in your home need?',
      sub: 'Answer 3 questions at most: FloorVerdict tells you which one to buy, and why.',
    },
    home: {
      metaDescription: 'FloorVerdict helps you choose a robot vacuum, a cordless vacuum, a hard floor cleaner or a steam mop: 3 questions at most, one model, prices and sources.',
      pickDirect: 'Or choose directly',
      seo: {
        keyphrase: 'FloorVerdict',
        title: 'FloorVerdict: robot, cordless vacuum or floor cleaner? Choose',
        description: 'FloorVerdict helps you choose a robot vacuum, a cordless vacuum, a hard floor cleaner or a steam mop: 3 questions at most, one model, prices and sources.',
      },
      how: {
        title: 'How FloorVerdict chooses',
        image: 'Robot vacuum, cordless vacuum, hard floor cleaner and steam mop: the products FloorVerdict compares (drawing)',
        points: [
          {
            t: 'Start from your situation',
            d: 'First our pick for your case, for example a home with dogs or cats or a smaller budget, with the reason in plain words; below it, every model on sale in your country, to sort as you like.',
          },
          {
            t: 'Every figure has its source',
            d: 'Suction, run time and noise come from the makers’ official pages and from independent tests. Next to each figure is the link to check it yourself.',
          },
          {
            t: 'Nobody pays to be picked',
            d: 'If you buy through one of our links we may earn a commission, at no cost to you. It never changes the pick. Prices are read from the brands’ own stores every day.',
          },
        ],
        tests: 'Independent tests we quote:',
        more: 'How FloorVerdict works, in detail',
      },
      faq: [
        {
          q: 'Robot or cordless vacuum?',
          a: 'A robot cleans by itself every day, but one floor at a time. A cordless vacuum is for quick clean-ups, stairs and thick rugs.',
          cat: 'robot',
        },
        {
          q: 'Is a robot vacuum and mop good with dogs or cats?',
          a: 'Yes: there is a pick just for pet owners, with a brush that sends pet hair and long hair straight into the bin.',
          cat: 'robot',
        },
        {
          q: 'Hard floor cleaner or steam mop?',
          a: 'A hard floor cleaner vacuums and washes in one pass. A steam mop washes with water and steam, no detergent, but does not pick up crumbs and dust: vacuum first.',
          cat: 'wet',
        },
        {
          q: 'Is a steam mop safe on wooden floors?',
          a: 'Only if the wood is sealed: on waxed, oiled or unsealed wood the steam damages it.',
          cat: 'steam',
        },
      ],
    },
    verdict: {
      indexDescription: 'One recommended model for each type, with the makers’ official data and the results of independent tests.',
      findMachine: 'Find yours in 3 taps',
      forMost: 'For most homes',
    },
    footer: { line: 'Robots, cordless vacuums, hard floor cleaners and steam mops, chosen on the data.' },
    about: {
      what: 'robot vacuums, cordless vacuums, hard floor cleaners and steam mops',
      description: 'About FloorVerdict: an independent site to choose robot vacuums, cordless vacuums, hard floor cleaners and steam mops. How we choose and how we earn.',
    },
    guides: { indexDescription: 'Practical guides to cleaner floors with less effort.' },
  },
  it: {
    tagline: 'Pavimenti puliti, scelti sui dati',
    nav: { find: 'Trova il tuo' },
    quiz: {
      title: 'Cosa serve ai pavimenti di casa tua?',
      sub: 'Al massimo 3 domande: FloorVerdict ti dice quale comprare, e perché.',
    },
    home: {
      metaDescription: 'FloorVerdict ti aiuta a scegliere robot, aspirapolvere senza fili, lavapavimenti o scopa a vapore: al massimo 3 domande, un modello, prezzi e fonti.',
      pickDirect: 'Oppure scegli direttamente',
      seo: {
        keyphrase: 'FloorVerdict',
        title: 'FloorVerdict: robot, scopa senza fili o lavapavimenti? Scegli qui',
        description: 'FloorVerdict ti aiuta a scegliere robot, aspirapolvere senza fili, lavapavimenti o scopa a vapore: al massimo 3 domande, un modello, prezzi e fonti.',
      },
      how: {
        title: 'Come sceglie FloorVerdict',
        image: 'Robot aspirapolvere, aspirapolvere senza fili, lavapavimenti e scopa a vapore: i prodotti che FloorVerdict confronta (disegno)',
        points: [
          {
            t: 'Parti dalla tua situazione',
            d: 'Prima la nostra scelta per il tuo caso, per esempio una casa con cani o gatti o una spesa più bassa, con il motivo spiegato in parole semplici; sotto, tutti i modelli in vendita nel tuo paese, da ordinare come vuoi.',
          },
          {
            t: 'Ogni numero ha la sua fonte',
            d: 'Potenza, autonomia e rumore vengono dalle pagine ufficiali dei produttori e dai test indipendenti. Accanto a ogni dato c’è il link per controllarlo da te.',
          },
          {
            t: 'Nessuno paga per essere scelto',
            d: 'Se compri da un nostro link potremmo ricevere una commissione, senza costi per te. Non cambia mai la scelta. Prezzi e disponibilità li ricontrolliamo ogni settimana.',
          },
        ],
        tests: 'Test indipendenti che citiamo:',
        more: 'Come lavora FloorVerdict, nel dettaglio',
      },
      faq: [
        {
          q: 'Robot o aspirapolvere senza fili?',
          a: 'Il robot pulisce da solo ogni giorno, ma un piano alla volta. L’aspirapolvere senza fili serve per le pulizie veloci, le scale e i tappeti spessi.',
          cat: 'robot',
        },
        {
          q: 'Un robot lavapavimenti va bene con cani o gatti?',
          a: 'Sì: c’è una scelta apposta per chi ha animali, con una spazzola che manda peli e capelli dritti nel contenitore.',
          cat: 'robot',
        },
        {
          q: 'Lavapavimenti o scopa a vapore?',
          a: 'La lavapavimenti aspira e lava in una sola passata. La scopa a vapore lava con acqua e vapore, senza detersivi, ma non raccoglie briciole e polvere: prima va passato l’aspirapolvere.',
          cat: 'wet',
        },
        {
          q: 'La scopa a vapore va bene sul parquet?',
          a: 'Solo se il legno è sigillato: su legno cerato, oliato o non sigillato il vapore lo rovina.',
          cat: 'steam',
        },
      ],
    },
    verdict: {
      indexDescription: 'Un modello consigliato per ogni tipo, con i dati ufficiali dei produttori e i risultati di test indipendenti.',
      findMachine: 'Trova il tuo in 3 tocchi',
      forMost: 'Per la maggior parte delle case',
    },
    footer: { line: 'Robot, scope senza fili, lavapavimenti e scope a vapore, scelti sui dati.' },
    about: {
      what: 'robot aspirapolvere, aspirapolvere senza fili, lavapavimenti e scope a vapore',
      description: 'Chi siamo: FloorVerdict è un sito indipendente per scegliere robot, aspirapolvere senza fili, lavapavimenti e scope a vapore. Come scegliamo e guadagniamo.',
    },
    guides: { indexDescription: 'Guide pratiche per pulire i pavimenti con meno fatica.' },
  },
  fr: {
    tagline: 'Des sols propres, choisis sur des données',
    nav: { find: 'Trouver le vôtre' },
    quiz: {
      title: 'De quoi vos sols ont-ils besoin ?',
      sub: 'Répondez à 3 questions au plus : FloorVerdict vous dit lequel acheter, et pourquoi.',
    },
    home: {
      metaDescription: 'FloorVerdict vous aide à choisir robot aspirateur laveur, aspirateur balai sans fil, aspirateur laveur ou balai vapeur : 3 questions au plus, un modèle, prix et sources.',
      pickDirect: 'Ou choisissez directement',
      seo: {
        keyphrase: 'FloorVerdict',
        title: 'FloorVerdict : robot, aspirateur balai ou aspirateur laveur ?',
        description: 'FloorVerdict vous aide à choisir robot aspirateur, aspirateur sans fil, aspirateur laveur ou balai vapeur : 3 questions au plus, un modèle, prix et sources.',
      },
      how: {
        title: 'Comment FloorVerdict choisit',
        image: 'Robot aspirateur, aspirateur balai sans fil, aspirateur laveur et balai vapeur : les produits que FloorVerdict compare (dessin)',
        points: [
          {
            t: 'Vous partez de votre situation',
            d: 'D’abord notre choix pour votre cas, par exemple un logement avec chien ou chat ou un budget plus serré, avec la raison expliquée simplement ; en dessous, tous les modèles en vente dans votre pays, à trier comme vous voulez.',
          },
          {
            t: 'Chaque chiffre a sa source',
            d: 'Puissance, autonomie et bruit viennent des pages officielles des fabricants et des tests indépendants. À côté de chaque donnée, un lien pour la vérifier vous-même.',
          },
          {
            t: 'Aucune marque ne paie pour être choisie',
            d: 'Si vous achetez via un de nos liens, nous pouvons recevoir une commission, sans surcoût pour vous. Cela ne change jamais le choix. Prix et stock sont revérifiés chaque semaine.',
          },
        ],
        tests: 'Tests indépendants que nous citons :',
        more: 'Comment travaille FloorVerdict, en détail',
      },
      faq: [
        {
          q: 'Robot ou aspirateur balai sans fil ?',
          a: 'Le robot nettoie tout seul chaque jour, mais un étage à la fois. L’aspirateur balai sert aux nettoyages rapides, aux escaliers et aux tapis épais.',
          cat: 'robot',
        },
        {
          q: 'Un robot aspirateur laveur convient-il avec un chien ou un chat ?',
          a: 'Oui : il y a un choix spécial pour les foyers avec animaux, avec une brosse qui envoie poils et cheveux directement dans le bac.',
          cat: 'robot',
        },
        {
          q: 'Aspirateur laveur ou balai vapeur ?',
          a: 'L’aspirateur laveur aspire et lave en un seul passage. Le balai vapeur lave à l’eau et à la vapeur, sans détergent, mais ne ramasse ni miettes ni poussière : il faut d’abord aspirer.',
          cat: 'wet',
        },
        {
          q: 'Le balai vapeur convient-il au parquet ?',
          a: 'Seulement si le bois est vitrifié : sur du bois ciré, huilé ou non vitrifié, la vapeur l’abîme.',
          cat: 'steam',
        },
      ],
    },
    verdict: {
      indexDescription: 'Un modèle recommandé par type, avec les données officielles des fabricants et les résultats de tests indépendants.',
      findMachine: 'Trouvez le vôtre en 3 clics',
      forMost: 'Pour la plupart des logements',
    },
    footer: { line: 'Robots, balais sans fil, aspirateurs laveurs et balais vapeur, choisis sur des données.' },
    about: {
      what: 'robots aspirateurs laveurs, aspirateurs balais sans fil, aspirateurs laveurs et balais vapeur',
      description: 'À propos de FloorVerdict : un site indépendant pour choisir robot, aspirateur balai, aspirateur laveur ou balai vapeur. Notre méthode, nos revenus.',
    },
    guides: { indexDescription: 'Des guides pratiques pour nettoyer les sols avec moins d’effort.' },
  },
  es: {
    tagline: 'Suelos limpios, elegidos con datos',
    nav: { find: 'Encuentra el tuyo' },
    quiz: {
      title: '¿Qué aspiradora va con tu casa?',
      sub: 'Responde 3 preguntas como máximo: FloorVerdict te dice cuál comprar, y por qué.',
    },
    home: {
      metaDescription: 'FloorVerdict te ayuda a elegir robot aspirador y friegasuelos, aspiradora sin cable o fregona: 3 preguntas como máximo, un modelo, precios y fuentes.',
      pickDirect: 'O elige directamente',
      seo: {
        keyphrase: 'FloorVerdict',
        title: 'FloorVerdict: robot aspirador, aspiradora sin cable o fregona',
        description: 'FloorVerdict te ayuda a elegir robot aspirador y friegasuelos, aspiradora sin cable o fregona: 3 preguntas como máximo, un modelo, precios y fuentes.',
      },
      how: {
        title: 'Cómo elige FloorVerdict',
        image: 'Dibujo de FloorVerdict: robot aspirador, aspiradora sin cable, aspiradora fregona y mopa de vapor',
        points: [
          {
            t: 'Empiezas por tu situación',
            d: 'Primero nuestra elección para tu caso, por ejemplo una casa con perro o gato o un presupuesto más ajustado, con el motivo en palabras sencillas; debajo, todos los modelos a la venta en tu país, para ordenarlos como quieras.',
          },
          {
            t: 'Cada número tiene su fuente',
            d: 'Potencia, autonomía y ruido salen de las páginas oficiales de los fabricantes y de las pruebas independientes. Junto a cada dato hay un enlace para comprobarlo tú.',
          },
          {
            t: 'Ninguna marca paga por salir elegida',
            d: 'Si compras desde un enlace nuestro podemos recibir una comisión, sin coste para ti. Nunca cambia la elección. Revisamos precios y existencias cada semana.',
          },
        ],
        tests: 'Pruebas independientes que citamos:',
        more: 'Cómo trabaja FloorVerdict, en detalle',
      },
      faq: [
        {
          q: '¿Robot o aspiradora sin cable?',
          a: 'El robot limpia solo cada día, pero una planta cada vez. La aspiradora sin cable sirve para las limpiezas rápidas, las escaleras y las alfombras gruesas.',
          cat: 'robot',
        },
        {
          q: '¿Un robot aspirador y friegasuelos sirve con perro o gato?',
          a: 'Sí: hay una elección pensada para casas con mascotas, con un cepillo que manda pelos y cabellos directamente al depósito.',
          cat: 'robot',
        },
        {
          q: '¿Aspiradora fregona o mopa de vapor?',
          a: 'La aspiradora fregona aspira y friega en una sola pasada. La mopa de vapor friega con agua y vapor, sin detergente, pero no recoge migas ni polvo: antes hay que aspirar.',
          cat: 'wet',
        },
      ],
    },
    verdict: {
      indexDescription: 'Un modelo recomendado por tipo, con los datos oficiales de los fabricantes y resultados de pruebas independientes.',
      findMachine: 'Encuentra el tuyo en 3 toques',
      forMost: 'Para la mayoría de las casas',
    },
    footer: { line: 'Robots, escobas sin cable y aspiradoras fregona, elegidos con datos.' },
    about: {
      what: 'robots aspiradores y friegasuelos, aspiradoras sin cable y aspiradoras fregonas',
      description: 'Sobre nosotros: FloorVerdict es un sitio independiente para elegir robot aspirador, aspiradora sin cable o aspiradora fregona. Cómo elegimos y ganamos.',
    },
    guides: { indexDescription: 'Guías prácticas para limpiar los suelos con menos esfuerzo.' },
  },
  pl: {
    tagline: 'Czyste podłogi, wybór oparty na danych',
    nav: { find: 'Znajdź swój' },
    quiz: {
      title: 'Czego potrzebują Twoje podłogi?',
      sub: 'Odpowiedz na najwyżej 3 pytania: FloorVerdict powie Ci, co kupić, i dlaczego.',
    },
    home: {
      metaDescription: 'FloorVerdict pomaga wybrać robota sprzątającego, odkurzacz bezprzewodowy, odkurzacz myjący albo mop parowy: najwyżej 3 pytania, jeden model, ceny i źródła.',
      pickDirect: 'Albo wybierz od razu',
      seo: {
        keyphrase: 'FloorVerdict',
        title: 'FloorVerdict: robot, odkurzacz bezprzewodowy czy myjący?',
        description: 'FloorVerdict pomaga wybrać robota sprzątającego, odkurzacz bezprzewodowy, odkurzacz myjący albo mop parowy: najwyżej 3 pytania, jeden model, ceny i źródła.',
      },
      how: {
        title: 'Jak wybiera FloorVerdict',
        image: 'Robot sprzątający, odkurzacz bezprzewodowy, odkurzacz myjący i mop parowy: produkty, które porównuje FloorVerdict (rysunek)',
        points: [
          {
            t: 'Zaczynasz od swojej sytuacji',
            d: 'Najpierw nasz wybór dla Twojej sytuacji, na przykład do domu z psem albo kotem lub za mniejsze pieniądze, z powodem wyjaśnionym prostymi słowami; pod nim wszystkie modele w sprzedaży w Twoim kraju, do posortowania, jak chcesz.',
          },
          {
            t: 'Każda liczba ma źródło',
            d: 'Moc, czas pracy i hałas pochodzą z oficjalnych stron producentów i z niezależnych testów. Przy każdej wartości jest link, żeby można ją było sprawdzić samodzielnie.',
          },
          {
            t: 'Żadna marka nie płaci za wybór',
            d: 'Jeśli kupisz przez nasz link, możemy dostać prowizję, bez dodatkowych kosztów dla ciebie. Nigdy nie zmienia to wyboru. Ceny i dostępność sprawdzamy co tydzień.',
          },
        ],
        tests: 'Niezależne testy, które cytujemy:',
        more: 'Jak pracuje FloorVerdict, szczegółowo',
      },
      faq: [
        {
          q: 'Robot czy odkurzacz bezprzewodowy?',
          a: 'Robot sprząta sam codziennie, ale jedno piętro naraz. Odkurzacz bezprzewodowy służy do szybkiego sprzątania, schodów i grubych dywanów.',
          cat: 'robot',
        },
        {
          q: 'Czy robot sprzątający sprawdzi się przy psie albo kocie?',
          a: 'Tak: jest osobny wybór dla domów ze zwierzętami, ze szczotką, która kieruje sierść i włosy prosto do pojemnika.',
          cat: 'robot',
        },
        {
          q: 'Odkurzacz myjący czy mop parowy?',
          a: 'Odkurzacz myjący odkurza i myje za jednym przejściem. Mop parowy myje wodą i parą, bez detergentów, ale nie zbiera okruchów ani kurzu: najpierw trzeba odkurzyć.',
          cat: 'wet',
        },
        {
          q: 'Czy mop parowy nadaje się do parkietu?',
          a: 'Tylko jeśli drewno jest polakierowane: woskowane, olejowane albo surowe drewno para niszczy.',
          cat: 'steam',
        },
      ],
    },
    verdict: {
      indexDescription: 'Jeden polecany model na każdy typ, z oficjalnymi danymi producentów i wynikami niezależnych testów.',
      findMachine: 'Znajdź swój w 3 kliknięciach',
      forMost: 'Dla większości domów',
    },
    footer: { line: 'Roboty, odkurzacze bezprzewodowe i myjące oraz mopy parowe, wybrane na podstawie danych.' },
    about: {
      what: 'roboty sprzątające, odkurzacze bezprzewodowe, odkurzacze myjące i mopy parowe',
      description: 'O nas: FloorVerdict to niezależna strona, która pomaga wybrać robota sprzątającego, odkurzacz bezprzewodowy lub myjący i mop parowy. Jak wybieramy.',
    },
    guides: { indexDescription: 'Praktyczne poradniki: czyste podłogi mniejszym wysiłkiem.' },
  },
  sv: {
    tagline: 'Rena golv, valda på data',
    nav: { find: 'Hitta din' },
    quiz: {
      title: 'Vad behöver dina golv?',
      sub: 'Svara på högst 3 frågor: FloorVerdict säger vilken du ska köpa, och varför.',
    },
    home: {
      metaDescription: 'FloorVerdict hjälper dig att välja robotdammsugare, skaftdammsugare eller ångmopp: högst 3 frågor, en modell, med priser och källor för varje uppgift.',
      pickDirect: 'Eller välj direkt',
      seo: {
        keyphrase: 'FloorVerdict',
        title: 'FloorVerdict: robot, skaftdammsugare eller ångmopp?',
        description: 'FloorVerdict hjälper dig att välja robotdammsugare, skaftdammsugare eller ångmopp: högst 3 frågor, en modell, med priser och källor för varje uppgift.',
      },
      how: {
        title: 'Så väljer FloorVerdict',
        image: 'Teckning från FloorVerdict: robotdammsugare, skaftdammsugare, våtdammsugare och ångmopp',
        points: [
          {
            t: 'Du börjar med din situation',
            d: 'Först vårt val för ditt fall, till exempel ett hem med hund eller katt eller en lägre kostnad, med skälet förklarat med enkla ord; under det alla modeller till salu i ditt land, att sortera som du vill.',
          },
          {
            t: 'Varje siffra har en källa',
            d: 'Effekt, batteritid och ljudnivå kommer från tillverkarnas officiella sidor och från oberoende tester. Bredvid varje uppgift finns en länk så att du kan kontrollera den själv.',
          },
          {
            t: 'Inget märke betalar för att väljas',
            d: 'Köper du via en av våra länkar kan vi få en provision, utan extra kostnad för dig. Det ändrar aldrig valet. Priser och lagerstatus kontrollerar vi varje vecka.',
          },
        ],
        tests: 'Oberoende tester vi citerar:',
        more: 'Så arbetar FloorVerdict, i detalj',
      },
      faq: [
        {
          q: 'Robotdammsugare eller skaftdammsugare?',
          a: 'Roboten städar själv varje dag, men ett våningsplan i taget. Skaftdammsugaren är till för snabba städningar, trappor och tjocka mattor.',
          cat: 'robot',
        },
        {
          q: 'Fungerar en robotdammsugare med hund eller katt?',
          a: 'Ja: det finns ett eget val för hem med husdjur, med en borste som skickar hår direkt till behållaren.',
          cat: 'robot',
        },
        {
          q: 'Går det att använda ångmopp på parkett?',
          a: 'Bara om träet är lackat: på vaxat, oljat eller obehandlat trä förstör ångan golvet.',
          cat: 'steam',
        },
        {
          q: 'Tar ångmoppen bort smulor och damm?',
          a: 'Nej: den rengör golvet med vatten och ånga, utan rengöringsmedel, men plockar inte upp smulor och damm. Dammsug först.',
          cat: 'steam',
        },
      ],
    },
    verdict: {
      indexDescription: 'En rekommenderad modell per typ, med tillverkarnas officiella data och resultat från oberoende tester.',
      findMachine: 'Hitta din med 3 tryck',
      forMost: 'För de flesta hem',
    },
    footer: { line: 'Robotdammsugare, skaftdammsugare och ångmoppar, valda på data.' },
    about: {
      what: 'robotdammsugare, skaftdammsugare och ångmoppar',
      description: 'Om oss: FloorVerdict är en oberoende sajt som hjälper dig att välja robotdammsugare, skaftdammsugare och ångmopp. Så väljer vi och så tjänar vi pengar.',
    },
    guides: { indexDescription: 'Praktiska guider för renare golv med mindre jobb.' },
  },
} satisfies PerLang<SiteStrings>;
