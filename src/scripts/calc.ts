export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? `{${k}}`);
}

export function num(form: HTMLFormElement, name: string): number {
  const el = form.elements.namedItem(name) as HTMLInputElement | null;
  return el ? el.valueAsNumber : NaN;
}

export function allFinite(...values: number[]): boolean {
  return values.every((v) => Number.isFinite(v));
}

export function money(locale: string, currency: string, value: number): string {
  // Min and max must move together: currency formats default to 2 minimum digits.
  const digits = Math.abs(value) < 100 ? 2 : 0;
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function plain(locale: string, value: number, digits = 1): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value);
}

export function currencySymbol(locale: string, currency: string): string {
  return (
    new Intl.NumberFormat(locale, { style: 'currency', currency, currencyDisplay: 'narrowSymbol' })
      .formatToParts(0)
      .find((p) => p.type === 'currency')?.value ?? currency
  );
}

export function currencyOf(form: HTMLFormElement): string {
  const checked = form.querySelector<HTMLInputElement>('input[name="currency"]:checked');
  return checked?.value ?? 'EUR';
}

export function out(root: ParentNode, key: string): HTMLElement | null {
  return root.querySelector<HTMLElement>(`[data-out="${key}"]`);
}

export function setText(root: ParentNode, key: string, text: string): void {
  const el = out(root, key);
  if (el) el.textContent = text;
}

const running = new WeakMap<Element, number>();
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Animated number: counts from the previous value to the new one, like a scale settling.
export function tween(el: HTMLElement | null, to: number, format: (n: number) => string): void {
  if (!el) return;
  const from = el.dataset.v === undefined ? to : Number(el.dataset.v);
  el.dataset.v = String(to);
  const prev = running.get(el);
  if (prev) cancelAnimationFrame(prev);
  if (reducedMotion() || !Number.isFinite(from) || !Number.isFinite(to) || from === to) {
    el.textContent = format(to);
    return;
  }
  const start = performance.now();
  const duration = 520;
  const frame = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = format(from + (to - from) * eased);
    if (t < 1) running.set(el, requestAnimationFrame(frame));
    else running.delete(el);
  };
  running.set(el, requestAnimationFrame(frame));
}

export function blank(el: HTMLElement | null): void {
  if (!el) return;
  delete el.dataset.v;
  el.textContent = '—';
}

// Screen readers get one calm sentence after the numbers settle, not every animation frame.
const announceTimers = new WeakMap<HTMLElement, number>();
export function announce(form: HTMLFormElement, text: string): void {
  const el = form.querySelector<HTMLElement>('[data-announce]');
  if (!el) return;
  window.clearTimeout(announceTimers.get(el));
  announceTimers.set(el, window.setTimeout(() => (el.textContent = text), 800));
}

export function bar(root: ParentNode, key: string, percent: number): void {
  const el = root.querySelector<HTMLElement>(`[data-bar="${key}"]`);
  if (el) el.style.setProperty('--w', `${Math.max(0, Math.min(100, percent))}%`);
}

// Prefill inputs from the query string, so calculators can hand values to each other.
function prefill(form: HTMLFormElement): void {
  const params = new URLSearchParams(location.search);
  params.forEach((value, key) => {
    const el = form.elements.namedItem(key);
    if (el instanceof HTMLInputElement && el.type === 'number' && value.trim() !== '' && Number.isFinite(Number(value))) {
      el.value = value;
      // Lets the stepper repaint its slider, whichever script initialised first.
      el.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (el instanceof RadioNodeList) {
      const radio = [...el].find((r) => (r as HTMLInputElement).value === value) as HTMLInputElement | undefined;
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });
}

function syncCurrency(form: HTMLFormElement): void {
  const locale = form.dataset.locale ?? 'en-US';
  const symbol = currencySymbol(locale, currencyOf(form));
  form.querySelectorAll('[data-currency-symbol]').forEach((el) => (el.textContent = symbol));
}

export function onCalc(name: string, init: (form: HTMLFormElement) => () => void): void {
  const run = () => {
    document.querySelectorAll<HTMLFormElement>(`form[data-calc="${name}"]:not([data-ready])`).forEach((form) => {
      form.dataset.ready = '1';
      prefill(form);
      const render = init(form);
      const update = () => {
        syncCurrency(form);
        render();
      };
      form.addEventListener('input', update);
      form.addEventListener('change', update);
      form.addEventListener('submit', (e) => e.preventDefault());
      update();
    });
  };
  document.addEventListener('astro:page-load', run);
}
