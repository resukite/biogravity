'use strict';

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'build-seo.js');
let content = fs.readFileSync(filePath, 'utf8');

const target = `  if (indexHtml.includes('id="complete-orbital-archive"')) {
    indexHtml = indexHtml.replace(/<!-- Complete Orbital Research Archive[\\s\\S]*?<\\/div>\\s*<\\/div>\\s*<\\/div>/i, allArticlesArchiveHtml.trim() + '\\n        </div>');
  } else {
    // Insert before closing of the featured dispatches section
    indexHtml = indexHtml.replace(/(<\\/div>\\s*<\\/div>\\s*<\\/section>\\s*<\\/main>)/i, \`\${allArticlesArchiveHtml}\\n      $1\`);
  }`;

const replacement = `  if (indexHtml.includes('id="complete-orbital-archive"')) {
    const startIdx = indexHtml.indexOf('<div id="complete-orbital-archive"');
    const endMarker = '<!-- 6. DEDICATED TOOLS BANNER';
    const endIdx = indexHtml.indexOf(endMarker);
    if (startIdx !== -1 && endIdx !== -1) {
      const beforeEnd = indexHtml.slice(0, endIdx);
      const lastSection = beforeEnd.lastIndexOf('</section>');
      indexHtml = indexHtml.slice(0, startIdx) + allArticlesArchiveHtml.trim() + '\\n      </div>\\n    ' + indexHtml.slice(lastSection);
    }
  } else {
    indexHtml = indexHtml.replace(/(<\\/div>\\s*<\\/div>\\s*<\\/section>\\s*<\\/main>)/i, \`\${allArticlesArchiveHtml}\\n      $1\`);
  }`;

content = content.replace(target, replacement);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated build-seo.js index replacement logic!');
