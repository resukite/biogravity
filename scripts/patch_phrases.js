'use strict';

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'build-seo.js');
let c = fs.readFileSync(file, 'utf8');

const additions = [
  { phrase: 'why is space black', url: '/articles/why-is-space-black-olbers-paradox' },
  { phrase: "Olbers' paradox", url: '/articles/why-is-space-black-olbers-paradox' },
  { phrase: 'survive on Mars', url: '/articles/can-humans-survive-on-mars-without-a-spacesuit' },
  { phrase: 'Armstrong limit', url: '/articles/can-humans-survive-on-mars-without-a-spacesuit' },
  { phrase: 'Moon disappeared', url: '/articles/what-would-happen-if-the-moon-disappeared' },
  { phrase: 'speed of gravity', url: '/articles/how-fast-does-gravity-travel-speed-of-gravity' },
  { phrase: 'tardigrades survive in space', url: '/articles/how-do-tardigrades-survive-in-the-vacuum-of-space' },
  { phrase: 'stars twinkle', url: '/articles/why-do-stars-twinkle-atmospheric-scintillation' },
  { phrase: 'coldest temperature in the universe', url: '/articles/what-is-the-coldest-temperature-in-the-universe' },
  { phrase: 'Boomerang Nebula', url: '/articles/what-is-the-coldest-temperature-in-the-universe' },
  { phrase: 'nuclear pasta', url: '/articles/what-is-inside-a-neutron-star-nuclear-pasta' },
  { phrase: 'neutron star', url: '/articles/what-is-inside-a-neutron-star-nuclear-pasta' },
  { phrase: 'tidal locking', url: '/articles/why-can-we-only-see-one-side-of-the-moon' },
  { phrase: 'submarines make oxygen', url: '/articles/how-do-nuclear-submarines-make-oxygen-underwater' }
];

let formatted = '';
for (const item of additions) {
  if (!c.includes(item.url)) {
    formatted += `  { phrase: '${item.phrase}', url: '${item.url}' },\n`;
  }
}

if (formatted) {
  c = c.replace("const phraseLinks = [", "const phraseLinks = [\n" + formatted);
  fs.writeFileSync(file, c, 'utf8');
  console.log('✅ Added phrase links to build-seo.js');
} else {
  console.log('ℹ️ Phrase links already present.');
}
