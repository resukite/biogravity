'use strict';

const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function cleanHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Remove <script src="https://cdn.tailwindcss.com"></script>
  content = content.replace(/<script\s+src="https:\/\/cdn\.tailwindcss\.com"><\/script>\s*/gi, '');

  // Remove inline tailwind.config script block if present
  content = content.replace(/<script>\s*tailwind\.config\s*=\s*\{[\s\S]*?\}\s*<\/script>\s*/gi, '');

  // Ensure <link rel="stylesheet" href="/css/styles.css"> is present in head
  if (!content.includes('/css/styles.css') && content.includes('</head>')) {
    content = content.replace('</head>', '  <link rel="stylesheet" href="/css/styles.css">\n</head>');
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[OPTIMIZE-PERF] Cleaned Tailwind CDN runtime from: ${path.relative(root, filePath)}`);
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.system_generated') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name.endsWith('.html')) {
      cleanHtmlFile(full);
    }
  }
}

walk(root);
console.log('[OPTIMIZE-PERF] Finished removing runtime Tailwind CDN across all HTML files.');
