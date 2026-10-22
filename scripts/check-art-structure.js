'use strict';

const fs = require('fs');
const path = require('path');

const articles = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'articles.json'), 'utf8'));

console.log('Article 1 keys:', Object.keys(articles[0]));
console.log('Article 1 FAQs:', JSON.stringify(articles[0].faqs, null, 2));
console.log('Article 3 keys:', Object.keys(articles[2]));
