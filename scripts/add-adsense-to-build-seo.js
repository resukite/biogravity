'use strict';
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'build-seo.js');
let content = fs.readFileSync(file, 'utf8');

const adsenseSnippet = `  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576621614388905"
     crossorigin="anonymous"></script>`;

// 1. In article page template:
const articleHead = `<head>\n  <meta charset="UTF-8">`;
const articleHeadWithAdsense = `<head>\n${adsenseSnippet}\n  <meta charset="UTF-8">`;

if (content.includes(articleHead)) {
  content = content.replace(articleHead, articleHeadWithAdsense);
} else {
  // Try CRLF
  content = content.replace(/<head>\r?\n\s*<meta charset="UTF-8">/, `<head>\r\n${adsenseSnippet}\r\n  <meta charset="UTF-8">`);
}

// 2. In 404 template:
const notFoundHead = `const notFoundHtml = \`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">`;
if (content.includes('const notFoundHtml')) {
  content = content.replace(
    /(const notFoundHtml = `[\s\S]*?<head>\r?\n)(\s*<meta charset="UTF-8">)/,
    `$1${adsenseSnippet}\r\n$2`
  );
}

fs.writeFileSync(file, content, 'utf8');
console.log('✅ Added AdSense snippet into build-seo.js article and 404 templates!');
