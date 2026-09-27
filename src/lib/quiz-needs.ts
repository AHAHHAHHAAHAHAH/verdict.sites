// The quiz's second question for FloorVerdict and ClimaVerdict comes straight from each category's
// needs: the same situations, in the same words, as the category page. One source, no drift.
// Where a category has budget lines, a third question asks how much to spend, in that country's
// money, and the answer travels to the page (?b=) so nothing above it is shown.
import { languages } from '../i18n/editions';
import { marketMeta } from '../i18n/markets';
import { t } from '../i18n/ui';
import { tiers } from './budget';
import type { Catalog, Market, QuizStep, T } from './pack';

export function needSteps(catalog: Pick<Catalog, 'categories' | 'categoryIds'>, title: T, allMarkets: readonly Market[]) {
  const steps: QuizStep[] = [];
  const results: Record<string, [string, string]> = {};
  const budgetSteps: string[] = [];
  for (const id of catalog.categoryIds) {
    const c = catalog.categories[id];
    const catMarkets = c.markets ?? allMarkets;
    const asksBudget = Boolean(c.budget);
    steps.push({
      id: `${id}-q`,
      title,
      layout: 'grid',
      next: asksBudget ? `${id}-b` : null,
      options: c.needs.map((n) => {
        // A need is offered where at least one of its picks is sold.
        const markets = n.picks.some((p) => !p.markets) ? [...catMarkets] : [...new Set(n.picks.flatMap((p) => p.markets ?? []))].filter((m) => catMarkets.includes(m));
        return { value: n.id, icon: n.icon, label: n.label, markets };
      }),
    });
    if (asksBudget) {
      // Only in the countries whose currency has lines for this category; the quiz writes each
      // range in the visitor's money.
      const markets = catMarkets.filter((m) => c.budget?.[marketMeta[m].currency]);
      steps.push({
        id: `${id}-b`,
        title: Object.fromEntries(languages.map((l) => [l, t(l).budget.title])),
        layout: 'stack',
        options: tiers.map((tier, i) => ({ value: tier, level: i + 1, budget: { category: id, tier }, markets })),
      });
      budgetSteps.push(`${id}-b`);
      for (const n of c.needs) for (const tier of tiers) results[`${id}|${n.id}|${tier}`] = [id, n.id];
    }
    for (const n of c.needs) results[`${id}|${n.id}`] = [id, n.id];
  }
  return { steps, results, carry: budgetSteps.length ? { step: budgetSteps, param: 'b' } : undefined };
}
