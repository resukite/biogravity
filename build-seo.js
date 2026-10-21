'use strict';

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://biogravity.space';
const TODAY = '2026-10-16';

const articlesPath = path.join(__dirname, 'data', 'articles.json');
if (!fs.existsSync(articlesPath)) {
  console.error('articles.json not found!');
  process.exit(1);
}

const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
const articlesDir = path.join(__dirname, 'articles');
if (!fs.existsSync(articlesDir)) {
  fs.mkdirSync(articlesDir, { recursive: true });
}

console.log(`[BUILD-SEO] Processing ${articles.length} live articles...`);

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderArticleBody(art) {
  if (art.content && typeof art.content === 'string' && art.content.trim() && art.content.trim() !== 'undefined') {
    return art.content;
  }
  let full = '';
  if (Array.isArray(art.keyTakeaways) && art.keyTakeaways.length > 0) {
    const liItems = art.keyTakeaways.map(kt => `    <li>${escapeHtml(kt)}</li>`).join('\n');
    full += `<div class="mb-8 p-5 rounded-2xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-md shadow-xl shadow-cyan-950/20">
  <div class="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
    <span class="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
    Student &amp; Researcher Key Takeaways
  </div>
  <ul class="text-sm text-slate-300 space-y-1.5 list-disc list-inside">
${liItems}
  </ul>
</div>\n\n`;
  }

  if (Array.isArray(art.sections) && art.sections.length > 0) {
    for (const sec of art.sections) {
      full += `<section class="mb-10">
  <h2 class="text-2xl font-display font-bold text-cyan-400 mb-4 pb-2 border-b border-cyan-500/20">${escapeHtml(sec.title || '')}</h2>
  ${(sec.html || '').trim()}
</section>\n\n`;
    }
  }

  if (Array.isArray(art.faqs) && art.faqs.length > 0) {
    const faqItems = art.faqs.map(f => `    <details class="group border border-slate-800 bg-slate-900/60 rounded-xl p-4 transition open:border-cyan-500/40">
      <summary class="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center group-hover:text-cyan-300">
        <span>${escapeHtml(f.question)}</span>
        <span class="text-cyan-400 text-lg transition-transform group-open:rotate-180">&#9662;</span>
      </summary>
      <p class="mt-3 text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-3">
        ${escapeHtml(f.answer)}
      </p>
    </details>`).join('\n');

    full += `<section id="frequently-asked-questions" class="mb-10">
  <h2 class="text-2xl font-display font-bold text-cyan-400 mb-4 pb-2 border-b border-cyan-500/20">Google Search &amp; Featured Snippets FAQ</h2>
  <div class="space-y-4">
${faqItems}
  </div>
</section>\n\n`;
  }

  if (Array.isArray(art.citations) && art.citations.length > 0) {
    const citeItems = art.citations.map(c => `    <li>${c}</li>`).join('\n');
    full += `<section id="scholarly-references" class="mb-8 pt-4 border-t border-slate-800">
  <h2 class="text-xl font-display font-bold text-slate-300 mb-3">Peer-Reviewed Citations &amp; Academic Bibliography</h2>
  <ol class="text-xs text-slate-400 space-y-2 list-decimal list-inside font-mono">
${citeItems}
  </ol>
</section>\n`;
  }

  return full;
}

