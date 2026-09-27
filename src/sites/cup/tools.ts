// Calculator pages of CupVerdict: keys, localized URLs and how they are grouped.
import type { ToolsPack } from '../../lib/pack';

export const tools: ToolsPack | null = {
  keys: ['tool-brew-ratio', 'tool-home-payback', 'tool-cafe-cost', 'tool-office-cost'],
  routes: {
    'tool-brew-ratio': {
      en: 'tools/coffee-to-water-ratio-calculator',
      it: 'strumenti/calcolatore-dosi-caffe-acqua',
      de: 'rechner/kaffee-wasser-verhaeltnis',
      es: 'herramientas/calculadora-proporcion-cafe-agua',
      pl: 'narzedzia/kalkulator-proporcji-kawy-i-wody',
      sv: 'verktyg/kalkylator-kaffe-och-vatten',
    },
    'tool-home-payback': {
      en: 'tools/home-coffee-machine-savings-calculator',
      it: 'strumenti/calcolatore-risparmio-macchina-caffe',
      de: 'rechner/kaffeemaschine-amortisation',
      es: 'herramientas/calculadora-ahorro-cafetera',
      pl: 'narzedzia/kalkulator-oszczednosci-ekspres',
      sv: 'verktyg/kalkylator-besparing-kaffemaskin',
    },
    'tool-cafe-cost': {
      en: 'tools/cafe-cost-per-cup-calculator',
      it: 'strumenti/calcolatore-costo-tazzina-bar',
      de: 'rechner/kosten-pro-tasse-cafe',
      es: 'herramientas/calculadora-coste-taza-cafeteria',
      pl: 'narzedzia/kalkulator-kosztu-filizanki-kawiarnia',
      sv: 'verktyg/kalkylator-kostnad-per-kopp-kafe',
    },
    'tool-office-cost': {
      en: 'tools/office-coffee-cost-calculator',
      it: 'strumenti/calcolatore-costo-caffe-ufficio',
      de: 'rechner/kaffeekosten-buero',
      es: 'herramientas/calculadora-coste-cafe-oficina',
      pl: 'narzedzia/kalkulator-kosztow-kawy-w-biurze',
      sv: 'verktyg/kalkylator-kaffekostnad-kontor',
    },
  },
  meta: {
    'tool-brew-ratio': { audience: 'home', icon: 'dripper' },
    'tool-home-payback': { audience: 'home', icon: 'machine' },
    'tool-cafe-cost': { audience: 'business', icon: 'receipt' },
    'tool-office-cost': { audience: 'business', icon: 'office' },
  },
};
