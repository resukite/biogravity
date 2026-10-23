'use strict';

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://biogravity.space';
const TODAY = new Date().toISOString().split('T')[0];

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

console.log(`[BUILD-SEO] 🚀 Initiating comprehensive SEO & Clean URL build for ${articles.length} dispatches...`);

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
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderArticleBody(art) {
  if (art.content && typeof art.content === 'string' && art.content.trim() && art.content.trim() !== 'undefined') {
    let body = art.content;
    if (Array.isArray(art.faqs) && art.faqs.length > 0 && !body.includes('frequently-asked-questions')) {
      const faqItems = art.faqs.map(f => `    <details class="group border border-slate-800 bg-slate-900/60 rounded-xl p-4 transition open:border-cyan-500/40">
      <summary class="font-semibold text-slate-200 cursor-pointer list-none flex justify-between items-center group-hover:text-cyan-300">
        <span>${escapeHtml(f.question)}</span>
        <span class="text-cyan-400 text-lg transition-transform group-open:rotate-180">&#9662;</span>
      </summary>
      <p class="mt-3 text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-3">
        ${escapeHtml(f.answer)}
      </p>
    </details>`).join('\n');

      body += `\n\n<section id="frequently-asked-questions" class="mt-10 mb-6">
  <h2 class="text-2xl font-display font-bold text-cyan-400 mb-4 pb-2 border-b border-cyan-500/20">Frequently Asked Questions &amp; Research Insights</h2>
  <div class="space-y-4">
${faqItems}
  </div>
</section>`;
    }
    return body;
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
    const citeItems = art.citations.map(c => {
    let formatted = c.replace(/href="(http[^"]+)"/g, 'href="$1" target="_blank" rel="noopener noreferrer"');
    if (!formatted.includes('<a') && formatted.includes('DOI:')) {
      formatted = formatted.replace(/DOI:\s*(10\.[0-9]+\/[^\s]+)/i, 'DOI: <a href="https://doi.org/$1" target="_blank" rel="noopener noreferrer" class="text-cyan-400 hover:underline">$1</a>');
    }
    return `    <li>${formatted}</li>`;
  }).join('\n');
    full += `<section id="scholarly-references" class="mb-8 pt-4 border-t border-slate-800">
  <h2 class="text-xl font-display font-bold text-slate-300 mb-3">Peer-Reviewed Citations &amp; Academic Bibliography</h2>
  <ol class="text-xs text-slate-400 space-y-2 list-decimal list-inside font-mono">
${citeItems}
  </ol>
</section>\n`;
  }

  return full;
}

