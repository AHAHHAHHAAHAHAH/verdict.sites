// Independent test results for CupVerdict's types (each with its source), matched by product code to
// what the brand stores sell in each country (colours of one code are one model).
import type { T, TestResult } from '../../lib/pack';

const SW_FULLAUTO = "https://www.test.de/Kaffeevollautomaten-im-Test-4635644-tabelle/anbieter/De'Longhi/";
const SW_ELETTA = 'https://www.delonghi.com/de-de/e/promotions/testsieger';
const SW_LATTISSIMA = 'https://www.test.de/Kaffepad-und-Kapselmaschinen-im-Test-4933230-detail/320000026560!0010-00/';
const grade = (n: string, en: string): T => ({ en: `“good” (${en})`, it: `«buono» (${n})`, de: `„gut“ (${n})`, fr: `« bon » (${n})`, es: `«bueno» (${n})`, pl: `„dobry” (${n})`, sv: `”bra” (${n})` });

export const tests: TestResult[] = [
  // Stiftung Warentest, 12 bean-to-cup machines (October 2024).
  { cat: 'superautomatic', name: "De'Longhi Rivelia EXAM440.55.B", tester: 'Stiftung Warentest', source: SW_FULLAUTO, date: '2024-10', rank: [1, 12], grade: grade('2,1', '2.1'), need: 'main' },
  // Stiftung Warentest (July 2026), as published by De'Longhi.
  { cat: 'superautomatic', name: "De'Longhi Eletta Explore ECAM450.65.S", tester: 'Stiftung Warentest', source: SW_ELETTA, date: '2026-07', grade: grade('1,9', '1.9'), need: 'auto' },
  // Stiftung Warentest, capsule and pod machines (December 2023).
  { cat: 'capsule', name: "De'Longhi Lattissima One EN510.W", tester: 'Stiftung Warentest', source: SW_LATTISSIMA, date: '2023-12', grade: grade('2,3', '2.3'), need: 'main' },
];
