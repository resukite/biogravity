const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = walk(path.join(__dirname, '..', 'articles'));
console.log(`Auditing ${htmlFiles.length} HTML files in articles/...`);

const issues = [];
htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  
  const title = titleMatch ? titleMatch[1] : null;
  const desc = descMatch ? descMatch[1] : null;

  let hasIssue = false;
  let fileIssues = [];

  if (!title) {
    fileIssues.push('Missing <title>');
    hasIssue = true;
  } else if (title.includes('...')) {
    fileIssues.push(`Truncated <title>: "${title}"`);
    hasIssue = true;
  }

  if (!desc) {
    fileIssues.push('Missing meta description');
    hasIssue = true;
  } else if (desc.endsWith('...') || desc.includes('...')) {
    fileIssues.push(`Truncated meta description: "${desc.slice(0, 60)}..."`);
    hasIssue = true;
  }

  if (hasIssue) {
    issues.push({ file: path.relative(path.join(__dirname, '..'), file), issues: fileIssues });
  }
});

console.log(`Found ${issues.length} files with title/description issues:`);
issues.slice(0, 15).forEach(i => {
  console.log(`- ${i.file}:`);
  i.issues.forEach(iss => console.log(`    * ${iss}`));
});