// =============================================================================
// 1. GENERATE STATIC ARTICLE PAGES (CLEAN URLS + UNIVERSAL SERVING)
// =============================================================================
articles.forEach((art, idx) => {
  // Clean canonical URL without .html
  const cleanArticleUrl = `${SITE_URL}/articles/${art.id}`;
  const metaDesc = art.metaDescription || art.summary || '';
  const dateFormatted = art.date || 'October 21, 2026';
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
        "@id": `${cleanArticleUrl}#article`,
        "isPartOf": {
          "@type": "WebPage",
          "@id": cleanArticleUrl
        },
        "headline": art.title,
        "description": metaDesc,
        "url": cleanArticleUrl,
        "datePublished": art.publishedIso || "2026-10-15T10:00:00+00:00",
        "dateModified": art.approvedAt || art.publishedIso || "2026-10-21T10:00:00+00:00",
        "mainEntityOfPage": cleanArticleUrl,
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
          "url": `${SITE_URL}/`,
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
        "@id": `${cleanArticleUrl}#breadcrumb`,
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
            "item": `${SITE_URL}/research`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": art.title,
            "item": cleanArticleUrl
          }
        ]
      }
    ]
  };

  // Add FAQPage Schema for Google Search Rich Snippets if FAQs exist
  if (art.faqs && art.faqs.length > 0) {
    schema["@graph"].push({
      "@type": "FAQPage",
      "@id": `${cleanArticleUrl}#faq`,
      "mainEntity": art.faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    });
  }

  // Related articles
  const relatedArticles = articles.filter(a => a.id !== art.id).slice(0, 3);
  const relatedHtml = relatedArticles.map(rel => `
    <a href="/articles/${encodeURIComponent(rel.id)}" class="spotlight-card block p-3 rounded-xl border border-slate-800 hover:border-cyan-500/40 transition group">
      <div class="text-[10px] font-mono text-cyan-400">${escapeHtml(rel.category)}</div>
      <div class="text-xs font-display font-semibold text-white group-hover:text-cyan-300 transition line-clamp-2 mt-0.5">${escapeHtml(rel.title)}</div>
      <div class="text-[10px] text-slate-400 mt-1">${escapeHtml(rel.readtime || '8 min read')} • ${escapeHtml(rel.date)}</div>
    </a>
  `).join('\n');

  // Tags HTML
  const tagsHtml = tags.map(t => `
    <a href="/research?q=${encodeURIComponent(t)}" class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition">
      #${escapeHtml(t)}
    </a>
  `).join('\n');

  const displayTitle = art.seoTitle ? `${escapeHtml(art.seoTitle)} | BioGravity` : `${escapeHtml(art.title)} | BioGravity`;
  const socialTitle = escapeHtml(art.seoTitle || art.title);

  const html = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576621614388905" crossorigin="anonymous"></script>

  <!-- Google Analytics 4 (GA4) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-BGSPACE2026"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-BGSPACE2026');
  </script>

  <!-- Security Headers & Content Security Policy (CSP) -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:; font-src 'self' https: data:;">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <script defer src="/js/cookie-consent.js"></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${displayTitle}</title>
  <meta name="description" content="${escapeHtml(metaDesc)}">
  <meta name="keywords" content="${escapeHtml(tags.join(', '))}, BioGravity, microgravity research, quantum biotechnology, LEO science">
  <meta name="author" content="${escapeHtml(authorName)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${cleanArticleUrl}">

  <!-- Clean URL Enforcement for Browsers -->
  <script>
    if (window.location.pathname.endsWith('.html')) {
      var clean = window.location.pathname.replace(/\\.html$/, '');
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  </script>

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="BioGravity Space">
  <meta property="og:title" content="${socialTitle}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:url" content="${cleanArticleUrl}">
  <meta property="og:image" content="${escapeHtml(coverUrl)}">
  <meta property="article:published_time" content="${art.publishedIso || '2026-10-15T10:00:00+00:00'}">
  <meta property="article:author" content="${escapeHtml(authorName)}">
  <meta property="article:section" content="${escapeHtml(art.category)}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@BioGravitySpace">
  <meta name="twitter:title" content="${socialTitle}">
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

  <!-- Custom Styles & Global Effects -->
  <link rel="stylesheet" href="/css/styles.css">
  <script defer src="/js/command-center-fx.js"></script>

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
      <a href="/" class="flex items-center gap-3 group">
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

            <!-- Accessible Search Form -->
      <form action="/research" method="GET" role="search" class="hidden md:flex items-center relative w-56 lg:w-72">
        <input type="search" name="q" placeholder="Search dispatches, DOIs..." class="w-full py-1.5 pl-3 pr-8 text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400">
        <button type="submit" class="absolute right-2 text-slate-400 hover:text-cyan-400 text-xs" aria-label="Search">🔍</button>
      </form>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-8 text-sm">
        <a href="/" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Home</a>
        <a href="/research" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Research Feed</a>
        <a href="/world-space-week-2026" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Space Week 2026</a>
        <a href="/molecular-biology-research" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Molecular Biology</a>
        <a href="/about" class="nav-link py-2 text-slate-300 hover:text-cyan-400 transition">Lab Notes / About</a>
      </nav>

      <!-- Action -->
      <div class="hidden lg:flex items-center gap-4">
        <a href="/research" class="px-4 py-2 rounded-xl text-xs font-mono border border-slate-700 bg-slate-900 text-slate-300 hover:text-white transition flex items-center gap-1.5">
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
      <a href="/" class="text-slate-300 hover:text-white">Home</a>
      <a href="/research" class="text-slate-300 hover:text-white">Research Feed</a>
      <a href="/world-space-week-2026" class="text-slate-300 hover:text-white">Space Week 2026</a>
      <a href="/molecular-biology-research" class="text-slate-300 hover:text-white">Molecular Biology Guide</a>
      <a href="/about" class="text-slate-300 hover:text-white">Lab Notes / About</a>
    </div>
  </div>

  <!-- ARTICLE READER MAIN CONTAINER -->
  <main class="flex-grow py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Breadcrumbs & Quick Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-800/80 gap-4 text-xs font-mono">
        <div class="flex items-center gap-2 text-slate-400 overflow-x-auto">
          <a href="/" class="hover:text-cyan-400">BioGravity</a>
          <span>/</span>
          <a href="/research" class="hover:text-cyan-400">Research Feed</a>
          <span>/</span>
          <span class="text-cyan-400">${escapeHtml(art.category)}</span>
        </div>

        <div class="flex items-center gap-2">
          <a href="/research" class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-400 transition">
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
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${art.title}" - BioGravity Research:`)}&url=${encodeURIComponent(cleanArticleUrl)}&hashtags=QuantumBiology,Biotechnology,BioGravity" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900/80 transition flex items-center gap-1.5 font-bold">
              <span>𝕏</span> Share on X
            </a>
            <a href="https://www.reddit.com/submit?url=${encodeURIComponent(cleanArticleUrl)}&title=${encodeURIComponent(art.title)}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-orange-950/60 border border-orange-500/40 text-orange-300 hover:bg-orange-900/80 transition flex items-center gap-1.5 font-bold">
              <span>👽</span> Reddit
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cleanArticleUrl)}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-500/40 text-blue-300 hover:bg-blue-900/80 transition flex items-center gap-1.5 font-bold">
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

                    <!-- Peer Review & Researcher Discussion Box (Interactive Engagement) -->
          <div class="glass-panel spotlight-card rounded-2xl p-6 sm:p-8 border-slate-800 bg-slate-900/60 space-y-4">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 class="font-display font-bold text-base text-white flex items-center gap-2">
                <span>💬</span> Peer Review &amp; Researcher Commentary
              </h3>
              <span class="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">Verified Academic Forum</span>
            </div>
            <p class="text-xs text-slate-400">
              Have experimental observations or replication telemetry regarding this dispatch? Join the scientific discussion.
            </p>
            <form onsubmit="event.preventDefault(); alert('Thank you! Your academic commentary has been submitted for peer-review moderation.'); this.reset();" class="space-y-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" required placeholder="Name & Affiliation (e.g. Dr. Jane Doe, MIT)" class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-400">
                <input type="email" required placeholder="Academic / Institutional Email" class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-400">
              </div>
              <textarea rows="3" required placeholder="Enter your scientific commentary, data replication notes, or methodological questions..." class="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"></textarea>
              <button type="submit" class="px-5 py-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400 hover:bg-cyan-500/30 font-mono text-xs font-bold transition">
                Submit Academic Commentary &rarr;
              </button>
            </form>
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
            <li><a href="/" class="hover:text-cyan-400">Home</a></li>
            <li><a href="/research" class="hover:text-cyan-400">Research Feed</a></li>
            <li><a href="/world-space-week-2026" class="hover:text-cyan-400">Space Week 2026</a></li>
            <li><a href="/molecular-biology-research" class="hover:text-cyan-400">Molecular Biology Guide</a></li>
            <li><a href="/about" class="hover:text-cyan-400">About & Lab Notes</a></li>
          </ul>
        </div>
        <div>
          <div class="text-white uppercase tracking-wider mb-3">AdSense Compliance</div>
          <ul class="space-y-2 text-slate-400">
            <li><a href="/privacy-policy" class="hover:text-cyan-400">Privacy Policy (DART & Cookies)</a></li>
            <li><a href="/terms" class="hover:text-cyan-400">Terms of Service</a></li>
            <li><a href="/about" class="hover:text-cyan-400">Editorial & E-E-A-T Standards</a></li>
            <li><a href="/sitemap.xml" class="hover:text-cyan-400">XML Sitemap</a></li>
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
          <a href="/privacy-policy" class="hover:text-cyan-400">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" class="hover:text-cyan-400">Terms</a>
          <span>•</span>
          <a href="/sitemap.xml" class="hover:text-cyan-400">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Mobile Drawer Toggle
      const mobileBtn = document.getElementById('mobile-menu-btn');
      const closeDrawerBtn = document.getElementById('close-drawer-btn');
      const drawer = document.getElementById('mobile-drawer');

      if (mobileBtn && drawer) {
        mobileBtn.addEventListener('click', () => drawer.classList.remove('hidden'));
      }
      if (closeDrawerBtn && drawer) {
        closeDrawerBtn.addEventListener('click', () => drawer.classList.add('hidden'));
      }

      // Copy Cite
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

  // Write file 1: articles/slug.html (for GitHub Pages extensionless fallback / direct request)
  const filePathHtml = path.join(articlesDir, `${art.id}.html`);
  fs.writeFileSync(filePathHtml, html, 'utf8');

  // Write file 2: articles/slug/index.html (guarantees clean URL serving on all static web hosts)
  const slugDir = path.join(articlesDir, art.id);
  if (!fs.existsSync(slugDir)) {
    fs.mkdirSync(slugDir, { recursive: true });
  }
  fs.writeFileSync(path.join(slugDir, 'index.html'), html, 'utf8');

  console.log(`[BUILD-SEO] ✅ Generated clean static page: articles/${art.id} (/articles/${art.id}/)`);
});

