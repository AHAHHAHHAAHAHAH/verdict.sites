// ClimaVerdict texts that only some countries' languages had: a type or a product not sold in
// Poland, Italy or France still needs their languages, because every language can be read in every
// country (src/i18n/editions.ts). `fromIt` is keyed by the Italian text, `fromEn` by the English
// one, for the products written first in English (see lib/translate.ts).
type Dict = Record<string, string>;

// The dehumidifiers, not sold in Poland.
const dehumPl: Dict = {
  deumidificatore: 'osuszacz powietrza',
  Deumidificatore: 'Osuszacz powietrza',
  'Quale deumidificatore comprare?': 'Jaki osuszacz powietrza kupić?',
  'Un deumidificatore toglie l’umidità che fa nascere la muffa e asciuga il bucato in casa.': 'Osuszacz powietrza usuwa wilgoć, przez którą rozwija się pleśń, i suszy pranie w domu.',
  'Deumidificatore portatile: quale comprare nel {year}': 'Osuszacz powietrza: jaki kupić w {year}',
  'Quale deumidificatore comprare? Dicci dove ti serve e vedi subito il modello adatto, con prezzo, litri al giorno, rumore e fonti verificate.':
    'Jaki osuszacz powietrza kupić? Powiedz, gdzie go potrzebujesz, i od razu zobacz odpowiedni model, z ceną, litrami na dobę, głośnością i sprawdzonymi źródłami.',
  'Il deumidificatore giusto per la tua situazione': 'Osuszacz odpowiedni do twojej sytuacji',
  'Anche questi deumidificatori vanno bene': 'Te osuszacze też się sprawdzą',
  'Un deumidificatore fa per te se': 'Osuszacz jest dla ciebie, jeśli',
  'Il deumidificatore non fa per te se': 'Osuszacz nie jest dla ciebie, jeśli',
  'Come scegliere un deumidificatore': 'Jak wybrać osuszacz powietrza',
  'Domande frequenti sul deumidificatore': 'Najczęstsze pytania o osuszacz powietrza',
  'Vedi condensa sui vetri o macchie di muffa negli angoli.': 'Widzisz skropliny na szybach albo plamy pleśni w rogach.',
  'Stendi il bucato in casa.': 'Suszysz pranie w domu.',
  'L’umidità viene da un’infiltrazione o da un tubo rotto: prima va riparata quella.': 'Wilgoć pochodzi z przecieku albo pękniętej rury: najpierw trzeba to naprawić.',
  'La stanza è sotto i 15 °C: in un locale freddo i modelli a compressore rendono meno.': 'W pomieszczeniu jest poniżej 15 °C: w zimnym miejscu modele sprężarkowe działają słabiej.',
  'Quanti litri al giorno': 'Ile litrów na dobę',
  'Per una stanza normale bastano 12-16 litri; per cantine, tavernette o case molto umide servono 20 litri o più.':
    'Do zwykłego pokoju wystarczy 12-16 litrów; do piwnic, suteren albo bardzo wilgotnych domów potrzeba 20 litrów lub więcej.',
  'L’igrostato': 'Higrostat',
  'Si ferma da solo quando l’umidità è giusta: consuma meno e non secca troppo l’aria.': 'Sam się wyłącza, gdy wilgotność jest odpowiednia: zużywa mniej prądu i nie przesusza powietrza.',
  'Il serbatoio': 'Zbiornik',
  'Più è grande, meno spesso lo svuoti; con un tubo di scarico puoi non svuotarlo mai.': 'Im większy, tym rzadziej go opróżniasz; z wężem odpływowym możesz nie opróżniać go wcale.',
  'Per quasi tutte le case': 'Do prawie każdego domu',
  'Spendere meno': 'Wydać mniej',
  'Cantina o casa molto umida': 'Piwnica lub bardzo wilgotny dom',
  'Quale umidità devo tenere in casa?': 'Jaką wilgotność utrzymywać w domu?',
  'In genere tra il 40 e il 60%. Sopra il 60% per molte ore la muffa trova le condizioni giuste; per questo conviene un deumidificatore con igrostato, che si ferma da solo quando ci arriva.':
    'Zwykle od 40 do 60%. Powyżej 60% przez wiele godzin pleśń ma dobre warunki; dlatego warto wybrać osuszacz z higrostatem, który sam się wyłącza, gdy osiągnie ten poziom.',
  'Quanto consuma un deumidificatore?': 'Ile prądu zużywa osuszacz?',
  'Dipende dalla potenza e da quante ore lavora: il nostro primo consiglio assorbe 285 W. Con l’igrostato si spegne quando l’aria è asciutta, quindi non resta acceso tutto il giorno.':
    'To zależy od mocy i od tego, ile godzin pracuje: nasz pierwszy wybór pobiera 285 W. Z higrostatem wyłącza się, gdy powietrze jest suche, więc nie pracuje cały dzień.',
  'Serve per asciugare il bucato?': 'Czy nadaje się do suszenia prania?',
  'Sì: messo nella stanza del bucato toglie l’umidità che i panni rilasciano, così asciugano prima e non lasciano l’umidità sui muri.':
    'Tak: ustawiony w pomieszczeniu z praniem usuwa wilgoć, którą oddają ubrania, więc schną szybciej, a wilgoć nie osiada na ścianach.',
  'Funziona anche in una cantina fredda?': 'Czy działa też w zimnej piwnicy?',
  'Un deumidificatore a compressore lavora bene sopra i 10 °C circa; in una stanza più fredda rende molto meno. Lì serve un modello ad adsorbimento, con un materiale essiccante al posto del compressore, che però consuma di più.':
    'Osuszacz sprężarkowy dobrze pracuje powyżej około 10 °C; w chłodniejszym pomieszczeniu działa dużo słabiej. Tam potrzebny jest model adsorpcyjny, z materiałem osuszającym zamiast sprężarki, który jednak zużywa więcej prądu.',
  'Toglie fino a 16 litri al giorno e filtra l’aria con un filtro antiallergico e uno ai carboni attivi: asciuga la casa e ne toglie gli odori.':
    'Usuwa do 16 litrów wody na dobę i filtruje powietrze filtrem antyalergicznym oraz filtrem z węglem aktywnym: osusza dom i usuwa z niego zapachy.',
  'nel gruppo con almeno l’80% dei punti nei test di Which? («toglie l’umidità al top», Stiftung Warentest, febbraio 2026)':
    'w grupie z co najmniej 80% punktów w testach Which? („najlepiej usuwa wilgoć”, Stiftung Warentest, luty 2026)',
  '16 l al giorno': '16 l na dobę',
  'Filtro antiallergico e ai carboni': 'Filtr antyalergiczny i węglowy',
  'Toglie fino a 20 litri al giorno con un serbatoio da 4 litri, e lo regoli dal telefono: per cantine, tavernette e case molto umide.':
    'Usuwa do 20 litrów wody na dobę, ma zbiornik 4 l i sterujesz nim z telefonu: do piwnic, suteren i bardzo wilgotnych domów.',
  'nel gruppo con almeno l’80% dei punti nei test di Which? («efficace ed efficiente», Stiftung Warentest, febbraio 2026)':
    'w grupie z co najmniej 80% punktów w testach Which? („skuteczny i wydajny”, Stiftung Warentest, luty 2026)',
  '20 l al giorno': '20 l na dobę',
  'App e igrostato': 'Aplikacja i higrostat',
  'Toglie fino a 20 litri al giorno con un serbatoio da 4 litri, fa poco rumore e costa meno dei grandi marchi; ha anche la modalità bucato.':
    'Usuwa do 20 litrów wody na dobę, ma zbiornik 4 l, pracuje cicho i kosztuje mniej niż duże marki; ma też tryb suszenia prania.',
  'tra i deumidificatori consigliati nei test di Which? («silenzioso, veloce ed efficiente», Stiftung Warentest, febbraio 2026)':
    'wśród osuszaczy polecanych w testach Which? („cichy, szybki i wydajny”, Stiftung Warentest, luty 2026)',
  'App e modalità bucato': 'Aplikacja i tryb suszenia prania',
};

