const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// 1. Fix news.html and news/index.html
['news.html', 'news/index.html'].forEach(rel => {
  const filePath = path.join(rootDir, rel);
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');

  // Fix the two images missing width/height
  html = html.replace(
    /<img src="https:\/\/images\.unsplash\.com\/photo-1517411032315-54ef2cb783bb\?auto=format&amp;fit=crop&amp;w=1600&amp;h=900&amp;q=85" alt="Glacial ice sheet core sampling and polar climate research expedition" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="eager">/g,
    '<img src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&amp;fit=crop&amp;w=1600&amp;h=900&amp;q=85" alt="Glacial ice sheet core sampling and polar climate research expedition" width="1600" height="900" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="eager">'
  );

  html = html.replace(
    /<img src="https:\/\/images\.unsplash\.com\/photo-1509391365360-2e959784a276\?auto=format&amp;fit=crop&amp;w=1600&amp;h=900&amp;q=85" alt="Renewable biological solar cells and clean environmental nanotechnology" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="eager">/g,
    '<img src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&amp;fit=crop&amp;w=1600&amp;h=900&amp;q=85" alt="Renewable biological solar cells and clean environmental nanotechnology" width="1600" height="900" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" loading="eager">'
  );

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`✅ Patched image dimensions in ${rel}`);
});

// 2. Turn 3 orphan files into redirect stubs
const redirects = [
  {
    file: 'articles/exact-analytical-treatment-of-collectively-pumped-dicke.html',
    target: 'https://biogravity.space/articles/quantum-proton-tunneling-crispr-cas9-catalytic-triads',
    title: 'CRISPR in Zero Gravity: Does Quantum Tunneling Accelerate Gene Editing?'
  },
  {
    file: 'articles/mediated-interactions-between-fermi-polarons-in-the-strongly.html',
    target: 'https://biogravity.space/articles/acoustic-levitation-scaffold-free-cardiac-organoid-bioprinting',
    title: 'Why Scientists Are 3D-Printing Beating Human Organs in Zero Gravity'
  },
  {
    file: 'articles/optimal-quantum-discrimination-at-liouvillian-exceptional-points.html',
    target: 'https://biogravity.space/articles/phonon-assisted-free-electron-recoil-control-and-mechanical-sensing',
    title: 'Spacecraft Sensors in Orbit: The Physics Behind Liouvillian Exceptional Points'
  }
];

redirects.forEach(r => {
  const filePath = path.join(rootDir, r.file);
  const stubHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="robots" content="noindex, follow">
  <meta http-equiv="refresh" content="0; url=${r.target}">
  <link rel="canonical" href="${r.target}">
  <title>Redirecting to ${r.title}</title>
</head>
<body>
  <p>Redirecting to <a href="${r.target}">${r.title}</a>...</p>
</body>
</html>`;
  fs.writeFileSync(filePath, stubHtml, 'utf8');
  console.log(`✅ Converted ${r.file} to canonical redirect stub`);
});
