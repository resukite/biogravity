/**
 * BioGravity Main Application Controller
 * Handles navigation, mobile drawer, live orbital telemetry ticker,
 * Google Sheet connection modal, toast alerts, and quantum audio/visual FX.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initOrbitalTelemetry();
  initHeaderSearch();
});

// 1. Navigation & Mobile Drawer
function initNavigation() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('hidden');
    });
  }

  if (closeDrawerBtn && mobileDrawer) {
    closeDrawerBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('hidden');
    });
  }

  // Active page link highlight
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-cyan-400', 'border-b-2', 'border-cyan-400', 'font-semibold');
      link.classList.remove('text-slate-300');
    }
  });
}

// 2. Real-time Orbital Telemetry Ticker
function initOrbitalTelemetry() {
  const telemetryAlt = document.getElementById('telemetry-alt');
  const telemetryCoherence = document.getElementById('telemetry-coherence');
  const telemetryG = document.getElementById('telemetry-g');

  if (!telemetryAlt && !telemetryCoherence) return;

  let baseAlt = 418.42;
  let baseCoherence = 99.41;
  let baseG = 1.18;

  setInterval(() => {
    // Micro-fluctuations simulating Low Earth Orbit station sensors
    const deltaAlt = (Math.random() * 0.04 - 0.02);
    const deltaCoh = (Math.random() * 0.06 - 0.03);
    const deltaG = (Math.random() * 0.04 - 0.02);

    baseAlt = +(baseAlt + deltaAlt).toFixed(2);
    baseCoherence = +Math.min(99.98, Math.max(98.8, baseCoherence + deltaCoh)).toFixed(2);
    baseG = +Math.max(0.9, baseG + deltaG).toFixed(2);

    if (telemetryAlt) telemetryAlt.textContent = `${baseAlt} km`;
    if (telemetryCoherence) telemetryCoherence.textContent = `${baseCoherence}%`;
    if (telemetryG) telemetryG.textContent = `${baseG} × 10⁻⁶ g`;
  }, 2200);
}

// 3. Global Header Search Input
function initHeaderSearch() {
  const headerSearchInput = document.getElementById('header-search');
  if (!headerSearchInput) return;

  headerSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const q = headerSearchInput.value.trim();
      if (q) {
        window.location.href = `research.html?q=${encodeURIComponent(q)}`;
      }
    }
  });
}

// 5. Sci-Fi Quantum Toast Notification System
function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `pointer-events-auto p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 transform translate-y-4 opacity-0 flex items-start gap-3 text-sm`;

  if (type === 'success') {
    toast.className += ' bg-slate-900/95 border-emerald-500/50 text-slate-100 shadow-[0_0_20px_rgba(16,185,129,0.2)]';
  } else if (type === 'error') {
    toast.className += ' bg-slate-900/95 border-rose-500/50 text-slate-100 shadow-[0_0_20px_rgba(244,63,94,0.2)]';
  } else if (type === 'warning') {
    toast.className += ' bg-slate-900/95 border-amber-500/50 text-slate-100 shadow-[0_0_20px_rgba(245,158,11,0.2)]';
  } else {
    toast.className += ' bg-slate-900/95 border-cyan-500/50 text-slate-100 shadow-[0_0_20px_rgba(6,182,212,0.2)]';
  }

  toast.innerHTML = `
    <div class="mt-0.5">
      ${type === 'success' ? '⚡' : type === 'error' ? '⚠️' : '💠'}
    </div>
    <div class="flex-1 font-sans">
      <div class="font-semibold text-xs uppercase tracking-wider text-cyan-400 mb-0.5">BioGravity System</div>
      <div class="text-slate-300 text-xs">${message}</div>
    </div>
  `;

  toastContainer.appendChild(toast);

  // Trigger entrance
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  // Auto dismiss
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 4200);
}

window.showToast = showToast;
