// The brand stores CupVerdict reads every morning (scripts/fetch-stores.mjs): every model they sell
// in each country, with today's price, for the "all models" lists and the deals pages.
import type { StoreSource } from '../../lib/pack';

const DL = (loc: string) => `https://www.delonghi.com/${loc}/sitemap-${loc}-product-sitemap-0.xml`;

export const stores: StoreSource[] = [
  {
    // De'Longhi lists its products in a sitemap per country; each product page states its price in
    // schema.org data. Its addresses say what the product is, in each country's language.
    store: "De'Longhi",
    kind: 'sitemap',
    markets: { us: DL('en-us'), gb: DL('en-gb'), it: DL('it-it'), de: DL('de-de'), es: DL('es-es'), pl: DL('pl-pl'), se: DL('sv-se') },
    rules: [
      { cat: 'capsule', words: /nespresso|dolce-gusto|capsul|kapsel|kapsul|vertuo|lattissima|citiz|inissia|essenza/ },
      // The bean-to-cup lines are named in every country, even where the address says only "espresso machine".
      { cat: 'superautomatic', words: /automatic|automatica|automatique|automatyczn|automatisk|vollautomat|broyeur|bean-to-cup|magnifica|rivelia|eletta|dinamica|primadonna|maestosa|perfecta/ },
      { cat: 'manual-espresso', words: /manuale|manuelle|manual|manuell|siebtrager|kolbow|espresso-machine|espressomaskin|pump-espresso/ },
      { cat: 'drip', words: /caffe-americano|filterkaffee|cafetiere-filtre|cafetera-de-goteo|cafetera-de-filtro|przelewow|kaffebryggare|drip-coffee|filter-coffee/ },
      { cat: 'grinder', words: /macinacaffe|kaffeemuhle|moulin|molinillo|mlynek|kaffekvarn|grinder/ },
    ],
    // Accessories, cups, beans and cleaning products share the addresses' words.
    exclude:
      /termoventilat|heater|heizl|radiat|chauff|calefact|grzejn|termowent|varmeflakt|accessori|zubehor|accessoire|accesorio|akcesori|tillbehor|brocca|caraffa|milchkaraffe|milchbehalter|pichet|jarra|dzbanek|dzbanki|mjolkkann|carafe|jug|frother|montalatte|tazz|glaser|becher|verres|tasses|vasos|tazas|szklank|filizank|kubk|koppar|muggar|glasses|cups|mugs|caffe-in-grani|kaffeebohnen|grains-de-cafe|cafe-en-grano|ziarn|kaffebonor|beans|decalc|entkalk|detartr|descal|avkalk|odkamien|filtri-acqua|wasserfilter|filtre-a-eau|filtro-de-agua|filtr-do-wody|vattenfilter|water-filter|filtersatz|tamper|pressino|knock|viaggio|reisebecher|voyage|viaje|podroz|resemugg|travel|thermal|termic|kimbo|capsule-di-caffe|pulizia|reinigung|nettoyage|limpieza|czyszcz|rengoring|cleaning/,
  },
];
