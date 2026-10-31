'use strict';

const fs = require('fs');
const path = require('path');

const articles = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'articles.json'), 'utf8'));
const art = articles.find(a => a.id.includes('cryptochrome') || a.id.includes('mitochondrial-aging'));

if (art) {
  console.log('ID:', art.id);
  console.log('Sections count:', art.sections ? art.sections.length : 0);
  if (art.sections) {
    art.sections.forEach((s, i) => console.log(`Section ${i+1}: ${s.title} (${(s.html||'').length} chars)`));
  }
  console.log('FAQs count:', art.faqs ? art.faqs.length : 0);
  console.log('Key takeaways count:', art.keyTakeaways ? art.keyTakeaways.length : 0);
}
