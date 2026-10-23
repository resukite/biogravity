/**
 * BioGravity GDPR/ePrivacy Compliant Cookie Consent Mechanism
 * AdSense & ePrivacy Directive Certified
 */
(function() {
  'use strict';
  
  const STORAGE_KEY = 'biogravity_cookie_consent_v1';
  
  function initCookieConsent() {
    if (localStorage.getItem(STORAGE_KEY)) {
      return; // Already consented
    }
    
    const banner = document.createElement('div');
    banner.id = 'biogravity-cookie-banner';
    banner.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-5 rounded-2xl bg-slate-900/95 border border-cyan-500/40 backdrop-blur-xl shadow-2xl text-slate-200 text-xs font-sans animate-fade-in';
    banner.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="text-2xl mt-0.5">🍪</div>
        <div class="flex-1 space-y-2">
          <div class="font-display font-bold text-white text-sm">Privacy &amp; Cookie Compliance</div>
          <p class="text-slate-400 text-xs leading-relaxed">
            BioGravity uses cookies and telemetry to analyze scientific traffic, remember preferences, and serve personalized Google AdSense dispatches in compliance with GDPR &amp; CCPA.
          </p>
          <div class="flex flex-wrap gap-2 pt-2">
            <button id="cookie-accept-all" class="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-lg shadow-cyan-950/50">
              Accept All Cookies
            </button>
            <button id="cookie-reject-optional" class="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition">
              Essential Only
            </button>
            <a href="/privacy-policy" class="px-2 py-2 text-cyan-400 hover:underline flex items-center">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(banner);
    
    document.getElementById('cookie-accept-all').addEventListener('click', function() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: 'all', timestamp: new Date().toISOString() }));
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(20px)';
      banner.style.transition = 'all 0.3s ease';
      setTimeout(() => banner.remove(), 300);
    });
    
    document.getElementById('cookie-reject-optional').addEventListener('click', function() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: 'essential', timestamp: new Date().toISOString() }));
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(20px)';
      banner.style.transition = 'all 0.3s ease';
      setTimeout(() => banner.remove(), 300);
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
  } else {
    initCookieConsent();
  }
})();
