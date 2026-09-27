// FloorVerdict catalogue: three types, three models each at most, the same models in every market
// where they are sold. Rules: every fact carries the URL it was read from; prices are the brand
// store's own price on the check date; a market without a brand store gets no price, never a guess.
// Picks: the main pick is backed by an independent test that buys its products (cited); the
// shortcuts answer the two most common "but my case is different" (spend less, pets, ...).
import type { Catalog, Category, Locale, Market, Product, T } from '../../lib/pack';
import { addLanguages } from '../../lib/translate';
import { en } from './i18n-en';
import { more } from './i18n-more';

const CHECKED = '2026-09-26';

const categoryIds = ['robot', 'stick', 'wet', 'steam'] as const;
// Countries where no brand store sells the type are left out.
const WET: Market[] = ['it', 'fr', 'es', 'pl'];
// Kärcher's steam mops are no longer sold on its Spanish store.
const STEAM: Market[] = ['it', 'fr', 'pl', 'se'];

const LANGS: Locale[] = ['it', 'fr', 'es', 'pl', 'sv', 'en'];
/** A number with its unit, written the way each language writes it (20.000 Pa, 20 000 Pa...). */
const num = (n: number, unit: string): T => Object.fromEntries(LANGS.map((l) => [l, `${new Intl.NumberFormat(l).format(n)} ${unit}`]));

// Sources: brand pages (facts, prices) and independent tests (lab results).
const HOOKUP = 'https://www.thesmarthomehookup.com/2026-ultimate-robot-vacuum-and-mop-comparison/';
const VW_STICK = 'https://vacuumwars.com/best-cordless-vacuums/';
// Steam mops: Test-Achats' test of 16 steam mops, reported by Stiftung Warentest (February 2025).
const SW_STEAM = 'https://www.test.de/Dampfreiniger-im-Test-Kaercher-dampft-am-besten-1523412-0/';
const KSC2 = {
  fr: 'https://www.kaercher.com/fr/home-garden/nettoyeurs-vapeur/sc-2-upright-easyfix-15135000.html',
  pl: 'https://www.karcher.com/pl/home-garden/parownice/sc-2-upright-15135000.html',
  se: 'https://www.karcher.com/se/home-garden/angtvattar/sc-2-upright-15135000.html',
};
const KSC1 = {
  it: 'https://www.kaercher.com/it/home-garden/pulitori-a-vapore/sc-1-upright-15135600.html',
  se: 'https://www.karcher.com/se/home-garden/angtvattar/sc-1-upright-15135600.html',
};
const VW_WET = 'https://vacuumwars.com/best-hard-floor-cleaners-vacuum-mop-combos/';
// Vacuum Wars' ranking of 20 robot vacuums (it buys every unit at retail).
const VW_ROBOT = 'https://vacuumwars.com/vacuum-wars-best-robot-vacuums/';
const T80S = {
  it: 'https://www.ecovacs.com/it/shop/deebot-robotic-vacuum-cleaner/deebot-t80s-omni',
  fr: 'https://www.ecovacs.com/fr/shop/deebot-robotic-vacuum-cleaner/deebot-t80s-omni',
};
// Shark's own store in each market (schema.org price in the page).
const SHARK_CE = {
  it: 'https://www.sharkninja.it/aspirapolvere-senza-filo-shark-powerdetect-con-autosvuotamento/IP3251EUT.html',
  fr: 'https://www.sharkninja.fr/aspirateur-sans-fil-shark-powerdetect-clean-empty-avec-autovidage-ip3251eut/IP3251EUT.html',
  es: 'https://www.sharkninja.es/aspiradora-sin-cable-shark-con-base-de-autovaciado-powerdetect/IP3251EUT.html',
  pl: 'https://www.sharkninja.pl/shark-powerdetect-clean-empty-odkurzacz-bezprzewodowy-ip3251eut/IP3251EUT.html',
  se: 'https://www.sharkninja.se/shark-powerdetect-clean-empty-sladdlos-husdjursdammsugare-ip3251eut/IP3251EUT.html',
};
const RR = (c: string, handle: string) => `https://${c}.roborock.com/products/${handle}`;
const CURV2 = {
  it: RR('it', 'roborock-qrevo-curv-2-flow-robot-aspirapolvere'),
  fr: RR('fr', 'roborock-qrevo-curv-2-flow'),
  es: RR('es', 'roborock-qrevo-curv-2-flow'),
  pl: RR('pl', 'roborock-qrevo-curv-2-flow'),
  se: RR('se', 'roborock-qrevo-curv-2-flow'),
};
const FLOW2_IT = 'https://it.narwal.com/products/narwal-flow-2-robot-aspirapolvere-e-lavapavimenti';
const FLOW2_FR = 'https://fr.narwal.com/products/narwal-flow-2-aspirateur-robot-laveur';
const FLOW2_SPECS = 'https://fr.narwal.com/pages/narwal-flow-2-aspirateur-robot-laveur';
const FLOW2_SPECS_IT = 'https://it.narwal.com/pages/flow-2-robot-aspirapolvere-e-lavapavimenti';
const V15 = {
  it: 'https://www.dyson.it/aspirapolvere/senza-filo/v15/absolute',
  fr: 'https://www.dyson.fr/aspirateurs/sans-fil/v15/detect-absolute-jaune-nickel',
  pl: 'https://www.dyson.pl/v15-detect-absolute-2026',
  se: 'https://www.dyson.se/dammsugare/sladdlosa/v15/absolute',
};
const S6 = {
  it: 'https://de-store.tineco.com/it-it/products/tineco-floor-one-stretch-s6-lavapavimenti-e-aspirapolvere-intelligente',
  fr: 'https://fr-store.tineco.com/products/tineco-floor-one-stretch-s6-aspirateur-eau-et-poussiere-laveur-de-sols',
  es: 'https://de-store.tineco.com/es-es/products/tineco-floor-one-stretch-s6-aspiradora-en-seco-y-humedo-inteligente',
  pl: 'https://pl-store.tineco.com/products/tineco-floor-one-stretch-s6-odkurzacze-myjace-wet-dry',
};
const F25U = {
  it: RR('it', 'roborock-f25-ultra'),
  fr: RR('fr', 'roborock-f25-ultra'),
  es: RR('es', 'roborock-f25-ultra'),
  pl: RR('pl', 'roborock-f25-ultra'),
};

const factLabels: Record<string, T> = {
  suction: { it: 'Aspirazione', fr: 'Aspiration', es: 'Succión', pl: 'Siła ssania', sv: 'Sugkraft' },
  mop: { it: 'Lavaggio', fr: 'Lavage', es: 'Fregado', pl: 'Mopowanie', sv: 'Moppning' },
  mopwash: { it: 'Lavaggio nella base', fr: 'Lavage à la station', es: 'Lavado en la base', pl: 'Mycie w stacji', sv: 'Tvätt i stationen' },
  drying: { it: 'Asciugatura', fr: 'Séchage', es: 'Secado', pl: 'Suszenie', sv: 'Torkning' },
  avoid: { it: 'Evita gli ostacoli con', fr: 'Évite les obstacles avec', es: 'Esquiva obstáculos con', pl: 'Omija przeszkody dzięki', sv: 'Undviker hinder med' },
  runtime: { it: 'Autonomia massima', fr: 'Autonomie maximale', es: 'Autonomía máxima', pl: 'Maks. czas pracy', sv: 'Max drifttid' },
  dust: { it: 'Vedere la polvere', fr: 'Voir la poussière', es: 'Ver el polvo', pl: 'Widoczny kurz', sv: 'Se dammet' },
  empty: { it: 'Svuotamento', fr: 'Vidage', es: 'Vaciado', pl: 'Opróżnianie', sv: 'Tömning' },
  flat: { it: 'Sotto i mobili', fr: 'Sous les meubles', es: 'Bajo los muebles', pl: 'Pod meblami', sv: 'Under möbler' },
  selfclean: { it: 'Si pulisce da sola', fr: 'Autonettoyage', es: 'Autolimpieza', pl: 'Samoczyszczenie', sv: 'Självrengöring' },
  hot: { it: 'Acqua calda e vapore', fr: 'Eau chaude et vapeur', es: 'Agua caliente y vapor', pl: 'Gorąca woda i para', sv: 'Hett vatten och ånga' },
  heatup: { it: 'Pronta in', fr: 'Prêt en', es: 'Lista en', pl: 'Gotowy po', sv: 'Klar på' },
  area: { it: 'Superficie per serbatoio', fr: 'Surface par réservoir', es: 'Superficie por depósito', pl: 'Powierzchnia na zbiornik', sv: 'Yta per tank' },
  power: { it: 'Potenza', fr: 'Puissance', es: 'Potencia', pl: 'Moc', sv: 'Effekt' },
  weight: { it: 'Peso', fr: 'Poids', es: 'Peso', pl: 'Waga', sv: 'Vikt' },
};

