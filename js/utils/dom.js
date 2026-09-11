/* =============================================================
   utils/dom.js  DOM 查询工具
   - 集中选择器逻辑，避免散落的 querySelector
   - $ : 单元素
   - $$ : 元素数组
   - on : 带可选委托的事件监听
   ============================================================= */
export function $(selector, root) {
  return (root || document).querySelector(selector);
}

export function $$(selector, root) {
  return Array.prototype.slice.call((root || document).querySelectorAll(selector));
}

export function on(target, event, handler, options) {
  if (!target) return () => {};
  target.addEventListener(event, handler, options);
  return () => target.removeEventListener(event, handler, options);
}

/** 创建带子节点的元素（轻量 hyperscript） */
export function h(tag, attrs, children) {
  const el = document.createElement(tag);
  if (attrs) {
    Object.keys(attrs).forEach(function (key) {
      const value = attrs[key];
      if (value == null || value === false) return;
      if (key === 'class') el.className = value;
      else if (key === 'style' && typeof value === 'object') Object.assign(el.style, value);
      else if (key.startsWith('on') && typeof value === 'function') {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === 'html') {
        el.innerHTML = value;
      } else {
        el.setAttribute(key, value);
      }
    });
  }
  if (children != null) {
    const list = Array.isArray(children) ? children : [children];
    list.forEach(function (c) {
      if (c == null || c === false) return;
      if (typeof c === 'string' || typeof c === 'number') {
        el.appendChild(document.createTextNode(String(c)));
      } else {
        el.appendChild(c);
      }
    });
  }
  return el;
}
