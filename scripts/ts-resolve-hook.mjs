// Module resolve hook used by ts-resolve.mjs: adds ".ts" to extensionless relative imports, and
// maps "@site/..." to the pack of the site in SITE (as astro.config does for the build).
import { pathToFileURL } from 'node:url';

export async function resolve(specifier, context, next) {
  if (specifier.startsWith('@site/')) {
    const site = process.env.SITE;
    if (!site) throw new Error(`"${specifier}" needs the SITE variable (cup, floor or clima)`);
    const base = pathToFileURL(`${process.cwd()}/src/sites/${site}/`).href;
    return resolve(new URL(specifier.slice('@site/'.length), base).href, context, next);
  }
  try {
    return await next(specifier, context);
  } catch (e) {
    const relative = specifier.startsWith('./') || specifier.startsWith('../') || specifier.startsWith('file:');
    if (e.code === 'ERR_MODULE_NOT_FOUND' && relative && !/\.[a-z]+$/i.test(specifier)) return next(`${specifier}.ts`, context);
    throw e;
  }
}
