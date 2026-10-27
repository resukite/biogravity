const fs = require('fs');
const articles = JSON.parse(fs.readFileSync('data/articles.json', 'utf8'));
console.log('Total articles in data/articles.json:', articles.length);
let under800 = 0;
articles.forEach(a => {
  const text = (a.content || '') + ' ' + (a.sections ? a.sections.map(s => s.html).join(' ') : '') + ' ' + (a.keyTakeaways || []).join(' ') + ' ' + (a.faqs || []).map(f => f.question + ' ' + f.answer).join(' ');
  const words = text.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  if (words < 800) {
    under800++;
    console.log('[<800 words] ' + a.id + ': ' + words + ' words');
  }
});
console.log('Under 800 words count: ' + under800 + ' out of ' + articles.length);
