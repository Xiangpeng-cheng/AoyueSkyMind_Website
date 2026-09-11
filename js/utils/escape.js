/* =============================================================
   utils/escape.js  XSS / 注入防御
   - esc : HTML 实体转义
   - attr : 属性值转义
   - jsonSafe : 用于 JSON-LD 的安全序列化
   - stripCtl : 去除控制字符（防 SQL 注入 / 日志注入兜底）
   - sanitizeText : 综合清洗（trim + 去除控制字符 + 限制长度）
   ============================================================= */

const HTML_ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;',
};

export function esc(str) {
  return String(str == null ? '' : str).replace(/[&<>"'`=\/]/g, function (ch) {
    return HTML_ENTITIES[ch] || ch;
  });
}

export function attr(str) {
  // 属性值：去除换行与控制字符，HTML 转义
  return String(str == null ? '' : str)
    .replace(/[\r\n\t]/g, ' ')
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[&<>"'`=\/]/g, function (ch) {
      return HTML_ENTITIES[ch] || ch;
    });
}

export function jsonSafe(obj) {
  // </script> 终止符防御
  return JSON.stringify(obj)
    .replace(/<\/(script)/gi, '<\\/$1')
    .replace(/<!--/g, '\\u003c!--');
}

const CTL_RE = /[\u0000-\u001F\u007F]/g;
export function stripCtl(value) {
  return String(value == null ? '' : value).replace(CTL_RE, '');
}

export function sanitizeText(value, maxLength) {
  const v = stripCtl(value).trim();
  return maxLength && v.length > maxLength ? v.slice(0, maxLength) : v;
}
