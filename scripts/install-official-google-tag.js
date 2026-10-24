'use strict';

const fs = require('fs');
const path = require('path');

const OLD_TAG = 'G-BSRJK4DMH7';
const NEW_TAG = 'G-BSRJK4DMH7';

console.log(`[GOOGLE-TAG] Replacing ${OLD_TAG} with official account tag ${NEW_TAG}...`);

function walkDir(dir, callback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== '.git' && entry.name !== 'node_modules' && entry.name !== '.system_generated') {
        walkDir(fullPath, callback);
      }
    } else if (entry.isFile()) {
      if (entry.name.endsWith('.html') || entry.name.endsWith('.js') || entry.name.endsWith('.md')) {
        callback(fullPath);
      }
    }
  }
}

let modifiedCount = 0;
walkDir(path.resolve(__dirname, '..'), (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes(OLD_TAG)) {
    const updated = content.split(OLD_TAG).join(NEW_TAG);
    fs.writeFileSync(filePath, updated, 'utf8');
    modifiedCount++;
    console.log(`✅ Updated: ${path.relative(path.resolve(__dirname, '..'), filePath)}`);
  }
});

console.log(`[GOOGLE-TAG] Done! Successfully updated official Google tag in ${modifiedCount} files.`);