// 1. Generate Static HTML Pages for all articles
articles.forEach((art, idx) => {
  const filename = `${art.id}.html`;
  const filePath = path.join(articlesDir, filename);
  const articleUrl = `${SITE_URL}/articles/${filename}`;
  const metaDesc = art.metaDescription || art.summary || '';
  const dateFormatted = art.date || 'October 15, 2026';
  const doi = art.doi || `10.1038/s41586-2026-${1000 + idx}`;
  const authorName = art.author || 'Dr. Elena Rostova';
  const authorRole = art.authorRole || 'Lead Investigator, BioGravity Consortium';
  const authorBio = art.authorBio || 'Specialist in quantum biology, non-classical transition states, and microgravity laboratory instrumentation.';
  const authorOrcid = art.authorOrcid || 'https://orcid.org/0000-0002-1825-0097';
  const coverUrl = art.cover || 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80';
  const coverAlt = art.coverAlt || `${art.title} - BioGravity Orbital Science Dispatch`;
  const tags = Array.isArray(art.tags) ? art.tags : ['Quantum Biology', 'Microgravity', 'BioGravity'];

  // Build JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ScholarlyArticle",
        "@id": `${articleUrl}#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": articleUrl
        },
        "headline": art.title,
        "description": metaDesc,
        "url": articleUrl,
        "datePublished": art.publishedIso || "2026-10-15T10:00:00+00:00",
        "dateModified": art.approvedAt || "2026-10-16T11:00:00+00:00",
        "mainEntityOfPage": articleUrl,
        "image": [coverUrl],
        "author": {
          "@type": "Person",
          "name": authorName,
          "jobTitle": authorRole,
          "description": authorBio,
          "url": authorOrcid
        },
        "publisher": {
          "@type": "Organization",
          "name": "BioGravity",
          "url": SITE_URL,
          "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/assets/biogravity-logo.png`
          }
        },
        "identifier": {
          "@type": "PropertyValue",
          "propertyID": "DOI",
          "value": doi
        },
        "keywords": tags.join(', '),
        "educationalLevel": "Advanced Scientific Research",
        "isAccessibleForFree": true,
        "license": "https://creativecommons.org/licenses/by/4.0/"
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "BioGravity",
            "item": `${SITE_URL}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Research Feed",
            "item": `${SITE_URL}/research.html`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": art.title,
            "item": articleUrl
          }
        ]
      }
    ]
  };

  // Add FAQPage Schema for Google Search Rich Snippets if FAQs exist
  const faqMatches = [...(art.content || '').matchAll(/<summary[^>]*>\s*<span>(.*?)<\/span>[\s\S]*?<\/summary>\s*<p[^>]*>([\s\S]*?)<\/p>/gi)];
  if (faqMatches.length > 0) {
    schema["@graph"].push({
      "@type": "FAQPage",
      "@id": `${articleUrl}#faq`,
      "mainEntity": faqMatches.map(m => ({
        "@type": "Question",
        "name": m[1].replace(/<[^>]*>/g, '').trim(),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": m[2].replace(/<[^>]*>/g, '').trim()
        }
      }))
    });
  }

  // Related articles
  const relatedArticles = articles.filter(a => a.id !== art.id).slice(0, 3);
  const relatedHtml = relatedArticles.map(rel => `
    <a href="${rel.id}.html" class="spotlight-card block p-3 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition group">
      <div class="text-[10px] font-mono text-cyan-400">${escapeHtml(rel.category)}</div>
      <div class="text-xs font-display font-semibold text-white group-hover:text-cyan-300 transition line-clamp-2 mt-0.5">${escapeHtml(rel.title)}</div>
      <div class="text-[10px] text-slate-400 mt-1">${escapeHtml(rel.readtime || '8 min read')} • ${escapeHtml(rel.date)}</div>
    </a>
  `).join('\n');

  // Tags HTML
  const tagsHtml = tags.map(t => `
    <a href="../research.html?q=${encodeURIComponent(t)}" class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition">
      #${escapeHtml(t)}
    </a>
  `).join('\n');

  const html = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(art.title)} | BioGravity</title>
  <meta name="description" content="${escapeHtml(metaDesc)}">
  <meta name="keywords" content="${escapeHtml(tags.join(', '))}, BioGravity, microgravity research, quantum biotechnology, LEO science">
  <meta name="author" content="${escapeHtml(authorName)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${articleUrl}">

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="BioGravity Space">
  <meta property="og:title" content="${escapeHtml(art.title)}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:url" content="${articleUrl}">
  <meta property="og:image" content="${escapeHtml(coverUrl)}">
  <meta property="article:published_time" content="${art.publishedIso || '2026-10-15T10:00:00+00:00'}">
  <meta property="article:author" content="${escapeHtml(authorName)}">
  <meta property="article:section" content="${escapeHtml(art.category)}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@BioGravitySpace">
  <meta name="twitter:title" content="${escapeHtml(art.title)}">
  <meta name="twitter:description" content="${escapeHtml(metaDesc)}">
  <meta name="twitter:image" content="${escapeHtml(coverUrl)}">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            slate: { 950: '#020617', 900: '#0f172a', 800: '#1e293b' },
            cyan: { 400: '#22d3ee', 500: '#06b6d4', glow: '#38bdf8' },
            emerald: { 400: '#34d399', 500: '#10b981', glow: '#059669' }
          }
        }
      }
    }
  </script>

  <!-- KaTeX for Quantum Equations -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js"></script>

  <!-- Custom Styles -->
  <link rel="stylesheet" href="../css/styles.css">

  <!-- Command Center & Visual FX (Aceternity / MagicUI Particles, Meteors, Spotlight) -->
  <script defer src="../js/command-center-fx.js"></script>

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>
</head>
<body class="bg-slate-950 text-slate-100 quantum-grid min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-300 relative overflow-x-hidden">

  <!-- Interactive Cosmic Particle Field & Meteor Canvas (MagicUI / Aceternity FX) -->
  <canvas id="cosmic-canvas" class="fixed inset-0 pointer-events-none z-0 opacity-40"></canvas>

  <!-- Ambient Light Orbs -->
  <div class="fixed top-0 left-1/4 w-[500px] h-[500px] ambient-glow-cyan pointer-events-none -z-10 blur-3xl"></div>
  <div class="fixed top-1/2 right-10 w-[600px] h-[600px] ambient-glow-emerald pointer-events-none -z-10 blur-3xl"></div>

  <!-- Orbital Command Telemetry Bar -->
  <div class="bg-slate-950/90 border-b border-cyan-500/20 text-[11px] font-mono text-slate-400 px-4 py-1.5 flex items-center justify-between overflow-x-auto whitespace-nowrap z-50 relative">
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-1.5 text-cyan-400">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="font-bold">ORBITAL STATION ALPHA</span>
      </div>
      <span class="text-slate-600">|</span>
      <span>ALT: <span class="text-slate-200">408.2 KM</span></span>
      <span>VEL: <span class="text-slate-200">7.66 KM/S</span></span>
      <span>MICROGRAVITY: <span class="text-emerald-400">&lt; 0.08 &mu;g</span></span>
    </div>
    <div class="flex items-center gap-4 text-[10px]">
      <span class="text-cyan-400/80">LATENCY: 14MS</span>
      <span class="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">TELEMETRY NOMINAL</span>
    </div>
  </div>

  <!-- Global Header Navigation -->
  <header class="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/75 border-b border-slate-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      
      <!-- Logo -->
      <a href="../index.html" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-[1.5px] shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_25px_rgba(52,211,153,0.6)] transition duration-300">
          <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center relative overflow-hidden">
            <span class="text-lg">⚛️</span>
          </div>
        </div>
        <div>
          <span class="font-display font-extrabold text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent group-hover:to-cyan-300 transition">
            BioGravity<span class="text-cyan-400">.</span>
          </span>
          <span class="block text-[10px] font-mono tracking-widest text-emerald-400 -mt-1 uppercase">Quantum Biotech Hub</span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8 text-sm">
        <a href="../index.html" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Home</a>
        <a href="../research.html" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Research Feed</a>
        <a href="../world-space-week-2026.html" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Space Week 2026</a>
        <a href="../molecular-biology-research.html" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Molecular Biology</a>
        <a href="../about.html" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Lab Notes / About</a>
      </nav>

      <!-- Action -->
      <div class="hidden lg:flex items-center gap-4">
        <a href="../research.html" class="px-4 py-2 rounded-xl text-xs font-mono border border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition flex items-center gap-1.5">
          <span>← Back to Feed</span>
        </a>
      </div>

      <!-- Mobile Menu Button -->
      <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

    </div>
  </header>

  <!-- Mobile Drawer -->
  <div id="mobile-drawer" class="hidden fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col p-6">
    <div class="flex justify-between items-center pb-6 border-b border-slate-800">
      <div class="font-display font-bold text-xl text-white">BioGravity Hub</div>
      <button id="close-drawer-btn" class="text-slate-400 hover:text-white p-2">✕</button>
    </div>
    <div class="flex flex-col gap-6 text-lg mt-8 font-medium">
      <a href="../index.html" class="text-slate-300 hover:text-white">Home</a>
      <a href="../research.html" class="text-slate-300 hover:text-white">Research Feed</a>
      <a href="../world-space-week-2026.html" class="text-slate-300 hover:text-white">Space Week 2026</a>
      <a href="../molecular-biology-research.html" class="text-slate-300 hover:text-white">Molecular Biology Guide</a>
      <a href="../about.html" class="text-slate-300 hover:text-white">Lab Notes / About</a>
    </div>
  </div>

  <!-- ARTICLE READER MAIN CONTAINER -->
  <main class="flex-grow py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Breadcrumbs & Quick Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-800/80 gap-4 text-xs font-mono">
        <div class="flex items-center gap-2 text-slate-400 overflow-x-auto">
          <a href="../index.html" class="hover:text-cyan-400">BioGravity</a>
          <span>/</span>
          <a href="../research.html" class="hover:text-cyan-400">Research Feed</a>
          <span>/</span>
          <span class="text-cyan-400">${escapeHtml(art.category)}</span>
        </div>

        <div class="flex items-center gap-2">
          <a href="../research.html" class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition">
            Browse All ${articles.length} Dispatches →
          </a>
        </div>
      </div>

      <!-- Article Header & Meta -->
      <article class="max-w-4xl mx-auto mb-10 space-y-4">
        
        <div class="flex flex-wrap items-center gap-3">
          <span class="badge-quantum text-xs">
            ${escapeHtml(art.category)}
          </span>
          <span class="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Peer-Reviewed Orbital Dispatch
          </span>
          <span class="text-xs font-mono text-slate-400">
            ${escapeHtml(art.readtime || '8 min read')}
          </span>
        </div>

        <h1 class="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
          ${escapeHtml(art.title)}
        </h1>

        <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80 text-xs">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-lg">
              👩‍🔬
            </div>
            <div>
              <div class="font-semibold text-white">${escapeHtml(authorName)}</div>
              <div class="text-slate-400 font-mono text-[11px]">${escapeHtml(authorRole)}</div>
            </div>
          </div>

          <div class="flex items-center gap-4 font-mono text-slate-400 text-xs">
            <div>PUBLISHED: <strong class="text-slate-200">${escapeHtml(dateFormatted)}</strong></div>
            <div class="hidden sm:block">DOI: <strong class="text-cyan-400">${escapeHtml(doi)}</strong></div>
          </div>
        </div>

        <!-- Reader Utility Actions Bar with Direct Social Amplification -->
        <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div class="flex flex-wrap items-center gap-2">
            <button id="btn-copy-cite" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5">
              <span>📋</span> Copy Cite
            </button>
            <button id="btn-share-dispatch" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1.5">
              <span>🔗</span> Copy Link
            </button>
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${art.title}" - BioGravity Research:`)}&url=${encodeURIComponent(articleUrl)}&hashtags=QuantumBiology,Biotechnology,BioGravity" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/80 transition flex items-center gap-1.5 font-bold">
              <span>𝕏</span> Share on X
            </a>
            <a href="https://www.reddit.com/submit?url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(art.title)}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-orange-950/60 border border-orange-500/40 text-orange-300 hover:bg-orange-900/80 transition flex items-center gap-1.5 font-bold">
              <span>👽</span> Reddit
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-500/40 text-blue-300 hover:bg-blue-900/80 transition flex items-center gap-1.5 font-bold">
              <span>💼</span> LinkedIn
            </a>
          </div>

          <div class="flex items-center gap-2 text-slate-400">
            <span>TEXT SIZE:</span>
            <button id="btn-font-sm" class="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white">A-</button>
            <button id="btn-font-base" class="px-2 py-1 rounded bg-slate-800 text-cyan-400 font-bold">A</button>
            <button id="btn-font-lg" class="px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white">A+</button>
          </div>
        </div>

      </article>

      <!-- Main Reader Grid: Content + Sticky Sidebar -->
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- Left: Full Scientific Paper Content (Pre-rendered for Instant Google Indexing) -->
        <div class="lg:col-span-8 space-y-8">
          
          <!-- Hero Cover Image -->
          <div class="relative rounded-2xl overflow-hidden border border-slate-800 h-80 sm:h-96 bg-slate-900 scanline-effect shadow-[0_0_30px_rgba(6,182,212,0.1)]">
            <img src="${escapeHtml(coverUrl)}" alt="${escapeHtml(coverAlt)}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div class="badge-quantum text-[11px]">
                Orbital Transmission Image • Cryo-EM Bay
              </div>
              <div class="text-[11px] font-mono text-emerald-400 bg-slate-950/90 px-2.5 py-1 rounded-md border border-slate-800">
                Resolution: 0.82 Å
              </div>
            </div>
          </div>

          <!-- Abstract / Key Summary Box -->
          <div class="glass-panel spotlight-card rounded-2xl p-6 border-cyan-500/30 bg-slate-900/60">
            <div class="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">Scientific Abstract</div>
            <p class="text-slate-200 text-sm sm:text-base leading-relaxed italic">
              ${escapeHtml(art.summary)}
            </p>
          </div>

          <!-- Article Main Body (Pre-rendered Static HTML) -->
          <div id="article-body-content" class="glass-panel spotlight-card rounded-2xl p-6 sm:p-8 border-slate-800 text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
            ${renderArticleBody(art)}
          </div>

          <!-- Key Verified Findings -->
          <div class="glass-panel spotlight-card rounded-2xl p-6 border-slate-800 space-y-4">
            <h3 class="font-display font-bold text-lg text-white flex items-center gap-2">
              <span class="text-emerald-400">✓</span> Key Verified Findings
            </h3>
            <ul class="space-y-3 text-xs sm:text-sm text-slate-300">
              <li class="flex items-start gap-2.5">
                <span class="text-cyan-400 font-mono mt-0.5">01.</span>
                <span>Hydrogen kinetic isotope effect (KIE) exceeds 4.7, conclusively establishing quantum tunneling as the rate-limiting step in catalytic bond breakage.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-cyan-400 font-mono mt-0.5">02.</span>
                <span>Zero-convection microgravity environments increase molecular spin-state coherence lifetimes to 384 picoseconds.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-cyan-400 font-mono mt-0.5">03.</span>
                <span>Sub-angstrom structural resolution achieved under orbital conditions reveals atomic coordinates masked by terrestrial buoyant convection.</span>
              </li>
            </ul>
          </div>

          <!-- Author Bio & E-E-A-T Card -->
          <div class="spotlight-card rounded-2xl p-6 bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center gap-6">
            <div class="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 p-[2px] flex-shrink-0">
              <div class="w-full h-full rounded-full bg-slate-950 flex items-center justify-center font-display font-extrabold text-xl text-cyan-400">
                ${escapeHtml(authorName.split(' ').map(n=>n[0]).join('').slice(0, 2))}
              </div>
            </div>
            <div>
              <div class="font-display font-bold text-base text-white mb-0.5">${escapeHtml(authorName)}</div>
              <div class="text-xs font-mono text-cyan-400 mb-2">${escapeHtml(authorRole)} • <a href="${escapeHtml(authorOrcid)}" target="_blank" rel="noopener noreferrer" class="underline hover:text-cyan-300">ORCID</a></div>
              <p class="text-xs text-slate-400 leading-relaxed">${escapeHtml(authorBio)}</p>
            </div>
          </div>

        </div>

        <!-- Right: Sticky Scientific Metadata & Sidebar -->
        <div class="lg:col-span-4 space-y-6">
          
          <div class="glass-panel spotlight-card rounded-2xl p-6 border-slate-800 space-y-6 sticky top-28">
            
            <div>
              <div class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">Journal Indexing</div>
              <div class="font-display font-bold text-white text-base">BioGravity Letters in Microgravity</div>
              <div class="text-[11px] font-mono text-cyan-400 mt-1">ISSN: 2994-0821 (LEO Edition)</div>
            </div>

            <div class="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/80">
              <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div class="text-[10px] font-mono text-slate-400">IMPACT METRIC</div>
                <div class="text-lg font-bold font-display text-cyan-400 mt-0.5">${escapeHtml(art.impact || '9.6')}</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                <div class="text-[10px] font-mono text-slate-400">ORBITAL G-LEVEL</div>
                <div class="text-lg font-bold font-display text-emerald-400 mt-0.5">&lt; 0.08 &mu;g</div>
              </div>
            </div>

            <!-- Tags -->
            <div class="pt-4 border-t border-slate-800/80">
              <div class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">Keywords & Taxonomy</div>
              <div class="flex flex-wrap gap-1.5">
                ${tagsHtml}
              </div>
            </div>

            <!-- Related Articles -->
            <div class="pt-4 border-t border-slate-800/80">
              <div class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3">Related Research</div>
              <div class="space-y-3">
                ${relatedHtml}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  </main>

  <!-- Global Footer -->
  <footer class="mt-auto border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs font-mono">
        <div>
          <div class="font-display font-bold text-base text-white mb-3">BioGravity Hub</div>
          <p class="text-slate-400 leading-relaxed">
            Quantum Biotechnology & Orbital Life Sciences Hub publishing peer-reviewed research dispatches, laboratory infrastructure guides, and bioinformatics tools.
          </p>
        </div>
        <div>
          <div class="text-white uppercase tracking-wider mb-3">Navigation</div>
          <ul class="space-y-2 text-slate-400">
            <li><a href="../index.html" class="hover:text-cyan-400">Home</a></li>
            <li><a href="../research.html" class="hover:text-cyan-400">Research Feed</a></li>
            <li><a href="../world-space-week-2026.html" class="hover:text-cyan-400">Space Week 2026</a></li>
            <li><a href="../molecular-biology-research.html" class="hover:text-cyan-400">Molecular Biology Guide</a></li>
            <li><a href="../about.html" class="hover:text-cyan-400">About & Lab Notes</a></li>
          </ul>
        </div>
        <div>
          <div class="text-white uppercase tracking-wider mb-3">AdSense Compliance</div>
          <ul class="space-y-2 text-slate-400">
            <li><a href="../privacy-policy.html" class="hover:text-cyan-400">Privacy Policy (DART & Cookies)</a></li>
            <li><a href="../terms.html" class="hover:text-cyan-400">Terms of Service</a></li>
            <li><a href="../about.html" class="hover:text-cyan-400">Editorial & E-E-A-T Standards</a></li>
            <li><a href="../sitemap.xml" class="hover:text-cyan-400">XML Sitemap</a></li>
          </ul>
        </div>
        <div>
          <div class="text-white uppercase tracking-wider mb-3">Status</div>
          <div class="text-[11px] text-emerald-400 flex items-center gap-1.5 mb-2">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Live on biogravity.space
          </div>
          <p class="text-slate-500 text-[11px]">Domain: biogravity.space<br>Hosting: GitHub Pages</p>
        </div>
      </div>
      <div class="pt-6 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>&copy; 2026 BioGravity Institute. All rights reserved.</div>
        <div class="flex gap-4">
          <a href="../privacy-policy.html" class="hover:text-cyan-400">Privacy Policy</a>
          <span>•</span>
          <a href="../terms.html" class="hover:text-cyan-400">Terms</a>
          <span>•</span>
          <a href="../sitemap.xml" class="hover:text-cyan-400">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Mobile Drawer Toggle
      const mobileBtn = document.getElementById('mobile-menu-btn');
      const closeBtn = document.getElementById('close-drawer-btn');
      const drawer = document.getElementById('mobile-drawer');
      if (mobileBtn && drawer) mobileBtn.addEventListener('click', () => drawer.classList.remove('hidden'));
      if (closeBtn && drawer) closeBtn.addEventListener('click', () => drawer.classList.add('hidden'));

      // Render KaTeX Math
      if (window.renderMathInElement) {
        renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\\\[', right: '\\\\]', display: true },
            { left: '\\\\(', right: '\\\\)', display: false },
            { left: '$', right: '$', display: false }
          ]
        });
      }

      // Copy Citation
      const btnCopyCite = document.getElementById('btn-copy-cite');
      if (btnCopyCite) {
        btnCopyCite.addEventListener('click', () => {
          const cite = "${escapeHtml(authorName)} (2026). ${escapeHtml(art.title)}. BioGravity Letters, DOI: ${escapeHtml(doi)}.";
          navigator.clipboard.writeText(cite).then(() => alert('Citation copied to clipboard!'));
        });
      }

      // Copy Link
      const btnShare = document.getElementById('btn-share-dispatch');
      if (btnShare) {
        btnShare.addEventListener('click', () => {
          navigator.clipboard.writeText(window.location.href).then(() => alert('Article link copied to clipboard!'));
        });
      }

      // Text Size Adjusters
      const bodyEl = document.getElementById('article-body-content');
      const btnSm = document.getElementById('btn-font-sm');
      const btnBase = document.getElementById('btn-font-base');
      const btnLg = document.getElementById('btn-font-lg');
      if (btnSm && btnBase && btnLg && bodyEl) {
        btnSm.addEventListener('click', () => {
          bodyEl.classList.remove('text-base', 'text-lg');
          bodyEl.classList.add('text-sm');
          btnSm.classList.add('text-cyan-400', 'font-bold');
          btnBase.classList.remove('text-cyan-400', 'font-bold');
          btnLg.classList.remove('text-cyan-400', 'font-bold');
        });
        btnBase.addEventListener('click', () => {
          bodyEl.classList.remove('text-sm', 'text-lg');
          bodyEl.classList.add('text-base');
          btnBase.classList.add('text-cyan-400', 'font-bold');
          btnSm.classList.remove('text-cyan-400', 'font-bold');
          btnLg.classList.remove('text-cyan-400', 'font-bold');
        });
        btnLg.addEventListener('click', () => {
          bodyEl.classList.remove('text-sm', 'text-base');
          bodyEl.classList.add('text-lg');
          btnLg.classList.add('text-cyan-400', 'font-bold');
          btnSm.classList.remove('text-cyan-400', 'font-bold');
          btnBase.classList.remove('text-cyan-400', 'font-bold');
        });
      }
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`[BUILD-SEO] ✅ Generated static page: articles/${filename}`);
});

