// Shared by every Verdict site: who runs them and how to reach them.
// Legal operator data (d.lgs. 70/2003 + GDPR controller); scripts/check-launch.mjs blocks a production build while empty.
export const operator = {
  name: 'Gabriel Mazzaglia',
  contact: 'weboracode@gmail.com',
};

// The studio that builds and runs the sites. Every site links back to it:
// one transparent hub, no link network between the sites themselves.
export const publisher = {
  name: 'Webora Studio',
  url: 'https://weboracode.com',
};

// Webora's public inbox: one address for every site, no forwarding to set up.
export const contactEmail = 'weboracode@gmail.com';
