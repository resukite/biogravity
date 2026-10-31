'use strict';

const fs = require('fs');
const path = require('path');

const articlesPath = path.join(__dirname, '..', 'data', 'articles.json');
const backupPath = path.join(__dirname, '..', 'data', 'articles.backup.json');

let raw = fs.readFileSync(articlesPath, 'utf8');
fs.writeFileSync(backupPath, raw, 'utf8');
console.log('Backed up articles.json to articles.backup.json');

// Replace unreadable light-on-white text styles with accessible, high-contrast dark-on-white styles
let updated = raw
  // Paragraphs
  .replace(/\btext-slate-300\b/g, 'text-slate-700')
  // Subtitle / muted text in paragraphs
  .replace(/(<p[^>]*class="[^"]*)\btext-slate-400\b([^"]*")/g, '$1text-slate-600$2')
  // Cyan headings on white
  .replace(/\btext-cyan-400\b/g, 'text-teal-700 font-bold')
  // Emerald headings on white
  .replace(/\btext-emerald-400\b/g, 'text-emerald-800 font-bold')
  // Amber headings on white
  .replace(/\btext-amber-400\b/g, 'text-amber-800 font-bold');

fs.writeFileSync(articlesPath, updated, 'utf8');

const after300 = (updated.match(/text-slate-300/g) || []).length;
console.log(`Contrast fix completed! Remaining text-slate-300: ${after300}`);