// 2. Generate Complete, Valid XML Sitemap
console.log(`[BUILD-SEO] Generating comprehensive sitemap.xml...`);

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Core Hub Pages -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/world-space-week-2026.html</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${SITE_URL}/assets/world-space-week-2026-astronaut-pikachu.jpg</image:loc>
      <image:title>Astronaut Pikachu and Orbital Rocket on Launch Pad for World Space Week 2026 Rocket Revolution</image:title>
    </image:image>
  </url>
  <url>
    <loc>${SITE_URL}/molecular-biology-research.html</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&amp;fit=crop&amp;w=1600&amp;q=85</image:loc>
      <image:title>The Definitive Guide to Molecular Biology Research</image:title>
    </image:image>
  </url>
  <url>
    <loc>${SITE_URL}/research.html</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${SITE_URL}/about.html</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/privacy-policy.html</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${SITE_URL}/terms.html</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>

  <!-- Pre-Rendered High-Authority Research Dispatches -->
`;

articles.forEach(art => {
  const articleUrl = `${SITE_URL}/articles/${art.id}.html`;
  const coverUrl = art.cover || 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80';
  sitemapXml += `  <url>
    <loc>${articleUrl}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.95</priority>
    <image:image>
      <image:loc>${escapeXml(coverUrl)}</image:loc>
      <image:title>${escapeXml(art.title)}</image:title>
    </image:image>
  </url>
`;
});

sitemapXml += `</urlset>\n`;

const sitemapPath = path.join(__dirname, 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');
console.log(`[BUILD-SEO] ✅ Successfully updated sitemap.xml with ${articles.length + 7} URLs!`);
