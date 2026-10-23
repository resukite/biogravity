'use strict';

const fs = require('fs');

let code = fs.readFileSync('build-seo.js', 'utf8');

// Inject into researchHtml processing
const researchHook = `  if (!researchHtml.includes('/contact')) {
    researchHtml = researchHtml.replace('About & Lab Notes</a>', 'About & Lab Notes</a>\\n          <a href="/contact" class="hover:text-cyan-400">Contact</a>');
    researchHtml = researchHtml.replace('href="/terms" class="hover:text-cyan-400">Terms</a>', 'href="/terms" class="hover:text-cyan-400">Terms</a>\\n          <span>•</span>\\n          <a href="/contact" class="hover:text-cyan-400">Contact</a>\\n          <span>•</span>\\n          <a href="/disclaimer" class="hover:text-cyan-400">Disclaimer</a>');
  }`;

if (!code.includes("researchHtml = researchHtml.replace('About & Lab Notes</a>'")) {
  code = code.replace(
    "fs.writeFileSync(researchPath, researchHtml, 'utf8');",
    `${researchHook}\n\n  fs.writeFileSync(researchPath, researchHtml, 'utf8');`
  );
  console.log('✅ Added contact injection to researchHtml');
}

// Inject into corePages processing
const coreHook = `    if (p.name !== 'contact' && !content.includes('/contact')) {
      content = content.replace('About & Lab Notes</a>', 'About & Lab Notes</a>\\n          <a href="/contact" class="hover:text-cyan-400">Contact</a>');
      content = content.replace('href="/terms" class="hover:text-cyan-400">Terms</a>', 'href="/terms" class="hover:text-cyan-400">Terms</a>\\n          <span>•</span>\\n          <a href="/contact" class="hover:text-cyan-400">Contact</a>\\n          <span>•</span>\\n          <a href="/disclaimer" class="hover:text-cyan-400">Disclaimer</a>');
    }`;

if (!code.includes("if (p.name !== 'contact' && !content.includes('/contact'))")) {
  code = code.replace(
    "fs.writeFileSync(filePath, content, 'utf8');",
    `${coreHook}\n\n    fs.writeFileSync(filePath, content, 'utf8');`
  );
  console.log('✅ Added contact injection to corePages');
}

fs.writeFileSync('build-seo.js', code, 'utf8');
console.log('Successfully injected sitewide contact links into build-seo.js!');
