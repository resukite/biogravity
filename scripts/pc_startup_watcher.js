'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '..');
const stateFile = path.join(rootDir, 'outreach', '.last_daily_run.json');

function getTodayStr() {
  return new Date().toISOString().split('T')[0];
}

function runDailyCheck() {
  const today = getTodayStr();

  // 1. Anti-Spam Gate: Check if already run today
  if (fs.existsSync(stateFile)) {
    try {
      const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
      if (state.lastRunDate === today) {
        // Already performed today. Zero spam.
        return;
      }
    } catch (e) {
      // Proceed if state file corrupted
    }
  }

  console.log(`[WATCHER] 🌅 New day detected (${today})! Preparing daily outreach...`);

  try {
    // 2. Quietly pull latest dispatches published overnight by GitHub cloud
    try {
      execSync('git pull --quiet origin main', { cwd: rootDir, stdio: 'ignore' });
    } catch (e) {}

    // 3. Generate today's outreach kit & 1-click portal
    execSync('node scripts/social_syndication_engine.js', { cwd: rootDir, stdio: 'inherit' });
    execSync('node scripts/generate_daily_portal.js', { cwd: rootDir, stdio: 'inherit' });

    // 4. Save state to guarantee it NEVER runs again today (zero spam)
    fs.writeFileSync(stateFile, JSON.stringify({ 
      lastRunDate: today, 
      timestamp: new Date().toISOString() 
    }, null, 2), 'utf8');

    // 5. Open today's 1-click sharing portal in default browser
    const portalPath = path.join(rootDir, 'outreach', 'daily-outreach-portal.html');
    if (process.platform === 'win32') {
      execSync(`start "" "${portalPath}"`, { shell: 'cmd.exe' });
    } else {
      execSync(`open "${portalPath}"`);
    }

    console.log(`[WATCHER] ✅ Daily portal successfully launched for ${today}!`);
  } catch (err) {
    console.error(`[WATCHER] Notice: ${err.message}`);
  }
}

// Initial check on PC startup
runDailyCheck();

// Keep alive and check once every hour (in case PC stays on past midnight)
setInterval(runDailyCheck, 60 * 60 * 1000);
