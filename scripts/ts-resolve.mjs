// Lets the weekly scripts import a site's catalog.ts directly with Node: the catalogs import
// sibling TypeScript files without an extension (as Astro and Vite allow), so this adds ".ts".
import { register } from 'node:module';

register('./ts-resolve-hook.mjs', import.meta.url);
