'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Patch index.html image dimensions
const indexPath = path.join(rootDir, 'index.html');
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');

  // Moon image in hero
  content = content.replace(
    /(<img\s+src="https:\/\/images\.unsplash\.com\/photo-1532693322450-2cb5c511067d[^>]*?)(loading="eager")/i,
    '$1width="1400" height="1400" $2'
  );

  // Showcase card images
  content = content.replace(
    /<img\s+src="https:\/\/images\.unsplash\.com\/photo-1451187580459-43490279c0fa\?auto=format&fit=crop&w=1200&q=80"\s+alt="Mitochondrial Bio-Oscillator Desynchronization"\s+class="w-full h-full object-cover group-hover:scale-105 transition duration-500"\s+loading="lazy">/g,
    '<img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80" alt="Mitochondrial Bio-Oscillator Desynchronization" width="1200" height="800" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy">'
  );

  content = content.replace(
    /<img\s+src="https:\/\/images\.unsplash\.com\/photo-1518770660439-4636190af475\?auto=format&fit=crop&w=1200&q=80"\s+alt="Radical Pair Spin Coherence"\s+class="w-full h-full object-cover group-hover:scale-105 transition duration-500"\s+loading="lazy">/g,
    '<img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" alt="Radical Pair Spin Coherence" width="1200" height="800" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy">'
  );

  content = content.replace(
    /<img\s+src="https:\/\/images\.unsplash\.com\/photo-1507668077129-56e32842fceb\?auto=format&fit=crop&w=1200&q=80"\s+alt="Synthetic Poly-ADP Metallo-Peptides"\s+class="w-full h-full object-cover group-hover:scale-105 transition duration-500"\s+loading="lazy">/g,
    '<img src="https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80" alt="Synthetic Poly-ADP Metallo-Peptides" width="1200" height="800" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy">'
  );

  fs.writeFileSync(indexPath, content, 'utf8');
  console.log('✅ Patched index.html images with explicit width and height');
}

// 2. Patch research.html
const researchPath = path.join(rootDir, 'research.html');
if (fs.existsSync(researchPath)) {
  let content = fs.readFileSync(researchPath, 'utf8');

  // Fix client-side template image dimensions
  content = content.replace(
    /alt="\$\{a\.title\}"\s+class="w-full h-full object-cover group-hover:scale-105 transition duration-500"\s+loading="lazy"/g,
    'alt="${a.title}" width="1200" height="800" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy"'
  );

  fs.writeFileSync(researchPath, content, 'utf8');
  console.log('✅ Patched research.html client-side template image dimensions');
}

// 3. Patch redirect stub files in articles/
const articlesDir = path.join(rootDir, 'articles');
if (fs.existsSync(articlesDir)) {
  fs.readdirSync(articlesDir).forEach(file => {
    if (file.endsWith('.html')) {
      const filePath = path.join(articlesDir, file);
      let html = fs.readFileSync(filePath, 'utf8');
      if (html.includes('http-equiv="refresh"') && !html.includes('name="robots"')) {
        html = html.replace(
          '<head>',
          '<head>\n  <meta name="robots" content="noindex, follow">'
        );
        fs.writeFileSync(filePath, html, 'utf8');
        console.log(`✅ Marked redirect stub with noindex, follow: articles/${file}`);
      }
    }
  });
}

console.log('Sitewide image dimensions and redirect headers applied.');
