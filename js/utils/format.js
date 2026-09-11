/* =============================================================
   utils/format.js  格式化工具
   ============================================================= */

/** 数字千分位 */
export function formatNumber(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/** 平滑数字递增 */
export function animateNumber(el, target, duration, suffix) {
  suffix = suffix || '';
  duration = duration || 1200;
  const start = performance.now();
  const from = 0;
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const value = Math.round(from + (target - from) * eased);
    el.textContent = value + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/** 复制到剪贴板（降级方案） */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  } catch (e) {
    return false;
  }
}

/** 简单的 sleep */
export function sleep(ms) {
  return new Promise(function (resolve) { setTimeout(resolve, ms); });
}