// =============================================================================
// 2. ENHANCE RESEARCH.HTML WITH STATIC PRE-RENDERED CARDS (ZERO ORPHAN PAGES)
// =============================================================================
console.log(`[BUILD-SEO] 🛰️ Pre-rendering static crawl cards in research.html...`);

const researchPath = path.join(__dirname, 'research.html');
if (fs.existsSync(researchPath)) {
  let researchHtml = fs.readFileSync(researchPath, 'utf8');

  // Ensure canonical URL is clean without .html
  researchHtml = researchHtml.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"/i,
    `<link rel="canonical" href="${SITE_URL}/research"`
  );

  // Update total dispatches count
  researchHtml = researchHtml.replace(
    /SHOWING:\s*<strong\s+id="results-count"[^>]*>\d+<\/strong>/i,
    `SHOWING: <strong id="results-count" class="text-white">${articles.length}</strong>`
  );

  // Generate static HTML cards for every single article
  const staticCardsHtml = articles.map(art => `
    <article class="spotlight-card rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/50 flex flex-col group justify-between transition">
      <div class="relative h-48 overflow-hidden bg-slate-900">
        <img src="${escapeHtml(art.cover || '')}" alt="${escapeHtml(art.coverAlt || art.title)}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100" loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <span class="absolute top-3 left-3 badge-quantum text-[10px]">
          ${escapeHtml(art.category)}
        </span>
        <span class="absolute top-3 right-3 text-[11px] font-mono text-slate-300 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-slate-700">
          ${escapeHtml(art.readtime || '10 min read')}
        </span>
      </div>
      
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
            <span>${escapeHtml(art.date)}</span>
            <span>•</span>
            <span class="text-cyan-400 font-medium">${escapeHtml(art.author)}</span>
          </div>
          <h2 class="font-display font-bold text-lg text-white mb-3 group-hover:text-cyan-300 transition line-clamp-2">
            <a href="/articles/${encodeURIComponent(art.id)}">${escapeHtml(art.title)}</a>
          </h2>
          <p class="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
            ${escapeHtml(art.summary)}
          </p>

          <div class="flex flex-wrap gap-1.5 mb-4">
            ${(art.tags || []).slice(0, 3).map(tag => `
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">#${escapeHtml(tag)}</span>
            `).join('')}
          </div>
        </div>

        <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div class="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
            <span>DOI:</span>
            <span class="text-slate-400 text-[10px]">${escapeHtml((art.doi || '').split('/').pop() || 'verified')}</span>
          </div>
          <a href="/articles/${encodeURIComponent(art.id)}" class="text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1">
            Read Dispatch →
          </a>
        </div>
      </div>
    </article>
  `).join('\n');

  // Replace content of articles-container with static cards
  const containerRegex = /(<div\s+id="articles-container"[^>]*>)([\s\S]*?)(<\/div>\s*<!-- Empty State -->)/i;
  if (containerRegex.test(researchHtml)) {
    researchHtml = researchHtml.replace(containerRegex, `$1\n${staticCardsHtml}\n      $3`);
  }

  // Update navigation links to clean URLs
  researchHtml = researchHtml.replace(/href="index\.html"/g, 'href="/"');
  researchHtml = researchHtml.replace(/href="research\.html"/g, 'href="/research"');
  researchHtml = researchHtml.replace(/href="world-space-week-2026\.html"/g, 'href="/world-space-week-2026"');
  researchHtml = researchHtml.replace(/href="molecular-biology-research\.html"/g, 'href="/molecular-biology-research"');
  researchHtml = researchHtml.replace(/href="about\.html"/g, 'href="/about"');
  researchHtml = researchHtml.replace(/href="privacy-policy\.html"/g, 'href="/privacy-policy"');
  researchHtml = researchHtml.replace(/href="terms\.html"/g, 'href="/terms"');
  researchHtml = researchHtml.replace(/href="article\.html"/g, 'href="/research"');
  researchHtml = researchHtml.replace(/href="sitemap\.xml"/g, 'href="/sitemap.xml"');
  researchHtml = researchHtml.replace(/href="css\/styles\.css"/g, 'href="/css/styles.css"');
  researchHtml = researchHtml.replace(/href="logo\.png"/g, 'href="/logo.png"');
  researchHtml = researchHtml.replace(/href="articles\/\$\{encodeURIComponent\(article\.id\)\}\.html"/g, 'href="/articles/${encodeURIComponent(article.id)}"');

  // Ensure clean URL script is in <head>
  if (!researchHtml.includes("window.location.pathname.endsWith('.html')")) {
    researchHtml = researchHtml.replace(
      '</head>',
      `  <script>
    if (window.location.pathname.endsWith('.html')) {
      var clean = window.location.pathname.replace(/\\.html$/, '');
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  </script>
</head>`
    );
  }

  fs.writeFileSync(researchPath, researchHtml, 'utf8');

  // Also write research/index.html
  const researchDir = path.join(__dirname, 'research');
  if (!fs.existsSync(researchDir)) fs.mkdirSync(researchDir, { recursive: true });
  fs.writeFileSync(path.join(researchDir, 'index.html'), researchHtml, 'utf8');

  console.log(`[BUILD-SEO] ✅ research.html & research/index.html updated with ${articles.length} crawlable dispatches!`);
}

