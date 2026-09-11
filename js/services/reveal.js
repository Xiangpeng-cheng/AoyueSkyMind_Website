/* =============================================================
   services/reveal.js  滚动渐入
   - Hero 立即可见
   - 其余区块进入视口再播放
   - 超时兜底，避免 Observer 异常导致整页空白
   ============================================================= */

import { $$ } from '../utils/dom.js';

export function setupReveal() {
  const targets = $$('.reveal, .section-title');
  if (!targets.length) return;

  targets.forEach(function (el, i) {
    if (el.closest('.hero')) {
      el.classList.add('in');
      return;
    }
    el.style.setProperty('--reveal-delay', (i % 6) * 70 + 'ms');
  });

  const fallback = window.setTimeout(function () {
    targets.forEach(function (el) { el.classList.add('in'); });
  }, 1800);

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
    window.clearTimeout(fallback);
    return;
  }

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  targets.forEach(function (el) { io.observe(el); });
}