// The numbers in plain words, for visitors who are not experts (shown under the comparison).
const factHelp: Record<string, T> = {
  suction: {
    it: "Quanto forte aspira: in pascal (Pa) per i robot, in air watt (AW) per le scope. Conta soprattutto su tappeti e peli; tra due modelli simili, il numero più alto tira su più sporco.",
    fr: "La force d’aspiration : en pascals (Pa) pour les robots, en air watts (AW) pour les balais. Elle compte surtout sur les tapis et les poils ; entre deux modèles proches, le chiffre le plus haut ramasse plus.",
    es: "La fuerza de succión: en pascales (Pa) en los robots, en air watts (AW) en las escobas. Cuenta sobre todo en alfombras y pelos; entre dos modelos parecidos, el número más alto recoge más.",
    pl: "Siła ssania: w paskalach (Pa) w robotach, w air watach (AW) w odkurzaczach pionowych. Liczy się głównie na dywanach i przy sierści; przy dwóch podobnych modelach wyższa liczba zbiera więcej.",
    sv: "Hur kraftigt den suger: i pascal (Pa) för robotar, i air watt (AW) för skaftdammsugare. Det spelar mest roll på mattor och för päls; mellan två liknande modeller tar den högre siffran upp mer.",
  },
  mop: {
    it: "Come lava il pavimento: un rullo che gira e si risciacqua mentre pulisce, oppure panni rotanti che si lavano quando il robot torna alla base.",
    fr: "Comment il lave le sol : un rouleau qui tourne et se rince en nettoyant, ou des serpillières rotatives lavées quand le robot revient à la station.",
    es: "Cómo friega el suelo: un rodillo que gira y se aclara mientras limpia, o mopas giratorias que se lavan cuando el robot vuelve a la base.",
    pl: "Jak myje podłogę: wałek, który obraca się i płucze w trakcie sprzątania, albo obrotowe mopy myte po powrocie robota do stacji.",
    sv: "Hur den moppar: en vals som roterar och sköljs medan den städar, eller roterande moppar som tvättas när roboten åker tillbaka till stationen.",
  },
  mopwash: {
    it: "La temperatura dell’acqua con cui la base lava panni o rullo: più è calda, più scioglie grasso e sporco secco.",
    fr: "La température de l’eau avec laquelle la station lave les serpillières ou le rouleau : plus elle est chaude, mieux elle dissout le gras et les taches sèches.",
    es: "La temperatura del agua con la que la base lava las mopas o el rodillo: cuanto más caliente, mejor disuelve la grasa y la suciedad seca.",
    pl: "Temperatura wody, którą stacja myje mopy lub wałek: im cieplejsza, tym lepiej rozpuszcza tłuszcz i zaschnięty brud.",
    sv: "Temperaturen på vattnet som stationen tvättar moppar eller vals med: ju varmare, desto bättre löser det upp fett och intorkad smuts.",
  },
  drying: {
    it: "Dopo il lavaggio la base asciuga panni o rullo con aria calda, così non restano umidi e non prendono cattivo odore.",
    fr: "Après le lavage, la station sèche les serpillières ou le rouleau à l’air chaud : ils ne restent pas humides et ne sentent pas mauvais.",
    es: "Después de lavarlos, la base seca las mopas o el rodillo con aire caliente, así no quedan húmedos ni huelen mal.",
    pl: "Po myciu stacja suszy mopy lub wałek ciepłym powietrzem, więc nie zostają wilgotne i nie brzydko pachną.",
    sv: "Efter tvätten torkar stationen moppar eller vals med varmluft, så att de inte förblir fuktiga och luktar illa.",
  },
  avoid: {
    it: "Come il robot vede cavi, calzini e ciotole per girarci intorno: la fotocamera riconosce gli oggetti, la luce strutturata ne misura la forma.",
    fr: "Comment le robot voit les câbles, chaussettes et gamelles pour les contourner : la caméra reconnaît les objets, la lumière structurée mesure leur forme.",
    es: "Cómo ve el robot cables, calcetines y cuencos para rodearlos: la cámara reconoce los objetos y la luz estructurada mide su forma.",
    pl: "Jak robot widzi kable, skarpetki i miski, żeby je ominąć: kamera rozpoznaje przedmioty, a światło strukturalne mierzy ich kształt.",
    sv: "Hur roboten ser sladdar, strumpor och skålar för att åka runt dem: kameran känner igen föremål och det strukturerade ljuset mäter deras form.",
  },
  runtime: {
    it: "Quanti minuti lavora con una carica, al livello di potenza più basso: alla massima potenza dura meno.",
    fr: "Combien de minutes il fonctionne avec une charge, à la puissance la plus basse : à pleine puissance, il dure moins.",
    es: "Cuántos minutos funciona con una carga, a la potencia más baja: a máxima potencia dura menos.",
    pl: "Ile minut działa na jednym ładowaniu, na najniższej mocy: na maksymalnej działa krócej.",
    sv: "Hur många minuter den går på en laddning, på lägsta effekt: på högsta effekt räcker den kortare.",
  },
  dust: {
    it: "Una luce sulla spazzola mette in evidenza la polvere sottile che a occhio nudo non vedi.",
    fr: "Une lumière sur la brosse fait apparaître la poussière fine invisible à l’œil nu.",
    es: "Una luz en el cepillo deja ver el polvo fino que a simple vista no se nota.",
    pl: "Światło na szczotce pokazuje drobny kurz, którego nie widać gołym okiem.",
    sv: "Ett ljus på munstycket visar det fina dammet som du inte ser med blotta ögat.",
  },
  empty: {
    it: "La base svuota il contenitore da sola in un sacchetto: non tocchi la polvere.",
    fr: "La station vide le bac toute seule dans un sac : vous ne touchez pas la poussière.",
    es: "La base vacía el depósito sola en una bolsa: no tocas el polvo.",
    pl: "Stacja sama opróżnia pojemnik do worka: nie dotykasz kurzu.",
    sv: "Stationen tömmer behållaren själv i en påse: du rör aldrig dammet.",
  },
  flat: {
    it: "Quanto si abbassa per passare sotto letti e divani, dove la polvere si accumula.",
    fr: "Jusqu’où il se couche pour passer sous les lits et les canapés, là où la poussière s’accumule.",
    es: "Cuánto se tumba para pasar bajo camas y sofás, donde se acumula el polvo.",
    pl: "Jak nisko się kładzie, żeby sięgnąć pod łóżka i kanapy, gdzie zbiera się kurz.",
    sv: "Hur lågt den kan läggas för att komma under sängar och soffor, där dammet samlas.",
  },
  selfclean: {
    it: "Dopo l’uso risciacqua e asciuga il rullo da sola nella base, per evitare cattivi odori.",
    fr: "Après usage, il rince et sèche le rouleau tout seul sur sa station, pour éviter les mauvaises odeurs.",
    es: "Después de usarla aclara y seca el rodillo sola en la base, para evitar malos olores.",
    pl: "Po użyciu sam płucze i suszy wałek w stacji, żeby nie było nieprzyjemnych zapachów.",
    sv: "Efter användning sköljer och torkar den valsen själv i stationen, så att det inte luktar illa.",
  },
  hot: {
    it: "Acqua calda e vapore sciolgono meglio lo sporco secco e unto, per esempio in cucina.",
    fr: "L’eau chaude et la vapeur dissolvent mieux les taches sèches et grasses, par exemple dans la cuisine.",
    es: "El agua caliente y el vapor disuelven mejor la suciedad seca y grasa, por ejemplo en la cocina.",
    pl: "Gorąca woda i para lepiej rozpuszczają zaschnięty i tłusty brud, na przykład w kuchni.",
    sv: "Hett vatten och ånga löser bättre upp intorkad och fet smuts, till exempel i köket.",
  },
  heatup: {
    it: 'Quanto aspetti dall’accensione al vapore. Le scope a vapore verticali sono pronte in mezzo minuto; i pulitori a caldaia ci mettono qualche minuto.',
    fr: 'Le temps entre l’allumage et la vapeur. Les balais vapeur sont prêts en une demi-minute ; les nettoyeurs à chaudière mettent quelques minutes.',
    es: 'Lo que esperas desde que la enciendes hasta que sale vapor. Las mopas de vapor verticales están listas en medio minuto; las de caldera tardan unos minutos.',
    pl: 'Ile czekasz od włączenia do pary. Pionowe mopy parowe są gotowe po pół minuty; parownice z bojlerem potrzebują kilku minut.',
    sv: 'Hur länge du väntar från start till ånga. Ångmoppar är klara på en halv minut; ångtvättar med panna tar några minuter.',
  },
  area: {
    it: 'Quanti metri quadri lavi con un serbatoio pieno, secondo il produttore: sotto questa cifra non ti fermi a riempirlo.',
    fr: 'Combien de mètres carrés vous lavez avec un réservoir plein, selon le fabricant : en dessous, pas besoin de le remplir en route.',
    es: 'Cuántos metros cuadrados friegas con un depósito lleno, según el fabricante: por debajo de esa cifra no tienes que parar a rellenarlo.',
    pl: 'Ile metrów kwadratowych umyjesz na pełnym zbiorniku według producenta: poniżej tej wartości nie musisz go dolewać.',
    sv: 'Hur många kvadratmeter du rengör på en full tank enligt tillverkaren: under den ytan behöver du inte fylla på.',
  },
  power: {
    it: 'Quanta corrente usa per fare il vapore: più è alta, più vapore riesce a dare.',
    fr: 'L’électricité utilisée pour produire la vapeur : plus elle est élevée, plus il peut en donner.',
    es: 'La electricidad que usa para hacer vapor: cuanto más alta, más vapor puede dar.',
    pl: 'Ile prądu zużywa do wytwarzania pary: im więcej, tym więcej pary może dać.',
    sv: 'Hur mycket el den använder för att göra ånga: ju högre, desto mer ånga kan den ge.',
  },
  weight: {
    it: 'Il peso senza accessori: conta se hai scale o ti stanchi a spingere.',
    fr: 'Le poids sans accessoires : il compte si vous avez des escaliers ou vous fatiguez vite.',
    es: 'El peso sin accesorios: cuenta si tienes escaleras o te cansas al empujar.',
    pl: 'Waga bez akcesoriów: ważna, jeśli masz schody albo szybko się męczysz.',
    sv: 'Vikten utan tillbehör: spelar roll om du har trappor eller blir trött av att skjuta.',
  },
};

