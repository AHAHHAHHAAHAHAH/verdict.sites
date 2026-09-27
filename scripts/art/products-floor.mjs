// FloorVerdict: one drawing per product we recommend (see products-cup.mjs for the rules).
import { C, O, ground, o, shine } from './products-kit.mjs';

/** A robot seen from the front, a little from above: body, top, bumper line. */
const robot = (cx, cy, r, body, top, extra = '') => `
  <path d="M${cx - r} ${cy}v${r * 0.22}a${r} ${r * 0.34} 0 0 0 ${2 * r} 0v-${r * 0.22}Z" fill="${body}" ${O}/>
  <ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${r * 0.34}" fill="${top}" ${O}/>
  ${extra}`;

export const floor = {
  // Kärcher SC 2 Upright: white body, dark handle, yellow detail, black floor nozzle.
  'karcher-sc2-upright': () => `
    ${ground(100)}
    <path d="M214 46q-22-4-26 18l-4 30" fill="none" stroke="${C.black}" stroke-width="14" stroke-linecap="round"/>
    <path d="M214 46q-22-4-26 18l-4 30" fill="none" ${o(2)}/>
    <rect x="176" y="92" width="18" height="120" rx="8" fill="${C.white}" ${O}/>
    <path d="M170 206h30l6 92h-42Z" fill="${C.white}" ${O}/>
    <rect x="172" y="232" width="26" height="12" rx="4" fill="${C.yellow}" ${O}/>
    <rect x="176" y="256" width="18" height="26" rx="4" fill="${C.whiteShade}" ${O}/>
    <path d="M168 296h34l6 12h-46Z" fill="${C.black}" ${O}/>
    <path d="M96 330l50-26h112l44 26v12h-206Z" fill="${C.black}" ${O}/>
    <path d="M104 342h192" stroke="${C.yellow}" stroke-width="6" stroke-linecap="round"/>`,

  // Kärcher SC 1 Upright: slim white stick with a grey hook, white rounded nozzle.
  'karcher-sc1-upright': () => `
    ${ground(96)}
    <path d="M226 42q-24-6-28 18l-4 26" fill="none" stroke="${C.grey}" stroke-width="12" stroke-linecap="round"/>
    <path d="M226 42q-24-6-28 18l-4 26" fill="none" ${o(2)}/>
    <rect x="186" y="84" width="16" height="190" rx="8" fill="${C.white}" ${O}/>
    <rect x="182" y="176" width="24" height="54" rx="8" fill="${C.white}" ${O}/>
    <rect x="188" y="190" width="12" height="16" rx="3" fill="${C.yellow}" ${O}/>
    <path d="M186 272h16l10 34h-36Z" fill="${C.whiteShade}" ${O}/>
    <path d="M110 318q0-16 16-16h148q16 0 16 16v16h-180Z" fill="${C.white}" ${O}/>
    <path d="M110 334h180v10h-180Z" fill="${C.black}" ${O}/>`,

  // Roborock Qrevo Curv 2 Flow: white dock with an arched top, the white robot in its opening.
  'qrevo-curv-2-flow': () => `
    ${ground(140)}
    <path d="M74 336v-160q0-70 70-80q56-12 112 0q70 10 70 80v160Z" fill="${C.white}" ${O}/>
    <path d="M92 150q0-36 52-44q56-10 112 0" fill="none" stroke="#ffffff" stroke-width="10" stroke-linecap="round" opacity="0.9"/>
    <path d="M74 176q126 26 252 0" fill="none" stroke="${C.whiteShade}" stroke-width="5"/>
    <path d="M92 240h216v96h-216Z" fill="${C.whiteShade}" ${O}/>
    <rect x="186" y="220" width="28" height="8" rx="4" fill="#b9c0c6"/>
    ${robot(200, 292, 86, C.whiteShade, C.white, `<rect x="178" y="276" width="44" height="18" rx="6" fill="${C.screen}" ${O}/><circle cx="200" cy="285" r="3" fill="#e04f3b"/>`)}`,

  // Ecovacs Deebot T80S Omni: black robot with the silver "Y" on top, black station behind.
  'ecovacs-t80s-omni': () => `
    ${ground(146)}
    <path d="M200 64h116v272h-116Z" fill="${C.black}" ${O}/>
    <path d="M200 64h116v34h-116Z" fill="${C.blackShade}" ${O}/>
    <rect x="224" y="112" width="68" height="8" rx="4" fill="#4a4f56"/>
    <path d="M206 250h104v86h-104Z" fill="${C.blackShade}" ${O}/>
    ${robot(158, 292, 96, C.blackShade, C.black, `<path d="M158 292v-18M158 274l-30-12M158 274l30-12" stroke="${C.steel}" stroke-width="7" stroke-linecap="round"/><circle cx="158" cy="274" r="6" fill="${C.steel}"/>`)}`,

  // Narwal Flow 2: silver-grey station with an open dirty-water tray, black robot beside it.
  'narwal-flow-2': () => `
    ${ground(148)}
    <path d="M150 58h160v278h-160Z" fill="${C.steel}" ${O}/>
    <path d="M150 58h160v36h-160Z" fill="${C.steelShade}" ${O}/>
    <path d="M150 200h160v136h-160Z" fill="${C.black}" ${O}/>
    <path d="M168 300h124l12 36h-148Z" fill="${C.blackShade}" ${O}/>
    ${shine(160, 104, 8, 86)}
    ${robot(130, 300, 82, C.blackShade, C.black, `<ellipse cx="130" cy="300" rx="46" ry="15" fill="none" stroke="#7b5cd6" stroke-width="5"/><circle cx="130" cy="300" r="8" fill="#3a3e44" ${O}/>`)}`,

  // Dyson V15 Detect Absolute: nickel wand and body, yellow cyclones, clear bin, purple bin cap, the green light at the head.
  'dyson-v15': () => `
    ${ground(120)}
    <path d="M78 348l72-10-54-24Z" fill="#7de3a4" opacity="0.65"/>
    <path d="M262 160L186 314" stroke="${C.grey}" stroke-width="16" stroke-linecap="round"/>
    <path d="M262 160L186 314" fill="none" ${o(2)}/>
    <rect x="160" y="302" width="60" height="18" rx="6" fill="${C.greyShade}" ${O}/>
    <path d="M132 318h100l8 26h-116Z" fill="${C.yellow}" ${O}/>
    <path d="M138 332h96" stroke="${C.ink}" stroke-width="3" stroke-dasharray="6 6"/>
    <rect x="244" y="104" width="40" height="62" rx="10" fill="${C.glass}" ${O}/>
    <path d="M246 138h36v26h-36Z" fill="#b8b2a8" opacity="0.85"/>
    <rect x="244" y="104" width="40" height="62" rx="10" fill="none" ${O}/>
    <rect x="240" y="64" width="48" height="44" rx="10" fill="${C.yellow}" ${O}/>
    <path d="M250 72v28M258 72v28M266 72v28M274 72v28M282 72v28" stroke="#b98f00" stroke-width="3"/>
    <rect x="244" y="50" width="40" height="18" rx="6" fill="#7b5cd6" ${O}/>
    <circle cx="232" cy="88" r="11" fill="#7b5cd6" ${O}/>
    <path d="M290 72q32 8 28 46l-8 34" fill="none" stroke="${C.greyShade}" stroke-width="16" stroke-linecap="round"/>
    <path d="M290 72q32 8 28 46l-8 34" fill="none" ${o(2)}/>
    <rect x="286" y="124" width="30" height="42" rx="8" fill="${C.grey}" ${O}/>
    <rect x="296" y="96" width="10" height="16" rx="3" fill="#d9483b" ${o(2)}/>`,

  // Shark PowerDetect Clean & Empty: grey stick standing in its tall emptying dock, purple top, lights on the head.
  'shark-powerdetect-ce': () => `
    ${ground(100)}
    <path d="M164 188h72v148h-72Z" fill="${C.steel}" ${O}/>
    <path d="M164 188h72v24h-72Z" fill="${C.steelShade}" ${O}/>
    <rect x="178" y="226" width="44" height="80" rx="8" fill="${C.glass}" ${O}/>
    <path d="M180 270h40v34h-40Z" fill="#9c9488" opacity="0.8"/>
    <rect x="193" y="54" width="14" height="140" rx="6" fill="${C.greyShade}" ${O}/>
    <rect x="182" y="30" width="36" height="42" rx="12" fill="#6f4fc4" ${O}/>
    <rect x="190" y="40" width="20" height="18" rx="5" fill="#8c73d8"/>
    <path d="M140 330h120l8 16h-136Z" fill="${C.greyShade}" ${O}/>
    <path d="M144 344h112" stroke="#3fd0c0" stroke-width="5" stroke-linecap="round"/>`,

  // Tineco FLOOR ONE Stretch S6: grey and black upright with a clear tank; it folds flat to the floor.
  'tineco-stretch-s6': () => `
    ${ground(110)}
    <path d="M212 40h32" stroke="${C.black}" stroke-width="16" stroke-linecap="round"/>
    <rect x="218" y="46" width="14" height="120" rx="6" fill="${C.black}" ${O}/>
    <path d="M200 150h52l8 150h-68Z" fill="${C.white}" ${O}/>
    <rect x="206" y="172" width="40" height="56" rx="8" fill="${C.glass}" ${O}/>
    <path d="M208 200h36v26h-36Z" fill="${C.water}"/>
    <rect x="206" y="240" width="40" height="48" rx="8" fill="${C.grey}" ${O}/>
    <path d="M112 312q0-18 18-18h140q18 0 18 18v26h-176Z" fill="${C.black}" ${O}/>
    <rect x="120" y="322" width="160" height="14" rx="7" fill="#5a5f66"/>`,

  // Roborock F25 Ultra: black upright, clean tank, the blue light at the roller.
  'f25-ultra': () => `
    ${ground(110)}
    <path d="M110 344l60-6-40-16Z" fill="#8a9bff" opacity="0.55"/>
    <path d="M210 38h34" stroke="${C.black}" stroke-width="16" stroke-linecap="round"/>
    <rect x="220" y="44" width="14" height="118" rx="6" fill="${C.black}" ${O}/>
    <path d="M198 150h56l8 150h-72Z" fill="${C.black}" ${O}/>
    <rect x="206" y="170" width="40" height="56" rx="8" fill="${C.smoke}" ${O}/>
    <rect x="212" y="238" width="28" height="10" rx="5" fill="#4d7cff"/>
    <path d="M120 312q0-18 18-18h136q18 0 18 18v26h-172Z" fill="${C.black}" ${O}/>
    <path d="M128 336h156" stroke="#6f86ff" stroke-width="6" stroke-linecap="round"/>
    ${shine(204, 156, 7, 130)}`,
};
