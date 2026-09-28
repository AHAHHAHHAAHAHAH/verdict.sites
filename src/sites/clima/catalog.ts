// ClimaVerdict catalogue: electric heaters and dehumidifiers (autumn and winter), air purifiers (all
// year, pollen in spring) and portable air conditioners (summer). Same rules as every site: every fact carries the URL it was read from;
// prices are the brand store's own price on the check date and are re-read every week; a market
// without a brand store gets no price. An alternative is only offered where it is sold.
import type { Catalog, Category, Market, Product, T } from '../../lib/pack';
import { addLanguages } from '../../lib/translate';
import { en } from './i18n-en';
import { fromEn, fromIt } from './i18n-more';

const CHECKED = '2026-09-28';

const categoryIds = ['heat', 'dehum', 'purifier', 'ac'] as const;
const HEAT_ALT: Market[] = ['it', 'fr', 'es', 'de'];
const DEHUM: Market[] = ['it', 'fr', 'es', 'de'];

// Independent tests (public pages).
const SW_DEHUM = 'https://www.test.de/Luftentfeuchter-Was-sie-leisten-und-was-nicht-5780477-0/';
// Air purifiers: Stiftung Warentest 3/2024 results as reported by t-online, and test.de's public
// product pages (average online price, filter price).
const T_ONLINE_PURIFIER =
  'https://www.t-online.de/ratgeber/haushalt-und-wohnen/haushaltsgeraete/id_86028896/luftreiniger-test-das-sind-die-testsieger-bei-stiftung-warentest.html';
const SW_BOSCH_AIR = 'https://www.test.de/Luftreiniger-im-Test-5579439-detail/320000028380!IT23923-0002-00/';
const SW_XIAOMI = 'https://www.test.de/Luftreiniger-im-Test-5579439-detail/320000028380!IT23923-0015-00/';
const SW_AC = 'https://www.test.de/Mobile-Klimaanlagen-im-Test-Flexibel-aber-wenig-effizient-6228399-0/';

// Brand pages.
const DL = {
  it: 'https://www.delonghi.com/it-it/p/tasciugo-ariadry-multi-deumidificatore-tasciugo-ariadry-multi-dexd216rf/DEXD216RF.html',
  fr: 'https://www.delonghi.com/fr-fr/p/tasciugo-ariadry-multi-deshumidificateur-ariadry-multi-tasciugo-dexd216rf/DEXD216RF.html',
  es: 'https://www.delonghi.com/es-es/p/tasciugo-ariadry-multi-deshumidificador-tasciugo-ariadry-multi-dexd216rf/DEXD216RF.html',
  de: 'https://www.delonghi.com/de-de/p/tasciugo-ariadry-multi-tasciugo-ariadry-multi-luftentfeuchter-dexd216rf/DEXD216RF.html',
};
const BORA_SMART = {
  it: 'https://duux.com/it/products/bora-deumidificatore-smart-20-30l',
  es: 'https://duux.com/es/products/bora-smart-deshumidificador-20-30l',
  de: 'https://duux.com/de/products/bora-smart-luftentfeuchter-20-30l',
};
// Pro Breeze EU store (Shopify): the same product in each market's language.
const PB_OMNI = (m: string) => `https://eu.probreeze.com/${m}/products/omnidry-20l-quiet-dehumidifier-with-laundry-mode-and-smart-app-control`;
// OCU (Spain), 23 dehumidifiers compared, 6 November 2025.
const OCU_DEHUM = 'https://www.ocu.org/vivienda-y-energia/equipamiento-hogar/informe/mejores-deshumidificadores';
const ORBEGOZO_1655 = 'https://orbegozo.com/wp-content/uploads/2024/09/DH-1655.pdf';
const ECOAIR_DD1 = 'https://ecoair.org/products/dd1-classic';
const BOSCH = 'https://www.bosch-homecomfort.com/it/it/ocs/residenziale/condizionatore-portatile-cool-4000-20630827-p/';
const ARISTON = 'https://www.ariston.com/pl-pl/produkty/klimatyzacja/klimatyzatory-przenosne/mobis-plus-pl';
const MIDEA_UK = 'https://www.midea.com/uk/air-treatment/porta-split-air-conditioner.portasplit';
const MIDEA_ES = 'https://www.midea.es/productos/portasplit/';
const BOSCH_AIR = 'https://www.bosch-homecomfort.com/ch/it/ocs/residenziale/air-4000-20868567-p/';
const MI_PAGE = 'https://www.mi.com/it/product/xiaomi-smart-air-purifier-4-lite/';
const MI_SPECS = 'https://www.mi.com/it/product/xiaomi-smart-air-purifier-4-lite/specs/';
const DRAGON = {
  spec: 'https://www.delonghi.com/en/trd40820-dragon-4-oil-filled-radiator/p/TRD40820',
  it: 'https://www.delonghi.com/it-it/p/radiatori-elettrici-a-olio-radiatore-elettrico-a-olio-dragon-4-trd40820/TRD40820.html',
  fr: 'https://www.delonghi.com/fr-fr/p/radiateurs-bains-dhuile-radiateur-bain-dhuile-dragon-4-trd40820/TRD40820.html',
  es: 'https://www.delonghi.com/es-es/p/radiadores-de-aceite-radiador-de-aceite-dragon-4-trd40820/TRD40820.html',
  de: 'https://www.delonghi.com/de-de/p/ol-radiatoren-trd40820-dragon-4-olradiator/TRD40820.html',
  pl: 'https://www.delonghi.com/pl-pl/p/grzejniki-olejowe-grzejnik-olejowy-dragon-4-trd40820/TRD40820.html',
};
const ROWENTA = {
  it: 'https://www.rowenta.it/p/intense-comfort-aqua-termoventilatore-da-bagno-silenzioso-potenza-2400-w/1830009455',
  fr: 'https://www.rowenta.fr/p/intense-comfort-aqua-radiateur-dappoint-pour-salle-de-bains-silencieux-2400-w/1830009455',
  es: 'https://www.rowenta.es/p/intense-comfort-aqua-de-rowenta-calefactor-de-bano-seguro-silencioso-2400-w-de-potencia/1830009455',
  de: 'https://www.rowenta.de/p/intense-comfort-aqua-sicherer-badezimmer-heizlufter-2400-w-leistung/1830009455',
};

const factLabels: Record<string, T> = {
  extraction: { it: 'Umidità tolta', fr: 'Humidité retirée', es: 'Humedad extraída', de: 'Entfeuchtung', pl: 'Osuszanie' },
  tank: { it: 'Serbatoio', fr: 'Réservoir', es: 'Depósito', de: 'Wassertank', pl: 'Zbiornik' },
  noise: { it: 'Rumore dichiarato', fr: 'Bruit annoncé', es: 'Ruido declarado', de: 'Angegebene Lautstärke', pl: 'Deklarowany hałas' },
  extra: { it: 'In più', fr: 'En plus', es: 'Además', de: 'Extra', pl: 'Dodatkowo' },
  power: { it: 'Potenza di raffreddamento', fr: 'Puissance froid', es: 'Potencia de frío', de: 'Kühlleistung', pl: 'Moc chłodzenia' },
  energy: { it: 'Classe energetica', fr: 'Classe énergétique', es: 'Clase energética', de: 'Energieklasse', pl: 'Klasa energetyczna' },
  kind: { it: 'Com’è fatto', fr: 'Type', es: 'Tipo', de: 'Bauart', pl: 'Rodzaj' },
  heattype: { it: 'Come scalda', fr: 'Mode de chauffe', es: 'Cómo calienta', de: 'Heizart', pl: 'Sposób grzania' },
  heatpower: { it: 'Potenza di riscaldamento', fr: 'Puissance de chauffe', es: 'Potencia de calor', de: 'Heizleistung', pl: 'Moc grzewcza' },
  room: { it: 'Stanza indicata', fr: 'Pièce indiquée', es: 'Habitación indicada', de: 'Angegebene Raumgröße', pl: 'Wskazany pokój' },
  cadr: { it: 'Aria pulita all’ora (CADR)', fr: 'Air purifié par heure (CADR)', es: 'Aire limpio por hora (CADR)', de: 'Saubere Luft pro Stunde (CADR)', pl: 'Czyste powietrze na godzinę (CADR)' },
  filtercost: { it: 'Filtro di ricambio', fr: 'Filtre de rechange', es: 'Filtro de recambio', de: 'Ersatzfilter', pl: 'Filtr na wymianę' },
};

// The numbers in plain words, for visitors who are not experts (shown under the comparison).
const factHelp: Record<string, T> = {
  extraction: {
    it: "Quanti litri d’acqua toglie dall’aria in un giorno, nelle condizioni di prova del produttore (di solito 30 °C e 80% di umidità): in una casa normale ne toglie meno.",
    fr: "Combien de litres d’eau il retire de l’air en un jour, dans les conditions de test du fabricant (souvent 30 °C et 80 % d’humidité) : dans un logement normal, il en retire moins.",
    es: "Cuántos litros de agua quita del aire en un día, en las condiciones de prueba del fabricante (normalmente 30 °C y 80 % de humedad): en una casa normal quita menos.",
    de: "Wie viele Liter Wasser er an einem Tag aus der Luft holt, unter den Prüfbedingungen des Herstellers (meist 30 °C und 80 % Luftfeuchte): in einer normalen Wohnung weniger.",
    pl: "Ile litrów wody usuwa z powietrza w ciągu doby, w warunkach testu producenta (zwykle 30 °C i 80% wilgotności): w zwykłym domu mniej.",
  },
  tank: {
    it: "Quanta acqua raccoglie prima di doverlo svuotare.",
    fr: "Combien d’eau il recueille avant qu’il faille le vider.",
    es: "Cuánta agua recoge antes de tener que vaciarlo.",
    de: "Wie viel Wasser er sammelt, bevor du ihn leeren musst.",
    pl: "Ile wody zbiera, zanim trzeba go opróżnić.",
  },
  noise: {
    it: "Quanto rumore fa secondo il produttore, in decibel: ogni 10 dB in più il suono sembra circa il doppio più forte.",
    fr: "Le bruit annoncé par le fabricant, en décibels : 10 dB de plus paraissent environ deux fois plus fort.",
    es: "El ruido que declara el fabricante, en decibelios: 10 dB más suenan más o menos el doble de fuerte.",
    de: "Die vom Hersteller angegebene Lautstärke in Dezibel: 10 dB mehr wirken etwa doppelt so laut.",
    pl: "Hałas deklarowany przez producenta, w decybelach: 10 dB więcej brzmi mniej więcej dwa razy głośniej.",
  },
  extra: {
    it: "Funzioni in più che contano nella vita di tutti i giorni.",
    fr: "Les fonctions en plus qui comptent au quotidien.",
    es: "Funciones extra que cuentan en el día a día.",
    de: "Zusatzfunktionen, die im Alltag zählen.",
    pl: "Dodatkowe funkcje, które przydają się na co dzień.",
  },
  power: {
    it: "Quanto calore riesce a togliere dalla stanza: più è alta, più grande è la stanza che riesce a rinfrescare.",
    fr: "Combien de chaleur il retire de la pièce : plus elle est élevée, plus la pièce rafraîchie peut être grande.",
    es: "Cuánto calor saca de la habitación: cuanto más alta, más grande la habitación que puede refrescar.",
    de: "Wie viel Wärme sie dem Raum entzieht: je höher, desto größer der Raum, den sie kühlen kann.",
    pl: "Ile ciepła usuwa z pokoju: im wyższa, tym większy pokój może schłodzić.",
  },
  energy: {
    it: "L’etichetta energetica europea: a parità di lavoro, A++ consuma meno di A+.",
    fr: "L’étiquette énergie européenne : pour le même travail, A++ consomme moins que A+.",
    es: "La etiqueta energética europea: para el mismo trabajo, A++ consume menos que A+.",
    de: "Das EU-Energielabel: bei gleicher Leistung braucht A++ weniger Strom als A+.",
    pl: "Europejska etykieta energetyczna: przy tej samej pracy A++ zużywa mniej niż A+.",
  },
  kind: {
    it: "Monoblocco: tutto in un apparecchio, con un tubo verso la finestra. Split: il compressore sta fuori, e dentro resta più silenzioso ed efficiente.",
    fr: "Monobloc : tout dans un appareil, avec une gaine vers la fenêtre. Split : le compresseur est dehors, et l’intérieur reste plus silencieux et efficace.",
    es: "Monobloque: todo en un aparato, con un tubo hacia la ventana. Split: el compresor queda fuera, y dentro es más silencioso y eficiente.",
    de: "Monoblock: alles in einem Gerät, mit Schlauch zum Fenster. Split: Der Kompressor steht draußen, drinnen ist es leiser und effizienter.",
    pl: "Monoblok: wszystko w jednym urządzeniu, z rurą do okna. Split: sprężarka stoi na zewnątrz, a w środku jest ciszej i wydajniej.",
  },
  heattype: {
    it: 'Radiatore a olio: scalda piano ma a lungo, senza rumore. Termoventilatore: soffia aria calda, scalda subito ma si sente. Pompa di calore: porta dentro il calore che c’è fuori, e per questo consuma molto meno corrente.',
    fr: 'Bain d’huile : il chauffe lentement mais longtemps, sans bruit. Radiateur soufflant : il souffle de l’air chaud, chauffe tout de suite mais s’entend. Pompe à chaleur : elle fait entrer la chaleur de l’extérieur, et consomme donc beaucoup moins d’électricité.',
    es: 'Radiador de aceite: calienta despacio pero durante mucho tiempo, sin ruido. Calefactor de aire: sopla aire caliente, calienta al momento pero se oye. Bomba de calor: mete dentro el calor que hay fuera, y por eso gasta mucha menos electricidad.',
    de: 'Ölradiator: heizt langsam, aber lange und ohne Geräusch. Heizlüfter: bläst warme Luft, heizt sofort, ist aber hörbar. Wärmepumpe: holt die Wärme von draußen herein und braucht deshalb viel weniger Strom.',
    pl: 'Grzejnik olejowy: grzeje powoli, ale długo i bezgłośnie. Termowentylator: wydmuchuje ciepłe powietrze, grzeje od razu, ale go słychać. Pompa ciepła: wprowadza do środka ciepło z zewnątrz, dlatego zużywa dużo mniej prądu.',
  },
  heatpower: {
    it: 'Per una stufa è anche la corrente che usa al massimo: 2000 W accesi per un’ora sono 2 kWh in bolletta. Per la pompa di calore è il calore che dà, e la corrente usata è molto meno.',
    fr: 'Pour un radiateur, c’est aussi l’électricité qu’il consomme au maximum : 2 000 W allumés une heure, ce sont 2 kWh sur la facture. Pour la pompe à chaleur, c’est la chaleur fournie, et l’électricité consommée est bien moindre.',
    es: 'En una estufa es también la electricidad que gasta como máximo: 2000 W encendidos una hora son 2 kWh en la factura. En la bomba de calor es el calor que da, y la electricidad que usa es mucho menos.',
    de: 'Bei einer Elektroheizung ist das auch der höchste Stromverbrauch: 2000 W eine Stunde lang sind 2 kWh auf der Rechnung. Bei der Wärmepumpe ist es die abgegebene Wärme, der Strom dafür ist viel weniger.',
    pl: 'W grzejniku to także maksymalne zużycie prądu: 2000 W przez godzinę to 2 kWh na rachunku. W pompie ciepła to oddawane ciepło, a zużycie prądu jest dużo mniejsze.',
  },
  room: {
    it: 'La stanza che il produttore indica come adatta. I m³ sono il volume: 60 m³ sono circa 24 m² con un soffitto di 2,5 metri.',
    fr: 'La pièce que le fabricant indique comme adaptée. Les m³ sont le volume : 60 m³, c’est environ 24 m² sous un plafond de 2,5 mètres.',
    es: 'La habitación que el fabricante indica como adecuada. Los m³ son el volumen: 60 m³ son unos 24 m² con un techo de 2,5 metros.',
    de: 'Der Raum, für den der Hersteller das Gerät angibt. m³ sind das Volumen: 60 m³ sind etwa 24 m² bei 2,5 Metern Deckenhöhe.',
    pl: 'Pokój, do którego producent przeznacza urządzenie. m³ to kubatura: 60 m³ to ok. 24 m² przy suficie 2,5 metra.',
  },
  cadr: {
    it: 'Quanti metri cubi d’aria pulita dà in un’ora, secondo il produttore e con il filtro nuovo: più è alto, più grande è la stanza. Con il filtro usato può calare, per questo contano i test indipendenti.',
    fr: 'Combien de mètres cubes d’air purifié il fournit en une heure, selon le fabricant et avec un filtre neuf : plus c’est élevé, plus la pièce peut être grande. Avec un filtre usagé, cela peut baisser, d’où l’intérêt des tests indépendants.',
    es: 'Cuántos metros cúbicos de aire limpio da en una hora, según el fabricante y con el filtro nuevo: cuanto más alto, más grande la habitación. Con el filtro usado puede bajar, por eso cuentan las pruebas independientes.',
    de: 'Wie viele Kubikmeter saubere Luft das Gerät pro Stunde liefert, laut Hersteller und mit neuem Filter: je höher, desto größer der Raum. Mit gebrauchtem Filter kann der Wert sinken, deshalb zählen unabhängige Tests.',
    pl: 'Ile metrów sześciennych czystego powietrza daje w godzinę, według producenta i z nowym filtrem: im więcej, tym większy pokój. Z używanym filtrem wartość może spaść, dlatego liczą się niezależne testy.',
  },
  filtercost: {
    it: 'Il filtro si cambia periodicamente, quindi il suo prezzo è una spesa che torna: qui il prezzo indicato da Stiftung Warentest.',
    fr: 'Le filtre se change régulièrement, son prix est donc une dépense qui revient : ici, le prix indiqué par Stiftung Warentest.',
    es: 'El filtro se cambia cada cierto tiempo, así que su precio es un gasto que se repite: aquí, el precio que indica Stiftung Warentest.',
    de: 'Der Filter wird regelmäßig gewechselt, sein Preis ist also eine wiederkehrende Ausgabe: hier der von der Stiftung Warentest genannte Preis.',
    pl: 'Filtr wymienia się regularnie, więc jego cena to wydatek, który wraca: tu cena podana przez Stiftung Warentest.',
  },
};

