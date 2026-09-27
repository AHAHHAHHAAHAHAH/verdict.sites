// CupVerdict quiz: 3 taps at most, then straight to the verdict page.
import type { Market, QuizDef, T } from '../../lib/pack';
import { strings, type CupStrings } from './strings';

// Quiz texts live in strings.ts; this builds a per-language text from one of them.
type QuizText = { quiz: Pick<CupStrings['quiz'], 'q1' | 'a1' | 'q2' | 'a2' | 'q3'> };
const s = (pick: (x: QuizText) => string): T => ({
  en: pick(strings.en),
  it: pick(strings.it),
  de: pick(strings.de),
  es: pick(strings.es),
  pl: pick(strings.pl),
  sv: pick(strings.sv),
});

// "I enjoy the ritual" for espresso leads to manual espresso machines, published only in the US,
// the UK, Italy and Germany; elsewhere the question has one answer and the quiz answers it by itself.
const effort = (next: string | null, ritualMarkets?: Market[]) => [
  { value: 'button', label: s((x) => x.quiz.a2.button), icon: 'tap', next },
  { value: 'ritual', label: s((x) => x.quiz.a2.ritual), icon: 'portafilter', next, ...(ritualMarkets ? { markets: ritualMarkets } : {}) },
];

export const quiz = {
  steps: [
    {
      id: 'drink',
      title: s((x) => x.quiz.q1),
      layout: 'grid',
      next: 'effort',
      options: [
        { value: 'espresso', label: s((x) => x.quiz.a1.espresso), icon: 'espresso' },
        { value: 'milk', label: s((x) => x.quiz.a1.milk), icon: 'latte' },
        { value: 'moka', label: s((x) => x.quiz.a1.moka), icon: 'moka', next: null },
        { value: 'filter', label: s((x) => x.quiz.a1.filter), icon: 'dripper', next: 'effort-filter' },
      ],
    },
    { id: 'effort', title: s((x) => x.quiz.q2), layout: 'grid', options: effort('budget', ['us', 'gb', 'it', 'de']) },
    { id: 'effort-filter', title: s((x) => x.quiz.q2), layout: 'grid', options: effort(null) },
    {
      id: 'budget',
      title: s((x) => x.quiz.q3),
      layout: 'stack',
      options: [
        { value: 'low', budget: { tier: 'low' }, level: 1 },
        { value: 'mid', budget: { tier: 'mid' }, level: 2 },
        { value: 'high', budget: { tier: 'high' }, level: 3 },
      ],
    },
  ],
  // The budget lines in each country's money: [top of the lowest range, top of the middle one].
  budget: { USD: [200, 500], GBP: [200, 500], EUR: [200, 500], PLN: [800, 2000], SEK: [2000, 5000] },
  results: {
    'espresso|button|low': ['capsule', 'espresso'],
    'espresso|button|mid': ['superautomatic', 'main'],
    'espresso|button|high': ['superautomatic', 'auto'],
    'milk|button|low': ['capsule', 'main'],
    'milk|button|mid': ['capsule', 'main'],
    'milk|button|high': ['superautomatic', 'auto'],
    'espresso|ritual|low': ['manual-espresso', 'main'],
    'espresso|ritual|mid': ['manual-espresso', 'main'],
    'espresso|ritual|high': ['manual-espresso', 'main'],
    'milk|ritual|low': ['manual-espresso', 'main'],
    'milk|ritual|mid': ['manual-espresso', 'main'],
    'milk|ritual|high': ['manual-espresso', 'main'],
    'filter|button': ['drip', 'main'],
    'filter|ritual': ['manual-filter', 'main'],
    moka: ['moka', 'main'],
  },
  carry: { step: 'budget', param: 'b' },
} satisfies QuizDef;
