// CupVerdict product catalogue behind the quiz and the verdict pages.
// Rule: every fact carries the URL it was read from. No fact without a source.
import type { Catalog, Category, Product, T } from '../../lib/pack';
import { addLanguages } from '../../lib/translate';
import { extra } from './i18n-extra';
import { more } from './i18n-more';

const CHECKED = '2026-09-28';

const categoryIds = ['capsule', 'superautomatic', 'manual-espresso', 'moka', 'drip', 'manual-filter', 'grinder'] as const;

const factLabels: Record<string, T> = {
  tank: { en: 'Water tank', it: 'Serbatoio acqua', de: 'Wassertank' },
  pressure: { en: 'Pump', it: 'Pompa', de: 'Pumpe' },
  heatup: { en: 'Heat-up', it: 'Riscaldamento', de: 'Aufheizzeit' },
  milk: { en: 'Milk', it: 'Latte', de: 'Milch' },
  width: { en: 'Width', it: 'Larghezza', de: 'Breite' },
  portafilter: { en: 'Portafilter', it: 'Portafiltro', de: 'Siebträger' },
  grinder: { en: 'Grinder', it: 'Macinacaffè', de: 'Mahlwerk' },
  recipes: { en: 'Drinks', it: 'Bevande', de: 'Getränke' },
  capacity: { en: 'Capacity', it: 'Capacità', de: 'Kapazität' },
  brewtime: { en: 'Brew time', it: 'Tempo di preparazione', de: 'Brühzeit' },
  cert: { en: 'Certification', it: 'Certificazione', de: 'Zertifizierung' },
  material: { en: 'Material', it: 'Materiale', de: 'Material' },
  induction: { en: 'Induction', it: 'Induzione', de: 'Induktion' },
  sizes: { en: 'Sizes', it: 'Formati', de: 'Größen' },
  design: { en: 'Design', it: 'Design', de: 'Bauweise' },
};

const same = (s: string): T => ({ en: s, it: s, de: s });

