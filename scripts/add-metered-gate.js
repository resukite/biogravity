const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'auth-system.js');
let code = fs.readFileSync(filePath, 'utf8');

const meteredGateFunction = `
  /* -------------------------------------------------------------------------
   * 11. Metered Read & Scroll Gate (Medium / Substack Pattern)
   * ------------------------------------------------------------------------- */
  function initReadingMeter() {
    // If user is already authenticated, never gate
    if (currentUser) return;

    // Detect organic search referrer (Google, Bing, Yahoo, DuckDuckGo, Ecosia)
    const ref = document.referrer || '';
    const isOrganicReferrer = ref.includes('google.') || 
                              ref.includes('bing.') || 
                              ref.includes('duckduckgo.') || 
                              ref.includes('yahoo.') || 
                              ref.includes('ecosia.');

    if (isOrganicReferrer && !sessionStorage.getItem('biogravity_first_landing')) {
      sessionStorage.setItem('biogravity_first_landing', 'organic');
    }

    const isArticle = window.location.pathname.includes('/articles/') || document.querySelector('article') !== null;
    const currentSlug = window.location.pathname.replace(/^\\/articles\\//, '').replace(/\\.html$/, '');

    // Track unique articles viewed
    let viewed = [];
    try {
      viewed = JSON.parse(localStorage.getItem('biogravity_articles_viewed') || '[]');
    } catch(e) {}

    if (isArticle && currentSlug && !viewed.includes(currentSlug)) {
      viewed.push(currentSlug);
      localStorage.setItem('biogravity_articles_viewed', JSON.stringify(viewed));
    }

    // Google Organic exemption:
    // First-time organic search visitors get full, uninterrupted reading on their searched article
    const isFirstOrganicLanding = (sessionStorage.getItem('biogravity_first_landing') === 'organic') && (viewed.length <= 1);
    if (isFirstOrganicLanding) {
      return;
    }

    // Second post / extended browsing trigger (viewed >= 2)
    if (viewed.length >= 2) {
      const gateKey = 'biogravity_gate_shown_' + (currentSlug || 'page');
      if (!sessionStorage.getItem(gateKey)) {
        let triggered = false;

        const triggerGate = () => {
          if (triggered || currentUser) return;
          triggered = true;
          sessionStorage.setItem(gateKey, 'true');

          const modalTitle = document.getElementById('auth-modal-title');
          const modalSubtitle = document.getElementById('auth-modal-subtitle');
          if (modalTitle) modalTitle.textContent = "Enjoying BioGravity's Research?";
          if (modalSubtitle) modalSubtitle.textContent = "Join our free open-access platform to continue reading, save papers to your library, and receive weekly science briefings.";

          openAuthModal('auth');
        };

        // Scroll listener: triggers when scrolling 35% down the article
        const onScroll = () => {
          const scrollPercent = (window.scrollY + window.innerHeight) / (document.documentElement.scrollHeight || 1);
          if (scrollPercent >= 0.35) {
            triggerGate();
            window.removeEventListener('scroll', onScroll);
          }
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        // Fallback timer: if reading on 2nd article for > 5 seconds
        setTimeout(() => {
          if (!triggered && isArticle) {
            triggerGate();
            window.removeEventListener('scroll', onScroll);
          }
        }, 5000);
      }
    }
  }
`;

// Insert before renderUI()
const targetInsert = '  function renderUI() {';
if (!code.includes('initReadingMeter')) {
  code = code.replace(targetInsert, meteredGateFunction + '\n  function renderUI() {');
  
  // Call initReadingMeter inside start()
  const targetStart = '  function start() {\n    mountDOM();\n    initFirebase();\n  }';
  const targetStartCRLF = '  function start() {\r\n    mountDOM();\r\n    initFirebase();\r\n  }';
  const newStart = '  function start() {\n    mountDOM();\n    initFirebase();\n    initReadingMeter();\n  }';
  const newStartCRLF = '  function start() {\r\n    mountDOM();\r\n    initFirebase();\r\n    initReadingMeter();\r\n  }';

  if (code.includes(targetStart)) {
    code = code.replace(targetStart, newStart);
  } else if (code.includes(targetStartCRLF)) {
    code = code.replace(targetStartCRLF, newStartCRLF);
  }

  fs.writeFileSync(filePath, code, 'utf8');
  console.log('[SUCCESS] Injected metered read & scroll gate into js/auth-system.js');
} else {
  console.log('[INFO] initReadingMeter already present');
}
