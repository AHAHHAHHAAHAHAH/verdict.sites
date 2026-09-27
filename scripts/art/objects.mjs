// Hand-drawn illustrations of each product type, one per category, in a 400×400 space with the
// floor at y≈340. Flat shapes with an ink outline, the site's accent for the one detail that
// explains the object (water in the tank, heat, coffee). Used for the image at the top of each
// category page and for the picture Google and social networks show (see make-images.mjs).

/** Everything drawn with the same outline. */
const line = (P, w = 6) => `stroke="${P.ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

export const objects = {
  // ClimaVerdict
  heat: (P) => {
    const fins = Array.from({ length: 7 }, (_, i) => `<rect x="${74 + i * 30}" y="118" width="26" height="186" rx="13" fill="${P.card}" ${line(P)}/>`).join('');
    return `
      <path d="M150 100c-12-13 12-22 0-35s12-22 0-35M200 100c-12-13 12-22 0-35s12-22 0-35M250 100c-12-13 12-22 0-35s12-22 0-35" fill="none" stroke="${P.accentInk}" stroke-width="7" stroke-linecap="round" transform="translate(-16 0)"/>
      <rect x="80" y="296" width="200" height="12" rx="6" fill="${P.ink}"/>
      <circle cx="100" cy="320" r="13" fill="${P.card}" ${line(P, 5)}/>
      <circle cx="260" cy="320" r="13" fill="${P.card}" ${line(P, 5)}/>
      ${fins}
      <rect x="280" y="170" width="12" height="18" fill="${P.shade}" ${line(P, 5)}/>
      <rect x="288" y="146" width="44" height="92" rx="12" fill="${P.card}" ${line(P)}/>
      <circle cx="310" cy="174" r="11" fill="${P.accent}" ${line(P, 5)}/>
      <path d="M310 168v6" ${line(P, 4)}/>
      <circle cx="310" cy="212" r="5" fill="${P.accentInk}"/>`;
  },
  dehum: (P) => `
      <rect x="148" y="330" width="22" height="12" rx="4" fill="${P.ink}"/>
      <rect x="230" y="330" width="22" height="12" rx="4" fill="${P.ink}"/>
      <rect x="120" y="66" width="160" height="268" rx="32" fill="${P.card}" ${line(P)}/>
      <rect x="176" y="76" width="48" height="10" rx="5" fill="${P.shade}" ${line(P, 4)}/>
      <rect x="144" y="100" width="112" height="46" rx="12" fill="${P.shade}" ${line(P, 5)}/>
      <path d="M160 114h80M160 124h80M160 134h80" ${line(P, 4)}/>
      <rect x="170" y="160" width="60" height="24" rx="12" fill="${P.ink}"/>
      <rect x="180" y="168" width="28" height="8" rx="4" fill="${P.accent}"/>
      <circle cx="218" cy="172" r="3.5" fill="${P.accent}"/>
      <rect x="138" y="204" width="124" height="112" rx="18" fill="${P.card}" ${line(P, 5)}/>
      <rect x="154" y="220" width="92" height="80" rx="11" fill="${P.wash}" ${line(P, 4)}/>
      <path d="M156 262q22-11 44 0t44 0v28a8 8 0 0 1-8 8h-72a8 8 0 0 1-8-8Z" fill="${P.accent}"/>
      <rect x="154" y="220" width="92" height="80" rx="11" fill="none" ${line(P, 4)}/>`,
  purifier: (P) => {
    const dots = [];
    for (let y = 196; y <= 300; y += 17) for (let x = 162; x <= 238; x += 19) dots.push(`<circle cx="${x}" cy="${y}" r="3.4"/>`);
    return `
      <path d="M170 82c-6-14 8-20 2-34M200 78c-6-14 8-20 2-34M230 82c-6-14 8-20 2-34" fill="none" stroke="${P.accentInk}" stroke-width="6" stroke-linecap="round"/>
      <rect x="150" y="326" width="100" height="14" rx="7" fill="${P.ink}"/>
      <rect x="132" y="94" width="136" height="238" rx="40" fill="${P.card}" ${line(P)}/>
      <rect x="150" y="106" width="100" height="22" rx="11" fill="${P.shade}" ${line(P, 5)}/>
      <path d="M166 117h68" ${line(P, 4)}/>
      <circle cx="200" cy="158" r="15" fill="none" stroke="${P.accent}" stroke-width="7"/>
      <circle cx="200" cy="158" r="15" fill="none" ${line(P, 3)}/>
      <g fill="${P.ink}" opacity="0.55">${dots.join('')}</g>`;
  },
  ac: (P) => `
      <g transform="translate(-28 0)">
        <path d="M118 102c-10-10-2-22-12-32M146 98c-10-10-2-22-12-32M174 102c-10-10-2-22-12-32" fill="none" stroke="${P.accentInk}" stroke-width="6" stroke-linecap="round"/>
        <rect x="300" y="56" width="76" height="160" rx="8" fill="${P.wash}" ${line(P)}/>
        <path d="M338 56v160" ${line(P, 4)}/>
        <rect x="310" y="120" width="56" height="52" rx="8" fill="${P.card}" ${line(P, 5)}/>
        <path d="M240 262c60 0 50-116 98-116" fill="none" stroke="${P.ink}" stroke-width="32" stroke-linecap="round"/>
        <path d="M240 262c60 0 50-116 98-116" fill="none" stroke="${P.shade}" stroke-width="20" stroke-linecap="round"/>
        <path d="M240 262c60 0 50-116 98-116" fill="none" stroke="${P.ink}" stroke-width="20" stroke-dasharray="3 9"/>
        <circle cx="338" cy="146" r="14" fill="${P.shade}" ${line(P, 5)}/>
        <circle cx="122" cy="336" r="9" fill="${P.card}" ${line(P, 5)}/>
        <circle cx="222" cy="336" r="9" fill="${P.card}" ${line(P, 5)}/>
        <rect x="100" y="94" width="144" height="236" rx="22" fill="${P.card}" ${line(P)}/>
        <rect x="120" y="114" width="104" height="52" rx="10" fill="${P.shade}" ${line(P, 5)}/>
        <path d="M134 128h76M134 140h76M134 152h76" ${line(P, 4)}/>
        <rect x="146" y="186" width="52" height="20" rx="10" fill="${P.ink}"/>
        <rect x="155" y="193" width="22" height="6" rx="3" fill="${P.accent}"/>
        <circle cx="186" cy="196" r="3" fill="${P.accent}"/>
        <path d="M124 300h96" ${line(P, 4)}/>
      </g>`,

  // FloorVerdict
  robot: (P) => `
      <rect x="226" y="84" width="112" height="214" rx="24" fill="${P.card}" ${line(P)}/>
      <rect x="244" y="104" width="76" height="72" rx="12" fill="${P.wash}" ${line(P, 5)}/>
      <path d="M246 144q18-8 36 0t36 0v22a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8Z" fill="${P.accent}"/>
      <rect x="244" y="104" width="76" height="72" rx="12" fill="none" ${line(P, 5)}/>
      <rect x="244" y="190" width="76" height="72" rx="12" fill="${P.shade}" ${line(P, 5)}/>
      <rect x="206" y="288" width="152" height="24" rx="12" fill="${P.shade}" ${line(P)}/>
      <path d="M52 286v18a118 40 0 0 0 236 0v-18" fill="${P.shade}" ${line(P)}/>
      <ellipse cx="170" cy="286" rx="118" ry="40" fill="${P.card}" ${line(P)}/>
      <path d="M72 300a110 34 0 0 0 196 0" fill="none" ${line(P, 4)}/>
      <path d="M160 262v12a24 8 0 0 0 48 0v-12" fill="${P.ink}"/>
      <ellipse cx="184" cy="262" rx="24" ry="8" fill="${P.ink}"/>
      <ellipse cx="184" cy="261" rx="12" ry="3.5" fill="${P.accent}"/>`,
  stick: (P) => `
      <path d="M262 102c44 0 50 60 8 72" fill="none" stroke="${P.ink}" stroke-width="12" stroke-linecap="round"/>
      <rect x="254" y="168" width="30" height="40" rx="9" fill="${P.shade}" ${line(P, 5)}/>
      <rect x="192" y="84" width="66" height="128" rx="24" fill="${P.card}" ${line(P)}/>
      <rect x="206" y="132" width="38" height="64" rx="14" fill="${P.wash}" ${line(P, 5)}/>
      <path d="M208 172q8-6 17 0t17 0v12a10 10 0 0 1-10 10h-14a10 10 0 0 1-10-10Z" fill="${P.accent}"/>
      <rect x="206" y="132" width="38" height="64" rx="14" fill="none" ${line(P, 5)}/>
      <circle cx="225" cy="108" r="9" fill="${P.shade}" ${line(P, 4)}/>
      <rect x="214" y="210" width="22" height="104" rx="9" fill="${P.shade}" ${line(P, 5)}/>
      <rect x="116" y="308" width="188" height="34" rx="15" fill="${P.card}" ${line(P)}/>
      <path d="M128 330h164" stroke="${P.accent}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="225" cy="310" r="10" fill="${P.ink}"/>`,
  wet: (P) => `
      <rect x="182" y="40" width="36" height="58" rx="18" fill="none" stroke="${P.ink}" stroke-width="10"/>
      <rect x="192" y="94" width="16" height="72" rx="6" fill="${P.shade}" ${line(P, 5)}/>
      <rect x="158" y="158" width="84" height="152" rx="28" fill="${P.card}" ${line(P)}/>
      <rect x="172" y="174" width="56" height="62" rx="13" fill="${P.wash}" ${line(P, 5)}/>
      <path d="M174 204q13-7 26 0t26 0v20a10 10 0 0 1-10 10h-32a10 10 0 0 1-10-10Z" fill="${P.accent}"/>
      <rect x="172" y="174" width="56" height="62" rx="13" fill="none" ${line(P, 5)}/>
      <circle cx="200" cy="266" r="15" fill="${P.ink}"/>
      <circle cx="200" cy="266" r="8" fill="none" stroke="${P.accent}" stroke-width="4"/>
      <rect x="112" y="298" width="176" height="42" rx="19" fill="${P.card}" ${line(P)}/>
      <rect x="124" y="324" width="152" height="16" rx="8" fill="${P.shade}" ${line(P, 4)}/>
      <path d="M140 332h16M170 332h16M200 332h16M230 332h16M260 332h8" ${line(P, 3)}/>`,
  steam: (P) => `
      <path d="M96 314c-14-4-14-18 0-20M90 298c-14-6-10-20 4-18M304 314c14-4 14-18 0-20M310 298c14-6 10-20-4-18" fill="none" stroke="${P.accentInk}" stroke-width="5" stroke-linecap="round"/>
      <rect x="184" y="34" width="32" height="50" rx="16" fill="none" stroke="${P.ink}" stroke-width="10"/>
      <rect x="194" y="80" width="12" height="112" rx="5" fill="${P.shade}" ${line(P, 5)}/>
      <rect x="170" y="182" width="60" height="112" rx="24" fill="${P.card}" ${line(P)}/>
      <rect x="182" y="198" width="36" height="52" rx="11" fill="${P.wash}" ${line(P, 5)}/>
      <path d="M184 226q8-6 16 0t16 0v14a8 8 0 0 1-8 8h-16a8 8 0 0 1-8-8Z" fill="${P.accent}"/>
      <rect x="182" y="198" width="36" height="52" rx="11" fill="none" ${line(P, 5)}/>
      <path d="M200 292v14" ${line(P, 8)}/>
      <path d="M112 330l20-26h136l20 26z" fill="${P.card}" ${line(P)}/>
      <rect x="104" y="326" width="192" height="16" rx="8" fill="${P.wash}" ${line(P, 5)}/>`,

  // CupVerdict
  capsule: (P) => `
      <rect x="252" y="112" width="42" height="200" rx="12" fill="${P.wash}" ${line(P)}/>
      <path d="M254 200h38v100a10 10 0 0 1-10 10h-18a10 10 0 0 1-10-10Z" fill="${P.accent}" opacity="0.55"/>
      <rect x="252" y="112" width="42" height="200" rx="12" fill="none" ${line(P)}/>
      <rect x="120" y="92" width="144" height="238" rx="26" fill="${P.card}" ${line(P)}/>
      <rect x="138" y="68" width="108" height="30" rx="15" fill="${P.shade}" ${line(P)}/>
      <circle cx="236" cy="124" r="9" fill="${P.accent}" ${line(P, 4)}/>
      <rect x="164" y="140" width="56" height="30" rx="9" fill="${P.shade}" ${line(P, 5)}/>
      <path d="M192 170v12" ${line(P, 7)}/>
      <path d="M170 238h44v24a14 14 0 0 1-14 14h-16a14 14 0 0 1-14-14Z" fill="${P.card}" ${line(P, 5)}/>
      <path d="M214 246c14 0 14 18 0 18" fill="none" ${line(P, 5)}/>
      <ellipse cx="192" cy="240" rx="18" ry="3.5" fill="${P.accentInk}"/>
      <rect x="140" y="286" width="104" height="18" rx="7" fill="${P.shade}" ${line(P, 5)}/>`,
  superautomatic: (P) => `
      <rect x="102" y="92" width="196" height="240" rx="24" fill="${P.card}" ${line(P)}/>
      <rect x="124" y="72" width="78" height="24" rx="10" fill="${P.shade}" ${line(P)}/>
      <rect x="120" y="110" width="160" height="38" rx="11" fill="${P.ink}"/>
      <rect x="134" y="121" width="44" height="16" rx="5" fill="${P.accent}"/>
      <g fill="${P.card}"><circle cx="202" cy="129" r="5"/><circle cx="222" cy="129" r="5"/><circle cx="242" cy="129" r="5"/><circle cx="262" cy="129" r="5"/></g>
      <rect x="168" y="164" width="64" height="28" rx="9" fill="${P.shade}" ${line(P, 5)}/>
      <path d="M190 192v12M210 192v12" ${line(P, 6)}/>
      <path d="M174 226h52v44a14 14 0 0 1-14 14h-24a14 14 0 0 1-14-14Z" fill="${P.card}" ${line(P, 5)}/>
      <ellipse cx="200" cy="229" rx="22" ry="4" fill="${P.accentInk}"/>
      <rect x="126" y="294" width="148" height="20" rx="8" fill="${P.shade}" ${line(P, 5)}/>`,
  'manual-espresso': (P) => `
      <path d="M178 96h44v-10h-44z" fill="${P.shade}" ${line(P, 4)}/>
      <rect x="126" y="100" width="176" height="200" rx="20" fill="${P.card}" ${line(P)}/>
      <circle cx="214" cy="132" r="16" fill="${P.card}" ${line(P, 5)}/>
      <path d="M214 132l8-8" stroke="${P.accentInk}" stroke-width="4" stroke-linecap="round"/>
      <rect x="166" y="160" width="68" height="22" rx="6" fill="${P.shade}" ${line(P, 5)}/>
      <rect x="170" y="180" width="60" height="20" rx="8" fill="${P.ink}"/>
      <rect x="92" y="184" width="84" height="14" rx="7" fill="${P.ink}"/>
      <circle cx="282" cy="132" r="9" fill="${P.shade}" ${line(P, 4)}/>
      <path d="M282 142v108q0 12-10 16" fill="none" ${line(P, 7)}/>
      <path d="M180 234h40v20a12 12 0 0 1-12 12h-16a12 12 0 0 1-12-12Z" fill="${P.card}" ${line(P, 5)}/>
      <path d="M220 240c12 0 12 16 0 16" fill="none" ${line(P, 5)}/>
      <ellipse cx="200" cy="236" rx="16" ry="3" fill="${P.accentInk}"/>
      <path d="M200 200v24" stroke="${P.accentInk}" stroke-width="4" stroke-linecap="round" stroke-dasharray="6 6"/>
      <rect x="140" y="278" width="148" height="18" rx="7" fill="${P.shade}" ${line(P, 5)}/>
      <rect x="136" y="300" width="20" height="30" rx="5" fill="${P.ink}"/>
      <rect x="272" y="300" width="20" height="30" rx="5" fill="${P.ink}"/>`,
  moka: (P) => `
      <path d="M140 98c-8-12 6-18 0-30M156 92c-8-12 6-18 0-30" fill="none" stroke="${P.accentInk}" stroke-width="6" stroke-linecap="round"/>
      <path d="M252 150c52 0 52 76 0 76" fill="none" stroke="${P.ink}" stroke-width="18" stroke-linecap="round"/>
      <path d="M142 336l18-86h80l18 86z" fill="${P.card}" ${line(P)}/>
      <path d="M180 250l-6 86M200 250v86M220 250l6 86" ${line(P, 3)} opacity="0.5"/>
      <circle cx="240" cy="292" r="6" fill="${P.shade}" ${line(P, 3)}/>
      <rect x="152" y="236" width="96" height="18" rx="5" fill="${P.ink}"/>
      <path d="M162 238l-14-96h104l-14 96z" fill="${P.card}" ${line(P)}/>
      <path d="M182 238l-6-96M200 238v-96M218 238l6-96" ${line(P, 3)} opacity="0.5"/>
      <path d="M150 142l-22-16 38 8" fill="${P.card}" ${line(P, 5)}/>
      <path d="M146 142q54-38 108 0z" fill="${P.shade}" ${line(P)}/>
      <rect x="190" y="106" width="20" height="16" rx="6" fill="${P.ink}"/>`,
  drip: (P) => `
      <rect x="218" y="70" width="76" height="262" rx="18" fill="${P.card}" ${line(P)}/>
      <rect x="236" y="100" width="40" height="112" rx="11" fill="${P.wash}" ${line(P, 5)}/>
      <path d="M238 150q9-6 19 0t19 0v50a10 10 0 0 1-10 10h-18a10 10 0 0 1-10-10Z" fill="${P.accent}" opacity="0.8"/>
      <rect x="236" y="100" width="40" height="112" rx="11" fill="none" ${line(P, 5)}/>
      <rect x="112" y="70" width="160" height="30" rx="12" fill="${P.card}" ${line(P)}/>
      <path d="M126 106h118l-18 54h-82z" fill="${P.shade}" ${line(P, 5)}/>
      <path d="M130 226q0-34 26-38h58q26 4 26 38v70q0 14-14 14h-82q-14 0-14-14z" fill="${P.wash}" ${line(P)}/>
      <path d="M133 250h104v46q0 11-11 11h-82q-11 0-11-11z" fill="${P.accentInk}"/>
      <path d="M130 226q0-34 26-38h58q26 4 26 38v70q0 14-14 14h-82q-14 0-14-14z" fill="none" ${line(P)}/>
      <path d="M130 214c-24 0-26 52-2 56" fill="none" ${line(P, 8)}/>
      <rect x="104" y="310" width="200" height="24" rx="10" fill="${P.shade}" ${line(P)}/>
      <circle cx="272" cy="322" r="5" fill="${P.accent}"/>`,
  'manual-filter': (P) => `
      <path d="M186 84c-8-12 6-18 0-30M214 84c-8-12 6-18 0-30" fill="none" stroke="${P.accentInk}" stroke-width="6" stroke-linecap="round"/>
      <path d="M144 256q0-40 28-46h56q28 6 28 46v46q0 20-20 20h-72q-20 0-20-20z" fill="${P.wash}" ${line(P)}/>
      <path d="M147 268h106v34q0 17-17 17h-72q-17 0-17-17z" fill="${P.accentInk}"/>
      <path d="M144 256q0-40 28-46h56q28 6 28 46v46q0 20-20 20h-72q-20 0-20-20z" fill="none" ${line(P)}/>
      <path d="M200 214v14" stroke="${P.accentInk}" stroke-width="5" stroke-linecap="round"/>
      <path d="M258 128c30 4 26 44 2 44" fill="none" ${line(P, 9)}/>
      <path d="M136 126h128l-36 72h-56z" fill="${P.card}" ${line(P)}/>
      <path d="M170 134l18 56M200 134v58M230 134l-18 56" ${line(P, 3)} opacity="0.45"/>
      <rect x="126" y="116" width="148" height="14" rx="7" fill="${P.card}" ${line(P, 5)}/>
      <rect x="164" y="196" width="72" height="12" rx="5" fill="${P.shade}" ${line(P, 5)}/>`,
  grinder: (P) => {
    const beans = [
      [182, 104, 20],
      [204, 96, -30],
      [222, 110, 40],
      [194, 124, -10],
      [214, 128, 60],
    ]
      .map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="6" transform="rotate(${r} ${x} ${y})" fill="${P.accentInk}"/>`)
      .join('');
    return `
      <path d="M148 72h104l-20 80h-64z" fill="${P.wash}" ${line(P)}/>
      ${beans}
      <path d="M148 72h104l-20 80h-64z" fill="none" ${line(P)}/>
      <rect x="140" y="56" width="120" height="18" rx="9" fill="${P.shade}" ${line(P, 5)}/>
      <rect x="146" y="148" width="108" height="156" rx="20" fill="${P.card}" ${line(P)}/>
      <circle cx="200" cy="180" r="15" fill="${P.shade}" ${line(P, 5)}/>
      <path d="M200 180v-9" stroke="${P.accentInk}" stroke-width="4" stroke-linecap="round"/>
      <circle cx="236" cy="180" r="6" fill="${P.accent}"/>
      <rect x="162" y="220" width="76" height="66" rx="12" fill="${P.wash}" ${line(P, 5)}/>
      <path d="M166 272q34-24 68 0v4a8 8 0 0 1-8 8h-52a8 8 0 0 1-8-8z" fill="${P.accentInk}"/>
      <rect x="162" y="220" width="76" height="66" rx="12" fill="none" ${line(P, 5)}/>
      <rect x="132" y="302" width="136" height="30" rx="12" fill="${P.card}" ${line(P)}/>`;
  },
};

/** Where each object touches the floor, for its shadow (default 344). */
export const floor = { heat: 336, capsule: 332, 'manual-espresso': 332, drip: 336, 'manual-filter': 324, grinder: 334, moka: 338, superautomatic: 334 };