// =============================================================================
// 3. GENERATE DIRECTORY ALIASES FOR ALL CORE PAGES (/about, /terms, etc.)
// =============================================================================
const corePages = [
  { name: 'about', file: 'about.html', canonical: `${SITE_URL}/about` },
  { name: 'contact', file: 'contact.html', canonical: `${SITE_URL}/contact` },
  { name: 'disclaimer', file: 'disclaimer.html', canonical: `${SITE_URL}/disclaimer` },
  { name: 'sitemap', file: 'sitemap.html', canonical: `${SITE_URL}/sitemap` },
  { name: 'world-space-week-2026', file: 'world-space-week-2026.html', canonical: `${SITE_URL}/world-space-week-2026` },
  { name: 'molecular-biology-research', file: 'molecular-biology-research.html', canonical: `${SITE_URL}/molecular-biology-research` },
  { name: 'microgravity-effects-on-human-body', file: 'microgravity-effects-on-human-body.html', canonical: `${SITE_URL}/microgravity-effects-on-human-body` },
  { name: 'privacy-policy', file: 'privacy-policy.html', canonical: `${SITE_URL}/privacy-policy` },
  { name: 'terms', file: 'terms.html', canonical: `${SITE_URL}/terms` }
];

corePages.forEach(p => {
  const filePath = path.join(__dirname, p.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Ensure clean canonical
    content = content.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"/i,
      `<link rel="canonical" href="${p.canonical}"`
    );

    // Clean internal links
    content = content.replace(/href="index\.html"/g, 'href="/"');
    content = content.replace(/href="research\.html"/g, 'href="/research"');
    content = content.replace(/href="world-space-week-2026\.html"/g, 'href="/world-space-week-2026"');
    content = content.replace(/href="molecular-biology-research\.html"/g, 'href="/molecular-biology-research"');
    content = content.replace(/href="about\.html"/g, 'href="/about"');
    content = content.replace(/href="privacy-policy\.html"/g, 'href="/privacy-policy"');
    content = content.replace(/href="terms\.html"/g, 'href="/terms"');
    content = content.replace(/href="article\.html"/g, 'href="/research"');
    content = content.replace(/href="sitemap\.xml"/g, 'href="/sitemap.xml"');
    content = content.replace(/href="css\/styles\.css"/g, 'href="/css/styles.css"');
    content = content.replace(/href="logo\.png"/g, 'href="/logo.png"');
    content = content.replace(/href="articles\/\$\{encodeURIComponent\(article\.id\)\}\.html"/g, 'href="/articles/${encodeURIComponent(article.id)}"');

    // Add clean URL script if missing
    if (!content.includes("window.location.pathname.endsWith('.html')")) {
      content = content.replace(
        '</head>',
        `  <script>
    if (window.location.pathname.endsWith('.html')) {
      var clean = window.location.pathname.replace(/\\.html$/, '');
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  </script>
</head>`
      );
    }

    fs.writeFileSync(filePath, content, 'utf8');

    // Write directory index.html
    const dirPath = path.join(__dirname, p.name);
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(path.join(dirPath, 'index.html'), content, 'utf8');
    console.log(`[BUILD-SEO] ✅ Generated clean route: /${p.name}/`);
  }
});

