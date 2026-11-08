const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'auth-system.js');
let code = fs.readFileSync(filePath, 'utf8');

// 1. Update window.bioGravitySignInWithGoogle to subscribe if optin is checked
const targetGoogle = `      window.bioGravitySignInWithGoogle = async () => {
        try {
          await signInWithPopup(authInstance, googleProvider);
          closeAuthModal();
          showNotification('Welcome to BioGravity!', 'success');
        } catch (err) {`;

const newGoogle = `      window.bioGravitySignInWithGoogle = async () => {
        try {
          const res = await signInWithPopup(authInstance, googleProvider);
          const optin = document.getElementById('auth-newsletter-optin');
          const shouldSubscribe = optin ? optin.checked : true;
          if (shouldSubscribe && res && res.user && res.user.email) {
            await subscribeNewsletter(res.user.email);
          }
          closeAuthModal();
          showNotification('Welcome to BioGravity!', 'success');
        } catch (err) {`;

code = code.replace(targetGoogle, newGoogle).replace(targetGoogle.replace(/\n/g, '\r\n'), newGoogle.replace(/\n/g, '\r\n'));

// 2. Update the Auth Tab Content HTML to keep the newsletter optin card under both Google & Email sign in, ticked by default
const targetForm = `            <!-- Email Input Form -->
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

              <!-- Newsletter Opt-In Checkbox -->
              <label class="flex items-start gap-2.5 cursor-pointer pt-1 select-none">
                <input type="checkbox" id="auth-newsletter-optin" checked class="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500">
                <span class="text-xs text-slate-600 leading-snug">
                  Keep me updated with the <strong>BioGravity Dispatch</strong> (Weekly science briefing on microgravity &amp; space biotech).
                </span>
              </label>

              <button type="submit" class="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-sm transition cursor-pointer">
                Continue to BioGravity &rarr;
              </button>
            </form>`;

const newForm = `            <!-- Email Input Form -->
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
            </div>`;

code = code.replace(targetForm, newForm).replace(targetForm.replace(/\n/g, '\r\n'), newForm.replace(/\n/g, '\r\n'));

// 3. In openAuthModal, ensure the checkbox is reset to checked=true whenever modal opens
const targetOpen = `    switchTab(defaultTab);

    modal.classList.remove('opacity-0', 'pointer-events-none');`;

const newOpen = `    // Always ensure newsletter checkbox is ticked by default whenever anyone opens login
    const optin = document.getElementById('auth-newsletter-optin');
    if (optin) optin.checked = true;

    switchTab(defaultTab);

    modal.classList.remove('opacity-0', 'pointer-events-none');`;

code = code.replace(targetOpen, newOpen).replace(targetOpen.replace(/\n/g, '\r\n'), newOpen.replace(/\n/g, '\r\n'));

fs.writeFileSync(filePath, code, 'utf8');
console.log('Successfully updated newsletter opt-in checkbox in js/auth-system.js');
