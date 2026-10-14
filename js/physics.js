/**
 * BioGravity Interactive 3D Anti-Gravity Physics Engine
 * Powered by Matter.js with custom pseudo-3D volumetric sphere rendering,
 * quantum entanglement laser links, orbiting electrons, and interactive sound synthesis.
 */

class QuantumPhysicsSandbox {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) return;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'matter-canvas';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    // Engine & State
    this.engine = null;
    this.runner = null;
    this.nodes = [];
    this.walls = [];
    this.mouseConstraint = null;
    this.mouse = null;
    this.particles = []; // Visual sparkles / ripples
    this.audioEnabled = false;
    this.audioCtx = null;
    this.gravityMode = 'antigravity'; // 'antigravity', 'zerog', 'terrestrial'
    this.orbitAngle = 0;

    // Node definitions with quantum biotech domains
    this.nodeBlueprints = [
      { label: 'CRISPR-Q', radius: 46, color: '#06b6d4', glow: '#38bdf8', category: 'Enzymology', mass: 2.2 },
      { label: 'Zero-G Crystal', radius: 52, color: '#10b981', glow: '#34d399', category: 'Crystallography', mass: 2.8 },
      { label: 'Coherent RNA', radius: 42, color: '#8b5cf6', glow: '#a78bfa', category: 'Phase Kinetics', mass: 1.8 },
      { label: 'Telomere Ionics', radius: 48, color: '#f59e0b', glow: '#fbbf24', category: 'Radioprotection', mass: 2.4 },
      { label: '3D Organoid', radius: 50, color: '#ec4899', glow: '#f472b6', category: 'Bioprinting', mass: 2.6 },
      { label: 'Quantum Tubulin', radius: 44, color: '#3b82f6', glow: '#60a5fa', category: 'Neuro-Resonance', mass: 2.0 },
      { label: 'Magneto-Enzyme', radius: 40, color: '#14b8a6', glow: '#2dd4bf', category: 'Cryo-Kinetics', mass: 1.7 },
      { label: 'Orbital LEO-4', radius: 45, color: '#06b6d4', glow: '#22d3ee', category: 'Station Node', mass: 2.1 }
    ];

    this.init();
  }

  init() {
    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;

    // 1. Create Engine with Anti-Gravity (negative Y)
    this.engine = Engine.create({
      gravity: { x: 0, y: -0.28, scale: 0.001 } // Upward negative gravity
    });

    this.resize();
    window.addEventListener('resize', () => this.resize());

    // 2. Create Bounds & Nodes
    this.createBoundaries();
    this.spawnNodes();

    // 3. Mouse & Drag Control
    this.mouse = Mouse.create(this.canvas);
    this.mouseConstraint = MouseConstraint.create(this.engine, {
      mouse: this.mouse,
      constraint: {
        stiffness: 0.15,
        render: { visible: false }
      }
    });
    Composite.add(this.engine.world, this.mouseConstraint);

    // Prevent default scroll when dragging canvas
    this.canvas.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });

    // Click on canvas triggers a Quantum Pulse shockwave
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      this.triggerShockwave(clickX, clickY);
      this.playSynthNote(440, 'triangle', 0.12);
    });

    // Collision sound & particle events
    Events.on(this.engine, 'collisionStart', (event) => {
      event.pairs.forEach(pair => {
        const speed = Matter.Vector.magnitude(pair.bodyA.velocity) + Matter.Vector.magnitude(pair.bodyB.velocity);
        if (speed > 1.2) {
          const contactX = (pair.bodyA.position.x + pair.bodyB.position.x) / 2;
          const contactY = (pair.bodyA.position.y + pair.bodyB.position.y) / 2;
          this.createSparkles(contactX, contactY, pair.bodyA.nodeMeta?.glow || '#38bdf8');
          
          if (this.audioEnabled) {
            const freq = 200 + Math.min(speed * 40, 600);
            this.playSynthNote(freq, 'sine', 0.06);
          }
        }
      });
    });

    // 4. Start Physics Runner & Render Loop
    this.runner = Runner.create();
    Runner.run(this.runner, this.engine);
    this.renderLoop();
  }

  resize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight || 520;

    this.canvas.width = width;
    this.canvas.height = height;

    if (this.walls.length > 0) {
      Matter.Composite.remove(this.engine.world, this.walls);
      this.createBoundaries();
    }
  }

  createBoundaries() {
    const { Bodies, Composite } = Matter;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const thickness = 60;

    this.walls = [
      // Top ceiling
      Bodies.rectangle(w / 2, -thickness / 2, w * 2, thickness, { isStatic: true, restitution: 0.85 }),
      // Bottom floor
      Bodies.rectangle(w / 2, h + thickness / 2, w * 2, thickness, { isStatic: true, restitution: 0.85 }),
      // Left wall
      Bodies.rectangle(-thickness / 2, h / 2, thickness, h * 2, { isStatic: true, restitution: 0.85 }),
      // Right wall
      Bodies.rectangle(w + thickness / 2, h / 2, thickness, h * 2, { isStatic: true, restitution: 0.85 })
    ];

    Composite.add(this.engine.world, this.walls);
  }

  spawnNodes() {
    const { Bodies, Composite } = Matter;
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.nodeBlueprints.forEach((bp, index) => {
      // Stagger initial positions across the lower-middle half
      const x = (w * 0.15) + ((w * 0.7) / (this.nodeBlueprints.length - 1)) * index + (Math.random() * 20 - 10);
      const y = h * 0.5 + (Math.random() * (h * 0.35));

      const body = Bodies.circle(x, y, bp.radius, {
        restitution: 0.88,      // High bounciness
        frictionAir: 0.015,     // Soft aerodynamic drag (drifting in microgravity)
        friction: 0.05,
        density: 0.001 * bp.mass
      });

      body.nodeMeta = {
        ...bp,
        electrons: [
          { orbitRadius: bp.radius + 12, speed: 0.03 + Math.random() * 0.02, angle: Math.random() * Math.PI * 2, color: bp.glow },
          { orbitRadius: bp.radius + 20, speed: -0.025 - Math.random() * 0.015, angle: Math.random() * Math.PI * 2, color: '#ffffff' }
        ]
      };

      this.nodes.push(body);
      Composite.add(this.engine.world, body);
    });
  }

  // Interactive shockwave repulsion
  triggerShockwave(x, y) {
    const blastRadius = 320;
    const blastPower = 0.035;

    this.nodes.forEach(body => {
      const dx = body.position.x - x;
      const dy = body.position.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 0 && dist < blastRadius) {
        const factor = (1 - dist / blastRadius) * blastPower;
        const force = {
          x: (dx / dist) * factor,
          y: (dy / dist) * factor
        };
        Matter.Body.applyForce(body, body.position, force);
      }
    });

    // Add visual shockwave ripple
    this.particles.push({
      type: 'shockwave',
      x, y,
      radius: 5,
      maxRadius: 180,
      opacity: 1,
      color: '#06b6d4'
    });
  }

  createSparkles(x, y, color) {
    for (let i = 0; i < 7; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      this.particles.push({
        type: 'sparkle',
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1.5,
        opacity: 1,
        color
      });
    }
  }

  // Add dynamic new quantum node
  spawnNewParticle() {
    const randomColors = [
      { color: '#10b981', glow: '#34d399', label: 'Q-Ribosome' },
      { color: '#06b6d4', glow: '#38bdf8', label: 'Nano-Scaffold' },
      { color: '#8b5cf6', glow: '#c084fc', label: 'Spin State' },
      { color: '#f43f5e', glow: '#fb7185', label: 'Proton Vane' }
    ];
    const pick = randomColors[Math.floor(Math.random() * randomColors.length)];
    const w = this.canvas.width;
    const h = this.canvas.height;
    const radius = 38 + Math.random() * 12;

    const body = Matter.Bodies.circle(w * 0.5 + (Math.random() * 100 - 50), h * 0.8, radius, {
      restitution: 0.9,
      frictionAir: 0.015,
      density: 0.002
    });

    body.nodeMeta = {
      label: pick.label,
      radius,
      color: pick.color,
      glow: pick.glow,
      category: 'Synthetics',
      electrons: [
        { orbitRadius: radius + 14, speed: 0.04, angle: 0, color: pick.glow }
      ]
    };

    this.nodes.push(body);
    Matter.Composite.add(this.engine.world, body);
    this.createSparkles(w * 0.5, h * 0.8, pick.glow);
    this.playSynthNote(520, 'sine', 0.1);
  }

  agitateLattice() {
    this.nodes.forEach(body => {
      const angle = Math.random() * Math.PI * 2;
      const forceMag = 0.02 + Math.random() * 0.03;
      Matter.Body.applyForce(body, body.position, {
        x: Math.cos(angle) * forceMag,
        y: Math.sin(angle) * forceMag
      });
    });
    this.triggerShockwave(this.canvas.width / 2, this.canvas.height / 2);
    this.playSynthNote(330, 'triangle', 0.2);
  }

  setGravityMode(mode) {
    this.gravityMode = mode;
    if (mode === 'antigravity') {
      this.engine.world.gravity.y = -0.28;
    } else if (mode === 'zerog') {
      this.engine.world.gravity.y = 0;
    } else if (mode === 'terrestrial') {
      this.engine.world.gravity.y = 0.45;
    }
  }

  resetLattice() {
    const { Composite } = Matter;
    this.nodes.forEach(body => Composite.remove(this.engine.world, body));
    this.nodes = [];
    this.spawnNodes();
    this.playSynthNote(260, 'sine', 0.15);
  }

  // Web Audio Synth Note
  playSynthNote(frequency = 440, type = 'sine', duration = 0.1) {
    if (!this.audioEnabled) return;
    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy catch
    }
  }

  toggleAudio() {
    this.audioEnabled = !this.audioEnabled;
    if (this.audioEnabled && !this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    return this.audioEnabled;
  }

  // Main Render Loop: 3D Quantum Nodes & Entanglement Links
  renderLoop() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);
    this.orbitAngle += 0.015;

    // 1. Draw Quantum Entanglement Threads between nearby nodes
    const maxLinkDist = 160;
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const p1 = this.nodes[i].position;
        const p2 = this.nodes[j].position;
        const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);

        if (dist < maxLinkDist) {
          const alpha = (1 - dist / maxLinkDist) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }
    }

    // 2. Render Each 3D-Styled Quantum Node
    this.nodes.forEach(body => {
      const { x, y } = body.position;
      const meta = body.nodeMeta;
      const r = meta.radius;

      ctx.save();
      ctx.translate(x, y);

      // (A) Glowing Aura
      ctx.shadowColor = meta.glow;
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(2, 6, 23, 0.4)';
      ctx.fill();

      // (B) 3D Volumetric Spherical Shading
      const grad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.08, 0, 0, r);
      grad.addColorStop(0, '#ffffff'); // Specular highlight
      grad.addColorStop(0.2, meta.glow);
      grad.addColorStop(0.65, meta.color);
      grad.addColorStop(1, '#020617'); // Dark shadow border

      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // (C) Outer Glass Rim
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.stroke();

      // (D) Concentric Orbital Rings
      ctx.save();
      ctx.rotate(this.orbitAngle);
      ctx.beginPath();
      ctx.ellipse(0, 0, r + 10, (r + 10) * 0.4, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(56, 189, 248, 0.25)`;
      ctx.setLineDash([3, 5]);
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.restore();

      // (E) Orbiting Electrons
      if (meta.electrons) {
        meta.electrons.forEach(el => {
          el.angle += el.speed;
          const ex = Math.cos(el.angle) * el.orbitRadius;
          const ey = Math.sin(el.angle) * (el.orbitRadius * 0.55);

          ctx.beginPath();
          ctx.arc(ex, ey, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = el.color;
          ctx.shadowColor = el.color;
          ctx.shadowBlur = 8;
          ctx.fill();
        });
      }

      // (F) Label & Metadata
      ctx.shadowBlur = 0;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Node Name
      ctx.fillStyle = '#ffffff';
      ctx.font = '600 11px "Space Grotesk", sans-serif';
      ctx.fillText(meta.label, 0, -2);

      // Category Pill
      ctx.fillStyle = 'rgba(226, 232, 240, 0.75)';
      ctx.font = '500 8.5px "JetBrains Mono", monospace';
      ctx.fillText(meta.category.toUpperCase(), 0, 11);

      ctx.restore();
    });

    // 3. Render Particles & Shockwaves
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      if (p.type === 'sparkle') {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.025;

        if (p.opacity <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.globalAlpha = 1;
      } else if (p.type === 'shockwave') {
        p.radius += 5.5;
        p.opacity = 1 - (p.radius / p.maxRadius);

        if (p.radius >= p.maxRadius) {
          this.particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${p.opacity * 0.7})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }

    requestAnimationFrame(() => this.renderLoop());
  }
}

// Global initialization helper
window.QuantumPhysicsSandbox = QuantumPhysicsSandbox;
