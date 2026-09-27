// Self-hosted variable fonts; the two faces used above the fold are preloaded.
import '@fontsource-variable/bricolage-grotesque/wght.css';
import '@fontsource-variable/instrument-sans/wght.css';
import '@fontsource-variable/martian-mono/wght.css';
import display from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url';
import text from '@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2?url';

export const preloadFonts: string[] = [display, text];
