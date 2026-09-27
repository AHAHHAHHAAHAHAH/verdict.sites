// The brand stores FloorVerdict reads every morning (scripts/fetch-stores.mjs): every model they
// sell in each country, with today's price, for the "all models" lists and the deals pages. Only
// stores that publish their catalogue (Shopify /products.json); product types differ from country
// to country, so each rule lists every spelling found, and names decide where types are missing.
import type { StoreSource } from '../../lib/pack';

const RR = (c: string) => `https://${c}.roborock.com`;
const DR = (c: string) => `https://${c}.dreametech.com`;
const MOVA = (c: string) => `https://${c}.mova-tech.com`;
const EUFY = (c: string) => `https://${c}.eufy.com`;
const SHARK = (tld: string) => `https://www.sharkninja.${tld}/sitemap_0-product.xml`;

// Words that make a "robot" a wet and dry floor washer whatever the store calls it.
const WASHER = /\b(f25|dyad)\b|umido e secco|humide et sec|seco y h[uú]medo|na mokro|v[aå]t- och torr|wet[ -]?(and|&)[ -]?dry|lavapavimenti senza fili/i;

export const stores: StoreSource[] = [
  {
    store: 'Roborock',
    markets: { it: RR('it'), fr: RR('fr'), es: RR('es'), pl: RR('pl'), se: RR('se') },
    rules: [
      { cat: 'wet', types: ['Wet Dry Vacuums'], words: WASHER },
      { cat: 'robot', types: ['Robot Vacuums'] },
      { cat: 'stick', types: ['Cordless Vacuum Cleaners', 'Cordless Vacuums'] },
    ],
  },
  {
    store: 'Dreame',
    markets: { it: DR('it'), fr: DR('fr'), es: DR('es'), pl: DR('pl'), se: DR('se') },
    rules: [
      { cat: 'wet', types: ['Wet Dry Vacuum Cleaner', 'Wet and Dry Vacuum', 'Wet and Dry Vacuums', 'W&D'] },
      { cat: 'robot', types: ['DreameBot', 'Robot Vacuum', 'Robot Vacuums', 'RVC'] },
      { cat: 'stick', types: ['Vacuum Cleaner', 'Upright Vacuum', 'Cordless Vacuum', 'SVC'] },
    ],
  },
  {
    // Dreame's second brand, with its own stores.
    store: 'Mova',
    markets: { it: MOVA('it'), fr: MOVA('fr'), es: MOVA('es'), pl: MOVA('pl'), se: MOVA('se') },
    rules: [
      { cat: 'wet', types: ['Wet and Dry Vacuum', 'W&D'] },
      { cat: 'robot', types: ['Robot Vacuum', 'RVC'] },
      { cat: 'stick', types: ['Cordless Stick Vacuum', 'Aspirador sin cable', 'Aspirateur sans fil', 'Odkurzacz bezprzewodowy', 'SVC'] },
    ],
  },
  {
    store: 'Eufy',
    markets: { it: EUFY('it'), fr: EUFY('fr'), es: EUFY('es'), pl: EUFY('pl'), se: EUFY('se') },
    rules: [
      { cat: 'robot', types: ['RoboVac'] },
      { cat: 'stick', types: ['HomeVac'] },
    ],
  },
  {
    // One European store with a path per language for Italy and Spain; France and Poland have their own.
    store: 'Tineco',
    markets: { it: 'https://de-store.tineco.com/it-it', es: 'https://de-store.tineco.com/es-es', fr: 'https://fr-store.tineco.com', pl: 'https://pl-store.tineco.com' },
    rules: [
      { cat: 'wet', words: /\bfloor one\b/i },
      { cat: 'stick', words: /\bpure one\b/i },
    ],
  },
  {
    store: 'Narwal',
    markets: { it: 'https://it.narwal.com', fr: 'https://fr.narwal.com', pl: 'https://pl.narwal.com' },
    // Some robot bundles are filed with the stick vacuums: the word "robot" decides.
    rules: [
      { cat: 'robot', types: ['Robot Vacuum Cleaner'], words: /\brobot\b/i },
      { cat: 'stick', types: ['Aspirapolvere senza fili', 'Aspirateur balai sans fil'] },
    ],
  },
  {
    // Shark lists its products in a sitemap per country (next to Ninja's kitchen machines, which
    // no rule picks up); each product page states its price in schema.org data.
    store: 'Shark',
    kind: 'sitemap',
    // Machines have codes like IP3251EUT or RV2620WAEU; spare parts do not.
    only: /\/[A-Z]{1,3}\d{3,4}[A-Z]*EU[A-Z]*\.html$/,
    markets: { it: SHARK('it'), fr: SHARK('fr'), es: SHARK('es'), pl: SHARK('pl'), se: SHARK('se') },
    rules: [
      { cat: 'steam', words: /vapore|vapeur|vapor|parow|angmopp|steam/ },
      { cat: 'robot', words: /robot(?!-da-cucina|-de-cuisine|-de-cocina|-kuchenny)/ },
      { cat: 'wet', words: /lavapavimenti|laveur|friegasuelos|fregona|myjac|moppande|hydrovac|wet-dry/ },
      { cat: 'stick', words: /senza-fil|sans-fil|sin-cable|bezprzewod|sladdlos|scopa-elettrica|balai|escoba|pionow|skaft/ },
    ],
    exclude:
      /accessori|panno|testin|tubo|contenitore|spazzol|filtr|batteri|ricambi|caricator|accessoire|lingette|brosse|chargeur|accesorio|cepillo|bater[ií]a|cargador|akcesori|szczotk|ladowark|tillbehor|borste|laddare|pad|cloth|brush|filter|battery|charger|kit|ninja|blender|frull|mixeur|batidora|mikser|cuiseur|cooker|friggitr|friteuse|freidora|frytkown|ventilat|flexbreeze|paket|pack/,
  },
];
