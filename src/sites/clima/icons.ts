// ClimaVerdict drawings on the engine's 24px grid (1.6px round strokes), merged into the base set.
export const icons: Record<string, string> = {
  // Dehumidifier: a cabinet with a water drop and its grille.
  dehum: '<rect x="5.5" y="3" width="13" height="18" rx="2.5"/><path d="M8.5 6.5h7"/><path d="M14.2 14.4a2.2 2.2 0 1 1-4.4 0c0-1.4 2.2-4.1 2.2-4.1s2.2 2.7 2.2 4.1Z"/>',
  // Portable air conditioner: tower, vent slats, hose leaving at the back.
  ac: '<rect x="4.5" y="3" width="10.5" height="18" rx="2"/><path d="M7 7h5.5M7 9.6h5.5"/><path d="M15 14c2.5 0 2.2 3 4.5 3.4"/><circle cx="9.75" cy="15.3" r="1.7"/>',
  // Oil-filled radiator: rounded fins on feet, with warmth rising.
  heat: '<rect x="4.5" y="8" width="4" height="11" rx="2"/><rect x="10" y="8" width="4" height="11" rx="2"/><rect x="15.5" y="8" width="4" height="11" rx="2"/><path d="M8.5 10.5H10M14 10.5h1.5M8.5 16.5H10M14 16.5h1.5"/><path d="M6.5 19v1.6M17.5 19v1.6"/><path d="M9 2.8c-.9 1 .9 1.9 0 3M12 2.8c-.9 1 .9 1.9 0 3M15 2.8c-.9 1 .9 1.9 0 3"/>',
  // Bathtub with a drop: "for the bathroom".
  bath: '<path d="M3.5 12h17v2.5a4.5 4.5 0 0 1-4.5 4.5H8a4.5 4.5 0 0 1-4.5-4.5Z"/><path d="M6 12V6.2A2.2 2.2 0 0 1 8.2 4 2.2 2.2 0 0 1 10.4 6.2"/><path d="M8 19l-1 1.8M16 19l1 1.8"/><path d="M15.5 5.2c1.1 1.3 1.9 2.3 1.9 3.3a1.9 1.9 0 0 1-3.8 0c0-1 .8-2 1.9-3.3Z"/>',
  // Air purifier: a round-topped tower with its intake grille and clean air rising.
  purifier: '<rect x="6.5" y="8" width="11" height="13" rx="3"/><path d="M9.5 12.5h5M9.5 15h5M9.5 17.5h5"/><path d="M8.5 5.5c1.2-1.4 2.3-1.4 3.5 0s2.3 1.4 3.5 0M9.5 2.8c.8-.9 1.6-.9 2.5 0s1.7.9 2.5 0"/>',
  drop: '<path d="M12 3.2c3.3 4 6 7.4 6 10.6a6 6 0 0 1-12 0c0-3.2 2.7-6.6 6-10.6Z"/><path d="M9.3 14.2a2.8 2.8 0 0 0 2.7 2.6"/>',
  // House with a big room: for "large or very damp rooms".
  home: '<path d="M4 10.5 12 4l8 6.5V20H4z"/><path d="M9.5 20v-5.5h5V20"/>',
  coins:
    '<ellipse cx="12" cy="6.8" rx="7" ry="2.9"/><path d="M5 6.8v5c0 1.6 3.1 2.9 7 2.9s7-1.3 7-2.9v-5"/><path d="M5 11.8v5c0 1.6 3.1 2.9 7 2.9s7-1.3 7-2.9v-5"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1.2"/>',
  // A snowflake: a cold room.
  cold: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/><path d="M9.6 4.6 12 7l2.4-2.4M9.6 19.4 12 17l2.4 2.4M4.8 10.6 8 9.9 7.1 6.7M16.9 17.3l-.9-3.2 3.2-.7M4.8 13.4 8 14.1l-.9 3.2M16.9 6.7l-.9 3.2 3.2.7"/>',
  // A leaf: efficient and quiet.
  leaf: '<path d="M5 19c0-8 5-13.5 14-14 .4 9-5 14-13 14Z"/><path d="M5 19c3-4 6-6.5 9.5-8.5"/>',
};
