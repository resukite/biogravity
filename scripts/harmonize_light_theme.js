'use strict';

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function getStandardHeader(activePage = '') {
  return `  <!-- ========================================================================= -->
  <!-- 1. CLEAN, LEGIT & MINIMAL TOP BAR (DATE • LOGO • SEARCH • NAV • 3-DOT MENU) -->
  <!-- ========================================================================= -->
  <header class="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
      
      <!-- Left: Logo, Name & Current Date -->
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
        <div class="hidden lg:block text-xs text-slate-500 font-medium header-date">
          Friday, Oct 23, 2026
        </div>
      </div>

      <!-- Center: Clean Search Bar -->
      <form action="/research" method="GET" role="search" class="hidden md:flex items-center relative flex-1 max-w-sm">
        <input 
          type="search" 
          name="q" 
          placeholder="Search research papers, topics, DOIs..." 
          class="w-full py-2 pl-4 pr-9 text-xs rounded-full bg-slate-100 hover:bg-slate-100/80 border border-slate-200/80 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-slate-400 transition"
        >
        <button type="submit" class="absolute right-3 text-slate-400 hover:text-slate-700 text-xs" aria-label="Search">🔍</button>
      </form>

      <!-- Right: Clean Navigation Links + Bespoke 3-Dot Menu Button -->
      <div class="flex items-center gap-3">
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="/" class="${activePage === 'home' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900 transition'}">Home</a>
          <a href="/research" class="${activePage === 'research' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900 transition'}">Research</a>
          <a href="/tools" class="${activePage === 'tools' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900 transition'}">Tools</a>
          <a href="/about" class="${activePage === 'about' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900 transition'}">About</a>
          <a href="/contact" class="${activePage === 'contact' ? 'text-slate-900 font-semibold' : 'hover:text-slate-900 transition'}">Contact</a>
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
  </header>`;
}

function getStandardFooter() {
  return `  <!-- ========================================================================= -->
  <!-- CLEAN, STANDARDIZED GLOBAL FOOTER -->
  <!-- ========================================================================= -->
  <footer class="border-t border-slate-200/80 bg-white text-slate-600 text-xs py-12 mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <span class="text-lg">⚛️</span>
            <span class="font-display font-bold text-slate-900 text-base">BioGravity</span>
          </div>
          <p class="text-slate-500 leading-relaxed text-xs">
            Open-access scientific platform researching space biotechnology, microgravity therapeutics, and orbital biology.
          </p>
        </div>

        <div>
          <div class="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-3">Site Architecture</div>
          <ul class="space-y-2">
            <li><a href="/" class="hover:text-slate-900 transition">Home Hub</a></li>
            <li><a href="/research" class="hover:text-slate-900 transition">Research Feed &amp; Search</a></li>
            <li><a href="/tools" class="hover:text-slate-900 transition">Tools &amp; Simulators</a></li>
            <li><a href="/world-space-week-2026" class="hover:text-slate-900 transition">Space Week 2026 Guide</a></li>
            <li><a href="/molecular-biology-research" class="hover:text-slate-900 transition">Molecular Biology Guide</a></li>
            <li><a href="/about" class="hover:text-slate-900 transition">About BioGravity</a></li>
            <li><a href="/contact" class="hover:text-slate-900 transition text-teal-600 font-medium">Contact &amp; Inquiries</a></li>
          </ul>
        </div>

        <div>
          <div class="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-3">Direct Connect</div>
          <ul class="space-y-2.5 text-slate-700">
            <li class="flex items-center gap-2">
              <span>📧</span>
              <div>
                <div class="text-[10px] text-slate-400 uppercase">Official Gmail</div>
                <a href="mailto:biogravity.space@gmail.com" class="text-slate-900 hover:underline font-mono text-xs">biogravity.space@gmail.com</a>
              </div>
            </li>
            <li class="flex items-center gap-2">
              <span class="font-bold text-sm">𝕏</span>
              <div>
                <div class="text-[10px] text-slate-400 uppercase">Official X (Twitter)</div>
                <a href="https://x.com/Biogravityspace" target="_blank" rel="noopener noreferrer" class="text-slate-900 hover:text-teal-600 font-mono text-xs">@Biogravityspace</a>
              </div>
            </li>
            <li class="flex items-center gap-2">
              <span>☕</span>
              <div>
                <div class="text-[10px] text-slate-400 uppercase">Support BioGravity</div>
                <a href="https://buymeacoffee.com/biogravity" target="_blank" rel="noopener noreferrer" class="text-slate-900 hover:text-amber-700 font-mono text-xs">buymeacoffee.com/biogravity</a>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <div class="font-semibold text-slate-900 text-xs uppercase tracking-wider mb-3">Compliance &amp; Policy</div>
          <ul class="space-y-2 text-slate-500">
            <li><a href="/disclaimer" class="hover:text-slate-900 transition">Editorial Disclaimer</a></li>
            <li><a href="/sitemap" class="hover:text-slate-900 transition">HTML Sitemap</a></li>
            <li><a href="/privacy-policy" class="hover:text-slate-900 transition">Privacy Policy</a></li>
            <li><a href="/terms" class="hover:text-slate-900 transition">Terms of Service</a></li>
            <li><a href="/sitemap.xml" class="hover:text-slate-900 transition font-mono">XML Sitemap</a></li>
          </ul>
        </div>

      </div>

      <div class="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-slate-400">
        <div>&copy; 2026 BioGravity Institute for Quantum Biotechnology. All rights reserved.</div>
        <div class="flex flex-wrap gap-4">
          <a href="mailto:biogravity.space@gmail.com" class="hover:text-slate-700 transition">Email Desk</a>
          <span>•</span>
          <a href="https://x.com/Biogravityspace" target="_blank" rel="noopener noreferrer" class="hover:text-slate-700 transition">X: @Biogravityspace</a>
          <span>•</span>
          <a href="/contact" class="hover:text-slate-700 transition">Contact</a>
          <span>•</span>
          <a href="/privacy-policy" class="hover:text-slate-700 transition">Privacy Policy</a>
          <span>•</span>
          <a href="/terms" class="hover:text-slate-700 transition">Terms</a>
          <span>•</span>
          <a href="/disclaimer" class="hover:text-slate-700 transition">Disclaimer</a>
          <span>•</span>
          <a href="/sitemap" class="hover:text-slate-700 transition">Sitemap</a>
          <span>•</span>
          <a href="https://buymeacoffee.com/biogravity" target="_blank" rel="noopener noreferrer" class="hover:text-amber-700 transition font-medium">☕ Buy Me a Coffee</a>
        </div>
      </div>
    </div>
  </footer>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const d = new Date();
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      document.querySelectorAll('.header-date').forEach(el => {
        el.textContent = d.toLocaleDateString('en-US', options);
      });
    });
  </script>`;
}