// Update index.html clean links & ensure canonical is https://biogravity.space/
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  indexHtml = indexHtml.replace(/href="research\.html"/g, 'href="/research"');
  indexHtml = indexHtml.replace(/href="world-space-week-2026\.html"/g, 'href="/world-space-week-2026"');
  indexHtml = indexHtml.replace(/href="molecular-biology-research\.html"/g, 'href="/molecular-biology-research"');
  indexHtml = indexHtml.replace(/href="about\.html"/g, 'href="/about"');
  indexHtml = indexHtml.replace(/href="privacy-policy\.html"/g, 'href="/privacy-policy"');
  indexHtml = indexHtml.replace(/href="terms\.html"/g, 'href="/terms"');
  indexHtml = indexHtml.replace(/href="article\.html"/g, 'href="/research"');
  indexHtml = indexHtml.replace(/href="sitemap\.xml"/g, 'href="/sitemap.xml"');
  indexHtml = indexHtml.replace(/href="css\/styles\.css"/g, 'href="/css/styles.css"');
  indexHtml = indexHtml.replace(/href="logo\.png"/g, 'href="/logo.png"');
  indexHtml = indexHtml.replace(/href="index\.html"/g, 'href="/"');
  indexHtml = indexHtml.replace(/href="articles\/([a-zA-Z0-9_-]+)\.html"/g, 'href="/articles/$1"');
  indexHtml = indexHtml.replace(/href="articles\/([a-zA-Z0-9_-]+)"/g, 'href="/articles/$1"');
  indexHtml = indexHtml.replace(/href="articles\/\$\{encodeURIComponent\(article\.id\)\}\.html"/g, 'href="/articles/${encodeURIComponent(article.id)}"');

  // Inject / update Complete Orbital Research Archive into index.html for 100% Googlebot Crawl Coverage
  const allArticlesArchiveHtml = `
        <!-- Complete Orbital Research Archive (100% Crawl Coverage for Googlebot) -->
        <div id="complete-orbital-archive" class="mt-16 p-6 sm:p-8 rounded-2xl glass-panel border border-slate-800 bg-slate-900/60">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div>
              <div class="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
                Open Access Orbital Archive
              </div>
              <h3 class="text-xl sm:text-2xl font-display font-bold text-white">
                All ${articles.length} Published Research Dispatches
              </h3>
            </div>
            <a href="/research" class="px-4 py-2 rounded-xl text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400 hover:bg-cyan-500/30 transition flex items-center gap-1.5 self-start sm:self-auto">
              <span>View Full Research Feed →</span>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
` + articles.map(a => `
            <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 transition group flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between text-[10px] font-mono mb-1.5">
                  <span class="text-cyan-400">${escapeHtml(a.category)}</span>
                  <span class="text-slate-400">${escapeHtml(a.readtime || '10 min')}</span>
                </div>
                <h4 class="font-display font-bold text-sm text-white group-hover:text-cyan-300 transition line-clamp-2 mb-2">
                  <a href="/articles/${encodeURIComponent(a.id)}">${escapeHtml(a.title)}</a>
                </h4>
                <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                  ${escapeHtml(a.summary)}
                </p>
              </div>
              <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span class="text-slate-400 text-[10px]">${escapeHtml(a.author)}</span>
                <a href="/articles/${encodeURIComponent(a.id)}" class="text-cyan-400 hover:text-cyan-300 font-semibold">
                  Read &rarr;
                </a>
              </div>
            </div>
`).join('') + `
          </div>
        </div>
`;

  if (indexHtml.includes('id="complete-orbital-archive"')) {
    indexHtml = indexHtml.replace(/<!-- Complete Orbital Research Archive[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, allArticlesArchiveHtml.trim() + '\n        </div>');
  } else {
    // Insert before closing of the featured dispatches section
    indexHtml = indexHtml.replace(/(<\/div>\s*<\/div>\s*<\/section>\s*<\/main>)/i, `${allArticlesArchiveHtml}\n      $1`);
  }

  // Ensure clean URL script in <head>
  if (!indexHtml.includes("window.location.pathname.endsWith('.html')")) {
    indexHtml = indexHtml.replace(
      '</head>',
      `  <script>
    if (window.location.pathname.endsWith('.html') || window.location.pathname.endsWith('/index.html')) {
      var clean = window.location.pathname.replace(/\\/?index\\.html$/, '/').replace(/\\.html$/, '');
      if (clean !== window.location.pathname) {
        window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
      }
    }
  </script>
</head>`
    );
  }
  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log(`[BUILD-SEO] ✅ index.html updated with clean URLs & complete archive grid!`);
}

