// Drawings for every other model on sale (the lists read from the brands' stores): the kind of
// machine it is (a robot with its washing station, a stick in its emptying dock, a capsule machine
// for Vertuo pods...) in the colour the store sells it in. Our own picks have a drawing each
// (products-*.mjs); these tell the rest apart honestly without pretending to be the exact model.
import { C, O, ground, o, shine } from './products-kit.mjs';

/** The colours a store names, as we draw them. */
export const COLOURS = {
  black: ['#2c3035', '#212428'],
  white: ['#f5f6f5', '#dde1e2'],
  grey: ['#8e969d', '#737b82'],
  silver: ['#c6ccd2', '#9fa7ae'],
  titanium: ['#6e7378', '#575c61'],
  beige: ['#c8b9a5', '#ad9e89'],
  cream: ['#efe6d2', '#d8ccb3'],
  red: ['#c8372d', '#a02b23'],
  blue: ['#3d6fb6', '#2f5991'],
  green: ['#6f9a6a', '#577d53'],
  pink: ['#e7a9b5', '#cf8d9a'],
  yellow: ['#f2c230', '#d4a61d'],
  gold: ['#c9a44a', '#a88636'],
  copper: ['#b8734a', '#95593a'],
  // A model whose colour the store does not state: a plain light grey, and no colour in its description.
  plain: ['#d9dde0', '#bfc5ca'],
};

const robotBody = (cx, cy, r, k, ks) => `
  <path d="M${cx - r} ${cy}v${r * 0.22}a${r} ${r * 0.34} 0 0 0 ${2 * r} 0v-${r * 0.22}Z" fill="${ks}" ${O}/>
  <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.34}" fill="${k}" ${O}/>
  <ellipse cx="${cx}" cy="${cy - 4}" rx="${r * 0.22}" ry="${r * 0.08}" fill="${ks}" ${o(3)}/>`;

const wheels = (x1, x2, y) => `<circle cx="${x1}" cy="${y}" r="9" fill="${C.black}" ${o(3)}/><circle cx="${x2}" cy="${y}" r="9" fill="${C.black}" ${o(3)}/>`;

