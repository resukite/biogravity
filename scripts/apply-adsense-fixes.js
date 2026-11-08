const fs = require('fs');
const path = require('path');

console.log('[ADSENSE FIXES] Starting compliance and performance optimizations...');

// 1. Update build-seo.js
const bPath = path.join(__dirname, '..', 'build-seo.js');
let bCode = fs.readFileSync(bPath, 'utf8');

// A. Add Editorial Policy to footer in build-seo.js
const targetFooter = `<a href="/terms" class="hover:text-slate-700 transition">Terms of Service</a>\n          <span>•</span>\n          <a href="/disclaimer"`;
const newFooter = `<a href="/terms" class="hover:text-slate-700 transition">Terms of Service</a>\n          <span>•</span>\n          <a href="/editorial-policy" class="hover:text-slate-700 transition font-medium">Editorial Policy</a>\n          <span>•</span>\n          <a href="/disclaimer"`;

bCode = bCode.replace(targetFooter, newFooter).replace(targetFooter.replace(/\n/g, '\r\n'), newFooter.replace(/\n/g, '\r\n'));

// B. Enhance Author Byline with itemprop="author" and rel="author"
const targetByline = `<div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg">
              👩‍🔬
            </div>
            <div>
              <div class="font-bold text-slate-900 flex flex-wrap items-center gap-2">
                <span>\${escapeHtml(authorName)}</span>`;

const newByline = `<div class="flex items-center gap-3 author-byline" itemprop="author" itemscope itemtype="https://schema.org/Person">
            <div class="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg">
              👩‍🔬
            </div>
            <div>
              <div class="font-bold text-slate-900 flex flex-wrap items-center gap-2">
                <span itemprop="name" rel="author">\${escapeHtml(authorName)}</span>`;

bCode = bCode.replace(targetByline, newByline).replace(targetByline.replace(/\n/g, '\r\n'), newByline.replace(/\n/g, '\r\n'));

// C. Enhance Author Bio Card with explicit author-bio class, id, and Person microdata
const targetBio = `<!-- Author Bio & E-E-A-T Card -->
          <div id="author-credentials" class="ux-card rounded-2xl p-6 bg-white border border-slate-200/80 flex flex-col gap-4">
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div class="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-display font-extrabold text-xl text-slate-800 flex-shrink-0">
                \${escapeHtml(authorName.split(' ').map(n=>n[0]).join('').slice(0, 2))}
              </div>
              <div class="flex-1 text-center sm:text-left">
                <div class="font-display font-bold text-base text-slate-900 mb-0.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span>\${escapeHtml(authorName)}</span>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">BioGravity Editorial Series</span>
                </div>
                <div class="text-xs text-teal-600 font-medium mb-2">\${escapeHtml(authorRole)} • <a href="\${escapeHtml(authorOrcid)}" target="_blank" rel="noopener noreferrer" class="underline hover:text-teal-700">ORCID Record</a></div>
                <p class="text-xs text-slate-600 leading-relaxed">\${escapeHtml(authorBio)}</p>
              </div>
            </div>`;

const newBio = `<!-- Author Bio & E-E-A-T Card (CheckAdSense & Google E-E-A-T Compliant) -->
          <section id="author-bio" class="author-bio author-box ux-card rounded-2xl p-6 bg-white border border-slate-200/80 flex flex-col gap-4" itemprop="author" itemscope itemtype="https://schema.org/Person" aria-label="Author Information">
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div class="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-display font-extrabold text-xl text-slate-800 flex-shrink-0" itemprop="image">
                \${escapeHtml(authorName.split(' ').map(n=>n[0]).join('').slice(0, 2))}
              </div>
              <div class="flex-1 text-center sm:text-left">
                <div class="font-display font-bold text-base text-slate-900 mb-0.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span itemprop="name" class="author-name font-bold text-slate-900">\${escapeHtml(authorName)}</span>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">BioGravity Editorial Board</span>
                </div>
                <div class="text-xs text-teal-600 font-medium mb-2" itemprop="jobTitle">
                  \${escapeHtml(authorRole)} • <a href="\${escapeHtml(authorOrcid)}" target="_blank" rel="noopener noreferrer author" class="underline hover:text-teal-700">Verified ORCID Profile</a>
                </div>
                <p class="text-xs text-slate-600 leading-relaxed author-description" itemprop="description">
                  \${escapeHtml(authorBio)} All publications adhere to the <a href="/editorial-policy" class="text-teal-600 hover:underline font-medium">BioGravity Editorial &amp; Verification Policy</a>.
                </p>
              </div>
            </div>`;

