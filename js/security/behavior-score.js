/* =============================================================
   security/behavior-score.js  行为评分
   - 监听鼠标/键盘/触屏/聚焦事件，累积得分
   - 得分低于阈值 → 视为机器
   - 表单提交时将当前得分写入 hidden input
   ============================================================= */

const EVENTS = ['mousemove', 'keydown', 'touchstart', 'focus'];
const THRESHOLD = 3;

export function attach(form, hiddenInput, threshold) {
  if (!form || !hiddenInput) return;
  const limit = typeof threshold === 'number' ? threshold : THRESHOLD;
  let score = 0;

  function bump() {
    score = Math.min(100, score + 1 + Math.random() * 2);
  }
  EVENTS.forEach(function (evt) {
    form.addEventListener(evt, bump, { passive: true });
  });

  function flush() {
    hiddenInput.value = String(Math.round(score));
  }
  form.addEventListener('submit', flush);
  setInterval(flush, 2000);

  return {
    getScore: function () { return Math.round(score); },
    isHuman: function () { return score >= limit; },
  };
}