/** family → form → (body colour, shade) → drawing. */
export const families = {
  // FloorVerdict
  robot: {
    none: (k, ks) => `${ground(130)}${robotBody(200, 290, 120, k, ks)}`,
    empty: (k, ks) => `${ground(140)}
      <path d="M214 120h84v216h-84Z" fill="${k}" ${O}/>
      <path d="M214 120h84v30h-84Z" fill="${ks}" ${O}/>
      <path d="M220 280h72v56h-72Z" fill="${ks}" ${O}/>
      ${robotBody(170, 298, 104, k, ks)}`,
    wash: (k, ks) => `${ground(150)}
      <path d="M170 70h150v266h-150Z" fill="${k}" ${O}/>
      <path d="M170 70h150v34h-150Z" fill="${ks}" ${O}/>
      <rect x="188" y="120" width="52" height="70" rx="8" fill="${C.glass}" ${O}/>
      <rect x="250" y="120" width="52" height="70" rx="8" fill="${C.smoke}" ${O}/>
      <path d="M176 276h138v60h-138Z" fill="${ks}" ${O}/>
      ${robotBody(148, 300, 100, k, ks)}`,
  },
  stick: {
    plain: (k, ks) => `${ground(110)}
      <path d="M244 150L190 318" stroke="${C.grey}" stroke-width="14" stroke-linecap="round"/>
      <path d="M244 150L190 318" fill="none" ${o(2)}/>
      <path d="M138 318h104l8 26h-120Z" fill="${ks}" ${O}/>
      <rect x="226" y="90" width="42" height="72" rx="12" fill="${C.glass}" ${O}/>
      <rect x="222" y="58" width="50" height="40" rx="12" fill="${k}" ${O}/>
      <path d="M272 70q30 6 26 44l-6 30" fill="none" stroke="${ks}" stroke-width="14" stroke-linecap="round"/>
      <path d="M272 70q30 6 26 44l-6 30" fill="none" ${o(2)}/>`,
    dock: (k, ks) => `${ground(104)}
      <path d="M160 206h80v130h-80Z" fill="${k}" ${O}/>
      <path d="M160 206h80v24h-80Z" fill="${ks}" ${O}/>
      <rect x="192" y="60" width="16" height="170" rx="7" fill="${C.grey}" ${O}/>
      <rect x="180" y="34" width="40" height="44" rx="12" fill="${k}" ${O}/>
      <rect x="182" y="244" width="36" height="62" rx="8" fill="${C.glass}" ${O}/>
      <path d="M140 330h120l8 16h-136Z" fill="${ks}" ${O}/>`,
  },
  wet: {
    plain: (k, ks) => `${ground(110)}
      <path d="M208 40h36" stroke="${ks}" stroke-width="16" stroke-linecap="round"/>
      <rect x="219" y="46" width="14" height="112" rx="6" fill="${ks}" ${O}/>
      <path d="M198 146h56l8 154h-72Z" fill="${k}" ${O}/>
      <rect x="206" y="168" width="40" height="54" rx="8" fill="${C.glass}" ${O}/>
      <path d="M208 196h36v24h-36Z" fill="${C.water}"/>
      <rect x="206" y="236" width="40" height="46" rx="8" fill="${C.smoke}" ${O}/>
      <path d="M114 312q0-18 18-18h138q18 0 18 18v26h-174Z" fill="${ks}" ${O}/>
      <rect x="122" y="322" width="156" height="12" rx="6" fill="${C.black}" opacity="0.5"/>`,
  },
  steam: {
    plain: (k, ks) => `${ground(100)}
      <path d="M222 44q-24-4-28 18l-4 30" fill="none" stroke="${ks}" stroke-width="12" stroke-linecap="round"/>
      <rect x="182" y="90" width="18" height="120" rx="8" fill="${k}" ${O}/>
      <path d="M176 204h30l6 92h-42Z" fill="${k}" ${O}/>
      <rect x="182" y="232" width="18" height="28" rx="4" fill="${C.glass}" ${O}/>
      <path d="M100 330l50-26h104l44 26v12h-198Z" fill="${ks}" ${O}/>`,
  },

  // ClimaVerdict
  dehum: {
    box: (k, ks) => `${ground(100)}
      <rect x="126" y="62" width="148" height="280" rx="16" fill="${k}" ${O}/>
      <rect x="142" y="76" width="116" height="26" rx="6" fill="${ks}" ${O}/>
      <path d="M126 206h148" stroke="${C.ink}" stroke-width="3"/>
      <rect x="236" y="232" width="12" height="64" rx="6" fill="${C.glass}" ${o(3)}/>
      <path d="M238 272h8v22h-8Z" fill="${C.water}"/>
      ${wheels(148, 252, 346)}`,
    mini: (k, ks) => `${ground(80)}
      <rect x="140" y="140" width="120" height="204" rx="18" fill="${k}" ${O}/>
      <path d="M160 126h80" stroke="${ks}" stroke-width="12" stroke-linecap="round"/>
      <circle cx="200" cy="180" r="10" fill="${ks}" ${O}/>
      <rect x="156" y="244" width="88" height="82" rx="10" fill="${C.glass}" ${O}/>
      <path d="M158 290h84v34h-84Z" fill="${C.water}"/>`,
    desiccant: (k, ks) => `${ground(90)}
      <path d="M136 118q0-40 40-40h48q40 0 40 40v224h-128Z" fill="${k}" ${O}/>
      <path d="M150 86h100v32h-100Z" fill="${ks}" ${O}/>
      <g stroke="${C.ink}" stroke-width="3">${[94, 102, 110].map((y) => `<path d="M156 ${y}h88"/>`).join('')}</g>
      <circle cx="200" cy="290" r="15" fill="${ks}" ${O}/>
      <path d="M136 238h128" stroke="${C.ink}" stroke-width="3"/>`,
  },
  heat: {
    oil: (k, ks) => `${ground(116)}
      ${Array.from({ length: 8 }, (_, i) => `<rect x="${130 + i * 20}" y="${88 + (i % 2) * 4}" width="18" height="236" rx="9" fill="${k}" ${O}/>`).join('')}
      <rect x="290" y="92" width="26" height="80" rx="8" fill="${ks}" ${O}/>
      <circle cx="303" cy="116" r="7" fill="${C.black}"/>
      ${wheels(128, 300, 344)}`,
    fan: (k, ks) => `${ground(100)}
      <rect x="124" y="110" width="152" height="232" rx="20" fill="${k}" ${O}/>
      <rect x="140" y="130" width="120" height="120" rx="14" fill="${ks}" ${O}/>
      <g stroke="${C.ink}" stroke-width="4" opacity="0.6">${[148, 164, 180, 196, 212, 228].map((y) => `<path d="M150 ${y}h100"/>`).join('')}</g>
      <circle cx="170" cy="290" r="12" fill="${ks}" ${O}/>
      <circle cx="230" cy="290" r="12" fill="${ks}" ${O}/>`,
    convector: (k, ks) => `${ground(140)}
      <rect x="70" y="150" width="260" height="160" rx="14" fill="${k}" ${O}/>
      <g stroke="${ks}" stroke-width="6" stroke-linecap="round">${[100, 124, 148, 172, 196, 220, 244, 268, 292].map((x) => `<path d="M${x} 166v22"/>`).join('')}</g>
      <rect x="276" y="220" width="36" height="60" rx="8" fill="${ks}" ${O}/>
      <path d="M104 310v34M296 310v34" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>`,
  },
  purifier: {
    tower: (k, ks) => `${ground(90)}
      <rect x="140" y="44" width="120" height="302" rx="14" fill="${k}" ${O}/>
      <rect x="160" y="64" width="80" height="30" rx="8" fill="${ks}" ${O}/>
      <g fill="${ks}">${Array.from({ length: 10 }, (_, r) => Array.from({ length: 6 }, (_, c) => `<circle cx="${166 + c * 13.5}" cy="${150 + r * 16}" r="3.6"/>`).join('')).join('')}</g>
      ${shine(148, 60, 7, 260)}`,
  },
  ac: {
    portable: (k, ks) => `${ground(104)}
      <rect x="124" y="52" width="152" height="288" rx="14" fill="${k}" ${O}/>
      <path d="M124 66a14 14 0 0 1 14-14h124a14 14 0 0 1 14 14v34h-152Z" fill="${ks}" ${O}/>
      <g stroke="${C.ink}" stroke-width="3">${[68, 76, 84].map((y) => `<path d="M142 ${y}h116"/>`).join('')}</g>
      ${wheels(144, 256, 344)}`,
  },

  // CupVerdict
  capsule: {
    original: (k, ks) => `${ground(96)}
      <path d="M140 124q0-40 40-40h86v226h-126Z" fill="${k}" ${O}/>
      <rect x="152" y="100" width="100" height="52" rx="10" fill="${ks}" ${O}/>
      <path d="M152 170h102v126h-102Z" fill="${C.screen}" ${O}/>
      <path d="M180 236h44v34a12 12 0 0 1-12 12h-20a12 12 0 0 1-12-12Z" fill="#f4f1ec" ${O}/>
      <path d="M184 242h36v8h-36Z" fill="${C.crema}"/>
      <path d="M128 296h150v14q0 12-12 12h-126q-12 0-12-12Z" fill="${ks}" ${O}/>`,
    vertuo: (k, ks) => `${ground(104)}
      <path d="M132 140q0-80 84-80t84 80v192h-168Z" fill="${k}" ${O}/>
      <ellipse cx="216" cy="98" rx="60" ry="22" fill="${ks}" ${O}/>
      <path d="M150 176h132v126h-132Z" fill="${C.screen}" ${O}/>
      <path d="M188 238h56v40a14 14 0 0 1-14 14h-28a14 14 0 0 1-14-14Z" fill="#f4f1ec" ${O}/>
      <path d="M192 244h48v10h-48Z" fill="${C.crema}"/>
      <path d="M124 330h184" stroke="${ks}" stroke-width="12" stroke-linecap="round"/>`,
    pod: (k, ks) => `${ground(96)}
      <path d="M150 330l20-230q30-40 60 0l20 230Z" fill="${k}" ${O}/>
      <ellipse cx="200" cy="112" rx="34" ry="14" fill="${ks}" ${O}/>
      <path d="M166 230h68v70h-68Z" fill="${C.screen}" ${O}/>
      <path d="M180 256h40v30a10 10 0 0 1-10 10h-20a10 10 0 0 1-10-10Z" fill="#f4f1ec" ${O}/>
      <path d="M132 330h136" stroke="${ks}" stroke-width="12" stroke-linecap="round"/>`,
  },
  superautomatic: {
    plain: (k, ks) => `${ground(116)}
      <rect x="116" y="58" width="176" height="292" rx="14" fill="${k}" ${O}/>
      <rect x="132" y="74" width="144" height="42" rx="8" fill="${ks}" ${O}/>
      <path d="M150 140h108v164h-108Z" fill="${C.screen}" ${O}/>
      <rect x="182" y="140" width="44" height="18" rx="5" fill="${C.steel}" ${O}/>
      <path d="M182 232h44v52a12 12 0 0 1-12 12h-20a12 12 0 0 1-12-12Z" fill="#f4f1ec" ${O}/>
      <path d="M186 240h36v10h-36Z" fill="${C.crema}"/>
      <rect x="140" y="302" width="128" height="18" rx="4" fill="${C.steelShade}" ${O}/>`,
    milk: (k, ks) => `${ground(120)}
      <rect x="116" y="58" width="180" height="292" rx="14" fill="${k}" ${O}/>
      <rect x="132" y="74" width="148" height="42" rx="8" fill="${ks}" ${O}/>
      <path d="M152 140h120v164h-120Z" fill="${C.screen}" ${O}/>
      <rect x="190" y="140" width="44" height="18" rx="5" fill="${C.steel}" ${O}/>
      <path d="M188 222h48v62a14 14 0 0 1-14 14h-20a14 14 0 0 1-14-14Z" fill="${C.glass}" ${O}/>
      <path d="M190 240h44v44a12 12 0 0 1-12 12h-20a12 12 0 0 1-12-12Z" fill="${C.latte}"/>
      <path d="M92 150h46v108a10 10 0 0 1-10 10h-26a10 10 0 0 1-10-10Z" fill="${C.glass}" ${O}/>
      <path d="M94 194h42v62a8 8 0 0 1-8 8h-26a8 8 0 0 1-8-8Z" fill="${C.milk}"/>
      <rect x="88" y="140" width="54" height="16" rx="5" fill="${ks}" ${O}/>
      <rect x="144" y="302" width="136" height="18" rx="4" fill="${C.steelShade}" ${O}/>`,
  },
  'manual-espresso': {
    plain: (k, ks) => `${ground(110)}
      <rect x="130" y="80" width="150" height="270" rx="14" fill="${k}" ${O}/>
      <circle cx="205" cy="126" r="14" fill="${ks}" ${O}/>
      <rect x="164" y="170" width="84" height="22" rx="8" fill="${ks}" ${O}/>
      <rect x="178" y="192" width="56" height="16" rx="6" fill="${C.chrome}" ${O}/>
      <path d="M178 200h-78" stroke="${C.black}" stroke-width="14" stroke-linecap="round"/>
      <path d="M272 150q24 0 24 30v90" fill="none" stroke="${C.chrome}" stroke-width="8" stroke-linecap="round"/>
      <path d="M186 256h40v28a12 12 0 0 1-12 12h-16a12 12 0 0 1-12-12Z" fill="#f4f1ec" ${O}/>
      <rect x="142" y="300" width="126" height="20" rx="4" fill="${C.steelShade}" ${O}/>`,
    grinder: (k, ks) => `${ground(120)}
      <path d="M232 36h50l-6 52h-38Z" fill="${C.smoke}" ${O}/>
      <path d="M236 60h42l-4 26h-34Z" fill="${C.bean}"/>
      <rect x="112" y="84" width="184" height="266" rx="14" fill="${k}" ${O}/>
      <circle cx="150" cy="130" r="16" fill="${ks}" ${O}/>
      <rect x="160" y="176" width="84" height="22" rx="8" fill="${ks}" ${O}/>
      <rect x="174" y="198" width="56" height="16" rx="6" fill="${C.chrome}" ${O}/>
      <path d="M174 206h-78" stroke="${C.black}" stroke-width="14" stroke-linecap="round"/>
      <path d="M182 258h40v28a12 12 0 0 1-12 12h-16a12 12 0 0 1-12-12Z" fill="#f4f1ec" ${O}/>
      <rect x="130" y="300" width="148" height="20" rx="4" fill="${C.steelShade}" ${O}/>`,
  },
  moka: {
    plain: (k, ks) => `${ground(92)}
      <path d="M150 350l14-104h72l14 104Z" fill="${k}" ${O}/>
      <rect x="158" y="236" width="84" height="14" rx="3" fill="${ks}" ${O}/>
      <path d="M160 236l-14-126h108l-14 126Z" fill="${k}" ${O}/>
      <path d="M144 100q56-30 112 0Z" fill="${k}" ${O}/>
      <path d="M146 110l-22-8 26-6Z" fill="${k}" ${O}/>
      <rect x="190" y="68" width="20" height="18" rx="6" fill="${C.black}" ${O}/>
      <path d="M252 120q48 6 40 58t-44 58" fill="none" stroke="${C.black}" stroke-width="18" stroke-linecap="round"/>`,
  },
  drip: {
    glass: (k, ks) => `${ground(104)}
      <rect x="130" y="50" width="150" height="300" rx="14" fill="${k}" ${O}/>
      <rect x="146" y="70" width="118" height="92" rx="8" fill="${ks}" ${O}/>
      <path d="M144 190h122v130h-122Z" fill="${C.screen}" ${O}/>
      <path d="M152 222h86v82a14 14 0 0 1-14 14h-58a14 14 0 0 1-14-14Z" fill="${C.glass}" ${O}/>
      <path d="M154 252h82v52a12 12 0 0 1-12 12h-58a12 12 0 0 1-12-12Z" fill="${C.coffee}"/>
      <rect x="126" y="330" width="158" height="20" rx="6" fill="${ks}" ${O}/>`,
    thermo: (k, ks) => `${ground(104)}
      <rect x="130" y="50" width="150" height="300" rx="14" fill="${k}" ${O}/>
      <rect x="146" y="70" width="118" height="92" rx="8" fill="${ks}" ${O}/>
      <path d="M144 190h122v130h-122Z" fill="${C.screen}" ${O}/>
      <path d="M160 214h80v100a10 10 0 0 1-10 10h-60a10 10 0 0 1-10-10Z" fill="${C.steel}" ${O}/>
      <rect x="126" y="330" width="158" height="20" rx="6" fill="${ks}" ${O}/>`,
  },
  grinder: {
    plain: (k, ks) => `${ground(90)}
      <path d="M156 50h88l-8 70h-72Z" fill="${C.smoke}" ${O}/>
      <path d="M162 90h76l-4 30h-68Z" fill="${C.bean}"/>
      <rect x="146" y="118" width="108" height="232" rx="16" fill="${k}" ${O}/>
      <circle cx="200" cy="170" r="16" fill="${ks}" ${O}/>
      <rect x="162" y="244" width="76" height="86" rx="10" fill="${ks}" ${O}/>`,
  },
};
