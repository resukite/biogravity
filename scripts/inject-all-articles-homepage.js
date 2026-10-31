'use strict';

const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
const articles = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'articles.json'), 'utf8'));
let indexHtml = fs.readFileSync(indexPath, 'utf8');

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const allArticlesArchiveHtml = `
        <!-- Complete Open Access Catalog (100% Crawl Coverage) -->
        <div id="complete-orbital-archive" class="mt-14 p-6 sm:p-8 rounded-2xl bg-[#fafbfc] border border-slate-200/80">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
            <div>
              <div class="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-1">
                Open Access Catalog
              </div>
              <h3 class="text-xl sm:text-2xl font-display font-bold text-slate-900">
                All ${articles.length} Published Research Dispatches
              </h3>
            </div>
            <a href="/research" class="px-4 py-2 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200 transition flex items-center gap-1.5 self-start sm:self-auto">
              <span>View Full Research Feed →</span>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
` + articles.map(a => `
            <div class="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition group flex flex-col justify-between shadow-sm">
              <div>
                <div class="flex items-center justify-between text-[11px] mb-1.5 font-medium">
                  <span class="text-teal-600">${escapeHtml(a.category)}</span>
                  <span class="text-slate-400">${escapeHtml(a.readtime || '10 min')}</span>
                </div>
                <h4 class="font-display font-bold text-sm text-slate-900 group-hover:text-teal-600 transition line-clamp-2 mb-2">
                  <a href="/articles/${encodeURIComponent(a.id)}">${escapeHtml(a.seoTitle || a.title)}</a>
                </h4>
                <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  ${escapeHtml(a.summary)}
                </p>
              </div>
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span class="text-slate-400 font-medium">${escapeHtml(a.author)}</span>
                <a href="/articles/${encodeURIComponent(a.id)}" class="text-slate-900 hover:text-teal-600 font-semibold">
                  Read &rarr;
                </a>
              </div>
            </div>
`).join('') + `
          </div>
        </div>
`;

// Replace in index.html
const startIdx = indexHtml.indexOf('<div id="complete-orbital-archive"');
const endMarker = '<!-- 6. DEDICATED TOOLS BANNER';
const endIdx = indexHtml.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  const beforeEnd = indexHtml.slice(0, endIdx);
  const lastSection = beforeEnd.lastIndexOf('</section>');
  indexHtml = indexHtml.slice(0, startIdx) + allArticlesArchiveHtml.trim() + '\n      </div>\n    ' + indexHtml.slice(lastSection);
  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log(`Successfully injected all ${articles.length} dispatches into index.html!`);
} else {
  console.error('Could not find markers in index.html', { startIdx, endIdx });
}