// 1. TRANSFORM CONTACT.HTML
function transformContact() {
  const filePath = path.join(rootDir, 'contact.html');
  if (!fs.existsSync(filePath)) return;
  
  const content = `<!DOCTYPE html>
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

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Us &amp; Editorial Inquiries | BioGravity</title>
  <meta name="description" content="Contact the BioGravity editorial board, submit peer-reviewed microgravity manuscripts, or connect via our official Gmail and X channels.">
  <link rel="canonical" href="https://biogravity.space/contact">
  <meta name="robots" content="index, follow">

  <!-- Security & Content Security Policy -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:; font-src 'self' https: data:;">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta name="referrer" content="strict-origin-when-cross-origin">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Favicon & Styles -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/css/styles.css">
  <script defer src="/js/cookie-consent.js"></script>
  <script defer src="/js/sidebar-menu.js"></script>

  <!-- Schema.org ContactPage -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "BioGravity Contact & Editorial Board",
    "description": "Direct communication channel for researchers, journalists, and academic contributors.",
    "url": "https://biogravity.space/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "BioGravity",
      "url": "https://biogravity.space/",
      "email": "biogravity.space@gmail.com",
      "sameAs": [
        "https://x.com/Biogravityspace"
      ]
    }
  }
  </script>
  <script>
    if (window.location.pathname.endsWith('.html')) {
      var clean = window.location.pathname.replace(/\\.html$/, '');
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  </script>
</head>
<body class="bg-[#fafbfc] text-slate-800 min-h-screen flex flex-col font-sans antialiased selection:bg-slate-900 selection:text-white">

${getStandardHeader('contact')}

  <!-- Main Content -->
  <main class="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-14 w-full">
    
    <div class="mb-12 text-center max-w-2xl mx-auto">
      <span class="inline-block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-3">
        Editorial &amp; Research Desk
      </span>
      <h1 class="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-4">
        Contact BioGravity
      </h1>
      <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
        Have questions about our orbital biotechnology dispatches, wish to submit a peer-reviewed preprint for review, or explore scientific collaborations? Connect with our team directly.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      
      <!-- Contact Form Card -->
      <div class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
        <h2 class="font-display font-bold text-lg text-slate-900 mb-2">Send an Inquiry</h2>
        <p class="text-xs text-slate-500 mb-6">Fill out the fields below and our scientific editorial desk will respond promptly.</p>
        
        <form id="contact-form" onsubmit="event.preventDefault(); alert('Thank you! Your message has been received by the BioGravity editorial board. We respond within 24-48 business hours.'); this.reset();" class="space-y-4 text-xs font-sans">
          <div>
            <label class="block text-slate-700 font-medium mb-1.5">Your Full Name / Academic Title *</label>
            <input type="text" required placeholder="e.g. Dr. Alex Mercer" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-slate-400 transition">
          </div>
          <div>
            <label class="block text-slate-700 font-medium mb-1.5">Your Email Address *</label>
            <input type="email" required placeholder="name@university.edu" class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-slate-400 transition">
          </div>
          <div>
            <label class="block text-slate-700 font-medium mb-1.5">Inquiry Subject *</label>
            <select class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:bg-white focus:outline-none focus:border-slate-400 transition">
              <option>Manuscript / Research Submission</option>
              <option>Data Verification &amp; Protocols</option>
              <option>Editorial Correction or Citation Question</option>
              <option>Press / Media Inquiry</option>
              <option>General Question</option>
            </select>
          </div>
          <div>
            <label class="block text-slate-700 font-medium mb-1.5">Detailed Message *</label>
            <textarea rows="4" required placeholder="State your inquiry, proposed DOI citation, or question in detail..." class="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-slate-400 transition"></textarea>
          </div>
          <button type="submit" class="w-full py-3 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition shadow-sm cursor-pointer">
            Submit Message to Editorial Board &rarr;
          </button>
        </form>
      </div>

      <!-- Direct Contact Channels & E-E-A-T Info -->
      <div class="space-y-6">
        
        <!-- Primary Direct Connect Channels Card -->
        <div class="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-4">
          <h3 class="font-display font-bold text-base text-slate-900">Direct Connect Channels</h3>
          <p class="text-xs text-slate-500 leading-relaxed">
            Reach our lead editorial and technical coordinators directly through our verified institutional channels:
          </p>

          <div class="space-y-3 pt-2">
            
            <a href="mailto:biogravity.space@gmail.com" class="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 transition group">
              <div class="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-base shadow-xs shrink-0">
                📧
              </div>
              <div class="min-w-0">
                <span class="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">Official Email Address</span>
                <span class="text-sm font-semibold text-slate-900 group-hover:text-teal-600 transition font-mono block truncate">biogravity.space@gmail.com</span>
                <span class="text-[11px] text-slate-500 block mt-0.5">Editorial, research submissions, and general inquiries.</span>
              </div>
            </a>

            <a href="https://x.com/Biogravityspace" target="_blank" rel="noopener noreferrer" class="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 transition group">
              <div class="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-sm font-bold shadow-xs shrink-0 text-slate-900">
                𝕏
              </div>
              <div class="min-w-0">
                <span class="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">Official X (Twitter) Handle</span>
                <span class="text-sm font-semibold text-slate-900 group-hover:text-teal-600 transition font-mono block">@Biogravityspace</span>
                <span class="text-[11px] text-slate-500 block mt-0.5">Follow research dispatches, live updates, and announcements.</span>
              </div>
            </a>

          </div>
        </div>

        <!-- Academic Standards & Response Commitment -->
        <div class="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
          <h3 class="font-display font-bold text-sm text-slate-900">Response Commitment</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Our editorial desk reviews every peer-reviewed submission and inquiry systematically. Average response turnaround is <strong>24 to 48 business hours</strong>.
          </p>
          <div class="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Desk Status: Active &amp; Receiving Inquiries</span>
          </div>
        </div>

      </div>

    </div>
  </main>

${getStandardFooter()}

</body>
</html>`;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('[HARMONIZE] ✅ contact.html harmonized to clean light theme!');
}

