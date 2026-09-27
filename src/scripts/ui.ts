// Site-wide interaction layer. Runs on every page load, including client-side navigations.

let page = new AbortController();
document.addEventListener('astro:before-swap', () => {
  page.abort();
  page = new AbortController();
  document.documentElement.classList.remove('menu-open');
});

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Reveal animations belong to scrolling. Content that appears for any other reason
// (resize, print, automated audits) shows instantly and fully opaque.
let lastScroll = 0;
window.addEventListener('scroll', () => (lastScroll = performance.now()), { passive: true });

function initReveal(): void {
  const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in):not(.reveal-pending)')];
  if (reduced() || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          if (performance.now() - lastScroll > 300) entry.target.classList.add('no-anim');
          entry.target.classList.remove('reveal-pending');
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.06 },
  );
  const fold = window.innerHeight;
  for (const el of items) {
    // Already on screen: show as-is. Below the fold: hide now (off-screen, so no flash), fade in later.
    if (el.getBoundingClientRect().top < fold) {
      el.classList.add('is-in');
    } else {
      el.classList.add('reveal-pending');
      io.observe(el);
    }
  }
  page.signal.addEventListener('abort', () => io.disconnect());
}

function initSteppers(): void {
  document.querySelectorAll<HTMLElement>('[data-stepper]:not([data-live])').forEach((box) => {
    box.dataset.live = '1';
    const input = box.querySelector<HTMLInputElement>('input[type="number"]');
    const range = box.querySelector<HTMLInputElement>('input[type="range"]');
    if (!input) return;

    const paint = () => {
      if (!range || !Number.isFinite(input.valueAsNumber)) return;
      const min = Number(range.min);
      const max = Number(range.max);
      const v = Math.min(max, Math.max(min, input.valueAsNumber));
      range.value = String(v);
      range.style.setProperty('--p', String(((v - min) / (max - min)) * 100));
    };
    const emit = () => input.dispatchEvent(new Event('input', { bubbles: true }));
    const decimals = (input.step.split('.')[1] ?? '').length;

    const nudge = (dir: number) => {
      const step = Number(input.step) || 1;
      const min = input.min === '' ? -Infinity : Number(input.min);
      const max = input.max === '' ? Infinity : Number(input.max);
      const current = Number.isFinite(input.valueAsNumber) ? input.valueAsNumber : 0;
      const next = Math.min(max, Math.max(min, Number((current + dir * step).toFixed(decimals))));
      input.value = String(next);
      emit();
    };

    box.querySelectorAll<HTMLButtonElement>('button[data-dir]').forEach((btn) => {
      const dir = Number(btn.dataset.dir);
      let timer = 0;
      let delay = 400;
      const stop = () => {
        window.clearTimeout(timer);
        delay = 400;
      };
      // Press and hold accelerates, like the buttons on a real scale.
      const repeat = () => {
        nudge(dir);
        delay = Math.max(35, delay * 0.8);
        timer = window.setTimeout(repeat, delay);
      };
      btn.addEventListener('pointerdown', (e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        nudge(dir);
        timer = window.setTimeout(repeat, delay);
      });
      btn.addEventListener('pointerup', stop);
      btn.addEventListener('pointercancel', stop);
      btn.addEventListener('pointerleave', stop);
      btn.addEventListener('click', (e) => {
        if (e.detail === 0) nudge(dir);
      });
    });

    range?.addEventListener('input', (e) => {
      e.stopPropagation();
      input.value = range.value;
      emit();
    });
    input.addEventListener('input', paint);
    paint();
  });
}