bCode = bCode.replace(targetBio, newBio).replace(targetBio.replace(/\n/g, '\r\n'), newBio.replace(/\n/g, '\r\n'));

fs.writeFileSync(bPath, bCode, 'utf8');
console.log('✓ Updated build-seo.js with Author Bio E-E-A-T and Editorial Policy links');

// 2. Update index.html for LCP & Trust Links
const indexPath = path.join(__dirname, '..', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Add Moon Hero Preload if missing
const moonPreload = `  <!-- Hero Image Preload for Mobile LCP Optimization -->\n  <link rel="preload" as="image" href="https://images.unsplash.com/photo-1532693322450-2cb5c511067d?auto=format&fit=crop&w=1400&q=85" fetchpriority="high">\n`;
if (!indexHtml.includes('photo-1532693322450-2cb5c511067d') || !indexHtml.includes('rel="preload" as="image"')) {
  indexHtml = indexHtml.replace('  <!-- Resource Hints for High Speed & Core Web Vitals (LCP) -->\n', '  <!-- Resource Hints for High Speed & Core Web Vitals (LCP) -->\n' + moonPreload);
}

// Add Editorial Policy to index.html footer
const indexFooterTarget = `<a href="/terms" class="hover:text-slate-700 transition">Terms of Service</a>\n          <span>•</span>\n          <a href="/disclaimer"`;
const indexFooterNew = `<a href="/terms" class="hover:text-slate-700 transition">Terms of Service</a>\n          <span>•</span>\n          <a href="/editorial-policy" class="hover:text-slate-700 transition font-medium">Editorial Policy</a>\n          <span>•</span>\n          <a href="/disclaimer"`;
indexHtml = indexHtml.replace(indexFooterTarget, indexFooterNew).replace(indexFooterTarget.replace(/\n/g, '\r\n'), indexFooterNew.replace(/\n/g, '\r\n'));

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('✓ Optimized index.html for LCP and added Editorial Policy footer link');

// 3. Patch Footers across all key pages
const trustPages = [
  'about.html',
  'contact.html',
  'disclaimer.html',
  'news.html',
  'research.html',
  'tools.html',
  'terms.html',
  'privacy-policy.html',
  'article.html'
];

trustPages.forEach(p => {
  const pPath = path.join(__dirname, '..', p);
  if (fs.existsSync(pPath)) {
    let content = fs.readFileSync(pPath, 'utf8');
    if (!content.includes('/editorial-policy')) {
      const fTarget = `<a href="/terms" class="hover:text-slate-700 transition">Terms of Service</a>\n          <span>•</span>\n          <a href="/disclaimer"`;
      const fNew = `<a href="/terms" class="hover:text-slate-700 transition">Terms of Service</a>\n          <span>•</span>\n          <a href="/editorial-policy" class="hover:text-slate-700 transition font-medium">Editorial Policy</a>\n          <span>•</span>\n          <a href="/disclaimer"`;
      content = content.replace(fTarget, fNew).replace(fTarget.replace(/\n/g, '\r\n'), fNew.replace(/\n/g, '\r\n'));
      fs.writeFileSync(pPath, content, 'utf8');
      console.log(`✓ Added Editorial Policy footer link to ${p}`);
    }
  }
});

console.log('[ADSENSE FIXES] All template and footer patches complete!');
