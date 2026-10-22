'use strict';

const fs = require('fs');
const path = require('path');

const samplePath = path.join(__dirname, '..', 'articles', 'non-thermal-quantum-proton-tunneling-in-crispr-cas9-catalytic-triads-orbital-evi', 'index.html');
const content = fs.readFileSync(samplePath, 'utf8');

const titleMatch = content.match(/<title>(.*?)<\/title>/i);
const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
const hasFaqSchema = content.includes('"@type": "FAQPage"');
const hasFaqSection = content.includes('id="frequently-asked-questions"');

console.log('Sample Article Verification:');
console.log('Title:', titleMatch ? titleMatch[1] : 'NONE', `(${titleMatch[1].length} chars)`);
console.log('Desc:', descMatch ? descMatch[1] : 'NONE', `(${descMatch[1].length} chars)`);
console.log('FAQ Schema Present:', hasFaqSchema);
console.log('FAQ Visible Section Present:', hasFaqSection);
