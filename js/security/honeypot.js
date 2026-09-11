/* =============================================================
   security/honeypot.js  蜜罐字段
   - 人类不可见，机器人会填充 → 静默拒绝
   ============================================================= */

export function isHoneypotTriggered(form, fieldName) {
  if (!form) return false;
  const hp = form.querySelector('input[name="' + (fieldName || 'website') + '"]');
  return !!(hp && hp.value && hp.value.trim().length > 0);
}
