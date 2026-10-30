(function() {
  'use strict';
  const STORAGE_KEY = 'biogravity_cookie_consent_v1';

  // Ensure gtag and dataLayer are ready
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function() {
    window.dataLayer.push(arguments);
  };

  function updateGoogleConsent(choice) {
    if (typeof window.gtag === 'function') {
      if (choice === 'all') {
        window.gtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted',
          'analytics_storage': 'granted'
        });
      } else {
        window.gtag('consent', 'update', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'granted'
        });
      }
    }
  }

  function initCookieConsent() {
    // If a certified TCF CMP (e.g. Google Funding Choices from AdSense) is active, don't double-prompt
    if (window.__tcfapi || window.googlefc) {
      return;
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        updateGoogleConsent(parsed.choice);
      } catch (e) {}
      return;
    }

    // Default to privacy-preserving state pending user selection
    updateGoogleConsent('essential');

    const banner = document.createElement('div');
    banner.id = 'biogravity-cookie-banner';
    banner.className = 'fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 p-5 rounded-2xl bg-slate-900/95 border border-cyan-500/40 backdrop-blur-xl shadow-2xl text-slate-200 text-xs font-sans animate-fade-in transition-all duration-300';
    banner.innerHTML = `
    <div class="flex items-start gap-3">
      <div class="text-2xl mt-0.5">🍪</div>
      <div class="flex-1 space-y-2">
        <div class="flex items-center justify-between">
          <div class="font-display font-bold text-white text-sm">Privacy &amp; Cookie Compliance</div>
          <button id="cookie-close-dismiss" class="w-6 h-6 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer text-xs" aria-label="Dismiss banner">✕</button>
        </div>
        <p class="text-slate-400 text-xs leading-relaxed">
          BioGravity uses cookies and telemetry to analyze scientific traffic, remember preferences, and serve personalized Google AdSense dispatches in compliance with GDPR &amp; CCPA.
        </p>
        <div class="flex flex-wrap gap-2 pt-2">
          <button id="cookie-accept-all" class="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-lg shadow-cyan-950/50 cursor-pointer">
            Accept All Cookies
          </button>
          <button id="cookie-reject-optional" class="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition cursor-pointer">
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

    function dismiss(choice) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice: choice, timestamp: new Date().toISOString() }));
      updateGoogleConsent(choice);
      banner.style.opacity = '0';
      banner.style.transform = 'translateY(20px)';
      setTimeout(() => banner.remove(), 300);
    }

    const acceptBtn = document.getElementById('cookie-accept-all');
    if (acceptBtn) acceptBtn.addEventListener('click', () => dismiss('all'));

    const rejectBtn = document.getElementById('cookie-reject-optional');
    if (rejectBtn) rejectBtn.addEventListener('click', () => dismiss('essential'));

    const closeBtn = document.getElementById('cookie-close-dismiss');
    if (closeBtn) closeBtn.addEventListener('click', () => dismiss('essential'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
  } else {
    initCookieConsent();
  }
})();
