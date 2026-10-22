'use strict';

const fs = require('fs');
const path = require('path');

const pages = [
  'index.html',
  'research.html',
  'molecular-biology-research.html',
  'world-space-week-2026.html',
  'about.html'
];

pages.forEach(p => {
  const filePath = path.join(__dirname, '..', p);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
  console.log(`\n=== PAGE: ${p} ===`);
  console.log(`Title (${titleMatch ? titleMatch[1].length : 0}): ${titleMatch ? titleMatch[1] : 'NONE'}`);
  console.log(`Desc (${descMatch ? descMatch[1].length : 0}): ${descMatch ? descMatch[1] : 'NONE'}`);
  console.log(`H1: ${h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim().slice(0, 80) : 'NONE'}`);
});