const categories: Record<string, Category> = {
  heat: {
    id: 'heat',
    icon: 'heat',
    slug: { it: 'stufa-elettrica', fr: 'chauffage-d-appoint', es: 'estufa-electrica', de: 'elektroheizung', pl: 'grzejnik-elektryczny' },
    name: { it: 'Stufa elettrica', fr: 'Chauffage d’appoint', es: 'Estufa eléctrica', de: 'Elektroheizung', pl: 'Grzejnik elektryczny' },
    title: {
      it: 'Quale stufa elettrica comprare?',
      fr: 'Quel chauffage d’appoint choisir ?',
      es: '¿Qué estufa eléctrica comprar?',
      de: 'Welche Elektroheizung kaufen?',
      pl: 'Jaki grzejnik elektryczny kupić?',
    },
    line: {
      it: 'Una stufa elettrica scalda la stanza che resta fredda, senza lavori: la attacchi alla presa e basta.',
      fr: 'Un chauffage d’appoint réchauffe la pièce qui reste froide, sans travaux : vous le branchez, c’est tout.',
      es: 'Una estufa eléctrica calienta la habitación que se queda fría, sin obras: la enchufas y listo.',
      de: 'Eine Elektroheizung wärmt den Raum, der kalt bleibt, ohne Umbau: einstecken, fertig.',
      pl: 'Grzejnik elektryczny ogrzewa pokój, w którym jest zimno, bez żadnych prac: podłączasz do gniazdka i gotowe.',
    },
    seo: {
      it: {
        keyphrase: 'stufa elettrica',
        title: 'Stufa elettrica a basso consumo: quale comprare nel {year}',
        description: 'Quale stufa elettrica comprare? Dicci a cosa ti serve e vedi subito il modello adatto, con prezzo, consumi e fonti verificate. Aggiornato ogni settimana.',
      },
      fr: {
        keyphrase: 'chauffage d’appoint',
        title: 'Chauffage d’appoint électrique : lequel choisir en {year} ?',
        description: 'Quel chauffage d’appoint choisir ? Dites-nous à quoi il vous sert et voyez tout de suite le bon modèle, avec prix, consommation et sources vérifiées.',
      },
      es: {
        keyphrase: 'estufa eléctrica',
        title: 'Estufa eléctrica de bajo consumo: cuál comprar en {year}',
        description: '¿Qué estufa eléctrica comprar? Dinos para qué la necesitas y ve al momento el modelo adecuado, con precio, consumo y fuentes verificadas.',
      },
      de: {
        keyphrase: 'Elektroheizung',
        title: 'Elektroheizung kaufen: Welche passt zu deinem Raum? ({year})',
        description: 'Welche Elektroheizung kaufen? Sag uns, wofür du sie brauchst, und sieh sofort das passende Modell, mit Preis, Stromverbrauch und geprüften Quellen.',
      },
      pl: {
        keyphrase: 'grzejnik elektryczny',
        title: 'Grzejnik elektryczny: jaki kupić w {year} roku? Wybór i ceny',
        description: 'Jaki grzejnik elektryczny kupić? Zobacz model, który polecamy, z ceną, zużyciem prądu i danymi producenta, każda liczba ze źródłem. Aktualizacja co tydzień.',
      },
    },
    heads: {
      choose: {
        it: 'La stufa elettrica giusta per la tua situazione',
        fr: 'Le chauffage d’appoint qu’il vous faut, selon votre situation',
        es: 'La estufa eléctrica adecuada para tu situación',
        de: 'Die passende Elektroheizung für deine Situation',
        pl: 'Grzejnik elektryczny dopasowany do twojej sytuacji',
      },
      others: {
        it: 'Anche queste stufe elettriche vanno bene',
        fr: 'Ces chauffages d’appoint conviennent aussi',
        es: 'Estas estufas eléctricas también sirven',
        de: 'Diese Elektroheizungen passen auch',
        pl: 'Te grzejniki elektryczne też się sprawdzą',
      },
      good: {
        it: 'Una stufa elettrica fa per te se',
        fr: 'Un chauffage d’appoint est fait pour vous si',
        es: 'Una estufa eléctrica te conviene si',
        de: 'Eine Elektroheizung passt zu dir, wenn',
        pl: 'Grzejnik elektryczny jest dla ciebie, jeśli',
      },
      skip: {
        it: 'La stufa elettrica non fa per te se',
        fr: 'Oubliez le chauffage d’appoint si',
        es: 'La estufa eléctrica no es para ti si',
        de: 'Lass die Elektroheizung weg, wenn',
        pl: 'Grzejnik elektryczny nie jest dla ciebie, jeśli',
      },
      how: {
        it: 'Come scegliere una stufa elettrica',
        fr: 'Comment choisir un chauffage d’appoint',
        es: 'Cómo elegir una estufa eléctrica',
        de: 'So wählst du eine Elektroheizung aus',
        pl: 'Jak wybrać grzejnik elektryczny',
      },
      faq: {
        it: 'Domande frequenti sulla stufa elettrica',
        fr: 'Questions fréquentes sur le chauffage d’appoint',
        es: 'Preguntas frecuentes sobre la estufa eléctrica',
        de: 'Häufige Fragen zur Elektroheizung',
        pl: 'Najczęstsze pytania o grzejnik elektryczny',
      },
    },
    goodIf: {
      it: ['Una stanza resta fredda, o il riscaldamento non è ancora acceso.', 'Ti serve caldo in una stanza per qualche ora, non in tutta la casa.'],
      fr: ['Une pièce reste froide, ou le chauffage n’est pas encore allumé.', 'Vous avez besoin de chaleur dans une pièce pour quelques heures, pas dans tout le logement.'],
      es: ['Una habitación se queda fría, o la calefacción aún no está encendida.', 'Necesitas calor en una habitación durante unas horas, no en toda la casa.'],
      de: ['Ein Raum bleibt kalt, oder die Heizung läuft noch nicht.', 'Du brauchst ein paar Stunden Wärme in einem Raum, nicht in der ganzen Wohnung.'],
      pl: ['Jeden pokój zostaje zimny albo ogrzewanie jeszcze nie działa.', 'Potrzebujesz ciepła w jednym pokoju przez kilka godzin, a nie w całym domu.'],
    },
    skipIf: {
      it: ['Vuoi scaldare tutta la casa ogni giorno: con una stufa elettrica la bolletta sale molto, meglio una pompa di calore.', 'Vuoi usarla vicino a vasca o doccia: lì nessuna stufa portatile va bene.'],
      fr: ['Vous voulez chauffer tout le logement chaque jour : avec un chauffage électrique, la facture grimpe vite ; mieux vaut une pompe à chaleur.', 'Vous voulez l’utiliser près de la baignoire ou de la douche : là, aucun chauffage mobile ne convient.'],
      es: ['Quieres calentar toda la casa cada día: con una estufa eléctrica la factura sube mucho; mejor una bomba de calor.', 'Quieres usarla cerca de la bañera o la ducha: ahí no vale ninguna estufa portátil.'],
      de: ['Du willst jeden Tag die ganze Wohnung heizen: Mit Strom wird das teuer, besser ist eine Wärmepumpe.', 'Du willst sie neben Badewanne oder Dusche nutzen: Dort gehört kein mobiles Heizgerät hin.'],
      pl: ['Chcesz codziennie ogrzewać cały dom: grzejnikiem elektrycznym rachunki mocno rosną, lepsza jest pompa ciepła.', 'Chcesz go używać przy wannie lub prysznicu: tam nie nadaje się żaden przenośny grzejnik.'],
    },
    criteria: {
      it: [
        { t: 'Il tipo giusto', d: 'Radiatore a olio per stare al caldo per ore in soggiorno o in camera, senza rumore; termoventilatore per scaldare subito, anche il bagno.' },
        { t: 'Quanto è grande la stanza', d: 'Guarda i metri cubi o quadrati indicati dal produttore: 60 m³ sono circa una stanza di 24 m² con soffitto normale.' },
        { t: 'Termostato e sicurezza', d: 'Il termostato la spegne quando la stanza è calda, così consuma meno; conta anche lo spegnimento automatico se si ribalta o si scalda troppo.' },
      ],
      fr: [
        { t: 'Le bon type', d: 'Bain d’huile pour rester au chaud des heures au salon ou dans la chambre, sans bruit ; radiateur soufflant pour chauffer tout de suite, même la salle de bains.' },
        { t: 'La taille de la pièce', d: 'Regardez les m³ ou m² indiqués par le fabricant : 60 m³, c’est environ une pièce de 24 m² sous un plafond normal.' },
        { t: 'Thermostat et sécurité', d: 'Le thermostat l’arrête quand la pièce est chaude, il consomme donc moins ; l’arrêt automatique en cas de chute ou de surchauffe compte aussi.' },
      ],
      es: [
        { t: 'El tipo adecuado', d: 'Radiador de aceite para estar caliente durante horas en el salón o el dormitorio, sin ruido; calefactor de aire para calentar al momento, también el baño.' },
        { t: 'El tamaño de la habitación', d: 'Mira los m³ o m² que indica el fabricante: 60 m³ son más o menos una habitación de 24 m² con techo normal.' },
        { t: 'Termostato y seguridad', d: 'El termostato la apaga cuando la habitación está caliente, así gasta menos; también cuenta el apagado automático si se vuelca o se calienta demasiado.' },
      ],
      de: [
        { t: 'Die richtige Art', d: 'Ölradiator, um stundenlang leise im Wohn- oder Schlafzimmer warm zu bleiben; Heizlüfter, um sofort zu heizen, auch im Bad.' },
        { t: 'Wie groß der Raum ist', d: 'Achte auf die Kubikmeter oder Quadratmeter des Herstellers: 60 m³ sind etwa ein Raum mit 24 m² bei normaler Deckenhöhe.' },
        { t: 'Thermostat und Sicherheit', d: 'Der Thermostat schaltet ab, wenn der Raum warm ist, das spart Strom; wichtig ist auch die Abschaltung beim Umkippen oder Überhitzen.' },
      ],
      pl: [
        { t: 'Właściwy rodzaj', d: 'Grzejnik olejowy, żeby godzinami było ciepło w salonie lub sypialni, bez hałasu; termowentylator, żeby ogrzać od razu, także łazienkę.' },
        { t: 'Wielkość pokoju', d: 'Sprawdź m³ lub m² podane przez producenta: 60 m³ to mniej więcej pokój 24 m² przy zwykłej wysokości sufitu.' },
        { t: 'Termostat i bezpieczeństwo', d: 'Termostat wyłącza grzejnik, gdy w pokoju jest ciepło, więc zużywa mniej prądu; ważne jest też wyłączanie po przewróceniu lub przegrzaniu.' },
      ],
    },
    budget: { EUR: [100, 300], PLN: [450, 1300] },
    needs: [
      {
        id: 'main',
        icon: 'home',
        label: { it: 'Soggiorno o camera, per ore', fr: 'Salon ou chambre, pendant des heures', es: 'Salón o dormitorio, durante horas', de: 'Wohn- oder Schlafzimmer, stundenlang', pl: 'Salon lub sypialnia, przez wiele godzin' },
        picks: [{ id: 'delonghi-dragon-4' }],
      },
      {
        id: 'bath',
        icon: 'bath',
        label: { it: 'Bagno, o caldo subito', fr: 'Salle de bains, ou chaleur immédiate', es: 'Baño, o calor al momento', de: 'Bad, oder sofort warm', pl: 'Łazienka albo ciepło od razu' },
        picks: [{ id: 'rowenta-intense-aqua', markets: HEAT_ALT }],
      },
      {
        id: 'bills',
        icon: 'leaf',
        label: { it: 'Bollette più basse (e fresco d’estate)', fr: 'Factures plus basses (et frais l’été)', es: 'Facturas más bajas (y fresco en verano)', de: 'Weniger Stromkosten (und Kühlung im Sommer)', pl: 'Niższe rachunki (i chłód latem)' },
        picks: [{ id: 'portasplit-heat', markets: HEAT_ALT }],
      },
    ],
    compare: ['heattype', 'heatpower', 'room', 'noise', 'extra'],
    faq: {
      it: [
        {
          q: 'Quanto consuma una stufa elettrica?',
          a: 'Al massimo, la potenza scritta sull’etichetta per ogni ora: 2000 W accesi per un’ora sono 2 kWh. Moltiplica per il prezzo al kWh della tua bolletta e sai quanto costa un’ora. Con il termostato si spegne e riaccende da sola quando la stanza è calda, quindi di solito consuma meno del massimo.',
        },
        {
          q: 'Meglio radiatore a olio o termoventilatore?',
          a: 'Dipende da come la usi. Il radiatore a olio ci mette un po’ a scaldare, ma poi dà un calore uniforme e silenzioso che resta anche dopo lo spegnimento: è il migliore per ore in soggiorno o in camera. Il termoventilatore scalda subito ma fa un po’ di rumore: è comodo per il bagno o per mezz’ora in una stanza fredda.',
        },
        {
          q: 'Qual è il modo più economico di scaldare con l’elettricità?',
          a: 'Una pompa di calore, cioè un climatizzatore che scalda anche. Invece di trasformare la corrente in calore, sposta il calore da fuori a dentro: il PortaSplit dichiara un SCOP di 4,0, cioè in media circa 4 kWh di calore per ogni kWh di corrente. Una stufa elettrica, di qualsiasi tipo, ne dà 1.',
        },
        {
          q: 'Si può usare una stufa in bagno?',
          a: 'Solo un modello dichiarato adatto al bagno, come il Rowenta certificato IP21, che resiste alle gocce d’acqua. Tienilo comunque lontano da vasca e doccia, dove potrebbe bagnarsi.',
        },
      ],
      fr: [
        {
          q: 'Combien consomme un chauffage électrique ?',
          a: 'Au maximum, la puissance inscrite sur l’étiquette pour chaque heure : 2 000 W allumés une heure, c’est 2 kWh. Multipliez par le prix du kWh de votre facture et vous savez ce que coûte une heure. Avec le thermostat, il s’arrête et redémarre seul quand la pièce est chaude, donc il consomme en général moins que le maximum.',
        },
        {
          q: 'Bain d’huile ou radiateur soufflant ?',
          a: 'Cela dépend de l’usage. Le bain d’huile met un peu de temps à chauffer, puis donne une chaleur douce et silencieuse qui dure même après l’arrêt : le meilleur choix pour des heures au salon ou dans la chambre. Le radiateur soufflant chauffe tout de suite mais fait un peu de bruit : pratique pour la salle de bains ou une demi-heure dans une pièce froide.',
        },
        {
          q: 'Quelle est la façon la moins chère de chauffer à l’électricité ?',
          a: 'Une pompe à chaleur, c’est-à-dire un climatiseur qui chauffe aussi. Au lieu de transformer l’électricité en chaleur, elle déplace la chaleur de l’extérieur vers l’intérieur : le PortaSplit annonce un SCOP de 4,0, soit en moyenne environ 4 kWh de chaleur pour 1 kWh d’électricité. Un chauffage électrique, quel qu’il soit, en donne 1.',
        },
        {
          q: 'Peut-on utiliser un chauffage d’appoint dans la salle de bains ?',
          a: 'Seulement un modèle déclaré adapté à la salle de bains, comme le Rowenta certifié IP21, qui résiste aux gouttes d’eau. Gardez-le quand même loin de la baignoire et de la douche, où il pourrait être mouillé.',
        },
      ],
      es: [
        {
          q: '¿Cuánto consume una estufa eléctrica?',
          a: 'Como máximo, la potencia que indica la etiqueta por cada hora: 2000 W encendidos una hora son 2 kWh. Multiplica por el precio del kWh de tu factura y sabrás cuánto cuesta una hora. Con el termostato se apaga y se enciende sola cuando la habitación está caliente, así que normalmente gasta menos del máximo.',
        },
        {
          q: '¿Mejor radiador de aceite o calefactor de aire?',
          a: 'Depende del uso. El radiador de aceite tarda un poco en calentar, pero luego da un calor uniforme y silencioso que dura incluso después de apagarlo: es el mejor para horas en el salón o el dormitorio. El calefactor de aire calienta al momento pero hace algo de ruido: es práctico para el baño o para media hora en una habitación fría.',
        },
        {
          q: '¿Cuál es la forma más barata de calentar con electricidad?',
          a: 'Una bomba de calor, es decir, un aire acondicionado que también calienta. En lugar de convertir la electricidad en calor, mueve el calor de fuera hacia dentro: el PortaSplit declara un SCOP de 4,0, o sea de media unos 4 kWh de calor por cada kWh de electricidad. Una estufa eléctrica, del tipo que sea, da 1.',
        },
        {
          q: '¿Se puede usar una estufa en el baño?',
          a: 'Solo un modelo declarado apto para el baño, como el Rowenta con certificación IP21, que resiste las gotas de agua. Aun así, mantenlo lejos de la bañera y la ducha, donde podría mojarse.',
        },
      ],
      de: [
        {
          q: 'Wie viel Strom braucht eine Elektroheizung?',
          a: 'Höchstens die angegebene Leistung pro Stunde: 2000 W eine Stunde lang sind 2 kWh. Multipliziere das mit dem kWh-Preis auf deiner Stromrechnung, dann weißt du, was eine Stunde kostet. Mit Thermostat schaltet sie ab und wieder ein, sobald der Raum warm ist, und braucht deshalb meist weniger als das Maximum.',
        },
        {
          q: 'Ölradiator oder Heizlüfter?',
          a: 'Kommt auf die Nutzung an. Der Ölradiator braucht etwas, bis er warm ist, gibt dann aber gleichmäßige, leise Wärme ab, die auch nach dem Ausschalten noch anhält: am besten für Stunden im Wohn- oder Schlafzimmer. Der Heizlüfter heizt sofort, ist aber etwas lauter: praktisch fürs Bad oder eine halbe Stunde in einem kalten Raum.',
        },
        {
          q: 'Wie heizt man mit Strom am günstigsten?',
          a: 'Mit einer Wärmepumpe, also einer Klimaanlage, die auch heizt. Statt Strom in Wärme umzuwandeln, holt sie Wärme von draußen nach drinnen: Das PortaSplit gibt einen SCOP von 4,0 an, im Schnitt also rund 4 kWh Wärme pro kWh Strom. Eine Elektroheizung, egal welcher Art, schafft 1.',
        },
        {
          q: 'Darf ein Heizlüfter ins Bad?',
          a: 'Nur ein Modell, das der Hersteller fürs Bad freigibt, wie der Rowenta mit IP21 gegen Tropfwasser. Stell ihn trotzdem nicht neben Badewanne oder Dusche, wo er nass werden kann.',
        },
      ],
      pl: [
        {
          q: 'Ile prądu zużywa grzejnik elektryczny?',
          a: 'Najwyżej tyle, ile wynosi moc z etykiety, na każdą godzinę: 2000 W włączone przez godzinę to 2 kWh. Pomnóż to przez cenę kWh z rachunku, a będziesz wiedzieć, ile kosztuje godzina. Z termostatem grzejnik sam się wyłącza i włącza, gdy w pokoju jest ciepło, więc zwykle zużywa mniej niż maksimum.',
        },
        {
          q: 'Grzejnik olejowy czy termowentylator?',
          a: 'Zależy od tego, jak go używasz. Grzejnik olejowy nagrzewa się chwilę, ale potem daje równe, ciche ciepło, które trwa także po wyłączeniu: najlepszy na długie godziny w salonie lub sypialni. Termowentylator grzeje od razu, ale trochę szumi: wygodny do łazienki albo na pół godziny w zimnym pokoju.',
        },
        {
          q: 'Jak najtaniej grzać prądem?',
          a: 'Pompą ciepła, czyli klimatyzatorem, który też grzeje. Zamiast zamieniać prąd w ciepło, przenosi ciepło z zewnątrz do środka, więc z każdej kWh prądu daje kilka kWh ciepła. Grzejnik elektryczny, jakiegokolwiek rodzaju, daje 1.',
        },
      ],
    },
    related: ['dehum', 'ac'],
  },

  dehum: {
    id: 'dehum',
    icon: 'dehum',
    markets: DEHUM,
    slug: { it: 'deumidificatore', fr: 'deshumidificateur', es: 'deshumidificador', de: 'luftentfeuchter', pl: 'osuszacz-powietrza' },
    name: { it: 'Deumidificatore', fr: 'Déshumidificateur', es: 'Deshumidificador', de: 'Luftentfeuchter' },
    title: {
      it: 'Quale deumidificatore comprare?',
      fr: 'Quel déshumidificateur choisir ?',
      es: '¿Qué deshumidificador comprar?',
      de: 'Welchen Luftentfeuchter kaufen?',
    },
    line: {
      it: 'Un deumidificatore toglie l’umidità che fa nascere la muffa e asciuga il bucato in casa.',
      fr: 'Un déshumidificateur retire l’humidité qui fait naître la moisissure et sèche le linge à l’intérieur.',
      es: 'Un deshumidificador quita la humedad que hace salir el moho y seca la ropa dentro de casa.',
      de: 'Ein Luftentfeuchter entzieht die Feuchtigkeit, die Schimmel entstehen lässt, und trocknet Wäsche in der Wohnung.',
    },
    seo: {
      it: {
        keyphrase: 'deumidificatore',
        title: 'Deumidificatore portatile: quale comprare nel {year}',
        description: 'Quale deumidificatore comprare? Dicci dove ti serve e vedi subito il modello adatto, con prezzo, litri al giorno, rumore e fonti verificate.',
      },
      fr: {
        keyphrase: 'déshumidificateur',
        title: 'Déshumidificateur d’air : lequel choisir en {year} ?',
        description: 'Quel déshumidificateur choisir ? Dites-nous où il vous sert et voyez tout de suite le bon modèle, avec prix, litres par jour, bruit et sources vérifiées.',
      },
      es: {
        keyphrase: 'deshumidificador',
        title: 'Deshumidificador: cuál comprar en {year} para tu casa',
        description: '¿Qué deshumidificador comprar? Dinos dónde lo necesitas y ve al momento el modelo adecuado, con precio, litros al día, ruido y fuentes verificadas.',
      },
      de: {
        keyphrase: 'Luftentfeuchter',
        title: 'Luftentfeuchter: Welcher lohnt sich? Kaufberatung {year}',
        description: 'Welcher Luftentfeuchter passt? Sag uns, wo du ihn brauchst, und sieh sofort das passende Modell, mit Preis, Liter pro Tag, Lautstärke und Quellen.',
      },
    },
    heads: {
      choose: {
        it: 'Il deumidificatore giusto per la tua situazione',
        fr: 'Le déshumidificateur qu’il vous faut, selon votre situation',
        es: 'El deshumidificador adecuado para tu situación',
        de: 'Der passende Luftentfeuchter für deine Situation',
      },
      others: {
        it: 'Anche questi deumidificatori vanno bene',
        fr: 'Ces déshumidificateurs conviennent aussi',
        es: 'Estos deshumidificadores también sirven',
        de: 'Diese Luftentfeuchter passen auch',
      },
      good: {
        it: 'Un deumidificatore fa per te se',
        fr: 'Un déshumidificateur est fait pour vous si',
        es: 'Un deshumidificador te conviene si',
        de: 'Ein Luftentfeuchter passt zu dir, wenn',
      },
      skip: {
        it: 'Il deumidificatore non fa per te se',
        fr: 'Oubliez le déshumidificateur si',
        es: 'El deshumidificador no es para ti si',
        de: 'Lass den Luftentfeuchter weg, wenn',
      },
      how: {
        it: 'Come scegliere un deumidificatore',
        fr: 'Comment choisir un déshumidificateur',
        es: 'Cómo elegir un deshumidificador',
        de: 'So wählst du einen Luftentfeuchter aus',
      },
      faq: {
        it: 'Domande frequenti sul deumidificatore',
        fr: 'Questions fréquentes sur le déshumidificateur',
        es: 'Preguntas frecuentes sobre el deshumidificador',
        de: 'Häufige Fragen zum Luftentfeuchter',
      },
    },
    goodIf: {
      it: ['Vedi condensa sui vetri o macchie di muffa negli angoli.', 'Stendi il bucato in casa.'],
      fr: ['Vous voyez de la condensation sur les vitres ou des taches de moisissure dans les coins.', 'Vous faites sécher le linge à l’intérieur.'],
      es: ['Ves condensación en los cristales o manchas de moho en las esquinas.', 'Tiendes la ropa dentro de casa.'],
      de: ['Du siehst Kondenswasser an den Fenstern oder Schimmelflecken in den Ecken.', 'Du trocknest Wäsche in der Wohnung.'],
    },
    skipIf: {
      it: ['L’umidità viene da un’infiltrazione o da un tubo rotto: prima va riparata quella.', 'La stanza è sotto i 15 °C: in un locale freddo i modelli a compressore rendono meno.'],
      fr: ['L’humidité vient d’une infiltration ou d’un tuyau percé : il faut d’abord réparer.', 'La pièce est sous 15 °C : dans le froid, les modèles à compresseur sont moins efficaces.'],
      es: ['La humedad viene de una filtración o de una tubería rota: primero hay que repararla.', 'La habitación está por debajo de 15 °C: con frío, los modelos de compresor rinden menos.'],
      de: ['Die Feuchtigkeit kommt von einem Wasserschaden oder undichten Rohr: Das muss zuerst repariert werden.', 'Der Raum hat unter 15 °C: In kalten Räumen arbeiten Kompressorgeräte schlechter.'],
    },
    criteria: {
      it: [
        { t: 'Quanti litri al giorno', d: 'Per una stanza normale bastano 12-16 litri; per cantine, tavernette o case molto umide servono 20 litri o più.' },
        { t: 'L’igrostato', d: 'Si ferma da solo quando l’umidità è giusta: consuma meno e non secca troppo l’aria.' },
        { t: 'Il serbatoio', d: 'Più è grande, meno spesso lo svuoti; con un tubo di scarico puoi non svuotarlo mai.' },
      ],
      fr: [
        { t: 'Combien de litres par jour', d: 'Pour une pièce normale, 12 à 16 litres suffisent ; pour une cave ou un logement très humide, il faut 20 litres ou plus.' },
        { t: 'L’hygrostat', d: 'Il s’arrête tout seul quand l’humidité est bonne : il consomme moins et n’assèche pas trop l’air.' },
        { t: 'Le réservoir', d: 'Plus il est grand, moins vous le videz ; avec un tuyau d’évacuation, vous pouvez ne jamais le vider.' },
      ],
      es: [
        { t: 'Cuántos litros al día', d: 'Para una habitación normal bastan 12-16 litros; para sótanos o casas muy húmedas hacen falta 20 litros o más.' },
        { t: 'El higrostato', d: 'Se para solo cuando la humedad es la adecuada: gasta menos y no reseca el aire.' },
        { t: 'El depósito', d: 'Cuanto más grande, menos veces lo vacías; con una manguera de desagüe puedes no vaciarlo nunca.' },
      ],
      de: [
        { t: 'Wie viele Liter am Tag', d: 'Für einen normalen Raum reichen 12–16 Liter; für Keller oder sehr feuchte Wohnungen braucht es 20 Liter oder mehr.' },
        { t: 'Der Hygrostat', d: 'Er schaltet ab, sobald die Feuchte stimmt: spart Strom und trocknet die Luft nicht zu stark aus.' },
        { t: 'Der Wassertank', d: 'Je größer, desto seltener leeren; mit Ablaufschlauch musst du ihn gar nicht leeren.' },
      ],
    },
    budget: { EUR: [250, 350] },
    needs: [
      {
        id: 'main',
        icon: 'target',
        label: { it: 'Per quasi tutte le case', fr: 'Pour presque tous les logements', es: 'Para casi todas las casas', de: 'Für fast jede Wohnung' },
        picks: [{ id: 'delonghi-ariadry-multi-16' }],
      },
      {
        id: 'save',
        icon: 'coins',
        label: { it: 'Spendere meno', fr: 'Dépenser moins', es: 'Gastar menos', de: 'Weniger ausgeben' },
        picks: [
          { id: 'pro-breeze-omnidry-20' },
          { id: 'orbegozo-dh-1655', markets: ['es'], tag: { es: 'Calidad y precio, según la OCU', en: 'Good value, according to OCU' } },
        ],
      },
      {
        id: 'damp',
        icon: 'drop',
        label: { it: 'Cantina o casa molto umida', fr: 'Cave ou logement très humide', es: 'Sótano o casa muy húmeda', de: 'Keller oder sehr feuchte Wohnung' },
        picks: [{ id: 'duux-bora-smart' }],
      },
      {
        // Below about 10 °C a compressor dehumidifier loses its effect; a desiccant one keeps working
        // (Stiftung Warentest). Only where a tested desiccant model is sold.
        id: 'cold',
        icon: 'cold',
        label: { de: 'Garage oder unbeheizter Raum', en: 'Garage or unheated room' },
        picks: [{ id: 'ecoair-dd1-mk6', markets: ['de'] }],
      },
    ],
    compare: ['extraction', 'tank', 'noise', 'extra'],
    faq: {
      it: [
        {
          q: 'Quale umidità devo tenere in casa?',
          a: 'In genere tra il 40 e il 60%. Sopra il 60% per molte ore la muffa trova le condizioni giuste; per questo conviene un deumidificatore con igrostato, che si ferma da solo quando ci arriva.',
        },
        {
          q: 'Quanto consuma un deumidificatore?',
          a: 'Dipende dalla potenza e da quante ore lavora: il nostro primo consiglio assorbe 285 W. Con l’igrostato si spegne quando l’aria è asciutta, quindi non resta acceso tutto il giorno.',
        },
        {
          q: 'Serve per asciugare il bucato?',
          a: 'Sì: messo nella stanza del bucato toglie l’umidità che i panni rilasciano, così asciugano prima e non lasciano l’umidità sui muri.',
        },
        {
          q: 'Funziona anche in una cantina fredda?',
          a: 'Un deumidificatore a compressore lavora bene sopra i 10 °C circa; in una stanza più fredda rende molto meno. Lì serve un modello ad adsorbimento, con un materiale essiccante al posto del compressore, che però consuma di più.',
        },
      ],
      fr: [
        {
          q: 'Quel taux d’humidité garder chez soi ?',
          a: 'En général entre 40 et 60 %. Au-dessus de 60 % pendant des heures, la moisissure trouve de bonnes conditions ; d’où l’intérêt d’un déshumidificateur avec hygrostat, qui s’arrête tout seul une fois le bon taux atteint.',
        },
        {
          q: 'Combien consomme un déshumidificateur ?',
          a: 'Cela dépend de sa puissance et du nombre d’heures de fonctionnement : notre premier choix absorbe 285 W. Avec l’hygrostat, il s’arrête quand l’air est sec, il ne tourne donc pas toute la journée.',
        },
        {
          q: 'Est-il utile pour sécher le linge ?',
          a: 'Oui : placé dans la pièce du linge, il retire l’humidité rejetée par les vêtements, qui sèchent plus vite sans humidifier les murs.',
        },
        {
          q: 'Fonctionne-t-il dans une cave froide ?',
          a: 'Un déshumidificateur à compresseur fonctionne bien au-dessus d’environ 10 °C ; dans une pièce plus froide, il est bien moins efficace. Il faut alors un modèle à adsorption, avec un matériau dessiccant à la place du compresseur, qui consomme davantage.',
        },
      ],
      es: [
        {
          q: '¿Qué humedad hay que mantener en casa?',
          a: 'En general entre el 40 y el 60 %. Por encima del 60 % durante muchas horas, el moho encuentra las condiciones ideales; por eso conviene un deshumidificador con higrostato, que se para solo al llegar al nivel correcto.',
        },
        {
          q: '¿Cuánto gasta un deshumidificador?',
          a: 'Depende de la potencia y de las horas que funcione: nuestra primera recomendación consume 285 W. Con el higrostato se apaga cuando el aire está seco, así que no está encendido todo el día.',
        },
        {
          q: '¿Sirve para secar la ropa?',
          a: 'Sí: colocado en la habitación donde tiendes, quita la humedad que suelta la ropa, que se seca antes y no humedece las paredes.',
        },
        {
          q: '¿Funciona en un sótano frío?',
          a: 'Un deshumidificador de compresor funciona bien por encima de unos 10 °C; en una habitación más fría rinde mucho menos. Ahí hace falta un modelo de adsorción, con un material desecante en lugar del compresor, que gasta más electricidad.',
        },
      ],
      de: [
        {
          q: 'Welche Luftfeuchtigkeit sollte ich zu Hause halten?',
          a: 'Meist zwischen 40 und 60 %. Liegt sie viele Stunden über 60 %, findet Schimmel gute Bedingungen; deshalb lohnt sich ein Luftentfeuchter mit Hygrostat, der sich beim richtigen Wert selbst abschaltet.',
        },
        {
          q: 'Wie viel Strom braucht ein Luftentfeuchter?',
          a: 'Das hängt von der Leistung und den Betriebsstunden ab: Unsere erste Empfehlung nimmt 285 W auf. Mit Hygrostat schaltet er ab, sobald die Luft trocken ist, und läuft also nicht den ganzen Tag.',
        },
        {
          q: 'Hilft er beim Wäschetrocknen?',
          a: 'Ja: Im Raum mit der Wäsche entzieht er die Feuchtigkeit, die die Kleidung abgibt; sie trocknet schneller, und die Wände bleiben trocken.',
        },
        {
          q: 'Funktioniert er auch in einem kalten Keller?',
          a: 'Ein Kompressor-Luftentfeuchter arbeitet am besten ab etwa 10 °C; in kälteren Räumen lässt seine Leistung stark nach. Dort ist ein Adsorptionsgerät mit Trockenmittel statt Kompressor besser, das allerdings mehr Strom braucht.',
        },
      ],
    },
    related: ['heat', 'purifier', 'ac'],
  },

  purifier: {
    id: 'purifier',
    icon: 'purifier',
    slug: { it: 'purificatore-d-aria', fr: 'purificateur-d-air', es: 'purificador-de-aire', de: 'luftreiniger', pl: 'oczyszczacz-powietrza' },
    name: { it: 'Purificatore d’aria', fr: 'Purificateur d’air', es: 'Purificador de aire', de: 'Luftreiniger', pl: 'Oczyszczacz powietrza' },
    title: {
      it: 'Quale purificatore d’aria comprare?',
      fr: 'Quel purificateur d’air choisir ?',
      es: '¿Qué purificador de aire comprar?',
      de: 'Welchen Luftreiniger kaufen?',
      pl: 'Jaki oczyszczacz powietrza kupić?',
    },
    line: {
      it: 'Un purificatore d’aria toglie polline, polvere sottile, peli e odori: utile con allergie, animali o una strada trafficata sotto casa.',
      fr: 'Un purificateur d’air retire le pollen, les particules fines, les poils et les odeurs : utile en cas d’allergie, d’animaux ou de rue passante.',
      es: 'Un purificador de aire quita el polen, el polvo fino, los pelos y los olores: útil con alergias, mascotas o una calle con mucho tráfico.',
      de: 'Ein Luftreiniger holt Pollen, Feinstaub, Tierhaare und Gerüche aus der Raumluft: hilfreich bei Allergien, Haustieren oder einer stark befahrenen Straße.',
      pl: 'Oczyszczacz powietrza usuwa pyłki, pył zawieszony, sierść i zapachy: przydaje się przy alergii, zwierzętach albo ruchliwej ulicy za oknem.',
    },
    seo: {
      it: {
        keyphrase: 'purificatore d’aria',
        title: 'Purificatore d’aria: quale comprare nel {year} (allergie, animali)',
        description: 'Quale purificatore d’aria comprare? Per allergie, peli o smog: vedi subito il modello adatto, con prezzo, costo dei filtri e test indipendenti.',
      },
      fr: {
        keyphrase: 'purificateur d’air',
        title: 'Purificateur d’air : lequel choisir en {year} (allergies, animaux)',
        description: 'Quel purificateur d’air choisir ? Allergies, poils ou pollution : voyez tout de suite le bon modèle, avec prix, coût des filtres et tests indépendants.',
      },
      es: {
        keyphrase: 'purificador de aire',
        title: 'Purificador de aire: cuál comprar en {year} (alergias, mascotas)',
        description: '¿Qué purificador de aire comprar? Para alergias, pelo de mascotas o contaminación: ve al momento el modelo adecuado, con precio, filtros y pruebas.',
      },
      de: {
        keyphrase: 'Luftreiniger',
        title: 'Luftreiniger: Welcher passt? Mit Testergebnissen {year}',
        description: 'Welcher Luftreiniger passt? Bei Allergie, Tierhaaren oder Feinstaub: sieh sofort das passende Modell, mit Preis, Filterkosten und unabhängigen Tests.',
      },
      pl: {
        keyphrase: 'oczyszczacz powietrza',
        title: 'Oczyszczacz powietrza: jaki kupić w {year} roku? Wybór i testy',
        description: 'Jaki oczyszczacz powietrza kupić? Alergia, sierść czy smog: od razu zobacz odpowiedni model, z ceną, kosztem filtrów i niezależnymi testami.',
      },
    },
    heads: {
      choose: {
        it: 'Il purificatore d’aria giusto per la tua situazione',
        fr: 'Le purificateur d’air qu’il vous faut, selon votre situation',
        es: 'El purificador de aire adecuado para tu situación',
        de: 'Der passende Luftreiniger für deine Situation',
        pl: 'Oczyszczacz powietrza dopasowany do twojej sytuacji',
      },
      others: {
        it: 'Anche questi purificatori d’aria vanno bene',
        fr: 'Ces purificateurs d’air conviennent aussi',
        es: 'Estos purificadores de aire también sirven',
        de: 'Diese Luftreiniger passen auch',
        pl: 'Te oczyszczacze powietrza też się sprawdzą',
      },
      good: {
        it: 'Un purificatore d’aria fa per te se',
        fr: 'Un purificateur d’air est fait pour vous si',
        es: 'Un purificador de aire te conviene si',
        de: 'Ein Luftreiniger passt zu dir, wenn',
        pl: 'Oczyszczacz powietrza jest dla ciebie, jeśli',
      },
      skip: {
        it: 'Il purificatore d’aria non fa per te se',
        fr: 'Oubliez le purificateur d’air si',
        es: 'El purificador de aire no es para ti si',
        de: 'Lass den Luftreiniger weg, wenn',
        pl: 'Oczyszczacz powietrza nie jest dla ciebie, jeśli',
      },
      how: {
        it: 'Come scegliere un purificatore d’aria',
        fr: 'Comment choisir un purificateur d’air',
        es: 'Cómo elegir un purificador de aire',
        de: 'So wählst du einen Luftreiniger aus',
        pl: 'Jak wybrać oczyszczacz powietrza',
      },
      faq: {
        it: 'Domande frequenti sul purificatore d’aria',
        fr: 'Questions fréquentes sur le purificateur d’air',
        es: 'Preguntas frecuentes sobre el purificador de aire',
        de: 'Häufige Fragen zum Luftreiniger',
        pl: 'Najczęstsze pytania o oczyszczacz powietrza',
      },
    },
    goodIf: {
      it: ['Soffri di allergia a pollini o polvere.', 'Hai animali in casa, o odori e fumo che restano nell’aria.'],
      fr: ['Vous êtes allergique au pollen ou à la poussière.', 'Vous avez des animaux, ou des odeurs et de la fumée qui restent dans l’air.'],
      es: ['Tienes alergia al polen o al polvo.', 'Tienes mascotas, u olores y humo que se quedan en el aire.'],
      de: ['Du hast eine Pollen- oder Hausstauballergie.', 'Du hast Haustiere, oder Gerüche und Rauch bleiben in der Luft.'],
      pl: ['Masz alergię na pyłki lub kurz.', 'Masz zwierzęta albo w powietrzu zostają zapachy i dym.'],
    },
    skipIf: {
      it: ['Vuoi togliere umidità o muffa: il purificatore non la toglie, serve un deumidificatore.', 'Non vuoi pensare ai filtri: vanno cambiati periodicamente e costano.'],
      fr: ['Vous voulez retirer l’humidité ou la moisissure : le purificateur ne le fait pas, il faut un déshumidificateur.', 'Vous ne voulez pas penser aux filtres : il faut les changer régulièrement, et ils coûtent.'],
      es: ['Quieres quitar humedad o moho: el purificador no lo hace, necesitas un deshumidificador.', 'No quieres ocuparte de los filtros: hay que cambiarlos cada cierto tiempo y cuestan dinero.'],
      de: ['Du willst Feuchtigkeit oder Schimmel loswerden: Das schafft ein Luftreiniger nicht, dafür brauchst du einen Luftentfeuchter.', 'Du willst dich nicht um Filter kümmern: Sie müssen regelmäßig gewechselt werden und kosten Geld.'],
      pl: ['Chcesz pozbyć się wilgoci lub pleśni: oczyszczacz tego nie robi, potrzebny jest osuszacz.', 'Nie chcesz myśleć o filtrach: trzeba je regularnie wymieniać i kosztują.'],
    },
    criteria: {
      it: [
        { t: 'Un test indipendente', d: 'Il dato del produttore è misurato con il filtro nuovo: i test veri misurano anche con il filtro usato, e lì alcuni purificatori puliscono molto meno.' },
        { t: 'La stanza giusta', d: 'Guarda i metri quadrati indicati: meglio un apparecchio un po’ più grande della stanza, che può lavorare più piano e fare meno rumore.' },
        { t: 'Filtri e rumore', d: 'Quanto costa il filtro di ricambio, e quanti decibel fa di notte se lo tieni in camera.' },
      ],
      fr: [
        { t: 'Un test indépendant', d: 'Le chiffre du fabricant est mesuré avec un filtre neuf : les vrais tests mesurent aussi avec un filtre usagé, et là certains purificateurs nettoient bien moins.' },
        { t: 'La bonne taille de pièce', d: 'Regardez les m² indiqués : mieux vaut un appareil un peu plus grand que la pièce, qui peut tourner plus lentement et faire moins de bruit.' },
        { t: 'Filtres et bruit', d: 'Le prix du filtre de rechange, et les décibels la nuit si vous le mettez dans la chambre.' },
      ],
      es: [
        { t: 'Una prueba independiente', d: 'El dato del fabricante se mide con el filtro nuevo: las pruebas de verdad miden también con el filtro usado, y ahí algunos purificadores limpian mucho menos.' },
        { t: 'La habitación adecuada', d: 'Mira los m² indicados: mejor un aparato algo más grande que la habitación, que puede funcionar más despacio y hacer menos ruido.' },
        { t: 'Filtros y ruido', d: 'Cuánto cuesta el filtro de recambio, y cuántos decibelios hace de noche si lo tienes en el dormitorio.' },
      ],
      de: [
        { t: 'Ein unabhängiger Test', d: 'Die Herstellerangabe gilt mit neuem Filter: Echte Tests messen auch mit gebrauchtem Filter, und dann reinigen manche Geräte deutlich schlechter.' },
        { t: 'Die richtige Raumgröße', d: 'Achte auf die angegebenen m²: Besser ein Gerät etwas größer als der Raum, das langsamer und leiser laufen kann.' },
        { t: 'Filter und Lautstärke', d: 'Was der Ersatzfilter kostet, und wie viel Dezibel das Gerät nachts macht, wenn es im Schlafzimmer steht.' },
      ],
      pl: [
        { t: 'Niezależny test', d: 'Dane producenta mierzy się z nowym filtrem: prawdziwe testy mierzą też z filtrem używanym, a wtedy niektóre oczyszczacze czyszczą dużo słabiej.' },
        { t: 'Właściwy pokój', d: 'Sprawdź podane m²: lepiej urządzenie trochę większe niż pokój, bo może pracować wolniej i ciszej.' },
        { t: 'Filtry i hałas', d: 'Ile kosztuje filtr na wymianę i ile decybeli urządzenie robi w nocy, jeśli stoi w sypialni.' },
      ],
    },
    needs: [
      {
        id: 'main',
        icon: 'target',
        label: { it: 'Per quasi tutte le case', fr: 'Pour presque tous les logements', es: 'Para casi todas las casas', de: 'Für fast jede Wohnung', pl: 'Do prawie każdego domu' },
        picks: [{ id: 'bosch-air-4000' }],
      },
      {
        id: 'save',
        icon: 'coins',
        label: { it: 'Spendere meno', fr: 'Dépenser moins', es: 'Gastar menos', de: 'Weniger ausgeben', pl: 'Wydać mniej' },
        picks: [{ id: 'xiaomi-4-lite' }],
      },
    ],
    compare: ['room', 'cadr', 'noise', 'filtercost'],
    faq: {
      it: [
        {
          q: 'Il purificatore d’aria toglie anche l’umidità?',
          a: 'No. Filtra le particelle e gli odori, ma l’acqua nell’aria resta dov’è. Per umidità, condensa e muffa serve un deumidificatore.',
        },
        {
          q: 'Serve davvero con le allergie?',
          a: 'Può aiutare in casa: secondo Stiftung Warentest i modelli migliori tolgono bene polvere sottile, pollini e sostanze nocive anche con il filtro già usato. Non sostituisce le indicazioni del medico, e con le finestre aperte il polline rientra.',
        },
        {
          q: 'Quanto costa tenerlo acceso?',
          a: 'Tra corrente e filtri, nel test di Stiftung Warentest dai 65 ai 175 euro all’anno a seconda del modello. Il filtro di ricambio è la voce più grande: guarda il suo prezzo prima di comprare.',
        },
        {
          q: 'Dove conviene metterlo?',
          a: 'Nella stanza dove passi più tempo, di solito la camera da letto, lontano da tende e mobili che bloccano l’aria, con porte e finestre chiuse mentre lavora.',
        },
      ],
      fr: [
        {
          q: 'Un purificateur d’air retire-t-il aussi l’humidité ?',
          a: 'Non. Il filtre les particules et les odeurs, mais l’eau présente dans l’air reste. Pour l’humidité, la condensation et la moisissure, il faut un déshumidificateur.',
        },
        {
          q: 'Est-ce vraiment utile en cas d’allergie ?',
          a: 'Cela peut aider à la maison : selon Stiftung Warentest, les meilleurs modèles retirent bien les particules fines, le pollen et les polluants, même avec un filtre usagé. Il ne remplace pas l’avis du médecin, et fenêtres ouvertes, le pollen revient.',
        },
        {
          q: 'Combien coûte-t-il à l’usage ?',
          a: 'Électricité et filtres compris, de 65 à 175 euros par an selon le modèle dans le test de Stiftung Warentest. Le filtre de rechange est le plus gros poste : regardez son prix avant d’acheter.',
        },
        {
          q: 'Où le placer ?',
          a: 'Dans la pièce où vous passez le plus de temps, souvent la chambre, loin des rideaux et des meubles qui bloquent l’air, portes et fenêtres fermées pendant qu’il tourne.',
        },
      ],
      es: [
        {
          q: '¿Un purificador de aire quita también la humedad?',
          a: 'No. Filtra partículas y olores, pero el agua del aire sigue ahí. Para la humedad, la condensación y el moho necesitas un deshumidificador.',
        },
        {
          q: '¿De verdad sirve con alergias?',
          a: 'Puede ayudar en casa: según Stiftung Warentest, los mejores modelos quitan bien el polvo fino, el polen y los contaminantes incluso con el filtro ya usado. No sustituye las indicaciones del médico, y con las ventanas abiertas el polen vuelve a entrar.',
        },
        {
          q: '¿Cuánto cuesta tenerlo encendido?',
          a: 'Entre electricidad y filtros, de 65 a 175 euros al año según el modelo en la prueba de Stiftung Warentest. El filtro de recambio es el gasto mayor: mira su precio antes de comprar.',
        },
        {
          q: '¿Dónde conviene ponerlo?',
          a: 'En la habitación donde pasas más tiempo, normalmente el dormitorio, lejos de cortinas y muebles que bloqueen el aire, con puertas y ventanas cerradas mientras funciona.',
        },
      ],
      de: [
        {
          q: 'Entfernt ein Luftreiniger auch Feuchtigkeit?',
          a: 'Nein. Er filtert Partikel und Gerüche, das Wasser in der Luft bleibt. Gegen Feuchtigkeit, Kondenswasser und Schimmel brauchst du einen Luftentfeuchter.',
        },
        {
          q: 'Hilft ein Luftreiniger bei Allergien?',
          a: 'Er kann zu Hause helfen: Laut Stiftung Warentest entfernen die besten Modelle Feinstaub, Pollen und Schadstoffe auch mit gebrauchtem Filter wirksam. Er ersetzt nicht den Rat des Arztes, und bei offenem Fenster kommen die Pollen wieder herein.',
        },
        {
          q: 'Was kostet der Betrieb?',
          a: 'Strom und Filter zusammen je nach Modell 65 bis 175 Euro im Jahr, so der Test der Stiftung Warentest. Der Ersatzfilter ist der größte Posten: Schau dir seinen Preis vor dem Kauf an.',
        },
        {
          q: 'Wo stellt man ihn am besten hin?',
          a: 'In den Raum, in dem du am meisten Zeit verbringst, meist das Schlafzimmer, nicht hinter Vorhänge oder Möbel, die die Luft blockieren, und bei geschlossenen Türen und Fenstern.',
        },
      ],
      pl: [
        {
          q: 'Czy oczyszczacz powietrza usuwa też wilgoć?',
          a: 'Nie. Filtruje cząstki i zapachy, ale woda w powietrzu zostaje. Na wilgoć, skraplanie i pleśń potrzebny jest osuszacz.',
        },
        {
          q: 'Czy naprawdę pomaga przy alergii?',
          a: 'Może pomóc w domu: według Stiftung Warentest najlepsze modele dobrze usuwają pył zawieszony, pyłki i szkodliwe substancje nawet z używanym filtrem. Nie zastępuje zaleceń lekarza, a przy otwartych oknach pyłki wracają.',
        },
        {
          q: 'Ile kosztuje używanie?',
          a: 'Prąd i filtry razem to według testu Stiftung Warentest od 65 do 175 euro rocznie, zależnie od modelu. Największy koszt to filtr na wymianę: sprawdź jego cenę przed zakupem.',
        },
        {
          q: 'Gdzie go postawić?',
          a: 'W pokoju, w którym spędzasz najwięcej czasu, zwykle w sypialni, z dala od zasłon i mebli blokujących powietrze, przy zamkniętych drzwiach i oknach.',
        },
      ],
    },
    related: ['dehum', 'heat'],
  },

  ac: {
    id: 'ac',
    icon: 'ac',
    slug: { it: 'condizionatore-portatile', fr: 'climatiseur-mobile', es: 'aire-acondicionado-portatil', de: 'mobile-klimaanlage', pl: 'klimatyzator-przenosny' },
    name: { it: 'Condizionatore portatile', fr: 'Climatiseur mobile', es: 'Aire acondicionado portátil', de: 'Mobile Klimaanlage', pl: 'Klimatyzator przenośny' },
    title: {
      it: 'Quale condizionatore portatile comprare?',
      fr: 'Quel climatiseur mobile choisir ?',
      es: '¿Qué aire acondicionado portátil comprar?',
      de: 'Welche mobile Klimaanlage kaufen?',
      pl: 'Jaki klimatyzator przenośny kupić?',
    },
    line: {
      it: 'Un condizionatore portatile rinfresca una stanza senza installatore: lo sposti dove serve e lo metti via a fine estate.',
      fr: 'Un climatiseur mobile rafraîchit une pièce sans installateur : vous le déplacez où il faut et le rangez à la fin de l’été.',
      es: 'Un aire acondicionado portátil refresca una habitación sin instalador: lo mueves donde haga falta y lo guardas al acabar el verano.',
      de: 'Eine mobile Klimaanlage kühlt einen Raum ohne Installateur: Du stellst sie hin, wo sie gebraucht wird, und räumst sie nach dem Sommer weg.',
      pl: 'Klimatyzator przenośny chłodzi pokój bez montażu: przestawiasz go, gdzie trzeba, a po lecie chowasz.',
    },
    seo: {
      it: {
        keyphrase: 'condizionatore portatile',
        title: 'Condizionatore portatile: quale comprare nel {year} (silenzioso)',
        description: 'Quale condizionatore portatile comprare? Dicci cosa conta per te e vedi subito il modello adatto, con prezzo, rumore, consumi e fonti verificate.',
      },
      fr: {
        keyphrase: 'climatiseur mobile',
        title: 'Climatiseur mobile : lequel choisir en {year} (même silencieux)',
        description: 'Quel climatiseur mobile choisir ? Dites-nous ce qui compte pour vous et voyez tout de suite le bon modèle, avec prix, bruit, consommation et sources.',
      },
      es: {
        keyphrase: 'aire acondicionado portátil',
        title: 'Aire acondicionado portátil: cuál comprar en {year}',
        description: '¿Qué aire acondicionado portátil comprar? Dinos qué te importa y ve al momento el modelo adecuado, con precio, ruido, consumo y fuentes verificadas.',
      },
      de: {
        keyphrase: 'mobile Klimaanlage',
        title: 'Mobile Klimaanlage: Welche kaufen? Kaufberatung {year}',
        description: 'Welche mobile Klimaanlage kaufen? Sag uns, was dir wichtig ist, und sieh sofort das passende Modell, mit Preis, Lautstärke, Verbrauch und Quellen.',
      },
      pl: {
        keyphrase: 'klimatyzator przenośny',
        title: 'Klimatyzator przenośny: jaki kupić w {year} roku?',
        description: 'Jaki klimatyzator przenośny kupić? Powiedz, co jest dla ciebie ważne, i od razu zobacz odpowiedni model, z ceną, hałasem, zużyciem prądu i źródłami.',
      },
    },
    heads: {
      choose: {
        it: 'Il condizionatore portatile giusto per la tua situazione',
        fr: 'Le climatiseur mobile qu’il vous faut, selon votre situation',
        es: 'El aire acondicionado portátil adecuado para tu situación',
        de: 'Die passende mobile Klimaanlage für deine Situation',
        pl: 'Klimatyzator przenośny dopasowany do twojej sytuacji',
      },
      others: {
        it: 'Anche questi condizionatori portatili vanno bene',
        fr: 'Ces climatiseurs mobiles conviennent aussi',
        es: 'Estos aires acondicionados portátiles también sirven',
        de: 'Diese mobilen Klimaanlagen passen auch',
        pl: 'Te klimatyzatory przenośne też się sprawdzą',
      },
      good: {
        it: 'Un condizionatore portatile fa per te se',
        fr: 'Un climatiseur mobile est fait pour vous si',
        es: 'Un aire acondicionado portátil te conviene si',
        de: 'Eine mobile Klimaanlage passt zu dir, wenn',
        pl: 'Klimatyzator przenośny jest dla ciebie, jeśli',
      },
      skip: {
        it: 'Il condizionatore portatile non fa per te se',
        fr: 'Oubliez le climatiseur mobile si',
        es: 'El aire acondicionado portátil no es para ti si',
        de: 'Lass die mobile Klimaanlage weg, wenn',
        pl: 'Klimatyzator przenośny nie jest dla ciebie, jeśli',
      },
      how: {
        it: 'Come scegliere un condizionatore portatile',
        fr: 'Comment choisir un climatiseur mobile',
        es: 'Cómo elegir un aire acondicionado portátil',
        de: 'So wählst du eine mobile Klimaanlage aus',
        pl: 'Jak wybrać klimatyzator przenośny',
      },
      faq: {
        it: 'Domande frequenti sul condizionatore portatile',
        fr: 'Questions fréquentes sur le climatiseur mobile',
        es: 'Preguntas frecuentes sobre el aire acondicionado portátil',
        de: 'Häufige Fragen zur mobilen Klimaanlage',
        pl: 'Najczęstsze pytania o klimatyzator przenośny',
      },
    },
    goodIf: {
      it: ['Sei in affitto o non puoi forare il muro.', 'Devi rinfrescare una o due stanze.'],
      fr: ['Vous êtes locataire ou ne pouvez pas percer le mur.', 'Vous devez rafraîchir une ou deux pièces.'],
      es: ['Vives de alquiler o no puedes hacer agujeros en la pared.', 'Necesitas refrescar una o dos habitaciones.'],
      de: ['Du wohnst zur Miete oder darfst nicht bohren.', 'Du willst ein oder zwei Räume kühlen.'],
      pl: ['Wynajmujesz mieszkanie albo nie możesz wiercić w ścianie.', 'Chcesz schłodzić jeden lub dwa pokoje.'],
    },
    skipIf: {
      it: ['Vuoi rinfrescare tutta la casa ogni estate: un climatizzatore fisso consuma molto meno.', 'Il rumore in camera da letto ti disturba: i portatili a tubo sono rumorosi.'],
      fr: ['Vous voulez rafraîchir tout le logement chaque été : un climatiseur fixe consomme beaucoup moins.', 'Le bruit dans la chambre vous gêne : les modèles mobiles à gaine sont bruyants.'],
      es: ['Quieres refrescar toda la casa cada verano: un split fijo gasta mucho menos.', 'Te molesta el ruido en el dormitorio: los portátiles con tubo son ruidosos.'],
      de: ['Du willst jeden Sommer die ganze Wohnung kühlen: Ein fest installiertes Split-Gerät braucht viel weniger Strom.', 'Lärm im Schlafzimmer stört dich: Mobile Geräte mit Schlauch sind laut.'],
      pl: ['Chcesz co lato chłodzić cały dom: klimatyzacja stała zużywa dużo mniej prądu.', 'Przeszkadza Ci hałas w sypialni: przenośne klimatyzatory z rurą są głośne.'],
    },
    criteria: {
      it: [
        { t: 'La potenza giusta', d: 'Circa 9.000 BTU per 20-25 m²; di più per stanze grandi o molto esposte al sole.' },
        { t: 'Il tubo e la finestra', d: 'Il tubo porta fuori il calore: più la finestra resta chiusa intorno al tubo, meglio rinfresca.' },
        { t: 'Il rumore', d: 'Guarda i decibel dichiarati: sopra i 60 dB si sente bene, soprattutto di notte.' },
      ],
      fr: [
        { t: 'La bonne puissance', d: 'Environ 9 000 BTU pour 20 à 25 m² ; davantage pour les grandes pièces ou très exposées au soleil.' },
        { t: 'La gaine et la fenêtre', d: 'La gaine évacue la chaleur dehors : mieux la fenêtre est fermée autour, mieux il rafraîchit.' },
        { t: 'Le bruit', d: 'Regardez les décibels annoncés : au-delà de 60 dB, on l’entend bien, surtout la nuit.' },
      ],
      es: [
        { t: 'La potencia adecuada', d: 'Unos 9.000 BTU para 20-25 m²; más para habitaciones grandes o con mucho sol.' },
        { t: 'El tubo y la ventana', d: 'El tubo saca el calor fuera: cuanto mejor cerrada queda la ventana alrededor, mejor enfría.' },
        { t: 'El ruido', d: 'Mira los decibelios declarados: por encima de 60 dB se oye bien, sobre todo de noche.' },
      ],
      de: [
        { t: 'Die richtige Leistung', d: 'Etwa 9.000 BTU für 20–25 m²; mehr für große oder sehr sonnige Räume.' },
        { t: 'Schlauch und Fenster', d: 'Der Schlauch bringt die Wärme nach draußen: Je dichter das Fenster um ihn herum schließt, desto besser kühlt sie.' },
        { t: 'Die Lautstärke', d: 'Achte auf die angegebenen Dezibel: Über 60 dB hört man sie deutlich, vor allem nachts.' },
      ],
      pl: [
        { t: 'Odpowiednia moc', d: 'Około 9000 BTU na 20–25 m²; więcej do dużych lub mocno nasłonecznionych pokoi.' },
        { t: 'Rura i okno', d: 'Rura wyprowadza ciepło na zewnątrz: im szczelniej okno zamyka się wokół niej, tym lepiej chłodzi.' },
        { t: 'Hałas', d: 'Sprawdź deklarowane decybele: powyżej 60 dB urządzenie dobrze słychać, zwłaszcza w nocy.' },
      ],
    },
    needs: [
      {
        id: 'main',
        icon: 'target',
        label: { it: 'Per quasi tutte le case', fr: 'Pour presque tous les logements', es: 'Para casi todas las casas', de: 'Für fast jede Wohnung', pl: 'Do prawie każdego domu' },
        picks: [{ id: 'bosch-cool-4000' }],
      },
      {
        id: 'save',
        icon: 'coins',
        label: { it: 'Spendere meno', fr: 'Dépenser moins', es: 'Gastar menos', de: 'Weniger ausgeben', pl: 'Wydać mniej' },
        picks: [{ id: 'ariston-mobis-plus-10' }],
      },
      {
        id: 'quiet',
        icon: 'leaf',
        label: { it: 'Consumare meno, silenzioso', fr: 'Consommer moins, silencieux', es: 'Gastar menos luz, silencioso', de: 'Sparsam und leise', pl: 'Mniej prądu, cicho' },
        picks: [{ id: 'midea-portasplit', markets: ['it', 'fr', 'es', 'de'] }],
      },
    ],
    compare: ['power', 'energy', 'noise', 'kind'],
    faq: {
      it: [
        {
          q: 'Esiste un condizionatore portatile senza tubo?',
          a: 'Non uno che rinfreschi davvero. Il calore tolto alla stanza deve uscire da qualche parte: senza tubo resta in casa. Gli apparecchi venduti “senza tubo” sono in genere raffrescatori ad acqua, che spostano aria umida e abbassano poco la temperatura. L’alternativa vera è uno split portatile come il PortaSplit, che ha un tubo sottile verso un’unità esterna.',
        },
        {
          q: 'Quanto consuma un condizionatore portatile?',
          a: 'Più di un climatizzatore fisso: secondo Stiftung Warentest i monoblocchi a tubo sono fino a sette volte meno efficienti. Per poche settimane all’anno in una stanza va bene; per tutta la casa ogni estate conviene un impianto fisso.',
        },
        {
          q: 'Serve lasciare la finestra aperta?',
          a: 'Solo lo spazio per il tubo: chiudi il resto con il kit finestra, altrimenti rientra l’aria calda che il condizionatore ha appena buttato fuori.',
        },
      ],
      fr: [
        {
          q: 'Existe-t-il un climatiseur mobile sans évacuation ?',
          a: 'Pas un qui rafraîchisse vraiment. La chaleur retirée de la pièce doit sortir quelque part : sans gaine, elle reste à l’intérieur. Les appareils vendus « sans évacuation » sont en général des rafraîchisseurs d’air à eau, qui brassent de l’air humide et baissent peu la température. La vraie alternative est un split mobile comme le PortaSplit, relié à une unité extérieure par un tuyau fin.',
        },
        {
          q: 'Combien consomme un climatiseur mobile ?',
          a: 'Plus qu’un climatiseur fixe : selon Stiftung Warentest, les monoblocs à gaine sont jusqu’à sept fois moins efficaces. Pour quelques semaines par an dans une pièce, c’est acceptable ; pour tout le logement chaque été, mieux vaut une installation fixe.',
        },
        {
          q: 'Faut-il laisser la fenêtre ouverte ?',
          a: 'Seulement le passage de la gaine : fermez le reste avec le kit fenêtre, sinon l’air chaud que le climatiseur vient de rejeter revient à l’intérieur.',
        },
      ],
      es: [
        {
          q: '¿Existe un aire acondicionado portátil sin tubo?',
          a: 'No uno que enfríe de verdad. El calor que se saca de la habitación tiene que salir por algún sitio: sin tubo, se queda dentro. Los aparatos vendidos “sin tubo” suelen ser climatizadores evaporativos, que mueven aire húmedo y bajan poco la temperatura. La alternativa real es un split portátil como el PortaSplit, con un tubo fino hacia una unidad exterior.',
        },
        {
          q: '¿Cuánto gasta un aire acondicionado portátil?',
          a: 'Más que un split fijo: según Stiftung Warentest, los monobloque con tubo son hasta siete veces menos eficientes. Para unas semanas al año en una habitación está bien; para toda la casa cada verano conviene una instalación fija.',
        },
        {
          q: '¿Hay que dejar la ventana abierta?',
          a: 'Solo el hueco del tubo: cierra el resto con el kit de ventana, o volverá a entrar el aire caliente que el aparato acaba de expulsar.',
        },
      ],
      de: [
        {
          q: 'Gibt es eine mobile Klimaanlage ohne Schlauch?',
          a: 'Keine, die wirklich kühlt. Die Wärme, die dem Raum entzogen wird, muss irgendwo hin: Ohne Schlauch bleibt sie drinnen. Geräte „ohne Schlauch“ sind meist Luftkühler mit Wasser, die feuchte Luft bewegen und die Temperatur kaum senken. Die echte Alternative ist ein mobiles Split-Gerät wie das PortaSplit, mit einer dünnen Leitung zu einem Außengerät.',
        },
        {
          q: 'Wie viel Strom braucht eine mobile Klimaanlage?',
          a: 'Mehr als ein fest installiertes Gerät: Laut Stiftung Warentest sind Monoblock-Geräte mit Schlauch bis zu siebenmal weniger effizient. Für ein paar Wochen im Jahr in einem Raum geht das; für die ganze Wohnung jeden Sommer lohnt sich eine feste Anlage.',
        },
        {
          q: 'Muss das Fenster offen bleiben?',
          a: 'Nur der Spalt für den Schlauch: Dichte den Rest mit einem Fensterkit ab, sonst kommt die warme Luft, die das Gerät gerade hinausbefördert hat, wieder herein.',
        },
      ],
      pl: [
        {
          q: 'Czy istnieje klimatyzator przenośny bez rury?',
          a: 'Nie taki, który naprawdę chłodzi. Ciepło zabrane z pokoju musi gdzieś wyjść: bez rury zostaje w środku. Urządzenia sprzedawane „bez rury” to zwykle klimatyzery wodne, które poruszają wilgotne powietrze i niewiele obniżają temperaturę.',
        },
        {
          q: 'Ile prądu zużywa klimatyzator przenośny?',
          a: 'Więcej niż klimatyzacja stała: według Stiftung Warentest urządzenia monoblokowe z rurą są nawet siedem razy mniej wydajne. Na kilka tygodni w roku w jednym pokoju to w porządku; do całego domu co lato lepsza jest instalacja stała.',
        },
        {
          q: 'Czy okno musi być otwarte?',
          a: 'Tylko na rurę: resztę uszczelnij zestawem okiennym, inaczej wróci gorące powietrze, które urządzenie właśnie wyrzuciło.',
        },
      ],
    },
    related: ['heat', 'dehum'],
  },
};