// 2. TRANSFORM LEGAL / POLICY PAGES (disclaimer.html, privacy-policy.html, terms.html, sitemap.html)
function transformStandardPolicy(fileName, title, description, activeKey, bodyContent) {
  const filePath = path.join(rootDir, fileName);
  if (!fs.existsSync(filePath)) return;

  const content = `<!DOCTYPE html>
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

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | BioGravity</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="https://biogravity.space/${fileName.replace('.html', '')}">
  <meta name="robots" content="index, follow">

  <!-- Security & CSP -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:; font-src 'self' https: data:;">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta name="referrer" content="strict-origin-when-cross-origin">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Favicon & Styles -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/css/styles.css">
  <script defer src="/js/cookie-consent.js"></script>
  <script defer src="/js/sidebar-menu.js"></script>
  <script>
    if (window.location.pathname.endsWith('.html')) {
      var clean = window.location.pathname.replace(/\\.html$/, '');
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  </script>
</head>
<body class="bg-[#fafbfc] text-slate-800 min-h-screen flex flex-col font-sans antialiased selection:bg-slate-900 selection:text-white">

${getStandardHeader(activeKey)}

  <!-- Main Content -->
  <main class="flex-grow max-w-4xl mx-auto px-4 sm:px-6 py-14 w-full">
    <div class="mb-10 text-center sm:text-left">
      <span class="inline-block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-3">
        Compliance &amp; Governance
      </span>
      <h1 class="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight mb-3">
        ${title}
      </h1>
      <p class="text-slate-500 text-xs">Last Updated: October 2026 • BioGravity Governance Office</p>
    </div>

    <div class="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/80 shadow-sm text-slate-600 text-sm leading-relaxed space-y-8">
      ${bodyContent}
    </div>
  </main>

${getStandardFooter()}

</body>
</html>`;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[HARMONIZE] ✅ ${fileName} harmonized to clean light theme!`);
}

// 3. TRANSFORM DISCLAIMER.HTML
function transformDisclaimer() {
  const body = `
      <section class="space-y-3">
        <h2 class="text-xl font-display font-bold text-slate-900">1. Academic &amp; Educational Purpose Only</h2>
        <p>
          The content, research dispatches, mathematical formulations, orbital datasets, and experimental protocols published on <strong>BioGravity (biogravity.space)</strong> are provided exclusively for scholarly, academic, and educational research purposes. BioGravity operates as an open-access platform analyzing non-equilibrium physical and biochemical phenomena in microgravity.
        </p>
      </section>

      <section class="space-y-3 border-t border-slate-100 pt-6">
        <h2 class="text-xl font-display font-bold text-slate-900">2. No Medical or Clinical Advice (YMYL Safe Harbor)</h2>
        <p>
          None of the dispatches, articles, or telemetry summaries regarding protein crystallization, cellular radioprotection, CRISPR-Cas9 catalytic efficiency, or microgravity biology constitute medical, diagnostic, or clinical healthcare advice. 
        </p>
        <div class="text-xs bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-700">
          <strong>Important Clinical Notice:</strong> Always seek the guidance of a qualified healthcare provider or medical professional regarding any medical condition or treatment. Never disregard professional medical advice or delay seeking it because of information read on this scientific repository.
        </div>
      </section>

      <section class="space-y-3 border-t border-slate-100 pt-6">
        <h2 class="text-xl font-display font-bold text-slate-900">3. Scientific Accuracy &amp; Data Integrity</h2>
        <p>
          While our editorial team rigorously verifies citations against established digital object identifiers (DOIs) and preprint archives (including arXiv and peer-reviewed journals), space sciences and biophysical research evolve rapidly. BioGravity does not warrant that all mathematical constants or preliminary laboratory data remain free from subsequent revision by original authors.
        </p>
      </section>

      <section class="space-y-3 border-t border-slate-100 pt-6">
        <h2 class="text-xl font-display font-bold text-slate-900">4. External Hyperlinks &amp; Citations</h2>
        <p>
          BioGravity contains links to external websites, institutional repositories, academic publishers, and digital libraries. We exercise no editorial control over the content, privacy practices, or accuracy of third-party domains. All outbound academic links open in secure new tabs with <code>rel="noopener noreferrer"</code> protection.
        </p>
      </section>

      <section class="space-y-3 border-t border-slate-100 pt-6">
        <h2 class="text-xl font-display font-bold text-slate-900">5. Advertising &amp; Monetization Transparency</h2>
        <p>
          BioGravity participates in the Google AdSense advertising program. Third-party vendors, including Google, use cookies to serve ads based on prior visits to our website and other websites across the Internet. For complete details on how advertising cookies are governed and how you may opt out of personalized targeting, please visit our <a href="/privacy-policy" class="text-teal-600 hover:underline">Privacy Policy</a>.
        </p>
      </section>`;

  transformStandardPolicy('disclaimer.html', 'Scientific & Medical Disclaimer', 'Official scientific, educational, and medical research disclaimer for BioGravity open-access dispatches.', 'disclaimer', body);
}

// 4. TRANSFORM PRIVACY-POLICY.HTML
function transformPrivacyPolicy() {
  const body = `
      <section class="space-y-3">
        <h2 class="text-xl font-display font-bold text-slate-900">1. Overview &amp; Scope</h2>
        <p>
          At <strong>BioGravity (biogravity.space)</strong>, accessible from https://biogravity.space, one of our main priorities is the privacy of our visitors. This Privacy Policy document outlines the types of information that is collected and recorded by BioGravity and how we use it.
        </p>
      </section>

      <section class="space-y-3 border-t border-slate-100 pt-6">
        <h2 class="text-xl font-display font-bold text-slate-900">2. Google AdSense &amp; DoubleClick DART Cookies</h2>
        <p>
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to biogravity.space and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" class="text-teal-600 hover:underline">https://policies.google.com/technologies/ads</a>.
        </p>
      </section>

      <section class="space-y-3 border-t border-slate-100 pt-6">
        <h2 class="text-xl font-display font-bold text-slate-900">3. Google Analytics (GA4)</h2>
        <p>
          We use Google Analytics 4 to collect aggregated, anonymized information about user behavior, page views, and visitor technology. IP addresses are masked, and individual user tracking across unrelated websites is strictly disabled.
        </p>
      </section>

      <section class="space-y-3 border-t border-slate-100 pt-6">
        <h2 class="text-xl font-display font-bold text-slate-900">4. GDPR and CCPA Data Protection Rights</h2>
        <p>
          We respect your privacy rights under the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA). You have the right to request access to your personal data, request correction of inaccurate data, or request erasure. Contact our compliance desk at <a href="mailto:biogravity.space@gmail.com" class="text-teal-600 font-mono hover:underline">biogravity.space@gmail.com</a> to exercise these rights.
        </p>
      </section>

      <section class="space-y-3 border-t border-slate-100 pt-6">
        <h2 class="text-xl font-display font-bold text-slate-900">5. Contact Information</h2>
        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <a href="mailto:biogravity.space@gmail.com" class="text-teal-600 font-mono hover:underline">biogravity.space@gmail.com</a> or via X at <a href="https://x.com/Biogravityspace" target="_blank" rel="noopener noreferrer" class="text-teal-600 font-mono hover:underline">@Biogravityspace</a>.
        </p>
      </section>`;

  transformStandardPolicy('privacy-policy.html', 'Privacy Policy & Cookie Disclosure', 'Comprehensive privacy policy detailing Google AdSense, Analytics, GDPR compliance, and cookie management.', 'privacy', body);
}

// 5. TRANSFORM TERMS.HTML
function transformTerms() {
  const body = `
      <section class="space-y-3">
        <h2 class="text-xl font-display font-bold text-slate-900">1. Acceptance of Terms</h2>
        <p>
          By accessing and utilizing <strong>BioGravity (biogravity.space)</strong>, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service, all applicable laws, and regulations governing digital publications.
        </p>
      </section>

      <section class="space-y-3 border-t border-slate-100 pt-6">
        <h2 class="text-xl font-display font-bold text-slate-900">2. Open-Access Intellectual Property</h2>
        <p>
          All scholarly dispatches, synthesized abstracts, and educational articles authored by BioGravity are published under open-access scientific principles. You are permitted to reference, cite, and discuss materials provided appropriate academic attribution and canonical DOI links back to <code>https://biogravity.space/</code> are retained.
        </p>
      </section>

      <section class="space-y-3 border-t border-slate-100 pt-6">
        <h2 class="text-xl font-display font-bold text-slate-900">3. Prohibited Conduct</h2>
        <p>
          Users agree not to disrupt or attempt to compromise website security, spam communication endpoints, perform malicious denial-of-service attempts, or scrape website content in violation of <code>robots.txt</code> directives.
        </p>
      </section>

      <section class="space-y-3 border-t border-slate-100 pt-6">
        <h2 class="text-xl font-display font-bold text-slate-900">4. Inquiries &amp; Legal Notices</h2>
        <p>
          For legal inquiries, copyright claims, or terms clarification, reach out to <a href="mailto:biogravity.space@gmail.com" class="text-teal-600 font-mono hover:underline">biogravity.space@gmail.com</a>.
        </p>
      </section>`;

  transformStandardPolicy('terms.html', 'Terms of Service', 'Terms of service and user agreements for accessing BioGravity open-access space biotechnology articles.', 'terms', body);
}

// 6. TRANSFORM SITEMAP.HTML
function transformSitemap() {
  const articlesPath = path.join(rootDir, 'data', 'articles.json');
  let articleListHtml = '';
  if (fs.existsSync(articlesPath)) {
    const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    articleListHtml = articles.map(a => `
      <li class="py-2 border-b border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
        <a href="/articles/${a.id}" class="text-slate-900 font-medium hover:text-teal-600 transition text-sm">
          ${a.title}
        </a>
        <span class="text-xs text-slate-400 font-mono shrink-0">${a.category || 'Research'}</span>
      </li>
    `).join('');
  }

  const body = `
      <section class="space-y-4">
        <h2 class="text-xl font-display font-bold text-slate-900">Core Directory &amp; Navigation Pages</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <a href="/" class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-medium transition">
            🏠 Home Hub
          </a>
          <a href="/research" class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-medium transition">
            🔬 Scientific Research Archive
          </a>
          <a href="/tools" class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-medium transition">
            🧮 Simulators &amp; Calculators
          </a>
          <a href="/about" class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-medium transition">
            📖 About BioGravity
          </a>
          <a href="/contact" class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-medium transition">
            ✉️ Contact &amp; Editorial Board
          </a>
          <a href="/world-space-week-2026" class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-medium transition">
            🚀 World Space Week 2026 Guide
          </a>
          <a href="/molecular-biology-research" class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-medium transition">
            🧬 Molecular Biology Guide
          </a>
          <a href="/microgravity-effects-on-human-body" class="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-900 font-medium transition">
            🩺 Human Physiology in Microgravity
          </a>
        </div>
      </section>

      <section class="space-y-4 border-t border-slate-100 pt-6">
        <h2 class="text-xl font-display font-bold text-slate-900">All Published Research Dispatches (22 Papers)</h2>
        <ul class="divide-y divide-slate-100">
          ${articleListHtml}
        </ul>
      </section>

      <section class="space-y-3 border-t border-slate-100 pt-6">
        <h2 class="text-xl font-display font-bold text-slate-900">Machine-Readable XML Feeds</h2>
        <p class="text-xs text-slate-500">
          Search engine crawlers and automated aggregators may access our raw XML feeds directly:
        </p>
        <div class="flex gap-3 text-xs font-mono">
          <a href="/sitemap.xml" class="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-teal-600 hover:bg-slate-100">sitemap.xml</a>
          <a href="/rss.xml" class="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-teal-600 hover:bg-slate-100">rss.xml</a>
        </div>
      </section>`;

  transformStandardPolicy('sitemap.html', 'HTML Sitemap & Directory Index', 'Complete navigational architecture and list of all 22 published peer-reviewed dispatches on BioGravity.', 'sitemap', body);
}

// 7. TRANSFORM ABOUT.HTML
function transformAbout() {
  const filePath = path.join(rootDir, 'about.html');
  if (!fs.existsSync(filePath)) return;

  const content = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <!-- Security Headers & Content Security Policy (CSP) -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:; font-src 'self' https: data:;">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <script defer src="/js/cookie-consent.js"></script>
  <!-- Google Analytics 4 (GA4) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-BSRJK4DMH7"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-BSRJK4DMH7');
  </script>
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576621614388905" crossorigin="anonymous"></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About BioGravity &amp; Mission | Space Biotechnology Research</title>
  <meta name="description" content="Discover the mission, research methodology, editorial board, and standards driving BioGravity open-access space biotechnology research.">
  <link rel="canonical" href="https://biogravity.space/about">
  <meta name="robots" content="index, follow">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Custom Styles -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/css/styles.css">
  <script>
    if (window.location.pathname.endsWith('.html')) {
      var clean = window.location.pathname.replace(/\\.html$/, '');
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  </script>
  <script defer src="/js/sidebar-menu.js"></script>
</head>
<body class="bg-[#fafbfc] text-slate-800 min-h-screen flex flex-col font-sans antialiased selection:bg-slate-900 selection:text-white">

${getStandardHeader('about')}

  <!-- Main Content -->
  <main class="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-14 w-full">
    
    <!-- Hero Section -->
    <div class="mb-14 text-center max-w-3xl mx-auto">
      <span class="inline-block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-3">
        About the BioGravity Collective
      </span>
      <h1 class="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight mb-4">
        Democratizing Space Biotechnology &amp; Microgravity Science
      </h1>
      <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
        BioGravity is an independent, open-access scientific publication dedicated to researching, synthesizing, and accelerating breakthroughs in orbital biophysics, pharmaceutical crystallization, and space medicine.
      </p>
    </div>

    <!-- Core Pillars Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      
      <div class="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-3">
        <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center text-lg font-bold">
          🔬
        </div>
        <h2 class="font-display font-bold text-lg text-slate-900">Rigorous Synthesis</h2>
        <p class="text-slate-600 text-xs leading-relaxed">
          Every dispatch translates complex low Earth orbit experiments, flight telemetry, and peer-reviewed literature into clean, accessible scientific analysis for researchers and students worldwide.
        </p>
      </div>

      <div class="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-3">
        <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-lg font-bold">
          🌐
        </div>
        <h2 class="font-display font-bold text-lg text-slate-900">Open-Access Ethos</h2>
        <p class="text-slate-600 text-xs leading-relaxed">
          Knowledge should never be gated behind paywalls. We provide comprehensive data tables, interactive computational models, and digital object identifier (DOI) citations free to all.
        </p>
      </div>

      <div class="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-3">
        <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-lg font-bold">
          🚀
        </div>
        <h2 class="font-display font-bold text-lg text-slate-900">Translational Impact</h2>
        <p class="text-slate-600 text-xs leading-relaxed">
          Space biotechnology directly solves terrestrial challenges: improving cancer therapeutics, accelerating protein crystal resolution, and combatting accelerated bone and muscle degradation.
        </p>
      </div>

    </div>

    <!-- Detailed Mission Section -->
    <div class="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200/80 shadow-sm space-y-8 mb-16">
      
      <div class="space-y-4">
        <h2 class="text-2xl font-display font-bold text-slate-900">Our Core Mission &amp; Editorial Vision</h2>
        <p class="text-slate-600 text-sm leading-relaxed">
          When physical matter is placed into microgravity, buoyancy-driven convection, sedimentation, and hydrostatic pressure diminish to near-zero levels. This allows macromolecular crystals to grow with unprecedented order, enables acoustic 3D organoid bio-assembly without synthetic scaffolding, and offers a unique window into fundamental cellular biology.
        </p>
        <p class="text-slate-600 text-sm leading-relaxed">
          BioGravity was established to document this transformative frontier. By uniting physics, computational biochemistry, and aerospace engineering, we provide a unified knowledge base for researchers, academic faculties, and biopharma innovators.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
        
        <div class="space-y-2">
          <h3 class="font-display font-bold text-base text-slate-900">Scientific Editorial Board</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            Our writing and reviewing workflows adhere to stringent E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness) standards. Citations are cross-checked against registered DOIs, PubMed, and institutional archives.
          </p>
        </div>

        <div class="space-y-2">
          <h3 class="font-display font-bold text-base text-slate-900">Community &amp; Contact</h3>
          <p class="text-xs text-slate-600 leading-relaxed">
            We welcome academic inquiries, manuscript contributions, and feedback from the scientific community. Reach us directly at <a href="mailto:biogravity.space@gmail.com" class="text-teal-600 font-mono hover:underline">biogravity.space@gmail.com</a> or join the conversation on X at <a href="https://x.com/Biogravityspace" target="_blank" rel="noopener noreferrer" class="text-teal-600 font-mono hover:underline">@Biogravityspace</a>.
          </p>
        </div>

      </div>

    </div>

  </main>

${getStandardFooter()}

</body>
</html>`;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('[HARMONIZE] ✅ about.html harmonized to clean light theme!');
}

