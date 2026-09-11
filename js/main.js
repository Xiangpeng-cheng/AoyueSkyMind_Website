/* =============================================================
   main.js  应用入口
   - 仅负责编排各模块的初始化顺序
   ============================================================= */

import { $ } from './utils/dom.js';
import { setupNav } from './services/nav.js';
import { setupReveal } from './services/reveal.js';
import { setupCounters } from './services/counter.js';
import {
  renderMarquee,
  renderProducts,
  renderShotOn,
  renderSolutions,
  renderPayloads,
  renderCompanyQualification,
} from './services/render.js';
import { setupForms } from './services/form.js';
import { injectStructuredData } from './services/structured-data.js';

function boot() {
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  // 关键：先让所有 reveal 元素立刻可见（避免动画/Observer 异常导致首屏空白）
  try { setupReveal(); } catch (e) { console.error('[aoyue] setupReveal', e); }

  // 内容渲染：每个函数独立 try/catch，单个失败不影响其它模块
  [
    renderCompanyQualification,
    renderMarquee,
    renderProducts,
    renderShotOn,
    renderSolutions,
    renderPayloads,
  ].forEach(function (fn) {
    try { fn(); } catch (e) { console.error('[aoyue] render', fn.name, e); }
  });

  // 行为类：单个失败不应影响整体
  [
    setupNav,
    setupCounters,
    setupForms,
    injectStructuredData,
  ].forEach(function (fn) {
    try { fn(); } catch (e) { console.error('[aoyue] service', fn.name, e); }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

// 模块加载失败的兜底：保证 reveal 在 boot 异常时也能展示
window.addEventListener('error', function () {
  document.querySelectorAll('.reveal, .section-title').forEach(function (el) {
    el.classList.add('in');
  });
});
