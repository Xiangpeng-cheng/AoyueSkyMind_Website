/* =============================================================
   services/motion.js  指针视差 / 光晕跟随（DJI 级沉浸）
   ============================================================= */

export function setupMotion() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const visual = document.querySelector('.hero-visual');
  const aurora = document.querySelector('.hero .aurora');

  if (visual && window.matchMedia('(pointer: fine)').matches) {
    let raf = 0;
    let tx = 0;
    let ty = 0;
    window.addEventListener('pointermove', function (e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 18;
      ty = (e.clientY / window.innerHeight - 0.5) * 12;
      if (!raf) {
        raf = requestAnimationFrame(function () {
          visual.style.transform = 'translate3d(' + tx + 'px,' + ty + 'px,0)';
          raf = 0;
        });
      }
    }, { passive: true });
  }

  if (aurora) {
    window.addEventListener('scroll', function () {
      aurora.style.transform = 'translate3d(0,' + (window.scrollY * 0.12) + 'px,0)';
    }, { passive: true });
  }
}
