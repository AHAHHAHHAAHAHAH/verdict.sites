// Independent test results for FloorVerdict's types (each with its source), matched by name to
// what the brand stores sell in each country. Only models whose exact name is on sale here: a
// tested US model with a different European name is left out rather than guessed.
import type { TestResult } from '../../lib/pack';

const VW_ROBOT = 'https://vacuumwars.com/vacuum-wars-best-robot-vacuums/';
const VW_STICK = 'https://vacuumwars.com/best-cordless-vacuums/';
const VW_WET = 'https://vacuumwars.com/best-hard-floor-cleaners-vacuum-mop-combos/';
const HOOKUP = 'https://www.thesmarthomehookup.com/2026-ultimate-robot-vacuum-and-mop-comparison/';
const SW_STEAM = 'https://www.test.de/Dampfreiniger-im-Test-Kaercher-dampft-am-besten-1523412-0/';

const vw = (cat: string, name: string, place: number, of: number, extra: Partial<TestResult> = {}): TestResult => ({
  cat,
  name,
  tester: 'Vacuum Wars',
  source: cat === 'robot' ? VW_ROBOT : cat === 'stick' ? VW_STICK : VW_WET,
  date: '2026-09',
  rank: [place, of],
  ...extra,
});

export const tests: TestResult[] = [
  // Vacuum Wars, 20 robots bought at retail (24 September 2026).
  vw('robot', 'Mova V70 Ultra Complete', 1, 20, { award: 'overall', need: 'main' }),
  vw('robot', 'Narwal Freo 20', 2, 20, { need: 'main' }),
  vw('robot', 'Mova Mobius 60', 5, 20, { need: 'main' }),
  vw('robot', 'Eufy Omni S2', 6, 20, { need: 'main' }),
  vw('robot', 'Ecovacs Deebot T80S Omni', 8, 20, { award: 'budget', need: 'save' }),
  vw('robot', 'Roborock Qrevo Edge 2', 11, 20),
  vw('robot', 'Roborock Saros 20', 12, 20),
  vw('robot', 'Roborock Saros 20 Sonic', 13, 20),
  vw('robot', 'Dreame L50 Ultra', 15, 20),
  vw('robot', 'Narwal Flow 2', 18, 20),
  vw('robot', 'Eufy Omni C28', 19, 20),
  vw('robot', 'Dreame Matrix10 Ultra', 20, 20),
  // The Hook Up, 7 flagship robots measured side by side (April 2026).
  { cat: 'robot', name: 'Roborock Qrevo Curv 2 Flow', tester: 'The Hook Up', source: HOOKUP, date: '2026-04', rank: [1, 7], award: 'overall', need: 'main' },
  { cat: 'robot', name: 'Eufy Omni S2', tester: 'The Hook Up', source: HOOKUP, date: '2026-04', rank: [2, 7], award: 'flagship', need: 'main' },
  { cat: 'robot', name: 'Narwal Flow 2', tester: 'The Hook Up', source: HOOKUP, date: '2026-04', award: 'pets', need: 'pets' },
  { cat: 'robot', name: 'Dreame X50 Ultra', tester: 'The Hook Up', source: HOOKUP, date: '2026-04', award: 'value', need: 'save' },
  // Vacuum Wars, 10 cordless vacuums (24 September 2026).
  vw('stick', 'Shark PowerDetect Clean IP3251EUT', 3, 10, { award: 'value', need: 'auto' }),
  // Vacuum Wars, 10 hard floor cleaners (25 September 2026).
  vw('wet', 'Tineco Floor One Stretch S6', 2, 10, { award: 'value', need: 'main' }),
  vw('wet', 'Roborock F25 Ultra', 5, 10, { need: 'tough' }),
  vw('wet', 'Tineco Floor One S7 Pro', 8, 10),
  // Test-Achats' test of 16 upright steam mops, reported by Stiftung Warentest (February 2025).
  { cat: 'steam', name: 'Kärcher SC 2 Upright', tester: 'Test-Achats', source: SW_STEAM, date: '2025-02', rank: [1, 16], need: 'main' },
];