const categories: Record<string, Category> = {
  robot: {
    id: 'robot',
    icon: 'robot',
    slug: { it: 'robot-aspirapolvere-lavapavimenti', fr: 'robot-aspirateur-laveur', es: 'robot-aspirador-friegasuelos', pl: 'robot-sprzatajacy', sv: 'robotdammsugare' },
    name: { it: 'Robot aspirapolvere e lavapavimenti', fr: 'Robot aspirateur laveur', es: 'Robot aspirador y friegasuelos', pl: 'Robot sprzątający', sv: 'Robotdammsugare' },
    title: {
      it: 'Quale robot aspirapolvere e lavapavimenti comprare?',
      fr: 'Quel robot aspirateur laveur choisir ?',
      es: '¿Qué robot aspirador y friegasuelos comprar?',
      pl: 'Jaki robot sprzątający kupić?',
      sv: 'Vilken robotdammsugare ska du köpa?',
    },
    line: {
      it: 'Un robot lavapavimenti aspira e lava mentre sei fuori casa, e la base lo pulisce da sola.',
      fr: 'Un robot aspirateur laveur aspire et lave pendant votre absence, et sa station le nettoie toute seule.',
      es: 'Un robot aspirador y friegasuelos aspira y friega mientras estás fuera, y la base lo limpia sola.',
      pl: 'Robot sprzątający odkurza i myje, gdy Cię nie ma, a stacja sama go czyści.',
      sv: 'En robotdammsugare dammsuger och moppar medan du är borta, och stationen rengör den själv.',
    },
    seo: {
      it: {
        keyphrase: 'robot lavapavimenti',
        title: 'Robot lavapavimenti e aspirapolvere: quale comprare nel {year}',
        description: 'Quale robot lavapavimenti comprare? Dicci cosa conta per te (casa, animali, budget) e vedi subito il modello adatto, con prezzo, test e fonti verificate.',
      },
      fr: {
        keyphrase: 'robot aspirateur laveur',
        title: 'Robot aspirateur laveur : lequel choisir en {year} ?',
        description: 'Quel robot aspirateur laveur choisir ? Dites-nous ce qui compte (logement, animaux, budget) et voyez tout de suite le bon modèle, avec prix et tests.',
      },
      es: {
        keyphrase: 'robot aspirador friegasuelos',
        title: 'Robot aspirador y friegasuelos: cuál comprar en {year}',
        description: '¿Qué robot aspirador y friegasuelos comprar? Dinos qué te importa (casa, mascotas, presupuesto) y ve al momento el modelo adecuado, con precio y pruebas.',
      },
      pl: {
        keyphrase: 'robot sprzątający',
        title: 'Robot sprzątający: jaki kupić w {year} roku? Wybór i ceny',
        description: 'Jaki robot sprzątający kupić? Powiedz, co jest ważne (dom, zwierzęta, budżet), i od razu zobacz odpowiedni model, z ceną, testami i źródłami danych.',
      },
      sv: {
        keyphrase: 'robotdammsugare',
        title: 'Robotdammsugare {year}: vilken ska du köpa? Vi guidar dig',
        description: 'Vilken robotdammsugare ska du köpa? Berätta vad som är viktigt (hem, husdjur, budget) och se direkt rätt modell, med pris, tester och källor.',
      },
    },
    heads: {
      choose: {
        it: 'Il robot lavapavimenti giusto per casa tua',
        fr: 'Le robot aspirateur laveur qu’il vous faut',
        es: 'El robot aspirador y friegasuelos adecuado para tu casa',
        pl: 'Robot sprzątający dopasowany do twojego domu',
        sv: 'Rätt robotdammsugare för ditt hem',
      },
      others: {
        it: 'Anche questi robot lavapavimenti vanno bene',
        fr: 'Ces robots aspirateurs laveurs conviennent aussi',
        es: 'Estos robots aspiradores y friegasuelos también sirven',
        pl: 'Te roboty sprzątające też się sprawdzą',
        sv: 'De här robotdammsugarna passar också',
      },
      good: {
        it: 'Un robot lavapavimenti fa per te se',
        fr: 'Un robot aspirateur laveur est fait pour vous si',
        es: 'Un robot aspirador y friegasuelos te conviene si',
        pl: 'Robot sprzątający jest dla ciebie, jeśli',
        sv: 'En robotdammsugare passar dig om',
      },
      skip: {
        it: 'Il robot lavapavimenti non fa per te se',
        fr: 'Oubliez le robot aspirateur laveur si',
        es: 'El robot aspirador y friegasuelos no es para ti si',
        pl: 'Robot sprzątający nie jest dla ciebie, jeśli',
        sv: 'Hoppa över robotdammsugaren om',
      },
      how: {
        it: 'Come scegliere un robot lavapavimenti',
        fr: 'Comment choisir un robot aspirateur laveur',
        es: 'Cómo elegir un robot aspirador y friegasuelos',
        pl: 'Jak wybrać robota sprzątającego',
        sv: 'Så väljer du robotdammsugare',
      },
      faq: {
        it: 'Domande frequenti sul robot lavapavimenti',
        fr: 'Questions fréquentes sur le robot aspirateur laveur',
        es: 'Preguntas frecuentes sobre el robot aspirador y friegasuelos',
        pl: 'Najczęstsze pytania o robota sprzątającego',
        sv: 'Vanliga frågor om robotdammsugare',
      },
    },
    goodIf: {
      it: ['Hai pavimenti duri da lavare spesso, non solo da aspirare.', 'Vuoi pulire mentre sei fuori casa.'],
      fr: ['Vous avez des sols durs à laver souvent, pas seulement à aspirer.', 'Vous voulez nettoyer pendant votre absence.'],
      es: ['Tienes suelos duros que fregar a menudo, no solo aspirar.', 'Quieres limpiar mientras estás fuera.'],
      pl: ['Masz twarde podłogi, które trzeba często myć, a nie tylko odkurzać.', 'Chcesz sprzątać, gdy nie ma Cię w domu.'],
      sv: ['Du har hårda golv som behöver moppas ofta, inte bara dammsugas.', 'Du vill att det städas medan du är borta.'],
    },
    skipIf: {
      it: ['Hai molte scale: il robot pulisce un piano alla volta.', 'Hai tappeti spessi ovunque: meglio una scopa elettrica potente.'],
      fr: ['Vous avez beaucoup d’escaliers : le robot nettoie un étage à la fois.', 'Vous avez des tapis épais partout : mieux vaut un aspirateur balai puissant.'],
      es: ['Tienes muchas escaleras: el robot limpia una planta cada vez.', 'Tienes alfombras gruesas por todas partes: mejor una aspiradora sin cable potente.'],
      pl: ['Masz dużo schodów: robot sprząta jedno piętro naraz.', 'Wszędzie masz grube dywany: lepszy będzie mocny odkurzacz bezprzewodowy.'],
      sv: ['Du har många trappor: roboten städar en våning i taget.', 'Du har tjocka mattor överallt: då är en kraftfull skaftdammsugare bättre.'],
    },
    criteria: {
      it: [
        { t: 'Come lava', d: 'Rullo o panni rotanti che si lavano nella base: evita i robot che trascinano solo un panno umido.' },
        { t: 'La base', d: 'Deve lavare e asciugare da sola i panni, altrimenti restano umidi e il robot va accudito ogni giorno.' },
        { t: 'Gli ostacoli', d: 'Luce strutturata o fotocamera servono a evitare cavi, calzini e le ciotole degli animali.' },
      ],
      fr: [
        { t: 'Comment il lave', d: 'Un rouleau ou des serpillières rotatives lavés à la station : évitez les robots qui traînent juste un chiffon humide.' },
        { t: 'La station', d: 'Elle doit laver et sécher les serpillières toute seule, sinon elles restent humides et il faut s’en occuper chaque jour.' },
        { t: 'Les obstacles', d: 'La lumière structurée ou une caméra évitent les câbles, les chaussettes et les gamelles des animaux.' },
      ],
      es: [
        { t: 'Cómo friega', d: 'Rodillo o mopas giratorias que se lavan en la base: evita los robots que solo arrastran un paño húmedo.' },
        { t: 'La base', d: 'Debe lavar y secar las mopas sola; si no, quedan húmedas y hay que ocuparse del robot cada día.' },
        { t: 'Los obstáculos', d: 'La luz estructurada o una cámara sirven para esquivar cables, calcetines y los cuencos de las mascotas.' },
      ],
      pl: [
        { t: 'Jak myje', d: 'Wałek albo obrotowe mopy myte w stacji: unikaj robotów, które tylko ciągną wilgotną ściereczkę.' },
        { t: 'Stacja', d: 'Powinna sama myć i suszyć mopy, inaczej zostają wilgotne i trzeba się nimi zajmować codziennie.' },
        { t: 'Przeszkody', d: 'Światło strukturalne lub kamera pomagają omijać kable, skarpetki i miski zwierząt.' },
      ],
      sv: [
        { t: 'Hur den moppar', d: 'Moppvals eller roterande moppar som tvättas i stationen: undvik robotar som bara drar en fuktig trasa.' },
        { t: 'Stationen', d: 'Den ska tvätta och torka mopparna själv, annars blir de fuktiga och roboten måste skötas varje dag.' },
        { t: 'Hinder', d: 'Strukturerat ljus eller kamera behövs för att undvika sladdar, strumpor och husdjurens skålar.' },
      ],
    },
    budget: { EUR: [600, 1000], PLN: [2600, 4300], SEK: [6500, 12000] },
    needs: [
      {
        id: 'main',
        icon: 'target',
        label: { it: 'Per quasi tutte le case', fr: 'Pour presque tous les logements', es: 'Para casi todas las casas', pl: 'Do prawie każdego domu', sv: 'För nästan alla hem' },
        picks: [{ id: 'qrevo-curv-2-flow' }],
      },
      {
        id: 'save',
        icon: 'coins',
        label: { it: 'Spendere meno', fr: 'Dépenser moins', es: 'Gastar menos', pl: 'Wydać mniej', sv: 'Betala mindre' },
        picks: [{ id: 'ecovacs-t80s-omni', markets: ['it', 'fr'] }],
      },
      {
        id: 'pets',
        icon: 'paw',
        label: { it: 'Con cani o gatti', fr: 'Avec un chien ou un chat', es: 'Con perro o gato', pl: 'Z psem lub kotem', sv: 'Med hund eller katt' },
        picks: [{ id: 'narwal-flow-2' }],
      },
    ],
    compare: ['suction', 'mop', 'mopwash', 'drying', 'avoid'],
    faq: {
      it: [
        {
          q: 'Serve davvero la base che lava i panni?',
          a: 'Se vuoi che il robot lavi e non solo aspiri, sì: la base risciacqua panni o rullo e li asciuga, così non restano umidi e non prendono cattivo odore. Tutti e tre i modelli che consigliamo ce l’hanno.',
        },
        {
          q: 'Un robot sostituisce la scopa elettrica?',
          a: 'Per la pulizia di tutti i giorni sì. Non sale le scale e non pulisce divani, angoli alti o l’auto: per quelli serve comunque una scopa elettrica.',
        },
        {
          q: 'Rullo o panni rotanti: cosa cambia?',
          a: 'Il rullo si risciacqua mentre gira, quindi sul pavimento passa sempre acqua pulita; i panni rotanti si lavano quando il robot torna alla base. Tra i nostri tre, il modello a panni rotanti è quello che costa meno.',
        },
      ],
      fr: [
        {
          q: 'La station qui lave les serpillières est-elle vraiment utile ?',
          a: 'Si vous voulez que le robot lave et pas seulement qu’il aspire, oui : la station rince les serpillières ou le rouleau puis les sèche, pour qu’ils ne restent pas humides et ne sentent pas mauvais. Nos trois modèles en ont une.',
        },
        {
          q: 'Un robot remplace-t-il un aspirateur balai ?',
          a: 'Pour le ménage quotidien, oui. Il ne monte pas les escaliers et ne nettoie ni le canapé, ni les recoins en hauteur, ni la voiture : pour cela, il faut quand même un aspirateur balai.',
        },
        {
          q: 'Rouleau ou serpillières rotatives : quelle différence ?',
          a: 'Le rouleau se rince en tournant, donc c’est toujours de l’eau propre qui passe sur le sol ; les serpillières rotatives sont lavées quand le robot revient à la station. Parmi nos trois modèles, celui à serpillières rotatives est le moins cher.',
        },
      ],
      es: [
        {
          q: '¿De verdad hace falta la base que lava las mopas?',
          a: 'Si quieres que el robot friegue y no solo aspire, sí: la base aclara las mopas o el rodillo y los seca, para que no queden húmedos ni huelan mal. Nuestros tres modelos la tienen.',
        },
        {
          q: '¿Un robot sustituye a la aspiradora sin cable?',
          a: 'Para la limpieza de cada día, sí. No sube escaleras ni limpia el sofá, los rincones altos o el coche: para eso sigue haciendo falta una aspiradora sin cable.',
        },
        {
          q: 'Rodillo o mopas giratorias: ¿qué cambia?',
          a: 'El rodillo se aclara mientras gira, así que sobre el suelo pasa siempre agua limpia; las mopas giratorias se lavan cuando el robot vuelve a la base. De nuestros tres modelos, el de mopas giratorias es el más barato.',
        },
      ],
      pl: [
        {
          q: 'Czy stacja, która myje mopy, jest naprawdę potrzebna?',
          a: 'Jeśli robot ma myć, a nie tylko odkurzać, to tak: stacja płucze mopy lub wałek i je suszy, dzięki czemu nie zostają wilgotne i nie brzydko pachną. Wszystkie trzy polecane modele ją mają.',
        },
        {
          q: 'Czy robot zastąpi odkurzacz bezprzewodowy?',
          a: 'Przy codziennym sprzątaniu tak. Nie wejdzie jednak po schodach i nie wyczyści kanapy, wysokich zakamarków ani samochodu: do tego nadal potrzebny jest odkurzacz bezprzewodowy.',
        },
        {
          q: 'Wałek czy obrotowe mopy: jaka to różnica?',
          a: 'Wałek płucze się w trakcie obracania, więc po podłodze zawsze przechodzi czysta woda; obrotowe mopy są myte, gdy robot wraca do stacji. Z naszej trójki model z obrotowymi mopami jest najtańszy.',
        },
      ],
      sv: [
        {
          q: 'Behövs verkligen en station som tvättar mopparna?',
          a: 'Om roboten ska moppa och inte bara dammsuga, ja: stationen sköljer mopparna eller moppvalsen och torkar dem, så att de inte blir fuktiga och luktar illa. Alla tre modeller vi rekommenderar har en.',
        },
        {
          q: 'Ersätter en robot skaftdammsugaren?',
          a: 'För vardagsstädningen, ja. Men den tar sig inte uppför trappor och rengör inte soffan, höga hörn eller bilen: till det behövs fortfarande en skaftdammsugare.',
        },
        {
          q: 'Moppvals eller roterande moppar: vad är skillnaden?',
          a: 'Moppvalsen sköljs medan den roterar, så det är alltid rent vatten som går över golvet; roterande moppar tvättas när roboten återvänder till stationen. Av våra tre är modellen med roterande moppar den billigaste.',
        },
      ],
    },
    related: ['stick', 'wet'],
  },

  stick: {
    id: 'stick',
    icon: 'stick',
    slug: { it: 'aspirapolvere-senza-fili', fr: 'aspirateur-balai-sans-fil', es: 'aspiradora-sin-cable', pl: 'odkurzacz-bezprzewodowy', sv: 'skaftdammsugare' },
    name: { it: 'Aspirapolvere senza fili', fr: 'Aspirateur balai sans fil', es: 'Aspiradora sin cable', pl: 'Odkurzacz bezprzewodowy', sv: 'Skaftdammsugare' },
    title: {
      it: 'Quale aspirapolvere senza fili comprare?',
      fr: 'Quel aspirateur balai sans fil choisir ?',
      es: '¿Qué aspiradora sin cable comprar?',
      pl: 'Jaki odkurzacz bezprzewodowy kupić?',
      sv: 'Vilken skaftdammsugare ska du köpa?',
    },
    line: {
      it: 'Un aspirapolvere senza fili è leggero, pronto in un secondo, senza cavo da trascinare.',
      fr: 'Un aspirateur balai sans fil est léger, prêt en une seconde, sans fil à traîner.',
      es: 'Una aspiradora sin cable es ligera, está lista en un segundo y no tiene cable que arrastrar.',
      pl: 'Odkurzacz bezprzewodowy jest lekki, gotowy w sekundę, bez kabla za sobą.',
      sv: 'En skaftdammsugare är lätt, redo på en sekund, utan sladd att dra på.',
    },
    seo: {
      it: {
        keyphrase: 'aspirapolvere senza fili',
        title: 'Aspirapolvere senza fili: quale comprare nel {year}',
        description: 'Quale aspirapolvere senza fili comprare? Dicci cosa conta per te e vedi subito il modello adatto, con prezzo, autonomia, test indipendenti e fonti.',
      },
      fr: {
        keyphrase: 'aspirateur balai sans fil',
        title: 'Aspirateur balai sans fil : lequel choisir en {year} ?',
        description: 'Quel aspirateur balai sans fil choisir ? Dites-nous ce qui compte pour vous et voyez tout de suite le bon modèle, avec prix, autonomie et tests.',
      },
      es: {
        keyphrase: 'aspiradora sin cable',
        title: 'Aspiradora sin cable: cuál comprar en {year} y por qué',
        description: '¿Qué aspiradora sin cable comprar? Dinos qué te importa y ve al momento el modelo adecuado, con precio, autonomía, pruebas independientes y fuentes.',
      },
      pl: {
        keyphrase: 'odkurzacz bezprzewodowy',
        title: 'Odkurzacz bezprzewodowy: jaki kupić w {year} roku?',
        description: 'Jaki odkurzacz bezprzewodowy kupić? Powiedz, co jest dla ciebie ważne, i od razu zobacz odpowiedni model, z ceną, czasem pracy i testami.',
      },
      sv: {
        keyphrase: 'skaftdammsugare',
        title: 'Skaftdammsugare {year}: vilken ska du köpa? Vi guidar dig',
        description: 'Vilken skaftdammsugare ska du köpa? Berätta vad som är viktigt för dig och se direkt rätt modell, med pris, batteritid, oberoende tester och källor.',
      },
    },
    heads: {
      choose: {
        it: 'L’aspirapolvere senza fili giusto per casa tua',
        fr: 'L’aspirateur balai sans fil qu’il vous faut',
        es: 'La aspiradora sin cable adecuada para tu casa',
        pl: 'Odkurzacz bezprzewodowy dopasowany do twojego domu',
        sv: 'Rätt skaftdammsugare för ditt hem',
      },
      others: {
        it: 'Anche questi aspirapolvere senza fili vanno bene',
        fr: 'Ces aspirateurs balais sans fil conviennent aussi',
        es: 'Estas aspiradoras sin cable también sirven',
        pl: 'Te odkurzacze bezprzewodowe też się sprawdzą',
        sv: 'De här skaftdammsugarna passar också',
      },
      good: {
        it: 'Un aspirapolvere senza fili fa per te se',
        fr: 'Un aspirateur balai sans fil est fait pour vous si',
        es: 'Una aspiradora sin cable te conviene si',
        pl: 'Odkurzacz bezprzewodowy jest dla ciebie, jeśli',
        sv: 'En skaftdammsugare passar dig om',
      },
      skip: {
        it: 'L’aspirapolvere senza fili non fa per te se',
        fr: 'Oubliez l’aspirateur balai sans fil si',
        es: 'La aspiradora sin cable no es para ti si',
        pl: 'Odkurzacz bezprzewodowy nie jest dla ciebie, jeśli',
        sv: 'Hoppa över skaftdammsugaren om',
      },
      how: {
        it: 'Come scegliere un aspirapolvere senza fili',
        fr: 'Comment choisir un aspirateur balai sans fil',
        es: 'Cómo elegir una aspiradora sin cable',
        pl: 'Jak wybrać odkurzacz bezprzewodowy',
        sv: 'Så väljer du skaftdammsugare',
      },
      faq: {
        it: 'Domande frequenti sull’aspirapolvere senza fili',
        fr: 'Questions fréquentes sur l’aspirateur balai sans fil',
        es: 'Preguntas frecuentes sobre la aspiradora sin cable',
        pl: 'Najczęstsze pytania o odkurzacz bezprzewodowy',
        sv: 'Vanliga frågor om skaftdammsugare',
      },
    },
    goodIf: {
      it: ['Vuoi pulire in fretta, anche solo una stanza.', 'Hai tappeti, scale o un’auto da pulire.'],
      fr: ['Vous voulez nettoyer vite, même une seule pièce.', 'Vous avez des tapis, des escaliers ou une voiture à nettoyer.'],
      es: ['Quieres limpiar rápido, aunque sea una sola habitación.', 'Tienes alfombras, escaleras o un coche que limpiar.'],
      pl: ['Chcesz szybko posprzątać, nawet jeden pokój.', 'Masz dywany, schody albo samochód do odkurzenia.'],
      sv: ['Du vill städa snabbt, även bara ett rum.', 'Du har mattor, trappor eller en bil att städa.'],
    },
    skipIf: {
      it: ['Vuoi che la casa si pulisca da sola: guarda i robot.', 'Vuoi anche lavare i pavimenti: guarda le lavapavimenti.'],
      fr: ['Vous voulez que la maison se nettoie toute seule : voyez les robots.', 'Vous voulez aussi laver les sols : voyez les aspirateurs laveurs.'],
      es: ['Quieres que la casa se limpie sola: mira los robots.', 'También quieres fregar los suelos: mira las aspiradoras fregona.'],
      pl: ['Chcesz, żeby dom sprzątał się sam: zobacz roboty.', 'Chcesz też myć podłogi: zobacz odkurzacze myjące.'],
      sv: ['Du vill att hemmet städar sig självt: titta på robotdammsugarna.', 'Du har nästan bara hårda golv och vill ha dem moppade: titta på robotarna med mopp.'],
    },
    criteria: {
      it: [
        { t: 'La potenza vera', d: 'Conta l’aspirazione dichiarata (AW), non i watt del motore scritti in grande sulla scatola.' },
        { t: 'L’autonomia', d: 'Il massimo dichiarato vale in modalità risparmio: alla potenza più alta dura molto meno.' },
        { t: 'Peli e capelli', d: 'Una spazzola anti-groviglio ti evita di tagliarli dal rullo con le forbici.' },
      ],
      fr: [
        { t: 'La vraie puissance', d: 'C’est l’aspiration annoncée (AW) qui compte, pas les watts du moteur écrits en gros sur la boîte.' },
        { t: 'L’autonomie', d: 'Le maximum annoncé vaut en mode éco : à pleine puissance, il dure beaucoup moins.' },
        { t: 'Poils et cheveux', d: 'Une brosse anti-enchevêtrement vous évite de les couper du rouleau aux ciseaux.' },
      ],
      es: [
        { t: 'La potencia real', d: 'Cuenta la succión declarada (AW), no los vatios del motor escritos en grande en la caja.' },
        { t: 'La autonomía', d: 'El máximo declarado vale en modo ahorro: a máxima potencia dura mucho menos.' },
        { t: 'Pelos y cabellos', d: 'Un cepillo antienredos te evita cortarlos del rodillo con tijeras.' },
      ],
      pl: [
        { t: 'Prawdziwa moc', d: 'Liczy się deklarowana siła ssania (AW), a nie waty silnika wypisane dużymi cyframi na pudełku.' },
        { t: 'Czas pracy', d: 'Deklarowane maksimum dotyczy trybu eko: na najwyższej mocy działa znacznie krócej.' },
        { t: 'Sierść i włosy', d: 'Szczotka zapobiegająca plątaniu oszczędza wycinania włosów z wałka nożyczkami.' },
      ],
      sv: [
        { t: 'Verklig kraft', d: 'Det är den angivna sugeffekten (AW) som räknas, inte motorns watt i stora siffror på kartongen.' },
        { t: 'Drifttid', d: 'Angivet maximum gäller i eco-läge: på högsta effekt räcker batteriet mycket kortare.' },
        { t: 'Hår och päls', d: 'En borste som inte trasslar in sig sparar dig från att klippa bort hår från valsen.' },
      ],
    },
    budget: { EUR: [300, 600], PLN: [1300, 2600], SEK: [3300, 6600] },
    needs: [
      {
        id: 'main',
        icon: 'target',
        label: { it: 'Per quasi tutte le case', fr: 'Pour presque tous les logements', es: 'Para casi todas las casas', pl: 'Do prawie każdego domu', sv: 'För nästan alla hem' },
        picks: [{ id: 'dyson-v15' }],
      },
      {
        id: 'auto',
        icon: 'bin',
        label: { it: 'Senza svuotare il contenitore', fr: 'Sans vider le bac', es: 'Sin vaciar el depósito', pl: 'Bez opróżniania pojemnika', sv: 'Utan att tömma behållaren' },
        picks: [{ id: 'shark-powerdetect-ce' }],
      },
    ],
    compare: ['suction', 'runtime', 'dust'],
    faq: {
      it: [
        {
          q: 'Meglio con il filo o senza?',
          a: 'Senza filo è sempre pronta e la porti ovunque; con il filo non si scarica mai. Per la maggior parte delle case oggi la batteria basta: i modelli che consigliamo sono tutti senza filo.',
        },
        {
          q: 'Quanto dura davvero la batteria?',
          a: 'I produttori dichiarano la durata massima, misurata alla potenza più bassa. Alla potenza più alta scende molto: se la casa è grande, conta anche la possibilità di cambiare la batteria.',
        },
        {
          q: 'A cosa serve la base che si svuota da sola?',
          a: 'Aspira la polvere dal contenitore e la chiude in un sacchetto: non la tocchi e non si solleva nell’aria. È utile se soffri di allergie; in cambio occupa un po’ di spazio a terra.',
        },
      ],
      fr: [
        {
          q: 'Avec ou sans fil ?',
          a: 'Sans fil, il est toujours prêt et va partout ; avec fil, il ne se décharge jamais. Pour la plupart des logements, la batterie suffit aujourd’hui : nos modèles sont tous sans fil.',
        },
        {
          q: 'Combien de temps dure vraiment la batterie ?',
          a: 'Les fabricants annoncent l’autonomie maximale, mesurée à la puissance la plus basse. À pleine puissance, elle baisse beaucoup : dans un grand logement, une batterie amovible compte aussi.',
        },
        {
          q: 'À quoi sert la station qui se vide toute seule ?',
          a: 'Elle aspire la poussière du bac et l’enferme dans un sac : vous ne la touchez pas et elle ne se disperse pas dans l’air. Utile en cas d’allergie ; en échange, elle prend un peu de place au sol.',
        },
      ],
      es: [
        {
          q: '¿Mejor con cable o sin cable?',
          a: 'Sin cable está siempre lista y la llevas a cualquier parte; con cable nunca se descarga. Para la mayoría de las casas la batería ya es suficiente: los modelos que recomendamos son todos sin cable.',
        },
        {
          q: '¿Cuánto dura de verdad la batería?',
          a: 'Los fabricantes declaran la autonomía máxima, medida a la potencia más baja. A máxima potencia baja mucho: si la casa es grande, también cuenta poder cambiar la batería.',
        },
        {
          q: '¿Para qué sirve la base que se vacía sola?',
          a: 'Aspira el polvo del depósito y lo cierra en una bolsa: no lo tocas y no se levanta en el aire. Es útil si tienes alergia; a cambio, ocupa algo de espacio en el suelo.',
        },
      ],
      pl: [
        {
          q: 'Lepszy z kablem czy bez?',
          a: 'Bezprzewodowy jest zawsze gotowy i sięga wszędzie; przewodowy nigdy się nie rozładuje. W większości domów bateria dziś wystarcza: wszystkie polecane przez nas modele są bezprzewodowe.',
        },
        {
          q: 'Jak długo naprawdę działa bateria?',
          a: 'Producenci podają maksymalny czas pracy, mierzony na najniższej mocy. Na najwyższej mocy jest dużo krótszy: w dużym domu liczy się też możliwość wymiany baterii.',
        },
        {
          q: 'Do czego służy stacja, która sama opróżnia pojemnik?',
          a: 'Wysysa kurz z pojemnika i zamyka go w worku: nie dotykasz go i nie unosi się w powietrzu. Przydaje się przy alergii; w zamian zajmuje trochę miejsca na podłodze.',
        },
      ],
      sv: [
        {
          q: 'Med eller utan sladd?',
          a: 'Sladdlös är alltid redo och når överallt; med sladd laddar den aldrig ur. För de flesta hem räcker batteriet i dag: modellerna vi rekommenderar är alla sladdlösa.',
        },
        {
          q: 'Hur länge räcker batteriet egentligen?',
          a: 'Tillverkarna anger maximal drifttid, mätt på lägsta effekt. På högsta effekt blir den mycket kortare: i ett stort hem spelar det också roll om batteriet går att byta.',
        },
        {
          q: 'Vad gör en station som tömmer dammsugaren själv?',
          a: 'Den suger ut dammet ur behållaren och stänger in det i en påse: du rör det inte och det virvlar inte upp i luften. Bra vid allergi; i gengäld tar den lite golvplats.',
        },
      ],
    },
    related: ['robot', 'wet'],
  },

  wet: {
    id: 'wet',
    icon: 'wet',
    markets: WET,
    slug: { it: 'lavapavimenti-senza-fili', fr: 'aspirateur-laveur', es: 'aspiradora-fregona', pl: 'odkurzacz-myjacy' },
    name: { it: 'Lavapavimenti senza fili', fr: 'Aspirateur laveur', es: 'Aspiradora fregona', pl: 'Odkurzacz myjący' },
    title: {
      it: 'Quale lavapavimenti senza fili comprare?',
      fr: 'Quel aspirateur laveur choisir ?',
      es: '¿Qué aspiradora fregona comprar?',
      pl: 'Jaki odkurzacz myjący kupić?',
    },
    line: {
      it: 'Una lavapavimenti senza fili aspira e lava in una sola passata, poi si pulisce da sola.',
      fr: 'Un aspirateur laveur aspire et lave en un seul passage, puis se nettoie tout seul.',
      es: 'Una aspiradora fregona aspira y friega en una sola pasada, y luego se limpia sola.',
      pl: 'Odkurzacz myjący odkurza i myje za jednym przejściem, a potem sam się czyści.',
    },
    seo: {
      it: {
        keyphrase: 'lavapavimenti senza fili',
        title: 'Lavapavimenti senza fili: quale comprare nel {year}',
        description: 'Quale lavapavimenti senza fili comprare? Dicci cosa conta per te e vedi subito il modello adatto, con prezzo, test indipendenti, caratteristiche e fonti.',
      },
      fr: {
        keyphrase: 'aspirateur laveur',
        title: 'Aspirateur laveur sans fil : lequel choisir en {year} ?',
        description: 'Quel aspirateur laveur choisir ? Dites-nous ce qui compte pour vous et voyez tout de suite le bon modèle, avec prix, tests indépendants et sources.',
      },
      es: {
        keyphrase: 'aspiradora fregona',
        title: 'Aspiradora fregona: cuál comprar en {year} (sin cable)',
        description: '¿Qué aspiradora fregona comprar? Dinos qué te importa y ve al momento el modelo adecuado, con precio, pruebas independientes, características y fuentes.',
      },
      pl: {
        keyphrase: 'odkurzacz myjący',
        title: 'Odkurzacz myjący: jaki kupić w {year} roku? Wybór i ceny',
        description: 'Jaki odkurzacz myjący kupić? Powiedz, co jest dla ciebie ważne, i od razu zobacz odpowiedni model, z ceną, niezależnymi testami i źródłami danych.',
      },
    },
    heads: {
      choose: {
        it: 'La lavapavimenti senza fili giusta per casa tua',
        fr: 'L’aspirateur laveur qu’il vous faut',
        es: 'La aspiradora fregona adecuada para tu casa',
        pl: 'Odkurzacz myjący dopasowany do twojego domu',
      },
      others: {
        it: 'Anche queste lavapavimenti senza fili vanno bene',
        fr: 'Ces aspirateurs laveurs conviennent aussi',
        es: 'Estas aspiradoras fregonas también sirven',
        pl: 'Te odkurzacze myjące też się sprawdzą',
      },
      good: {
        it: 'Una lavapavimenti senza fili fa per te se',
        fr: 'Un aspirateur laveur est fait pour vous si',
        es: 'Una aspiradora fregona te conviene si',
        pl: 'Odkurzacz myjący jest dla ciebie, jeśli',
      },
      skip: {
        it: 'La lavapavimenti senza fili non fa per te se',
        fr: 'Oubliez l’aspirateur laveur si',
        es: 'La aspiradora fregona no es para ti si',
        pl: 'Odkurzacz myjący nie jest dla ciebie, jeśli',
      },
      how: {
        it: 'Come scegliere una lavapavimenti senza fili',
        fr: 'Comment choisir un aspirateur laveur',
        es: 'Cómo elegir una aspiradora fregona',
        pl: 'Jak wybrać odkurzacz myjący',
      },
      faq: {
        it: 'Domande frequenti sulla lavapavimenti senza fili',
        fr: 'Questions fréquentes sur l’aspirateur laveur',
        es: 'Preguntas frecuentes sobre la aspiradora fregona',
        pl: 'Najczęstsze pytania o odkurzacz myjący',
      },
    },
    goodIf: {
      it: ['Hai soprattutto pavimenti duri: piastrelle, gres, laminato.', 'Vuoi aspirare e lavare in una sola passata, senza secchio.'],
      fr: ['Vous avez surtout des sols durs : carrelage, grès, stratifié.', 'Vous voulez aspirer et laver en un seul passage, sans seau.'],
      es: ['Tienes sobre todo suelos duros: baldosas, gres, laminado.', 'Quieres aspirar y fregar en una sola pasada, sin cubo.'],
      pl: ['Masz głównie twarde podłogi: płytki, gres, panele.', 'Chcesz odkurzać i myć za jednym razem, bez wiadra.'],
    },
    skipIf: {
      it: ['Hai molti tappeti: sui tappeti non si usa.', 'Vuoi che pulisca da sola: guarda i robot.'],
      fr: ['Vous avez beaucoup de tapis : il ne s’utilise pas dessus.', 'Vous voulez que le ménage se fasse tout seul : voyez les robots.'],
      es: ['Tienes muchas alfombras: sobre alfombras no se usa.', 'Quieres que limpie sola: mira los robots.'],
      pl: ['Masz dużo dywanów: na dywanach się go nie używa.', 'Chcesz, żeby sprzątał sam: zobacz roboty.'],
    },
    criteria: {
      it: [
        { t: 'Si pulisce da sola', d: 'Dopo l’uso risciacqua e asciuga il rullo nella base: niente cattivi odori.' },
        { t: 'Sotto i mobili', d: 'Se si piega fino a terra arriva sotto letti e divani, dove si accumula la polvere.' },
        { t: 'Acqua calda o vapore', d: 'Servono per lo sporco secco e unto; per la pulizia di ogni giorno basta l’acqua.' },
      ],
      fr: [
        { t: 'Autonettoyage', d: 'Après usage, il rince et sèche le rouleau sur sa station : pas de mauvaises odeurs.' },
        { t: 'Sous les meubles', d: 'S’il se couche jusqu’au sol, il passe sous les lits et les canapés, là où la poussière s’accumule.' },
        { t: 'Eau chaude ou vapeur', d: 'Utiles pour les taches sèches et grasses ; pour le ménage quotidien, l’eau suffit.' },
      ],
      es: [
        { t: 'Autolimpieza', d: 'Después de usarla aclara y seca el rodillo en la base: sin malos olores.' },
        { t: 'Bajo los muebles', d: 'Si se tumba hasta el suelo, llega bajo camas y sofás, donde se acumula el polvo.' },
        { t: 'Agua caliente o vapor', d: 'Sirven para la suciedad seca y grasa; para la limpieza diaria basta el agua.' },
      ],
      pl: [
        { t: 'Samoczyszczenie', d: 'Po użyciu płucze i suszy wałek w stacji: bez nieprzyjemnych zapachów.' },
        { t: 'Pod meblami', d: 'Jeśli kładzie się płasko, sięga pod łóżka i kanapy, gdzie zbiera się kurz.' },
        { t: 'Gorąca woda lub para', d: 'Przydają się na zaschnięty i tłusty brud; do codziennego sprzątania wystarczy woda.' },
      ],
    },
    budget: { EUR: [300, 600], PLN: [1300, 2600] },
    needs: [
      {
        id: 'main',
        icon: 'calendar',
        label: { it: 'La pulizia di ogni giorno', fr: 'Le ménage de tous les jours', es: 'La limpieza de cada día', pl: 'Codzienne sprzątanie' },
        picks: [{ id: 'tineco-stretch-s6' }],
      },
      {
        id: 'tough',
        icon: 'stain',
        label: { it: 'Sporco incrostato, cucina', fr: 'Taches incrustées, cuisine', es: 'Suciedad incrustada, cocina', pl: 'Zaschnięty brud, kuchnia' },
        picks: [{ id: 'f25-ultra' }],
      },
    ],
    compare: ['flat', 'selfclean', 'hot'],
    faq: {
      it: [
        {
          q: 'Una lavapavimenti sostituisce mocio e secchio?',
          a: 'Sui pavimenti duri sì: aspira lo sporco e lava nella stessa passata, tenendo l’acqua sporca separata da quella pulita. Sui tappeti invece non va usata.',
        },
        {
          q: 'Va bene sul parquet?',
          a: 'In genere sì, perché usa poca acqua e il pavimento asciuga in fretta; controlla comunque le indicazioni di chi ha posato il tuo parquet.',
        },
        {
          q: 'Serve il vapore?',
          a: 'Per la pulizia di tutti i giorni no. Aiuta con lo sporco secco o unto, per esempio in cucina: per questo lo consigliamo solo come seconda scelta.',
        },
      ],
      fr: [
        {
          q: 'Un aspirateur laveur remplace-t-il la serpillière et le seau ?',
          a: 'Sur les sols durs, oui : il aspire la saleté et lave en un seul passage, en gardant l’eau sale séparée de l’eau propre. En revanche, il ne s’utilise pas sur les tapis.',
        },
        {
          q: 'Peut-on l’utiliser sur du parquet ?',
          a: 'En général oui, car il utilise peu d’eau et le sol sèche vite ; vérifiez quand même les consignes de la personne qui a posé votre parquet.',
        },
        {
          q: 'La vapeur est-elle utile ?',
          a: 'Pas pour le ménage de tous les jours. Elle aide contre les taches sèches ou grasses, par exemple dans la cuisine : c’est pourquoi nous la recommandons seulement comme second choix.',
        },
      ],
      es: [
        {
          q: '¿Una aspiradora fregona sustituye a la fregona y el cubo?',
          a: 'En suelos duros, sí: aspira la suciedad y friega en la misma pasada, con el agua sucia separada de la limpia. En alfombras, en cambio, no se usa.',
        },
        {
          q: '¿Sirve para el parquet?',
          a: 'En general sí, porque usa poca agua y el suelo se seca rápido; aun así, revisa las indicaciones de quien instaló tu parquet.',
        },
        {
          q: '¿Hace falta el vapor?',
          a: 'Para la limpieza de cada día, no. Ayuda con la suciedad seca o grasa, por ejemplo en la cocina: por eso solo lo recomendamos como segunda opción.',
        },
      ],
      pl: [
        {
          q: 'Czy odkurzacz myjący zastąpi mop i wiadro?',
          a: 'Na twardych podłogach tak: odkurza brud i myje za jednym przejściem, trzymając brudną wodę oddzielnie od czystej. Na dywanach się go jednak nie używa.',
        },
        {
          q: 'Czy nadaje się do parkietu?',
          a: 'Zwykle tak, bo zużywa mało wody, a podłoga szybko schnie; mimo to sprawdź zalecenia osoby, która układała Twój parkiet.',
        },
        {
          q: 'Czy para jest potrzebna?',
          a: 'Do codziennego sprzątania nie. Pomaga przy zaschniętym lub tłustym brudzie, na przykład w kuchni: dlatego polecamy ją tylko jako drugi wybór.',
        },
      ],
    },
    related: ['robot', 'stick', 'steam'],
  },
  steam: {
    id: 'steam',
    icon: 'steam',
    markets: STEAM,
    slug: { it: 'scopa-a-vapore', fr: 'balai-vapeur', pl: 'mop-parowy', sv: 'angmopp' },
    name: { it: 'Scopa a vapore', fr: 'Balai vapeur', pl: 'Mop parowy', sv: 'Ångmopp' },
    title: {
      it: 'Quale scopa a vapore comprare?',
      fr: 'Quel balai vapeur choisir ?',
      pl: 'Jaki mop parowy kupić?',
      sv: 'Vilken ångmopp ska du köpa?',
    },
    line: {
      it: 'Una scopa a vapore lava i pavimenti duri solo con acqua e vapore, senza detersivi, ed è pronta in mezzo minuto.',
      fr: 'Un balai vapeur lave les sols durs uniquement à l’eau et à la vapeur, sans détergent, et il est prêt en une demi-minute.',
      pl: 'Mop parowy myje twarde podłogi samą wodą i parą, bez detergentów, i jest gotowy po pół minuty.',
      sv: 'En ångmopp rengör hårda golv med bara vatten och ånga, utan rengöringsmedel, och är klar på en halv minut.',
    },
    seo: {
      it: {
        keyphrase: 'scopa a vapore',
        title: 'Scopa a vapore: quale comprare nel {year}, secondo i test',
        description: 'Quale scopa a vapore comprare? Vedi subito il modello adatto a casa tua, con prezzo, risultati dei test indipendenti e dati ufficiali, tutto con fonte.',
      },
      fr: {
        keyphrase: 'balai vapeur',
        title: 'Balai vapeur : lequel choisir en {year}, selon les tests',
        description: 'Quel balai vapeur choisir ? Voyez tout de suite le modèle adapté à votre logement, avec prix, résultats des tests indépendants et données officielles.',
      },
      pl: {
        keyphrase: 'mop parowy',
        title: 'Mop parowy: jaki kupić w {year} roku? Wyniki testów',
        description: 'Jaki mop parowy kupić? Od razu zobacz model dopasowany do twojego domu, z ceną, wynikami niezależnych testów i oficjalnymi danymi, każda liczba ze źródłem.',
      },
      sv: {
        keyphrase: 'ångmopp',
        title: 'Ångmopp {year}: vilken ska du köpa? Enligt testerna',
        description: 'Vilken ångmopp ska du köpa? Se direkt modellen som passar ditt hem, med pris, resultat från oberoende tester och officiella uppgifter med källa.',
      },
    },
    heads: {
      choose: {
        it: 'La scopa a vapore giusta per casa tua',
        fr: 'Le balai vapeur qu’il vous faut',
        pl: 'Mop parowy dopasowany do twojego domu',
        sv: 'Rätt ångmopp för ditt hem',
      },
      others: {
        it: 'Anche queste scope a vapore vanno bene',
        fr: 'Ces balais vapeur conviennent aussi',
        pl: 'Te mopy parowe też się sprawdzą',
        sv: 'De här ångmopparna passar också',
      },
      good: {
        it: 'Una scopa a vapore fa per te se',
        fr: 'Un balai vapeur est fait pour vous si',
        pl: 'Mop parowy jest dla ciebie, jeśli',
        sv: 'En ångmopp passar dig om',
      },
      skip: {
        it: 'La scopa a vapore non fa per te se',
        fr: 'Oubliez le balai vapeur si',
        pl: 'Mop parowy nie jest dla ciebie, jeśli',
        sv: 'Hoppa över ångmoppen om',
      },
      how: {
        it: 'Come scegliere una scopa a vapore',
        fr: 'Comment choisir un balai vapeur',
        pl: 'Jak wybrać mop parowy',
        sv: 'Så väljer du ångmopp',
      },
      faq: {
        it: 'Domande frequenti sulla scopa a vapore',
        fr: 'Questions fréquentes sur le balai vapeur',
        pl: 'Najczęstsze pytania o mop parowy',
        sv: 'Vanliga frågor om ångmoppar',
      },
    },
    goodIf: {
      it: ['Hai pavimenti duri: piastrelle, gres, parquet verniciato.', 'Vuoi lavare senza detersivi, per esempio con bambini piccoli o animali.'],
      fr: ['Vous avez des sols durs : carrelage, grès, parquet vitrifié.', 'Vous voulez laver sans détergent, par exemple avec de jeunes enfants ou des animaux.'],
      pl: ['Masz twarde podłogi: płytki, gres, lakierowany parkiet.', 'Chcesz myć bez detergentów, na przykład przy małych dzieciach lub zwierzętach.'],
      sv: ['Du har hårda golv: klinker, sten, lackat parkettgolv.', 'Du vill rengöra utan rengöringsmedel, till exempel med små barn eller husdjur.'],
    },
    skipIf: {
      it: ['Hai legno cerato, oliato o non sigillato: il vapore lo rovina.', 'Ti serve anche aspirare: la scopa a vapore lava, ma non raccoglie briciole e polvere.'],
      fr: ['Vous avez du bois ciré, huilé ou non vitrifié : la vapeur l’abîme.', 'Vous devez aussi aspirer : le balai vapeur lave, mais ne ramasse ni miettes ni poussière.'],
      pl: ['Masz drewno woskowane, olejowane lub niezabezpieczone: para je niszczy.', 'Musisz też odkurzać: mop parowy myje, ale nie zbiera okruchów ani kurzu.'],
      sv: ['Du har vaxat, oljat eller obehandlat trä: ångan skadar det.', 'Du behöver också dammsuga: ångmoppen rengör men tar inte upp smulor och damm.'],
    },
    criteria: {
      it: [
        { t: 'Pronta subito', d: 'Le scope a vapore verticali sono pronte in circa 30 secondi: le accendi e parti.' },
        { t: 'Serbatoio e metri quadri', d: 'Guarda quanti m² lava con un pieno: per un appartamento normale conviene poterlo fare senza fermarsi.' },
        { t: 'Vapore regolabile', d: 'Meno vapore per il legno sigillato, più per le piastrelle: con un tasto sul manico è comodo.' },
      ],
      fr: [
        { t: 'Prêt tout de suite', d: 'Les balais vapeur sont prêts en 30 secondes environ : vous l’allumez et c’est parti.' },
        { t: 'Réservoir et mètres carrés', d: 'Regardez combien de m² il lave avec un plein : pour un appartement normal, mieux vaut le faire sans s’arrêter.' },
        { t: 'Vapeur réglable', d: 'Moins de vapeur pour le bois vitrifié, plus pour le carrelage : un bouton sur le manche, c’est pratique.' },
      ],
      pl: [
        { t: 'Od razu gotowy', d: 'Pionowe mopy parowe są gotowe po ok. 30 sekundach: włączasz i zaczynasz.' },
        { t: 'Zbiornik i metry kwadratowe', d: 'Sprawdź, ile m² umyje na jednym zbiorniku: w zwykłym mieszkaniu lepiej zrobić to bez przerwy.' },
        { t: 'Regulowana para', d: 'Mniej pary na lakierowane drewno, więcej na płytki: przycisk na rączce jest wygodny.' },
      ],
      sv: [
        { t: 'Klar direkt', d: 'Ångmoppar är klara på ungefär 30 sekunder: du slår på och sätter igång.' },
        { t: 'Tank och kvadratmeter', d: 'Se hur många m² den klarar på en tank: i en vanlig lägenhet är det skönt att slippa fylla på.' },
        { t: 'Justerbar ånga', d: 'Mindre ånga för lackat trä, mer för klinker: en knapp på handtaget är praktiskt.' },
      ],
    },
    needs: [
      {
        id: 'main',
        icon: 'target',
        label: { it: 'Per quasi tutte le case', fr: 'Pour presque tous les logements', pl: 'Do prawie każdego domu', sv: 'För nästan alla hem' },
        picks: [{ id: 'karcher-sc2-upright' }],
      },
      {
        id: 'light',
        icon: 'feather',
        label: { it: 'Leggera, per una casa piccola', fr: 'Léger, pour un petit logement', pl: 'Lekki, do małego mieszkania', sv: 'Lätt, för ett litet hem' },
        picks: [{ id: 'karcher-sc1-upright', markets: ['it', 'se'] }],
      },
    ],
    compare: ['heatup', 'area', 'power', 'weight'],
    faq: {
      it: [
        {
          q: 'La scopa a vapore disinfetta?',
          a: 'Kärcher dichiara che toglie fino al 99,999% dei virus e il 99,9% dei batteri dalle superfici dure, ma con il vapore al massimo tenuto 30 secondi sullo stesso punto. Passandola come si fa di solito, pulisce a fondo senza detersivi; per disinfettare un punto preciso bisogna fermarsi lì.',
        },
        {
          q: 'Si può usare sul parquet?',
          a: 'Solo sul legno sigillato, cioè verniciato o laccato, con il vapore al minimo e senza fermarsi a lungo nello stesso punto. Su legno cerato, oliato o grezzo no.',
        },
        {
          q: 'Serve l’acqua distillata?',
          a: 'Con questi Kärcher no: una cartuccia anticalcare toglie il calcare dall’acqua del rubinetto. Va cambiata ogni tanto.',
        },
      ],
      fr: [
        {
          q: 'Un balai vapeur désinfecte-t-il ?',
          a: 'Kärcher annonce jusqu’à 99,999 % des virus et 99,9 % des bactéries éliminés sur les surfaces dures, mais avec la vapeur au maximum pendant 30 secondes au même endroit. Passé comme d’habitude, il nettoie en profondeur sans détergent ; pour désinfecter un point précis, il faut s’y arrêter.',
        },
        {
          q: 'Peut-on l’utiliser sur du parquet ?',
          a: 'Seulement sur du bois vitrifié ou verni, vapeur au minimum et sans rester longtemps au même endroit. Pas sur du bois ciré, huilé ou brut.',
        },
        {
          q: 'Faut-il de l’eau déminéralisée ?',
          a: 'Pas avec ces Kärcher : une cartouche anticalcaire retire le calcaire de l’eau du robinet. Elle se change de temps en temps.',
        },
      ],
      pl: [
        {
          q: 'Czy mop parowy dezynfekuje?',
          a: 'Kärcher deklaruje usuwanie do 99,999% wirusów i 99,9% bakterii z twardych powierzchni, ale przy maksymalnej parze przez 30 sekund w jednym miejscu. Przy zwykłym myciu czyści dokładnie bez detergentów; żeby zdezynfekować konkretne miejsce, trzeba się przy nim zatrzymać.',
        },
        {
          q: 'Czy można go używać na parkiecie?',
          a: 'Tylko na drewnie zabezpieczonym lakierem, na najniższej parze i bez długiego stania w jednym miejscu. Nie na drewnie woskowanym, olejowanym ani surowym.',
        },
        {
          q: 'Czy potrzebna jest woda destylowana?',
          a: 'Przy tych Kärcherach nie: wkład odkamieniający usuwa kamień z wody z kranu. Trzeba go co jakiś czas wymieniać.',
        },
      ],
      sv: [
        {
          q: 'Desinficerar en ångmopp?',
          a: 'Kärcher uppger att den tar bort upp till 99,999 % av virusen och 99,9 % av bakterierna från hårda ytor, men med max ånga i 30 sekunder på samma ställe. Använd som vanligt rengör den grundligt utan rengöringsmedel; för att desinficera en viss punkt måste du stanna där.',
        },
        {
          q: 'Kan man använda den på parkett?',
          a: 'Bara på lackat trä, med lägsta ånga och utan att stå länge på samma ställe. Inte på vaxat, oljat eller obehandlat trä.',
        },
        {
          q: 'Behövs destillerat vatten?',
          a: 'Inte med de här Kärcher: en avkalkningspatron tar bort kalken ur kranvattnet. Den byts ibland.',
        },
      ],
    },
    related: ['wet', 'stick'],
  },
};

