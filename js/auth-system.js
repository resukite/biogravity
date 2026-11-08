/**
 * BioGravity Unified Auth, Reader Library & Newsletter System
 * -------------------------------------------------------------
 * Provides:
 * 1. Header Navigation Sign-in / Avatar Dropdown
 * 2. Auth Modal (Google 1-Tap, Email login, Newsletter opt-in)
 * 3. Saved Articles / Reading List drawer & in-article bookmark buttons
 * 4. Newsletter subscription engine with instant feedback & sync
 * 5. Firebase Authentication & Firestore integration with Mock/Local fallback
 */

(function () {
  'use strict';

  // Storage Keys
  const USER_KEY = 'biogravity_user';
  const BOOKMARKS_KEY = 'biogravity_saved_articles';
  const NEWSLETTER_KEY = 'biogravity_newsletter_subscribed';

  // State
  let currentUser = null;
  let savedArticles = [];
  let isNewsletterSubscribed = false;
  let isFirebaseLive = false;
  let authInstance = null;
  let dbInstance = null;

  // Load initial local state
  try {
    const rawUser = localStorage.getItem(USER_KEY);
    if (rawUser) currentUser = JSON.parse(rawUser);

    const rawBookmarks = localStorage.getItem(BOOKMARKS_KEY);
    if (rawBookmarks) savedArticles = JSON.parse(rawBookmarks);

    isNewsletterSubscribed = localStorage.getItem(NEWSLETTER_KEY) === 'true';
  } catch (e) {
    console.warn('[BioGravity Auth] Storage read failed:', e);
  }

  // Check if live Firebase credentials exist
  const cfg = window.BIOGRAVITY_FIREBASE_CONFIG || {};
  const hasRealKeys = cfg.apiKey && cfg.apiKey.trim() !== '' && !cfg.apiKey.includes('YOUR_');

  /* -------------------------------------------------------------------------
   * 1. Firebase Initialization (Async)
   * ------------------------------------------------------------------------- */
  async function initFirebase() {
    if (!hasRealKeys) {
      console.log('[BioGravity Auth] Running in Local / Preview Mode. Add your API key in /js/firebase-config.js to activate live Firebase.');
      renderUI();
      return;
    }

    try {
      const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js');
      const { 
        getAuth, 
        onAuthStateChanged, 
        GoogleAuthProvider, 
        signInWithPopup, 
        signOut,
        sendSignInLinkToEmail
      } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js');
      const { 
        getFirestore, 
        doc, 
        getDoc, 
        setDoc, 
        updateDoc, 
        arrayUnion, 
        arrayRemove 
      } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');

      const app = initializeApp(cfg);
      authInstance = getAuth(app);
      dbInstance = getFirestore(app);
      isFirebaseLive = true;

      // Google Provider
      const googleProvider = new GoogleAuthProvider();

      // Listen to Auth State
      onAuthStateChanged(authInstance, async (fbUser) => {
        if (fbUser) {
          currentUser = {
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || fbUser.email.split('@')[0],
            photoURL: fbUser.photoURL || null,
            isAdmin: (window.BIOGRAVITY_ADMIN_EMAILS || []).includes(fbUser.email)
          };
          localStorage.setItem(USER_KEY, JSON.stringify(currentUser));

          // Sync user profile & bookmarks with Firestore
          try {
            const userRef = doc(dbInstance, 'users', fbUser.uid);
            const snap = await getDoc(userRef);
            if (snap.exists()) {
              const data = snap.data();
              if (data.bookmarks && Array.isArray(data.bookmarks)) {
                savedArticles = data.bookmarks;
                localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(savedArticles));
              }
              if (data.newsletterSubscribed) {
                isNewsletterSubscribed = true;
                localStorage.setItem(NEWSLETTER_KEY, 'true');
              }
            } else {
              // Create user record
              await setDoc(userRef, {
                email: fbUser.email,
                name: fbUser.displayName || '',
                photoURL: fbUser.photoURL || '',
                createdAt: new Date().toISOString(),
                newsletterSubscribed: isNewsletterSubscribed,
                bookmarks: savedArticles
              });
            }
          } catch (syncErr) {
            console.warn('[BioGravity Auth] Firestore sync error:', syncErr);
          }
        } else {
          // Logged out
          if (isFirebaseLive) {
            currentUser = null;
            localStorage.removeItem(USER_KEY);
          }
        }
        renderUI();
      });

      // Attach global login handlers
      window.bioGravitySignInWithGoogle = async () => {
        try {
          const res = await signInWithPopup(authInstance, googleProvider);
          const optin = document.getElementById('auth-newsletter-optin');
          const shouldSubscribe = optin ? optin.checked : true;
          if (shouldSubscribe && res && res.user && res.user.email) {
            await subscribeNewsletter(res.user.email);
          }
          closeAuthModal();
          showNotification('Welcome to BioGravity!', 'success');
        } catch (err) {
          console.error('[BioGravity Auth] Google Sign-In error:', err);
          showNotification(err.message || 'Sign in failed', 'error');
        }
      };

      window.bioGravitySignOut = async () => {
        try {
          await signOut(authInstance);
          currentUser = null;
          localStorage.removeItem(USER_KEY);
          renderUI();
          showNotification('Signed out successfully', 'info');
        } catch (err) {
          console.error('[BioGravity Auth] Sign out error:', err);
        }
      };

    } catch (err) {
      console.warn('[BioGravity Auth] Could not load Firebase SDK, falling back to local mode:', err);
      renderUI();
    }
  }

  /* -------------------------------------------------------------------------
   * 2. Mock / Local Mode Handlers (When testing without Firebase Keys)
   * ------------------------------------------------------------------------- */
  function mockSignIn(email, name, newsletterOptIn) {
    currentUser = {
      uid: 'user_' + Date.now(),
      email: email,
      displayName: name || email.split('@')[0],
      photoURL: null,
      isAdmin: (window.BIOGRAVITY_ADMIN_EMAILS || []).includes(email)
    };
    localStorage.setItem(USER_KEY, JSON.stringify(currentUser));

    if (newsletterOptIn) {
      subscribeNewsletter(email);
    }

    renderUI();
    closeAuthModal();
    showNotification(`Welcome back, ${currentUser.displayName}!`, 'success');
  }

  function mockSignOut() {
    currentUser = null;
    localStorage.removeItem(USER_KEY);
    renderUI();
    showNotification('Signed out', 'info');
  }

  /* -------------------------------------------------------------------------
   * 3. Newsletter Subscription Engine
   * ------------------------------------------------------------------------- */
  async function subscribeNewsletter(email) {
    if (!email || !email.includes('@')) {
      showNotification('Please enter a valid email address.', 'error');
      return false;
    }

    isNewsletterSubscribed = true;
    localStorage.setItem(NEWSLETTER_KEY, 'true');

    // Save to Firestore if connected
    if (isFirebaseLive && dbInstance) {
      try {
        const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
        const subscriberRef = doc(dbInstance, 'newsletter_subscribers', email.toLowerCase().trim());
        await setDoc(subscriberRef, {
          email: email.toLowerCase().trim(),
          subscribedAt: new Date().toISOString(),
          source: 'web_portal',
          userId: currentUser ? currentUser.uid : null
        }, { merge: true });
      } catch (err) {
        console.warn('[Newsletter] Cloud sync error:', err);
      }
    }

    // Keep in localStorage subscriber pool
    try {
      const existing = JSON.parse(localStorage.getItem('biogravity_subscribers_list') || '[]');
      if (!existing.includes(email)) {
        existing.push(email);
        localStorage.setItem('biogravity_subscribers_list', JSON.stringify(existing));
      }
    } catch (e) {}

    renderUI();
    showNotification('🎉 You\'re subscribed to the BioGravity Dispatch!', 'success');
    return true;
  }

  /* -------------------------------------------------------------------------
   * 4. Article Bookmarks / Reading List Engine
   * ------------------------------------------------------------------------- */
  function toggleBookmark(article) {
    if (!article || !article.slug) return;

    const existingIndex = savedArticles.findIndex(a => a.slug === article.slug);
    if (existingIndex > -1) {
      // Remove
      savedArticles.splice(existingIndex, 1);
      showNotification('Removed from Saved Articles', 'info');
    } else {
      // Add
      savedArticles.unshift({
        slug: article.slug,
        title: article.title || document.title.replace(' | BioGravity', ''),
        url: article.url || window.location.pathname,
        savedAt: new Date().toISOString()
      });
      showNotification('📑 Article saved to your library!', 'success');
    }

    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(savedArticles));
    updateBookmarkButtons();
    renderSavedArticlesList();

    // Firestore sync if connected
    if (isFirebaseLive && dbInstance && currentUser) {
      import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js').then(({ doc, setDoc }) => {
        setDoc(doc(dbInstance, 'users', currentUser.uid), { bookmarks: savedArticles }, { merge: true });
      }).catch(console.warn);
    }
  }

  function isBookmarked(slug) {
    return savedArticles.some(a => a.slug === slug);
  }

  /* -------------------------------------------------------------------------
   * 5. UI DOM Mounting & Rendering
   * ------------------------------------------------------------------------- */
  function mountDOM() {
    // 1. Mount Header Auth Pill
    mountHeaderAuthPill();

    // 2. Mount Modals & Drawers if not already present
    if (!document.getElementById('biogravity-auth-modal')) {
      const modalHtml = `
      <!-- ============================================================== -->
      <!-- AUTH & NEWSLETTER MODAL -->
      <!-- ============================================================== -->
      <div id="biogravity-auth-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-300" aria-hidden="true" role="dialog">
        <div class="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform scale-95 transition-all duration-300" id="auth-modal-card">
          
          <!-- Modal Header Banner -->
          <div class="relative px-6 pt-7 pb-6 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white">
            <button id="auth-modal-close-btn" class="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer" aria-label="Close">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div class="flex items-center gap-2.5 mb-2">
              <div class="w-7 h-7 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 text-sm">⚛️</div>
              <span class="font-display font-bold text-base tracking-tight text-white">BioGravity<span class="text-teal-400">.</span></span>
            </div>
            <h3 class="text-xl font-display font-bold text-white tracking-tight" id="auth-modal-title">Join Open-Access Science</h3>
            <p class="text-xs text-slate-300 mt-1" id="auth-modal-subtitle">Save research papers, personalize your feed, and access the science dispatch.</p>
            
            <!-- Tab Switcher -->
            <div class="flex items-center gap-2 mt-5 p-1 bg-white/10 rounded-xl backdrop-blur-sm text-xs font-medium">
              <button id="tab-auth-btn" class="flex-1 py-1.5 px-3 rounded-lg bg-white text-slate-900 shadow-sm transition cursor-pointer">Sign In / Register</button>
              <button id="tab-newsletter-btn" class="flex-1 py-1.5 px-3 rounded-lg text-slate-300 hover:text-white transition cursor-pointer">📬 Newsletter</button>
            </div>
          </div>

          <!-- Tab Content 1: Auth -->
          <div id="tab-auth-content" class="p-6 space-y-4">
            <!-- Google 1-Tap Button -->
            <button id="btn-google-auth" class="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-medium text-xs shadow-xs transition group cursor-pointer">
              <svg class="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div class="relative flex items-center justify-center my-3">
              <div class="border-t border-slate-200 w-full"></div>
              <span class="bg-white px-3 text-[10px] uppercase font-mono text-slate-400 tracking-wider">or email</span>
            </div>

            <!-- Email Input Form -->
            <form id="auth-email-form" class="space-y-3">
              <div>
                <label for="auth-email-input" class="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="auth-email-input" 
                  required 
                  placeholder="scientist@institute.org" 
                  class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 transition"
                >
              </div>

              <button type="submit" class="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-sm transition cursor-pointer">
                Continue with Email &rarr;
              </button>
            </form>

            <!-- Prominent Newsletter Card under Sign In (Always Pre-Ticked by Default) -->
            <div class="p-3.5 rounded-2xl bg-teal-50/90 border border-teal-200/90 select-none">
              <label class="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" id="auth-newsletter-optin" checked class="mt-0.5 rounded border-teal-400 text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer">
                <span class="text-xs text-slate-800 leading-snug">
                  <span class="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>📬</span> Subscribe to The BioGravity Dispatch
                  </span>
                  <span class="block text-[11px] text-slate-600 mt-0.5">
                    Free weekly briefing on microgravity breakthroughs &amp; space biotech. You can untick anytime.
                  </span>
                </span>
              </label>
            </div>

            <div class="text-[10px] text-slate-400 text-center pt-2">
              By continuing, you agree to our <a href="/terms" class="underline hover:text-slate-600">Terms</a> &amp; <a href="/privacy-policy" class="underline hover:text-slate-600">Privacy Policy</a>.
            </div>
          </div>

          <!-- Tab Content 2: Newsletter Dedicated -->
          <div id="tab-newsletter-content" class="p-6 space-y-4 hidden">
            <div class="p-4 rounded-2xl bg-teal-50/70 border border-teal-100/80">
              <div class="flex items-center gap-2 text-teal-900 font-semibold text-xs mb-1">
                <span>🚀</span>
                <span>The BioGravity Weekly Dispatch</span>
              </div>
              <p class="text-[11px] text-teal-800 leading-relaxed">
                Every Thursday, our editorial desk analyzes groundbreaking findings in space pharmacology, cellular adaptation to microgravity, and orbital laboratories. Free &amp; Open Access.
              </p>
            </div>

            <form id="standalone-newsletter-form" class="space-y-3">
              <div>
                <label for="newsletter-standalone-input" class="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">Your Email</label>
                <input 
                  type="email" 
                  id="newsletter-standalone-input" 
                  required 
                  placeholder="researcher@university.edu" 
                  class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 transition"
                >
              </div>

              <button type="submit" class="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium text-xs shadow-sm transition flex items-center justify-center gap-2 cursor-pointer">
                <span>Subscribe Free</span>
                <span>&rarr;</span>
              </button>
            </form>

            <div class="flex items-center justify-center gap-4 text-[10px] text-slate-400 pt-1">
              <span>✓ Zero spam</span>
              <span>•</span>
              <span>✓ 1-click unsubscribe</span>
              <span>•</span>
              <span>✓ CC-BY 4.0 Open Science</span>
            </div>
          </div>

        </div>
      </div>

      <!-- ============================================================== -->
      <!-- SAVED ARTICLES (READING LIST) DRAWER -->
      <!-- ============================================================== -->
      <div id="biogravity-library-overlay" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 opacity-0 pointer-events-none transition-opacity duration-300" aria-hidden="true"></div>
      
      <aside id="biogravity-library-drawer" class="fixed top-0 right-0 h-full w-full max-w-sm sm:max-w-md bg-white border-l border-slate-200/80 shadow-2xl z-50 transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col" aria-label="Saved Articles Library" role="dialog" aria-modal="true">
        <!-- Header -->
        <div class="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
          <div class="flex items-center gap-2.5">
            <span class="text-base">📑</span>
            <div>
              <h4 class="font-display font-bold text-base text-slate-900">Saved Articles</h4>
              <p class="text-[10px] text-slate-400 font-medium">Your personal research reading list</p>
            </div>
          </div>
          <button id="biogravity-library-close-btn" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Library Content -->
        <div class="p-5 flex-1 overflow-y-auto space-y-3" id="library-articles-container">
          <!-- Populated dynamically -->
        </div>

        <!-- Drawer Footer -->
        <div class="p-4 border-t border-slate-100 bg-slate-50 text-xs text-slate-500 flex items-center justify-between">
          <span id="saved-articles-count">0 items saved</span>
          <button id="clear-all-saved-btn" class="text-slate-400 hover:text-rose-600 text-[11px] transition">Clear Library</button>
        </div>
      </aside>

      <!-- Toast Notification Container -->
      <div id="biogravity-toast-container" class="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none"></div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHtml);
      attachModalEvents();
    }

    // 3. Inject Newsletter Promotion Card into Sidebar Drawer if present
    injectSidebarNewsletterCard();

    // 4. Inject In-Article Floating Bookmark Button on Article Pages
    injectArticleBookmarkAction();
  }

  /* -------------------------------------------------------------------------
   * 6. Header Auth Component (Mounting & State Rendering)
   * ------------------------------------------------------------------------- */
  function mountHeaderAuthPill() {
    let container = document.getElementById('header-auth-container');
    if (!container) {
      // Find header actions right before #nav-sidebar-toggle or mobile menu
      const menuBtn = document.getElementById('nav-sidebar-toggle');
      if (menuBtn && menuBtn.parentNode) {
        container = document.createElement('div');
        container.id = 'header-auth-container';
        container.className = 'flex items-center';
        menuBtn.parentNode.insertBefore(container, menuBtn);
      }
    }
    renderHeaderAuth();
  }

  function renderHeaderAuth() {
    const container = document.getElementById('header-auth-container');
    if (!container) return;

    if (currentUser) {
      const initials = (currentUser.displayName || currentUser.email || 'U').substring(0, 2).toUpperCase();
      const photo = currentUser.photoURL;

      container.innerHTML = `
        <div class="relative group mr-2">
          <button id="user-avatar-btn" class="flex items-center gap-2 py-1 px-1.5 sm:px-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition cursor-pointer text-xs font-medium" aria-label="User Account Menu">
            ${photo 
              ? `<img src="${photo}" alt="Avatar" class="w-6 h-6 rounded-full object-cover">`
              : `<div class="w-6 h-6 rounded-full bg-teal-600 text-white font-bold text-[10px] flex items-center justify-center">${initials}</div>`
            }
            <span class="hidden md:inline text-slate-800 max-w-[100px] truncate">${currentUser.displayName}</span>
            <svg class="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>

          <!-- Dropdown Menu -->
          <div id="user-dropdown-menu" class="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 hidden z-50 text-xs">
            <div class="px-4 py-2 border-b border-slate-100">
              <div class="font-semibold text-slate-900 truncate">${currentUser.displayName}</div>
              <div class="text-[10px] text-slate-400 truncate font-mono">${currentUser.email}</div>
            </div>

            <button id="menu-open-library-btn" class="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center justify-between cursor-pointer">
              <span class="flex items-center gap-2"><span>📑</span> Saved Articles</span>
              <span class="px-1.5 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">${savedArticles.length}</span>
            </button>

            <button id="menu-open-newsletter-btn" class="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 flex items-center justify-between cursor-pointer">
              <span class="flex items-center gap-2"><span>📬</span> Newsletter</span>
              <span class="text-[10px] ${isNewsletterSubscribed ? 'text-teal-600 font-semibold' : 'text-slate-400'}">
                ${isNewsletterSubscribed ? 'Active' : 'Subscribe'}
              </span>
            </button>

            ${currentUser.isAdmin ? `
            <a href="/outreach" class="w-full text-left px-4 py-2 hover:bg-slate-50 text-indigo-600 font-medium flex items-center gap-2">
              <span>🛡️</span> Editorial Desk
            </a>
            ` : ''}

            <div class="border-t border-slate-100 my-1"></div>

            <button id="menu-signout-btn" class="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2 cursor-pointer">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      `;

      // Bind dropdown toggle
      const avatarBtn = container.querySelector('#user-avatar-btn');
      const menu = container.querySelector('#user-dropdown-menu');
      if (avatarBtn && menu) {
        avatarBtn.onclick = (e) => {
          e.stopPropagation();
          menu.classList.toggle('hidden');
        };
        document.addEventListener('click', () => menu.classList.add('hidden'));
      }

      const openLib = container.querySelector('#menu-open-library-btn');
      if (openLib) openLib.onclick = openLibraryDrawer;

      const openNews = container.querySelector('#menu-open-newsletter-btn');
      if (openNews) openNews.onclick = () => openAuthModal('newsletter');

      const signOutBtn = container.querySelector('#menu-signout-btn');
      if (signOutBtn) {
        signOutBtn.onclick = () => {
          if (isFirebaseLive && window.bioGravitySignOut) {
            window.bioGravitySignOut();
          } else {
            mockSignOut();
          }
        };
      }

    } else {
      // Logged Out: Show Sign In Button
      container.innerHTML = `
        <button id="nav-signin-btn" class="mr-2 flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white transition text-xs font-medium shadow-xs cursor-pointer group" aria-label="Sign In">
          <svg class="w-3.5 h-3.5 text-slate-300 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <span>Sign In</span>
        </button>
      `;

      const signInBtn = container.querySelector('#nav-signin-btn');
      if (signInBtn) {
        signInBtn.onclick = () => openAuthModal('auth');
      }
    }
  }

  /* -------------------------------------------------------------------------
   * 7. Sidebar Drawer Integration (Newsletter Box)
   * ------------------------------------------------------------------------- */
  function injectSidebarNewsletterCard() {
    const drawerContent = document.querySelector('#nav-sidebar-drawer .space-y-7');
    if (!drawerContent || document.getElementById('sidebar-newsletter-box')) return;

    const box = document.createElement('div');
    box.id = 'sidebar-newsletter-box';
    box.className = 'rounded-2xl p-4 bg-gradient-to-br from-slate-900 to-teal-950 text-white space-y-3';
    box.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-[11px] font-semibold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
          <span>📬</span> BioGravity Dispatch
        </span>
        <span class="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white font-medium">Weekly</span>
      </div>
      <p class="text-[11px] text-slate-300 leading-relaxed">
        Curated space biology briefings, orbital medicine updates &amp; biotech breakthroughs.
      </p>
      <form id="sidebar-newsletter-form" class="space-y-2">
        <input 
          type="email" 
          id="sidebar-newsletter-input" 
          placeholder="your.email@domain.com" 
          required 
          class="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
        <button type="submit" class="w-full py-2 px-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5">
          <span>Subscribe Free</span>
          <span>&rarr;</span>
        </button>
      </form>
    `;

    // Insert as first or second item in drawer
    drawerContent.insertBefore(box, drawerContent.children[1] || null);

    const form = box.querySelector('#sidebar-newsletter-form');
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const input = box.querySelector('#sidebar-newsletter-input');
        if (input) {
          subscribeNewsletter(input.value);
          input.value = '';
        }
      };
    }
  }

  /* -------------------------------------------------------------------------
   * 8. Article Page Floating Bookmark Action
   * ------------------------------------------------------------------------- */
  function injectArticleBookmarkAction() {
    const isArticlePage = window.location.pathname.includes('/articles/') || document.querySelector('article') !== null;
    if (!isArticlePage) return;

    if (document.getElementById('floating-article-actions')) return;

    const slug = window.location.pathname.replace(/^\/articles\//, '').replace(/\.html$/, '');
    const title = document.querySelector('h1')?.textContent?.trim() || document.title;

    const actions = document.createElement('div');
    actions.id = 'floating-article-actions';
    actions.className = 'fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-white/95 backdrop-blur-md border border-slate-200/90 py-2 px-3.5 rounded-full shadow-lg';

    actions.innerHTML = `
      <button id="action-bookmark-btn" class="flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-teal-600 transition cursor-pointer" title="Save this article">
        <span class="bookmark-icon text-sm">${isBookmarked(slug) ? '★' : '☆'}</span>
        <span class="bookmark-text">${isBookmarked(slug) ? 'Saved' : 'Save'}</span>
      </button>
      <span class="text-slate-300">|</span>
      <button id="action-newsletter-btn" class="flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-teal-600 transition cursor-pointer" title="Subscribe to Newsletter">
        <span>📬</span>
        <span class="hidden sm:inline">Dispatch</span>
      </button>
    `;

    document.body.appendChild(actions);

    const bmBtn = actions.querySelector('#action-bookmark-btn');
    if (bmBtn) {
      bmBtn.onclick = () => {
        if (!currentUser) {
          openAuthModal('auth');
          showNotification('Sign in to save this research paper to your account!', 'info');
          return;
        }
        toggleBookmark({ slug, title, url: window.location.pathname });
      };
    }

    const newsBtn = actions.querySelector('#action-newsletter-btn');
    if (newsBtn) {
      newsBtn.onclick = () => openAuthModal('newsletter');
    }
  }

  function updateBookmarkButtons() {
    const slug = window.location.pathname.replace(/^\/articles\//, '').replace(/\.html$/, '');
    const bmBtn = document.getElementById('action-bookmark-btn');
    if (bmBtn) {
      const active = isBookmarked(slug);
      const icon = bmBtn.querySelector('.bookmark-icon');
      const text = bmBtn.querySelector('.bookmark-text');
      if (icon) icon.textContent = active ? '★' : '☆';
      if (text) text.textContent = active ? 'Saved' : 'Save';
      if (active) {
        bmBtn.classList.add('text-teal-600');
        bmBtn.classList.remove('text-slate-700');
      } else {
        bmBtn.classList.remove('text-teal-600');
        bmBtn.classList.add('text-slate-700');
      }
    }
  }

  /* -------------------------------------------------------------------------
   * 9. Modal Interactions & Event Handlers
   * ------------------------------------------------------------------------- */
  function openAuthModal(defaultTab = 'auth') {
    const modal = document.getElementById('biogravity-auth-modal');
    const card = document.getElementById('auth-modal-card');
    if (!modal || !card) return;

    // Always ensure newsletter checkbox is ticked by default whenever anyone opens login
    const optin = document.getElementById('auth-newsletter-optin');
    if (optin) optin.checked = true;

    switchTab(defaultTab);

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
    card.classList.remove('scale-95');
    card.classList.add('scale-100');
    document.body.classList.add('overflow-hidden');
  }

  function closeAuthModal() {
    const modal = document.getElementById('biogravity-auth-modal');
    const card = document.getElementById('auth-modal-card');
    if (!modal || !card) return;

    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    card.classList.add('scale-95');
    card.classList.remove('scale-100');
    document.body.classList.remove('overflow-hidden');
  }

  function switchTab(tab) {
    const tabAuthBtn = document.getElementById('tab-auth-btn');
    const tabNewsBtn = document.getElementById('tab-newsletter-btn');
    const authContent = document.getElementById('tab-auth-content');
    const newsContent = document.getElementById('tab-newsletter-content');
    const title = document.getElementById('auth-modal-title');
    const subtitle = document.getElementById('auth-modal-subtitle');

    if (tab === 'newsletter') {
      tabNewsBtn?.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
      tabNewsBtn?.classList.remove('text-slate-300');
      tabAuthBtn?.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
      tabAuthBtn?.classList.add('text-slate-300');

      authContent?.classList.add('hidden');
      newsContent?.classList.remove('hidden');

      if (title) title.textContent = 'BioGravity Science Dispatch';
      if (subtitle) subtitle.textContent = 'Weekly orbital biotech & microgravity briefings direct to your inbox.';
    } else {
      tabAuthBtn?.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
      tabAuthBtn?.classList.remove('text-slate-300');
      tabNewsBtn?.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
      tabNewsBtn?.classList.add('text-slate-300');

      authContent?.classList.remove('hidden');
      newsContent?.classList.add('hidden');

      if (title) title.textContent = 'Join Open-Access Science';
      if (subtitle) subtitle.textContent = 'Save research papers, personalize your feed, and access the science dispatch.';
    }
  }

  function openLibraryDrawer() {
    renderSavedArticlesList();
    const overlay = document.getElementById('biogravity-library-overlay');
    const drawer = document.getElementById('biogravity-library-drawer');
    if (!overlay || !drawer) return;

    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.classList.add('opacity-100', 'pointer-events-auto');
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    document.body.classList.add('overflow-hidden');
  }

  function closeLibraryDrawer() {
    const overlay = document.getElementById('biogravity-library-overlay');
    const drawer = document.getElementById('biogravity-library-drawer');
    if (!overlay || !drawer) return;

    overlay.classList.add('opacity-0', 'pointer-events-none');
    overlay.classList.remove('opacity-100', 'pointer-events-auto');
    drawer.classList.add('translate-x-full');
    drawer.classList.remove('translate-x-0');
    document.body.classList.remove('overflow-hidden');
  }

  function renderSavedArticlesList() {
    const container = document.getElementById('library-articles-container');
    const countEl = document.getElementById('saved-articles-count');
    if (!container) return;

    if (countEl) countEl.textContent = `${savedArticles.length} item${savedArticles.length === 1 ? '' : 's'} saved`;

    if (savedArticles.length === 0) {
      container.innerHTML = `
        <div class="text-center py-12 px-4 space-y-3">
          <div class="text-3xl">📚</div>
          <h5 class="font-display font-semibold text-slate-800 text-sm">No saved articles yet</h5>
          <p class="text-xs text-slate-500 max-w-xs mx-auto">
            Browse our research papers or news and click the bookmark button to build your personal library.
          </p>
          <a href="/research" class="inline-block mt-2 py-2 px-4 rounded-xl bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition">
            Explore Research Archive &rarr;
          </a>
        </div>
      `;
      return;
    }

    container.innerHTML = savedArticles.map((item, idx) => `
      <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition group flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <a href="${item.url}" class="font-medium text-xs text-slate-900 group-hover:text-teal-600 transition line-clamp-2 leading-snug">
            ${item.title}
          </a>
          <div class="flex items-center gap-2 mt-2 text-[10px] text-slate-400 font-mono">
            <span>Saved ${new Date(item.savedAt).toLocaleDateString()}</span>
          </div>
        </div>
        <button data-remove-slug="${item.slug}" class="text-slate-400 hover:text-rose-600 transition p-1" title="Remove">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
        </button>
      </div>
    `).join('');

    // Bind remove buttons
    container.querySelectorAll('[data-remove-slug]').forEach(btn => {
      btn.onclick = () => {
        const slug = btn.getAttribute('data-remove-slug');
        toggleBookmark({ slug });
      };
    });
  }

  function attachModalEvents() {
    // Global delegate for any Sign In button on the page
    document.addEventListener('click', (e) => {
      if (e.target.closest('#nav-signin-btn, #mobile-drawer-signin-btn, .trigger-auth-btn, [data-action="signin"]')) {
        e.preventDefault();
        openAuthModal('auth');
      }
    });

    // Close button & overlay
    document.getElementById('auth-modal-close-btn')?.addEventListener('click', closeAuthModal);
    document.getElementById('biogravity-auth-modal')?.addEventListener('click', (e) => {
      if (e.target.id === 'biogravity-auth-modal') closeAuthModal();
    });

    // Tab buttons
    document.getElementById('tab-auth-btn')?.addEventListener('click', () => switchTab('auth'));
    document.getElementById('tab-newsletter-btn')?.addEventListener('click', () => switchTab('newsletter'));

    // Google Sign In Button
    document.getElementById('btn-google-auth')?.addEventListener('click', () => {
      if (isFirebaseLive && window.bioGravitySignInWithGoogle) {
        window.bioGravitySignInWithGoogle();
      } else {
        // Mock prompt
        const dummyEmail = prompt('Enter a test email for Google login simulation:', 'researcher@biogravity.space');
        if (dummyEmail) {
          mockSignIn(dummyEmail, dummyEmail.split('@')[0], true);
        }
      }
    });

    // Email Form
    document.getElementById('auth-email-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('auth-email-input')?.value;
      const optIn = document.getElementById('auth-newsletter-optin')?.checked;
      if (email) {
        mockSignIn(email, email.split('@')[0], optIn);
      }
    });

    // Standalone Newsletter Form
    document.getElementById('standalone-newsletter-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-standalone-input')?.value;
      if (email) {
        subscribeNewsletter(email);
        closeAuthModal();
      }
    });

    // Library Drawer
    document.getElementById('biogravity-library-close-btn')?.addEventListener('click', closeLibraryDrawer);
    document.getElementById('biogravity-library-overlay')?.addEventListener('click', closeLibraryDrawer);
    document.getElementById('clear-all-saved-btn')?.addEventListener('click', () => {
      if (confirm('Clear all saved articles?')) {
        savedArticles = [];
        localStorage.setItem(BOOKMARKS_KEY, '[]');
        renderSavedArticlesList();
        updateBookmarkButtons();
      }
    });

    // Escape Key listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAuthModal();
        closeLibraryDrawer();
      }
    });
  }

  function showNotification(msg, type = 'info') {
    const container = document.getElementById('biogravity-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const bgClass = type === 'success' ? 'bg-teal-900 border-teal-500/40 text-teal-100'
                  : type === 'error' ? 'bg-rose-900 border-rose-500/40 text-rose-100'
                  : 'bg-slate-900 border-slate-700 text-slate-100';

    toast.className = `pointer-events-auto px-4 py-3 rounded-2xl border shadow-xl text-xs flex items-center gap-2 transform translate-y-3 opacity-0 transition-all duration-300 ${bgClass}`;
    toast.innerHTML = `
      <span>${type === 'success' ? '✓' : type === 'error' ? '⚠️' : 'ℹ️'}</span>
      <span>${msg}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-3', 'opacity-0');
    });

    setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  /* -------------------------------------------------------------------------
   * 10. Master Initialization
   * ------------------------------------------------------------------------- */
  function renderUI() {
    renderHeaderAuth();
    updateBookmarkButtons();
  }

  function start() {
    mountDOM();
    initFirebase();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  // Global exposure for external buttons (e.g. newsletter banners on pages)
  window.BioGravityAuth = {
    openAuth: () => openAuthModal('auth'),
    openNewsletter: () => openAuthModal('newsletter'),
    openLibrary: openLibraryDrawer,
    toggleBookmark: toggleBookmark,
    subscribeNewsletter: subscribeNewsletter
  };

})();