function initSegmented(): void {
  document.querySelectorAll<HTMLElement>('[data-segmented]:not(.is-live)').forEach((seg) => {
    seg.classList.add('is-live');
    const track = seg.querySelector<HTMLElement>('.track');
    const thumb = seg.querySelector<HTMLElement>('.thumb');
    if (!track || !thumb) return;

    const place = (instant: boolean) => {
      const label = seg.querySelector('input:checked')?.closest('label') as HTMLElement | null;
      if (!label) return;
      if (instant) thumb.style.transition = 'none';
      thumb.style.setProperty('--x', `${label.offsetLeft}px`);
      thumb.style.setProperty('--w', `${label.offsetWidth}px`);
      if (instant) {
        void thumb.offsetWidth;
        thumb.style.transition = '';
      }
      if (!instant && track.scrollWidth > track.clientWidth) {
        track.scrollTo({
          left: label.offsetLeft - (track.clientWidth - label.offsetWidth) / 2,
          behavior: reduced() ? 'auto' : 'smooth',
        });
      }
    };

    seg.addEventListener('change', () => place(false));
    const ro = new ResizeObserver(() => place(true));
    ro.observe(track);
    page.signal.addEventListener('abort', () => ro.disconnect());
    document.fonts?.ready.then(() => place(true));
    place(true);
  });
}

function initMenu(): void {
  const btn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const panel = document.getElementById('mobile-nav');
  if (!btn || !panel || btn.dataset.live) return;
  btn.dataset.live = '1';

  const set = (open: boolean) => {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', (open ? btn.dataset.labelClose : btn.dataset.labelOpen) ?? '');
    panel.toggleAttribute('inert', !open);
    panel.dataset.open = String(open);
    document.documentElement.classList.toggle('menu-open', open);
    if (open) panel.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
  };

  panel.toggleAttribute('inert', true);
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  panel.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) set(false);
  });
  document.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
        set(false);
        btn.focus();
      }
    },
    { signal: page.signal },
  );
  window.matchMedia('(min-width: 52rem)').addEventListener(
    'change',
    (mq) => {
      if (mq.matches) set(false);
    },
    { signal: page.signal },
  );
}

function initLangMenus(): void {
  const menus = document.querySelectorAll<HTMLDetailsElement>('details[data-lang-menu]');
  if (!menus.length) return;
  document.addEventListener(
    'click',
    (e) => {
      menus.forEach((m) => {
        if (m.open && !m.contains(e.target as Node)) m.open = false;
      });
    },
    { signal: page.signal },
  );
  document.addEventListener(
    'keydown',
    (e) => {
      if (e.key !== 'Escape') return;
      menus.forEach((m) => {
        if (m.open) {
          m.open = false;
          m.querySelector('summary')?.focus();
        }
      });
    },
    { signal: page.signal },
  );
}

// Mobile: a slim bar mirrors the main result while the inputs are being edited.
function initResultBars(): void {
  document.querySelectorAll<HTMLElement>('[data-shell]:not([data-rb])').forEach((shell) => {
    shell.dataset.rb = '1';
    const bar = shell.querySelector<HTMLElement>('[data-result-bar]');
    const panel = shell.querySelector<HTMLElement>('[data-results]');
    const primary = shell.querySelector<HTMLElement>('[data-primary]');
    const mirror = bar?.querySelector<HTMLElement>('[data-mirror]');
    if (!bar || !panel || !primary || !mirror) return;

    const unit = primary.closest('.readout')?.querySelector('[data-unit-for]');
    const copy = () => {
      mirror.textContent = [primary.textContent, unit?.textContent].filter(Boolean).join(' ');
    };
    const mo = new MutationObserver(copy);
    mo.observe(primary, { childList: true, characterData: true, subtree: true });
    if (unit) mo.observe(unit, { childList: true, characterData: true, subtree: true });
    copy();

    let panelVisible = true;
    let shellVisible = false;
    const update = () => {
      const show = shellVisible && !panelVisible;
      bar.classList.toggle('is-shown', show);
      bar.toggleAttribute('inert', !show);
    };
    const ioPanel = new IntersectionObserver(([e]) => {
      panelVisible = e.isIntersecting;
      update();
    }, { threshold: 0.2 });
    const ioShell = new IntersectionObserver(([e]) => {
      shellVisible = e.isIntersecting;
      update();
    });
    ioPanel.observe(panel);
    ioShell.observe(shell);
    page.signal.addEventListener('abort', () => {
      ioPanel.disconnect();
      ioShell.disconnect();
      mo.disconnect();
    });
    bar.querySelector('button')?.addEventListener('click', () => {
      panel.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'start' });
    });
  });
}

document.addEventListener('astro:page-load', () => {
  initReveal();
  initSteppers();
  initSegmented();
  initMenu();
  initLangMenus();
  initResultBars();
});
