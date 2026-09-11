/* =============================================================
   services/counter.js  数字滚动（首屏统计）
   ============================================================= */

import { $$ } from '../utils/dom.js';
import { animateNumber } from '../utils/format.js';

export function setupCounters() {
  const els = $$('[data-counter]');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) {
      el.textContent = el.getAttribute('data-counter') + (el.getAttribute('data-suffix') || '');
    });
    return;
  }

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-counter'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      animateNumber(el, target, 1400, suffix);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });

  els.forEach(function (el) { io.observe(el); });
}