const categories: Record<string, Category> = {
  capsule: {
    id: 'capsule',
    icon: 'capsule',
    slug: { en: 'capsule-coffee-machine', it: 'macchina-caffe-capsule', de: 'kapselmaschine' },
    name: { en: 'Capsule coffee machine', it: 'Macchina a capsule', de: 'Kapselmaschine' },
    title: {
      en: 'Which capsule coffee machine should you buy?',
      it: 'Quale macchina da caffè a capsule comprare?',
      de: 'Welche Kapselmaschine kaufen?',
      es: '¿Qué cafetera de cápsulas comprar?',
      pl: 'Jaki ekspres kapsułkowy kupić?',
      sv: 'Vilken kapselmaskin ska du köpa?',
    },
    line: {
      en: 'A capsule coffee machine makes good coffee in under a minute, with nothing to learn.',
      it: 'Una macchina da caffè a capsule fa un buon caffè in meno di un minuto, senza niente da imparare.',
      de: 'Eine Kapselmaschine macht guten Kaffee in unter einer Minute, ohne dass du etwas lernen musst.',
      es: 'Una cafetera de cápsulas hace un buen café en menos de un minuto, sin nada que aprender.',
      pl: 'Ekspres kapsułkowy robi dobrą kawę w niecałą minutę, bez żadnej nauki.',
      sv: 'En kapselmaskin gör bra kaffe på under en minut, utan att du behöver lära dig något.',
    },
    seo: {
      en: {
        keyphrase: 'capsule coffee machine',
        title: 'Capsule coffee machine: which one to buy in {year}',
        description: 'Which capsule coffee machine should you buy? Tell us how you drink it (espresso, cappuccino) and see the right model at once, with the facts and sources.',
      },
      it: {
        keyphrase: 'macchina da caffè a capsule',
        title: 'Macchina da caffè a capsule: quale comprare nel {year}',
        description: 'Quale macchina da caffè a capsule comprare? Dicci come lo bevi (espresso o cappuccino) e vedi subito il modello adatto, con dati e fonti verificate.',
      },
      de: {
        keyphrase: 'Kapselmaschine',
        title: 'Kapselmaschine: Welche kaufen? Kaufberatung {year}',
        description: 'Welche Kapselmaschine passt? Sag uns, wie du deinen Kaffee trinkst (Espresso, Cappuccino), und sieh sofort das passende Modell, mit Daten und Quellen.',
      },
      es: {
        keyphrase: 'cafetera de cápsulas',
        title: 'Cafetera de cápsulas: cuál comprar en {year} y por qué',
        description: '¿Qué cafetera de cápsulas comprar? Dinos cómo tomas el café (espresso, capuchino) y ve al momento el modelo adecuado, con datos y fuentes verificadas.',
      },
      pl: {
        keyphrase: 'ekspres kapsułkowy',
        title: 'Ekspres kapsułkowy: jaki kupić w {year} roku? Poradnik',
        description: 'Jaki ekspres kapsułkowy kupić? Powiedz, jak pijesz kawę (espresso, cappuccino), i od razu zobacz odpowiedni model, z danymi i źródłami.',
      },
      sv: {
        keyphrase: 'kapselmaskin',
        title: 'Kapselmaskin {year}: vilken ska du köpa? Vi guidar dig',
        description: 'Vilken kapselmaskin ska du köpa? Berätta hur du dricker kaffet (espresso, cappuccino) och se direkt rätt modell, med fakta och källor.',
      },
    },
    heads: {
      choose: {
        en: 'The right capsule coffee machine for you',
        it: 'La macchina da caffè a capsule giusta per te',
        de: 'Die passende Kapselmaschine für dich',
        es: 'La cafetera de cápsulas adecuada para ti',
        pl: 'Ekspres kapsułkowy dopasowany do ciebie',
        sv: 'Rätt kapselmaskin för dig',
      },
      others: {
        en: 'These capsule coffee machines also work',
        it: 'Anche queste macchine da caffè a capsule vanno bene',
        de: 'Diese Kapselmaschinen passen auch',
        es: 'Estas cafeteras de cápsulas también sirven',
        pl: 'Te ekspresy kapsułkowe też się sprawdzą',
        sv: 'De här kapselmaskinerna passar också',
      },
      good: {
        en: 'A capsule coffee machine suits you if',
        it: 'Una macchina da caffè a capsule fa per te se',
        de: 'Eine Kapselmaschine passt zu dir, wenn',
        es: 'Una cafetera de cápsulas te conviene si',
        pl: 'Ekspres kapsułkowy jest dla ciebie, jeśli',
        sv: 'En kapselmaskin passar dig om',
      },
      skip: {
        en: 'Skip the capsule coffee machine if',
        it: 'La macchina da caffè a capsule non fa per te se',
        de: 'Lass die Kapselmaschine weg, wenn',
        es: 'La cafetera de cápsulas no es para ti si',
        pl: 'Ekspres kapsułkowy nie jest dla ciebie, jeśli',
        sv: 'Hoppa över kapselmaskinen om',
      },
      how: {
        en: 'How to choose a capsule coffee machine',
        it: 'Come scegliere una macchina da caffè a capsule',
        de: 'So wählst du eine Kapselmaschine aus',
        es: 'Cómo elegir una cafetera de cápsulas',
        pl: 'Jak wybrać ekspres kapsułkowy',
        sv: 'Så väljer du kapselmaskin',
      },
      faq: {
        en: 'Capsule coffee machine questions',
        it: 'Domande frequenti sulla macchina da caffè a capsule',
        de: 'Häufige Fragen zur Kapselmaschine',
        es: 'Preguntas frecuentes sobre la cafetera de cápsulas',
        pl: 'Najczęstsze pytania o ekspres kapsułkowy',
        sv: 'Vanliga frågor om kapselmaskiner',
      },
    },
    goodIf: {
      en: ['You want zero effort and zero mess.', 'You drink one or two coffees a day.'],
      it: ['Vuoi zero fatica e zero sporco.', 'Bevi uno o due caffè al giorno.'],
      de: ['Du willst null Aufwand und keine Sauerei.', 'Du trinkst ein bis zwei Kaffee am Tag.'],
    },
    skipIf: {
      en: ['You drink many cups a day: with capsules each cup usually costs more.', 'You want to choose your own beans.'],
      it: ['Bevi molti caffè al giorno: con le capsule ogni tazza di solito costa di più.', 'Vuoi scegliere tu la miscela in chicchi.'],
      de: ['Du trinkst viele Tassen am Tag: Mit Kapseln kostet jede Tasse meist mehr.', 'Du willst deine Bohnen selbst aussuchen.'],
    },
    criteria: {
      en: [
        { t: 'Milk or no milk', d: 'Automatic milk systems add convenience, and cleaning.' },
        { t: 'Capsule system', d: 'Each machine only takes its own system: check which capsules you can buy easily.' },
        { t: 'Size', d: 'Compact models fit anywhere but have smaller water tanks.' },
      ],
      it: [
        { t: 'Latte sì o no', d: 'I sistemi automatici per il latte sono comodi, ma vanno puliti.' },
        { t: 'Sistema di capsule', d: 'Ogni macchina usa solo le capsule del suo sistema: controlla quali trovi facilmente.' },
        { t: 'Ingombro', d: 'I modelli compatti stanno ovunque ma hanno serbatoi più piccoli.' },
      ],
      de: [
        { t: 'Mit oder ohne Milch', d: 'Automatische Milchsysteme sind bequem, müssen aber gereinigt werden.' },
        { t: 'Kapselsystem', d: 'Jede Maschine nimmt nur ihr eigenes System: Prüfe, welche Kapseln du leicht bekommst.' },
        { t: 'Größe', d: 'Kompakte Modelle passen überall hin, haben aber kleinere Wassertanks.' },
      ],
    },
    needs: [
      {
        id: 'main',
        icon: 'latte',
        label: { en: 'Coffee and cappuccino', it: 'Caffè e cappuccino', de: 'Kaffee und Cappuccino' },
        picks: [{ id: 'lattissima-one' }],
      },
      {
        id: 'espresso',
        icon: 'espresso',
        label: { en: 'Just espresso, no milk', it: 'Solo caffè, niente latte', de: 'Nur Espresso, keine Milch' },
        picks: [{ id: 'essenza-mini' }],
      },
    ],
    faq: {
      en: [
        { q: 'Are capsules more expensive than beans?', a: 'Per cup, usually yes. If you drink several coffees a day, a bean-to-cup machine often costs less over time: our savings calculator shows when it pays back.' },
        { q: 'Can I use compatible capsules?', a: 'All three machines we recommend use the Nespresso Original system, which takes the compatible capsules sold in many supermarkets. The Vertuo system only takes its own capsules.' },
        { q: 'How often should I descale?', a: 'When the machine asks, or following the manual: how often depends on how hard your water is. Descaling keeps the temperature and the flow right.' },
      ],
      it: [
        { q: 'Le capsule costano più dei chicchi?', a: 'A tazza, di solito sì. Se bevi diversi caffè al giorno, una macchina a chicchi spesso costa meno nel tempo: il nostro calcolatore di risparmio mostra quando si ripaga.' },
        { q: 'Posso usare capsule compatibili?', a: 'Le tre macchine che consigliamo usano il sistema Nespresso Original, che accetta le capsule compatibili vendute in molti supermercati. Il sistema Vertuo accetta solo le sue.' },
        { q: 'Ogni quanto va decalcificata?', a: 'Quando lo chiede la macchina, o come indica il manuale: dipende da quanto è dura la tua acqua. Decalcificare mantiene giusti temperatura e flusso.' },
      ],
      de: [
        { q: 'Sind Kapseln teurer als Bohnen?', a: 'Pro Tasse meist ja. Wer mehrere Kaffees am Tag trinkt, fährt mit einem Vollautomaten oft günstiger: Unser Sparrechner zeigt, ab wann er sich lohnt.' },
        { q: 'Kann ich kompatible Kapseln verwenden?', a: 'Alle drei empfohlenen Maschinen nutzen das System Nespresso Original, das auch die kompatiblen Kapseln aus vielen Supermärkten nimmt. Das Vertuo-System nimmt nur eigene Kapseln.' },
        { q: 'Wie oft muss ich entkalken?', a: 'Wenn die Maschine es anzeigt oder laut Anleitung: Es hängt davon ab, wie hart dein Wasser ist. Entkalken hält Temperatur und Durchfluss richtig.' },
      ],
    },
    related: ['superautomatic', 'moka'],
  },
  superautomatic: {
    id: 'superautomatic',
    icon: 'machine',
    slug: { en: 'bean-to-cup-coffee-machine', it: 'macchina-caffe-automatica-chicchi', de: 'kaffeevollautomat' },
    name: { en: 'Bean-to-cup coffee machine', it: 'Macchina automatica a chicchi', de: 'Kaffeevollautomat' },
    title: {
      en: 'Which bean-to-cup coffee machine should you buy?',
      it: 'Quale macchina da caffè automatica comprare?',
      de: 'Welchen Kaffeevollautomaten kaufen?',
      es: '¿Qué cafetera superautomática comprar?',
      pl: 'Jaki ekspres automatyczny kupić?',
      sv: 'Vilken helautomatisk kaffemaskin ska du köpa?',
    },
    line: {
      en: 'A bean-to-cup coffee machine grinds fresh beans and makes the coffee at the push of a button.',
      it: 'Una macchina da caffè automatica macina i chicchi al momento e fa il caffè premendo un pulsante.',
      de: 'Ein Kaffeevollautomat mahlt die Bohnen frisch und macht den Kaffee auf Knopfdruck.',
      es: 'Una cafetera superautomática muele el grano al momento y hace el café con solo pulsar un botón.',
      pl: 'Ekspres automatyczny mieli świeże ziarna i robi kawę jednym przyciskiem.',
      sv: 'En helautomatisk kaffemaskin maler bönorna precis innan och gör kaffet med en knapptryckning.',
    },
    seo: {
      en: {
        keyphrase: 'bean to cup coffee machine',
        title: 'Bean-to-cup coffee machine: which one to buy in {year}',
        description: 'Which bean-to-cup coffee machine should you buy? Tell us if you want milk drinks at one touch and see the right model at once, with facts and sources.',
      },
      it: {
        keyphrase: 'macchina da caffè automatica',
        title: 'Macchina da caffè automatica: quale comprare nel {year}',
        description: 'Quale macchina da caffè automatica comprare? Dicci se vuoi il cappuccino con un tocco e vedi subito il modello adatto, con dati e fonti verificate.',
      },
      de: {
        keyphrase: 'Kaffeevollautomat',
        title: 'Kaffeevollautomat: Welcher lohnt sich? Kaufberatung {year}',
        description: 'Welcher Kaffeevollautomat passt? Sag uns, ob du Cappuccino per Knopfdruck willst, und sieh sofort das passende Modell, mit Daten und Quellen.',
      },
      es: {
        keyphrase: 'cafetera superautomática',
        title: 'Cafetera superautomática: cuál comprar en {year}',
        description: '¿Qué cafetera superautomática comprar? Dinos si quieres capuchino con un toque y ve al momento el modelo adecuado, con datos y fuentes verificadas.',
      },
      pl: {
        keyphrase: 'ekspres automatyczny',
        title: 'Ekspres automatyczny do kawy: jaki kupić w {year} roku?',
        description: 'Jaki ekspres automatyczny kupić? Powiedz, czy chcesz cappuccino jednym przyciskiem, i od razu zobacz odpowiedni model, z danymi i źródłami.',
      },
      sv: {
        keyphrase: 'helautomatisk kaffemaskin',
        title: 'Helautomatisk kaffemaskin {year}: vilken ska du köpa?',
        description: 'Vilken helautomatisk kaffemaskin ska du köpa? Berätta om du vill ha cappuccino med en knapp och se direkt rätt modell, med fakta och källor.',
      },
    },
    heads: {
      choose: {
        en: 'The right bean-to-cup coffee machine for you',
        it: 'La macchina da caffè automatica giusta per te',
        de: 'Der passende Kaffeevollautomat für dich',
        es: 'La cafetera superautomática adecuada para ti',
        pl: 'Ekspres automatyczny dopasowany do ciebie',
        sv: 'Rätt helautomatisk kaffemaskin för dig',
      },
      others: {
        en: 'These bean-to-cup coffee machines also work',
        it: 'Anche queste macchine da caffè automatiche vanno bene',
        de: 'Diese Kaffeevollautomaten passen auch',
        es: 'Estas cafeteras superautomáticas también sirven',
        pl: 'Te ekspresy automatyczne też się sprawdzą',
        sv: 'De här helautomatiska kaffemaskinerna passar också',
      },
      good: {
        en: 'A bean-to-cup coffee machine suits you if',
        it: 'Una macchina da caffè automatica fa per te se',
        de: 'Ein Kaffeevollautomat passt zu dir, wenn',
        es: 'Una cafetera superautomática te conviene si',
        pl: 'Ekspres automatyczny jest dla ciebie, jeśli',
        sv: 'En helautomatisk kaffemaskin passar dig om',
      },
      skip: {
        en: 'Skip the bean-to-cup coffee machine if',
        it: 'La macchina da caffè automatica non fa per te se',
        de: 'Lass den Kaffeevollautomaten weg, wenn',
        es: 'La cafetera superautomática no es para ti si',
        pl: 'Ekspres automatyczny nie jest dla ciebie, jeśli',
        sv: 'Hoppa över den helautomatiska kaffemaskinen om',
      },
      how: {
        en: 'How to choose a bean-to-cup coffee machine',
        it: 'Come scegliere una macchina da caffè automatica',
        de: 'So wählst du einen Kaffeevollautomaten aus',
        es: 'Cómo elegir una cafetera superautomática',
        pl: 'Jak wybrać ekspres automatyczny',
        sv: 'Så väljer du helautomatisk kaffemaskin',
      },
      faq: {
        en: 'Bean-to-cup coffee machine questions',
        it: 'Domande frequenti sulla macchina da caffè automatica',
        de: 'Häufige Fragen zum Kaffeevollautomaten',
        es: 'Preguntas frecuentes sobre la cafetera superautomática',
        pl: 'Najczęstsze pytania o ekspres automatyczny',
        sv: 'Vanliga frågor om helautomatiska kaffemaskiner',
      },
    },
    goodIf: {
      en: ['You want fresh-bean taste without barista skills.', 'Several people at home drink coffee.'],
      it: ['Vuoi il gusto dei chicchi freschi senza fare il barista.', 'In casa siete in tanti a bere caffè.'],
      de: ['Du willst frische Bohnen ohne Barista-Kenntnisse.', 'Bei dir trinken mehrere Personen Kaffee.'],
    },
    skipIf: {
      en: ['Counter space is tight: these machines are big.', 'You do not want regular cleaning and descaling.'],
      it: ['Hai poco spazio: sono macchine ingombranti.', 'Non vuoi pulizie e decalcificazioni periodiche.'],
      de: ['Du hast wenig Platz: Diese Maschinen sind groß.', 'Du willst keine regelmäßige Reinigung und Entkalkung.'],
    },
    criteria: {
      en: [
        { t: 'Milk system', d: 'A manual steam wand is simpler; an automatic system makes cappuccino at one touch.' },
        { t: 'Water tank', d: 'A bigger tank means fewer refills.' },
        { t: 'Cleaning', d: 'Check how the milk parts come apart: the fewer pieces, the easier.' },
      ],
      it: [
        { t: 'Sistema latte', d: 'La lancia manuale è più semplice; quello automatico fa il cappuccino con un tocco.' },
        { t: 'Serbatoio', d: 'Più è grande, meno volte lo riempi.' },
        { t: 'Pulizia', d: 'Guarda come si smontano le parti del latte: meno pezzi, meno fatica.' },
      ],
      de: [
        { t: 'Milchsystem', d: 'Eine manuelle Dampfdüse ist einfacher; ein automatisches System macht Cappuccino per Knopfdruck.' },
        { t: 'Wassertank', d: 'Ein größerer Tank heißt seltener nachfüllen.' },
        { t: 'Reinigung', d: 'Achte darauf, wie sich die Milchteile zerlegen lassen: Je weniger Teile, desto einfacher.' },
      ],
    },
    needs: [
      {
        id: 'main',
        icon: 'machine',
        label: { en: 'Cappuccino at one touch', it: 'Cappuccino con un tocco', de: 'Cappuccino per Knopfdruck' },
        picks: [
          { id: 'magnifica-start', markets: ['it', 'de'] },
          { id: 'rivelia', tag: { en: 'Top grade in 2024, two bean hoppers', it: 'Voto più alto nel 2024, due contenitori per chicchi', de: 'Testsieger 2024, zwei Bohnenbehälter', es: 'Mejor nota en 2024, dos depósitos de granos', pl: 'Najlepsza ocena w 2024, dwa pojemniki na ziarna', sv: 'Bäst i test 2024, två bönbehållare' } },
        ],
      },
      {
        id: 'auto',
        icon: 'tap',
        label: { en: 'More drinks, iced ones too', it: 'Più bevande, anche fredde', de: 'Mehr Getränke, auch kalte', es: 'Más bebidas, también frías', pl: 'Więcej napojów, także zimnych', sv: 'Fler drycker, även kalla' },
        picks: [{ id: 'eletta-explore' }],
      },
    ],
    faq: {
      en: [
        { q: 'Is a bean-to-cup machine worth it?', a: 'If you drink two or more coffees a day, usually yes: beans cost less per cup than capsules, and every coffee is ground fresh at the touch of a button.' },
        { q: 'How much cleaning does it need?', a: 'Empty the grounds and the drip tray every few days, rinse the milk system after use and descale when asked. That is the price of fresh coffee at a touch.' },
        { q: 'Can it make cappuccino?', a: 'Yes: all our picks make cappuccino by themselves, at one touch, with a LatteCrema milk jug. The Eletta Explore also makes iced drinks and cold brew.' },
      ],
      it: [
        { q: 'Conviene una macchina automatica a chicchi?', a: 'Se bevi due o più caffè al giorno, di solito sì: i chicchi costano meno delle capsule a tazza, e ogni caffè è macinato al momento con un tasto.' },
        { q: 'Quanta pulizia richiede?', a: 'Svuota fondi e vaschetta ogni pochi giorni, sciacqua il sistema del latte dopo l’uso e decalcifica quando lo chiede. È il prezzo del caffè fresco con un tasto.' },
        { q: 'Fa anche il cappuccino?', a: 'Sì: tutte le nostre scelte fanno il cappuccino da sole, con un tasto, grazie alla caraffa LatteCrema. La Eletta Explore fa anche bevande fredde e cold brew.' },
      ],
      de: [
        { q: 'Lohnt sich ein Kaffeevollautomat?', a: 'Ab zwei Kaffees am Tag meist ja: Bohnen kosten pro Tasse weniger als Kapseln, und jeder Kaffee wird auf Knopfdruck frisch gemahlen.' },
        { q: 'Wie viel Pflege braucht er?', a: 'Trester und Tropfschale alle paar Tage leeren, das Milchsystem nach dem Gebrauch spülen und entkalken, wenn er es anzeigt. Das ist der Preis für frischen Kaffee auf Knopfdruck.' },
        { q: 'Macht er auch Cappuccino?', a: 'Ja: Alle unsere Empfehlungen machen Cappuccino selbst, per Knopfdruck, mit dem LatteCrema-Milchbehälter. Die Eletta Explore macht auch kalte Getränke und Cold Brew.' },
      ],
    },
    related: ['capsule', 'manual-espresso'],
  },
  'manual-espresso': {
    id: 'manual-espresso',
    // Not in ES, PL, SV: the main pick (Sage) has no official sale there.
    markets: ['us', 'gb', 'it', 'de'],
    icon: 'portafilter',
    slug: { en: 'espresso-machine', it: 'macchina-espresso-manuale', de: 'siebtraegermaschine' },
    name: { en: 'Espresso machine', it: 'Macchina espresso manuale', de: 'Siebträgermaschine' },
    title: {
      en: 'Which espresso machine should a beginner buy?',
      it: 'Quale macchina da espresso manuale comprare?',
      de: 'Welche Siebträgermaschine für Einsteiger kaufen?',
    },
    line: {
      en: 'An espresso machine makes espresso the way a café does, and you get the fun of making it.',
      it: 'Una macchina da espresso manuale fa l’espresso come al bar, e ti dà il gusto di farlo da te.',
      de: 'Eine Siebträgermaschine macht Espresso wie im Café, und du hast die Freude am Selbermachen.',
    },
    seo: {
      en: {
        keyphrase: 'espresso machine',
        title: 'Espresso machine for beginners: which to buy in {year}',
        description: 'Which espresso machine should you buy to start? See the one that makes learning easy, with its independent test result, the facts and the sources.',
      },
      it: {
        keyphrase: 'macchina espresso manuale',
        title: 'Macchina da espresso manuale: quale comprare nel {year}',
        description: 'Quale macchina da espresso manuale comprare per iniziare? Vedi subito quella che fa imparare senza fatica, con il risultato del test e le fonti.',
      },
      de: {
        keyphrase: 'Siebträgermaschine',
        title: 'Siebträgermaschine für Einsteiger: Welche kaufen? ({year})',
        description: 'Welche Siebträgermaschine für den Einstieg? Sieh sofort die, mit der das Lernen leicht fällt, mit dem Ergebnis des Tests und geprüften Quellen.',
      },
    },
    heads: {
      choose: {
        en: 'The right espresso machine for you',
        it: 'La macchina da espresso manuale giusta per te',
        de: 'Die passende Siebträgermaschine für dich',
      },
      others: {
        en: 'These espresso machines also work',
        it: 'Anche queste macchine da espresso manuali vanno bene',
        de: 'Diese Siebträgermaschinen passen auch',
      },
      good: {
        en: 'An espresso machine suits you if',
        it: 'Una macchina da espresso manuale fa per te se',
        de: 'Eine Siebträgermaschine passt zu dir, wenn',
      },
      skip: {
        en: 'Skip the espresso machine if',
        it: 'La macchina da espresso manuale non fa per te se',
        de: 'Lass die Siebträgermaschine weg, wenn',
      },
      how: {
        en: 'How to choose an espresso machine',
        it: 'Come scegliere una macchina da espresso manuale',
        de: 'So wählst du eine Siebträgermaschine aus',
      },
      faq: {
        en: 'Espresso machine questions',
        it: 'Domande frequenti sulla macchina da espresso manuale',
        de: 'Häufige Fragen zur Siebträgermaschine',
      },
    },
    goodIf: {
      en: ['You enjoy the ritual and want to learn.', 'You love cappuccino and want to steam milk yourself.'],
      it: ['Ti piace il rituale e vuoi imparare.', 'Ami il cappuccino e vuoi montare il latte da te.'],
      de: ['Du magst das Ritual und willst lernen.', 'Du liebst Cappuccino und willst Milch selbst aufschäumen.'],
    },
    skipIf: {
      en: ['You want coffee in one tap every morning.', 'You do not want to buy a grinder too (unless the machine has one built in).'],
      it: ['Vuoi il caffè con un tocco ogni mattina.', 'Non vuoi comprare anche un macinacaffè (salvo i modelli che lo hanno integrato).'],
      de: ['Du willst jeden Morgen Kaffee per Knopfdruck.', 'Du willst nicht zusätzlich eine Mühle kaufen (außer bei Modellen mit Mahlwerk).'],
    },
    criteria: {
      en: [
        { t: 'Heat-up time', d: 'Fast-heating systems are ready in seconds instead of minutes.' },
        { t: 'Steam wand', d: 'An automatic wand textures milk for you; a manual one takes practice.' },
        { t: 'Grinder', d: 'Fresh grinding matters: budget for a grinder or pick a model with one built in.' },
      ],
      it: [
        { t: 'Tempo di riscaldamento', d: 'I sistemi rapidi sono pronti in secondi invece che in minuti.' },
        { t: 'Lancia vapore', d: 'Quella automatica monta il latte da sola; quella manuale richiede pratica.' },
        { t: 'Macinacaffè', d: 'La macinatura fresca conta: prevedi un macinacaffè o scegli un modello che lo ha integrato.' },
      ],
      de: [
        { t: 'Aufheizzeit', d: 'Schnelle Heizsysteme sind in Sekunden statt Minuten bereit.' },
        { t: 'Dampflanze', d: 'Eine automatische schäumt die Milch für dich auf; eine manuelle braucht Übung.' },
        { t: 'Mühle', d: 'Frisch mahlen ist wichtig: Plane eine Mühle ein oder nimm ein Modell mit Mahlwerk.' },
      ],
    },
    needs: [
      {
        id: 'main',
        icon: 'portafilter',
        label: { en: 'Learning espresso the easy way', it: 'Imparare l’espresso senza fatica', de: 'Espresso einfach lernen' },
        picks: [{ id: 'bambino-plus' }],
      },
    ],
    faq: {
      en: [
        { q: 'Do I need a grinder?', a: 'For fresh espresso, yes, unless you buy coffee already ground for espresso. It has to grind fine and evenly: see our coffee grinder picks.' },
        { q: 'Is it hard to learn?', a: 'A few days of practice: dose, tamp and time the shot. The Bambino Plus textures the milk by itself, which takes away the hardest part.' },
        { q: 'How long does it take to heat up?', a: 'It depends on the heating system: the Bambino Plus is ready in 3 seconds; machines with a boiler take several minutes.' },
      ],
      it: [
        { q: 'Serve un macinacaffè?', a: 'Per un espresso fresco sì, a meno di comprare caffè già macinato per espresso. Deve macinare fine e in modo uniforme: vedi le nostre scelte di macinacaffè.' },
        { q: 'È difficile imparare?', a: 'Qualche giorno di pratica: dose, pressatura e tempo di estrazione. La Bambino Plus monta il latte da sola, e toglie la parte più difficile.' },
        { q: 'Quanto ci mette a scaldarsi?', a: 'Dipende dal sistema di riscaldamento: la Bambino Plus è pronta in 3 secondi; le macchine con caldaia impiegano diversi minuti.' },
      ],
      de: [
        { q: 'Brauche ich eine Mühle?', a: 'Für frischen Espresso ja, außer du kaufst gemahlenen Espresso. Die Mühle muss fein und gleichmäßig mahlen: siehe unsere Empfehlungen für Kaffeemühlen.' },
        { q: 'Ist das schwer zu lernen?', a: 'Ein paar Tage Übung: dosieren, tampen, Bezugszeit. Die Bambino Plus schäumt die Milch selbst auf und nimmt dir den schwierigsten Teil ab.' },
        { q: 'Wie lange heizt sie auf?', a: 'Das hängt vom Heizsystem ab: Die Bambino Plus ist in 3 Sekunden bereit; Maschinen mit Boiler brauchen mehrere Minuten.' },
      ],
    },
    related: ['superautomatic', 'moka', 'grinder'],
  },
  moka: {
    id: 'moka',
    icon: 'moka',
    slug: { en: 'moka-pot', it: 'moka', de: 'espressokocher' },
    name: { en: 'Moka pot', it: 'Moka', de: 'Espressokocher (Moka)' },
    title: {
      en: 'Which moka pot should you buy?',
      it: 'Quale moka comprare?',
      de: 'Welchen Espressokocher kaufen?',
      es: '¿Qué cafetera italiana comprar?',
      pl: 'Jaką kawiarkę kupić?',
      sv: 'Vilken mokabryggare ska du köpa?',
    },
    line: {
      en: 'A moka pot makes Italian stovetop coffee: small outlay, big flavour.',
      it: 'La moka fa il caffè all’italiana sul fornello: poca spesa, tanto gusto.',
      de: 'Ein Espressokocher macht italienischen Kaffee auf dem Herd: kleiner Preis, kräftiger Geschmack.',
      es: 'La cafetera italiana hace el café en el fuego: poco gasto y mucho sabor.',
      pl: 'Kawiarka robi włoską kawę na kuchence: mały wydatek, dużo smaku.',
      sv: 'En mokabryggare gör italienskt kaffe på spisen: liten kostnad, mycket smak.',
    },
    seo: {
      en: {
        keyphrase: 'moka pot',
        title: 'Moka pot: which one to buy in {year} (induction too)',
        description: 'Which moka pot should you buy? Classic, more crema or for an induction hob: see the right model at once, with the facts and sources checked.',
      },
      it: {
        keyphrase: 'moka',
        title: 'Moka: quale comprare nel {year}, anche per induzione',
        description: 'Quale moka comprare? Classica, con più crema o per il piano a induzione: vedi subito il modello adatto, con dati e fonti verificate.',
      },
      de: {
        keyphrase: 'Espressokocher',
        title: 'Espressokocher: Welcher lohnt sich? Auch für Induktion ({year})',
        description: 'Welcher Espressokocher passt? Klassisch, mit mehr Crema oder für Induktion: sieh sofort das passende Modell, mit geprüften Daten und Quellen.',
      },
      es: {
        keyphrase: 'cafetera italiana',
        title: 'Cafetera italiana: cuál comprar en {year} (también inducción)',
        description: '¿Qué cafetera italiana comprar? Clásica, con más crema o para inducción: ve al momento el modelo adecuado, con datos y fuentes verificadas.',
      },
      pl: {
        keyphrase: 'kawiarka',
        title: 'Kawiarka: jaką kupić w {year} roku? Także na indukcję',
        description: 'Jaką kawiarkę kupić? Klasyczną, z większą cremą czy na indukcję: od razu zobacz odpowiedni model, ze sprawdzonymi danymi i źródłami.',
      },
      sv: {
        keyphrase: 'mokabryggare',
        title: 'Mokabryggare {year}: vilken ska du köpa? Även för induktion',
        description: 'Vilken mokabryggare ska du köpa? Klassisk, med mer crema eller för induktion: se direkt rätt modell, med kontrollerade fakta och källor.',
      },
    },
    heads: {
      choose: {
        en: 'The right moka pot for you',
        it: 'La moka giusta per te',
        de: 'Der passende Espressokocher für dich',
        es: 'La cafetera italiana adecuada para ti',
        pl: 'Kawiarka dopasowana do ciebie',
        sv: 'Rätt mokabryggare för dig',
      },
      others: {
        en: 'These moka pots also work',
        it: 'Anche queste moka vanno bene',
        de: 'Diese Espressokocher passen auch',
        es: 'Estas cafeteras italianas también sirven',
        pl: 'Te kawiarki też się sprawdzą',
        sv: 'De här mokabryggarna passar också',
      },
      good: {
        en: 'A moka pot suits you if',
        it: 'La moka fa per te se',
        de: 'Ein Espressokocher passt zu dir, wenn',
        es: 'La cafetera italiana te conviene si',
        pl: 'Kawiarka jest dla ciebie, jeśli',
        sv: 'En mokabryggare passar dig om',
      },
      skip: {
        en: 'Skip the moka pot if',
        it: 'La moka non fa per te se',
        de: 'Lass den Espressokocher weg, wenn',
        es: 'La cafetera italiana no es para ti si',
        pl: 'Kawiarka nie jest dla ciebie, jeśli',
        sv: 'Hoppa över mokabryggaren om',
      },
      how: {
        en: 'How to choose a moka pot',
        it: 'Come scegliere la moka',
        de: 'So wählst du einen Espressokocher aus',
        es: 'Cómo elegir una cafetera italiana',
        pl: 'Jak wybrać kawiarkę',
        sv: 'Så väljer du mokabryggare',
      },
      faq: {
        en: 'Moka pot questions',
        it: 'Domande frequenti sulla moka',
        de: 'Häufige Fragen zum Espressokocher',
        es: 'Preguntas frecuentes sobre la cafetera italiana',
        pl: 'Najczęstsze pytania o kawiarkę',
        sv: 'Vanliga frågor om mokabryggare',
      },
    },
    goodIf: {
      en: ['You like strong, intense coffee.', 'You want no electronics and no capsules.'],
      it: ['Ti piace il caffè forte e intenso.', 'Non vuoi elettronica né capsule.'],
      de: ['Du magst starken, intensiven Kaffee.', 'Du willst keine Elektronik und keine Kapseln.'],
    },
    skipIf: {
      en: ['You want milk drinks at the touch of a button.', 'You cook on induction and want neither a steel pot nor an adapter.'],
      it: ['Vuoi bevande al latte con un tocco.', "Cucini sull'induzione e non vuoi né una moka in acciaio né un adattatore."],
      de: ['Du willst Milchgetränke per Knopfdruck.', 'Du kochst auf Induktion und willst weder Stahlkanne noch Adapter.'],
    },
    criteria: {
      en: [
        { t: 'Your hob', d: 'Aluminium pots need an adapter on induction; steel ones work directly.' },
        { t: 'Size', d: 'Moka sizes count small espresso cups: pick the size you will fill every time.' },
        { t: 'Material', d: 'Aluminium heats fast; steel is heavier and suits induction.' },
      ],
      it: [
        { t: 'Il tuo fornello', d: "Sull'induzione le moke in alluminio vogliono un adattatore; quelle in acciaio funzionano direttamente." },
        { t: 'Formato', d: 'Le tazze della moka sono tazzine da caffè: scegli il formato che riempirai sempre.' },
        { t: 'Materiale', d: "L'alluminio si scalda in fretta; l'acciaio è più pesante e va bene sull'induzione." },
      ],
      de: [
        { t: 'Dein Herd', d: 'Alukannen brauchen auf Induktion einen Adapter; Stahlkannen funktionieren direkt.' },
        { t: 'Größe', d: 'Die Tassenangabe meint kleine Espressotassen: Nimm die Größe, die du jedes Mal füllst.' },
        { t: 'Material', d: 'Aluminium wird schnell heiß; Stahl ist schwerer und passt zu Induktion.' },
      ],
    },
    needs: [
      {
        id: 'main',
        icon: 'moka',
        label: { en: 'The classic moka pot', it: 'La moka classica', de: 'Der klassische Espressokocher' },
        picks: [{ id: 'moka-express' }],
      },
      {
        id: 'crema',
        icon: 'espresso',
        label: { en: 'A thicker crema', it: 'Più crema', de: 'Mehr Crema' },
        picks: [{ id: 'brikka' }],
      },
      {
        id: 'induction',
        icon: 'bolt',
        label: { en: 'Induction hob', it: 'Piano a induzione', de: 'Induktionsherd' },
        picks: [{ id: 'venus' }],
      },
    ],
    faq: {
      en: [
        { q: 'Which size should I buy?', a: 'The cup count means small espresso cups. Buy the size you will fill every time: a moka works best full.' },
        { q: 'Does it work on induction?', a: 'The classic aluminium Moka Express only with an adapter plate; the stainless-steel Venus works directly.' },
        { q: 'How do I clean it?', a: 'Rinse it with water only and let it dry open. Detergent and the dishwasher dull aluminium and change the taste.' },
      ],
      it: [
        { q: 'Quale misura comprare?', a: 'Le tazze indicate sono tazzine da caffè. Prendi la misura che riempirai ogni volta: la moka rende meglio piena.' },
        { q: 'Funziona sull’induzione?', a: 'La classica Moka Express in alluminio solo con un piattello adattatore; la Venus in acciaio inox funziona direttamente.' },
        { q: 'Come si pulisce?', a: 'Solo con acqua, poi lasciala asciugare aperta. Detersivo e lavastoviglie opacizzano l’alluminio e cambiano il sapore.' },
      ],
      de: [
        { q: 'Welche Größe soll ich kaufen?', a: 'Die Tassenangabe meint kleine Espressotassen. Nimm die Größe, die du jedes Mal füllst: Ein Espressokocher arbeitet voll am besten.' },
        { q: 'Funktioniert er auf Induktion?', a: 'Der klassische Moka Express aus Aluminium nur mit Adapterplatte; der Venus aus Edelstahl funktioniert direkt.' },
        { q: 'Wie reinige ich ihn?', a: 'Nur mit Wasser ausspülen und offen trocknen lassen. Spülmittel und Spülmaschine machen Aluminium stumpf und verändern den Geschmack.' },
      ],
    },
    related: ['manual-espresso', 'manual-filter', 'grinder'],
  },
  drip: {
    id: 'drip',
    icon: 'drip',
    slug: { en: 'drip-coffee-maker', it: 'macchina-caffe-filtro', de: 'filterkaffeemaschine' },
    name: { en: 'Drip coffee maker', it: 'Macchina per caffè filtro', de: 'Filterkaffeemaschine' },
    title: {
      en: 'Which drip coffee maker should you buy?',
      it: 'Quale macchina per caffè filtro comprare?',
      de: 'Welche Filterkaffeemaschine kaufen?',
      es: '¿Qué cafetera de goteo comprar?',
      pl: 'Jaki ekspres przelewowy kupić?',
      sv: 'Vilken kaffebryggare ska du köpa?',
    },
    line: {
      en: 'A drip coffee maker makes a full jug of coffee for everyone, with one button.',
      it: 'Una macchina per caffè filtro fa una caraffa di caffè per tutti, con un pulsante.',
      de: 'Eine Filterkaffeemaschine macht eine ganze Kanne Kaffee für alle, mit einem Knopf.',
      es: 'Una cafetera de goteo hace una jarra de café para todos, con un solo botón.',
      pl: 'Ekspres przelewowy robi cały dzbanek kawy dla wszystkich, jednym przyciskiem.',
      sv: 'En kaffebryggare gör en hel kanna kaffe till alla, med en knapp.',
    },
    seo: {
      en: {
        keyphrase: 'drip coffee maker',
        title: 'Drip coffee maker: which one to buy in {year}, and why',
        description: 'Which drip coffee maker should you buy? See the right model at once, with its certification, jug size and the facts and sources checked for you.',
      },
      it: {
        keyphrase: 'macchina caffè filtro',
        title: 'Macchina per caffè filtro: quale comprare nel {year}',
        description: 'Quale macchina per caffè filtro comprare? Vedi subito il modello adatto, con certificazione, capacità della caraffa, dati e fonti verificate.',
      },
      de: {
        keyphrase: 'Filterkaffeemaschine',
        title: 'Filterkaffeemaschine: Welche kaufen? Kaufberatung {year}',
        description: 'Welche Filterkaffeemaschine kaufen? Sieh sofort das passende Modell, mit Zertifizierung, Kannengröße und geprüften Daten und Quellen.',
      },
      es: {
        keyphrase: 'cafetera de goteo',
        title: 'Cafetera de goteo: cuál comprar en {year} y por qué',
        description: '¿Qué cafetera de goteo comprar? Ve al momento el modelo adecuado, con certificación, tamaño de la jarra y datos y fuentes verificadas.',
      },
      pl: {
        keyphrase: 'ekspres przelewowy',
        title: 'Ekspres przelewowy: jaki kupić w {year} roku? Poradnik',
        description: 'Jaki ekspres przelewowy kupić? Od razu zobacz odpowiedni model, z certyfikatem, pojemnością dzbanka oraz sprawdzonymi danymi i źródłami.',
      },
      sv: {
        keyphrase: 'kaffebryggare',
        title: 'Kaffebryggare {year}: vilken ska du köpa? Vi guidar dig',
        description: 'Vilken kaffebryggare ska du köpa? Se direkt rätt modell, med certifiering, kannans storlek och kontrollerade fakta och källor.',
      },
    },
    heads: {
      choose: {
        en: 'The right drip coffee maker for you',
        it: 'La macchina per caffè filtro giusta per te',
        de: 'Die passende Filterkaffeemaschine für dich',
        es: 'La cafetera de goteo adecuada para ti',
        pl: 'Ekspres przelewowy dopasowany do ciebie',
        sv: 'Rätt kaffebryggare för dig',
      },
      others: {
        en: 'These drip coffee makers also work',
        it: 'Anche queste macchine per caffè filtro vanno bene',
        de: 'Diese Filterkaffeemaschinen passen auch',
        es: 'Estas cafeteras de goteo también sirven',
        pl: 'Te ekspresy przelewowe też się sprawdzą',
        sv: 'De här kaffebryggarna passar också',
      },
      good: {
        en: 'A drip coffee maker suits you if',
        it: 'Una macchina per caffè filtro fa per te se',
        de: 'Eine Filterkaffeemaschine passt zu dir, wenn',
        es: 'Una cafetera de goteo te conviene si',
        pl: 'Ekspres przelewowy jest dla ciebie, jeśli',
        sv: 'En kaffebryggare passar dig om',
      },
      skip: {
        en: 'Skip the drip coffee maker if',
        it: 'La macchina per caffè filtro non fa per te se',
        de: 'Lass die Filterkaffeemaschine weg, wenn',
        es: 'La cafetera de goteo no es para ti si',
        pl: 'Ekspres przelewowy nie jest dla ciebie, jeśli',
        sv: 'Hoppa över kaffebryggaren om',
      },
      how: {
        en: 'How to choose a drip coffee maker',
        it: 'Come scegliere una macchina per caffè filtro',
        de: 'So wählst du eine Filterkaffeemaschine aus',
        es: 'Cómo elegir una cafetera de goteo',
        pl: 'Jak wybrać ekspres przelewowy',
        sv: 'Så väljer du kaffebryggare',
      },
      faq: {
        en: 'Drip coffee maker questions',
        it: 'Domande frequenti sulla macchina per caffè filtro',
        de: 'Häufige Fragen zur Filterkaffeemaschine',
        es: 'Preguntas frecuentes sobre la cafetera de goteo',
        pl: 'Najczęstsze pytania o ekspres przelewowy',
        sv: 'Vanliga frågor om kaffebryggare',
      },
    },
    goodIf: {
      en: ['You drink big mugs of long coffee.', 'You make coffee for several people at once.'],
      it: ['Bevi tazze grandi di caffè lungo.', 'Prepari il caffè per più persone insieme.'],
      de: ['Du trinkst große Tassen Kaffee.', 'Du kochst Kaffee für mehrere Personen auf einmal.'],
    },
    skipIf: {
      en: ['You want espresso or cappuccino.', 'You only drink one small cup a day.'],
      it: ['Vuoi espresso o cappuccino.', 'Bevi solo una tazzina al giorno.'],
      de: ['Du willst Espresso oder Cappuccino.', 'Du trinkst nur eine kleine Tasse am Tag.'],
    },
    criteria: {
      en: [
        { t: 'Capacity', d: 'Match the jug to how many cups you really make.' },
        { t: 'Brewing standard', d: 'Independent certifications such as SCA or ECBC check water temperature and brew time.' },
        { t: 'Carafe', d: 'A thermal jug keeps coffee hot without a hot plate.' },
      ],
      it: [
        { t: 'Capacità', d: 'Scegli la caraffa in base a quante tazze fai davvero.' },
        { t: 'Standard di estrazione', d: "Certificazioni indipendenti come SCA o ECBC verificano temperatura dell'acqua e tempi." },
        { t: 'Caraffa', d: 'Una caraffa termica tiene caldo il caffè senza piastra.' },
      ],
      de: [
        { t: 'Kapazität', d: 'Wähle die Kanne nach der Menge, die du wirklich kochst.' },
        { t: 'Brühstandard', d: 'Unabhängige Zertifizierungen wie SCA oder ECBC prüfen Wassertemperatur und Brühzeit.' },
        { t: 'Kanne', d: 'Eine Thermokanne hält Kaffee ohne Warmhalteplatte heiß.' },
      ],
    },
    needs: [
      {
        id: 'main',
        icon: 'drip',
        label: { en: 'Certified filter coffee', it: 'Caffè filtro certificato', de: 'Zertifizierter Filterkaffee' },
        picks: [{ id: 'moccamaster' }],
      },
      {
        id: 'save',
        icon: 'coins',
        label: { en: 'Spend less', it: 'Spendere meno', de: 'Weniger ausgeben' },
        picks: [{ id: 'braun-purshine', markets: ['it', 'de', 'es', 'pl', 'se'] }],
      },
    ],
    faq: {
      en: [
        { q: 'What does the ECBC certificate mean?', a: 'The European Coffee Brewing Centre checks that the machine brews at the right temperature and in the right time: the Moccamaster KBGV Select has it.' },
        { q: 'How long does a full jug take?', a: 'The Moccamaster brews its 1.25 L jug in 4 to 6 minutes.' },
        { q: 'Is filter coffee weaker than espresso?', a: 'It is less concentrated, but a mug of filter coffee is larger: it is a different drink, not a weaker one.' },
      ],
      it: [
        { q: 'Cosa significa la certificazione ECBC?', a: 'L’European Coffee Brewing Centre verifica che la macchina estragga alla temperatura e nel tempo giusti: la Moccamaster KBGV Select ce l’ha.' },
        { q: 'Quanto ci mette a fare una caraffa piena?', a: 'La Moccamaster fa la sua caraffa da 1,25 L in 4-6 minuti.' },
        { q: 'Il caffè filtro è più debole dell’espresso?', a: 'È meno concentrato, ma una tazza di caffè filtro è molto più grande: è una bevanda diversa, non più debole.' },
      ],
      de: [
        { q: 'Was bedeutet das ECBC-Zertifikat?', a: 'Das European Coffee Brewing Centre prüft, ob die Maschine mit der richtigen Temperatur und in der richtigen Zeit brüht: Die Moccamaster KBGV Select hat es.' },
        { q: 'Wie lange dauert eine volle Kanne?', a: 'Die Moccamaster brüht ihre 1,25-Liter-Kanne in 4 bis 6 Minuten.' },
        { q: 'Ist Filterkaffee schwächer als Espresso?', a: 'Er ist weniger konzentriert, aber eine Tasse Filterkaffee ist viel größer: ein anderes Getränk, kein schwächeres.' },
      ],
    },
    related: ['manual-filter', 'superautomatic'],
  },
  'manual-filter': {
    id: 'manual-filter',
    icon: 'dripper',
    slug: { en: 'pour-over-and-french-press', it: 'caffe-filtro-manuale', de: 'handfilter-french-press' },
    name: { en: 'Pour-over and French press', it: 'Caffè filtro manuale', de: 'Handfilter und French Press' },
    title: {
      en: 'Which pour-over or French press should you buy?',
      it: 'Quale filtro manuale o french press comprare?',
      de: 'Welchen Handfilter oder welche French Press kaufen?',
      es: '¿Qué filtro manual o prensa francesa comprar?',
      pl: 'Jaki drip albo french press kupić?',
      sv: 'Vilken handbryggare eller presskanna ska du köpa?',
    },
    line: {
      en: 'Pour-over and French press make filter coffee by hand: cheap tools, full control.',
      it: 'Il filtro manuale e la french press fanno il caffè filtro a mano: attrezzi economici, controllo totale.',
      de: 'Handfilter und French Press machen Filterkaffee von Hand: günstige Werkzeuge, volle Kontrolle.',
      es: 'El filtro manual y la prensa francesa hacen café de filtro a mano: utensilios baratos, control total.',
      pl: 'Drip i french press to kawa parzona ręcznie: tanie akcesoria, pełna kontrola.',
      sv: 'Handbryggare och presskanna gör bryggkaffe för hand: billiga redskap, full kontroll.',
    },
    seo: {
      en: {
        keyphrase: 'pour over',
        title: 'Pour-over or French press: which one to buy in {year}',
        description: 'Pour-over or French press? Tell us what matters (a clean cup, zero technique, several people) and see the right one at once, with facts and sources.',
      },
      it: {
        keyphrase: 'filtro manuale',
        title: 'Filtro manuale o french press: quale comprare nel {year}',
        description: 'Filtro manuale o french press? Dicci cosa conta per te (tazza pulita, zero tecnica, più persone) e vedi subito quello adatto, con dati e fonti.',
      },
      de: {
        keyphrase: 'Handfilter',
        title: 'Handfilter oder French Press: Was kaufen? Kaufberatung {year}',
        description: 'Handfilter oder French Press? Sag uns, was dir wichtig ist (klare Tasse, keine Technik, mehrere Personen), und sieh sofort das Passende, mit Quellen.',
      },
      es: {
        keyphrase: 'filtro manual',
        title: 'Filtro manual o prensa francesa: cuál comprar en {year}',
        description: '¿Filtro manual o prensa francesa? Dinos qué te importa (taza limpia, cero técnica, varias personas) y ve al momento el adecuado, con datos y fuentes.',
      },
      pl: {
        keyphrase: 'french press',
        title: 'French press czy drip: co kupić w {year} roku? Poradnik',
        description: 'French press czy drip? Powiedz, co jest ważne (czysta filiżanka, zero techniki, kilka osób), i od razu zobacz odpowiedni, z danymi i źródłami.',
      },
      sv: {
        keyphrase: 'handbryggare',
        title: 'Handbryggare eller presskanna {year}: vad ska du köpa?',
        description: 'Handbryggare eller presskanna? Berätta vad som är viktigt (ren kopp, ingen teknik, flera personer) och se direkt rätt val, med fakta och källor.',
      },
    },
    heads: {
      choose: {
        en: 'The right pour-over or French press for you',
        it: 'Il filtro manuale giusto per te',
        de: 'Handfilter oder French Press: das Passende für dich',
        es: 'El filtro manual o la prensa francesa adecuados para ti',
        pl: 'Drip albo french press dopasowany do ciebie',
        sv: 'Rätt handbryggare eller presskanna för dig',
      },
      others: {
        en: 'These pour-overs and French presses also work',
        it: 'Anche questi filtri manuali e french press vanno bene',
        de: 'Diese Handfilter und French Presses passen auch',
        es: 'Estos filtros manuales y prensas francesas también sirven',
        pl: 'Te dripy i french pressy też się sprawdzą',
        sv: 'De här handbryggarna och presskannorna passar också',
      },
      good: {
        en: 'A pour-over or French press suits you if',
        it: 'Il filtro manuale fa per te se',
        de: 'Ein Handfilter oder eine French Press passt zu dir, wenn',
        es: 'El filtro manual o la prensa francesa te convienen si',
        pl: 'Drip albo french press jest dla ciebie, jeśli',
        sv: 'En handbryggare eller presskanna passar dig om',
      },
      skip: {
        en: 'Skip pour-over and French press if',
        it: 'Il filtro manuale non fa per te se',
        de: 'Lass Handfilter und French Press weg, wenn',
        es: 'El filtro manual no es para ti si',
        pl: 'French press i drip nie są dla ciebie, jeśli',
        sv: 'Hoppa över handbryggaren om',
      },
      how: {
        en: 'How to choose a pour-over or French press',
        it: 'Come scegliere un filtro manuale o una french press',
        de: 'So wählst du Handfilter oder French Press aus',
        es: 'Cómo elegir un filtro manual o una prensa francesa',
        pl: 'Jak wybrać drip albo french press',
        sv: 'Så väljer du handbryggare eller presskanna',
      },
      faq: {
        en: 'Pour-over and French press questions',
        it: 'Domande frequenti sul filtro manuale',
        de: 'Häufige Fragen zu Handfilter und French Press',
        es: 'Preguntas frecuentes sobre el filtro manual',
        pl: 'Najczęstsze pytania o drip i french press',
        sv: 'Vanliga frågor om handbryggare och presskanna',
      },
    },
    goodIf: {
      en: ['You enjoy the ritual of making coffee.', 'You want to taste the difference between beans.'],
      it: ['Ti piace il rituale di preparare il caffè.', "Vuoi sentire la differenza tra un caffè e l'altro."],
      de: ['Du magst das Ritual der Zubereitung.', 'Du willst den Unterschied zwischen Bohnen schmecken.'],
    },
    skipIf: {
      en: ['You want coffee with no effort at all.', 'You do not have a kettle.'],
      it: ['Vuoi il caffè senza nessuno sforzo.', 'Non hai un bollitore.'],
      de: ['Du willst Kaffee ganz ohne Aufwand.', 'Du hast keinen Wasserkocher.'],
    },
    criteria: {
      en: [
        { t: 'Pour-over or immersion', d: 'Pour-over gives a cleaner cup; a French press gives more body.' },
        { t: 'Filters', d: 'Pour-over drippers need paper filters; a French press uses a metal mesh.' },
        { t: 'How many cups', d: 'Pick the size you will brew most often.' },
      ],
      it: [
        { t: 'Percolazione o infusione', d: 'Il pour-over dà una tazza più pulita; la french press dà più corpo.' },
        { t: 'Filtri', d: 'I dripper vogliono filtri di carta; la french press usa una rete metallica.' },
        { t: 'Quante tazze', d: 'Scegli il formato che userai più spesso.' },
      ],
      de: [
        { t: 'Aufguss oder Immersion', d: 'Handfilter ergibt eine klarere Tasse; French Press mehr Körper.' },
        { t: 'Filter', d: 'Handfilter brauchen Papierfilter; die French Press hat ein Metallsieb.' },
        { t: 'Wie viele Tassen', d: 'Nimm die Größe, die du am häufigsten brühst.' },
      ],
    },
    needs: [
      {
        id: 'main',
        icon: 'dripper',
        label: { en: 'A clean cup, by hand', it: 'Una tazza pulita, a mano', de: 'Klare Tasse, von Hand' },
        picks: [{ id: 'v60' }],
      },
      {
        id: 'easy',
        icon: 'check',
        label: { en: 'Zero technique', it: 'Zero tecnica', de: 'Ganz ohne Technik' },
        picks: [{ id: 'chambord' }],
      },
      {
        id: 'many',
        icon: 'people',
        label: { en: 'For several people', it: 'Per più persone', de: 'Für mehrere Personen' },
        picks: [{ id: 'chemex' }],
      },
    ],
    faq: {
      en: [
        { q: 'V60 or French press?', a: 'The V60 gives a clean, bright cup and asks for a little technique; the French press gives a fuller body and asks for none.' },
        { q: 'What grind do I need?', a: 'Medium-fine for the V60, coarse for the French press. Our ratio calculator gives you the grams of coffee and water.' },
        { q: 'Do I need a scale?', a: 'Not to start, but it makes every cup the same: weighing coffee and water is what makes filter coffee repeatable.' },
      ],
      it: [
        { q: 'V60 o french press?', a: 'Il V60 dà una tazza pulita e aromatica e chiede un po’ di tecnica; la french press dà più corpo e non ne chiede.' },
        { q: 'Che macinatura serve?', a: 'Medio-fine per il V60, grossa per la french press. Il nostro calcolatore di dosi ti dà i grammi di caffè e acqua.' },
        { q: 'Serve una bilancia?', a: 'Non per iniziare, ma rende ogni tazza uguale: pesare caffè e acqua è ciò che rende il filtro ripetibile.' },
      ],
      de: [
        { q: 'V60 oder French Press?', a: 'Der V60 gibt eine klare, aromatische Tasse und braucht etwas Technik; die French Press gibt mehr Körper und braucht keine.' },
        { q: 'Welcher Mahlgrad?', a: 'Mittelfein für den V60, grob für die French Press. Unser Verhältnis-Rechner gibt dir die Gramm Kaffee und Wasser.' },
        { q: 'Brauche ich eine Waage?', a: 'Für den Anfang nicht, aber sie macht jede Tasse gleich: Kaffee und Wasser zu wiegen macht Filterkaffee wiederholbar.' },
      ],
    },
    related: ['drip', 'moka', 'grinder'],
  },
  grinder: {
    id: 'grinder',
    icon: 'grinder',
    slug: { en: 'coffee-grinder', it: 'macinacaffe', de: 'kaffeemuehle' },
    name: { en: 'Coffee grinder', it: 'Macinacaffè', de: 'Kaffeemühle' },
    title: {
      en: 'Which electric coffee grinder should you buy?',
      it: 'Quale macinacaffè elettrico comprare?',
      de: 'Welche elektrische Kaffeemühle kaufen?',
      es: '¿Qué molinillo de café eléctrico comprar?',
      pl: 'Jaki elektryczny młynek do kawy kupić?',
      sv: 'Vilken elektrisk kaffekvarn ska du köpa?',
    },
    line: {
      en: 'A coffee grinder grinds beans just before brewing: the simplest upgrade to the coffee you already make.',
      it: 'Un macinacaffè macina i chicchi appena prima: il modo più semplice per migliorare il caffè che fai già.',
      de: 'Eine Kaffeemühle mahlt die Bohnen direkt vor dem Brühen: die einfachste Verbesserung für den Kaffee, den du schon machst.',
      es: 'Un molinillo de café muele el grano justo antes de preparar: la mejora más sencilla del café que ya haces.',
      pl: 'Młynek do kawy miele ziarna tuż przed parzeniem: najprostszy sposób, by poprawić kawę, którą już robisz.',
      sv: 'En kaffekvarn maler bönorna precis innan du brygger: det enklaste sättet att förbättra kaffet du redan gör.',
    },
    seo: {
      en: {
        keyphrase: 'coffee grinder',
        title: 'Coffee grinder: which one to buy in {year}, test results',
        description: 'Which coffee grinder should you buy? For espresso or only for filter: see the right model at once, with independent test results and official data.',
      },
      it: {
        keyphrase: 'macinacaffè',
        title: 'Macinacaffè elettrico: quale comprare nel {year}, secondo i test',
        description: 'Quale macinacaffè comprare? Per l’espresso o solo per filtro e moka: vedi subito il modello adatto, con i risultati dei test indipendenti e le fonti.',
      },
      de: {
        keyphrase: 'Kaffeemühle',
        title: 'Kaffeemühle: Welche kaufen? Mit Testergebnissen {year}',
        description: 'Welche Kaffeemühle kaufen? Für Espresso oder nur für Filter: sieh sofort das passende Modell, mit unabhängigen Testergebnissen und offiziellen Daten.',
      },
      es: {
        keyphrase: 'molinillo de café',
        title: 'Molinillo de café eléctrico: cuál comprar en {year}',
        description: '¿Qué molinillo de café comprar? Para espresso o solo para filtro: ve al momento el modelo adecuado, con resultados de pruebas independientes y fuentes.',
      },
      pl: {
        keyphrase: 'młynek do kawy',
        title: 'Młynek do kawy: jaki kupić w {year} roku? Wyniki testów',
        description: 'Jaki młynek do kawy kupić? Do espresso czy tylko do przelewu: od razu zobacz odpowiedni model, z wynikami niezależnych testów i źródłami.',
      },
      sv: {
        keyphrase: 'kaffekvarn',
        title: 'Kaffekvarn {year}: vilken ska du köpa? Enligt testerna',
        description: 'Vilken kaffekvarn ska du köpa? För espresso eller bara bryggkaffe: se direkt rätt modell, med resultat från oberoende tester och officiella uppgifter.',
      },
    },
    heads: {
      choose: {
        en: 'The right coffee grinder for you',
        it: 'Il macinacaffè giusto per te',
        de: 'Die passende Kaffeemühle für dich',
        es: 'El molinillo de café adecuado para ti',
        pl: 'Młynek do kawy dopasowany do ciebie',
        sv: 'Rätt kaffekvarn för dig',
      },
      others: {
        en: 'These coffee grinders also work',
        it: 'Anche questi macinacaffè vanno bene',
        de: 'Diese Kaffeemühlen passen auch',
        es: 'Estos molinillos de café también sirven',
        pl: 'Te młynki do kawy też się sprawdzą',
        sv: 'De här kaffekvarnarna passar också',
      },
      good: {
        en: 'A coffee grinder suits you if',
        it: 'Un macinacaffè fa per te se',
        de: 'Eine Kaffeemühle passt zu dir, wenn',
        es: 'Un molinillo de café te conviene si',
        pl: 'Młynek do kawy jest dla ciebie, jeśli',
        sv: 'En kaffekvarn passar dig om',
      },
      skip: {
        en: 'Skip the coffee grinder if',
        it: 'Il macinacaffè non fa per te se',
        de: 'Lass die Kaffeemühle weg, wenn',
        es: 'El molinillo de café no es para ti si',
        pl: 'Młynek do kawy nie jest dla ciebie, jeśli',
        sv: 'Hoppa över kaffekvarnen om',
      },
      how: {
        en: 'How to choose a coffee grinder',
        it: 'Come scegliere un macinacaffè',
        de: 'So wählst du eine Kaffeemühle aus',
        es: 'Cómo elegir un molinillo de café',
        pl: 'Jak wybrać młynek do kawy',
        sv: 'Så väljer du kaffekvarn',
      },
      faq: {
        en: 'Coffee grinder questions',
        it: 'Domande frequenti sul macinacaffè',
        de: 'Häufige Fragen zur Kaffeemühle',
        es: 'Preguntas frecuentes sobre el molinillo de café',
        pl: 'Najczęstsze pytania o młynek do kawy',
        sv: 'Vanliga frågor om kaffekvarnar',
      },
    },
    goodIf: {
      en: ['You buy whole beans, or want to start.', 'You brew with a manual espresso machine, a moka pot or a filter.'],
      it: ['Compri caffè in grani, o vuoi iniziare.', 'Fai il caffè con una macchina espresso manuale, la moka o il filtro.'],
      de: ['Du kaufst ganze Bohnen oder willst damit anfangen.', 'Du brühst mit Siebträger, Espressokocher oder Filter.'],
    },
    skipIf: {
      en: ['You use capsules or a bean-to-cup machine: they need no grinder.', 'You are happy with pre-ground coffee.'],
      it: ['Usi capsule o una macchina automatica a chicchi: non serve un macinacaffè.', 'Ti va bene il caffè già macinato.'],
      de: ['Du nutzt Kapseln oder einen Vollautomaten: Dann brauchst du keine Mühle.', 'Du bist mit gemahlenem Kaffee zufrieden.'],
    },
    criteria: {
      en: [
        { t: 'Burrs, not blades', d: 'Burrs crush the beans to an even size you can set; blades chop them unevenly.' },
        { t: 'Fine enough for your coffee', d: 'Espresso needs a very fine grind; for filter, moka and French press most burr grinders will do.' },
        { t: 'The same amount every time', d: 'A timer or automatic dosing grinds the same quantity without weighing.' },
      ],
      it: [
        { t: 'Macine, non lame', d: 'Le macine frantumano i chicchi in modo uniforme e regolabile; le lame li tagliano in pezzi diversi.' },
        { t: 'Fine quanto serve', d: 'L’espresso vuole una macinatura finissima; per filtro, moka e french press va bene quasi ogni macinacaffè a macine.' },
        { t: 'Sempre la stessa dose', d: 'Un timer o la dose automatica macinano la stessa quantità senza pesare.' },
      ],
      de: [
        { t: 'Mahlwerk statt Messer', d: 'Ein Mahlwerk zerkleinert die Bohnen gleichmäßig und einstellbar; Messer zerhacken sie ungleichmäßig.' },
        { t: 'Fein genug für deinen Kaffee', d: 'Espresso braucht einen sehr feinen Mahlgrad; für Filter, Espressokocher und French Press reicht fast jedes Mahlwerk.' },
        { t: 'Immer die gleiche Menge', d: 'Ein Timer oder eine automatische Dosierung mahlt jedes Mal die gleiche Menge, ohne Waage.' },
      ],
    },
    needs: [
      {
        id: 'main',
        icon: 'grinder',
        label: { en: 'Espresso and everything else', it: 'Espresso e tutto il resto', de: 'Espresso und alles andere' },
        picks: [{ id: 'kitchenaid-grinder' }],
      },
      {
        id: 'filter',
        icon: 'dripper',
        label: { en: 'Only filter, moka or French press', it: 'Solo filtro, moka o french press', de: 'Nur Filter, Espressokocher oder French Press' },
        picks: [{ id: 'wilfa-svart-aroma', markets: ['it', 'de', 'se'] }],
      },
    ],
    faq: {
      en: [
        { q: 'Burr or blade grinder?', a: 'Burrs crush the beans to an even size you choose; blades chop them unevenly, and the size depends on how long you hold the button. For espresso you need burrs.' },
        { q: 'Do I need a grinder for espresso?', a: 'With a manual espresso machine and whole beans, yes: espresso needs a fine, even grind. Capsule and bean-to-cup machines do not need one.' },
        { q: 'How long does ground coffee stay fresh?', a: 'Not long: grind just before brewing. Wilfa says ground coffee loses about half of its aroma compounds in roughly 15 minutes.' },
      ],
      it: [
        { q: 'Macinacaffè a macine o a lame?', a: 'Le macine frantumano i chicchi alla misura che scegli; le lame li tagliano in modo irregolare, e la misura dipende da quanto tieni premuto il tasto. Per l’espresso servono le macine.' },
        { q: 'Serve un macinacaffè per l’espresso?', a: 'Con una macchina espresso manuale e il caffè in grani sì: l’espresso vuole una macinatura fine e uniforme. Le macchine a capsule e le automatiche a chicchi non ne hanno bisogno.' },
        { q: 'Quanto resta fresco il caffè macinato?', a: 'Poco: macina appena prima di preparare. Secondo Wilfa, il caffè macinato perde circa metà delle sostanze aromatiche in una quindicina di minuti.' },
      ],
      de: [
        { q: 'Mahlwerk oder Schlagmesser?', a: 'Ein Mahlwerk zerkleinert die Bohnen auf die gewählte Größe; Messer zerhacken sie ungleichmäßig, und die Größe hängt davon ab, wie lange du drückst. Für Espresso brauchst du ein Mahlwerk.' },
        { q: 'Brauche ich für Espresso eine Mühle?', a: 'Mit Siebträger und ganzen Bohnen ja: Espresso braucht einen feinen, gleichmäßigen Mahlgrad. Kapselmaschinen und Vollautomaten brauchen keine.' },
        { q: 'Wie lange bleibt gemahlener Kaffee frisch?', a: 'Nicht lange: Mahle direkt vor dem Brühen. Laut Wilfa verliert gemahlener Kaffee in etwa 15 Minuten rund die Hälfte seiner Aromastoffe.' },
      ],
    },
    related: ['manual-espresso', 'moka', 'manual-filter'],
  },
};

