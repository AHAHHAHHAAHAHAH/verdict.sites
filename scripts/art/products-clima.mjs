// ClimaVerdict: one drawing per product we recommend (see products-cup.mjs for the rules).
import { C, O, ground, o, shine } from './products-kit.mjs';

/** Two small wheels under a box. */
const wheels = (x1, x2, y) => `<circle cx="${x1}" cy="${y}" r="9" fill="${C.black}" ${o(3)}/><circle cx="${x2}" cy="${y}" r="9" fill="${C.black}" ${o(3)}/>`;

// The Midea PortaSplit is one product shown twice (for heating and for cooling).
const portasplit = () => `
    ${ground(120)}
    <path d="M280 108q56 0 56 70v150" fill="none" stroke="${C.whiteShade}" stroke-width="14" stroke-linecap="round"/>
    <path d="M280 108q56 0 56 70v150" fill="none" ${o(2)}/>
    <rect x="112" y="186" width="176" height="160" rx="10" fill="${C.white}" ${O}/>
    <path d="M112 186h176v54h-176Z" fill="${C.whiteShade}" ${O}/>
    <rect x="130" y="204" width="60" height="8" rx="4" fill="#9aa1a8"/>
    <rect x="122" y="54" width="160" height="126" rx="8" fill="${C.white}" ${O}/>
    <circle cx="190" cy="118" r="46" fill="#dfe6ec" ${O}/>
    <path d="M190 72v92M144 118h92M158 86l64 64M222 86l-64 64" stroke="#6a8fb5" stroke-width="5"/>
    <circle cx="190" cy="118" r="12" fill="#4d6e91" ${O}/>
    <path d="M250 70v96" stroke="${C.whiteShade}" stroke-width="16"/>
    <rect x="112" y="340" width="176" height="8" fill="${C.whiteShade}"/>`;

