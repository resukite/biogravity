'use strict';

const fs = require('fs');
const path = require('path');

const ADSENSE_SNIPPET = `  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576621614388905"
     crossorigin="anonymous"></script>`;

const rootDir = path.join(__dirname, '..');

// 1. Update build-seo.js
const buildSeoPath = path.join(rootDir, 'build-seo.js');
let buildSeoCode = fs.readFileSync(buildSeoPath, 'utf8');
if (!buildSeoCode.includes('ca-pub-8576621614388905')) {
  buildSeoCode = buildSeoCode.replace(
    '<head>\n  <meta charset="UTF-8">',
    `<head>\n${ADSENSE_SNIPPET}\n  <meta charset="UTF-8">`
  );
  fs.writeFileSync(buildSeoPath, buildSeoCode, 'utf8');
  console.log('✅ Injected AdSense into build-seo.js');
}

// 2. Update cloud_seo_daemon.py
const cloudDaemonPath = path.join(rootDir, 'cloud_seo_daemon.py');
if (fs.existsSync(cloudDaemonPath)) {
  let daemonCode = fs.readFileSync(cloudDaemonPath, 'utf8');
  if (!daemonCode.includes('ca-pub-8576621614388905')) {
    daemonCode = daemonCode.replace(
      '<head>\n  <meta charset="UTF-8">',
      `<head>\n${ADSENSE_SNIPPET}\n  <meta charset="UTF-8">`
    );
    fs.writeFileSync(cloudDaemonPath, daemonCode, 'utf8');
    console.log('✅ Injected AdSense into cloud_seo_daemon.py');
  }
}

// 3. Inject into all HTML files recursively
function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === '.system_generated') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('.html')) {
      let html = fs.readFileSync(fullPath, 'utf8');
      if (!html.includes('ca-pub-8576621614388905') && html.includes('<head>')) {
        html = html.replace(
          /<head>/i,
          `<head>\n${ADSENSE_SNIPPET}`
        );
        fs.writeFileSync(fullPath, html, 'utf8');
        console.log(`✅ Injected AdSense into: ${path.relative(rootDir, fullPath)}`);
      }
    }
  }
}

processDir(rootDir);
console.log('🎉 Finished injecting Google AdSense across all files!');
