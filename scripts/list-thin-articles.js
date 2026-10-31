'use strict';

const fs = require('fs');
const path = require('path');

const articles = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'articles.json'), 'utf8'));

const thin = [];

articles.forEach(a => {
  let text = '';
  if (a.content) text += ' ' + a.content;
  if (Array.isArray(a.sections)) {
    a.sections.forEach(s => text += ' ' + (s.html || ''));
  }
  if (Array.isArray(a.faqs)) {
    a.faqs.forEach(f => text += ' ' + f.question + ' ' + f.answer);
  }
  const clean = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = clean ? clean.split(' ').length : 0;
  if (words < 700) {
    thin.push({ id: a.id, title: a.title, words, hasSections: !!a.sections, hasContent: !!a.content });
  }
});

console.log(`Found ${thin.length} thin articles (< 700 words):`);
thin.forEach(t => console.log(`[${t.words}w] ${t.id} (sections: ${t.hasSections}, content: ${t.hasContent})`));
