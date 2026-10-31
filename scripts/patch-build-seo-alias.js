'use strict';

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'build-seo.js');
let code = fs.readFileSync(filePath, 'utf8');

const target = '  // If this article had a legacy truncated slug, create an instant redirect stub';
const endTarget = 'fs.writeFileSync(path.join(legacyDir, \'index.html\'), redirectHtml, \'utf8\');\r\n  }';
const endTargetLF = 'fs.writeFileSync(path.join(legacyDir, \'index.html\'), redirectHtml, \'utf8\');\n  }';

const replacement = `  // Also write full HTML to all aliases / legacy slugs so no crawler or visitor ever gets a blank noindex redirect!
  const aliases = [];
  if (art.legacyId && art.legacyId !== art.id) aliases.push(art.legacyId);
  if (art.aliasId && art.aliasId !== art.id && !aliases.includes(art.aliasId)) aliases.push(art.aliasId);
  if (Array.isArray(art.aliases)) {
    art.aliases.forEach(a => { if (a !== art.id && !aliases.includes(a)) aliases.push(a); });
  }

  aliases.forEach(alias => {
    fs.writeFileSync(path.join(articlesDir, \`\${alias}.html\`), html, 'utf8');
    const legacyDir = path.join(articlesDir, alias);
    if (!fs.existsSync(legacyDir)) fs.mkdirSync(legacyDir, { recursive: true });
    fs.writeFileSync(path.join(legacyDir, 'index.html'), html, 'utf8');
  });`;

const startIdx = code.indexOf(target);
if (startIdx !== -1) {
  let endIdx = code.indexOf(endTarget, startIdx);
  let len = endTarget.length;
  if (endIdx === -1) {
    endIdx = code.indexOf(endTargetLF, startIdx);
    len = endTargetLF.length;
  }
  if (endIdx !== -1) {
    code = code.slice(0, startIdx) + replacement + code.slice(endIdx + len);
    console.log('Successfully replaced redirect block in build-seo.js!');
  } else {
    console.log('Could not find endTarget');
  }
} else {
  console.log('Could not find target');
}

// Also remove line 1100 from legacyUrlMap
code = code.replace(/\s*'ideal-interaction-dynamics-of-defects-and-background-fields-in':\s*'interaction-dynamics-defects-background-fields',/g, '');

fs.writeFileSync(filePath, code, 'utf8');
console.log('Done updating build-seo.js');