// Coffee grinders: the Swedish and Danish consumer test (Råd & Rön, Tænk) as reported by Stiftung Warentest.
const SW_GRINDER = 'https://www.test.de/Kaffeemuehlen-im-Test-Praezision-hat-ihren-Preis-6173662-0/';
// Stiftung Warentest (its grades are behind a paywall; the pages below name the model and grade publicly).
const SW_LATTISSIMA = 'https://www.test.de/Kaffepad-und-Kapselmaschinen-im-Test-4933230-detail/320000026560!0010-00/';
const SW_ESSENZA = 'https://www.testbericht.de/produkte/krups-krups-xn1108-nespresso-essenza-mini-xn-1108-schwarz';
const SW_ESPRESSO = 'http://www.heidelberg24.de/verbraucher/siebtraeger-kaffee-maschinen-test-2021-stiftung-warentest-geraet-deutschland-zr-91140630.html';
const SW_FULLAUTO = "https://www.test.de/Kaffeevollautomaten-im-Test-4635644-tabelle/anbieter/De'Longhi/";
const SW_FILTER = 'https://www.test.de/Filterkaffeemaschinen-im-Test-Welche-ist-die-beste-5007345-0/';
const SW_BRAUN = 'https://www.test.de/Filterkaffeemaschinen-im-Test-Welche-ist-die-beste-5007345-detail/320000032120!2/';
const DL = (m: string, path: string) => `https://www.delonghi.com/${m}/p/${path}`;
const DL_RIVELIA = {
  it: DL('it-it', 'rivelia-macchina-automatica-per-caffe-in-chicchi-rivelia-exam440.55.bg/EXAM440.55.BG.html'),
  de: DL('de-de', 'rivelia-rivelia-kaffeevollautomat-exam440.55.bg/EXAM440.55.BG.html'),
  es: DL('es-es', 'rivelia-cafetera-automatica-rivelia-exam440.55.bg/EXAM440.55.BG.html'),
  pl: DL('pl-pl', 'rivelia-automatyczny-ekspres-do-kawy-rivelia-exam440.55.bg/EXAM440.55.BG.html'),
  se: DL('sv-se', 'rivelia-rivelia-automatisk-kaffemaskin-exam440.55.bg/EXAM440.55.BG.html'),
  us: DL('en-us', 'rivelia-rivelia-fully-automatic-espresso-machine--onyx-black/EXAM44055B.html'),
};
const DL_ELETTA = {
  it: DL('it-it', 'eletta-explore-macchina-automatica-per-caffe-in-chicchi-eletta-explore-ecam450.65.s-ex4/ECAM450.65.S+EX%3A4.html'),
  de: DL('de-de', 'eletta-explore-automatische-kaffeemaschine-eletta-explore-ecam450.65.s-ex4/ECAM450.65.S+EX%3A4.html'),
  pl: DL('pl-pl', 'eletta-explore-automatyczny-ekspres-do-kawy-eletta-explore-ecam450.65.s-ex4/ECAM450.65.S+EX%3A4.html'),
  us: DL('en-us', 'eletta-explore-eletta-explore-espresso-machine/ECAM45086S+EX%3A4.html'),
};
const DL_MSTART = DL('de-ch', 'magnifica-start-magnifica-start-automatic-coffee-maker-ecam220.60.b-ex1/ECAM220.60.B+EX%3A1.html');
const BH = (m: string, path: string) => `https://www.braunhousehold.com/${m}/p/${path}`;
const BRAUN = {
  it: BH('it-it', 'macchine-da-caffe-collezione-purshine-macchina-da-caffe-purshine-kf1500-nero/KF101BI-KF1500BK.html'),
  de: BH('de-de', 'purshine-collection-kaffeemaschinen-purshine-kaffeemaschine-kf-1500-schwarz/KF101BI-KF1500BK.html'),
  es: BH('es-es', 'cafeteras-purshine-collection-cafetera-purshine-kf-1500-negro/KF101BI-KF1500BK.html'),
  pl: BH('pl-pl', 'ekspresy-do-kawy-z-kolekcji-purshine-ekspres-do-kawy-purshine-kf-1500--czarny/KF101BI-KF1500BK.html'),
  se: BH('sv-se', 'purshine-collection-kaffebryggare-purshine-kaffebryggare-kf-1500-svart/KF101BI-KF1500BK.html'),
};
const KA_GRINDER = 'https://www.kitchenaid.com/countertop-appliances/coffee-products/coffee-grinders/p.burr-coffee-grinder.KCG8433BM.html';
const WILFA = 'https://wilfa.com/products/svart-aroma';
const NESPRESSO_ESSENZA = 'https://www.nespresso.com/in/en/coffee-machines/original/essenza-mini';
const NESPRESSO_LATTISSIMA = 'https://www.nespresso.com/in/en/coffee-machines/original/lattissima-one';
const SAGE_BAMBINO = 'https://www.sageappliances.com/en-gb/product/bes500';
const MOCCAMASTER = 'https://us.moccamaster.com/products/kbgv-select';
const BIALETTI_EXPRESS = 'https://www.bialetti.com/it_it/moka-express-4-tazze.html';
const BIALETTI_BRIKKA = 'https://www.bialetti.com/us_en/brikka-moka-pot-espresso-with-crema.html';
const BIALETTI_VENUS = 'https://www.bialetti.com/us_en/moka-pot-3-cup-6-cup-italian-stovetop-4.html';
const HARIO_V60 = 'https://global.hario.com/product/coffee/dripper/VDC.html';
const BODUM_CHAMBORD = 'https://www.bodum.com/gb/en/1928-16-chambord';
const CHEMEX_6 = 'https://chemexcoffeemaker.com/products/six-cup-classic-chemex';


