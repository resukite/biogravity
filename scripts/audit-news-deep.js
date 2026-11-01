'use strict';
const fs = require('fs');
const path = require('path');

const news = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'news.json'), 'utf8'));
console.log(`--- NEWS AUDIT (${news.length} items) ---`);
let longTitles = 0, shortTitles = 0, missingDesc = 0;

news.forEach(n => {
  const title = n.title || '';
  const desc = n.summary || n.description || '';
  if (title.length > 70) {
    console.log(`LONG NEWS TITLE (${title.length}): ${n.id} -> "${title}"`);
    longTitles++;
  } else if (title.length < 25) {
    console.log(`SHORT NEWS TITLE (${title.length}): ${n.id} -> "${title}"`);
    shortTitles++;
  }
  if (!desc || desc.length < 50) {
    missingDesc++;
  }
});

console.log(`Summary: Long Titles: ${longTitles} | Short Titles: ${shortTitles} | Missing/Short Desc: ${missingDesc}`);
