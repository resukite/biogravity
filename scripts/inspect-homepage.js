'use strict';

const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const regex = /<(section|div)[^>]*id="([^"]+)"[^>]*>/g;
let m;
console.log('Sections & IDs in index.html:');
while ((m = regex.exec(html)) !== null) {
  if (m[2].length > 3) {
    console.log(`- ${m[1]}#${m[2]}`);
  }
}
