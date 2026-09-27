// ClimaVerdict copy in every published language. Generic interface text lives in src/i18n/ui.ts.
import type { PerLang, SiteStrings } from '../../lib/pack';

export const strings = {
  en: {
    tagline: 'The right air at home, chosen on the data',
    nav: { find: 'Find yours' },
    quiz: {
      title: 'Which appliance does your home need?',
      sub: 'Answer 3 questions at most: ClimaVerdict tells you which one to buy, and why.',
    },
    home: {
      metaDescription: 'ClimaVerdict helps you choose an electric heater, a dehumidifier, an air purifier or a portable air conditioner: 3 questions at most, one model, prices and sources.',
      pickDirect: 'Or choose directly',
      seo: {
        keyphrase: 'ClimaVerdict',
        title: 'ClimaVerdict: heater, dehumidifier or air conditioner? Choose',
        description: 'ClimaVerdict helps you choose an electric heater, dehumidifier, air purifier or portable air conditioner: 3 questions at most, one model and its sources.',
      },
      how: {
        title: 'How ClimaVerdict chooses',
        image: 'Electric heater, dehumidifier, air purifier and portable air conditioner: the appliances ClimaVerdict compares (drawing)',
        points: [
          {
            t: 'Start from your situation',
            d: 'First our pick for your case, for example a damp cellar or a cold room, with the reason in plain words; below it, every model on sale in your country, to sort as you like.',
          },
          {
            t: 'Every figure has its source',
            d: 'Energy use, noise and capacity come from the makers’ official pages and from independent tests. Next to each figure is the link to check it yourself.',
          },
          {
            t: 'Nobody pays to be picked',
            d: 'If you buy through one of our links we may earn a commission, at no cost to you. It never changes the pick. Prices are read from the brands’ own stores every day.',
          },
        ],
        tests: 'Independent tests we quote:',
        more: 'How ClimaVerdict works, in detail',
      },
      faq: [
        {
          q: 'Against damp and mould: dehumidifier or air conditioner?',
          a: 'You need a dehumidifier: it takes water out of the air all year round, in winter too, without cooling the room. A portable air conditioner is made to cool in summer.',
          cat: 'dehum',
        },
        {
          q: 'Which electric heater uses the least electricity?',
          a: 'Every resistance heater turns 1 kWh of electricity into about 1 kWh of heat, whatever its shape. To really use less you need a heat pump.',
          cat: 'heat',
        },
        {
          q: 'Oil-filled radiator or fan heater?',
          a: 'An oil-filled radiator heats slowly but for long, silently: right for living rooms and bedrooms. A fan heater warms at once but you hear it. For the same heat they use the same electricity.',
          cat: 'heat',
        },
        {
          q: 'Does an air purifier also remove damp?',
          a: 'No: it filters pollen, fine dust, pet hair and smells, but it does not take water out of the air. Against damp you need a dehumidifier.',
          cat: 'purifier',
        },
        {
          q: 'Does a portable air conditioner use a lot of electricity?',
          a: 'More than a fixed air conditioner: in Stiftung Warentest’s test classic portable units come out as inefficient. The exception is the split type, with the compressor outside the window.',
          cat: 'ac',
        },
      ],
    },
    verdict: {
      indexDescription: 'One recommended model for each type, with the makers’ official data and independent tests where they exist.',
      findMachine: 'Find yours in 3 taps',
      forMost: 'For most homes',
    },
    footer: { line: 'Heaters, dehumidifiers, purifiers and air conditioners, chosen on the data.' },
    about: {
      what: 'electric heaters, dehumidifiers, air purifiers and portable air conditioners',
      description: 'About ClimaVerdict: an independent site to choose a heater, a dehumidifier, an air purifier or an air conditioner. How we choose and how we earn.',
    },
    guides: { indexDescription: 'Practical guides against cold, damp, mould, stale air and heat at home.' },
  },
  it: {
    tagline: 'Aria di casa giusta, scelta sui dati',
    nav: { find: 'Trova il tuo' },
    quiz: {
      title: 'Quale apparecchio fa per casa tua?',
      sub: 'Al massimo 3 domande: ClimaVerdict ti dice quale comprare, e perché.',
    },
    home: {
      metaDescription: 'ClimaVerdict ti aiuta a scegliere stufa, deumidificatore, purificatore d’aria o condizionatore portatile: al massimo 3 domande, un modello, prezzi e fonti.',
      pickDirect: 'Oppure scegli direttamente',
      seo: {
        keyphrase: 'ClimaVerdict',
        title: 'ClimaVerdict: stufa, deumidificatore o condizionatore? Scegli qui',
        description: 'ClimaVerdict ti aiuta a scegliere stufa, deumidificatore, purificatore d’aria o condizionatore portatile: al massimo 3 domande, un modello, prezzi e fonti.',
      },
      how: {
        title: 'Come sceglie ClimaVerdict',
        image: 'Stufa elettrica, deumidificatore, purificatore d’aria e condizionatore portatile: gli apparecchi che ClimaVerdict confronta (disegno)',
        points: [
          {
            t: 'Parti dalla tua situazione',
            d: 'Prima la nostra scelta per il tuo caso, per esempio una cantina umida o una stanza fredda, con il motivo spiegato in parole semplici; sotto, tutti i modelli in vendita nel tuo paese, da ordinare come vuoi.',
          },
          {
            t: 'Ogni numero ha la sua fonte',
            d: 'Consumi, rumore e capacità vengono dalle pagine ufficiali dei produttori e dai test indipendenti. Accanto a ogni dato c’è il link per controllarlo da te.',
          },
          {
            t: 'Nessuno paga per essere scelto',
            d: 'Se compri da un nostro link potremmo ricevere una commissione, senza costi per te. Non cambia mai la scelta. Prezzi e disponibilità li ricontrolliamo ogni settimana.',
          },
        ],
        tests: 'Test indipendenti che citiamo:',
        more: 'Come lavora ClimaVerdict, nel dettaglio',
      },
      faq: [
        {
          q: 'Contro umidità e muffa: deumidificatore o condizionatore?',
          a: 'Serve un deumidificatore: toglie l’acqua dall’aria tutto l’anno, anche d’inverno, senza raffreddare la stanza. Il condizionatore portatile nasce per rinfrescare d’estate.',
          cat: 'dehum',
        },
        {
          q: 'Qual è la stufa elettrica che consuma meno?',
          a: 'Tutte le stufe elettriche a resistenza trasformano 1 kWh di corrente in circa 1 kWh di calore, qualunque forma abbiano. Per consumare meno davvero serve una pompa di calore.',
          cat: 'heat',
        },
        {
          q: 'Radiatore a olio o termoventilatore?',
          a: 'Il radiatore a olio scalda piano ma a lungo, senza rumore: adatto a soggiorno e camera. Il termoventilatore scalda subito ma si sente. A parità di calore consumano la stessa corrente.',
          cat: 'heat',
        },
        {
          q: 'Il purificatore d’aria toglie anche l’umidità?',
          a: 'No: filtra polline, polvere sottile, peli e odori, ma non toglie acqua dall’aria. Contro l’umidità serve un deumidificatore.',
          cat: 'purifier',
        },
        {
          q: 'Un condizionatore portatile consuma tanto?',
          a: 'Più di un climatizzatore fisso: nel test di Stiftung Warentest i portatili classici risultano poco efficienti. Fa eccezione il tipo split, con il compressore fuori dalla finestra.',
          cat: 'ac',
        },
      ],
    },
    verdict: {
      indexDescription: 'Un modello consigliato per ogni tipo, con i dati ufficiali dei produttori e i test indipendenti dove esistono.',
      findMachine: 'Trova il tuo in 3 tocchi',
      forMost: 'Per la maggior parte delle case',
    },
    footer: { line: 'Stufe, deumidificatori, purificatori e condizionatori, scelti sui dati.' },
    about: {
      what: 'stufe elettriche, deumidificatori, purificatori d’aria e condizionatori portatili',
      description: 'Chi siamo: ClimaVerdict è un sito indipendente per scegliere stufa, deumidificatore, purificatore o condizionatore. Come scegliamo e come guadagniamo.',
    },
    guides: { indexDescription: 'Guide pratiche contro freddo, umidità, muffa, aria viziata e caldo in casa.' },
  },
  fr: {
    tagline: 'Le bon air à la maison, choisi sur des données',
    nav: { find: 'Trouver le vôtre' },
    quiz: {
      title: 'Quel appareil pour votre maison ?',
      sub: 'Répondez à 3 questions au plus : ClimaVerdict vous dit lequel acheter, et pourquoi.',
    },
    home: {
      metaDescription: 'ClimaVerdict vous aide à choisir chauffage, déshumidificateur, purificateur d’air ou climatiseur mobile : 3 questions au plus, un modèle, prix et sources.',
      pickDirect: 'Ou choisissez directement',
      seo: {
        keyphrase: 'ClimaVerdict',
        title: 'ClimaVerdict : chauffage, déshumidificateur ou climatiseur ?',
        description: 'ClimaVerdict vous aide à choisir chauffage, déshumidificateur, purificateur d’air ou climatiseur mobile : 3 questions au plus, un modèle, prix et sources.',
      },
      how: {
        title: 'Comment ClimaVerdict choisit',
        image: 'Chauffage d’appoint, déshumidificateur, purificateur d’air et climatiseur mobile : les appareils que ClimaVerdict compare (dessin)',
        points: [
          {
            t: 'Vous partez de votre situation',
            d: 'D’abord notre choix pour votre cas, par exemple une cave humide ou une pièce froide, avec la raison expliquée simplement ; en dessous, tous les modèles en vente dans votre pays, à trier comme vous voulez.',
          },
          {
            t: 'Chaque chiffre a sa source',
            d: 'Consommation, bruit et capacité viennent des pages officielles des fabricants et des tests indépendants. À côté de chaque donnée, un lien pour la vérifier vous-même.',
          },
          {
            t: 'Aucune marque ne paie pour être choisie',
            d: 'Si vous achetez via un de nos liens, nous pouvons recevoir une commission, sans surcoût pour vous. Cela ne change jamais le choix. Prix et stock sont revérifiés chaque semaine.',
          },
        ],
        tests: 'Tests indépendants que nous citons :',
        more: 'Comment travaille ClimaVerdict, en détail',
      },
      faq: [
        {
          q: 'Humidité et moisissure : déshumidificateur ou climatiseur ?',
          a: 'Il faut un déshumidificateur : il retire l’eau de l’air toute l’année, même en hiver, sans refroidir la pièce. Le climatiseur mobile est fait pour rafraîchir en été.',
          cat: 'dehum',
        },
        {
          q: 'Quel chauffage électrique consomme le moins ?',
          a: 'Tous les chauffages électriques à résistance transforment 1 kWh d’électricité en environ 1 kWh de chaleur, quelle que soit leur forme. Pour consommer vraiment moins, il faut une pompe à chaleur.',
          cat: 'heat',
        },
        {
          q: 'Radiateur bain d’huile ou radiateur soufflant ?',
          a: 'Le bain d’huile chauffe lentement mais longtemps, sans bruit : idéal pour le séjour ou la chambre. Le soufflant chauffe tout de suite mais s’entend. À chaleur égale, ils consomment autant.',
          cat: 'heat',
        },
        {
          q: 'Un purificateur d’air retire-t-il aussi l’humidité ?',
          a: 'Non : il filtre le pollen, les particules fines, les poils et les odeurs, mais ne retire pas l’eau de l’air. Contre l’humidité, il faut un déshumidificateur.',
          cat: 'purifier',
        },
        {
          q: 'Un climatiseur mobile consomme-t-il beaucoup ?',
          a: 'Plus qu’un climatiseur fixe : dans le test de Stiftung Warentest, les mobiles classiques sont peu efficaces. Exception : le type split, avec le compresseur dehors.',
          cat: 'ac',
        },
      ],
    },
    verdict: {
      indexDescription: 'Un modèle recommandé par type, avec les données officielles des fabricants et les tests indépendants quand il y en a.',
      findMachine: 'Trouvez le vôtre en 3 clics',
      forMost: 'Pour la plupart des logements',
    },
    footer: { line: 'Chauffages, déshumidificateurs, purificateurs et climatiseurs, choisis sur des données.' },
    about: {
      what: 'chauffages d’appoint, déshumidificateurs, purificateurs d’air et climatiseurs mobiles',
      description: 'À propos de ClimaVerdict : un site indépendant pour choisir chauffage, déshumidificateur, purificateur ou climatiseur. Notre méthode, nos revenus.',
    },
    guides: { indexDescription: 'Des guides pratiques contre le froid, l’humidité, la moisissure et la chaleur.' },
  },
  es: {
    tagline: 'El aire de casa, bien elegido con datos',
    nav: { find: 'Encuentra el tuyo' },
    quiz: {
      title: '¿Qué aparato necesita tu casa?',
      sub: 'Responde 3 preguntas como máximo: ClimaVerdict te dice cuál comprar, y por qué.',
    },
    home: {
      metaDescription: 'ClimaVerdict te ayuda a elegir estufa eléctrica, deshumidificador, purificador de aire o aire acondicionado portátil: 3 preguntas como máximo, un modelo, precio y fuentes.',
      pickDirect: 'O elige directamente',
      seo: {
        keyphrase: 'ClimaVerdict',
        title: 'ClimaVerdict: estufa, deshumidificador o aire acondicionado',
        description: 'ClimaVerdict te ayuda a elegir estufa, deshumidificador, purificador o aire acondicionado portátil: 3 preguntas como máximo, un modelo, precio y fuentes.',
      },
      how: {
        title: 'Cómo elige ClimaVerdict',
        image: 'Estufa eléctrica, deshumidificador, purificador de aire y aire acondicionado portátil: los aparatos que compara ClimaVerdict (dibujo)',
        points: [
          {
            t: 'Empiezas por tu situación',
            d: 'Primero nuestra elección para tu caso, por ejemplo un sótano húmedo o una habitación fría, con el motivo en palabras sencillas; debajo, todos los modelos a la venta en tu país, para ordenarlos como quieras.',
          },
          {
            t: 'Cada número tiene su fuente',
            d: 'Consumo, ruido y capacidad salen de las páginas oficiales de los fabricantes y de las pruebas independientes. Junto a cada dato hay un enlace para comprobarlo tú.',
          },
          {
            t: 'Ninguna marca paga por salir elegida',
            d: 'Si compras desde un enlace nuestro podemos recibir una comisión, sin coste para ti. Nunca cambia la elección. Revisamos precios y existencias cada semana.',
          },
        ],
        tests: 'Pruebas independientes que citamos:',
        more: 'Cómo trabaja ClimaVerdict, en detalle',
      },
      faq: [
        {
          q: 'Contra la humedad y el moho: ¿deshumidificador o aire acondicionado?',
          a: 'Hace falta un deshumidificador: quita el agua del aire todo el año, también en invierno, sin enfriar la habitación. El aire acondicionado portátil está hecho para refrescar en verano.',
          cat: 'dehum',
        },
        {
          q: '¿Qué estufa eléctrica gasta menos?',
          a: 'Todas las estufas eléctricas de resistencia convierten 1 kWh de electricidad en más o menos 1 kWh de calor, tengan la forma que tengan. Para gastar menos de verdad hace falta una bomba de calor.',
          cat: 'heat',
        },
        {
          q: '¿Radiador de aceite o calefactor?',
          a: 'El radiador de aceite calienta despacio pero durante mucho tiempo, sin ruido: ideal para salón y dormitorio. El calefactor calienta al momento pero se oye. Para el mismo calor gastan lo mismo.',
          cat: 'heat',
        },
        {
          q: '¿Un purificador de aire quita también la humedad?',
          a: 'No: filtra polen, polvo fino, pelos y olores, pero no quita agua del aire. Contra la humedad hace falta un deshumidificador.',
          cat: 'purifier',
        },
        {
          q: '¿Un aire acondicionado portátil gasta mucho?',
          a: 'Más que uno fijo: en la prueba de Stiftung Warentest, los portátiles clásicos resultan poco eficientes. La excepción es el tipo split, con el compresor fuera de la ventana.',
          cat: 'ac',
        },
      ],
    },
    verdict: {
      indexDescription: 'Un modelo recomendado por tipo, con los datos oficiales de los fabricantes y las pruebas independientes cuando las hay.',
      findMachine: 'Encuentra el tuyo en 3 toques',
      forMost: 'Para la mayoría de las casas',
    },
    footer: { line: 'Estufas, deshumidificadores, purificadores y aires acondicionados, elegidos con datos.' },
    about: {
      what: 'estufas eléctricas, deshumidificadores, purificadores de aire y aires acondicionados portátiles',
      description: 'Sobre nosotros: ClimaVerdict es un sitio independiente para elegir estufa, deshumidificador, purificador o aire acondicionado. Cómo elegimos y ganamos.',
    },
    guides: { indexDescription: 'Guías prácticas contra el frío, la humedad, el moho y el calor en casa.' },
  },
  de: {
    tagline: 'Gutes Raumklima, nach Daten ausgewählt',
    nav: { find: 'Finde deins' },
    quiz: {
      title: 'Welches Gerät braucht dein Zuhause?',
      sub: 'Beantworte höchstens 3 Fragen: ClimaVerdict sagt dir, welches du kaufen solltest, und warum.',
    },
    home: {
      metaDescription: 'ClimaVerdict hilft dir bei Elektroheizung, Luftentfeuchter, Luftreiniger oder mobiler Klimaanlage: höchstens 3 Fragen, ein Modell, Preise und Quellen.',
      pickDirect: 'Oder direkt wählen',
      seo: {
        keyphrase: 'ClimaVerdict',
        title: 'ClimaVerdict: Heizung, Luftentfeuchter oder Klimaanlage?',
        description: 'ClimaVerdict hilft dir bei Elektroheizung, Luftentfeuchter, Luftreiniger oder mobiler Klimaanlage: höchstens 3 Fragen, ein Modell, Preise und Quellen.',
      },
      how: {
        title: 'So wählt ClimaVerdict aus',
        image: 'Elektroheizung, Luftentfeuchter, Luftreiniger und mobile Klimaanlage: die Geräte, die ClimaVerdict vergleicht (Zeichnung)',
        points: [
          {
            t: 'Du startest bei deiner Situation',
            d: 'Zuerst unsere Wahl für deinen Fall, zum Beispiel für einen feuchten Keller oder einen kalten Raum, mit dem Grund in einfachen Worten; darunter alle Modelle, die in deinem Land zu kaufen sind, sortierbar wie du willst.',
          },
          {
            t: 'Jede Zahl hat ihre Quelle',
            d: 'Verbrauch, Lautstärke und Leistung stammen von den offiziellen Herstellerseiten und aus unabhängigen Tests. Neben jedem Wert steht der Link, damit du ihn selbst prüfen kannst.',
          },
          {
            t: 'Keine Marke zahlt für die Auswahl',
            d: 'Kaufst du über einen unserer Links, bekommen wir vielleicht eine Provision, ohne Mehrkosten für dich. An der Auswahl ändert das nie etwas. Preise und Verfügbarkeit prüfen wir jede Woche neu.',
          },
        ],
        tests: 'Unabhängige Tests, die wir zitieren:',
        more: 'So arbeitet ClimaVerdict, im Detail',
      },
      faq: [
        {
          q: 'Gegen Feuchtigkeit und Schimmel: Luftentfeuchter oder Klimaanlage?',
          a: 'Du brauchst einen Luftentfeuchter: Er holt das ganze Jahr Wasser aus der Luft, auch im Winter, ohne den Raum zu kühlen. Die mobile Klimaanlage ist zum Kühlen im Sommer da.',
          cat: 'dehum',
        },
        {
          q: 'Welche Elektroheizung verbraucht am wenigsten?',
          a: 'Jede Elektroheizung mit Heizwiderstand macht aus 1 kWh Strom etwa 1 kWh Wärme, egal welche Bauform. Wirklich weniger Strom braucht nur eine Wärmepumpe.',
          cat: 'heat',
        },
        {
          q: 'Ölradiator oder Heizlüfter?',
          a: 'Der Ölradiator heizt langsam, aber lange und leise: gut für Wohn- und Schlafzimmer. Der Heizlüfter heizt sofort, ist aber hörbar. Für dieselbe Wärme brauchen beide gleich viel Strom.',
          cat: 'heat',
        },
        {
          q: 'Entfernt ein Luftreiniger auch Feuchtigkeit?',
          a: 'Nein: Er filtert Pollen, Feinstaub, Tierhaare und Gerüche, holt aber kein Wasser aus der Luft. Gegen Feuchtigkeit hilft ein Luftentfeuchter.',
          cat: 'purifier',
        },
        {
          q: 'Verbraucht eine mobile Klimaanlage viel Strom?',
          a: 'Mehr als ein fest eingebautes Gerät: Im Test der Stiftung Warentest sind klassische Monoblock-Geräte wenig effizient. Ausnahme ist die Split-Bauart mit dem Kompressor draußen.',
          cat: 'ac',
        },
      ],
    },
    verdict: {
      indexDescription: 'Ein empfohlenes Modell pro Typ, mit den offiziellen Herstellerdaten und unabhängigen Tests, wo es sie gibt.',
      findMachine: 'Finde deins mit 3 Klicks',
      forMost: 'Für die meisten Wohnungen',
    },
    footer: { line: 'Elektroheizungen, Luftentfeuchter, Luftreiniger und Klimaanlagen, nach Daten ausgewählt.' },
    about: {
      what: 'Elektroheizungen, Luftentfeuchter, Luftreiniger und mobile Klimaanlagen',
      description: 'Über uns: ClimaVerdict ist eine unabhängige Seite für die Wahl von Heizung, Luftentfeuchter, Luftreiniger und Klimaanlage. Wie wir auswählen und verdienen.',
    },
    guides: { indexDescription: 'Praktische Ratgeber gegen Kälte, Feuchtigkeit, Schimmel und Hitze zu Hause.' },
  },
  pl: {
    tagline: 'Dobry klimat w domu, wybrany na podstawie danych',
    nav: { find: 'Znajdź swój' },
    quiz: {
      title: 'Jakie urządzenie do Twojego domu?',
      sub: 'Odpowiedz na najwyżej 3 pytania: ClimaVerdict powie Ci, co kupić, i dlaczego.',
    },
    home: {
      metaDescription: 'ClimaVerdict pomaga wybrać grzejnik elektryczny, oczyszczacz powietrza albo klimatyzator przenośny: najwyżej 3 pytania, jeden model, ceny i źródła danych.',
      pickDirect: 'Albo wybierz od razu',
      seo: {
        keyphrase: 'ClimaVerdict',
        title: 'ClimaVerdict: grzejnik, oczyszczacz czy klimatyzator?',
        description: 'ClimaVerdict pomaga wybrać grzejnik elektryczny, oczyszczacz powietrza albo klimatyzator przenośny: najwyżej 3 pytania, jeden model, ceny i źródła danych.',
      },
      how: {
        title: 'Jak wybiera ClimaVerdict',
        image: 'Urządzenia z ClimaVerdict: grzejnik elektryczny, osuszacz, oczyszczacz powietrza i klimatyzator przenośny (rysunek)',
        points: [
          {
            t: 'Zaczynasz od swojej sytuacji',
            d: 'Najpierw nasz wybór dla Twojej sytuacji, na przykład do zimnego pokoju albo na alergię, z powodem wyjaśnionym prostymi słowami; pod nim wszystkie modele w sprzedaży w Twoim kraju, do posortowania, jak chcesz.',
          },
          {
            t: 'Każda liczba ma źródło',
            d: 'Zużycie prądu, hałas i wydajność pochodzą z oficjalnych stron producentów i z niezależnych testów. Przy każdej wartości jest link, żeby można ją było sprawdzić samodzielnie.',
          },
          {
            t: 'Żadna marka nie płaci za wybór',
            d: 'Jeśli kupisz przez nasz link, możemy dostać prowizję, bez dodatkowych kosztów dla ciebie. Nigdy nie zmienia to wyboru. Ceny i dostępność sprawdzamy co tydzień.',
          },
        ],
        tests: 'Niezależne testy, które cytujemy:',
        more: 'Jak pracuje ClimaVerdict, szczegółowo',
      },
      faq: [
        {
          q: 'Który grzejnik elektryczny zużywa najmniej prądu?',
          a: 'Każdy grzejnik elektryczny z grzałką zamienia 1 kWh prądu w mniej więcej 1 kWh ciepła, niezależnie od kształtu. Naprawdę mniej prądu zużywa tylko pompa ciepła.',
          cat: 'heat',
        },
        {
          q: 'Grzejnik olejowy czy termowentylator?',
          a: 'Grzejnik olejowy grzeje powoli, ale długo i bezgłośnie: dobry do salonu i sypialni. Termowentylator grzeje od razu, ale go słychać. Na tę samą ilość ciepła oba zużywają tyle samo prądu.',
          cat: 'heat',
        },
        {
          q: 'Czy oczyszczacz powietrza usuwa też wilgoć?',
          a: 'Nie: filtruje pyłki, pył zawieszony, sierść i zapachy, ale nie usuwa wody z powietrza. Na wilgoć potrzebny jest osuszacz.',
          cat: 'purifier',
        },
        {
          q: 'Czy klimatyzator przenośny zużywa dużo prądu?',
          a: 'Więcej niż klimatyzator montowany na stałe: w teście Stiftung Warentest klasyczne przenośne urządzenia wypadają mało wydajnie. Wyjątkiem jest typ split, ze sprężarką na zewnątrz.',
          cat: 'ac',
        },
      ],
    },
    verdict: {
      indexDescription: 'Polecany model na każdy rodzaj, z oficjalnymi danymi producentów i niezależnymi testami, jeśli istnieją.',
      findMachine: 'Znajdź swój w 3 kliknięciach',
      forMost: 'Dla większości domów',
    },
    footer: { line: 'Grzejniki, oczyszczacze powietrza i klimatyzatory wybrane na podstawie danych.' },
    about: {
      what: 'grzejniki elektryczne, oczyszczacze powietrza i klimatyzatory przenośne',
      description: 'O nas: ClimaVerdict to niezależna strona, która pomaga wybrać grzejnik, oczyszczacz powietrza i klimatyzator. Jak wybieramy i jak zarabiamy.',
    },
    guides: { indexDescription: 'Praktyczne poradniki na zimno i upały w domu.' },
  },
} satisfies PerLang<SiteStrings>;
