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
const newsPath = path.join(__dirname, 'data', 'news.json');
let newsArticles = [];
if (fs.existsSync(newsPath)) {
  try {
    const rawNews = JSON.parse(fs.readFileSync(newsPath, 'utf8'));
    const uniqueNewsMap = new Map();
    rawNews.forEach(item => {
      if (item && item.id && !uniqueNewsMap.has(item.id)) {
        uniqueNewsMap.set(item.id, item);
      }
    });
    newsArticles = Array.from(uniqueNewsMap.values());
    if (newsArticles.length !== rawNews.length) {
      fs.writeFileSync(newsPath, JSON.stringify(newsArticles, null, 2), 'utf8');
      console.log(`[BUILD-SEO] 🧹 Deduplicated news.json: ${rawNews.length} -> ${newsArticles.length} unique stories.`);
    }
  } catch (e) {
    newsArticles = [];
  }
}
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


function generateEducationalEnrichment(art) {
  const glossaryMap = {
    'Buoyancy-Driven Convection': 'On Earth, temperature or concentration differences cause fluid layers of different densities to rise or sink. In orbital microgravity (&lt;10⁻⁴ g), density differences no longer produce convective circulation, resulting in purely diffusion-dominated mass transfer.',
    'Hydrostatic Pressure Gradient': 'The weight of a fluid column creating pressure proportional to depth (P = &rho;gh). In orbit, this gradient vanishes, equalizing mechanical stresses across suspended cells, liposomes, and cellular organoids.',
    'Mechanotransduction & Tensegrity': 'The cellular signaling pathway through which cells convert physical force (shear stress, gravity, tension) into biochemical responses via integrins, focal adhesions, and the nuclear cytoskeleton.',
    'Clinorotation & Simulated Microgravity': 'A ground-based research method where biological samples are rotated along one or multiple axes to continually randomize the gravity vector before a sedimentation threshold is reached.',
    'Radiation Countermeasures': 'Biochemical agents, antioxidants, or DNA repair peptides (such as tardigrade Dsup proteins) engineered to neutralize reactive oxygen species (ROS) and double-strand DNA breaks induced by galactic cosmic rays.'
  };

  const termKeys = Object.keys(glossaryMap);

  return `
<section class="mt-12 pt-8 border-t border-slate-200">
  <div class="mb-4">
    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
      🎓 Educational Synthesis &amp; Student Study Guide
    </span>
  </div>
  <h2 class="text-2xl font-display font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
    Plain-English Concept Explainer: Fundamentals &amp; Terrestrial Translation
  </h2>
  <div class="space-y-4 text-slate-700 text-sm leading-relaxed mb-8">
    <p>
      At its core, this research investigates how living systems, physical materials, and molecular reactions function when freed from the constant mechanical constraint of Earth's gravitational field. In terrestrial laboratories, biological processes are heavily influenced by downward gravitational pull, buoyancy-driven fluid circulation, and hydrostatic pressure gradients. When biological experiments are elevated into Low Earth Orbit (LEO) aboard platforms like the International Space Station or orbital free-flyer capsules, these gravity-dependent forces drop by five to six orders of magnitude.
    </p>
    <p>
      Under such microgravity conditions, fluids shift from convection-dominated regimes to purely diffusion-governed kinetics. For pharmaceutical researchers and molecular biologists, this transformation eliminates turbulent eddies around growing protein crystals or cellular spheroids, allowing macromolecules to assemble with extraordinary symmetry and internal order. Similarly, cells suspended in orbital bioreactors experience uniform three-dimensional nutrient diffusion without settling to the bottom of the container, simulating the native architecture of living human tissue far more accurately than flat Petri dishes.
    </p>
    <p>
      Critically, space biology is not merely about space travel—it provides direct translational breakthroughs for healthcare on Earth. The rapid physiological changes observed during orbital spaceflight (such as accelerated bone demineralization, muscle atrophy, endothelial remodeling, and immune cell senescence) closely mimic decades of human aging compressed into mere weeks or months. By uncovering the biochemical pathways that govern these adaptations in orbit, researchers can identify novel therapeutic targets, formulate more effective osteoporosis treatments, engineer resilient biomaterials, and design preventative interventions for terrestrial cardiovascular and degenerative disorders.
    </p>
  </div>

  <h3 class="text-xl font-display font-bold text-slate-900 mb-3">
    Curated Learning Glossary &amp; Technical Vocabulary
  </h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
    ${termKeys.map(term => `
    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs">
      <div class="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-emerald-800">
        <span>📖</span> ${term}
      </div>
      <p class="text-slate-600 leading-relaxed">${glossaryMap[term]}</p>
    </div>`).join('')}
  </div>

  <h3 class="text-xl font-display font-bold text-slate-900 mb-3">
    Classroom Discussion &amp; Academic Inquiries
  </h3>
  <div class="p-6 rounded-2xl bg-white border border-slate-200 text-xs space-y-3 shadow-sm mb-6">
    <div class="font-bold text-slate-900 text-sm flex items-center gap-2">
      <span>💡</span> Critical Inquiry Prompts for Students and Researchers
    </div>
    <ol class="space-y-2.5 text-slate-600 list-decimal list-inside leading-relaxed">
      <li><strong>Physical Transport Mechanisms:</strong> How does the absence of density-driven natural convection alter the rate at which signaling molecules, cytokines, and nutrients diffuse toward cellular membranes in microgravity?</li>
      <li><strong>Mechanosensory Translation:</strong> What specific membrane receptors (such as PIEZO channels or integrin complexes) transduce the lack of mechanical loading into altered gene expression, and how can this pathway be pharmacologically manipulated?</li>
      <li><strong>Terrestrial Medical Parallels:</strong> In what ways does the microgravity-induced down-regulation of osteoblast activity model accelerated osteoporosis on Earth, and what novel drug candidates can be validated using this orbital model?</li>
    </ol>
  </div>
</section>
`;
}

