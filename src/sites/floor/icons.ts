// FloorVerdict drawings on the engine's 24px grid (1.6px round strokes), merged into the base set.
export const icons: Record<string, string> = {
  // Robot from above: body, LiDAR turret, bumper.
  robot: '<circle cx="12" cy="12.5" r="8.5"/><circle cx="12" cy="8.6" r="2.1"/><path d="M5.3 16a8.5 8.5 0 0 0 13.4 0"/>',
  // Cordless stick: handle, tube, motor body, floor head.
  stick:
    '<path d="M13.6 2.8h3.2l-.6 3"/><path d="M16.2 5.8 11.2 17.6"/><path d="M12.7 7.9l2.6 1.1-2.2 5.2-2.6-1.1z"/><path d="M5 20.8h8.3a1.5 1.5 0 0 0 0-3H11"/>',
  // Floor washer: handle, clean-water drop, wide roller.
  wet: '<path d="M14 2.8v11.4"/><path d="M11.8 2.8h4.4"/><rect x="6.5" y="14.8" width="13" height="4.8" rx="2.4"/><path d="M8.6 10.8a1.7 1.7 0 1 1-3.4 0c0-1.1 1.7-3.2 1.7-3.2s1.7 2.1 1.7 3.2Z"/>',
  // Steam mop: handle, flat head, steam rising from the floor.
  steam: '<path d="M15 2.8v12.2"/><path d="M13 2.8h4"/><path d="M8 15h14l-1 3.5H9Z"/><path d="M4.2 13.5c-.9-1 .9-2 0-3M7 12c-.9-1 .9-2 0-3M9.8 13.5c-.9-1 .9-2 0-3"/><path d="M3 21h18"/>',
  // A feather: light.
  feather: '<path d="M19 4.5c-6.5.3-11 4.8-11.4 11.3L7 20"/><path d="M19 4.5c.2 6.7-4.5 11-11.3 11.4"/><path d="M11 13l4.2-4.2"/>',
  paw: '<ellipse cx="6.6" cy="10" rx="1.7" ry="2.2"/><ellipse cx="10.2" cy="6.5" rx="1.7" ry="2.2"/><ellipse cx="13.8" cy="6.5" rx="1.7" ry="2.2"/><ellipse cx="17.4" cy="10" rx="1.7" ry="2.2"/><path d="M12 11.6c-2.6 0-5 3.3-5 5.5 0 1.6 1.2 2.4 2.6 2.4.9 0 1.6-.5 2.4-.5s1.5.5 2.4.5c1.4 0 2.6-.8 2.6-2.4 0-2.2-2.4-5.5-5-5.5Z"/>',
  coins:
    '<ellipse cx="12" cy="6.8" rx="7" ry="2.9"/><path d="M5 6.8v5c0 1.6 3.1 2.9 7 2.9s7-1.3 7-2.9v-5"/><path d="M5 11.8v5c0 1.6 3.1 2.9 7 2.9s7-1.3 7-2.9v-5"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1.2"/>',
  // A bin emptying itself: arrow down into the bag.
  bin: '<path d="M5.5 8h13l-1.1 11.6a1.6 1.6 0 0 1-1.6 1.4H8.2a1.6 1.6 0 0 1-1.6-1.4L5.5 8Z"/><path d="M4 8h16M9.5 8V5.2h5V8"/><path d="M12 11v5.6M9.6 14.2 12 16.6l2.4-2.4"/>',
  calendar: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 9.6h16M8.5 3v4M15.5 3v4"/><path d="m9 14.6 2 2 4-4"/>',
  // A stain, with the shine of something sticky.
  stain: '<path d="M12 3.5c3 3.6 5.5 6.8 5.5 9.9a5.5 5.5 0 0 1-11 0c0-3.1 2.5-6.3 5.5-9.9Z"/><path d="M9.6 14.2a2.6 2.6 0 0 0 2.4 2.4"/>',
};
