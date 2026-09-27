// Independent test results for ClimaVerdict's types (each with its source), matched by name to
// what the brand stores sell in each country. Only models whose exact name is on sale here.
import type { T, TestResult } from '../../lib/pack';

const SW_DEHUM = 'https://www.test.de/Luftentfeuchter-Was-sie-leisten-und-was-nicht-5780477-0/';
const SALDO = 'https://ilsalvagente.it/2025/05/19/test-sui-deumidificatori-il-piu-economico-e-anche-il-piu-efficace-anche-contro-il-caldo/';
const good: T = { en: '“good”', it: '«buono»', de: '„gut“', fr: '« bon »', es: '«bueno»', pl: '„dobry”', sv: '”bra”' };

export const tests: TestResult[] = [
  // Which? (UK), 12 dehumidifiers, reported by Stiftung Warentest (February 2026).
  { cat: 'dehum', name: "De'Longhi Tasciugo AriaDry Multi DEXD216RF", tester: 'Which?', source: SW_DEHUM, date: '2026-02', award: 'recommended', need: 'main' },
  // Saldo (Switzerland), 10 dehumidifiers (May 2025).
  { cat: 'dehum', name: "De'Longhi Tasciugo AriaDry Multi DEXD216RF", tester: 'Saldo', source: SALDO, date: '2025-05', grade: good },
];
