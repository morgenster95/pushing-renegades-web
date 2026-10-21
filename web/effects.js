/*
  Atmosféra úvodního karuselu: poletující prach, poryvy větru a šlehy.
  Dvě plátna (za postavou a před ní) se přesouvají do právě aktivního slidu.
  initDust(stage) vrací funkci pro úklid; burst() spustí poryv při změně slidu.
*/
function initDust(stage) {
  const back = document.createElement('canvas');
  const front = document.createElement('canvas');
  back.className = 'scene-dust scene-dust-back';
  front.className = 'scene-dust scene-dust-front';
  [back, front].forEach(c => c.setAttribute('aria-hidden', 'true'));
  const bctx = back.getContext('2d');
  const fctx = front.getContext('2d');

  let w = 0, h = 0, dpr = 1, raf = 0, visible = true, last = performance.now();
  let gust = 0;                       // síla poryvu (doznívá)
  const mouse = { x: -9999, y: -9999, vx: 0, vy: 0 };
  let particles = [], streaks = [];

  const rand = (a, b) => a + Math.random() * (b - a);
  const warm = ['241,240,233', '255,236,200', '232,220,190', '237,255,56'];

  function makeParticle(layer, anywhere = true) {
    const near = layer === 'front';
    return {
      layer,
      x: anywhere ? rand(0, w) : rand(-40, 0),
      y: rand(0, h),
      z: near ? rand(1.6, 2.6) : rand(.25, 1.2),       // hloubka: ovlivňuje velikost, rychlost, paralaxu
      r: near ? rand(4, 11) : rand(.5, 2.1),
      a: near ? rand(.05, .14) : rand(.25, .85),
      phase: rand(0, Math.PI * 2),
      spin: rand(.3, 1.2),
      color: Math.random() < (near ? 0 : .07) ? warm[3] : warm[Math.floor(rand(0, 3))],
      vx: 0, vy: 0
    };
  }

  function resize() {
    const r = stage.querySelector('.depth-stage').getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = r.width; h = r.height;
    [back, front].forEach(c => { c.width = w * dpr; c.height = h * dpr; });
    bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const area = w * h / 1e6;
    const count = Math.round(Math.min(220, Math.max(70, area * 260)));
    particles = [
      ...Array.from({ length: count }, () => makeParticle('back')),
      ...Array.from({ length: Math.round(count / 18) + 4 }, () => makeParticle('front'))
    ];
  }

  function attach() {
    const slide = stage.querySelector('.depth-slide.is-current');
    if (!slide) return;
    const figure = slide.querySelector('.scene-figure');
    slide.insertBefore(back, figure);
    figure.after(front);
  }

  function burst() {
    attach();
    gust = 1;
    for (let i = 0; i < 7; i++) streaks.push({ x: rand(-w * .4, w * .2), y: rand(h * .1, h * .9), len: rand(80, 260), speed: rand(14, 26), life: 1, a: rand(.12, .3) });
    particles.forEach(p => { p.vx += rand(2, 6) * p.z; p.vy += rand(-1.5, .5); });
  }

  function wind(t) {
    // klidný vítr s nepravidelnými nárazy
    const base = .18 + .12 * Math.sin(t * .00031) + .1 * Math.sin(t * .00083 + 1.7);
    const pulse = Math.max(0, Math.sin(t * .00047)) ** 6 * .9;
    return base + pulse + gust * 3.2;
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden) { last = now; return; }
    const dt = Math.min(48, now - last) / 16.67;
    last = now;
    gust *= Math.pow(.965, dt);

    const mx = parseFloat(stage.style.getPropertyValue('--mx')) || 0;
    const my = parseFloat(stage.style.getPropertyValue('--my')) || 0;
    const wx = wind(now);
    mouse.vx *= .9; mouse.vy *= .9;

    bctx.clearRect(0, 0, w, h);
    fctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      const drift = Math.sin(now * .0006 * p.spin + p.phase);
      p.vx += (wx * p.z - p.vx) * .02 * dt;
      p.vy += ((-.05 + drift * .12) * p.z - p.vy) * .02 * dt;

      // rozvíření kurzorem
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
      if (d2 < 22000) {
        const f = (1 - d2 / 22000) * .06 * p.z;
        p.vx += (mouse.vx * .5 + dx * .02) * f * dt;
        p.vy += (mouse.vy * .5 + dy * .02) * f * dt;
      }

      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.x > w + 40) Object.assign(p, makeParticle(p.layer, false));
      if (p.x < -60) p.x = w + 30;
      if (p.y < -30) p.y = h + 20;
      if (p.y > h + 30) p.y = -20;

      const px = p.x - mx * 40 * p.z, py = p.y - my * 24 * p.z;
      const twinkle = .65 + .35 * Math.sin(now * .002 * p.spin + p.phase);
      const ctx = p.layer === 'front' ? fctx : bctx;
      if (p.layer === 'front') {
        const g = ctx.createRadialGradient(px, py, 0, px, py, p.r);
        g.addColorStop(0, `rgba(${p.color},${p.a * twinkle})`);
        g.addColorStop(1, `rgba(${p.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(px, py, p.r, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.fillStyle = `rgba(${p.color},${p.a * twinkle})`;
        ctx.beginPath(); ctx.arc(px, py, p.r, 0, Math.PI * 2); ctx.fill();
      }
    }

    // šlehy větru
    bctx.lineCap = 'round';
    streaks = streaks.filter(s => s.life > 0);
    for (const s of streaks) {
      s.x += s.speed * dt; s.life -= .018 * dt;
      const g = bctx.createLinearGradient(s.x - s.len, s.y, s.x, s.y);
      g.addColorStop(0, 'rgba(241,240,233,0)');
      g.addColorStop(1, `rgba(241,240,233,${s.a * s.life})`);
      bctx.strokeStyle = g; bctx.lineWidth = 1.2;
      bctx.beginPath(); bctx.moveTo(s.x - s.len, s.y); bctx.quadraticCurveTo(s.x - s.len / 2, s.y - 6, s.x, s.y); bctx.stroke();
    }
  }

  const onMove = e => {
    const r = back.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    if (mouse.x > -9000) { mouse.vx = x - mouse.x; mouse.vy = y - mouse.y; }
    mouse.x = x; mouse.y = y;
  };
  const onLeave = () => { mouse.x = mouse.y = -9999; };
  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });

  resize();
  attach();
  window.addEventListener('resize', resize);
  stage.addEventListener('pointermove', onMove);
  stage.addEventListener('pointerleave', onLeave);
  io.observe(stage);
  raf = requestAnimationFrame(frame);
  setTimeout(burst, 350);

  return {
    burst,
    cleanup() {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      back.remove(); front.remove();
    }
  };
}

/*
  Cílová páska přes nadpis: najetí myší (nebo doscrollování na dotykových zařízeních)
  pásky napne a roztrhne, nadpis pod nimi se rozsvítí. Po odscrollování se pásky znovu natáhnou.
*/
function initFinishLine(el) {
  const label = 'FINISH LINE ↗ PUSHING RENEGADES ↗ ';
  const tapes = [
    { top: 8, rot: -4 },
    { top: 42, rot: 2.5 },
    { top: 74, rot: -1.5 }
  ];
  const rand = (a, b) => a + Math.random() * (b - a);
  const layer = document.createElement('div');
  layer.className = 'finish-tapes';
  layer.setAttribute('aria-hidden', 'true');

  function build() {
    layer.innerHTML = tapes.map((t, k) => {
      const tear = rand(38, 62);
      const xs = Array.from({ length: 9 }, (_, i) => tear + (i % 2 ? rand(.6, 1.6) : -rand(.6, 1.6)));
      const edge = xs.map((x, i) => `${x.toFixed(2)}% ${i * 12.5}%`);
      // levá půlka mírně přesahuje, aby před roztržením nebyl vidět šev
      const left = `polygon(0 0, ${xs.map((x, i) => `${(x + .4).toFixed(2)}% ${i * 12.5}%`).join(', ')}, 0 100%)`;
      const right = `polygon(${edge.join(', ')}, 100% 100%, 100% 0)`;
      const text = `<i>${label.repeat(8)}</i>`;
      const fibers = Array.from({ length: 7 }, () => `<b style="--dx:${rand(-40, 40).toFixed(0)}px;--dy:${rand(-35, 45).toFixed(0)}px;--r:${rand(-90, 90).toFixed(0)}deg"></b>`).join('');
      return `<div class="finish-tape" style="--top:${t.top}%;--rot:${t.rot}deg;--delay:${k * 110}ms;--fall-l:${rand(14, 26).toFixed(1)}deg;--fall-r:${-rand(14, 26).toFixed(1)}deg">
        <span class="tape-half left" style="clip-path:${left}">${text}</span>
        <span class="tape-half right" style="clip-path:${right}">${text}</span>
        <span class="tape-fibers" style="left:${tear.toFixed(2)}%">${fibers}</span>
      </div>`;
    }).join('');
  }

  let timer = 0, autoTimer = 0;
  const touch = window.matchMedia('(hover: none)').matches;

  function tear() {
    if (!el.classList.contains('armed') || el.classList.contains('tension')) return;
    clearTimeout(autoTimer);
    el.classList.add('tension');
    timer = setTimeout(() => { el.classList.remove('armed', 'tension'); el.classList.add('torn'); }, 160);
  }
  function arm() {
    clearTimeout(timer);
    el.classList.remove('torn', 'tension');
    build();
    el.classList.add('armed');
  }

  const onEnter = e => { if (e.pointerType === 'mouse') tear(); };
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && entry.intersectionRatio >= .6) {
      clearTimeout(autoTimer);
      autoTimer = setTimeout(tear, touch ? 450 : 3000);
    } else if (!entry.isIntersecting) {
      clearTimeout(autoTimer);
      if (el.classList.contains('torn')) arm();
    }
  }, { threshold: [0, .6] });

  el.appendChild(layer);
  arm();
  el.addEventListener('pointerenter', onEnter);
  el.addEventListener('click', tear);
  io.observe(el);

  return () => {
    clearTimeout(timer); clearTimeout(autoTimer);
    io.disconnect();
    el.removeEventListener('pointerenter', onEnter);
    el.removeEventListener('click', tear);
    el.classList.remove('armed', 'tension', 'torn');
    layer.remove();
  };
}
