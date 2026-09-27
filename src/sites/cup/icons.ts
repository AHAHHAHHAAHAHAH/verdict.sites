// CupVerdict drawings on the engine's 24px grid (1.6px round strokes), merged into the base set.
export const icons: Record<string, string> = {
  dripper: '<path d="M4.5 5.5h15l-4.2 7.5H8.7L4.5 5.5Z"/><path d="M9 13v1.6h6V13"/><path d="M7.5 16.3h9l-.9 4.2a.8.8 0 0 1-.8.6H9.2a.8.8 0 0 1-.8-.6l-.9-4.2Z"/><path d="M12 1.8c.8 1 1.1 1.7 1.1 2.1a1.1 1.1 0 0 1-2.2 0c0-.4.3-1.1 1.1-2.1Z"/>',
  machine: '<path d="M5 3.5h14a1 1 0 0 1 1 1V20H4V4.5a1 1 0 0 1 1-1Z"/><path d="M4 7.5h16"/><path d="M9.5 10h5v1.6h-5Z"/><path d="M14.5 10.8h3"/><path d="M10 15.3h4v2.3a1.2 1.2 0 0 1-1.2 1.2h-1.6a1.2 1.2 0 0 1-1.2-1.2v-2.3Z"/><path d="M3 20.5h18"/>',
  receipt: '<path d="M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4V3Z"/><path d="M9 7.5h6M9 11h6M9 14.5h3.5"/>',
  office: '<path d="M4.5 21V4.8a.8.8 0 0 1 .8-.8h8.4a.8.8 0 0 1 .8.8V21"/><path d="M14.5 9.5h3.7a.8.8 0 0 1 .8.8V21"/><path d="M3 21h18"/><path d="M8 7.5h1.5M11 7.5h1.5M8 11h1.5M11 11h1.5M8 14.5h1.5M11 14.5h1.5"/><path d="M9 21v-3h2.5v3"/>',
  capsule: '<path d="M4.5 8h15"/><path d="M6.2 8h11.6l-2.1 8.4a2 2 0 0 1-1.9 1.6H10.2a2 2 0 0 1-1.9-1.6L6.2 8Z"/><path d="M8.6 8c0-1.7 1.5-3 3.4-3s3.4 1.3 3.4 3"/><path d="M9.8 12h4.4"/>',
  portafilter: '<path d="M3 9.5h13"/><path d="M4 9.5h11v1.3a4.2 4.2 0 0 1-4.2 4.2H8.2A4.2 4.2 0 0 1 4 10.8V9.5Z"/><path d="M15 11.2h5.6a1 1 0 0 1 0 2H15"/><path d="M8 15v2.4M11 15v2.4"/>',
  moka: '<path d="M7 4.5h8M10.2 3h1.6"/><path d="M7 4.5 8.3 11h5.4L15 4.5"/><path d="M8 11.2h6"/><path d="M8.3 11.2 6.8 20h8.4l-1.5-8.8"/><path d="M15 5.5h1.8a.8.8 0 0 1 .8.9l-.7 5"/><path d="M7 4.8 5.6 6"/>',
  drip: '<path d="M5.5 3.5h13a1 1 0 0 1 1 1v3h-15v-3a1 1 0 0 1 1-1Z"/><path d="M17.5 7.5v13"/><path d="M7 7.5h8l-1.5 3h-5L7 7.5Z"/><path d="M7.5 13h7l-.6 6.3a.9.9 0 0 1-.9.8H9a.9.9 0 0 1-.9-.8L7.5 13Z"/><path d="M4.5 20.5h15"/>',
  espresso: '<path d="M6.5 9.5h9v3.2a4.5 4.5 0 0 1-9 0V9.5Z"/><path d="M15.5 10.5h1.2a2 2 0 0 1 0 4h-1.6"/><path d="M4 19.5h14"/><path d="M9.5 4.5c-.7.8-.7 1.6 0 2.4M12.5 4.5c-.7.8-.7 1.6 0 2.4"/>',
  latte: '<path d="M7.5 3.5h9l-1.2 16.2a1.2 1.2 0 0 1-1.2 1.1H9.9a1.2 1.2 0 0 1-1.2-1.1L7.5 3.5Z"/><path d="M8.1 9h7.8M8.5 13.5h7"/><path d="M10.5 6.2h.01M13.4 6.4h.01"/>',
  // Burr grinder: hopper on top, body, and the cup of grounds.
  grinder: '<path d="M7.5 3h9l-1.5 5h-6L7.5 3Z"/><path d="M8 8h8v6.5H8Z"/><path d="M10.5 11.2h3"/><path d="M8.5 14.5 7 20.5h10l-1.5-6"/><path d="M10 17.5h4"/>',
  // Stacked coins: spend less.
  coins: '<ellipse cx="12" cy="6.8" rx="7" ry="2.9"/><path d="M5 6.8v5c0 1.6 3.1 2.9 7 2.9s7-1.3 7-2.9v-5"/><path d="M5 11.8v5c0 1.6 3.1 2.9 7 2.9s7-1.3 7-2.9v-5"/>',
  // Two people: brewing for several.
  people: '<circle cx="9" cy="8.2" r="3"/><path d="M3.5 19.5c.6-3.2 2.8-5.2 5.5-5.2s4.9 2 5.5 5.2"/><circle cx="16.6" cy="9.2" r="2.4"/><path d="M15.4 14.4c2.4-.2 4.4 1.6 5.1 4.6"/>',
  tap: '<path d="M5 15.5h14a1.5 1.5 0 0 1 1.5 1.5v1.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5V17A1.5 1.5 0 0 1 5 15.5Z"/><path d="M10.5 13.5V5.2a1.5 1.5 0 0 1 3 0v8.3"/><path d="M7.5 6.5 6 5.5M16.5 6.5 18 5.5M12 1.8v.01"/>',
};