const products: Product[] = [
  // ---------- Air purifiers ----------
  {
    id: 'bosch-air-4000',
    category: 'purifier',
    tier: 'mid',
    brand: 'Bosch',
    name: { it: 'Bosch Air 4000', fr: 'Bosch Air 4000', es: 'Bosch Air 4000', de: 'Bosch Air 4000', pl: 'Bosch Air 4000' },
    why: {
      it: 'Ha preso il voto migliore nel test di Stiftung Warentest, che misura anche con il filtro usato; basta per stanze grandi e di notte si sente appena.',
      fr: 'Il a obtenu la meilleure note au test de Stiftung Warentest, qui mesure aussi avec un filtre usagé ; il suffit pour de grandes pièces et la nuit on l’entend à peine.',
      es: 'Obtuvo la mejor nota en la prueba de Stiftung Warentest, que mide también con el filtro usado; basta para habitaciones grandes y de noche apenas se oye.',
      de: 'Bestes Ergebnis im Test der Stiftung Warentest, die auch mit gebrauchtem Filter misst; reicht für große Räume und ist nachts kaum zu hören.',
      pl: 'Dostał najlepszą ocenę w teście Stiftung Warentest, który mierzy też z używanym filtrem; wystarcza do dużych pokoi, a w nocy prawie go nie słychać.',
    },
    lab: {
      text: {
        it: 'primo a pari merito, voto «buono» (2,3), nel test di Stiftung Warentest 3/2024',
        fr: 'premier ex aequo, note « bien » (2,3), au test de Stiftung Warentest 3/2024',
        es: 'primero empatado, nota «bueno» (2,3), en la prueba de Stiftung Warentest 3/2024',
        de: 'Testsieger (gemeinsam), „gut“ (2,3), Stiftung Warentest 3/2024',
        pl: 'ex aequo pierwsze miejsce, ocena „dobry” (2,3), w teście Stiftung Warentest 3/2024',
      },
      source: T_ONLINE_PURIFIER,
    },
    facts: [
      { key: 'room', value: { it: 'Fino a 62,5 m²', fr: 'Jusqu’à 62,5 m²', es: 'Hasta 62,5 m²', de: 'Bis 62,5 m²', pl: 'Do 62,5 m²' }, source: BOSCH_AIR },
      { key: 'cadr', value: '300 m³/h', source: BOSCH_AIR },
      { key: 'noise', value: { it: '25 dB(A) di notte', fr: '25 dB(A) la nuit', es: '25 dB(A) de noche', de: '25 dB(A) im Schlafmodus', pl: '25 dB(A) w nocy' }, source: BOSCH_AIR },
      { key: 'filtercost', value: { it: 'Circa 50 €', fr: 'Environ 50 €', es: 'Unos 50 €', de: 'Etwa 50 €', pl: 'Ok. 50 euro' }, source: SW_BOSCH_AIR },
    ],
    search: { it: 'Bosch Air 4000', fr: 'Bosch Air 4000', es: 'Bosch Air 4000', de: 'Bosch Air 4000', pl: 'Bosch Air 4000' },
    asin: { it: 'B0B5D7H7VP', fr: 'B0B5D7H7VP', es: 'B0B5D7H7VP', de: 'B0B5D7H7VP', pl: 'B0B5D7H7VP' },
  },
  {
    id: 'xiaomi-4-lite',
    category: 'purifier',
    tier: 'low',
    brand: 'Xiaomi',
    name: {
      it: 'Xiaomi Smart Air Purifier 4 Lite',
      fr: 'Xiaomi Smart Air Purifier 4 Lite',
      es: 'Xiaomi Smart Air Purifier 4 Lite',
      de: 'Xiaomi Smart Air Purifier 4 Lite',
      pl: 'Xiaomi Smart Air Purifier 4 Lite',
    },
    why: {
      it: 'Costa meno (prezzo medio online 136 € contro 200 € del Bosch, secondo Stiftung Warentest) e basta per stanze fino a 43 m²; anche il filtro di ricambio costa meno.',
      fr: 'Il coûte moins cher (prix moyen en ligne 136 € contre 200 € pour le Bosch, selon Stiftung Warentest) et suffit pour des pièces jusqu’à 43 m² ; le filtre de rechange coûte moins aussi.',
      es: 'Cuesta menos (precio medio en internet 136 € frente a 200 € del Bosch, según Stiftung Warentest) y basta para habitaciones de hasta 43 m²; el filtro de recambio también cuesta menos.',
      de: 'Günstiger (mittlerer Online-Preis 136 € statt 200 € beim Bosch, laut Stiftung Warentest) und reicht für Räume bis 43 m²; auch der Ersatzfilter kostet weniger.',
      pl: 'Tańszy (średnia cena w internecie według Stiftung Warentest: 136 euro wobec 200 euro za Boscha) i wystarcza do pokoi do 43 m²; filtr na wymianę też jest tańszy.',
    },
    facts: [
      { key: 'room', value: { it: '25–43 m²', fr: '25–43 m²', es: '25–43 m²', de: '25–43 m²', pl: '25–43 m²' }, source: MI_SPECS },
      { key: 'cadr', value: '360 m³/h', source: MI_SPECS },
      { key: 'noise', value: { it: '33,4 dB(A) al minimo', fr: '33,4 dB(A) au minimum', es: '33,4 dB(A) al mínimo', de: '33,4 dB(A) auf niedrigster Stufe', pl: '33,4 dB(A) na minimum' }, source: MI_PAGE },
      { key: 'filtercost', value: { it: 'Circa 40 €', fr: 'Environ 40 €', es: 'Unos 40 €', de: 'Etwa 40 €', pl: 'Ok. 40 euro' }, source: SW_XIAOMI },
    ],
    search: {
      it: 'Xiaomi Smart Air Purifier 4 Lite',
      fr: 'Xiaomi Smart Air Purifier 4 Lite',
      es: 'Xiaomi Smart Air Purifier 4 Lite',
      de: 'Xiaomi Smart Air Purifier 4 Lite',
      pl: 'Xiaomi Smart Air Purifier 4 Lite',
    },
    asin: { it: 'B09QJTCYHJ', fr: 'B09QJTCYHJ', es: 'B09QJTCYHJ', de: 'B09QJTCYHJ' },
  },

  // ---------- Electric heaters ----------
  {
    id: 'delonghi-dragon-4',
    category: 'heat',
    tier: 'mid',
    brand: 'De’Longhi',
    name: {
      it: 'De’Longhi Dragon 4 TRD40820',
      fr: 'De’Longhi Dragon 4 TRD40820',
      es: 'De’Longhi Dragon 4 TRD40820',
      de: 'De’Longhi Dragon 4 TRD40820',
      pl: 'De’Longhi Dragon 4 TRD40820',
    },
    why: {
      it: 'Scalda con l’olio: un calore uniforme e silenzioso, che continua anche dopo lo spegnimento. È il più adatto per stare al caldo per ore in soggiorno o in camera.',
      fr: 'Il chauffe à l’huile : une chaleur homogène et silencieuse, qui continue même après l’arrêt. Le plus adapté pour rester au chaud des heures au salon ou dans la chambre.',
      es: 'Calienta con aceite: un calor uniforme y silencioso, que sigue incluso después de apagarlo. Es el más adecuado para estar caliente durante horas en el salón o el dormitorio.',
      de: 'Heizt mit Öl: gleichmäßige, leise Wärme, die auch nach dem Ausschalten noch anhält. Am besten, um stundenlang im Wohn- oder Schlafzimmer warm zu bleiben.',
      pl: 'Grzeje olejem: równe, ciche ciepło, które trwa także po wyłączeniu. Najlepszy, żeby godzinami było ciepło w salonie lub sypialni.',
    },
    facts: [
      { key: 'heattype', value: { it: 'Radiatore a olio', fr: 'Bain d’huile', es: 'Radiador de aceite', de: 'Ölradiator', pl: 'Grzejnik olejowy' }, source: DRAGON.it },
      { key: 'heatpower', value: { it: '2000 W (minimo 900 W)', fr: '2 000 W (minimum 900 W)', es: '2000 W (mínimo 900 W)', de: '2000 W (mindestens 900 W)', pl: '2000 W (minimum 900 W)' }, source: DRAGON.spec },
      { key: 'room', value: { it: 'Fino a 60 m³', fr: 'Jusqu’à 60 m³', es: 'Hasta 60 m³', de: 'Bis 60 m³', pl: 'Do 60 m³' }, source: DRAGON.it },
      { key: 'noise', value: { it: 'Silenzioso', fr: 'Silencieux', es: 'Silencioso', de: 'Leise', pl: 'Cichy' }, source: DRAGON.it },
      {
        key: 'extra',
        value: { it: 'Termostato di sicurezza e antigelo', fr: 'Thermostat de sécurité et hors-gel', es: 'Termostato de seguridad y antiheladas', de: 'Sicherheitsthermostat und Frostschutz', pl: 'Termostat bezpieczeństwa i ochrona przed mrozem' },
        source: DRAGON.spec,
      },
    ],
    search: {
      it: 'De Longhi Dragon 4 TRD40820',
      fr: 'De Longhi Dragon 4 TRD40820',
      es: 'De Longhi Dragon 4 TRD40820',
      de: 'De Longhi Dragon 4 TRD40820',
      pl: 'De Longhi Dragon 4 TRD40820',
    },
    asin: { it: 'B00FU3ISRO', es: 'B00FU3ISRO', de: 'B00FU3ISRO' },
    price: {
      it: { value: 129.9, source: DRAGON.it, soldOut: true },
      fr: { value: 130.5, source: DRAGON.fr, soldOut: true },
      es: { value: 184, source: DRAGON.es, soldOut: true },
      de: { value: 164.9, source: DRAGON.de, soldOut: true },
      pl: { value: 649, source: DRAGON.pl, soldOut: true },
    },
  },
  {
    id: 'rowenta-intense-aqua',
    category: 'heat',
    tier: 'low',
    brand: 'Rowenta',
    name: {
      it: 'Rowenta Intense Comfort Aqua SO6550',
      fr: 'Rowenta Intense Comfort Aqua SO6550',
      es: 'Rowenta Intense Comfort Aqua SO6550',
      de: 'Rowenta Intense Comfort Aqua SO6550',
      pl: 'Rowenta Intense Comfort Aqua SO6550',
    },
    why: {
      it: 'Scalda subito, è certificato per il bagno e costa meno del radiatore; in modalità silenziosa si sente appena.',
      fr: 'Il chauffe tout de suite, il est certifié pour la salle de bains et coûte moins que le bain d’huile ; en mode silencieux, on l’entend à peine.',
      es: 'Calienta al momento, está certificado para el baño y cuesta menos que el radiador; en modo silencioso apenas se oye.',
      de: 'Heizt sofort, ist fürs Bad zertifiziert und kostet weniger als der Ölradiator; im Leise-Modus hört man ihn kaum.',
      pl: 'Grzeje od razu, ma certyfikat do łazienki i kosztuje mniej niż grzejnik olejowy; w trybie cichym prawie go nie słychać.',
    },
    facts: [
      { key: 'heattype', value: { it: 'Termoventilatore', fr: 'Radiateur soufflant', es: 'Calefactor de aire', de: 'Heizlüfter', pl: 'Termowentylator' }, source: ROWENTA.it },
      { key: 'heatpower', value: { it: '2400 W (ECO 1000 W)', fr: '2 400 W (ECO 1 000 W)', es: '2400 W (ECO 1000 W)', de: '2400 W (ECO 1000 W)', pl: '2400 W (ECO 1000 W)' }, source: ROWENTA.it },
      { key: 'room', value: { it: 'Fino a 40 m²', fr: 'Jusqu’à 40 m²', es: 'Hasta 40 m²', de: 'Bis 40 m²', pl: 'Do 40 m²' }, source: ROWENTA.it },
      { key: 'noise', value: '29 dB(A)', source: ROWENTA.it },
      {
        key: 'extra',
        value: {
          it: 'IP21, adatto al bagno; si spegne se cade',
          fr: 'IP21, adapté à la salle de bains ; s’éteint s’il tombe',
          es: 'IP21, apto para el baño; se apaga si se cae',
          de: 'IP21, fürs Bad geeignet; schaltet beim Umkippen ab',
          pl: 'IP21, do łazienki; wyłącza się po przewróceniu',
        },
        source: ROWENTA.it,
      },
    ],
    search: {
      it: 'Rowenta Intense Comfort Aqua SO6550',
      fr: 'Rowenta Intense Comfort Aqua SO6550',
      es: 'Rowenta Intense Comfort Aqua SO6550',
      de: 'Rowenta Intense Comfort Aqua SO6550',
      pl: 'Rowenta Intense Comfort Aqua SO6550',
    },
    asin: { fr: 'B0FGY23W4M', es: 'B0FGY23W4M' },
    price: {
      it: { value: 61.74, source: ROWENTA.it },
      fr: { value: 74.99, source: ROWENTA.fr },
      es: { value: 74.99, source: ROWENTA.es },
      de: { value: 74.99, source: ROWENTA.de },
    },
  },
  {
    // The same PortaSplit as in air conditioners, seen as a heater: it is a heat pump.
    id: 'portasplit-heat',
    category: 'heat',
    tier: 'high',
    brand: 'Midea',
    name: { it: 'Midea PortaSplit', fr: 'Midea PortaSplit', es: 'Midea PortaSplit', de: 'Midea PortaSplit', pl: 'Midea PortaSplit' },
    why: {
      it: 'È una pompa di calore: in media dà circa 4 kWh di calore per ogni kWh di corrente, dove una stufa ne dà 1. Costa molto di più all’acquisto, ma d’inverno scalda spendendo meno e d’estate rinfresca.',
      fr: 'C’est une pompe à chaleur : en moyenne environ 4 kWh de chaleur pour chaque kWh d’électricité, là où un radiateur en donne 1. Elle coûte bien plus cher à l’achat, mais chauffe l’hiver en dépensant moins et rafraîchit l’été.',
      es: 'Es una bomba de calor: de media da unos 4 kWh de calor por cada kWh de electricidad, donde una estufa da 1. Cuesta mucho más al comprarla, pero en invierno calienta gastando menos y en verano refresca.',
      de: 'Eine Wärmepumpe: Im Schnitt liefert sie rund 4 kWh Wärme pro kWh Strom, eine Elektroheizung nur 1. In der Anschaffung viel teurer, aber sie heizt im Winter günstiger und kühlt im Sommer.',
      pl: 'To pompa ciepła: średnio daje ok. 4 kWh ciepła z każdej kWh prądu, a grzejnik elektryczny 1. Jest dużo droższa w zakupie, ale zimą grzeje taniej, a latem chłodzi.',
    },
    facts: [
      {
        key: 'heattype',
        value: { it: 'Pompa di calore (split)', fr: 'Pompe à chaleur (split)', es: 'Bomba de calor (split)', de: 'Wärmepumpe (Split)', pl: 'Pompa ciepła (split)' },
        source: MIDEA_UK,
      },
      { key: 'heatpower', value: { it: '3,5 kW', fr: '3,5 kW', es: '3,5 kW', de: '3,5 kW', pl: '3,5 kW' }, source: MIDEA_UK },
      { key: 'room', value: { it: 'Fino a 42 m²', fr: 'Jusqu’à 42 m²', es: 'Hasta 42 m²', de: 'Bis 42 m²', pl: 'Do 42 m²' }, source: MIDEA_UK },
      {
        key: 'noise',
        value: { it: '39 dB(A) (silenzioso)', fr: '39 dB(A) (mode silence)', es: '39 dB(A) (silencioso)', de: '39 dB(A) (Leise-Modus)', pl: '39 dB(A) (tryb cichy)' },
        source: MIDEA_UK,
      },
      {
        key: 'extra',
        value: {
          it: 'SCOP 4,0: circa 4 kWh di calore per 1 kWh di corrente',
          fr: 'SCOP 4,0 : environ 4 kWh de chaleur pour 1 kWh d’électricité',
          es: 'SCOP 4,0: unos 4 kWh de calor por 1 kWh de electricidad',
          de: 'SCOP 4,0: rund 4 kWh Wärme pro kWh Strom',
          pl: 'SCOP 4,0: ok. 4 kWh ciepła z 1 kWh prądu',
        },
        source: MIDEA_UK,
      },
    ],
    search: { it: 'Midea PortaSplit', fr: 'Midea PortaSplit', es: 'Midea PortaSplit', de: 'Midea PortaSplit', pl: 'Midea PortaSplit' },
    asin: { it: 'B0D3PP64JS', de: 'B0D3PP64JS', fr: 'B0CY2YW8BT', es: 'B0CY2YW8BT' },
  },

  // ---------- Dehumidifiers ----------
  {
    id: 'delonghi-ariadry-multi-16',
    category: 'dehum',
    tier: 'mid',
    brand: 'De’Longhi',
    name: {
      it: 'De’Longhi Tasciugo AriaDry Multi DEXD216RF',
      fr: 'De’Longhi Tasciugo AriaDry Multi DEXD216RF',
      es: 'De’Longhi Tasciugo AriaDry Multi DEXD216RF',
      de: 'De’Longhi Tasciugo AriaDry Multi DEXD216RF',
    },
    why: {
      it: 'Toglie fino a 16 litri al giorno e filtra l’aria con un filtro antiallergico e uno ai carboni attivi: asciuga la casa e ne toglie gli odori.',
      fr: 'Il retire jusqu’à 16 litres par jour et filtre l’air avec un filtre anti-allergènes et un filtre à charbon actif : il assèche la maison et en retire les odeurs.',
      es: 'Quita hasta 16 litros al día y filtra el aire con un filtro antialérgico y otro de carbón activo: seca la casa y le quita los olores.',
      de: 'Entzieht bis zu 16 Liter am Tag und filtert die Luft mit einem Allergie- und einem Aktivkohlefilter: trocknet die Wohnung und nimmt Gerüche weg.',
    },
    lab: {
      text: {
        it: 'nel gruppo con almeno l’80% dei punti nei test di Which? («toglie l’umidità al top», Stiftung Warentest, febbraio 2026)',
        fr: 'dans le groupe ayant obtenu au moins 80 % des points aux tests de Which? (« déshumidifie au top », Stiftung Warentest, février 2026)',
        es: 'en el grupo con al menos el 80 % de los puntos en las pruebas de Which? («deshumidifica de maravilla», Stiftung Warentest, febrero de 2026)',
        de: 'unter den Geräten mit mindestens 80 % der Punkte im Which-Test („Entfeuchtet top“, Stiftung Warentest, Februar 2026)',
      },
      source: SW_DEHUM,
    },
    facts: [
      { key: 'extraction', value: { it: '16 l al giorno', fr: '16 l par jour', es: '16 l al día', de: '16 l pro Tag' }, source: DL.it },
      { key: 'noise', value: '40 dB(A)', source: DL.it },
      {
        key: 'extra',
        value: { it: 'Filtro antiallergico e ai carboni', fr: 'Filtres anti-allergènes et charbon', es: 'Filtro antialérgico y de carbón', de: 'Allergie- und Aktivkohlefilter' },
        source: DL.it,
      },
    ],
    search: {
      it: 'De Longhi DEXD216RF',
      fr: 'De Longhi DEXD216RF',
      es: 'De Longhi DEXD216RF',
      de: 'De Longhi DEXD216RF',
    },
    asin: { it: 'B0CJFZMZS5', fr: 'B0CJFZMZS5', es: 'B0CJFZMZS5', de: 'B0CJFZMZS5' },
    price: {
      it: { value: 279.9, source: DL.it },
      fr: { value: 349.99, source: DL.fr },
      es: { value: 299, source: DL.es },
      de: { value: 259, source: DL.de },
    },
  },
  {
    id: 'duux-bora-smart',
    category: 'dehum',
    tier: 'high',
    brand: 'Duux',
    name: { it: 'Duux Bora Smart 20L', fr: 'Duux Bora Smart 20L', es: 'Duux Bora Smart 20L', de: 'Duux Bora Smart 20L' },
    why: {
      it: 'Toglie fino a 20 litri al giorno con un serbatoio da 4 litri, e lo regoli dal telefono: per cantine, tavernette e case molto umide.',
      fr: 'Il retire jusqu’à 20 litres par jour avec un réservoir de 4 litres, et se règle depuis le téléphone : pour les caves et les logements très humides.',
      es: 'Quita hasta 20 litros al día con un depósito de 4 litros, y lo controlas desde el móvil: para sótanos y casas muy húmedas.',
      de: 'Entzieht bis zu 20 Liter am Tag, hat einen 4-Liter-Tank und lässt sich per Handy steuern: für Keller und sehr feuchte Wohnungen.',
    },
    lab: {
      text: {
        it: 'nel gruppo con almeno l’80% dei punti nei test di Which? («efficace ed efficiente», Stiftung Warentest, febbraio 2026)',
        fr: 'dans le groupe ayant obtenu au moins 80 % des points aux tests de Which? (« efficace et économe », Stiftung Warentest, février 2026)',
        es: 'en el grupo con al menos el 80 % de los puntos en las pruebas de Which? («eficaz y eficiente», Stiftung Warentest, febrero de 2026)',
        de: 'unter den Geräten mit mindestens 80 % der Punkte im Which-Test („Effektiv und energieeffizient“, Stiftung Warentest, Februar 2026)',
      },
      source: SW_DEHUM,
    },
    facts: [
      { key: 'extraction', value: { it: '20 l al giorno', fr: '20 l par jour', es: '20 l al día', de: '20 l pro Tag' }, source: BORA_SMART.it },
      { key: 'tank', value: { it: '4 l', fr: '4 l', es: '4 l', de: '4 l' }, source: BORA_SMART.it },
      { key: 'extra', value: { it: 'App e igrostato', fr: 'Appli et hygrostat', es: 'App e higrostato', de: 'App und Hygrostat' }, source: BORA_SMART.it },
    ],
    search: { it: 'Duux Bora Smart 20L', fr: 'Duux Bora Smart 20L', es: 'Duux Bora Smart 20L', de: 'Duux Bora Smart 20L' },
    asin: { it: 'B0DKB6M6YC', fr: 'B0DKB6M6YC', de: 'B0DKB6M6YC' },
    price: {
      it: { value: 349.99, source: BORA_SMART.it },
      es: { value: 349.99, source: BORA_SMART.es },
      de: { value: 349.99, source: BORA_SMART.de },
    },
  },
  {
    id: 'pro-breeze-omnidry-20',
    category: 'dehum',
    tier: 'low',
    brand: 'Pro Breeze',
    name: { it: 'Pro Breeze OmniDry 20L', fr: 'Pro Breeze OmniDry 20L', es: 'Pro Breeze OmniDry 20L', de: 'Pro Breeze OmniDry 20L' },
    why: {
      it: 'Toglie fino a 20 litri al giorno con un serbatoio da 4 litri, fa poco rumore e costa meno dei grandi marchi; ha anche la modalità bucato.',
      fr: 'Il retire jusqu’à 20 litres par jour avec un réservoir de 4 litres, fait peu de bruit et coûte moins cher que les grandes marques ; il a aussi un mode linge.',
      es: 'Quita hasta 20 litros al día con un depósito de 4 litros, hace poco ruido y cuesta menos que las grandes marcas; también tiene modo ropa.',
      de: 'Entzieht bis zu 20 Liter am Tag, hat einen 4-Liter-Tank, ist leise und kostet weniger als die großen Marken; mit Wäschemodus.',
    },
    lab: {
      text: {
        it: 'tra i deumidificatori consigliati nei test di Which? («silenzioso, veloce ed efficiente», Stiftung Warentest, febbraio 2026)',
        fr: 'parmi les déshumidificateurs recommandés aux tests de Which? (« silencieux, rapide et efficace », Stiftung Warentest, février 2026)',
        es: 'entre los deshumidificadores recomendados en las pruebas de Which? («silencioso, rápido y eficiente», Stiftung Warentest, febrero de 2026)',
        de: 'unter den empfohlenen Geräten im Which-Test („leise, arbeitet schnell und effizient“, Stiftung Warentest, Februar 2026)',
      },
      source: SW_DEHUM,
    },
    facts: [
      { key: 'extraction', value: { it: '20 l al giorno', fr: '20 l par jour', es: '20 l al día', de: '20 l pro Tag' }, source: PB_OMNI('it-it') },
      { key: 'tank', value: { it: '4 l', fr: '4 l', es: '4 l', de: '4 l' }, source: PB_OMNI('it-it') },
      { key: 'noise', value: '36 dB(A)', source: PB_OMNI('it-it') },
      { key: 'extra', value: { it: 'App e modalità bucato', fr: 'Appli et mode linge', es: 'App y modo ropa', de: 'App und Wäschemodus' }, source: PB_OMNI('it-it') },
    ],
    search: { it: 'Pro Breeze OmniDry 20L', fr: 'Pro Breeze OmniDry 20L', es: 'Pro Breeze OmniDry 20L', de: 'Pro Breeze OmniDry 20L' },
    asin: { it: 'B0CZ114G68', de: 'B0CZ114G68' },
    price: {
      it: { value: 219.99, source: PB_OMNI('it-it') },
      fr: { value: 229.99, source: PB_OMNI('fr-fr') },
      es: { value: 239.99, source: PB_OMNI('es-es') },
    },
  },
  {
    id: 'orbegozo-dh-1655',
    category: 'dehum',
    tier: 'low',
    brand: 'Orbegozo',
    name: { es: 'Orbegozo DH 1655', en: 'Orbegozo DH 1655' },
    why: {
      es: 'Quita hasta 16 litros al día, con un depósito de 4 litros y un máximo de 38 dB: una marca española que la OCU destaca por calidad y precio.',
      en: 'It takes out up to 16 litres a day, with a 4-litre tank and 38 dB at most: a Spanish brand that OCU singles out for its value.',
    },
    lab: {
      text: {
        es: 'destacado por su calidad y su precio en la comparativa de 23 deshumidificadores de la OCU (noviembre de 2025)',
        en: 'singled out for its quality and price in OCU’s comparison of 23 dehumidifiers (November 2025)',
      },
      source: OCU_DEHUM,
    },
    facts: [
      { key: 'extraction', value: { es: '16 l al día', en: '16 l per day' }, source: ORBEGOZO_1655 },
      { key: 'tank', value: { es: '4 l', en: '4 l' }, source: ORBEGOZO_1655 },
      { key: 'noise', value: '38 dB', source: ORBEGOZO_1655 },
      { key: 'extra', value: { es: 'Filtro lavable y ruedas', en: 'Washable filter and wheels' }, source: ORBEGOZO_1655 },
    ],
    search: { es: 'Orbegozo DH 1655', en: 'Orbegozo DH 1655' },
    asin: { es: 'B0DPLKGMB1' },
  },
  {
    id: 'ecoair-dd1-mk6',
    category: 'dehum',
    tier: 'mid',
    brand: 'EcoAir',
    name: { de: 'EcoAir DD1 Classic MK6', en: 'EcoAir DD1 Classic MK6' },
    why: {
      de: 'Arbeitet mit Trockenmittel statt Kompressor und entfeuchtet deshalb auch bei 1 °C, wo Kompressorgeräte nachlassen. Dafür braucht er mehr Strom.',
      en: 'It works with a desiccant instead of a compressor, so it keeps drying even at 1 °C, where compressor units give up. In exchange it uses more electricity.',
    },
    lab: {
      text: {
        de: 'im Which-Test „arbeitet sowohl bei hohen als auch bei niedrigen Temperaturen top“ (Stiftung Warentest, Februar 2026)',
        en: 'in the Which? test, “works excellently at both high and low temperatures” (Stiftung Warentest, February 2026)',
      },
      source: SW_DEHUM,
    },
    facts: [
      { key: 'extraction', value: { de: '7,5 l pro Tag (bei 20 °C, 60 %)', en: '7.5 l per day (at 20 °C, 60%)' }, source: ECOAIR_DD1 },
      { key: 'tank', value: { de: '2 l', en: '2 l' }, source: ECOAIR_DD1 },
      { key: 'noise', value: '34 dB(A)', source: ECOAIR_DD1 },
      { key: 'extra', value: { de: 'Trockenmittel, arbeitet von 1 bis 40 °C', en: 'Desiccant, works from 1 to 40 °C' }, source: ECOAIR_DD1 },
    ],
    search: { de: 'EcoAir DD1 Classic MK6', en: 'EcoAir DD1 Classic MK6' },
    asin: { de: 'B00IEF6C0A' },
  },

  // ---------- Portable air conditioners ----------
  {
    id: 'bosch-cool-4000',
    category: 'ac',
    tier: 'mid',
    brand: 'Bosch',
    name: { it: 'Bosch Cool 4000', fr: 'Bosch Cool 4000', es: 'Bosch Cool 4000', de: 'Bosch Cool 4000', pl: 'Bosch Cool 4000' },
    why: {
      it: 'Distribuisce bene il freddo nella stanza e consuma relativamente poco: il monoblocco da comprare senza pensarci troppo.',
      fr: 'Il répartit bien le froid dans la pièce et consomme relativement peu : le monobloc à acheter sans trop réfléchir.',
      es: 'Reparte bien el frío por la habitación y gasta relativamente poco: el monobloque para comprar sin pensarlo mucho.',
      de: 'Verteilt die kühle Luft gut im Raum und braucht relativ wenig Strom: das Monoblock-Gerät, bei dem man nicht lange überlegen muss.',
      pl: 'Dobrze rozprowadza chłodne powietrze po pokoju i zużywa stosunkowo mało prądu: monoblok, który można kupić bez długiego zastanawiania się.',
    },
    lab: {
      text: {
        it: 'quasi alla pari con il migliore nel test Que Choisir 2026, con buon voto sui consumi (Stiftung Warentest, maggio 2026)',
        fr: 'presque à égalité avec le meilleur du test Que Choisir 2026, avec une bonne note en consommation (Stiftung Warentest, mai 2026)',
        es: 'casi a la par del mejor en la prueba de Que Choisir 2026, con buena nota en consumo (Stiftung Warentest, mayo de 2026)',
        de: 'im Que-Choisir-Test 2026 insgesamt fast so gut wie das beste Gerät, gute Note beim Stromverbrauch (Stiftung Warentest, Mai 2026)',
        pl: 'prawie tak dobry jak najlepszy w teście Que Choisir 2026, z dobrą oceną zużycia prądu (Stiftung Warentest, maj 2026)',
      },
      source: SW_AC,
    },
    facts: [
      { key: 'power', value: { it: '2,6 kW', fr: '2,6 kW', es: '2,6 kW', de: '2,6 kW', pl: '2,6 kW' }, source: BOSCH },
      { key: 'energy', value: 'A+', source: BOSCH },
      { key: 'noise', value: '64 dB', source: BOSCH },
      { key: 'kind', value: { it: 'Monoblocco con tubo', fr: 'Monobloc à gaine', es: 'Monobloque con tubo', de: 'Monoblock mit Schlauch', pl: 'Monoblok z rurą' }, source: BOSCH },
    ],
    search: { it: 'Bosch Cool 4000', fr: 'Bosch Cool 4000', es: 'Bosch Cool 4000', de: 'Bosch Cool 4000', pl: 'Bosch Cool 4000' },
    asin: { de: 'B0BXT5H4FC', es: 'B0BXT5H4FC' },
  },
  {
    id: 'ariston-mobis-plus-10',
    category: 'ac',
    tier: 'low',
    brand: 'Ariston',
    name: { it: 'Ariston Mobis Plus 10', fr: 'Ariston Mobis Plus 10', es: 'Ariston Mobis Plus 10', de: 'Ariston Mobis Plus 10', pl: 'Ariston Mobis Plus 10' },
    why: {
      it: 'Sulla carta più potente del Bosch (2,9 kW), con gas R290, e nel test distribuisce bene il freddo nella stanza.',
      fr: 'Sur le papier plus puissant que le Bosch (2,9 kW), au gaz R290, et il répartit bien le froid dans la pièce lors du test.',
      es: 'Sobre el papel más potente que el Bosch (2,9 kW), con gas R290, y en la prueba reparte bien el frío por la habitación.',
      de: 'Auf dem Papier stärker als das Bosch (2,9 kW), mit Kältemittel R290, und verteilte im Test die kühle Luft gut im Raum.',
      pl: 'Na papierze mocniejszy od Boscha (2,9 kW), z czynnikiem R290, a w teście dobrze rozprowadzał chłód po pokoju.',
    },
    lab: {
      text: {
        it: '5° tra i nuovi modelli nel test Que Choisir 2026, tra i più economici (Stiftung Warentest, maggio 2026)',
        fr: '5e parmi les nouveaux modèles du test Que Choisir 2026, parmi les moins chers (Stiftung Warentest, mai 2026)',
        es: '5.º entre los modelos nuevos de la prueba de Que Choisir 2026, de los más baratos (Stiftung Warentest, mayo de 2026)',
        de: 'Fünftbestes der neuen Geräte im Que-Choisir-Test 2026, vergleichsweise günstig (Stiftung Warentest, Mai 2026)',
        pl: '5. miejsce wśród nowych modeli w teście Que Choisir 2026, jeden z tańszych (Stiftung Warentest, maj 2026)',
      },
      source: SW_AC,
    },
    facts: [
      { key: 'power', value: { it: '2,9 kW', fr: '2,9 kW', es: '2,9 kW', de: '2,9 kW', pl: '2,9 kW' }, source: ARISTON },
      { key: 'energy', value: { it: 'A+ (EER 3,1)', fr: 'A+ (EER 3,1)', es: 'A+ (EER 3,1)', de: 'A+ (EER 3,1)', pl: 'A+ (EER 3,1)' }, source: ARISTON },
      { key: 'noise', value: '62 dB', source: ARISTON },
      { key: 'kind', value: { it: 'Monoblocco con tubo', fr: 'Monobloc à gaine', es: 'Monobloque con tubo', de: 'Monoblock mit Schlauch', pl: 'Monoblok z rurą' }, source: ARISTON },
    ],
    search: { it: 'Ariston Mobis Plus 10', fr: 'Ariston Mobis Plus 10', es: 'Ariston Mobis Plus 10', de: 'Ariston Mobis Plus 10', pl: 'Ariston Mobis Plus 10' },
    asin: { it: 'B094KYVY41', fr: 'B094KYVY41', es: 'B094KYVY41' },
  },
  {
    id: 'midea-portasplit',
    category: 'ac',
    tier: 'high',
    brand: 'Midea',
    name: { it: 'Midea PortaSplit', fr: 'Midea PortaSplit', es: 'Midea PortaSplit', de: 'Midea PortaSplit', pl: 'Midea PortaSplit' },
    why: {
      it: 'Il compressore sta fuori, in una piccola unità collegata da un tubo sottile: dentro resta silenzioso (39 dB) e consuma come un climatizzatore fisso.',
      fr: 'Le compresseur est dehors, dans une petite unité reliée par un tuyau fin : à l’intérieur il reste silencieux (39 dB) et consomme comme un climatiseur fixe.',
      es: 'El compresor queda fuera, en una pequeña unidad unida por un tubo fino: dentro es silencioso (39 dB) y gasta como un split fijo.',
      de: 'Der Kompressor steht draußen, in einem kleinen Gerät mit dünner Leitung: Drinnen bleibt es leise (39 dB) und braucht so wenig Strom wie ein festes Split-Gerät.',
      pl: 'Sprężarka stoi na zewnątrz, w małej jednostce połączonej cienkim przewodem: w środku jest cicho (39 dB), a zużycie prądu jak w klimatyzacji stałej.',
    },
    lab: {
      text: {
        it: 'efficienza al livello di alcuni climatizzatori fissi nel test di Stiftung Warentest (maggio 2026)',
        fr: 'efficacité au niveau de certains climatiseurs fixes dans le test de Stiftung Warentest (mai 2026)',
        es: 'eficiencia al nivel de algunos splits fijos en la prueba de Stiftung Warentest (mayo de 2026)',
        de: 'Effizienz auf dem Niveau mancher fester Splitgeräte im Test der Stiftung Warentest (Mai 2026)',
        pl: 'wydajność na poziomie niektórych klimatyzatorów stałych w teście Stiftung Warentest (maj 2026)',
      },
      source: SW_AC,
    },
    facts: [
      { key: 'power', value: { it: '3,5 kW', fr: '3,5 kW', es: '3,5 kW', de: '3,5 kW', pl: '3,5 kW' }, source: MIDEA_UK },
      { key: 'energy', value: 'A++', source: MIDEA_ES },
      {
        key: 'noise',
        value: { it: '39 dB (silenzioso)', fr: '39 dB (mode silence)', es: '39 dB (silencioso)', de: '39 dB (Leise-Modus)', pl: '39 dB (tryb cichy)' },
        source: MIDEA_ES,
      },
      {
        key: 'kind',
        value: { it: 'Split con unità esterna', fr: 'Split avec unité extérieure', es: 'Split con unidad exterior', de: 'Split mit Außengerät', pl: 'Split z jednostką zewnętrzną' },
        source: MIDEA_ES,
      },
    ],
    search: { it: 'Midea PortaSplit', fr: 'Midea PortaSplit', es: 'Midea PortaSplit', de: 'Midea PortaSplit', pl: 'Midea PortaSplit' },
    asin: { it: 'B0D3PP64JS', de: 'B0D3PP64JS', fr: 'B0CY2YW8BT', es: 'B0CY2YW8BT' },
  },
];

// Written in Italian, French, Spanish, German and Polish; English comes from the Italian (i18n-en.ts),
// and so do the other languages of the types and products a country does not sell (i18n-more.ts).
export const catalog = addLanguages(
  addLanguages(addLanguages({ checked: CHECKED, categoryIds, categories, products, factLabels, factHelp }, { en }, ['en'], 'it'), fromIt, [], 'it'),
  fromEn,
  [],
  'en',
) satisfies Catalog;
