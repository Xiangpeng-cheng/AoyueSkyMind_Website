/* =============================================================
   services/reveal.js  滚动渐入
   - 立即给所有目标加上 .in，避免 JS / IntersectionObserver
     异常时整块 Hero 一直停在 opacity:0
   - 配合 .reveal.in 在 components.css 中的样式，文本始终可见
   ============================================================= */

import { $$ } from '../utils/dom.js';

export function setupReveal() {
  const targets = $$('.reveal, .section-title');
  if (!targets.length) return;

  // 立即可见（防止 IntersectionObserver 不可用 / module 加载失败时整页空白）
  targets.forEach(function (el) { el.classList.add('in'); });

  if (!('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) { io.observe(el); });
}
