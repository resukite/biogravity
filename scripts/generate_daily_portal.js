'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const articlesPath = path.join(rootDir, 'data', 'articles.json');
const outreachDir = path.join(rootDir, 'outreach');

if (!fs.existsSync(outreachDir)) {
  fs.mkdirSync(outreachDir, { recursive: true });
}

const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
const today = new Date().toISOString().split('T')[0];
const targetArticles = articles.slice(0, 2);

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const portalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BioGravity Daily Outreach Portal | ${today}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background-color: #020617; color: #f8fafc; font-family: ui-sans-serif, system-ui, sans-serif; }
    .glass-card { background: rgba(15, 23, 42, 0.75); border: 1px solid rgba(56, 189, 248, 0.2); backdrop-filter: blur(12px); }
  </style>
</head>
<body class="min-h-screen py-10 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col justify-between">
  
  <header class="mb-8 pb-6 border-b border-slate-800 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
    <div>
      <div class="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        Zero-Spam Daily Outreach Engine
      </div>
      <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
        BioGravity Daily Social Portal (${today})
      </h1>
      <p class="text-xs text-slate-400 mt-1">
        2 handpicked research dispatches ready to share. High organic reach, 100% legal for AdSense.
      </p>
    </div>
    <div class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-300">
      ✅ Limited to max 1x / day (Zero Spam)
    </div>
  </header>

  <main class="space-y-8">
    ${targetArticles.map((art, idx) => {
      const url = `https://biogravity.space/articles/${art.id}`;
      const subreddits = (art.category || '').toLowerCase().includes('physics')
        ? 'r/space, r/Physics, r/QuantumComputing'
        : 'r/biotech, r/biology, r/space';

      const redditTitle = `[Research Dispatch] How orbital microgravity isolates ${art.title.toLowerCase().replace(/^(the|a|an)\s+/i, '')} without terrestrial convection artifacts`;
      const redditBody = `Hey everyone,\n\nWe've been analyzing the recent orbital telemetry and biophysical mechanisms behind ${art.title}.\n\nIn terrestrial 1G environments, buoyant convection eddies and hydrostatic settling mask fundamental kinetics. In low Earth orbit (<0.05 μg background acceleration), mass transport shifts strictly to pure Fickian diffusion.\n\nKey observations from this dispatch:\n${(art.keyTakeaways || []).slice(0, 3).map(k => `• ${k}`).join('\n')}\n\nGiven that diffusion-limited regimes alter conformational lifetimes, could spaceborne bioreactors become standard for macro-crystallography?\n\nFull telemetry datasets, DOI citations, and equations in the open dispatch:\n${url}`;

      const tweetText = `Breakthrough in ${art.category || 'Space Science'}:\n\nHow does continuous microgravity alter "${art.title}"?\n\nGround labs suffer from convective eddies that mask pure diffusion kinetics. Here's what orbital telemetry reveals:\n${url}\n\n#BioGravity #QuantumBiotech #SpaceScience`;

      return `
    <div class="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-4 border-b border-slate-800">
        <div>
          <span class="text-[10px] font-mono px-2.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">Article #${idx + 1}</span>
          <h2 class="text-lg font-bold text-white mt-1">${escapeHtml(art.title)}</h2>
        </div>
        <a href="${url}" target="_blank" class="text-xs font-mono text-cyan-400 hover:underline">View Live Dispatch &rarr;</a>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Reddit Card -->
        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs font-mono text-orange-400 mb-2">
              <span class="font-bold flex items-center gap-1.5">👽 Reddit Post</span>
              <span class="text-slate-500">${subreddits}</span>
            </div>
            <div class="text-xs font-semibold text-slate-200 mb-2">${escapeHtml(redditTitle)}</div>
            <div class="text-[11px] text-slate-400 line-clamp-3 mb-4 leading-relaxed font-mono bg-slate-950 p-2.5 rounded border border-slate-800/80">
              ${escapeHtml(redditBody)}
            </div>
          </div>
          <div class="flex gap-2">
            <button onclick="copyText(${JSON.stringify(redditTitle + '\n\n' + redditBody)}, this)" class="flex-1 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-mono text-xs font-bold transition">
              📋 Copy Post
            </button>
            <a href="https://www.reddit.com/submit" target="_blank" class="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition">
              Open Reddit &rarr;
            </a>
          </div>
        </div>

        <!-- Twitter / X Card -->
        <div class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between text-xs font-mono text-sky-400 mb-2">
              <span class="font-bold flex items-center gap-1.5">𝕏 Twitter / X Post</span>
              <span class="text-slate-500">Fast Viral Snippet</span>
            </div>
            <div class="text-[11px] text-slate-300 line-clamp-4 mb-4 leading-relaxed font-mono bg-slate-950 p-2.5 rounded border border-slate-800/80">
              ${escapeHtml(tweetText)}
            </div>
          </div>
          <div class="flex gap-2">
            <button onclick="copyText(${JSON.stringify(tweetText)}, this)" class="flex-1 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold transition">
              📋 Copy Tweet
            </button>
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}" target="_blank" class="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs transition">
              Post Directly &rarr;
            </a>
          </div>
        </div>

      </div>
    </div>
      `;
    }).join('')}
  </main>

  <footer class="mt-10 pt-6 border-t border-slate-800 text-center text-xs font-mono text-slate-500">
    BioGravity Automated Growth System • Done for today. Won't open again until tomorrow!
  </footer>

  <script>
    function copyText(text, btn) {
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.innerText;
        btn.innerText = '✅ Copied!';
        btn.classList.add('bg-emerald-600');
        setTimeout(() => {
          btn.innerText = orig;
          btn.classList.remove('bg-emerald-600');
        }, 2000);
      });
    }
  </script>
</body>
</html>`;

const portalPath = path.join(outreachDir, 'daily-outreach-portal.html');
fs.writeFileSync(portalPath, portalHtml, 'utf8');
console.log(`✅ Generated daily outreach portal: ${portalPath}`);