const products: Product[] = [
  // ---------- Steam mops ----------
  {
    id: 'karcher-sc2-upright',
    category: 'steam',
    tier: 'mid',
    brand: 'Kärcher',
    name: { it: 'Kärcher SC 2 Upright', fr: 'Kärcher SC 2 Upright', es: 'Kärcher SC 2 Upright', pl: 'Kärcher SC 2 Upright', sv: 'Kärcher SC 2 Upright' },
    why: {
      it: 'La migliore tra 16 scope a vapore nel test, con voto «buono»: ha pulito a fondo e senza aloni, e con un serbatoio lava circa 50 m².',
      fr: 'Le meilleur de 16 balais vapeur testés, noté « bien » : il a nettoyé à fond et sans traces, et lave environ 50 m² par réservoir.',
      es: 'La mejor de 16 mopas de vapor en la prueba, con nota «bueno»: limpió a fondo y sin marcas, y friega unos 50 m² por depósito.',
      pl: 'Najlepszy z 16 mopów parowych w teście, z oceną „dobry”: umył dokładnie i bez smug, a na jednym zbiorniku myje ok. 50 m².',
      sv: 'Bäst av 16 ångmoppar i testet, med betyget ”bra”: den rengjorde grundligt och utan ränder, och klarar cirka 50 m² per tank.',
    },
    lab: {
      text: {
        it: 'primo su 16 nel test di Test-Achats, voto «buono», «ha pulito a fondo e senza aloni» (Stiftung Warentest, febbraio 2025)',
        fr: 'premier sur 16 au test de Test-Achats, note « bien », « a nettoyé à fond et sans traces » (Stiftung Warentest, février 2025)',
        es: 'primero de 16 en la prueba de Test-Achats, nota «bueno», «limpió a fondo y sin marcas» (Stiftung Warentest, febrero de 2025)',
        pl: 'pierwszy z 16 w teście Test-Achats, ocena „dobry”, „umył dokładnie i bez smug” (Stiftung Warentest, luty 2025)',
        sv: 'etta av 16 i Test-Achats test, betyget ”bra”, ”rengjorde grundligt och utan ränder” (Stiftung Warentest, februari 2025)',
      },
      source: SW_STEAM,
    },
    facts: [
      { key: 'heatup', value: { it: '30 secondi', fr: '30 secondes', es: '30 segundos', pl: '30 sekund', sv: '30 sekunder' }, source: KSC2.fr },
      { key: 'area', value: { it: 'Circa 50 m² (0,4 l)', fr: 'Environ 50 m² (0,4 l)', es: 'Unos 50 m² (0,4 l)', pl: 'Ok. 50 m² (0,4 l)', sv: 'Cirka 50 m² (0,4 l)' }, source: KSC2.fr },
      { key: 'power', value: num(1600, 'W'), source: KSC2.fr },
      { key: 'weight', value: { it: '2,5 kg', fr: '2,5 kg', es: '2,5 kg', pl: '2,5 kg', sv: '2,5 kg' }, source: KSC2.fr },
    ],
    search: { it: 'Kärcher SC 2 Upright', fr: 'Kärcher SC 2 Upright', es: 'Kärcher SC 2 Upright', pl: 'Kärcher SC 2 Upright', sv: 'Kärcher SC 2 Upright' },
    asin: { fr: 'B0CQTHYK7L' },
    price: {
      fr: { value: 134.99, source: KSC2.fr },
      pl: { value: 399, source: KSC2.pl },
      se: { value: 1449, source: KSC2.se },
    },
  },
  {
    id: 'karcher-sc1-upright',
    category: 'steam',
    tier: 'low',
    brand: 'Kärcher',
    name: { it: 'Kärcher SC 1 Upright', fr: 'Kärcher SC 1 Upright', es: 'Kärcher SC 1 Upright', pl: 'Kärcher SC 1 Upright', sv: 'Kärcher SC 1 Upright' },
    why: {
      it: 'Più leggera (2,1 kg) e sottile: nello stesso test ha pulito quasi come la SC 2, ma con meno vapore e una durata peggiore.',
      fr: 'Plus léger (2,1 kg) et fin : dans le même test, il a nettoyé presque aussi bien que le SC 2, mais avec moins de vapeur et une durabilité moindre.',
      es: 'Más ligera (2,1 kg) y fina: en la misma prueba limpió casi como la SC 2, pero con menos vapor y peor durabilidad.',
      pl: 'Lżejszy (2,1 kg) i smuklejszy: w tym samym teście czyścił prawie jak SC 2, ale z mniejszą ilością pary i gorszą trwałością.',
      sv: 'Lättare (2,1 kg) och smalare: i samma test rengjorde den nästan lika bra som SC 2, men med mindre ånga och sämre hållbarhet.',
    },
    lab: {
      text: {
        it: 'pulisce quasi come la SC 2, ma con meno vapore e durata peggiore (test di Test-Achats, Stiftung Warentest, febbraio 2025)',
        fr: 'nettoie presque comme le SC 2, mais avec moins de vapeur et une durabilité moindre (test de Test-Achats, Stiftung Warentest, février 2025)',
        es: 'limpia casi como la SC 2, pero con menos vapor y peor durabilidad (prueba de Test-Achats, Stiftung Warentest, febrero de 2025)',
        pl: 'czyści prawie jak SC 2, ale z mniejszą ilością pary i gorszą trwałością (test Test-Achats, Stiftung Warentest, luty 2025)',
        sv: 'rengör nästan som SC 2, men med mindre ånga och sämre hållbarhet (Test-Achats test, Stiftung Warentest, februari 2025)',
      },
      source: SW_STEAM,
    },
    facts: [
      { key: 'heatup', value: { it: '30 secondi', fr: '30 secondes', es: '30 segundos', pl: '30 sekund', sv: '30 sekunder' }, source: KSC1.it },
      { key: 'area', value: { it: 'Circa 30 m² (0,2 l)', fr: 'Environ 30 m² (0,2 l)', es: 'Unos 30 m² (0,2 l)', pl: 'Ok. 30 m² (0,2 l)', sv: 'Cirka 30 m² (0,2 l)' }, source: KSC1.it },
      { key: 'power', value: num(1300, 'W'), source: KSC1.it },
      { key: 'weight', value: { it: '2,1 kg', fr: '2,1 kg', es: '2,1 kg', pl: '2,1 kg', sv: '2,1 kg' }, source: KSC1.it },
    ],
    search: { it: 'Kärcher SC 1 Upright', fr: 'Kärcher SC 1 Upright', es: 'Kärcher SC 1 Upright', pl: 'Kärcher SC 1 Upright', sv: 'Kärcher SC 1 Upright' },
    asin: { it: 'B0CTQT42D9' },
    price: {
      it: { value: 108.99, source: KSC1.it },
      se: { value: 1099, source: KSC1.se },
    },
  },

  // ---------- Robots ----------
  {
    id: 'qrevo-curv-2-flow',
    category: 'robot',
    tier: 'mid',
    brand: 'Roborock',
    name: { it: 'Roborock Qrevo Curv 2 Flow', fr: 'Roborock Qrevo Curv 2 Flow', es: 'Roborock Qrevo Curv 2 Flow', pl: 'Roborock Qrevo Curv 2 Flow', sv: 'Roborock Qrevo Curv 2 Flow' },
    why: {
      it: 'Lava con un rullo che si risciacqua con acqua pulita mentre gira: i pavimenti restano lavati davvero, non solo umidi.',
      fr: 'Il lave avec un rouleau rincé à l’eau propre pendant qu’il tourne : les sols sont vraiment lavés, pas juste humides.',
      es: 'Friega con un rodillo que se aclara con agua limpia mientras gira: el suelo queda fregado de verdad, no solo húmedo.',
      pl: 'Myje wałkiem, który w trakcie pracy płucze się czystą wodą: podłoga jest naprawdę umyta, a nie tylko wilgotna.',
      sv: 'Moppar med en vals som sköljs med rent vatten medan den roterar: golvet blir verkligen rent, inte bara fuktigt.',
    },
    lab: {
      text: {
        it: 'miglior punteggio complessivo tra 7 robot di punta (The Hook Up, aprile 2026)',
        fr: 'meilleur score global parmi 7 robots haut de gamme (The Hook Up, avril 2026)',
        es: 'mejor puntuación global entre 7 robots de gama alta (The Hook Up, abril de 2026)',
        pl: 'najlepszy wynik ogólny wśród 7 flagowych robotów (The Hook Up, kwiecień 2026)',
        sv: 'högsta totalbetyget bland 7 toppmodeller (The Hook Up, april 2026)',
      },
      source: HOOKUP,
    },
    facts: [
      { key: 'suction', value: num(20000, 'Pa'), source: CURV2.it },
      { key: 'mop', value: { it: 'Rullo da 27 cm', fr: 'Rouleau de 27 cm', es: 'Rodillo de 27 cm', pl: 'Wałek 27 cm', sv: 'Moppvals 27 cm' }, source: CURV2.it },
      { key: 'mopwash', value: { it: 'Acqua a 75 °C', fr: 'Eau à 75 °C', es: 'Agua a 75 °C', pl: 'Woda 75 °C', sv: 'Vatten 75 °C' }, source: CURV2.it },
      { key: 'drying', value: { it: 'Aria a 55 °C', fr: 'Air à 55 °C', es: 'Aire a 55 °C', pl: 'Powietrze 55 °C', sv: 'Luft 55 °C' }, source: CURV2.it },
      {
        key: 'avoid',
        value: { it: 'Luce strutturata e fotocamera', fr: 'Lumière structurée et caméra', es: 'Luz estructurada y cámara', pl: 'Światło strukturalne i kamera', sv: 'Strukturerat ljus och kamera' },
        source: CURV2.it,
      },
    ],
    search: { it: 'Roborock Qrevo Curv 2 Flow', fr: 'Roborock Qrevo Curv 2 Flow', es: 'Roborock Qrevo Curv 2 Flow', pl: 'Roborock Qrevo Curv 2 Flow', sv: 'Roborock Qrevo Curv 2 Flow' },
    asin: { it: 'B0FS16B394', fr: 'B0FS16B394', es: 'B0FS16B394' },
    price: {
      it: { value: 899, source: CURV2.it },
      fr: { value: 799, source: CURV2.fr },
      es: { value: 899, source: CURV2.es },
      pl: { value: 3799, source: CURV2.pl },
      se: { value: 11490, source: CURV2.se },
    },
  },
  {
    id: 'ecovacs-t80s-omni',
    category: 'robot',
    tier: 'low',
    brand: 'Ecovacs',
    name: { it: 'Ecovacs Deebot T80S Omni', fr: 'Ecovacs Deebot T80S Omni' },
    why: {
      it: 'Lava con un rullo che si pulisce mentre gira, e la base lo lava in acqua calda e lo asciuga: l’essenziale per casa, spendendo meno.',
      fr: 'Il lave avec un rouleau qui se nettoie en tournant, et la station le lave à l’eau chaude puis le sèche : l’essentiel pour la maison, pour moins cher.',
    },
    lab: {
      text: {
        it: 'miglior robot economico nella classifica di 20 robot di Vacuum Wars (settembre 2026)',
        fr: 'meilleur robot petit budget du classement de 20 robots de Vacuum Wars (septembre 2026)',
      },
      source: VW_ROBOT,
    },
    facts: [
      { key: 'suction', value: num(24800, 'Pa'), source: T80S.it },
      { key: 'mop', value: { it: 'Rullo che si lava mentre gira', fr: 'Rouleau qui se lave en tournant' }, source: T80S.it },
      { key: 'mopwash', value: { it: 'In acqua calda fino a 75 °C', fr: 'À l’eau chaude jusqu’à 75 °C' }, source: T80S.it },
      { key: 'drying', value: { it: 'Aria a 63 °C', fr: 'Air à 63 °C' }, source: T80S.it },
      { key: 'avoid', value: { it: 'Telecamera con intelligenza artificiale', fr: 'Caméra avec intelligence artificielle' }, source: T80S.it },
    ],
    search: { it: 'Ecovacs Deebot T80S Omni', fr: 'Ecovacs Deebot T80S Omni' },
    price: {
      it: { value: 549, source: T80S.it },
      fr: { value: 399, source: T80S.fr },
    },
  },
  {
    id: 'narwal-flow-2',
    category: 'robot',
    tier: 'high',
    brand: 'Narwal',
    name: { it: 'Narwal Flow 2', fr: 'Narwal Flow 2', es: 'Narwal Flow 2', pl: 'Narwal Flow 2', sv: 'Narwal Flow 2' },
    why: {
      it: 'La spazzola a rullo su un solo lato manda peli e capelli dritti nel contenitore, e ha una modalità per le zone degli animali.',
      fr: 'Sa brosse à rouleau unilatérale envoie poils et cheveux droit dans le bac, et il a un mode dédié aux coins des animaux.',
      es: 'Su cepillo de rodillo de un solo lado manda pelos y cabellos directos al depósito, y tiene un modo para las zonas de las mascotas.',
      pl: 'Jednostronna szczotka wałkowa kieruje sierść i włosy prosto do pojemnika, a robot ma tryb dla miejsc, gdzie przebywają zwierzęta.',
      sv: 'Den ensidiga borstvalsen skickar päls och hår rakt in i behållaren, och den har ett läge för husdjurens platser.',
    },
    lab: {
      text: {
        it: 'ha raccolto il 100% dei peli, il migliore tra 7 robot di punta (The Hook Up, aprile 2026)',
        fr: 'a ramassé 100 % des poils, le meilleur parmi 7 robots haut de gamme (The Hook Up, avril 2026)',
        es: 'recogió el 100 % del pelo, el mejor entre 7 robots de gama alta (The Hook Up, abril de 2026)',
        pl: 'zebrał 100% sierści, najlepszy wśród 7 flagowych robotów (The Hook Up, kwiecień 2026)',
        sv: 'plockade upp 100 % av håren, bäst bland 7 toppmodeller (The Hook Up, april 2026)',
      },
      source: HOOKUP,
    },
    facts: [
      { key: 'suction', value: num(31000, 'Pa'), source: FLOW2_SPECS },
      { key: 'mop', value: { it: 'Rullo da 26,6 cm', fr: 'Rouleau de 26,6 cm', es: 'Rodillo de 26,6 cm', pl: 'Wałek 26,6 cm', sv: 'Moppvals 26,6 cm' }, source: FLOW2_SPECS },
      { key: 'mopwash', value: { it: 'Acqua a 100 °C', fr: 'Eau à 100 °C', es: 'Agua a 100 °C', pl: 'Woda 100 °C', sv: 'Vatten 100 °C' }, source: FLOW2_SPECS_IT },
      { key: 'drying', value: { it: 'Aria a 60 °C', fr: 'Air à 60 °C', es: 'Aire a 60 °C', pl: 'Powietrze 60 °C', sv: 'Luft 60 °C' }, source: FLOW2_SPECS },
      {
        key: 'avoid',
        value: { it: '2 fotocamere e luce strutturata', fr: '2 caméras et lumière structurée', es: '2 cámaras y luz estructurada', pl: '2 kamery i światło strukturalne', sv: '2 kameror och strukturerat ljus' },
        source: FLOW2_SPECS,
      },
    ],
    search: { it: 'Narwal Flow 2', fr: 'Narwal Flow 2', es: 'Narwal Flow 2', pl: 'Narwal Flow 2', sv: 'Narwal Flow 2' },
    asin: { it: 'B0GRHDJBQ6', fr: 'B0GRHDJBQ6', es: 'B0GRHDJBQ6', pl: 'B0GRHDJBQ6', se: 'B0GRHDJBQ6' },
    price: {
      it: { value: 1299, source: FLOW2_IT },
      fr: { value: 1299, source: FLOW2_FR },
    },
  },

  // ---------- Cordless sticks ----------
  {
    id: 'dyson-v15',
    category: 'stick',
    tier: 'high',
    brand: 'Dyson',
    name: {
      it: 'Dyson V15 Detect Absolute',
      fr: 'Dyson V15 Detect Absolute',
      es: 'Dyson V15 Detect Absolute',
      pl: 'Dyson V15 Detect Absolute',
      sv: 'Dyson V15 Detect Absolute',
    },
    why: {
      it: 'Una luce sulla spazzola mostra la polvere che non vedi e un sensore la conta mentre aspiri: sai quando hai finito davvero.',
      fr: 'Une lumière sur la brosse révèle la poussière invisible et un capteur la compte pendant que vous aspirez : vous savez quand c’est vraiment propre.',
      es: 'Una luz en el cepillo muestra el polvo que no ves y un sensor lo cuenta mientras aspiras: sabes cuándo has terminado de verdad.',
      pl: 'Światło na szczotce pokazuje niewidoczny kurz, a czujnik liczy go podczas odkurzania: wiesz, kiedy naprawdę jest czysto.',
      sv: 'Ett ljus på munstycket visar dammet du inte ser och en sensor räknar det medan du dammsuger: du vet när det verkligen är rent.',
    },
    lab: {
      text: {
        it: '1ª su 10 scope senza fili, prima nei test su tappeti e pavimenti duri (Vacuum Wars, settembre 2026)',
        fr: '1er sur 10 aspirateurs sans fil, en tête des tests sur tapis et sols durs (Vacuum Wars, septembre 2026)',
        es: '1.ª de 10 aspiradoras sin cable, primera en las pruebas en alfombra y suelo duro (Vacuum Wars, septiembre de 2026)',
        pl: '1. miejsce na 10 odkurzaczy bezprzewodowych, najlepszy na dywanach i twardych podłogach (Vacuum Wars, wrzesień 2026)',
        sv: 'etta av 10 sladdlösa dammsugare, bäst i testerna på mattor och hårda golv (Vacuum Wars, september 2026)',
      },
      source: VW_STICK,
    },
    facts: [
      { key: 'suction', value: '240 AW', source: V15.it },
      { key: 'runtime', value: { it: '60 minuti', fr: '60 minutes', es: '60 minutos', pl: '60 minut', sv: '60 minuter' }, source: V15.it },
      {
        key: 'dust',
        value: { it: 'Luce e sensore che conta le particelle', fr: 'Lumière et capteur de particules', es: 'Luz y sensor de partículas', pl: 'Światło i czujnik cząstek', sv: 'Ljus och partikelsensor' },
        source: V15.it,
      },
    ],
    search: {
      it: 'Dyson V15 Detect Absolute',
      fr: 'Dyson V15 Detect Absolute',
      es: 'Dyson V15 Detect Absolute',
      pl: 'Dyson V15 Detect Absolute',
      sv: 'Dyson V15 Detect Absolute',
    },
    asin: { it: 'B0BS1Q7RG5', fr: 'B0BS1Q7RG5', es: 'B0BS1Q7RG5' },
    // Only markets whose Dyson store answers our weekly price check (the others refuse automated
    // reads, and a price we cannot re-check every week is not shown).
    price: {
      pl: { value: 2699, source: V15.pl },
    },
  },
  {
    id: 'shark-powerdetect-ce',
    category: 'stick',
    tier: 'mid',
    brand: 'Shark',
    name: {
      it: 'Shark PowerDetect Clean & Empty',
      fr: 'Shark PowerDetect Clean & Empty',
      es: 'Shark PowerDetect Clean & Empty',
      pl: 'Shark PowerDetect Clean & Empty',
      sv: 'Shark PowerDetect Clean & Empty',
    },
    why: {
      it: 'Dopo ogni uso la base la ricarica e ne svuota il contenitore, e tiene la polvere fino a 45 giorni: non tocchi più lo sporco.',
      fr: 'Après chaque usage, la station le recharge et vide son bac, et garde la poussière jusqu’à 45 jours : vous ne touchez plus la saleté.',
      es: 'Después de cada uso, la base la carga y vacía su depósito, y guarda el polvo hasta 45 días: ya no tocas la suciedad.',
      pl: 'Po każdym użyciu stacja go ładuje i opróżnia pojemnik, a kurz trzyma do 45 dni: nie dotykasz już brudu.',
      sv: 'Efter varje användning laddar stationen den och tömmer behållaren, och den rymmer dammet i upp till 45 dagar: du rör aldrig smutsen.',
    },
    lab: {
      text: {
        it: '3ª su 10 scope senza fili nei test di Vacuum Wars, che l’aveva nominata la migliore del 2025 (versione americana IP3251, settembre 2026)',
        fr: '3e sur 10 aspirateurs sans fil aux tests de Vacuum Wars, qui l’avait élu meilleur de 2025 (version américaine IP3251, septembre 2026)',
        es: '3.ª de 10 aspiradoras sin cable en las pruebas de Vacuum Wars, que la eligió la mejor de 2025 (versión estadounidense IP3251, septiembre de 2026)',
        pl: '3. miejsce na 10 odkurzaczy bezprzewodowych w testach Vacuum Wars, które uznało go za najlepszy w 2025 roku (wersja amerykańska IP3251, wrzesień 2026)',
        sv: 'trea av 10 sladdlösa dammsugare i Vacuum Wars tester, som utsåg den till bäst 2025 (amerikansk version IP3251, september 2026)',
      },
      source: VW_STICK,
    },
    facts: [
      { key: 'runtime', value: { it: '70 minuti', fr: '70 minutes', es: '70 minutos', pl: '70 minut', sv: '70 minuter' }, source: SHARK_CE.it },
      {
        key: 'dust',
        value: {
          it: 'Base che la svuota, fino a 45 giorni',
          fr: 'Station qui le vide, jusqu’à 45 jours',
          es: 'Base que la vacía, hasta 45 días',
          pl: 'Stacja, która go opróżnia, do 45 dni',
          sv: 'Station som tömmer den, upp till 45 dagar',
        },
        source: SHARK_CE.it,
      },
    ],
    search: {
      it: 'Shark PowerDetect Clean & Empty IP3251EUT',
      fr: 'Shark PowerDetect Clean & Empty IP3251EUT',
      es: 'Shark PowerDetect Clean & Empty IP3251EUT',
      pl: 'Shark PowerDetect Clean & Empty IP3251EUT',
      sv: 'Shark PowerDetect Clean & Empty IP3251EUT',
    },
    price: {
      it: { value: 429.99, source: SHARK_CE.it },
      fr: { value: 399.99, source: SHARK_CE.fr },
      es: { value: 438, source: SHARK_CE.es },
      pl: { value: 1699.99, source: SHARK_CE.pl },
      se: { value: 4999, source: SHARK_CE.se },
    },
  },

  // ---------- Floor washers ----------
  {
    id: 'tineco-stretch-s6',
    category: 'wet',
    tier: 'mid',
    brand: 'Tineco',
    name: { it: 'Tineco FLOOR ONE Stretch S6', fr: 'Tineco FLOOR ONE Stretch S6', es: 'Tineco FLOOR ONE Stretch S6', pl: 'Tineco FLOOR ONE Stretch S6' },
    why: {
      it: 'Si piega fino a terra e arriva sotto letti e divani, poi si lava da sola con acqua a 70 °C.',
      fr: 'Il se couche jusqu’au sol pour passer sous les lits et les canapés, puis se lave tout seul à l’eau à 70 °C.',
      es: 'Se tumba hasta el suelo y llega bajo camas y sofás; luego se lava sola con agua a 70 °C.',
      pl: 'Kładzie się płasko i sięga pod łóżka i kanapy, a potem sam się myje wodą o temperaturze 70 °C.',
    },
    lab: {
      text: {
        it: '2ª su 10 lavapavimenti e la migliore per qualità-prezzo (Vacuum Wars, settembre 2026)',
        fr: '2e sur 10 aspirateurs laveurs et le meilleur rapport qualité-prix (Vacuum Wars, septembre 2026)',
        es: '2.ª de 10 aspiradoras fregona y la mejor en calidad-precio (Vacuum Wars, septiembre de 2026)',
        pl: '2. miejsce na 10 odkurzaczy myjących i najlepszy stosunek jakości do ceny (Vacuum Wars, wrzesień 2026)',
      },
      source: VW_WET,
    },
    facts: [
      { key: 'flat', value: { it: 'Si piega a 180°, alta 13 cm', fr: 'Se couche à 180°, 13 cm de haut', es: 'Se tumba a 180°, 13 cm de alto', pl: 'Kładzie się na 180°, 13 cm wysokości' }, source: S6.it },
      { key: 'selfclean', value: { it: 'Acqua e asciugatura a 70 °C', fr: 'Eau et séchage à 70 °C', es: 'Agua y secado a 70 °C', pl: 'Woda i suszenie 70 °C' }, source: S6.it },
    ],
    search: { it: 'Tineco Floor One Stretch S6', fr: 'Tineco Floor One Stretch S6', es: 'Tineco Floor One Stretch S6', pl: 'Tineco Floor One Stretch S6' },
    asin: { it: 'B0CW1QDRVV', fr: 'B0CW1QDRVV', es: 'B0CW1QDRVV' },
    price: {
      it: { value: 349, source: S6.it },
      fr: { value: 499, source: S6.fr },
      es: { value: 349, source: S6.es },
      pl: { value: 1699, source: S6.pl },
    },
  },
  {
    id: 'f25-ultra',
    category: 'wet',
    tier: 'high',
    brand: 'Roborock',
    name: { it: 'Roborock F25 Ultra', fr: 'Roborock F25 Ultra', es: 'Roborock F25 Ultra', pl: 'Roborock F25 Ultra' },
    why: {
      it: 'Vapore a 180 °C e acqua calda a 86 °C nella stessa macchina: per lo sporco secco e i pavimenti della cucina.',
      fr: 'Vapeur à 180 °C et eau chaude à 86 °C dans le même appareil : pour les taches sèches et les sols de cuisine.',
      es: 'Vapor a 180 °C y agua caliente a 86 °C en la misma máquina: para la suciedad seca y el suelo de la cocina.',
      pl: 'Para o temperaturze 180 °C i gorąca woda 86 °C w jednym urządzeniu: na zaschnięty brud i podłogę w kuchni.',
    },
    lab: {
      text: {
        it: '5ª su 10 lavapavimenti nei test di Vacuum Wars (settembre 2026)',
        fr: '5e sur 10 aspirateurs laveurs aux tests de Vacuum Wars (septembre 2026)',
        es: '5.ª de 10 aspiradoras fregonas en las pruebas de Vacuum Wars (septiembre de 2026)',
        pl: '5. miejsce na 10 odkurzaczy myjących w testach Vacuum Wars (wrzesień 2026)',
      },
      source: VW_WET,
    },
    facts: [
      { key: 'hot', value: { it: 'Vapore 180 °C, acqua 86 °C', fr: 'Vapeur 180 °C, eau 86 °C', es: 'Vapor 180 °C, agua 86 °C', pl: 'Para 180 °C, woda 86 °C' }, source: F25U.it },
      { key: 'selfclean', value: { it: 'Asciugatura ad aria a 95 °C', fr: 'Séchage à l’air à 95 °C', es: 'Secado por aire a 95 °C', pl: 'Suszenie powietrzem 95 °C' }, source: F25U.it },
    ],
    search: { it: 'Roborock F25 Ultra', fr: 'Roborock F25 Ultra', es: 'Roborock F25 Ultra', pl: 'Roborock F25 Ultra' },
    asin: { it: 'B0FFN4DQ9H', fr: 'B0FFN4DQ9H', es: 'B0FFN4DQ9H' },
    price: {
      it: { value: 699, source: F25U.it },
      fr: { value: 699, source: F25U.fr },
      es: { value: 799, source: F25U.es },
      pl: { value: 3499, source: F25U.pl },
    },
  },
];

// Written in Italian, French, Spanish, Polish and Swedish; English comes from the Italian (i18n-en.ts),
// and so do the other languages of the types and products a country does not sell (i18n-more.ts).
export const catalog = addLanguages(
  addLanguages({ checked: CHECKED, categoryIds, categories, products, factLabels, factHelp }, { en }, ['en'], 'it'),
  more,
  [],
  'it',
) satisfies Catalog;