export const fromIt = { pl: dehumPl };

// Two dehumidifiers sold only in Spain and in Germany, and their situation and tag.
const ocuTag = 'Good value, according to OCU';
const garage = 'Garage or unheated room';
const orbegozoWhy = 'It takes out up to 16 litres a day, with a 4-litre tank and 38 dB at most: a Spanish brand that OCU singles out for its value.';
const orbegozoLab = 'singled out for its quality and price in OCU’s comparison of 23 dehumidifiers (November 2025)';
const perDay16 = '16 l per day';
const washable = 'Washable filter and wheels';
const ecoAirWhy = 'It works with a desiccant instead of a compressor, so it keeps drying even at 1 °C, where compressor units give up. In exchange it uses more electricity.';
const ecoAirLab = 'in the Which? test, “works excellently at both high and low temperatures” (Stiftung Warentest, February 2026)';
const perDay75 = '7.5 l per day (at 20 °C, 60%)';
const desiccant = 'Desiccant, works from 1 to 40 °C';

export const fromEn: Record<string, Dict> = {
  it: {
    [ocuTag]: 'Buon rapporto qualità-prezzo secondo l’OCU',
    [garage]: 'Garage o stanza non riscaldata',
    [orbegozoWhy]: 'Toglie fino a 16 litri al giorno, con un serbatoio da 4 litri e al massimo 38 dB: un marchio spagnolo che l’OCU segnala per il rapporto qualità-prezzo.',
    [orbegozoLab]: 'segnalato per qualità e prezzo nel confronto dell’OCU su 23 deumidificatori (novembre 2025)',
    [perDay16]: '16 l al giorno',
    [washable]: 'Filtro lavabile e ruote',
    [ecoAirWhy]: 'Funziona con un materiale essiccante invece del compressore, quindi continua ad asciugare anche a 1 °C, dove i modelli a compressore si fermano. In cambio consuma più elettricità.',
    [ecoAirLab]: 'nel test di Which?, «funziona in modo eccellente sia ad alte sia a basse temperature» (Stiftung Warentest, febbraio 2026)',
    [perDay75]: '7,5 l al giorno (a 20 °C, 60%)',
    [desiccant]: 'Ad adsorbimento, funziona da 1 a 40 °C',
  },
  fr: {
    [ocuTag]: 'Bon rapport qualité-prix selon l’OCU',
    [garage]: 'Garage ou pièce non chauffée',
    [orbegozoWhy]: 'Il retire jusqu’à 16 litres par jour, avec un réservoir de 4 litres et 38 dB au maximum : une marque espagnole que l’OCU distingue pour son rapport qualité-prix.',
    [orbegozoLab]: 'distingué pour sa qualité et son prix dans le comparatif de 23 déshumidificateurs de l’OCU (novembre 2025)',
    [perDay16]: '16 l par jour',
    [washable]: 'Filtre lavable et roulettes',
    [ecoAirWhy]: 'Il fonctionne avec un dessiccant au lieu d’un compresseur, il continue donc d’assécher même à 1 °C, là où les modèles à compresseur abandonnent. En contrepartie, il consomme plus d’électricité.',
    [ecoAirLab]: 'dans le test de Which?, « fonctionne excellemment à haute comme à basse température » (Stiftung Warentest, février 2026)',
    [perDay75]: '7,5 l par jour (à 20 °C, 60 %)',
    [desiccant]: 'À dessiccant, fonctionne de 1 à 40 °C',
  },
  de: {
    [ocuTag]: 'Gutes Preis-Leistungs-Verhältnis laut OCU',
    [orbegozoWhy]: 'Er entzieht bis zu 16 Liter pro Tag, mit 4-Liter-Tank und höchstens 38 dB: eine spanische Marke, die die OCU für ihr Preis-Leistungs-Verhältnis hervorhebt.',
    [orbegozoLab]: 'im Vergleich von 23 Luftentfeuchtern der OCU für Qualität und Preis hervorgehoben (November 2025)',
    [perDay16]: '16 l pro Tag',
    [washable]: 'Waschbarer Filter und Rollen',
  },
  es: {
    [garage]: 'Garaje o habitación sin calefacción',
    [ecoAirWhy]: 'Funciona con un desecante en lugar de un compresor, así que sigue secando incluso a 1 °C, donde los modelos de compresor se rinden. A cambio, consume más electricidad.',
    [ecoAirLab]: 'en la prueba de Which?, «funciona de forma excelente tanto a altas como a bajas temperaturas» (Stiftung Warentest, febrero de 2026)',
    [perDay75]: '7,5 l al día (a 20 °C, 60 %)',
    [desiccant]: 'De desecante, funciona de 1 a 40 °C',
  },
  pl: {
    [ocuTag]: 'Dobra relacja jakości do ceny według OCU',
    [garage]: 'Garaż lub nieogrzewane pomieszczenie',
    [orbegozoWhy]: 'Usuwa do 16 litrów wody na dobę, ma zbiornik 4 l i najwyżej 38 dB: hiszpańska marka, którą OCU wyróżnia za relację jakości do ceny.',
    [orbegozoLab]: 'wyróżniony za jakość i cenę w porównaniu 23 osuszaczy przeprowadzonym przez OCU (listopad 2025)',
    [perDay16]: '16 l na dobę',
    [washable]: 'Zmywalny filtr i kółka',
    [ecoAirWhy]: 'Działa z materiałem osuszającym zamiast sprężarki, więc osusza nawet przy 1 °C, gdy modele sprężarkowe przestają działać. W zamian zużywa więcej prądu.',
    [ecoAirLab]: 'w teście Which? „działa znakomicie zarówno w wysokich, jak i niskich temperaturach” (Stiftung Warentest, luty 2026)',
    [perDay75]: '7,5 l na dobę (przy 20 °C, 60%)',
    [desiccant]: 'Adsorpcyjny, działa od 1 do 40 °C',
  },
};
