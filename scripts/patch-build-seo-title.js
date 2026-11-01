'use strict';

const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'build-seo.js');
let content = fs.readFileSync(targetPath, 'utf8');

// Regex replace the title truncation
const pattern = /let cleanSeoTitle = \(art\.seoTitle \|\| art\.title\)\.replace\(\/\\s\*\\\|\\s\*BioGravity\.\*\$\/i, ''\)\.trim\(\);\s*if \(cleanSeoTitle\.length > 52\) \{\s*cleanSeoTitle = cleanSeoTitle\.slice\(0, 52\)\.replace\(\/\\s\+\[\^\\s\]\*\$\/, ''\)\.trim\(\);\s*\}\s*const displayTitle = `\$\{escapeHtml\(cleanSeoTitle\)\} \| BioGravity`;\s*const socialTitle = escapeHtml\(art\.seoTitle \|\| art\.title\);/;

const replacement = `let cleanSeoTitle = (art.seoTitle || art.title).replace(/\\s*\\|\\s*BioGravity.*$/i, '').trim();
  let displayTitle = '';
  if (cleanSeoTitle.length + 13 <= 65) {
    displayTitle = \`\${escapeHtml(cleanSeoTitle)} | BioGravity\`;
  } else {
    displayTitle = \`\${escapeHtml(cleanSeoTitle)}\`;
  }
  const socialTitle = escapeHtml(cleanSeoTitle);`;

if (pattern.test(content)) {
  content = content.replace(pattern, replacement);
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log('SUCCESS: build-seo.js patched successfully!');
} else {
  console.log('PATTERN DID NOT MATCH');
}