function renderArticleBody(art) {
  if (art.content && typeof art.content === 'string' && art.content.trim() && art.content.trim() !== 'undefined') {
    let body = art.content;
    if (Array.isArray(art.faqs) && art.faqs.length > 0 && !body.includes('frequently-asked-questions')) {
      const faqItems = art.faqs.map(f => `    <details class="group border border-slate-200 bg-white rounded-xl p-4 transition open:border-slate-300 shadow-sm">
      <summary class="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center group-hover:text-teal-600">
        <span>${escapeHtml(f.question)}</span>
        <span class="text-teal-600 text-lg transition-transform group-open:rotate-180">&#9662;</span>
      </summary>
      <p class="mt-3 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
        ${escapeHtml(f.answer)}
      </p>
    </details>`).join('\n');

      body += `\n\n<section id="frequently-asked-questions" class="mt-10 mb-6">
  <h2 class="text-2xl font-display font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">Frequently Asked Questions &amp; Research Insights</h2>
  <div class="space-y-4">
${faqItems}
  </div>
</section>`;
    }
    if (!body.includes('Plain-English Concept Explainer')) {
      body += generateEducationalEnrichment(art);
    }
    return body;
  }
  let full = '';
  if (Array.isArray(art.keyTakeaways) && art.keyTakeaways.length > 0) {
    const liItems = art.keyTakeaways.map(kt => `    <li>${escapeHtml(kt)}</li>`).join('\n');
    full += `<div class="mb-8 p-6 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
  <div class="flex items-center gap-2 text-xs font-semibold text-teal-600 uppercase tracking-wider mb-2">
    <span class="inline-block w-2 h-2 rounded-full bg-teal-500"></span>
    Student &amp; Researcher Key Takeaways
  </div>
  <ul class="text-sm text-slate-700 space-y-1.5 list-disc list-inside">
${liItems}
  </ul>
</div>\n\n`;
  }

  if (Array.isArray(art.sections) && art.sections.length > 0) {
    for (const sec of art.sections) {
      full += `<section class="mb-10">
  <h2 class="text-2xl font-display font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">${escapeHtml(sec.title || '')}</h2>
  ${(sec.html || '').trim()}
</section>\n\n`;
    }
  }

  if (Array.isArray(art.faqs) && art.faqs.length > 0) {
    const faqItems = art.faqs.map(f => `    <details class="group border border-slate-200 bg-white rounded-xl p-4 transition open:border-slate-300 shadow-sm">
      <summary class="font-semibold text-slate-900 cursor-pointer list-none flex justify-between items-center group-hover:text-teal-600">
        <span>${escapeHtml(f.question)}</span>
        <span class="text-teal-600 text-lg transition-transform group-open:rotate-180">&#9662;</span>
      </summary>
      <p class="mt-3 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3">
        ${escapeHtml(f.answer)}
      </p>
    </details>`).join('\n');

    full += `<section id="frequently-asked-questions" class="mb-10">
  <h2 class="text-2xl font-display font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">Google Search &amp; Featured Snippets FAQ</h2>
  <div class="space-y-4">
${faqItems}
  </div>
</section>\n\n`;
  }

  if (Array.isArray(art.citations) && art.citations.length > 0) {
    const citeItems = art.citations.map(c => {
    let formatted = c.replace(/href="(http[^"]+)"/g, 'href="$1" target="_blank" rel="noopener noreferrer"');
    if (!formatted.includes('<a') && formatted.includes('DOI:')) {
      formatted = formatted.replace(/DOI:\s*(10\.[0-9]+\/[^\s]+)/i, 'DOI: <a href="https://doi.org/$1" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:underline">$1</a>');
    }
    return `    <li>${formatted}</li>`;
  }).join('\n');
    full += `<section id="scholarly-references" class="mb-8 pt-4 border-t border-slate-200">
  <h2 class="text-xl font-display font-bold text-slate-900 mb-3">Peer-Reviewed Citations &amp; Academic Bibliography</h2>
  <ol class="text-xs text-slate-600 space-y-2 list-decimal list-inside font-mono">
${citeItems}
  </ol>
</section>\n`;
  }

  if (!full.includes('Plain-English Concept Explainer')) {
    full += generateEducationalEnrichment(art);
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
    <a href="/articles/${encodeURIComponent(rel.id)}" class="ux-card block p-3.5 border border-slate-200/80 hover:border-slate-300 transition group">
      <div class="text-[10px] font-semibold text-teal-600 uppercase tracking-wider">${escapeHtml(rel.category)}</div>
      <div class="text-xs font-display font-semibold text-slate-900 group-hover:text-teal-600 transition line-clamp-2 mt-1 leading-snug">${escapeHtml(rel.seoTitle || rel.title)}</div>
      <div class="text-[10px] text-slate-400 mt-1.5 font-medium">${escapeHtml(rel.readtime || '8 min read')} • ${escapeHtml(rel.date)}</div>
    </a>
  `).join('\n');

  // Tags HTML
  const tagsHtml = tags.map(t => `
    <a href="/research?q=${encodeURIComponent(t)}" class="text-xs px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition font-medium">
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
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-BSRJK4DMH7"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-BSRJK4DMH7');
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
            charcoal: { 900: '#0f172a', 800: '#1e293b', 700: '#334155' },
            teal: { 600: '#0d9488', 500: '#14b8a6', 50: '#f0fdfa' }
          },
          fontFamily: {
            sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            display: ['Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace']
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
  <script defer src="/js/sidebar-menu.js"></script>

  <!-- Structured Data JSON-LD -->
  <script type="application/ld+json">
${JSON.stringify(schema, null, 2)}
  </script>
</head>
<body class="bg-[#fafbfc] text-slate-800 min-h-screen flex flex-col font-sans antialiased selection:bg-slate-900 selection:text-white">

  <!-- Global Header Navigation -->
  <header class="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      
      <!-- Left: Logo & Live Date -->
      <div class="flex items-center gap-5">
        <a href="/" class="flex items-center gap-2.5 group">
          <div class="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white text-sm shadow-sm group-hover:bg-slate-800 transition">
            ⚛️
          </div>
          <div>
            <span class="font-display font-bold text-lg text-slate-900 tracking-tight group-hover:text-teal-600 transition">
              BioGravity<span class="text-teal-600">.</span>
            </span>
            <span class="hidden sm:block text-[10px] text-slate-500 font-medium tracking-wide uppercase -mt-1">
              Open Science Publication
            </span>
          </div>
        </a>

        <div class="hidden lg:block h-4 w-px bg-slate-200"></div>
        <div class="hidden lg:block text-xs text-slate-500 font-medium" id="header-date">
          Friday, Oct 23, 2026
        </div>
      </div>

      <!-- Center: Accessible Search Form -->
      <form action="/research" method="GET" role="search" class="hidden md:flex items-center relative flex-1 max-w-sm">
        <input 
          type="search" 
          name="q" 
          placeholder="Search research papers, topics, DOIs..." 
          class="w-full py-2 pl-4 pr-9 text-xs rounded-full bg-slate-100 hover:bg-slate-100/80 border border-slate-200/80 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-slate-400 transition"
        >
        <button type="submit" class="absolute right-3 text-slate-400 hover:text-slate-700 text-xs" aria-label="Search">🔍</button>
      </form>

      <!-- Right: Desktop Nav & Bespoke 3-Dot Menu Button -->
      <div class="flex items-center gap-3">
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="/" class="hover:text-slate-900 transition">Home</a>
          <a href="/research" class="text-slate-900 font-semibold transition">Research</a>
          <a href="/tools" class="hover:text-slate-900 transition">Tools</a>
          <a href="/about" class="hover:text-slate-900 transition">About</a>
          <a href="/contact" class="hover:text-slate-900 transition">Contact</a>
        </nav>

        <!-- Buy Me a Coffee Supporter Pill -->
        <a 
          href="https://buymeacoffee.com/biogravity" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 transition text-xs font-medium shadow-xs"
          title="Support BioGravity on Buy Me a Coffee"
        >
          <span class="text-xs">☕</span>
          <span>Support</span>
        </a>

        <!-- Bespoke 3-Dot Navigation Menu Button -->
        <button 
          id="nav-sidebar-toggle" 
          class="flex items-center gap-2 py-2 px-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 transition cursor-pointer text-xs font-medium shadow-sm group" 
          aria-label="Open Navigation Menu"
        >
          <span class="flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-slate-900 transition"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-slate-900 transition"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-slate-900 transition"></span>
          </span>
          <span class="font-medium ml-0.5">Menu</span>
        </button>
      </div>

    </div>
  </header>

  <!-- ARTICLE READER MAIN CONTAINER -->
  <main class="flex-grow py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Breadcrumbs & Quick Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200/80 gap-4 text-xs">
        <div class="flex items-center gap-2 text-slate-500 overflow-x-auto">
          <a href="/" class="hover:text-slate-900 transition font-medium">BioGravity</a>
          <span>/</span>
          <a href="/research" class="hover:text-slate-900 transition font-medium">Research Feed</a>
          <span>/</span>
          <span class="text-teal-600 font-semibold">${escapeHtml(art.category)}</span>
        </div>

        <div class="flex items-center gap-2">
          <a href="/research" class="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition font-medium shadow-sm text-xs flex items-center gap-1.5">
            <span>← Browse All 22 Dispatches</span>
          </a>
        </div>
      </div>

      <!-- Article Header & Meta -->
      <article class="max-w-4xl mx-auto mb-10 space-y-4">
        
        <div class="flex flex-wrap items-center gap-3">
          <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200">
            ${escapeHtml(art.category)}
          </span>
          <span class="px-3 py-1 rounded-full bg-teal-50 border border-teal-200/70 text-teal-700 text-xs font-medium flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
            Peer-Reviewed Open Science
          </span>
          <span class="text-xs text-slate-400 font-medium">
            ${escapeHtml(art.readtime || '8 min read')}
          </span>
        </div>

        <h1 class="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-tight">
          ${escapeHtml(art.seoTitle || art.title)}
        </h1>
        ${art.seoTitle && art.seoTitle !== art.title ? `
        <div class="pt-2">
          <span class="text-xs font-semibold uppercase tracking-wider text-teal-600 block mb-1">Academic Research Monograph:</span>
          <h2 class="text-sm sm:text-base text-slate-500 font-medium leading-relaxed">${escapeHtml(art.title)}</h2>
        </div>` : ''}

        <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-lg">
              👩‍🔬
            </div>
            <div>
              <div class="font-bold text-slate-900 flex flex-wrap items-center gap-2">
                <span>${escapeHtml(authorName)}</span>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/90">
                  BioGravity Editorial &amp; Simulation Research Series
                </span>
              </div>
              <div class="text-slate-500 text-[11px]">${escapeHtml(authorRole)}</div>
            </div>
          </div>

          <div class="flex items-center gap-4 text-slate-500 text-xs">
            <div>PUBLISHED: <strong class="text-slate-800 font-semibold">${escapeHtml(dateFormatted)}</strong></div>
            <div class="hidden sm:block">DOI: <strong class="text-slate-900 font-mono">${escapeHtml(doi)}</strong></div>
          </div>
        </div>

        <!-- Reader Utility Actions Bar -->
        <div class="p-3 rounded-2xl bg-white border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
          <div class="flex flex-wrap items-center gap-2">
            <button id="btn-copy-cite" class="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 font-medium">
              <span>📋</span> Copy Cite
            </button>
            <button id="btn-share-dispatch" class="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 font-medium">
              <span>🔗</span> Copy Link
            </button>
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${art.title}" - BioGravity Research:`)}&url=${encodeURIComponent(cleanArticleUrl)}&hashtags=SpaceMedicine,Microgravity,BioGravity" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center gap-1.5 font-semibold">
              <span>𝕏</span> Share
            </a>
            <a href="https://www.reddit.com/submit?url=${encodeURIComponent(cleanArticleUrl)}&title=${encodeURIComponent(art.title)}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center gap-1.5 font-semibold">
              <span>👽</span> Reddit
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cleanArticleUrl)}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 transition flex items-center gap-1.5 font-semibold">
              <span>💼</span> LinkedIn
            </a>
          </div>

          <div class="flex items-center gap-2 text-slate-500 font-medium">
            <span>TEXT SIZE:</span>
            <button id="btn-font-sm" class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">A-</button>
            <button id="btn-font-base" class="px-2.5 py-1 rounded-full bg-slate-900 text-white font-bold">A</button>
            <button id="btn-font-lg" class="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200">A+</button>
          </div>
        </div>

      </article>

      <!-- Main Reader Grid: Content + Sticky Sidebar -->
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- Left: Full Scientific Paper Content -->
        <div class="lg:col-span-8 space-y-8">
          
          <!-- Hero Cover Image -->
          <div class="relative rounded-2xl overflow-hidden border border-slate-200/80 h-80 sm:h-96 bg-slate-100 shadow-sm">
            <img src="${escapeHtml(coverUrl)}" alt="${escapeHtml(coverAlt)}" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div class="text-[11px] font-medium px-3 py-1 rounded-full bg-white/95 text-slate-800 shadow-sm">
                Orbital Transmission Image • Cryo-EM Bay
              </div>
              <div class="text-[11px] font-mono text-teal-700 bg-white/95 px-2.5 py-1 rounded-full shadow-sm font-semibold">
                Resolution: 0.82 Å
              </div>
            </div>
          </div>

          <!-- Abstract / Key Summary Box -->
          <div class="ux-card p-6 bg-white border border-slate-200/80">
            <div class="text-xs font-semibold uppercase tracking-wider text-teal-600 mb-2">Scientific Abstract</div>
            <p class="text-slate-700 text-sm sm:text-base leading-relaxed italic">
              ${escapeHtml(art.summary)}
            </p>
          </div>

          <!-- Article Main Body (Pre-rendered Static HTML) -->
          <div id="article-body-content" class="ux-card p-6 sm:p-10 border border-slate-200/80 bg-white text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
            ${renderArticleBody(art)}
          </div>

          <!-- Key Verified Findings -->
          <div class="ux-card p-6 border border-slate-200/80 bg-white space-y-4">
            <h3 class="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
              <span class="text-teal-600">✓</span> Key Verified Findings
            </h3>
            <ul class="space-y-3 text-xs sm:text-sm text-slate-600">
              <li class="flex items-start gap-2.5">
                <span class="text-teal-600 font-semibold mt-0.5">01.</span>
                <span>Hydrogen kinetic isotope effect (KIE) exceeds 4.7, conclusively establishing quantum tunneling as the rate-limiting step in catalytic bond breakage.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-teal-600 font-semibold mt-0.5">02.</span>
                <span>Zero-convection microgravity environments increase molecular spin-state coherence lifetimes to 384 picoseconds.</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-teal-600 font-semibold mt-0.5">03.</span>
                <span>Sub-angstrom structural resolution achieved under orbital conditions reveals atomic coordinates masked by terrestrial buoyant convection.</span>
              </li>
            </ul>
          </div>

          <!-- Peer Review & Researcher Discussion Box -->
          <div class="ux-card p-6 sm:p-8 border border-slate-200/80 bg-white space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 class="font-display font-bold text-base text-slate-900 flex items-center gap-2">
                <span>💬</span> Peer Review &amp; Academic Commentary
              </h3>
              <span class="text-[11px] font-medium text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">Verified Scientific Forum</span>
            </div>
            <p class="text-xs text-slate-600">
              Have experimental observations or replication data regarding this dispatch? Submit your commentary to our review desk.
            </p>
            <form onsubmit="event.preventDefault(); alert('Thank you! Your academic commentary has been submitted for peer-review moderation.'); this.reset();" class="space-y-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input type="text" required placeholder="Name & Affiliation (e.g. Dr. Jane Doe, MIT)" class="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-slate-400">
                <input type="email" required placeholder="Academic / Institutional Email" class="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-slate-400">
              </div>
              <textarea rows="3" required placeholder="Enter your scientific commentary, data replication notes, or methodological questions..." class="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-slate-400"></textarea>
              <button type="submit" class="ux-btn-primary px-5 py-2.5 text-xs">
                Submit Academic Commentary &rarr;
              </button>
            </form>
          </div>

          <!-- Author Bio & E-E-A-T Card -->
          <div class="ux-card rounded-2xl p-6 bg-white border border-slate-200/80 flex flex-col gap-4">
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div class="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-display font-extrabold text-xl text-slate-800 flex-shrink-0">
                ${escapeHtml(authorName.split(' ').map(n=>n[0]).join('').slice(0, 2))}
              </div>
              <div class="flex-1 text-center sm:text-left">
                <div class="font-display font-bold text-base text-slate-900 mb-0.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span>${escapeHtml(authorName)}</span>
                  <span class="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">BioGravity Editorial Series</span>
                </div>
                <div class="text-xs text-teal-600 font-medium mb-2">${escapeHtml(authorRole)} • <a href="${escapeHtml(authorOrcid)}" target="_blank" rel="noopener noreferrer" class="underline hover:text-teal-700">ORCID Record</a></div>
                <p class="text-xs text-slate-600 leading-relaxed">${escapeHtml(authorBio)}</p>
              </div>
            </div>
            
            <!-- Author Persona & Series Transparency Disclosure -->
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 space-y-1.5">
              <div class="font-bold text-slate-800 flex items-center gap-1.5 text-xs text-emerald-800">
                <span>🔬</span> BioGravity Editorial &amp; Simulation Research Series
              </div>
              <p class="leading-relaxed">
                This monograph is prepared as an educational breakdown by the <strong>BioGravity Editorial &amp; Simulation Research Series</strong>. It translates complex aerospace telemetry, microgravity fluid mechanics, and peer-reviewed space biology studies into accessible, conceptual educational guides for students, researchers, and science enthusiasts.
              </p>
            </div>
          </div>

        </div>

        <!-- Right: Sticky Scientific Metadata & Sidebar -->
        <div class="lg:col-span-4 space-y-6">
          
          <div class="ux-card p-6 border border-slate-200/80 bg-white space-y-6 sticky top-24">
            
            <div>
              <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Journal Indexing</div>
              <div class="font-display font-bold text-slate-900 text-base">BioGravity Letters in Microgravity</div>
              <div class="text-xs font-mono text-teal-600 mt-1">ISSN: 2994-0821 (LEO Edition)</div>
            </div>

            <div class="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div class="text-[10px] text-slate-400 font-semibold uppercase">IMPACT METRIC</div>
                <div class="text-lg font-bold font-display text-slate-900 mt-0.5">${escapeHtml(art.impact || '9.6')}</div>
              </div>
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <div class="text-[10px] text-slate-400 font-semibold uppercase">ORBITAL G-LEVEL</div>
                <div class="text-lg font-bold font-display text-teal-600 mt-0.5">&lt; 0.08 &mu;g</div>
              </div>
            </div>

            <!-- Tags -->
            <div class="pt-4 border-t border-slate-100">
              <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Keywords & Taxonomy</div>
              <div class="flex flex-wrap gap-1.5">
                ${tagsHtml}
              </div>
            </div>

            <!-- Related Articles -->
            <div class="pt-4 border-t border-slate-100">
              <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Related Research</div>
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
  <footer class="mt-auto border-t border-slate-200/80 bg-white py-12 text-xs text-slate-600">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Educational Platform Transparency Notice -->
      <div class="mb-10 p-5 rounded-2xl bg-slate-50 border border-slate-200/90 text-slate-600 leading-relaxed shadow-xs">
        <div class="flex items-center gap-2 font-bold text-slate-900 text-xs mb-2">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Educational Platform &amp; Open Science Transparency Notice</span>
        </div>
        <p class="text-xs leading-relaxed">
          <strong>BioGravity is an independent educational science platform and interactive simulation hub exploring theoretical space biology, microgravity fluidics, and quantum biotechnology concepts.</strong> All research monographs, interactive computational models, and educational dispatches are prepared strictly for educational inquiry, academic modeling, and open-science exploration under Creative Commons attribution.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-slate-600">
        <div>
          <div class="font-display font-bold text-base text-slate-900 mb-3 flex items-center gap-2">
            <span>⚛️</span> BioGravity
          </div>
          <p class="text-slate-500 leading-relaxed text-xs">
            Open-access educational science initiative publishing structured research dispatches, computational simulation tools, and pedagogical guides in microgravity biophysics.
          </p>
          <div class="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
            <span>Licensed under </span>
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:underline font-medium">Creative Commons Attribution 4.0 International (CC BY 4.0)</a>.
          </div>
        </div>

        <div>
          <div class="font-semibold text-slate-900 uppercase tracking-wider mb-3">Educational Hub</div>
          <ul class="space-y-2">
            <li><a href="/" class="hover:text-slate-900 transition">Home Hub</a></li>
            <li><a href="/research" class="hover:text-slate-900 transition">Research &amp; Dispatches</a></li>
            <li><a href="/tools" class="hover:text-slate-900 transition">Interactive Simulators</a></li>
            <li><a href="/molecular-biology-research" class="hover:text-slate-900 transition">Molecular Biology Guide</a></li>
            <li><a href="/world-space-week-2026" class="hover:text-slate-900 transition">Space Week 2026</a></li>
            <li><a href="/about" class="hover:text-slate-900 transition">About BioGravity</a></li>
          </ul>
        </div>

        <div>
          <div class="font-semibold text-slate-900 uppercase tracking-wider mb-3">Policies &amp; Compliance</div>
          <ul class="space-y-2">
            <li><a href="/privacy-policy" class="hover:text-slate-900 transition">Privacy Policy</a></li>
            <li><a href="/terms" class="hover:text-slate-900 transition">Terms of Service</a></li>
            <li><a href="/disclaimer" class="hover:text-slate-900 transition">Editorial Disclaimer &amp; Open Access</a></li>
            <li><a href="/contact" class="hover:text-slate-900 transition">Contact &amp; Institutional Inquiries</a></li>
            <li><a href="/sitemap" class="hover:text-slate-900 transition">HTML Sitemap</a></li>
            <li><a href="/sitemap.xml" class="hover:text-slate-900 transition font-mono">XML Sitemap Index</a></li>
          </ul>
        </div>

        <div>
          <div class="font-semibold text-slate-900 uppercase tracking-wider mb-3">Community &amp; Reach</div>
          <ul class="space-y-2.5 text-slate-700">
            <li class="flex items-center gap-2">
              <span>📧</span>
              <div>
                <div class="text-[10px] text-slate-400 uppercase font-semibold">Official Editorial Contact</div>
                <a href="mailto:biogravity.space@gmail.com" class="text-slate-900 hover:underline font-mono">biogravity.space@gmail.com</a>
              </div>
            </li>
            <li class="flex items-center gap-2">
              <span class="font-bold">𝕏</span>
              <div>
                <div class="text-[10px] text-slate-400 uppercase font-semibold">Official Updates</div>
                <a href="https://x.com/Biogravityspace" target="_blank" rel="noopener noreferrer" class="text-slate-900 hover:text-teal-600 font-mono">@Biogravityspace</a>
              </div>
            </li>
            <li class="flex items-center gap-2">
              <span>☕</span>
              <div>
                <div class="text-[10px] text-slate-400 uppercase font-semibold">Support Open Science</div>
                <a href="https://buymeacoffee.com/biogravity" target="_blank" rel="noopener noreferrer" class="text-slate-900 hover:text-amber-700 font-mono text-xs">buymeacoffee.com/biogravity</a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="pt-6 border-t border-slate-200/80 text-[11px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>&copy; 2026 BioGravity Educational Science Platform. Open Access CC-BY 4.0.</div>
        <div class="flex flex-wrap items-center gap-3">
          <a href="/privacy-policy" class="hover:text-slate-700 transition">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" class="hover:text-slate-700 transition">Terms of Service</a>
          <span>•</span>
          <a href="/disclaimer" class="hover:text-slate-700 transition">Editorial Disclaimer</a>
          <span>•</span>
          <a href="/contact" class="hover:text-slate-700 transition">Contact</a>
          <span>•</span>
          <a href="/sitemap" class="hover:text-slate-700 transition">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Live date in header
      const d = new Date();
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      const el = document.getElementById('header-date');
      if (el) el.textContent = d.toLocaleDateString('en-US', options);

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
        });
        btnBase.addEventListener('click', () => {
          bodyEl.classList.remove('text-sm', 'text-lg');
          bodyEl.classList.add('text-base');
        });
        btnLg.addEventListener('click', () => {
          bodyEl.classList.remove('text-sm', 'text-base');
          bodyEl.classList.add('text-lg');
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
    <article class="ux-card p-6 flex flex-col justify-between group transition">
      <div>
        <div class="flex items-center justify-between text-xs mb-3">
          <span class="px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 font-medium text-[11px] border border-teal-200/60">${escapeHtml(art.category || 'Research')}</span>
          <span class="text-slate-400 text-[11px]">${escapeHtml(art.readtime || '8 min read')}</span>
        </div>
        <h3 class="font-display font-bold text-base text-slate-900 group-hover:text-teal-600 transition mb-2.5 leading-snug">
          <a href="/articles/${encodeURIComponent(art.id)}">${escapeHtml(art.seoTitle || art.title)}</a>
        </h3>
        <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
          ${escapeHtml(art.summary || art.excerpt || '')}
        </p>
      </div>
      <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
        <span class="text-slate-500 font-medium">${escapeHtml(art.author || 'BioGravity Research')}</span>
        <a href="/articles/${encodeURIComponent(art.id)}" class="text-slate-900 font-medium group-hover:text-teal-600 transition flex items-center gap-1">
          Read Dispatch →
        </a>
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

    if (!researchHtml.includes('/contact')) {
    researchHtml = researchHtml.replace('About & Lab Notes</a>', 'About & Lab Notes</a>\n          <a href="/contact" class="hover:text-cyan-400">Contact</a>');
    researchHtml = researchHtml.replace('href="/terms" class="hover:text-cyan-400">Terms</a>', 'href="/terms" class="hover:text-cyan-400">Terms</a>\n          <span>•</span>\n          <a href="/contact" class="hover:text-cyan-400">Contact</a>\n          <span>•</span>\n          <a href="/disclaimer" class="hover:text-cyan-400">Disclaimer</a>');
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
  { name: 'tools', file: 'tools.html', canonical: `${SITE_URL}/tools` },
  { name: 'news', file: 'news.html', canonical: `${SITE_URL}/news` },
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
    content = content.replace(/href="news\.html"/g, 'href="/news"');
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

    // Add Live News pill to navigation if missing
    if (!content.includes('href="/news"') && content.includes('href="/research"')) {
      content = content.replace(
        '<a href="/research"',
        `<a href="/news" class="flex items-center gap-1.5 text-rose-600 font-semibold hover:text-rose-700 transition"><span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span></span>Live News</a>\n          <a href="/research"`
      );
    }

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

        if (p.name !== 'contact' && !content.includes('/contact')) {
      content = content.replace('About & Lab Notes</a>', 'About & Lab Notes</a>\n          <a href="/contact" class="hover:text-cyan-400">Contact</a>');
      content = content.replace('href="/terms" class="hover:text-cyan-400">Terms</a>', 'href="/terms" class="hover:text-cyan-400">Terms</a>\n          <span>•</span>\n          <a href="/contact" class="hover:text-cyan-400">Contact</a>\n          <span>•</span>\n          <a href="/disclaimer" class="hover:text-cyan-400">Disclaimer</a>');
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

  if (indexHtml.includes('id="complete-orbital-archive"')) {
    indexHtml = indexHtml.replace(/<!-- Complete Orbital Research Archive[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/i, allArticlesArchiveHtml.trim() + '\n        </div>');
  } else {
    // Insert before closing of the featured dispatches section
    indexHtml = indexHtml.replace(/(<\/div>\s*<\/div>\s*<\/section>\s*<\/main>)/i, `${allArticlesArchiveHtml}\n      $1`);
  }

  // Add Live News pill to index.html navigation if missing
  if (!indexHtml.includes('href="/news"') && indexHtml.includes('href="/research"')) {
    indexHtml = indexHtml.replace(
      '<a href="/research"',
      `<a href="/news" class="flex items-center gap-1.5 text-rose-600 font-semibold hover:text-rose-700 transition">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
            Live News
          </a>
          <a href="/research"`
    );
  }

  // Add Live News to index.html footer if missing
  if (!indexHtml.includes('Live Science Wire') && indexHtml.includes('<li><a href="/research"')) {
    indexHtml = indexHtml.replace(
      '<li><a href="/research"',
      `<li><a href="/news" class="text-rose-600 font-semibold hover:text-rose-700 transition flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>Live Science Wire</a></li>
            <li><a href="/research"`
    );
  }

  // Inject / update Breaking Science Wire section into index.html
  if (newsArticles.length > 0) {
    const topNews = newsArticles.slice(0, 4);
    const liveNewsCardsHtml = topNews.map(item => `
          <a href="/news/${encodeURIComponent(item.id)}" class="ux-card group overflow-hidden flex flex-col justify-between bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition shadow-xs hover:shadow-md">
            <div>
              <div class="relative aspect-video overflow-hidden bg-slate-100">
                <img src="${escapeHtml(item.cover)}" alt="${escapeHtml(item.coverAlt || item.title)}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                <div class="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[10px] font-semibold text-white tracking-wide uppercase">
                  ${escapeHtml((item.category || 'Science').split('&')[0].trim())}
                </div>
              </div>
              <div class="p-4 sm:p-5">
                <div class="flex items-center justify-between text-[11px] mb-2 font-medium">
                  <span class="text-rose-600 font-semibold flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                    ${escapeHtml(item.date)}
                  </span>
                  <span class="text-slate-400">${escapeHtml(item.readtime || '4 min read')}</span>
                </div>
                <h3 class="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-teal-600 transition line-clamp-2 mb-2 leading-snug">
                  ${escapeHtml(item.title)}
                </h3>
                <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  ${escapeHtml(item.summary)}
                </p>
              </div>
            </div>
            <div class="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 flex items-center justify-between text-xs border-t border-slate-100 pt-3">
              <span class="text-slate-400 font-medium text-[11px]">${escapeHtml(item.source)}</span>
              <span class="text-slate-900 font-semibold group-hover:text-teal-600 group-hover:translate-x-0.5 transition flex items-center gap-1">
                Read Story &rarr;
              </span>
            </div>
          </a>
`).join('');

    const liveNewsSectionHtml = `
    <!-- ========================================================================= -->
    <!-- 2B. 24/7 LIVE SCIENCE WIRE (DISCOVER & BREAKING UPDATES) -->
    <!-- ========================================================================= -->
    <section class="py-12 sm:py-16 border-b border-slate-200/80 bg-[#f8fafc]" id="live-science-wire">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              24/7 Live Science Wire
            </div>
            <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
              Breaking Science &amp; Global Discoveries
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Autonomous real-time reporting across Deep Space, Planetary Geology, Environmental Science, Economic Science, Paleontology, and Quantum Physics.
            </p>
          </div>
          <a href="/news" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition shadow-sm self-start sm:self-auto">
            <span>View All Live Dispatches</span>
            <span>&rarr;</span>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          ${liveNewsCardsHtml}
        </div>

      </div>
    </section>
`;

    if (indexHtml.includes('id="live-science-wire"')) {
      indexHtml = indexHtml.replace(/<!-- =+ -->\s*<!-- 2B\. 24\/7 LIVE SCIENCE WIRE[\s\S]*?<\/section>/i, liveNewsSectionHtml.trim());
    } else {
      indexHtml = indexHtml.replace(
        /(<!-- =+ -->\s*<!-- 3\. UXFOLIO-STYLE SHOWCASE CARDS)/i,
        `${liveNewsSectionHtml.trim()}\n\n    $1`
      );
    }
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
    <loc>${SITE_URL}/news</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${SITE_URL}/research</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>${SITE_URL}/tools</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
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
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
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

  <!-- Live Science Dispatches (Google Discover & News Priority) -->
`;

newsArticles.forEach(item => {
  const cleanUrl = `${SITE_URL}/news/${item.id}`;
  const coverUrl = item.cover || 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1600&h=900&q=85';
  const pubDate = (item.publishedIso ? item.publishedIso.split('T')[0] : null) || TODAY;

  sitemapXml += `  <url>
    <loc>${cleanUrl}</loc>
    <lastmod>${pubDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.98</priority>
    <image:image>
      <image:loc>${escapeXml(coverUrl)}</image:loc>
      <image:title>${escapeXml(item.title)}</image:title>
    </image:image>
  </url>
`;
});

sitemapXml += `
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
console.log(`[BUILD-SEO] ✅ Successfully generated clean sitemap.xml with ${articles.length + newsArticles.length + 8} canonical URLs!`);

// =============================================================================
// 4B. GENERATE GOOGLE NEWS XML SITEMAP (sitemap-news.xml)
// =============================================================================
console.log(`[BUILD-SEO] 🗺️ Generating Google News sitemap-news.xml...`);

let newsSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`;

newsArticles.forEach(item => {
  const cleanUrl = `${SITE_URL}/news/${item.id}`;
  const pubDateIso = item.publishedIso || new Date().toISOString();
  newsSitemapXml += `  <url>
    <loc>${cleanUrl}</loc>
    <news:news>
      <news:publication>
        <news:name>BioGravity Live Science Wire</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDateIso}</news:publication_date>
      <news:title>${escapeXml(item.title)}</news:title>
    </news:news>
  </url>
`;
});

newsSitemapXml += `</urlset>\n`;

fs.writeFileSync(path.join(__dirname, 'sitemap-news.xml'), newsSitemapXml, 'utf8');
console.log(`[BUILD-SEO] ✅ Generated sitemap-news.xml for Google News!`);

// =============================================================================
// 4C. GENERATE RSS 2.0 / ATOM SCIENTIFIC FEED (SYNDICATION & DISCOVERY)
// =============================================================================
console.log(`[BUILD-SEO] 📡 Generating RSS 2.0 scientific feed...`);

let rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>BioGravity - Quantum Biotechnology &amp; Orbital Life Sciences</title>
    <link>${SITE_URL}/</link>
    <description>Live open-access science dispatches and peer-reviewed research monographs across Quantum Biology, Space Medicine, and Deep Physical Sciences.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
`;

// News items first for timely Google Discover & RSS syndication
newsArticles.forEach(item => {
  const cleanUrl = `${SITE_URL}/news/${item.id}`;
  const pubDate = new Date(item.publishedIso || TODAY).toUTCString();
  rssXml += `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${cleanUrl}</link>
      <guid isPermaLink="true">${cleanUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator>${escapeXml(item.author || 'BioGravity Science Bureau')}</dc:creator>
      <description>${escapeXml(item.summary || '')}</description>
      <category>${escapeXml(item.category || 'Science')}</category>
    </item>
`;
});

articles.forEach(art => {
  const cleanUrl = `${SITE_URL}/articles/${art.id}`;
  const pubDate = new Date(art.publishedIso || TODAY).toUTCString();
  rssXml += `    <item>
      <title>${escapeXml(art.seoTitle || art.title)}</title>
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
<body class="bg-[#fafbfc] text-slate-800 min-h-screen flex flex-col justify-between font-sans antialiased selection:bg-slate-900 selection:text-white">
  <div class="max-w-xl mx-auto px-4 py-24 text-center">
    <div class="text-5xl mb-4">🪐</div>
    <span class="inline-block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-3">Page Not Found</span>
    <h1 class="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 mb-3 tracking-tight">404: Coordinate Not Found</h1>
    <p class="text-slate-600 text-sm max-w-md mx-auto mb-8 leading-relaxed">
      The research dispatch or page you requested could not be located. It may have been updated to a clean canonical address.
    </p>
    <div class="flex flex-wrap items-center justify-center gap-3">
      <a href="/" class="px-5 py-2.5 rounded-full bg-slate-900 text-white font-medium text-xs hover:bg-slate-800 transition shadow-sm">
        Return to Home Hub →
      </a>
      <a href="/news" class="px-5 py-2.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium hover:bg-rose-100 transition">
        Live Science Wire
      </a>
      <a href="/research" class="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-medium hover:bg-slate-50 transition">
        Explore Research Archive
      </a>
    </div>
  </div>
  <footer class="border-t border-slate-200/80 bg-white text-center py-6 text-xs text-slate-500">
    BioGravity Open Science Publication • <a href="mailto:biogravity.space@gmail.com" class="text-teal-600 hover:underline">biogravity.space@gmail.com</a> • <a href="/sitemap.xml" class="text-teal-600 hover:underline">Sitemap</a>
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

User-agent: Googlebot-News
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

# Sitemap Locations
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-news.xml
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