export const clima = {
  // Bosch Air 4000: a white cylinder, dark top with the controls, grey slots around the bottom.
  'bosch-air-4000': () => `
    ${ground(90)}
    <path d="M136 92h128l-8 250h-112Z" fill="${C.white}" ${O}/>
    <ellipse cx="200" cy="92" rx="64" ry="14" fill="${C.black}" ${O}/>
    <ellipse cx="200" cy="90" rx="36" ry="7" fill="#43484f"/>
    <path d="M140 118h120" stroke="${C.whiteShade}" stroke-width="6"/>
    <g stroke="#9aa1a8" stroke-width="7" stroke-linecap="round">${[156, 174, 192, 210, 228, 246].map((x) => `<path d="M${x} 206v118"/>`).join('')}</g>
    ${shine(146, 130, 8, 190)}`,

  // Xiaomi Smart Air Purifier 4 Lite: a white tower, the round display near the top, a grille below.
  'xiaomi-4-lite': () => `
    ${ground(84)}
    <rect x="140" y="40" width="120" height="306" rx="10" fill="${C.white}" ${O}/>
    <path d="M150 54h100" stroke="${C.whiteShade}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="200" cy="104" r="22" fill="${C.screen}" ${O}/>
    <path d="M192 104h16" stroke="#8fd0ff" stroke-width="4" stroke-linecap="round"/>
    <g fill="#aab1b7">${Array.from({ length: 12 }, (_, r) => Array.from({ length: 7 }, (_, c) => `<circle cx="${160 + c * 13.3}" cy="${174 + r * 13.5}" r="3.4"/>`).join('')).join('')}</g>
    ${shine(148, 60, 7, 270)}`,

  // De'Longhi Dragon 4 TRD40820: white oil radiator, black side panel with the knobs, on wheels.
  'delonghi-dragon-4': () => `
    ${ground(116)}
    ${Array.from({ length: 8 }, (_, i) => `<rect x="${146 + i * 20}" y="${86 + (i % 2) * 4}" width="18" height="238" rx="9" fill="${C.white}" ${O}/>`).join('')}
    <rect x="98" y="86" width="50" height="238" rx="12" fill="${C.black}" ${O}/>
    <circle cx="123" cy="138" r="13" fill="#d23c2f" ${O}/>
    <circle cx="123" cy="186" r="13" fill="${C.steel}" ${O}/>
    <rect x="115" y="222" width="16" height="10" rx="3" fill="#6b7076"/>
    <path d="M122 324v18M300 324v18" stroke="${C.whiteShade}" stroke-width="10" stroke-linecap="round"/>
    ${wheels(112, 306, 344)}`,

  // Rowenta Intense Comfort Aqua SO6550: a black box with vertical slats and a grey top frame with the handle.
  'rowenta-intense-aqua': () => `
    ${ground(104)}
    <path d="M114 104h172l-10 238h-152Z" fill="${C.black}" ${O}/>
    <path d="M108 82h184l-6 34h-172Z" fill="#6b7076" ${O}/>
    <rect x="170" y="88" width="60" height="12" rx="6" fill="${C.blackShade}" ${O}/>
    <g stroke="#4a4f56" stroke-width="6" stroke-linecap="round">${[146, 164, 182, 200, 218, 236, 254].map((x) => `<path d="M${x} 140v176"/>`).join('')}</g>
    <circle cx="200" cy="226" r="14" fill="#3a3e44" ${O}/>`,

  'portasplit-heat': portasplit,
  'midea-portasplit': portasplit,

  // De'Longhi Tasciugo AriaDry Multi DEXD216RF: white, rounded, a dark top frame with the handle.
  'delonghi-ariadry-multi-16': () => `
    ${ground(100)}
    <rect x="124" y="70" width="152" height="270" rx="22" fill="${C.white}" ${O}/>
    <path d="M124 110v-18a22 22 0 0 1 22-22h108a22 22 0 0 1 22 22v18Z" fill="#3a4a52" ${O}/>
    <rect x="164" y="80" width="72" height="14" rx="7" fill="${C.blackShade}" ${O}/>
    <rect x="160" y="126" width="80" height="20" rx="6" fill="${C.whiteShade}" ${O}/>
    <path d="M170 136h40" stroke="#4a4f56" stroke-width="4" stroke-linecap="round"/>
    <rect x="144" y="168" width="112" height="84" rx="12" fill="${C.whiteShade}" ${O}/>
    <g stroke="#b7bec4" stroke-width="4">${[182, 196, 210, 224, 238].map((y) => `<path d="M154 ${y}h92"/>`).join('')}</g>
    <path d="M144 272h112v48h-112Z" fill="${C.white}" ${O}/>
    ${wheels(150, 250, 344)}`,

  // Duux Bora Smart 20 L: a tall white box, dark top, tank at the bottom with its water-level window.
  'duux-bora-smart': () => `
    ${ground(100)}
    <rect x="124" y="56" width="152" height="286" rx="10" fill="${C.white}" ${O}/>
    <path d="M124 66a10 10 0 0 1 10-10h132a10 10 0 0 1 10 10v12h-152Z" fill="${C.black}" ${O}/>
    <path d="M124 196h152" stroke="${C.ink}" stroke-width="3"/>
    <rect x="236" y="236" width="12" height="70" rx="6" fill="#8e969d" ${o(3)}/>
    <path d="M238 280h8v24h-8Z" fill="${C.water}"/>
    ${wheels(146, 254, 346)}`,

  // Pro Breeze OmniDry 20 L: white, rounded corners, a vent on top and a round status light.
  'pro-breeze-omnidry-20': () => `
    ${ground(100)}
    <rect x="126" y="60" width="148" height="282" rx="18" fill="${C.white}" ${O}/>
    <rect x="142" y="72" width="116" height="26" rx="6" fill="${C.whiteShade}" ${O}/>
    <g stroke="#9aa1a8" stroke-width="3">${[80, 86, 92].map((y) => `<path d="M150 ${y}h100"/>`).join('')}</g>
    <circle cx="200" cy="138" r="11" fill="#7fc8e8" ${O}/>
    <path d="M126 210h148" stroke="${C.ink}" stroke-width="3"/>
    <rect x="170" y="230" width="60" height="10" rx="5" fill="${C.whiteShade}" ${o(3)}/>
    ${wheels(148, 252, 346)}`,

  // Orbegozo DH 1655: a white upright box with a handle on top and wheels (the shape of its official sheet).
  'orbegozo-dh-1655': () => `
    ${ground(96)}
    <path d="M150 72h100" stroke="${C.whiteShade}" stroke-width="14" stroke-linecap="round"/>
    <path d="M150 72h100" fill="none" ${o(2)}/>
    <rect x="130" y="80" width="140" height="262" rx="14" fill="${C.white}" ${O}/>
    <rect x="150" y="100" width="100" height="32" rx="8" fill="${C.whiteShade}" ${O}/>
    <circle cx="170" cy="116" r="6" fill="#4a4f56"/>
    <path d="M186 116h44" stroke="#4a4f56" stroke-width="4" stroke-linecap="round"/>
    <path d="M130 218h140" stroke="${C.ink}" stroke-width="3"/>
    <rect x="150" y="238" width="100" height="80" rx="10" fill="${C.glass}" ${O}/>
    <path d="M152 286h96v30h-96Z" fill="${C.water}"/>
    ${wheels(150, 250, 346)}`,

  // EcoAir DD1 Classic MK6: a compact white desiccant unit with a clear turquoise louvre on top.
  'ecoair-dd1-mk6': () => `
    ${ground(92)}
    <path d="M134 116q0-40 40-40h52q40 0 40 40v226h-132Z" fill="${C.white}" ${O}/>
    <path d="M148 84q0-6 6-6h92q6 0 6 6v34h-104Z" fill="#9fe0dc" ${O}/>
    <g stroke="#4fb5ae" stroke-width="4">${[90, 100, 110].map((y) => `<path d="M156 ${y}h88"/>`).join('')}</g>
    <rect x="168" y="138" width="64" height="22" rx="8" fill="${C.whiteShade}" ${O}/>
    <circle cx="200" cy="290" r="15" fill="#43484f" ${O}/>
    <path d="M134 238h132" stroke="${C.ink}" stroke-width="3"/>`,

  // Bosch Cool 4000: tall white portable air conditioner, grey top with the vent and display.
  'bosch-cool-4000': () => `
    ${ground(100)}
    <rect x="128" y="50" width="144" height="292" rx="12" fill="${C.white}" ${O}/>
    <path d="M128 62a12 12 0 0 1 12-12h120a12 12 0 0 1 12 12v30h-144Z" fill="#8e969d" ${O}/>
    <g stroke="${C.ink}" stroke-width="3">${[62, 70, 78].map((y) => `<path d="M150 ${y}h100"/>`).join('')}</g>
    <path d="M140 92h120v10h-120Z" fill="${C.whiteShade}"/>
    <path d="M128 330h144" stroke="#8e969d" stroke-width="10"/>
    ${shine(138, 110, 8, 210)}`,

  // Ariston Mobis Plus 10: white portable air conditioner, a silver band on top with the display, louvres.
  'ariston-mobis-plus-10': () => `
    ${ground(104)}
    <rect x="122" y="54" width="156" height="286" rx="14" fill="${C.white}" ${O}/>
    <path d="M122 68a14 14 0 0 1 14-14h128a14 14 0 0 1 14 14v34h-156Z" fill="${C.steel}" ${O}/>
    <g stroke="#7d848b" stroke-width="3">${[70, 78, 86].map((y) => `<path d="M140 ${y}h120"/>`).join('')}</g>
    <rect x="182" y="110" width="36" height="12" rx="4" fill="${C.screen}"/>
    ${wheels(142, 258, 344)}
    ${shine(132, 130, 8, 190)}`,
};
