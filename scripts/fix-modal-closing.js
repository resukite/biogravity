const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'auth-system.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Update onAuthStateChanged to immediately close modal when user is signed in
const targetAuthState = `        if (fbUser) {
          currentUser = {
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || fbUser.email.split('@')[0],
            photoURL: fbUser.photoURL || null,
            isAdmin: (window.BIOGRAVITY_ADMIN_EMAILS || []).includes(fbUser.email)
          };
          localStorage.setItem(USER_KEY, JSON.stringify(currentUser));`;

const newAuthState = `        if (fbUser) {
          currentUser = {
            uid: fbUser.uid,
            email: fbUser.email,
            displayName: fbUser.displayName || fbUser.email.split('@')[0],
            photoURL: fbUser.photoURL || null,
            isAdmin: (window.BIOGRAVITY_ADMIN_EMAILS || []).includes(fbUser.email)
          };
          localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
          
          // Instantly close the modal upon successful login!
          closeAuthModal();`;

code = code.replace(targetAuthState, newAuthState).replace(targetAuthState.replace(/\n/g, '\r\n'), newAuthState.replace(/\n/g, '\r\n'));

// 2. Enhance openAuthModal and closeAuthModal to guarantee clean disappearance
const targetModals = `  function openAuthModal(defaultTab = 'auth') {
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
  }`;

const newModals = `  function openAuthModal(defaultTab = 'auth') {
    const modal = document.getElementById('biogravity-auth-modal');
    const card = document.getElementById('auth-modal-card');
    if (!modal) return;

    // Reset button states
    const googleBtn = document.getElementById('btn-google-auth');
    if (googleBtn) {
      googleBtn.disabled = false;
      googleBtn.style.opacity = '1';
    }

    // Always ensure newsletter checkbox is ticked by default whenever anyone opens login
    const optin = document.getElementById('auth-newsletter-optin');
    if (optin) optin.checked = true;

    switchTab(defaultTab);

    modal.style.display = 'flex';
    // Force browser reflow for instant animation
    void modal.offsetWidth;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
    if (card) {
      card.classList.remove('scale-95');
      card.classList.add('scale-100');
    }
    document.body.classList.add('overflow-hidden');
  }

  function closeAuthModal() {
    const modal = document.getElementById('biogravity-auth-modal');
    const card = document.getElementById('auth-modal-card');
    if (!modal) return;

    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    if (card) {
      card.classList.add('scale-95');
      card.classList.remove('scale-100');
    }
    document.body.classList.remove('overflow-hidden');

    setTimeout(() => {
      if (modal.classList.contains('opacity-0')) {
        modal.style.display = 'none';
      }
    }, 250);
  }`;

code = code.replace(targetModals, newModals).replace(targetModals.replace(/\n/g, '\r\n'), newModals.replace(/\n/g, '\r\n'));

// 3. In Google Sign In button, add visual feedback and ensure modal closes immediately
const targetGoogleHandler = `      window.bioGravitySignInWithGoogle = async () => {
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
      };`;

const newGoogleHandler = `      window.bioGravitySignInWithGoogle = async () => {
        const googleBtn = document.getElementById('btn-google-auth');
        const origContent = googleBtn ? googleBtn.innerHTML : '';
        try {
          if (googleBtn) {
            googleBtn.disabled = true;
            googleBtn.innerHTML = '<span class="inline-block animate-spin mr-2">⏳</span><span>Connecting to Google...</span>';
          }
          const res = await signInWithPopup(authInstance, googleProvider);
          
          // Instantly close modal as soon as popup completes
          closeAuthModal();
          
          const optin = document.getElementById('auth-newsletter-optin');
          const shouldSubscribe = optin ? optin.checked : true;
          if (shouldSubscribe && res && res.user && res.user.email) {
            subscribeNewsletter(res.user.email);
          }
          showNotification('Welcome to BioGravity, ' + (res.user.displayName || 'Researcher') + '!', 'success');
        } catch (err) {
          console.error('[BioGravity Auth] Google Sign-In error:', err);
          if (googleBtn) {
            googleBtn.disabled = false;
            googleBtn.innerHTML = origContent;
          }
          if (err.code !== 'auth/popup-closed-by-user') {
            showNotification(err.message || 'Sign in failed', 'error');
          }
        }
      };`;

code = code.replace(targetGoogleHandler, newGoogleHandler).replace(targetGoogleHandler.replace(/\n/g, '\r\n'), newGoogleHandler.replace(/\n/g, '\r\n'));

fs.writeFileSync(filePath, code, 'utf8');
console.log('[SUCCESS] Enhanced modal close logic in js/auth-system.js');
