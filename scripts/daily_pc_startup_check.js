'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '..');
const stateFile = path.join(rootDir, 'outreach', '.last_daily_run.json');
const today = new Date().toISOString().split('T')[0];

console.log(`[STARTUP-CHECK] 💻 Checking BioGravity daily tasks for ${today}...`);

// 1. Check Anti-Spam Gate
if (fs.existsSync(stateFile)) {
  try {
    const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    if (state.lastRunDate === today) {
      console.log(`[STARTUP-CHECK] 🛡️ Already executed today (${today}). Anti-spam active: No action taken.`);
      process.exit(0);
    }
  } catch (e) {
    // ignore parse error and proceed
  }
}

console.log(`[STARTUP-CHECK] 🌅 First PC boot today! Syncing latest dispatches...`);

try {
  // 2. Quietly pull latest dispatches published overnight by GitHub Actions
  try {
    execSync('git pull --quiet origin main', { cwd: rootDir, stdio: 'ignore' });
  } catch (e) {
    // ignore offline / network blips
  }

  // 3. Generate today's outreach kit & portal
  execSync('node scripts/social_syndication_engine.js', { cwd: rootDir, stdio: 'inherit' });
  execSync('node scripts/generate_daily_portal.js', { cwd: rootDir, stdio: 'inherit' });

  // 4. Record today's run so it NEVER runs again today (anti-spam)
  fs.writeFileSync(stateFile, JSON.stringify({ lastRunDate: today, timestamp: new Date().toISOString() }, null, 2), 'utf8');

  // 5. Open today's 1-click portal in the user's default browser
  const portalPath = path.join(rootDir, 'outreach', 'daily-outreach-portal.html');
  if (process.platform === 'win32') {
    execSync(`start "" "${portalPath}"`, { shell: 'cmd.exe' });
  } else {
    execSync(`open "${portalPath}"`);
  }

  console.log(`[STARTUP-CHECK] 🌟 Opened daily outreach portal for ${today}!`);
} catch (err) {
  console.error(`[STARTUP-CHECK] Notice: ${err.message}`);
}
