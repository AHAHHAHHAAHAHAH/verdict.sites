// Calculator components by page key; only the tool page view imports this.
import BrewRatio from './tools/BrewRatio.astro';
import HomePayback from './tools/HomePayback.astro';
import CafeCost from './tools/CafeCost.astro';
import OfficeCost from './tools/OfficeCost.astro';

export const toolComponents = {
  'tool-brew-ratio': BrewRatio,
  'tool-home-payback': HomePayback,
  'tool-cafe-cost': CafeCost,
  'tool-office-cost': OfficeCost,
};