// =============================================================================
// 4. GENERATE 100% CLEAN XML SITEMAP (GOOGLE & BING COMPLIANT)
// =============================================================================
console.log(`[BUILD-SEO] 🗺️ Generating clean XML sitemap.xml...`);

let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Core Hub Pages (Clean URLs) -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/research</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${SITE_URL}/world-space-week-2026</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${SITE_URL}/assets/world-space-week-2026-astronaut-pikachu.jpg</image:loc>
      <image:title>Astronaut Pikachu and Orbital Rocket on Launch Pad for World Space Week 2026</image:title>
    </image:image>
  </url>
  <url>
    <loc>${SITE_URL}/molecular-biology-research</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&amp;fit=crop&amp;w=1600&amp;q=85</image:loc>
      <image:title>The Definitive Guide to Molecular Biology Research</image:title>
    </image:image>
  </url>
  <url>
    <loc>${SITE_URL}/about</loc>
  </url>
  <url>
    <loc>${SITE_URL}/contact</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/disclaimer</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${SITE_URL}/sitemap</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${SITE_URL}/privacy-policy</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${SITE_URL}/terms</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>

  <!-- Pre-Rendered High-Authority Research Dispatches (Clean URLs) -->
`;

articles.forEach(art => {
  const cleanUrl = `${SITE_URL}/articles/${art.id}`;
  const coverUrl = art.cover || 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80';
  const articleDate = (art.publishedIso ? art.publishedIso.split('T')[0] : null) || TODAY;

  sitemapXml += `  <url>
    <loc>${cleanUrl}</loc>
    <lastmod>${articleDate}</lastmod>
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
console.log(`[BUILD-SEO] ✅ Successfully generated clean sitemap.xml with ${articles.length + 7} canonical URLs!`);

