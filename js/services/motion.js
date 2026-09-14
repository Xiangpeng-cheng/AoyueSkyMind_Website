/* =============================================================
   services/motion.js
   视差滚动：前景 / 背景不同速率，单 rAF 插值，不劫持原生滚动。
   原则（Dave Gamache / 高端落地页）：
   - 只动 transform / opacity，不改图片尺寸
   - 悬浮钉住慎用（仅落地步骤一处）
   - prefers-reduced-motion 直接退出
   ============================================================= */

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

function viewportProgress(el) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || 1;
  return clamp((vh * 0.5 - (rect.top + rect.height * 0.5)) / vh, -1, 1);
}

export function setupMotion() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.documentElement;
  root.classList.add('has-parallax');

  const fine = window.matchMedia('(pointer: fine)').matches;
  const mobile = window.matchMedia('(max-width: 800px)').matches;
  const k = mobile ? 0.45 : 1;

  const hero = document.querySelector('.hero, .page-hero');
  const aurora = document.querySelector('.hero .aurora, .page-hero .aurora');
  const grain = document.querySelector('.hero .grain, .page-hero .grain');
  const copy = document.querySelector('.hero-grid > .reveal, .page-hero .container-x > .reveal');
  const visual = document.querySelector('.hero-visual');
  const stats = document.querySelector('.hero-stats');
  const pins = Array.prototype.slice.call(document.querySelectorAll('.process-pin'));

  let targetY = window.scrollY || 0;
  let y = targetY;
  let tmx = 0;
  let tmy = 0;
  let mx = 0;
  let my = 0;
  let ticking = false;

  function covers() {
    return document.querySelectorAll(
      '.solution-photo img, .card-media.scene img, .card-media.shot img',
    );
  }

  function heroLeave() {
    if (!hero) return 0;
    const rect = hero.getBoundingClientRect();
    const span = Math.max(rect.height * 0.72, window.innerHeight * 0.55);
    return clamp(-rect.top / span, 0, 1);
  }

  function apply() {
    const leave = heroLeave();

    if (aurora) {
      aurora.style.setProperty('--py', (y * 0.14 * k) + 'px');
      aurora.style.setProperty('--ps', String(1 + leave * 0.06));
    }
    if (grain) {
      grain.style.setProperty('--py', (y * 0.05 * k) + 'px');
    }
    if (copy) {
      const rect = copy.getBoundingClientRect();
      const leaveCopy = clamp((96 - rect.top) / Math.max(rect.height * 0.5, 140), 0, 1);
      const fade = 1 - leaveCopy;
      copy.style.setProperty('--py', (-leaveCopy * 48 * k) + 'px');
      copy.style.setProperty('--po', String(fade));
      copy.style.pointerEvents = fade < 0.18 ? 'none' : '';
    }
    if (visual) {
      visual.style.setProperty('--mx', (mx * 16) + 'px');
      visual.style.setProperty('--my', (my * 10 + leave * 48 * k) + 'px');
      visual.style.setProperty('--ms', String(1 - leave * 0.07 * k));
      visual.style.setProperty('--rx', (fine ? my * -4 : 0) + 'deg');
      visual.style.setProperty('--ry', (fine ? mx * 6 : 0) + 'deg');
    }
    if (stats) {
      stats.style.setProperty('--py', (leave * 36 * k) + 'px');
      stats.style.setProperty('--po', String(1 - leave * 0.85));
    }

    covers().forEach(function (img) {
      const p = viewportProgress(img.parentElement || img);
      img.style.setProperty('--py', (p * 42 * k) + 'px');
      img.style.setProperty('--ps', String(1.14));
    });

    pins.forEach(function (pin) {
      const rect = pin.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const travel = Math.max(rect.height - vh, 1);
      const p = clamp(-rect.top / travel, 0, 1);
      pin.style.setProperty('--pp', String(p));
      const items = pin.querySelectorAll('.process-rail > li');
      const n = items.length || 1;
      items.forEach(function (li, i) {
        const local = p * n;
        const on = local >= i - 0.15;
        li.classList.toggle('is-on', on);
        li.classList.toggle('is-now', local >= i && local < i + 1);
      });
    });
  }

  function frame() {
    y += (targetY - y) * 0.11;
    mx += (tmx - mx) * 0.09;
    my += (tmy - my) * 0.09;
    apply();
    const settle =
      Math.abs(targetY - y) < 0.2 &&
      Math.abs(tmx - mx) < 0.002 &&
      Math.abs(tmy - my) < 0.002;
    if (settle) ticking = false;
    else requestAnimationFrame(frame);
  }

  function kick() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(frame);
  }

  window.addEventListener('scroll', function () {
    targetY = window.scrollY || 0;
    kick();
  }, { passive: true });

  window.addEventListener('resize', kick, { passive: true });

  if (fine && visual) {
    window.addEventListener('pointermove', function (e) {
      tmx = e.clientX / window.innerWidth - 0.5;
      tmy = e.clientY / window.innerHeight - 0.5;
      kick();
    }, { passive: true });
  }

  apply();
  kick();
}
