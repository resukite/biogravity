const fs = require('fs');
const articles = JSON.parse(fs.readFileSync('data/articles.json', 'utf8'));

console.log('Total articles:', articles.length);
articles.forEach((art, idx) => {
  console.log(`[${idx}] "${art.title}"`);
  console.log('   Keys:', Object.keys(art));
  console.log('   content length:', (art.content || '').length);
  console.log('   sections:', art.sections ? art.sections.length : 0);
  console.log('   summary length:', (art.summary || '').length);
});