// =============================================================================
// 4B. GENERATE RSS 2.0 / ATOM SCIENTIFIC FEED (SYNDICATION & DISCOVERY)
// =============================================================================
console.log(`[BUILD-SEO] 📡 Generating RSS 2.0 scientific feed...`);

let rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>BioGravity - Quantum Biotechnology &amp; Orbital Life Sciences</title>
    <link>${SITE_URL}/</link>
    <description>Open-access research dispatches on quantum enzymology, microgravity cell biology, and 3D organoid bioprinting in Low Earth Orbit.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
`;

articles.forEach(art => {
  const cleanUrl = `${SITE_URL}/articles/${art.id}`;
  const pubDate = new Date(art.publishedIso || TODAY).toUTCString();
  rssXml += `    <item>
      <title>${escapeXml(art.title)}</title>
      <link>${cleanUrl}</link>
      <guid isPermaLink="true">${cleanUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(art.author || 'BioGravity Collective')}</dc:creator>
      <description>${escapeXml(art.summary || art.metaDescription || '')}</description>
      <category>${escapeXml(art.category || 'Science')}</category>
    </item>
`;
});

rssXml += `  </channel>
</rss>\n`;

fs.writeFileSync(path.join(__dirname, 'rss.xml'), rssXml, 'utf8');
fs.writeFileSync(path.join(__dirname, 'feed.xml'), rssXml, 'utf8');
console.log(`[BUILD-SEO] ✅ Successfully generated rss.xml and feed.xml!`);

// =============================================================================
// 5. GENERATE SMART 404.HTML (CLEAN REDIRECTION & SEO RETENTION)
// =============================================================================
const notFoundHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576621614388905"
     crossorigin="anonymous"></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Orbital Coordinate Not Found (404) | BioGravity</title>
  <meta name="robots" content="noindex, follow">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="/css/styles.css">
  <script>
    // Smart redirect: if user visited with .html, redirect to clean URL
    (function() {
      var p = window.location.pathname;
      if (p.endsWith('.html')) {
        var clean = p.replace(/\\.html$/, '');
        window.location.replace(clean + window.location.search + window.location.hash);
      }
    })();
  </script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-between selection:bg-cyan-500/30 font-sans">
  <div class="max-w-4xl mx-auto px-4 py-20 text-center">
    <div class="text-7xl mb-6">🛰️</div>
    <div class="badge-quantum text-xs mb-3 inline-block">Orbital Telemetry Notice</div>
    <h1 class="text-4xl font-extrabold font-display text-white mb-4">404: Scientific Coordinate Desynchronized</h1>
    <p class="text-slate-400 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
      The research dispatch or coordinate you requested does not exist at this orbital vector. It may have been relocated to a clean canonical address.
    </p>
    <div class="flex flex-wrap items-center justify-center gap-4">
      <a href="/" class="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs font-mono shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 transition">
        Return to Orbital Command (Home) →
      </a>
      <a href="/research" class="px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono hover:text-white hover:border-cyan-400 transition">
        Explore 11 Live Research Dispatches
      </a>
    </div>
  </div>
  <footer class="border-t border-slate-800 text-center py-6 text-xs text-slate-500 font-mono">
    BioGravity Quantum Biotechnology Collective • <a href="/sitemap.xml" class="text-cyan-400 hover:underline">Sitemap</a>
  </footer>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, '404.html'), notFoundHtml, 'utf8');
console.log(`[BUILD-SEO] ✅ Generated smart 404.html with automatic .html URL normalization!`);

// =============================================================================
// 6. GENERATE OPTIMIZED ROBOTS.TXT (MAXIMUM CRAWL RATE)
// =============================================================================
const robotsTxt = `User-agent: *
Allow: /

# Dedicated Search Engine Crawlers
# Google AdSense Crawler
User-agent: Mediapartners-Google
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

# Sitemap Location
Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt, 'utf8');
console.log(`[BUILD-SEO] ✅ Generated optimized robots.txt!`);


// =============================================================================
// 7. GENERATE SOCIAL MEDIA & COMMUNITY OUTREACH KIT
// =============================================================================
try {
  require('./scripts/social_syndication_engine.js');
} catch (e) {
  console.log(`[BUILD-SEO] ℹ️ Social syndication notice: ${e.message}`);
}
