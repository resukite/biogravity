/**
 * ============================================================================
 * BioGravity Orbital Command Center Visual FX Engine
 * Inspired by Aceternity UI and Magic UI open-source design systems.
 * ============================================================================
 * 
 * Features:
 * 1. Interactive Starfield & Particle Cosmos (MagicUI Particles / Aceternity Sparkles)
 * 2. Shooting Star Meteors with glowing tail gradients (MagicUI Meteors)
 * 3. Spotlight Mouse Hover Effect (Aceternity Spotlight Cards)
 * 4. High-Tech Web Audio API Command Center Chimes & Ambient Synthesizer
 * 5. Live Orbital Downlink Terminal Ticker
 * ============================================================================
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. STARFIELD & PARTICLE CONSTELLATION CANVAS
  // ==========================================================================
  function initCosmicCanvas() {
    let canvas = document.getElementById('cosmic-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'cosmic-canvas';
      canvas.className = 'fixed inset-0 pointer-events-none -z-20 w-full h-full';
      document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    });

    const particles = [];
    const particleCount = Math.floor(Math.min(width, 1600) / 14); // Adaptive density
    const mouse = { x: null, y: null, radius: 140 };

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.8 + 0.6;
        this.baseAlpha = Math.random() * 0.6 + 0.2;
        this.alpha = this.baseAlpha;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
        this.twinkleDir = Math.random() > 0.5 ? 1 : -1;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        // Cyan (#22d3ee), Emerald (#34d399), or Starlight Blue (#38bdf8)
        const colors = [
          '34, 211, 238', // cyan-400
          '52, 211, 153', // emerald-400
          '56, 189, 248', // sky-400
          '167, 139, 250' // purple-400
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Ethereal twinkling
        this.alpha += this.twinkleSpeed * this.twinkleDir;
        if (this.alpha > 0.85 || this.alpha < 0.15) {
          this.twinkleDir *= -1;
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        ctx.shadowBlur = this.size > 1.4 ? 8 : 4;
        ctx.fill();
        ctx.restore();
      }
    }

    function createParticles() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }
    createParticles();

    // Shooting Stars / Meteors
    const meteors = [];
    function spawnMeteor() {
      if (Math.random() < 0.04 && meteors.length < 3) {
        meteors.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 90 + 50,
          speed: Math.random() * 8 + 6,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
          alpha: 1.0
        });
      }
    }

    function renderMeteors() {
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(56, 189, 248, ${m.alpha})`);
        grad.addColorStop(0.3, `rgba(34, 211, 238, ${m.alpha * 0.6})`);
        grad.addColorStop(1, `rgba(34, 211, 238, 0)`);

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.restore();

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.015;

        if (m.alpha <= 0 || m.x > width || m.y > height) {
          meteors.splice(i, 1);
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Render & link particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        // Connect particles near cursor with quantum filaments
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const lineAlpha = (1 - dist / mouse.radius) * 0.45;
            ctx.save();
            ctx.strokeStyle = `rgba(34, 211, 238, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      spawnMeteor();
      renderMeteors();

      requestAnimationFrame(animate);
    }
    animate();
  }

  // ==========================================================================
  // 2. SPOTLIGHT CARD MOUSE TRACKER (Aceternity UI Spotlight)
  // ==========================================================================
  function initSpotlightCards() {
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // ==========================================================================
  // 3. COMMAND CENTER AUDIO SYNTHESIZER (Web Audio API)
  // ==========================================================================
  class QuantumAudioSynth {
    constructor() {
      this.ctx = null;
      this.muted = localStorage.getItem('biogravity_sound_muted') === 'true';
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playChime(freq = 880, duration = 0.12, type = 'sine') {
      if (this.muted) return;
      this.init();
      if (!this.ctx) return;

      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (err) {
        // Silent fail on autoplay policy restrictions
      }
    }

    playPulse() {
      this.playChime(320, 0.18, 'triangle');
    }

    playClick() {
      this.playChime(1240, 0.08, 'sine');
    }

    toggleMute() {
      this.muted = !this.muted;
      localStorage.setItem('biogravity_sound_muted', this.muted);
      return !this.muted;
    }
  }

  const soundSynth = new QuantumAudioSynth();
  window.QuantumSound = soundSynth;

  // Bind interactive clicks to sound FX
  function initAudioInteractions() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('button, a.btn-glow, .badge-quantum, .nav-link');
      if (target) {
        soundSynth.playClick();
      }
    });

    const soundToggleBtn = document.getElementById('btn-audio-toggle');
    if (soundToggleBtn) {
      soundToggleBtn.addEventListener('click', () => {
        const active = soundSynth.toggleMute();
        soundToggleBtn.innerHTML = active ? '🔊 Synth On' : '🔇 Synth Off';
        soundToggleBtn.classList.toggle('text-cyan-400', active);
        if (window.showToast) {
          window.showToast(active ? 'Tactical audio feedback enabled' : 'Tactical audio feedback muted', 'info');
        }
      });
    }
  }

  // ==========================================================================
  // 4. ORBITAL DOWNLINK TERMINAL LOG TICKER
  // ==========================================================================
  function initTerminalTicker() {
    const terminalEl = document.getElementById('orbital-terminal-logs');
    if (!terminalEl) return;

    const sampleLogs = [
      'DOWNLINK // LEO-ALPHA: Magnetometer calibrated to 0.12 nT baseline.',
      'TELEMETRY // Haberkorn spin density matrix verified (Trace = 1.000).',
      'CRYSTALLOGRAPHY // X-ray diffraction resolution confirmed: 0.82 Å.',
      'PLASMA SHEATH // Langmuir probe reading: Te = 1420 K, Ne = 4.2e5 cm⁻³.',
      'CAPILLARY LAB // Young-Laplace bubble pressure stabilized at 18.2 mPa.',
      'TELEMETRY // Orbit 14,892 apogee: 421.1 km, inclination: 51.64°.'
    ];

    setInterval(() => {
      const timestamp = new Date().toISOString().substring(11, 19);
      const randomLog = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
      const line = document.createElement('div');
      line.className = 'font-mono text-[11px] text-slate-400 leading-relaxed truncate';
      line.innerHTML = `<span class="text-cyan-400">[${timestamp} UTC]</span> <span class="text-emerald-300">⚛</span> ${randomLog}`;

      terminalEl.prepend(line);
      if (terminalEl.children.length > 5) {
        terminalEl.removeChild(terminalEl.lastChild);
      }
    }, 4500);
  }

  // ==========================================================================
  // DOM READY INITIALIZATION
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initCosmicCanvas();
    initSpotlightCards();
    initAudioInteractions();
    initTerminalTicker();
  });
})();