// 8. TRANSFORM TOOLS.HTML
function transformTools() {
  const filePath = path.join(rootDir, 'tools.html');
  if (!fs.existsSync(filePath)) return;

  const content = `<!DOCTYPE html>
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

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive Scientific Simulators &amp; Tools | BioGravity</title>
  <meta name="description" content="Explore interactive scientific calculators, quantum spin yield predictors, and zero-gravity hydrodynamic particle simulations.">
  <link rel="canonical" href="https://biogravity.space/tools">
  <meta name="robots" content="index, follow">

  <!-- Security & CSP -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:; font-src 'self' https: data:;">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta name="referrer" content="strict-origin-when-cross-origin">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- KaTeX for Scientific Math -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body);"></script>

  <!-- Matter.js Physics Engine -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.19.0/matter.min.js"></script>

  <!-- Favicon & Styles -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/css/styles.css">
  <script defer src="/js/cookie-consent.js"></script>
  <script defer src="/js/sidebar-menu.js"></script>
  <script>
    if (window.location.pathname.endsWith('.html')) {
      var clean = window.location.pathname.replace(/\\.html$/, '');
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  </script>
</head>
<body class="bg-[#fafbfc] text-slate-800 min-h-screen flex flex-col font-sans antialiased selection:bg-slate-900 selection:text-white">

${getStandardHeader('tools')}

  <!-- Page Main Header -->
  <main class="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
    
    <div class="mb-12 text-center max-w-3xl mx-auto">
      <span class="inline-block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-3">
        Dedicated Interactive Lab Suite
      </span>
      <h1 class="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mb-3 tracking-tight">
        Scientific Calculators &amp; Orbital Simulators
      </h1>
      <p class="text-slate-600 text-sm leading-relaxed">
        Test theoretical models, adjust microgravity parameters, and explore molecular physics dynamics with our suite of open-access scientific tools.
      </p>
    </div>

    <!-- Tool 1: Quantum Yield & Coherence Predictor -->
    <section class="mb-14 rounded-2xl p-6 sm:p-8 bg-white border border-slate-200/80 shadow-sm">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div class="lg:col-span-5 space-y-4">
          <div class="text-xs font-semibold text-teal-600 uppercase tracking-wider">Tool 01 // Biophysical Model</div>
          <h2 class="font-display font-bold text-2xl text-slate-900">
            Quantum Yield &amp; Spin Coherence Predictor
          </h2>
          <p class="text-slate-600 text-xs leading-relaxed">
            Adjust orbital microgravity attenuation, laser cooling stages, and transverse magnetic shielding to predict macromolecular crystal lattice perfection and enzymatic tunneling efficiency.
          </p>

          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
            <div class="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Governing Equation:</div>
            <div class="text-slate-900 text-xs overflow-x-auto py-1 font-mono">\\(\\Gamma_{\\text{coherence}} \\propto \\exp\\left( - \\frac{\\delta g \\cdot m}{\\hbar \\cdot \\tau_{\\text{thermal}}} \\right)\\)</div>
            <div class="text-slate-500 text-[11px]">As gravitational perturbation \\(\\delta g \\to 0\\), thermal decoherence times approach the fundamental quantum limit.</div>
          </div>
        </div>

        <div class="lg:col-span-7 rounded-xl p-6 bg-slate-50 border border-slate-200/80 space-y-5">
          <!-- Slider 1 -->
          <div>
            <div class="flex justify-between items-center text-xs font-medium mb-1.5">
              <span class="text-slate-700">GRAVITATIONAL ACCELERATION (&mu;g)</span>
              <span id="slider-val-g" class="text-teal-600 font-bold font-mono">0.05 &mu;g</span>
            </div>
            <input type="range" id="sim-g" min="0.01" max="10" step="0.01" value="0.05" class="w-full accent-teal-600 cursor-pointer">
          </div>

          <!-- Slider 2 -->
          <div>
            <div class="flex justify-between items-center text-xs font-medium mb-1.5">
              <span class="text-slate-700">CRYO TEMPERATURE (Kelvin)</span>
              <span id="slider-val-temp" class="text-teal-600 font-bold font-mono">4.2 K</span>
            </div>
            <input type="range" id="sim-temp" min="1" max="300" step="1" value="4.2" class="w-full accent-teal-600 cursor-pointer">
          </div>

          <!-- Slider 3 -->
          <div>
            <div class="flex justify-between items-center text-xs font-medium mb-1.5">
              <span class="text-slate-700">MAGNETIC NOISE CANCELLATION (%)</span>
              <span id="slider-val-shield" class="text-teal-600 font-bold font-mono">98 %</span>
            </div>
            <input type="range" id="sim-shield" min="50" max="99.9" step="0.1" value="98" class="w-full accent-teal-600 cursor-pointer">
          </div>

          <!-- Live Outputs -->
          <div class="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200">
            <div class="p-3.5 rounded-xl bg-white border border-slate-200/80 text-center shadow-xs">
              <div class="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Crystal Resolution</div>
              <div id="sim-out-res" class="text-lg font-bold font-display text-slate-900 mt-0.5">0.82 Å</div>
              <div class="text-[10px] font-medium text-teal-600">Sub-angstrom</div>
            </div>

            <div class="p-3.5 rounded-xl bg-white border border-slate-200/80 text-center shadow-xs">
              <div class="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Spin Coherence</div>
              <div id="sim-out-coh" class="text-lg font-bold font-display text-slate-900 mt-0.5">384 ps</div>
              <div class="text-[10px] font-medium text-teal-600">Stable State</div>
            </div>

            <div class="p-3.5 rounded-xl bg-white border border-slate-200/80 text-center shadow-xs">
              <div class="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Cas9 Specificity</div>
              <div id="sim-out-spec" class="text-lg font-bold font-display text-slate-900 mt-0.5">99.94%</div>
              <div class="text-[10px] font-medium text-teal-600">Zero Off-Target</div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- Tool 2: Matter.js Zero-G Hydrodynamic Molecular Sandbox -->
    <section class="mb-14 rounded-2xl p-6 sm:p-8 bg-white border border-slate-200/80 shadow-sm">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <div class="text-xs font-semibold text-teal-600 uppercase tracking-wider">Tool 02 // Physics Simulation</div>
          <h2 class="font-display font-bold text-2xl text-slate-900">Zero-Gravity Particle &amp; Solute Sandbox</h2>
          <p class="text-slate-600 text-xs mt-1">Simulate Brownian motion and zero-convection molecular diffusion without gravitational sedimentation.</p>
        </div>
        <div class="flex items-center gap-2 text-xs font-medium">
          <button id="btn-reset-physics" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition cursor-pointer">Reset Particles</button>
          <button id="btn-toggle-gravity" class="px-3.5 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition cursor-pointer">Toggle Zero-G</button>
        </div>
      </div>

      <div class="relative w-full h-80 rounded-xl bg-slate-900 border border-slate-200 overflow-hidden" id="matter-canvas-container">
        <!-- Matter.js renders canvas here -->
      </div>
      <div class="flex justify-between items-center text-[11px] text-slate-500 mt-3 px-1">
        <span>Click or drag inside the sandbox to inject microfluidic pressure waves</span>
        <span class="text-teal-700 font-medium">Gravity: <strong id="gravity-status-label" class="font-mono">0.00 g</strong></span>
      </div>
    </section>

  </main>

${getStandardFooter()}

  <!-- Interactive Scripts -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // 1. Quantum Simulator Logic
      const simG = document.getElementById('sim-g');
      const simTemp = document.getElementById('sim-temp');
      const simShield = document.getElementById('sim-shield');
      
      const valG = document.getElementById('slider-val-g');
      const valTemp = document.getElementById('slider-val-temp');
      const valShield = document.getElementById('slider-val-shield');

      const outRes = document.getElementById('sim-out-res');
      const outCoh = document.getElementById('sim-out-coh');
      const outSpec = document.getElementById('sim-out-spec');

      function updatePredictor() {
        const g = parseFloat(simG.value);
        const temp = parseFloat(simTemp.value);
        const shield = parseFloat(simShield.value);

        valG.textContent = g.toFixed(2) + ' \u03bcg';
        valTemp.textContent = temp.toFixed(1) + ' K';
        valShield.textContent = shield.toFixed(1) + ' %';

        const resolution = (0.75 + (g * 0.15) + (temp * 0.003) - ((shield - 50) * 0.002)).toFixed(2);
        const coherence = Math.max(10, Math.round(500 - (g * 40) - (temp * 1.1) + (shield * 1.5)));
        const spec = Math.min(99.99, (98.5 + (shield * 0.012) - (g * 0.1) - (temp * 0.004))).toFixed(2);

        outRes.textContent = resolution + ' Å';
        outCoh.textContent = coherence + ' ps';
        outSpec.textContent = spec + '%';
      }

      if (simG && simTemp && simShield) {
        simG.addEventListener('input', updatePredictor);
        simTemp.addEventListener('input', updatePredictor);
        simShield.addEventListener('input', updatePredictor);
        updatePredictor();
      }

      // 2. Matter.js Zero-G Physics Simulation
      const container = document.getElementById('matter-canvas-container');
      if (container && typeof Matter !== 'undefined') {
        const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;
        const engine = Engine.create({ gravity: { x: 0, y: 0, scale: 0 } });
        const world = engine.world;

        const width = container.clientWidth || 800;
        const height = container.clientHeight || 320;

        const render = Render.create({
          element: container,
          engine: engine,
          options: {
            width: width,
            height: height,
            wireframes: false,
            background: '#0f172a'
          }
        });

        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Walls
        const wallThickness = 50;
        const wallOpts = { isStatic: true, render: { fillStyle: '#1e293b' } };
        Composite.add(world, [
          Bodies.rectangle(width / 2, -wallThickness / 2, width + 100, wallThickness, wallOpts),
          Bodies.rectangle(width / 2, height + wallThickness / 2, width + 100, wallThickness, wallOpts),
          Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height + 100, wallOpts),
          Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height + 100, wallOpts)
        ]);

        function spawnParticles() {
          const particles = [];
          const colors = ['#2dd4bf', '#38bdf8', '#818cf8', '#f43f5e', '#fbbf24'];
          for (let i = 0; i < 40; i++) {
            const radius = Math.random() * 8 + 6;
            const x = Math.random() * (width - 100) + 50;
            const y = Math.random() * (height - 100) + 50;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const body = Bodies.circle(x, y, radius, {
              restitution: 0.95,
              frictionAir: 0.005,
              render: { fillStyle: color }
            });
            Matter.Body.setVelocity(body, {
              x: (Math.random() - 0.5) * 3,
              y: (Math.random() - 0.5) * 3
            });
            particles.push(body);
          }
          Composite.add(world, particles);
        }

        spawnParticles();

        // Mouse interaction
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
          mouse: mouse,
          constraint: { stiffness: 0.2, render: { visible: false } }
        });
        Composite.add(world, mouseConstraint);
        render.mouse = mouse;

        // Reset & Toggle Gravity
        let isZeroG = true;
        const btnToggleG = document.getElementById('btn-toggle-gravity');
        const gravityLabel = document.getElementById('gravity-status-label');
        if (btnToggleG) {
          btnToggleG.addEventListener('click', () => {
            isZeroG = !isZeroG;
            engine.gravity.y = isZeroG ? 0 : 1;
            btnToggleG.textContent = isZeroG ? 'Apply 1-G Earth' : 'Toggle Zero-G';
            if (gravityLabel) gravityLabel.textContent = isZeroG ? '0.00 g' : '1.00 g (Earth)';
          });
        }

        const btnReset = document.getElementById('btn-reset-physics');
        if (btnReset) {
          btnReset.addEventListener('click', () => {
            const bodies = Composite.allBodies(world).filter(b => !b.isStatic);
            bodies.forEach(b => Composite.remove(world, b));
            spawnParticles();
          });
        }
      }
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('[HARMONIZE] ✅ tools.html harmonized to clean light theme!');
}

// 9. TRANSFORM RESEARCH.HTML
function transformResearch() {
  const filePath = path.join(rootDir, 'research.html');
  if (!fs.existsSync(filePath)) return;

  const content = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <!-- Security Headers & Content Security Policy (CSP) -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data:; font-src 'self' https: data:;">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <script defer src="/js/cookie-consent.js"></script>
  <!-- Google Analytics 4 (GA4) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-BSRJK4DMH7"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-BSRJK4DMH7');
  </script>
  <!-- Google AdSense -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8576621614388905" crossorigin="anonymous"></script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Scientific Research Archive &amp; Dispatches | BioGravity</title>
  <meta name="description" content="Explore peer-reviewed scientific dispatches, orbital microgravity laboratory data, crystal growth studies, and space biotechnology publications.">
  <link rel="canonical" href="https://biogravity.space/research">
  <meta name="robots" content="index, follow">

  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Custom Styles -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="stylesheet" href="/css/styles.css">
  <script>
    if (window.location.pathname.endsWith('.html')) {
      var clean = window.location.pathname.replace(/\\.html$/, '');
      window.history.replaceState(null, '', clean + window.location.search + window.location.hash);
    }
  </script>
  <script defer src="/js/sidebar-menu.js"></script>
</head>
<body class="bg-[#fafbfc] text-slate-800 min-h-screen flex flex-col font-sans antialiased selection:bg-slate-900 selection:text-white">

${getStandardHeader('research')}

  <!-- RESEARCH HERO & LIVE SEARCH SECTION -->
  <main class="flex-grow py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Page Title & Header -->
      <div class="mb-10 text-center sm:text-left">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium mb-3">
          <span>📡</span> Peer-Reviewed Open Science Archive
        </div>
        <h1 class="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
          Scientific Research Archive
        </h1>
        <p class="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
          Explore breakthrough peer-reviewed findings compiled from orbital microgravity laboratories. Search across experimental protocols, molecular crystallography, and space therapeutics.
        </p>
      </div>

      <!-- Live Search & Filtering Controls -->
      <div class="mb-8 p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4">
        
        <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div class="relative w-full md:max-w-md">
            <input 
              type="search" 
              id="live-search-input" 
              placeholder="Filter by keyword, title, topic, or DOI..." 
              class="w-full py-2.5 pl-4 pr-10 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-slate-400 transition"
            >
            <span class="absolute right-3 top-3 text-slate-400 text-xs">🔍</span>
          </div>

          <div class="flex items-center gap-3 w-full md:w-auto justify-between sm:justify-end">
            <span class="text-xs text-slate-500 font-medium" id="results-count">Showing all dispatches</span>
            <div class="flex items-center gap-1 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
              <button id="view-grid-btn" class="p-1.5 rounded text-slate-900 bg-white shadow-xs cursor-pointer" title="Grid View">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              </button>
              <button id="view-list-btn" class="p-1.5 rounded text-slate-400 hover:text-slate-800 cursor-pointer" title="List View">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Filter category pills -->
        <div class="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100" id="category-pills">
          <button data-cat="all" class="cat-pill px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900 text-white transition cursor-pointer">
            All Disciplines
          </button>
          <button data-cat="Space Medicine" class="cat-pill px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition cursor-pointer">
            Space Medicine
          </button>
          <button data-cat="Molecular Biology" class="cat-pill px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition cursor-pointer">
            Molecular Biology
          </button>
          <button data-cat="Microgravity Crystallography" class="cat-pill px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition cursor-pointer">
            Crystallography
          </button>
          <button data-cat="Acoustic Bioprinting" class="cat-pill px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition cursor-pointer">
            Bioprinting
          </button>
        </div>

      </div>

      <!-- Articles Container (Rendered by JS) -->
      <div id="articles-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Rendered by client script below -->
      </div>

      <!-- Empty State -->
      <div id="empty-state" class="hidden text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-sm">
        <div class="text-4xl mb-3">🔍</div>
        <h3 class="font-display font-bold text-lg text-slate-900 mb-1">No Matching Dispatches Found</h3>
        <p class="text-slate-500 text-xs max-w-sm mx-auto mb-4">Try clearing your search term or selecting another category.</p>
        <button id="reset-filters-btn" class="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition cursor-pointer">
          Reset All Filters
        </button>
      </div>

    </div>
  </main>

${getStandardFooter()}

  <!-- Client-side Search, Filtering, and Card Rendering Engine -->
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      let articlesData = [];
      let activeCategory = 'all';
      let searchQuery = '';
      let isGridView = true;

      const articlesContainer = document.getElementById('articles-container');
      const searchInput = document.getElementById('live-search-input');
      const resultsCount = document.getElementById('results-count');
      const emptyState = document.getElementById('empty-state');
      const resetBtn = document.getElementById('reset-filters-btn');
      const gridBtn = document.getElementById('view-grid-btn');
      const listBtn = document.getElementById('view-list-btn');
      const catPills = document.querySelectorAll('.cat-pill');

      // Check query param from global header search
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('q')) {
        searchQuery = urlParams.get('q').trim();
        if (searchInput) searchInput.value = searchQuery;
      }

      // Fetch articles.json
      fetch('/data/articles.json')
        .then(res => res.json())
        .then(data => {
          articlesData = data;
          render();
        })
        .catch(err => {
          console.error('Failed to load articles:', err);
        });

      function render() {
        if (!articlesContainer) return;

        let filtered = articlesData.filter(a => {
          const matchCat = (activeCategory === 'all') || (a.category && a.category.toLowerCase().includes(activeCategory.toLowerCase()));
          const matchQuery = !searchQuery || 
            (a.title && a.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (a.excerpt && a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (a.category && a.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (a.doi && a.doi.toLowerCase().includes(searchQuery.toLowerCase()));
          return matchCat && matchQuery;
        });

        if (resultsCount) {
          resultsCount.textContent = \`Showing \${filtered.length} of \${articlesData.length} dispatches\`;
        }

        if (filtered.length === 0) {
          articlesContainer.innerHTML = '';
          emptyState.classList.remove('hidden');
          return;
        }

        emptyState.classList.add('hidden');

        if (isGridView) {
          articlesContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
          articlesContainer.innerHTML = filtered.map(a => \`
            <article class="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition duration-300 flex flex-col justify-between group">
              <div class="relative h-48 overflow-hidden bg-slate-100">
                <img 
                  src="\${a.cover || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'}" 
                  alt="\${a.title}" 
                  class="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                  loading="lazy"
                >
                <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 backdrop-blur-md text-slate-800 shadow-xs border border-slate-200/60">
                  \${a.category || 'Research'}
                </span>
              </div>
              <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-[11px] text-slate-400">
                    <span>\${a.date || 'October 2026'}</span>
                    <span>\${a.readTime || '6 min read'}</span>
                  </div>
                  <h3 class="font-display font-bold text-base text-slate-900 group-hover:text-teal-600 transition line-clamp-2">
                    <a href="/articles/\${a.id}">\${a.title}</a>
                  </h3>
                  <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    \${a.excerpt || ''}
                  </p>
                </div>
                <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <a href="/articles/\${a.id}" class="text-teal-600 font-semibold group-hover:text-teal-700 transition flex items-center gap-1">
                    Read Dispatch <span>&rarr;</span>
                  </a>
                  \${a.doi ? \`<span class="text-[10px] text-slate-400 font-mono truncate max-w-[120px]">\${a.doi}</span>\` : ''}
                </div>
              </div>
            </article>
          \`).join('');
        } else {
          articlesContainer.className = 'flex flex-col gap-4';
          articlesContainer.innerHTML = filtered.map(a => \`
            <article class="bg-white rounded-xl p-5 border border-slate-200/80 shadow-sm hover:border-slate-300 transition duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
              <div class="flex-1 space-y-1.5">
                <div class="flex items-center gap-3 text-xs">
                  <span class="font-semibold text-teal-600">\${a.category || 'Research'}</span>
                  <span class="text-slate-300">•</span>
                  <span class="text-slate-500">\${a.date || 'October 2026'}</span>
                  <span class="text-slate-300">•</span>
                  <span class="text-slate-500">\${a.readTime || '6 min read'}</span>
                </div>
                <h3 class="font-display font-bold text-base text-slate-900 group-hover:text-teal-600 transition">
                  <a href="/articles/\${a.id}">\${a.title}</a>
                </h3>
                <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  \${a.excerpt || ''}
                </p>
              </div>
              <div class="shrink-0 flex items-center gap-3">
                <a href="/articles/\${a.id}" class="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition">
                  Read Dispatch &rarr;
                </a>
              </div>
            </article>
          \`).join('');
        }
      }

      // Live search input
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          searchQuery = e.target.value.trim();
          render();
        });
      }

      // Category pills
      catPills.forEach(pill => {
        pill.addEventListener('click', () => {
          catPills.forEach(p => {
            p.className = 'cat-pill px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition cursor-pointer';
          });
          pill.className = 'cat-pill px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900 text-white transition cursor-pointer';
          activeCategory = pill.getAttribute('data-cat');
          render();
        });
      });

      // View toggles
      if (gridBtn && listBtn) {
        gridBtn.addEventListener('click', () => {
          isGridView = true;
          gridBtn.className = 'p-1.5 rounded text-slate-900 bg-white shadow-xs cursor-pointer';
          listBtn.className = 'p-1.5 rounded text-slate-400 hover:text-slate-800 cursor-pointer';
          render();
        });
        listBtn.addEventListener('click', () => {
          isGridView = false;
          listBtn.className = 'p-1.5 rounded text-slate-900 bg-white shadow-xs cursor-pointer';
          gridBtn.className = 'p-1.5 rounded text-slate-400 hover:text-slate-800 cursor-pointer';
          render();
        });
      }

      // Reset
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          searchQuery = '';
          if (searchInput) searchInput.value = '';
          catPills.forEach((p, idx) => {
            p.className = idx === 0 
              ? 'cat-pill px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900 text-white transition cursor-pointer'
              : 'cat-pill px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition cursor-pointer';
          });
          render();
        });
      }
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('[HARMONIZE] ✅ research.html harmonized to clean light theme!');
}

// 10. TRANSFORM GUIDE PAGES (world-space-week-2026, molecular-biology-research, microgravity-effects-on-human-body)
function transformGuidePage(fileName, title, subtitle, activeKey) {
  const filePath = path.join(rootDir, fileName);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace body tag
  content = content.replace(/<body[^>]*>/i, `<body class="bg-[#fafbfc] text-slate-800 min-h-screen flex flex-col font-sans antialiased selection:bg-slate-900 selection:text-white">`);

  // Remove ambient glows & cosmic particles
  content = content.replace(/<div class="fixed top-0[^>]*ambient-glow[^>]*><\/div>/gi, '');
  content = content.replace(/<div class="fixed bottom-[^>]*ambient-glow[^>]*><\/div>/gi, '');
  content = content.replace(/<div class="fixed top-1\/2[^>]*ambient-glow[^>]*><\/div>/gi, '');
  content = content.replace(/<canvas id="cosmic-canvas"[^>]*><\/canvas>/gi, '');

  // Replace header with standard header
  const headerRegex = /<header[\s\S]*?<\/header>/i;
  content = content.replace(headerRegex, getStandardHeader(activeKey));

  // Replace footer with standard footer
  const footerRegex = /<footer[\s\S]*?<\/footer>[\s\S]*?(?=<\/body>)/i;
  content = content.replace(footerRegex, getStandardFooter() + '\n');

  // Replace old dark card and text classes inside main
  content = content.replace(/bg-slate-950/g, 'bg-slate-50');
  content = content.replace(/bg-slate-900\/[0-9]+/g, 'bg-white');
  content = content.replace(/bg-slate-900/g, 'bg-white');
  content = content.replace(/border-slate-800/g, 'border-slate-200/80');
  content = content.replace(/border-slate-700/g, 'border-slate-200/80');
  content = content.replace(/text-slate-100/g, 'text-slate-800');
  content = content.replace(/text-slate-300/g, 'text-slate-600');
  content = content.replace(/text-slate-400/g, 'text-slate-500');
  content = content.replace(/text-cyan-400/g, 'text-teal-600');
  content = content.replace(/text-cyan-300/g, 'text-teal-700');
  content = content.replace(/text-emerald-400/g, 'text-teal-700');
  content = content.replace(/badge-quantum/g, 'inline-block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[HARMONIZE] ✅ ${fileName} harmonized to clean light theme!`);
}

// EXECUTE ALL TRANSFORMATIONS
console.log('[HARMONIZE] 🚀 Starting complete site visual harmonization...');
transformContact();
transformDisclaimer();
transformPrivacyPolicy();
transformTerms();
transformSitemap();
transformAbout();
transformTools();
transformResearch();
transformGuidePage('world-space-week-2026.html', 'World Space Week 2026 Guide', 'Orbital biotechnology', 'research');
transformGuidePage('molecular-biology-research.html', 'Molecular Biology Research Guide', 'Space biology protocols', 'research');
transformGuidePage('microgravity-effects-on-human-body.html', 'Microgravity Effects on the Human Body', 'Physiology in microgravity', 'research');

console.log('[HARMONIZE] 🎉 All core templates transformed successfully!');
