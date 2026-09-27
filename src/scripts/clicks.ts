// Counts the clicks from our pages to the stores, where the site turns it on (site.clickCount sets
// data-clicks on <html>): the page and the store's address, sent to functions/api/out.js. Nothing
// about the visitor is sent, and the link opens exactly as it would without it.
// Store links are the site's only nofollow links (sources are followed), so they are told by that.

function count(event: MouseEvent): void {
  if (!('clicks' in document.documentElement.dataset)) return;
  if (event.type === 'auxclick' && event.button !== 1) return;
  const link = (event.target as Element | null)?.closest?.('a[rel~="nofollow"][href^="https://"]');
  if (!(link instanceof HTMLAnchorElement)) return;
  const body = JSON.stringify({ p: location.pathname, h: new URL(link.href).host });
  navigator.sendBeacon?.('/api/out', new Blob([body], { type: 'text/plain' }));
}

document.addEventListener('click', count, { capture: true });
document.addEventListener('auxclick', count, { capture: true });
