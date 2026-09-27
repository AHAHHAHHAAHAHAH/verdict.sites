// The brand stores ClimaVerdict reads every morning (scripts/fetch-stores.mjs): every model they sell
// in each country, with today's price, for the "all models" lists and the deals pages.
import type { StoreSource } from '../../lib/pack';

const PB = (path: string) => `https://eu.probreeze.com/${path}`;
const DUUX = (lang: string) => `https://duux.com/${lang}`;
const SHARK = (tld: string) => `https://www.sharkninja.${tld}/sitemap_0-product.xml`;
const DL = (loc: string) => `https://www.delonghi.com/${loc}/sitemap-${loc}-product-sitemap-0.xml`;

export const stores: StoreSource[] = [
  {
    // Pro Breeze names its products by what they are ("12-litre dehumidifier with..."), not by a model.
    store: 'Pro Breeze',
    name: 'title',
    markets: { it: PB('it-it'), fr: PB('fr-fr'), es: PB('es-es'), de: PB('de') },
    rules: [
      { cat: 'dehum', tags: ['Dehumidifiers'] },
      { cat: 'heat', tags: ['heaters'] },
      { cat: 'purifier', tags: ['air-purifier', 'air-purifiers'] },
      { cat: 'ac', tags: ['air-conditioners'] },
    ],
  },
  {
    // Duux gives no product types or tags: its product lines are named (Bora dehumidifiers,
    // Threesixty and Edge heaters, Bright and Sphere purifiers, North air conditioners).
    store: 'Duux',
    markets: { it: DUUX('it'), fr: DUUX('fr'), es: DUUX('es'), de: DUUX('de') },
    rules: [
      { cat: 'dehum', words: /\bbora\b/i },
      { cat: 'heat', words: /\bthreesixty|\bedge\b/i },
      { cat: 'purifier', words: /\bbright\b|\bsphere\b/i },
      { cat: 'ac', words: /\bnorth\b/i },
    ],
    exclude: /mellow|cushion|cuscino|coussin|coj[ií]n|kissen|filt(er|ro|re)|stand|staffa|support|soporte|halter|wall|pannell|panel|fen[eê]tre|ventana|fenster|tubo|tuyau|schlauch|hose|pcb|telaio|cadre|marco|rahmen|serbatoio|r[ée]servoir|dep[oó]sito|tank|cap bottom/i,
  },
  {
    // De'Longhi lists its products in a sitemap per country; each product page states its price in
    // schema.org data. Its addresses say what the product is, in each country's language.
    store: "De'Longhi",
    kind: 'sitemap',
    markets: { it: DL('it-it'), fr: DL('fr-fr'), es: DL('es-es'), de: DL('de-de'), pl: DL('pl-pl') },
    rules: [
      { cat: 'dehum', words: /deumidificator|luftentfeucht|deshumidificateur|deshumidificador|osuszacz|tasciugo|ariadry/ },
      { cat: 'ac', words: /condizionator|klimager|climatiseur|acondicionad|klimatyzator|pinguino/ },
      { cat: 'purifier', words: /purificator|luftreiniger|purificateur|purificador|oczyszczacz/ },
      { cat: 'heat', words: /radiator|radiatore|radiateur|radiador|heizlufter|olradiator|termoventilat|termowentylator|chauffant|soufflant|calefactor|grzejnik|konvektor|convettor|dragon|radia-s|capsule/ },
    ],
    exclude: /accessori|zubehor|accessoire|accesorio|akcesori|filtr|filter|kit|ricambi|ersatz/,
  },
  {
    // Shark's air purifiers, from the same sitemap as its vacuums.
    store: 'Shark',
    kind: 'sitemap',
    // Machines have codes like IP3251EUT or RV2620WAEU; spare parts do not.
    only: /\/[A-Z]{1,3}\d{3,4}[A-Z]*EU[A-Z]*\.html$/,
    markets: { it: SHARK('it'), fr: SHARK('fr'), es: SHARK('es'), de: 'https://www.sharkninja.de/sitemap_0-product.xml', pl: SHARK('pl') },
    rules: [{ cat: 'purifier', words: /purificator|purificateur|purificador|luftreiniger|oczyszczacz|air-purifier/ }],
    exclude: /filtr|filter|ricambi|ersatz|accessori|zubehor|akcesori/,
  },
];
