// Epilogue for headings, Figtree for text, Spline Sans Mono for readings. Self-hosted; the two
// faces used above the fold are preloaded. Polish and German letters come from latin-ext.
import '@fontsource-variable/epilogue/wght.css';
import '@fontsource-variable/figtree/wght.css';
import '@fontsource-variable/spline-sans-mono/wght.css';
import display from '@fontsource-variable/epilogue/files/epilogue-latin-wght-normal.woff2?url';
import text from '@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2?url';

export const preloadFonts: string[] = [display, text];
