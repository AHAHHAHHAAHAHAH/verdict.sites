// Archivo (with its width axis) for headings, Onest for text, Azeret Mono for data. Self-hosted;
// the two faces used above the fold are preloaded. Polish and Swedish letters come from latin-ext.
import '@fontsource-variable/archivo/standard.css';
import '@fontsource-variable/onest/wght.css';
import '@fontsource-variable/azeret-mono/wght.css';
import display from '@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2?url';
import text from '@fontsource-variable/onest/files/onest-latin-wght-normal.woff2?url';

export const preloadFonts: string[] = [display, text];
