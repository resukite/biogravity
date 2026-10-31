'use strict';

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'articles', 'ideal-interaction-dynamics-of-defects-and-background-fields-in.md');
let md = fs.readFileSync(filePath, 'utf8');

md = md.replace(/primaryKeyword: .*/, 'primaryKeyword: "ideal interaction dynamics of defects and background fields in condensed matter"');
md = md.replace(/metaDescription: .*/, 'metaDescription: "Explore the ideal interaction dynamics of topological defects and background fields in condensed matter across Gross-Pitaevskii and Ericksen-Leslie models."');
md = md.replace(/doi: .*/, 'doi: "10.48550/arXiv.2610.32973"');
md = md.replace(/readtime: .*/, 'readtime: "14 min read"');
md = md.replace(/impact: .*/, 'impact: 9.8');

fs.writeFileSync(filePath, md, 'utf8');
console.log('Updated markdown file successfully.');
