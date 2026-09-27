// CupVerdict: one drawing per product we recommend, in the colours it is sold in and with the
// details that tell it apart (studied from the brand's own pictures, never copied from them).
// 400×400, standing on y≈350; outlines and helpers from products-kit.mjs.
import { C, O, ground, o, shine } from './products-kit.mjs';

export const cup = {
  // KitchenAid Artisan 5KCG8433 in onyx black: tall body, clear hopper, display, side dial, jar below.
  'kitchenaid-grinder': () => `
    ${ground(92)}
    <rect x="150" y="44" width="100" height="16" rx="6" fill="${C.black}" ${O}/>
    <path d="M152 60h96v58l-22 22h-52l-22-22Z" fill="${C.glass}" ${O}/>
    <path d="M160 96q40 12 80 0v18l-20 20h-40l-20-20Z" fill="${C.bean}"/>
    <path d="M168 104h8M186 110h8M204 104h8M222 110h8M176 118h8M198 122h8" stroke="${C.beanDark}" stroke-width="4" stroke-linecap="round"/>
    <path d="M152 60h96v58l-22 22h-52l-22-22Z" fill="none" ${O}/>
    <rect x="140" y="138" width="120" height="120" rx="14" fill="${C.black}" ${O}/>
    <rect x="140" y="150" width="120" height="16" fill="${C.steel}" ${O}/>
    <rect x="160" y="184" width="80" height="24" rx="5" fill="${C.screen}" ${O}/>
    <path d="M168 196h14M188 196h14M208 196h8M220 196h12" stroke="#f2f2f2" stroke-width="5" stroke-linecap="round"/>
    <rect x="258" y="190" width="14" height="30" rx="5" fill="${C.steel}" ${O}/>
    <path d="M150 258h100v76h-100Z" fill="${C.blackShade}" ${O}/>
    <path d="M170 276h60l-4 56h-52Z" fill="${C.glass}" ${O}/>
    <path d="M172 306h56l-2 26h-52Z" fill="${C.coffee}"/>
    <path d="M170 276h60l-4 56h-52Z" fill="none" ${O}/>
    <rect x="136" y="334" width="128" height="16" rx="6" fill="${C.black}" ${O}/>
    ${shine(150, 140, 8, 110)}`,

  // Wilfa Svart Aroma CGWS-130B: black body, smoked hopper, round timer knob, container below.
  'wilfa-svart-aroma': () => `
    ${ground(84)}
    <path d="M160 42h80l6 74h-92Z" fill="${C.smoke}" ${O}/>
    <rect x="156" y="36" width="88" height="14" rx="6" fill="${C.black}" ${O}/>
    <path d="M166 84h68l3 30h-74Z" fill="${C.bean}" opacity="0.8"/>
    <rect x="146" y="114" width="108" height="236" rx="16" fill="${C.black}" ${O}/>
    <rect x="166" y="134" width="68" height="22" rx="11" fill="${C.blackShade}" ${O}/>
    <path d="M178 145h44" stroke="#8a8f96" stroke-width="4" stroke-linecap="round"/>
    <circle cx="200" cy="196" r="17" fill="${C.steel}" ${O}/>
    <path d="M200 184v10" stroke="${C.ink}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="200" cy="228" r="5" fill="#e04f3b"/>
    <rect x="160" y="252" width="80" height="86" rx="10" fill="${C.blackShade}" ${O}/>
    <rect x="186" y="262" width="28" height="8" rx="4" fill="${C.black}"/>
    ${shine(156, 120, 7, 200)}`,

  // Nespresso Essenza Mini in black: a narrow box, lever on top, a cup on the grid.
  'essenza-mini': () => `
    ${ground(92)}
    <path d="M136 128q0-40 40-40h92v222h-132Z" fill="${C.black}" ${O}/>
    <path d="M150 88h100v-14a10 10 0 0 0-10-10h-80a10 10 0 0 0-10 10Z" fill="${C.blackShade}" ${O}/>
    <rect x="150" y="104" width="104" height="54" rx="10" fill="${C.blackShade}" ${O}/>
    <circle cx="236" cy="118" r="6" fill="#d8dbde"/>
    <rect x="186" y="158" width="28" height="14" rx="3" fill="${C.steel}" ${O}/>
    <path d="M148 172h108v126h-108Z" fill="#181a1d" ${O}/>
    <path d="M176 238h48v34a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12Z" fill="${C.glass}" ${O}/>
    <path d="M178 250h44v22a10 10 0 0 1-10 10h-24a10 10 0 0 1-10-10Z" fill="${C.coffee}"/>
    <path d="M178 250h44v8h-44Z" fill="${C.crema}"/>
    <path d="M124 296h152v14q0 12-12 12h-128q-12 0-12-12Z" fill="${C.black}" ${O}/>
    <path d="M140 306h120" stroke="#6b7076" stroke-width="3" stroke-dasharray="4 5"/>
    <path d="M268 92h8v214h-8" fill="${C.glass}" ${o(3)}/>
    ${shine(144, 108, 7, 170)}`,

  // De'Longhi Magnifica Start ECAM220.60.B: black bean-to-cup, buttons on top, LatteCrema jug on the left.
  'magnifica-start': () => `
    ${ground(120)}
    <rect x="112" y="54" width="186" height="296" rx="14" fill="${C.black}" ${O}/>
    <rect x="128" y="70" width="154" height="48" rx="8" fill="${C.blackShade}" ${O}/>
    <g fill="#e9ecee">${[146, 170, 194, 218, 242, 266].map((x) => `<circle cx="${x}" cy="94" r="4.5"/>`).join('')}</g>
    <path d="M150 142h120v166h-120Z" fill="#17191c" ${O}/>
    <rect x="186" y="142" width="44" height="18" rx="5" fill="${C.steel}" ${O}/>
    <path d="M196 160v10M220 160v10" stroke="${C.steel}" stroke-width="6" stroke-linecap="round"/>
    <path d="M184 222h52v62a14 14 0 0 1-14 14h-24a14 14 0 0 1-14-14Z" fill="${C.glass}" ${O}/>
    <path d="M186 240h48v44a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12Z" fill="${C.latte}"/>
    <path d="M186 240h48v12h-48Z" fill="${C.milk}"/>
    <path d="M90 150h46v110a10 10 0 0 1-10 10h-26a10 10 0 0 1-10-10Z" fill="${C.glass}" ${O}/>
    <path d="M92 196h42v62a8 8 0 0 1-8 8h-26a8 8 0 0 1-8-8Z" fill="${C.milk}"/>
    <rect x="86" y="140" width="54" height="16" rx="5" fill="${C.black}" ${O}/>
    <path d="M136 148h18v10" fill="none" ${O}/>
    <rect x="140" y="304" width="140" height="18" rx="4" fill="${C.steelShade}" ${O}/>
    <path d="M150 313h120" stroke="${C.ink}" stroke-width="3" stroke-dasharray="5 5"/>
    ${shine(118, 130, 7, 200)}`,

  // De'Longhi Rivelia EXAM440.55.BG, sand beige: rounded shoulders, bean hopper on top, touch display, milk jug.
  rivelia: () => `
    ${ground(120)}
    <rect x="168" y="36" width="76" height="34" rx="12" fill="${C.smoke}" ${O}/>
    <path d="M176 50h60v16h-60Z" fill="${C.bean}"/>
    <path d="M112 110q0-40 40-40h112q36 0 36 40v240h-188Z" fill="${C.beige}" ${O}/>
    <rect x="126" y="86" width="66" height="44" rx="8" fill="${C.screen}" ${O}/>
    <path d="M136 100h26M136 112h40" stroke="#f0e9df" stroke-width="4" stroke-linecap="round"/>
    <path d="M152 148h124v158h-124Z" fill="${C.beigeShade}" ${O}/>
    <rect x="196" y="148" width="40" height="18" rx="5" fill="${C.steel}" ${O}/>
    <path d="M204 166v10M228 166v10" stroke="${C.steel}" stroke-width="6" stroke-linecap="round"/>
    <path d="M190 226h48v58a14 14 0 0 1-14 14h-20a14 14 0 0 1-14-14Z" fill="${C.glass}" ${O}/>
    <path d="M192 244h44v40a12 12 0 0 1-12 12h-20a12 12 0 0 1-12-12Z" fill="${C.latte}"/>
    <path d="M192 244h44v11h-44Z" fill="${C.milk}"/>
    <path d="M92 158h46v108a10 10 0 0 1-10 10h-26a10 10 0 0 1-10-10Z" fill="${C.glass}" ${O}/>
    <path d="M94 200h42v64a8 8 0 0 1-8 8h-26a8 8 0 0 1-8-8Z" fill="${C.milk}"/>
    <rect x="88" y="148" width="54" height="16" rx="5" fill="${C.beigeShade}" ${O}/>
    <rect x="140" y="304" width="148" height="18" rx="4" fill="${C.steelShade}" ${O}/>
    <path d="M150 313h128" stroke="${C.ink}" stroke-width="3" stroke-dasharray="5 5"/>
    ${shine(118, 118, 7, 200)}`,

  // De'Longhi Eletta Explore ECAM450.65.S: silver front, black top with a touch screen, hot & cold milk jug.
  'eletta-explore': () => `
    ${ground(126)}
    <rect x="104" y="50" width="200" height="300" rx="12" fill="${C.steel}" ${O}/>
    <path d="M104 62a12 12 0 0 1 12-12h176a12 12 0 0 1 12 12v44h-200Z" fill="${C.black}" ${O}/>
    <rect x="150" y="62" width="104" height="34" rx="6" fill="${C.screen}" ${O}/>
    <g fill="#8fd0ff">${[164, 186, 208, 230].map((x) => `<rect x="${x}" y="72" width="14" height="14" rx="3"/>`).join('')}</g>
    <path d="M146 128h130v180h-130Z" fill="#1d2024" ${O}/>
    <rect x="190" y="128" width="44" height="18" rx="5" fill="${C.steelShade}" ${O}/>
    <path d="M200 146v10M224 146v10" stroke="${C.steel}" stroke-width="6" stroke-linecap="round"/>
    <path d="M190 196h44v96a10 10 0 0 1-10 10h-24a10 10 0 0 1-10-10Z" fill="${C.glass}" ${O}/>
    <path d="M192 232h40v60a8 8 0 0 1-8 8h-24a8 8 0 0 1-8-8Z" fill="${C.iced}"/>
    <path d="M198 238h10v10h-10ZM214 252h10v10h-10Z" fill="#e8f4f8" opacity="0.8"/>
    <path d="M84 146h48v122a10 10 0 0 1-10 10h-28a10 10 0 0 1-10-10Z" fill="${C.glass}" ${O}/>
    <path d="M86 196h44v70a8 8 0 0 1-8 8h-28a8 8 0 0 1-8-8Z" fill="${C.milk}"/>
    <rect x="80" y="136" width="56" height="16" rx="5" fill="${C.black}" ${O}/>
    <rect x="136" y="304" width="150" height="18" rx="4" fill="${C.black}" ${O}/>
    <path d="M146 313h130" stroke="#6b7076" stroke-width="3" stroke-dasharray="5 5"/>
    ${shine(112, 112, 8, 220)}`,

  // Nespresso Lattissima One, silky white: rounded body, lever on top, milk jug in front.
  'lattissima-one': () => `
    ${ground(110)}
    <path d="M130 96q0-38 38-38h92q30 0 30 38v254h-160Z" fill="${C.white}" ${O}/>
    <rect x="178" y="48" width="70" height="18" rx="9" fill="${C.whiteShade}" ${O}/>
    <circle cx="258" cy="126" r="9" fill="${C.whiteShade}" ${O}/>
    <path d="M176 152h100v150h-100Z" fill="${C.whiteShade}" ${O}/>
    <rect x="214" y="152" width="26" height="16" rx="4" fill="${C.steel}" ${O}/>
    <path d="M204 222h48v66a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12Z" fill="${C.glass}" ${O}/>
    <path d="M206 240h44v48a10 10 0 0 1-10 10h-24a10 10 0 0 1-10-10Z" fill="${C.latte}"/>
    <path d="M206 240h44v12h-44Z" fill="${C.milk}"/>
    <path d="M106 206h64v120a12 12 0 0 1-12 12h-40a12 12 0 0 1-12-12Z" fill="${C.white}" ${O}/>
    <rect x="102" y="196" width="72" height="18" rx="7" fill="${C.whiteShade}" ${O}/>
    <path d="M170 204q20 0 26-28" fill="none" stroke="${C.steel}" stroke-width="7" stroke-linecap="round"/>
    <path d="M170 204q20 0 26-28" fill="none" ${o(2)}/>
    <rect x="170" y="302" width="112" height="16" rx="4" fill="${C.steelShade}" ${O}/>
    ${shine(136, 110, 8, 200)}`,

  // Sage (Breville) Bambino Plus, brushed steel: buttons on top, portafilter with a black handle, steam wand.
  'bambino-plus': () => `
    ${ground(110)}
    <rect x="124" y="70" width="160" height="280" rx="12" fill="${C.steel}" ${O}/>
    <path d="M124 82a12 12 0 0 1 12-12h136a12 12 0 0 1 12 12v18h-160Z" fill="${C.steelShade}" ${O}/>
    <g fill="${C.steelShade}" ${o(3)}>${[152, 180, 208, 236, 262].map((x) => `<circle cx="${x}" cy="124" r="8"/>`).join('')}</g>
    <circle cx="208" cy="124" r="3" fill="#f7c948"/>
    <rect x="160" y="160" width="96" height="24" rx="8" fill="${C.steelShade}" ${O}/>
    <rect x="176" y="184" width="64" height="18" rx="6" fill="${C.chrome}" ${O}/>
    <path d="M176 192h-82" stroke="${C.black}" stroke-width="16" stroke-linecap="round"/>
    <path d="M176 192h-82" fill="none" ${o(2)}/>
    <path d="M196 202v10M220 202v10" stroke="${C.steelShade}" stroke-width="6" stroke-linecap="round"/>
    <path d="M272 150q26 0 26 30v96" fill="none" stroke="${C.chrome}" stroke-width="8" stroke-linecap="round"/>
    <path d="M272 150q26 0 26 30v96" fill="none" ${o(2)}/>
    <path d="M186 262h44v28a12 12 0 0 1-12 12h-20a12 12 0 0 1-12-12Z" fill="#f4f1ec" ${O}/>
    <path d="M190 268h36v10h-36Z" fill="${C.crema}"/>
    <rect x="136" y="302" width="136" height="20" rx="4" fill="${C.steelShade}" ${O}/>
    <path d="M146 312h116" stroke="${C.ink}" stroke-width="3" stroke-dasharray="5 5"/>
    ${shine(132, 104, 8, 230)}`,

  // Bialetti Moka Express: the octagonal aluminium pot, black handle and knob.
  'moka-express': () => `
    ${ground(92)}
    <path d="M150 350l14-104h72l14 104Z" fill="${C.alu}" ${O}/>
    <path d="M178 350l4-104h36l4 104Z" fill="${C.aluLight}"/>
    <path d="M150 350l14-104h72l14 104Z" fill="none" ${O}/>
    <rect x="158" y="236" width="84" height="14" rx="3" fill="${C.aluShade}" ${O}/>
    <path d="M160 236l-14-126h108l-14 126Z" fill="${C.alu}" ${O}/>
    <path d="M186 236l-4-126h36l-4 126Z" fill="${C.aluLight}"/>
    <path d="M160 236l-14-126h108l-14 126Z" fill="none" ${O}/>
    <path d="M146 110l-22-8 26-6Z" fill="${C.alu}" ${O}/>
    <path d="M144 100q56-30 112 0Z" fill="${C.alu}" ${O}/>
    <rect x="190" y="68" width="20" height="18" rx="6" fill="${C.black}" ${O}/>
    <path d="M252 120q48 6 40 58t-44 58" fill="none" stroke="${C.black}" stroke-width="18" stroke-linecap="round"/>
    <path d="M252 120q48 6 40 58t-44 58" fill="none" ${o(2)}/>`,

  // Bialetti Brikka: the aluminium top, a black boiler, black handle and the valve on the spout.
  brikka: () => `
    ${ground(92)}
    <path d="M150 350l12-100h76l12 100Z" fill="${C.black}" ${O}/>
    <path d="M176 350l4-100h40l4 100Z" fill="#3a3e44"/>
    <path d="M150 350l12-100h76l12 100Z" fill="none" ${O}/>
    <rect x="156" y="238" width="88" height="14" rx="3" fill="${C.aluShade}" ${O}/>
    <path d="M160 238l-14-124h108l-14 124Z" fill="${C.alu}" ${O}/>
    <path d="M186 238l-4-124h36l-4 124Z" fill="${C.aluLight}"/>
    <path d="M160 238l-14-124h108l-14 124Z" fill="none" ${O}/>
    <path d="M146 114l-22-8 26-6Z" fill="${C.alu}" ${O}/>
    <path d="M144 104q56-30 112 0Z" fill="${C.alu}" ${O}/>
    <rect x="190" y="72" width="20" height="18" rx="6" fill="${C.black}" ${O}/>
    <circle cx="200" cy="140" r="12" fill="${C.black}" ${O}/>
    <path d="M252 124q48 6 40 58t-44 58" fill="none" stroke="${C.black}" stroke-width="18" stroke-linecap="round"/>
    <path d="M252 124q48 6 40 58t-44 58" fill="none" ${o(2)}/>`,

  // Bialetti Venus: polished stainless steel, round and smooth, black handle.
  venus: () => `
    ${ground(86)}
    <path d="M160 350q-14-50 2-102h76q16 52 2 102Z" fill="${C.chrome}" ${O}/>
    <path d="M188 350q-6-50 0-102h12q6 52 0 102Z" fill="#ffffff" opacity="0.85"/>
    <path d="M160 350q-14-50 2-102h76q16 52 2 102Z" fill="none" ${O}/>
    <rect x="158" y="238" width="84" height="14" rx="5" fill="${C.steelShade}" ${O}/>
    <path d="M164 238q-10-60 -2-128h76q8 68 -2 128Z" fill="${C.chrome}" ${O}/>
    <path d="M190 238q-4-60 0-128h14q4 68 0 128Z" fill="#ffffff" opacity="0.85"/>
    <path d="M164 238q-10-60 -2-128h76q8 68 -2 128Z" fill="none" ${O}/>
    <path d="M164 118q-20-4-40-24q26 0 42 10Z" fill="${C.chrome}" ${O}/>
    <path d="M160 110q40-24 80 0Z" fill="${C.chrome}" ${O}/>
    <rect x="190" y="84" width="20" height="14" rx="6" fill="${C.black}" ${O}/>
    <path d="M238 128q42 6 38 54t-38 50" fill="none" stroke="${C.black}" stroke-width="16" stroke-linecap="round"/>
    <path d="M238 128q42 6 38 54t-38 50" fill="none" ${o(2)}/>`,

  // Moccamaster KBG Select, polished silver: water tank on a column, brew cone, glass jug on the plate.
  moccamaster: () => `
    ${ground(130)}
    <rect x="96" y="326" width="212" height="26" rx="6" fill="${C.chrome}" ${O}/>
    <circle cx="120" cy="339" r="5" fill="#d9483b"/>
    <rect x="130" y="332" width="20" height="12" rx="3" fill="${C.black}"/>
    <rect x="112" y="150" width="34" height="178" rx="4" fill="${C.chrome}" ${O}/>
    <path d="M122 160v160" stroke="#ffffff" stroke-width="5" opacity="0.8"/>
    <path d="M100 40h72v112h-72Z" fill="${C.glass}" ${O}/>
    <path d="M102 96h68v54h-68Z" fill="#cde6f2" opacity="0.8"/>
    <path d="M110 60h10M110 76h10M110 92h10" stroke="${C.ink}" stroke-width="3"/>
    <path d="M100 40h72v112h-72Z" fill="none" ${O}/>
    <rect x="96" y="30" width="80" height="14" rx="5" fill="${C.black}" ${O}/>
    <path d="M146 130h60" stroke="${C.chrome}" stroke-width="12"/>
    <path d="M146 124h60M146 136h60" stroke="${C.ink}" stroke-width="3"/>
    <path d="M196 112h92l-20 70h-52Z" fill="${C.black}" ${O}/>
    <rect x="190" y="102" width="104" height="16" rx="5" fill="${C.black}" ${O}/>
    <path d="M190 226h84v84a14 14 0 0 1-14 14h-56a14 14 0 0 1-14-14Z" fill="${C.glass}" ${O}/>
    <path d="M192 256h80v54a12 12 0 0 1-12 12h-56a12 12 0 0 1-12-12Z" fill="${C.coffee}"/>
    <path d="M190 226h84v84a14 14 0 0 1-14 14h-56a14 14 0 0 1-14-14Z" fill="none" ${O}/>
    <rect x="186" y="210" width="92" height="20" rx="6" fill="${C.black}" ${O}/>
    <path d="M274 240q26 0 26 30t-26 30" fill="none" stroke="${C.black}" stroke-width="12" stroke-linecap="round"/>`,

  // Braun PurShine KF 1500, black: brushed steel panel at the top, glass jug with a black lid.
  'braun-purshine': () => `
    ${ground(104)}
    <rect x="132" y="46" width="146" height="304" rx="14" fill="${C.black}" ${O}/>
    <path d="M144 70h122v96h-122Z" fill="${C.steel}" ${O}/>
    <path d="M150 80h110M150 96h110M150 112h110M150 128h110M150 144h110" stroke="#b3b8bd" stroke-width="3"/>
    <rect x="248" y="178" width="16" height="10" rx="3" fill="#6b7076"/>
    <path d="M144 196h112v124h-112Z" fill="#17191c" ${O}/>
    <path d="M152 222h86v82a14 14 0 0 1-14 14h-58a14 14 0 0 1-14-14Z" fill="${C.glass}" ${O}/>
    <path d="M154 252h82v52a12 12 0 0 1-12 12h-58a12 12 0 0 1-12-12Z" fill="${C.coffee}"/>
    <path d="M152 222h86v82a14 14 0 0 1-14 14h-58a14 14 0 0 1-14-14Z" fill="none" ${O}/>
    <rect x="146" y="206" width="98" height="20" rx="6" fill="${C.black}" ${O}/>
    <path d="M150 240q-26 0-26 30t26 30" fill="none" stroke="${C.black}" stroke-width="12" stroke-linecap="round"/>
    <rect x="126" y="330" width="158" height="20" rx="6" fill="${C.black}" ${O}/>
    <circle cx="258" cy="340" r="4" fill="#e04f3b"/>`,

  // Hario V60 02 in white ceramic: the cone with spiral ribs, a single hole, the handle and the base.
  v60: () => `
    ${ground(96)}
    <path d="M118 150h164l-50 150h-64Z" fill="${C.white}" ${O}/>
    <path d="M148 162l30 132M176 160l18 136M214 160l-6 136M246 162l-26 132" stroke="${C.whiteShade}" stroke-width="5" stroke-linecap="round"/>
    <path d="M118 150h164l-50 150h-64Z" fill="none" ${O}/>
    <rect x="110" y="136" width="180" height="18" rx="9" fill="${C.white}" ${O}/>
    <path d="M276 170q52 0 44 48t-60 36" fill="none" stroke="${C.white}" stroke-width="18" stroke-linecap="round"/>
    <path d="M276 170q52 0 44 48t-60 36" fill="none" ${o(2)}/>
    <rect x="148" y="298" width="104" height="14" rx="4" fill="${C.white}" ${O}/>
    <ellipse cx="200" cy="330" rx="84" ry="14" fill="${C.white}" ${O}/>
    <rect x="186" y="312" width="28" height="14" fill="${C.whiteShade}" ${O}/>`,

  // Bodum Chambord 1 L: glass jug in a polished steel frame, black handle, plunger knob.
  chambord: () => `
    ${ground(96)}
    <path d="M200 40v60" stroke="${C.chrome}" stroke-width="8"/>
    <circle cx="200" cy="40" r="14" fill="${C.chrome}" ${O}/>
    <path d="M136 96q64-26 128 0v14h-128Z" fill="${C.chrome}" ${O}/>
    <rect x="142" y="110" width="116" height="224" rx="6" fill="${C.glass}" ${O}/>
    <path d="M144 170h112v162h-112Z" fill="${C.coffee}"/>
    <path d="M144 164h112v10h-112Z" fill="${C.crema}"/>
    <rect x="142" y="110" width="116" height="224" rx="6" fill="none" ${O}/>
    <path d="M158 110v228M242 110v228" stroke="${C.chrome}" stroke-width="10"/>
    <path d="M158 110v228M242 110v228" fill="none" ${o(2)}/>
    <path d="M136 322h128" stroke="${C.chrome}" stroke-width="12"/>
    <path d="M150 336l-8 16M250 336l8 16" stroke="${C.chrome}" stroke-width="9" stroke-linecap="round"/>
    <path d="M258 140q52 0 52 60t-52 70" fill="none" stroke="${C.black}" stroke-width="18" stroke-linecap="round"/>
    <path d="M258 140q52 0 52 60t-52 70" fill="none" ${o(2)}/>
    <path d="M136 106l-18 8" stroke="${C.chrome}" stroke-width="8" stroke-linecap="round"/>`,

  // Chemex Classic 6 cup: the glass hourglass, the wooden collar and its leather tie.
  chemex: () => `
    ${ground(96)}
    <path d="M140 52h120l-50 118v10l70 150a16 16 0 0 1-14 22h-132a16 16 0 0 1-14-22l70-150v-10Z" fill="${C.glass}" ${O}/>
    <path d="M134 300l36-74h60l36 74a16 16 0 0 1-14 22h-104a16 16 0 0 1-14-22Z" fill="${C.coffee}" opacity="0.92"/>
    <path d="M140 52h120l-50 118v10l70 150a16 16 0 0 1-14 22h-132a16 16 0 0 1-14-22l70-150v-10Z" fill="none" ${O}/>
    <path d="M140 52l-14 10 10 8" fill="none" ${O}/>
    <path d="M166 150h68l-10 42h-48Z" fill="${C.wood}" ${O}/>
    <path d="M182 150l-2 42M200 150v42M218 150l2 42" stroke="${C.woodShade}" stroke-width="3"/>
    <path d="M226 172q30 8 34 40" fill="none" stroke="#8a5a36" stroke-width="5" stroke-linecap="round"/>
    <circle cx="262" cy="218" r="9" fill="${C.wood}" ${O}/>`,
};