const products: Product[] = [
  // ---------- Coffee grinders ----------
  {
    id: 'kitchenaid-grinder',
    category: 'grinder',
    codes: ['5KCG8433'],
    tier: 'mid',
    brand: 'KitchenAid',
    name: { en: 'KitchenAid Burr Coffee Grinder KCG8433', it: 'KitchenAid Artisan 5KCG8433', de: 'KitchenAid Artisan 5KCG8433' },
    why: {
      en: 'Grinds for everything from espresso to French press and doses by itself: second of 12 in the Scandinavian lab test reported by Stiftung Warentest.',
      it: 'Macina per tutto, dall’espresso alla french press, e dosa da solo: secondo su 12 nel test di laboratorio scandinavo riportato da Stiftung Warentest.',
      de: 'Mahlt für alles von Espresso bis French Press und dosiert selbst: Platz 2 von 12 im skandinavischen Labortest, über den die Stiftung Warentest berichtet.',
    },
    lab: {
      text: {
        en: '2nd of 12 grinders in the Råd & Rön and Tænk test, with slight weaknesses on coarse grinds (Stiftung Warentest, November 2024)',
        it: '2° su 12 macinacaffè nel test di Råd & Rön e Tænk, con qualche debolezza sulle macinature grosse (Stiftung Warentest, novembre 2024)',
        de: 'Platz 2 von 12 im Test von Råd & Rön und Tænk, leichte Schwächen bei grobem Pulver (Stiftung Warentest, November 2024)',
      },
      source: SW_GRINDER,
    },
    facts: [
      { key: 'grinder', value: { en: 'Conical burrs, 70 settings', it: 'Macine coniche, 70 regolazioni', de: 'Kegelmahlwerk, 70 Stufen' }, source: KA_GRINDER },
      { key: 'design', value: { en: 'Automatic dosing by cups or shots', it: 'Dose automatica per tazze o shot', de: 'Automatische Dosierung nach Tassen oder Shots' }, source: KA_GRINDER },
      { key: 'portafilter', value: { en: 'Holder included', it: 'Supporto incluso', de: 'Halterung dabei' }, source: KA_GRINDER },
    ],
    search: { en: 'KitchenAid KCG8433 burr grinder', it: 'KitchenAid 5KCG8433', de: 'KitchenAid 5KCG8433' },
    asin: { us: 'B08JH6K5PY', it: 'B09MSH4XH3', de: 'B09MSHNRLJ', es: 'B09MSHNRLJ', gb: 'B09MSH3P8D' },
  },
  {
    id: 'wilfa-svart-aroma',
    category: 'grinder',
    tier: 'low',
    brand: 'Wilfa',
    name: same('Wilfa Svart Aroma CGWS-130B'),
    why: {
      en: 'Made for filter, moka and French press rather than espresso: it grinds well and fast and costs less; third in the same test.',
      it: 'Pensato per filtro, moka e french press più che per l’espresso: macina bene e veloce e costa meno; terzo nello stesso test.',
      de: 'Für Filter, Espressokocher und French Press statt Espresso gemacht: mahlt gut und schnell und kostet weniger; Platz 3 im selben Test.',
    },
    lab: {
      text: {
        en: '3rd of 12, "grinds well and fast" (Råd & Rön and Tænk test, Stiftung Warentest, November 2024)',
        it: '3° su 12, «macina bene e veloce» (test di Råd & Rön e Tænk, Stiftung Warentest, novembre 2024)',
        de: 'Platz 3 von 12, „mahlt gut und schnell“ (Test von Råd & Rön und Tænk, Stiftung Warentest, November 2024)',
      },
      source: SW_GRINDER,
    },
    facts: [
      {
        key: 'grinder',
        value: { en: 'Conical burrs, 5 grind levels (moka to boiled)', it: 'Macine coniche, 5 livelli (dalla moka al caffè bollito)', de: 'Kegelmahlwerk, 5 Stufen (Espressokocher bis Kochkaffee)' },
        source: WILFA,
      },
      { key: 'capacity', value: { en: '250 g of beans', it: '250 g di chicchi', de: '250 g Bohnen' }, source: WILFA },
      { key: 'cert', value: same('ECBC'), source: WILFA },
    ],
    search: same('Wilfa Svart Aroma'),
    asin: { it: 'B071Z6G317', de: 'B071Z6G317', se: 'B071Z6G317', gb: 'B071Z6G317' },
  },
  {
    id: 'essenza-mini',
    category: 'capsule',
    codes: ['EN85'],
    tier: 'low',
    name: same('Nespresso Essenza Mini'),
    why: {
      en: 'The simplest, smallest way into Nespresso: two cup sizes, nothing to learn.',
      it: 'Il modo più semplice e compatto per avere una Nespresso: due dosi, niente da imparare.',
      de: 'Der einfachste und kleinste Einstieg in Nespresso: zwei Tassengrößen, nichts zu lernen.',
    },
    lab: {
      text: {
        en: '“good” (2.0), 3rd of 13 in Stiftung Warentest’s test of capsule and pod machines (08/2020)',
        it: '«buono» (2,0), 3ª su 13 nel test di Stiftung Warentest sulle macchine a capsule e cialde (08/2020)',
        de: '„gut“ (2,0), Platz 3 von 13 im Test der Kapsel- und Padmaschinen (Stiftung Warentest, 08/2020)',
        es: '«buena» (2,0), 3.ª de 13 en la prueba de Stiftung Warentest de cafeteras de cápsulas y monodosis (08/2020)',
        pl: '„dobra” (2,0), 3. miejsce na 13 w teście Stiftung Warentest ekspresów na kapsułki i pady (08/2020)',
        sv: '”bra” (2,0), trea av 13 i Stiftung Warentests test av kapsel- och podmaskiner (08/2020)',
      },
      source: SW_ESSENZA,
    },
    facts: [
      { key: 'width', value: '8.4 cm', source: NESPRESSO_ESSENZA },
      { key: 'tank', value: '0.6 L', source: NESPRESSO_ESSENZA },
      { key: 'heatup', value: '30 s', source: NESPRESSO_ESSENZA },
    ],
    search: same('Nespresso Essenza Mini'),
    asin: { us: 'B06ZYSM2GR', it: 'B07FM9ZQ4B', de: 'B07FM9ZQ4B', es: 'B07FM9ZQ4B', pl: 'B07FM9ZQ4B', se: 'B07FM9ZQ4B' },
  },
  {
    id: 'magnifica-start',
    category: 'superautomatic',
    codes: ['ECAM220.60'],
    tier: 'low',
    name: same("De'Longhi Magnifica Start ECAM220.60.B"),
    why: {
      en: 'Cappuccino at a touch with the LatteCrema milk jug and four drinks on one button each: the essentials, for less.',
      it: 'Cappuccino con un tocco grazie alla caraffa LatteCrema e quattro bevande su un tasto ciascuna: l’essenziale, spendendo meno.',
      de: 'Cappuccino per Knopfdruck mit dem LatteCrema-Milchbehälter und vier Getränke auf je einer Taste: das Nötige, für weniger Geld.',
    },
    lab: {
      text: {
        en: '“good” (2.3) and a best-value tip from Stiftung Warentest (10/2024)',
        it: '«buono» (2,3) e consiglio qualità-prezzo di Stiftung Warentest (10/2024)',
        de: '„gut“ (2,3) und Preis-Leistungs-Tipp der Stiftung Warentest (10/2024)',
      },
      source: SW_FULLAUTO,
    },
    facts: [
      { key: 'milk', value: same('LatteCrema Hot'), source: DL_MSTART },
      { key: 'recipes', value: '4', source: DL_MSTART },
      { key: 'pressure', value: '15 bar', source: DL_MSTART },
    ],
    search: same("De'Longhi Magnifica Start ECAM220.60.B"),
    asin: { de: 'B0CNW5PFSD' },
  },
  {
    id: 'rivelia',
    category: 'superautomatic',
    codes: ['EXAM440.55'],
    tier: 'high',
    name: same("De'Longhi Rivelia"),
    why: {
      en: 'Cappuccino at one touch with the LatteCrema milk jug, and two bean hoppers you can swap, so you change coffee in seconds.',
      it: 'Cappuccino con un tocco grazie alla caraffa LatteCrema, e due contenitori per i chicchi da scambiare: cambi caffè in pochi secondi.',
      de: 'Cappuccino per Knopfdruck mit dem LatteCrema-Milchbehälter und zwei austauschbare Bohnenbehälter: Du wechselst den Kaffee in Sekunden.',
      es: 'Capuchino con un toque gracias a la jarra LatteCrema y dos depósitos de granos intercambiables: cambias de café en segundos.',
      pl: 'Cappuccino jednym dotknięciem dzięki dzbankowi LatteCrema i dwa wymienne pojemniki na ziarna: zmieniasz kawę w kilka sekund.',
      sv: 'Cappuccino med ett tryck tack vare mjölkbehållaren LatteCrema, och två utbytbara bönbehållare: du byter kaffe på några sekunder.',
    },
    lab: {
      text: {
        en: 'top grade among 12 bean-to-cup machines, “good” (2.1), in Stiftung Warentest’s test (10/2024)',
        it: 'miglior voto tra 12 macchine automatiche, «buono» (2,1), nel test di Stiftung Warentest (10/2024)',
        de: 'Testsieger unter 12 Kaffeevollautomaten mit „gut“ (2,1) (Stiftung Warentest, 10/2024)',
        es: 'mejor nota entre 12 cafeteras superautomáticas, «buena» (2,1), en la prueba de Stiftung Warentest (10/2024)',
        pl: 'najlepsza ocena wśród 12 ekspresów automatycznych, „dobra” (2,1), w teście Stiftung Warentest (10/2024)',
        sv: 'bästa betyg bland 12 helautomater, ”bra” (2,1), i Stiftung Warentests test (10/2024)',
      },
      source: SW_FULLAUTO,
    },
    facts: [
      { key: 'milk', value: same('LatteCrema Hot'), source: DL_RIVELIA.it },
      { key: 'tank', value: '1.4 L', source: DL_RIVELIA.it },
      {
        key: 'grinder',
        value: {
          en: 'Two swappable bean hoppers',
          it: 'Due contenitori per chicchi da scambiare',
          de: 'Zwei austauschbare Bohnenbehälter',
          es: 'Dos depósitos de granos intercambiables',
          pl: 'Dwa wymienne pojemniki na ziarna',
          sv: 'Två utbytbara bönbehållare',
        },
        source: DL_RIVELIA.it,
      },
    ],
    search: same("De'Longhi Rivelia"),
    asin: { us: 'B0F1GMCQPB', gb: 'B0CH3R3GRV' },
    store: { us: DL_RIVELIA.us },
    price: {
      it: { value: 629.9, source: DL_RIVELIA.it },
      de: { value: 659, source: DL_RIVELIA.de },
      es: { value: 639.9, source: DL_RIVELIA.es },
      pl: { value: 2649, source: DL_RIVELIA.pl },
      se: { value: 10329, source: DL_RIVELIA.se },
    },
  },
  {
    id: 'eletta-explore',
    category: 'superautomatic',
    codes: ['ECAM450.65'],
    tier: 'high',
    name: same("De'Longhi Eletta Explore"),
    why: {
      en: 'More than 50 hot, iced and cold brew drinks at one touch, with milk jugs for hot and for cold foam.',
      it: 'Oltre 50 bevande calde, fredde e cold brew con un tocco, con caraffe per la schiuma di latte calda e per quella fredda.',
      de: 'Über 50 heiße, kalte und Cold-Brew-Getränke per Knopfdruck, mit Milchbehältern für warmen und für kalten Schaum.',
      es: 'Más de 50 bebidas calientes, frías y cold brew con un toque, con jarras para espuma de leche caliente y fría.',
      pl: 'Ponad 50 napojów gorących, mrożonych i cold brew jednym dotknięciem, z dzbankami do gorącej i do zimnej pianki.',
      sv: 'Över 50 varma, kalla och cold brew-drycker med ett tryck, med mjölkbehållare för varmt och för kallt skum.',
    },
    lab: {
      text: {
        en: '“good” (1.9), the highest grade in Stiftung Warentest’s bean-to-cup test (07/2026)',
        it: '«buono» (1,9), il voto più alto nel test di Stiftung Warentest sulle macchine automatiche (07/2026)',
        de: '„gut“ (1,9), die beste Note im Kaffeevollautomaten-Test (Stiftung Warentest, 07/2026)',
        es: '«buena» (1,9), la nota más alta en la prueba de Stiftung Warentest de cafeteras superautomáticas (07/2026)',
        pl: '„dobra” (1,9), najwyższa ocena w teście ekspresów automatycznych Stiftung Warentest (07/2026)',
        sv: '”bra” (1,9), högsta betyget i Stiftung Warentests test av helautomater (07/2026)',
      },
      source: SW_FULLAUTO,
    },
    facts: [
      { key: 'recipes', value: '50+', source: DL_ELETTA.it },
      { key: 'milk', value: same('LatteCrema Hot & Cool'), source: DL_ELETTA.it },
    ],
    search: same("De'Longhi Eletta Explore"),
    asin: { us: 'B0CGL7878G' },
    store: { us: DL_ELETTA.us },
    price: {
      it: { value: 899.9, source: DL_ELETTA.it },
      de: { value: 819, source: DL_ELETTA.de },
      pl: { value: 3239, source: DL_ELETTA.pl },
    },
  },
  {
    id: 'lattissima-one',
    category: 'capsule',
    codes: ['EN510'],
    tier: 'mid',
    name: same('Nespresso Lattissima One'),
    why: {
      en: 'Cappuccino and latte macchiato at one touch, with a removable milk jug.',
      it: 'Cappuccino e latte macchiato con un tocco, con una caraffa del latte estraibile.',
      de: 'Cappuccino und Latte macchiato per Knopfdruck, mit abnehmbarem Milchbehälter.',
    },
    lab: {
      text: {
        en: '“good” (2.3), the best Nespresso machine in Stiftung Warentest’s test of 15 capsule and pod machines (12/2023)',
        it: '«buono» (2,3), la migliore Nespresso nel test di Stiftung Warentest su 15 macchine a capsule e cialde (12/2023)',
        de: '„gut“ (2,3), beste Nespresso-Maschine im Test von 15 Kapsel- und Padmaschinen (Stiftung Warentest, 12/2023)',
        es: '«buena» (2,3), la mejor Nespresso en la prueba de Stiftung Warentest de 15 cafeteras de cápsulas y monodosis (12/2023)',
        pl: '„dobra” (2,3), najlepsza Nespresso w teście Stiftung Warentest 15 ekspresów na kapsułki i pady (12/2023)',
        sv: '”bra” (2,3), bästa Nespresso i Stiftung Warentests test av 15 kapsel- och podmaskiner (12/2023)',
      },
      source: SW_LATTISSIMA,
    },
    facts: [
      { key: 'milk', value: { en: 'Removable 165 ml jug', it: 'Caraffa estraibile da 165 ml', de: 'Abnehmbarer Behälter, 165 ml' }, source: NESPRESSO_LATTISSIMA },
      { key: 'recipes', value: '5', source: NESPRESSO_LATTISSIMA },
      { key: 'tank', value: '1 L', source: NESPRESSO_LATTISSIMA },
    ],
    search: same('Nespresso Lattissima One'),
    asin: { us: 'B08VTG33NZ', it: 'B08VCXM3VH', de: 'B08VCXM3VH', es: 'B08VD5FS1D', pl: 'B08VCXM3VH', se: 'B08VCXM3VH', gb: 'B08VD5FS1D' },
  },
  {
    id: 'bambino-plus',
    category: 'manual-espresso',
    tier: 'mid',
    name: { en: 'Breville Bambino Plus', it: 'Sage Bambino Plus', de: 'Sage Bambino Plus' },
    why: {
      en: 'Ready in 3 seconds, and the wand steams milk on its own: the easiest way to learn espresso.',
      it: 'Pronta in 3 secondi e la lancia monta il latte da sola: il modo più facile per imparare.',
      de: 'In 3 Sekunden bereit, und die Lanze schäumt die Milch selbst: der leichteste Einstieg.',
    },
    lab: {
      text: {
        en: '“good” (2.3) in Stiftung Warentest’s test of 7 espresso machines for beginners (12/2021)',
        it: '«buono» (2,3) nel test di Stiftung Warentest su 7 macchine espresso per principianti (12/2021)',
        de: '„gut“ (2,3) im Test von 7 Siebträgermaschinen für Einsteiger (Stiftung Warentest, 12/2021)',
      },
      source: SW_ESPRESSO,
    },
    facts: [
      { key: 'heatup', value: '3 s', source: SAGE_BAMBINO },
      { key: 'milk', value: { en: 'Automatic steam wand', it: 'Lancia vapore automatica', de: 'Automatische Dampflanze' }, source: SAGE_BAMBINO },
      { key: 'portafilter', value: '54 mm', source: SAGE_BAMBINO },
    ],
    search: { en: 'Breville Bambino Plus', it: 'Sage Bambino Plus', de: 'Sage Bambino Plus' },
    // Breville sells it as Sage in the UK and in Europe (sageappliances.com).
    nameIn: { us: 'Breville Bambino Plus', gb: 'Sage Bambino Plus', it: 'Sage Bambino Plus', de: 'Sage Bambino Plus' },
    asin: { us: 'B07JVD78TT', it: 'B07G1CW1LG', de: 'B07G1CW1LG', gb: 'B07GB2JVD7' },
  },
  {
    id: 'moka-express',
    category: 'moka',
    tier: 'low',
    name: same('Bialetti Moka Express'),
    why: {
      en: 'The original moka: aluminium, simple, in sizes from 3 to 12 cups.',
      it: "La moka originale: in alluminio, semplice, in formati da 3 a 12 tazze.",
      de: 'Die Original-Moka: Aluminium, einfach, in Größen von 3 bis 12 Tassen.',
    },
    facts: [
      { key: 'material', value: { en: 'Aluminium', it: 'Alluminio', de: 'Aluminium' }, source: BIALETTI_EXPRESS },
      { key: 'induction', value: { en: 'Only with adapter plate', it: 'Solo con piattello adattatore', de: 'Nur mit Adapterplatte' }, source: BIALETTI_EXPRESS },
      { key: 'sizes', value: { en: '3 to 12 cups', it: 'Da 3 a 12 tazze', de: '3 bis 12 Tassen' }, source: BIALETTI_EXPRESS },
    ],
    search: same('Bialetti Moka Express'),
    asin: { us: 'B0000AN3QI', it: 'B0000AN3QI', de: 'B0000AN3QI', es: 'B0000AN3QI', pl: 'B0000AN3QI', se: 'B0000AN3QI', gb: 'B00004RFRU' },
  },
  {
    id: 'brikka',
    category: 'moka',
    tier: 'low',
    name: same('Bialetti Brikka'),
    why: {
      en: 'A moka with a special valve that brews coffee with crema on top.',
      it: 'La moka con la valvola speciale che fa il caffè con la crema.',
      de: 'Die Moka mit Spezialventil für Kaffee mit Crema.',
    },
    facts: [
      { key: 'design', value: { en: 'Crema valve', it: 'Valvola per la crema', de: 'Crema-Ventil' }, source: BIALETTI_BRIKKA },
      { key: 'material', value: { en: 'Aluminium', it: 'Alluminio', de: 'Aluminium' }, source: BIALETTI_BRIKKA },
      { key: 'sizes', value: { en: '2 and 4 cups', it: '2 e 4 tazze', de: '2 und 4 Tassen' }, source: BIALETTI_BRIKKA },
    ],
    search: same('Bialetti Brikka'),
    asin: { us: 'B0BWM4GVPY', it: 'B0BWM4GVPY', de: 'B0BWM4GVPY', pl: 'B0BWM4GVPY', es: 'B089LZSR7M', se: 'B08BR86LR3' },
  },
  {
    id: 'venus',
    category: 'moka',
    tier: 'low',
    name: same('Bialetti Venus'),
    why: {
      en: 'A stainless steel moka that works straight on induction.',
      it: "Una moka in acciaio inox che funziona direttamente sull'induzione.",
      de: 'Eine Moka aus Edelstahl, die direkt auf Induktion funktioniert.',
    },
    facts: [
      { key: 'material', value: { en: '18/10 stainless steel', it: 'Acciaio inox 18/10', de: 'Edelstahl 18/10' }, source: BIALETTI_VENUS },
      { key: 'induction', value: { en: 'Yes', it: 'Sì', de: 'Ja' }, source: BIALETTI_VENUS },
      { key: 'sizes', value: { en: '4, 6 and 10 cups', it: '4, 6 e 10 tazze', de: '4, 6 und 10 Tassen' }, source: BIALETTI_VENUS },
    ],
    search: same('Bialetti Venus'),
    asin: { us: 'B08556XV39', it: 'B08556XV39', de: 'B08556XV39', es: 'B08556XV39', pl: 'B08556XV39', se: 'B08556XV39', gb: 'B08556XV39' },
  },
  {
    id: 'moccamaster',
    category: 'drip',
    tier: 'mid',
    name: {
      en: 'Moccamaster KBGV Select',
      it: 'Moccamaster KBG Select',
      de: 'Moccamaster KBG Select',
      es: 'Moccamaster KBG Select',
      pl: 'Moccamaster KBG Select',
      sv: 'Moccamaster KBG Select',
    },
    why: {
      en: 'ECBC certified and SCA approved: filter coffee to a recognised standard.',
      it: 'Certificata ECBC e approvata SCA: caffè filtro secondo uno standard riconosciuto.',
      de: 'ECBC-zertifiziert und SCA-anerkannt: Filterkaffee nach anerkanntem Standard.',
    },
    lab: {
      text: {
        en: '“good” (2.3) in Stiftung Warentest’s filter coffee machine test, European version KBG 741 Select, “very good” for durability (10/2024)',
        it: '«buono» (2,3) nel test di Stiftung Warentest sulle macchine per caffè filtro, «ottimo» per durata (10/2024)',
        de: '„gut“ (2,3) im Filterkaffeemaschinen-Test, „sehr gut“ bei der Haltbarkeit (Stiftung Warentest, 10/2024)',
        es: '«buena» (2,3) en la prueba de Stiftung Warentest de cafeteras de filtro, «muy buena» en durabilidad (10/2024)',
        pl: '„dobra” (2,3) w teście ekspresów przelewowych Stiftung Warentest, „bardzo dobra” za trwałość (10/2024)',
        sv: '”bra” (2,3) i Stiftung Warentests test av kaffebryggare, ”mycket bra” för hållbarhet (10/2024)',
      },
      source: SW_FILTER,
    },
    facts: [
      { key: 'cert', value: same('ECBC, SCA'), source: MOCCAMASTER },
      { key: 'capacity', value: { en: '1.25 L (10 cups)', it: '1,25 L (10 tazze)', de: '1,25 L (10 Tassen)' }, source: MOCCAMASTER },
      { key: 'brewtime', value: '4–6 min', source: MOCCAMASTER },
    ],
    search: {
      en: 'Moccamaster KBGV Select',
      it: 'Moccamaster KBG Select',
      de: 'Moccamaster KBG Select',
      es: 'Moccamaster KBG Select',
      pl: 'Moccamaster KBG Select',
      sv: 'Moccamaster KBG Select',
    },
    asin: { us: 'B093DYPBYR', es: 'B093DYPBYR', gb: 'B093DYPBYR' },
  },
  {
    id: 'braun-purshine',
    category: 'drip',
    codes: ['KF1500'],
    tier: 'low',
    name: same('Braun PurShine KF 1500'),
    why: {
      en: '10-cup glass jug, OptiBrew system and automatic shut-off after 40 minutes: it does the job and costs very little.',
      it: 'Caraffa da 10 tazze, sistema OptiBrew e spegnimento automatico dopo 40 minuti: fa il suo lavoro e costa pochissimo.',
      de: 'Glaskanne für 10 Tassen, OptiBrew-System und Abschaltung nach 40 Minuten: macht, was sie soll, und kostet sehr wenig.',
      es: 'Jarra para 10 tazas, sistema OptiBrew y apagado automático a los 40 minutos: cumple y cuesta muy poco.',
      pl: 'Dzbanek na 10 filiżanek, system OptiBrew i automatyczne wyłączanie po 40 minutach: robi swoje i kosztuje bardzo mało.',
      sv: 'Kanna för 10 koppar, OptiBrew-system och automatisk avstängning efter 40 minuter: gör sitt jobb och kostar väldigt lite.',
    },
    lab: {
      text: {
        en: '“good” (1.9), the best in Stiftung Warentest’s test of filter coffee machines (10/2024)',
        it: '«buono» (1,9), la migliore nel test di Stiftung Warentest sulle macchine per caffè filtro (10/2024)',
        de: '„gut“ (1,9), Testsieger im Filterkaffeemaschinen-Test (Stiftung Warentest, 10/2024)',
        es: '«buena» (1,9), la mejor en la prueba de Stiftung Warentest de cafeteras de filtro (10/2024)',
        pl: '„dobra” (1,9), najlepsza w teście ekspresów przelewowych Stiftung Warentest (10/2024)',
        sv: '”bra” (1,9), bäst i Stiftung Warentests test av kaffebryggare (10/2024)',
      },
      source: SW_BRAUN,
    },
    facts: [
      { key: 'capacity', value: { en: '10 cups', it: '10 tazze', de: '10 Tassen', es: '10 tazas', pl: '10 filiżanek', sv: '10 koppar' }, source: BRAUN.it },
      {
        key: 'design',
        value: { en: 'Switches off after 40 minutes', it: 'Si spegne dopo 40 minuti', de: 'Schaltet nach 40 Minuten ab', es: 'Se apaga a los 40 minutos', pl: 'Wyłącza się po 40 minutach', sv: 'Stängs av efter 40 minuter' },
        source: BRAUN.it,
      },
    ],
    search: same('Braun PurShine KF1500'),
    asin: { de: 'B0BBMQ7QJZ' },
    price: {
      it: { value: 37.8, source: BRAUN.it },
      de: { value: 39, source: BRAUN.de },
      es: { value: 52.9, source: BRAUN.es },
      pl: { value: 179, source: BRAUN.pl },
      se: { value: 614, source: BRAUN.se },
    },
  },
  {
    id: 'v60',
    category: 'manual-filter',
    tier: 'low',
    name: same('Hario V60 02'),
    why: {
      en: 'The iconic pour-over cone: spiral ribs and one large hole, for 1 to 4 cups.',
      it: "L'iconico cono per il pour-over: nervature a spirale e un solo foro grande, da 1 a 4 tazze.",
      de: 'Der ikonische Handfilter: spiralförmige Rippen und ein großes Loch, für 1 bis 4 Tassen.',
    },
    facts: [
      { key: 'capacity', value: { en: '1–4 cups', it: '1–4 tazze', de: '1–4 Tassen' }, source: HARIO_V60 },
      { key: 'design', value: { en: 'Spiral ribs, single hole', it: 'Nervature a spirale, foro unico', de: 'Spiralrippen, ein Loch' }, source: HARIO_V60 },
    ],
    search: same('Hario V60 02'),
    asin: { us: 'B000P4D5HG', it: 'B000P4D5HG', de: 'B000P4D5HG', es: 'B000P4D5HG', se: 'B000P4D5HG', gb: 'B000P4D5HG' },
  },
  {
    id: 'chambord',
    category: 'manual-filter',
    tier: 'low',
    name: same('Bodum Chambord 1 L'),
    why: {
      en: 'The classic French press: no filters to buy, four minutes and press.',
      it: 'La classica french press: nessun filtro da comprare, quattro minuti e premi.',
      de: 'Die klassische French Press: keine Filter kaufen, vier Minuten ziehen lassen, drücken.',
    },
    facts: [
      { key: 'capacity', value: '1 L', source: BODUM_CHAMBORD },
      { key: 'material', value: { en: 'Borosilicate glass, steel frame', it: 'Vetro borosilicato, telaio in acciaio', de: 'Borosilikatglas, Stahlrahmen' }, source: BODUM_CHAMBORD },
      { key: 'brewtime', value: '4 min', source: BODUM_CHAMBORD },
    ],
    search: same('Bodum Chambord 1 L'),
    asin: { us: 'B00008XEWG', de: 'B00008XEWG', es: 'B00008XEWG', pl: 'B00008XEWG', se: 'B07PFDXYWC', gb: 'B00008XEWG' },
  },
  {
    id: 'chemex',
    category: 'manual-filter',
    tier: 'mid',
    name: same('Chemex Classic 6 cup'),
    why: {
      en: 'Brewer and serving carafe in one piece of borosilicate glass, for up to 6 cups.',
      it: 'Filtro e caraffa in un unico pezzo di vetro borosilicato, fino a 6 tazze.',
      de: 'Filter und Servierkaraffe in einem Stück Borosilikatglas, für bis zu 6 Tassen.',
    },
    facts: [
      { key: 'capacity', value: { en: '30 oz (about 0.9 L)', it: '30 oz (circa 0,9 L)', de: '30 oz (etwa 0,9 L)' }, source: CHEMEX_6 },
      { key: 'material', value: { en: 'Borosilicate glass', it: 'Vetro borosilicato', de: 'Borosilikatglas' }, source: CHEMEX_6 },
    ],
    search: same('Chemex 6 cup classic'),
    asin: { us: 'B0000YWF5E', it: 'B0000YWF5E', de: 'B0000YWF5E', es: 'B0000YWF5E', gb: 'B0000YWF5E' },
  },
];

// Spanish, Polish and Swedish come from i18n-extra.ts, keyed by the English text.
// The espresso machines, sold in fewer countries, get Spanish, Polish and Swedish from i18n-more.ts.
const dict = { es: { ...more.es, ...extra.es }, pl: { ...more.pl, ...extra.pl }, sv: { ...more.sv, ...extra.sv } };
export const catalog = addLanguages({ checked: CHECKED, categoryIds, categories, products, factLabels }, dict) satisfies Catalog;
