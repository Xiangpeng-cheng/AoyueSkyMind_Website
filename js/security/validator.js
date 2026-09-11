/* =============================================================
   security/validator.js  输入校验 / SQL 注入兜底
   - 服务端必须再做参数化查询 / ORM，本模块仅前端层兜底
   - 字段白名单字符 + 长度限制 + 控制字符过滤
   ============================================================= */

import { sanitizeText } from '../utils/escape.js';

export function isPhone(value) {
  return /^\+?[0-9 \-]{6,20}$/.test(value);
}

export function isEmail(value) {
  if (!value) return true; // 邮箱非必填
  return /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/.test(value);
}

export function isText(value, min, max) {
  const v = sanitizeText(value);
  if (typeof min === 'number' && v.length < min) return false;
  if (typeof max === 'number' && v.length > max) return false;
  return v.length > 0;
}

export function validate(payload, rules) {
  const errors = {};
  Object.keys(rules).forEach(function (key) {
    const rule = rules[key];
    const value = payload[key];
    if (rule.required && !sanitizeText(value)) {
      errors[key] = rule.message || '此项必填';
      return;
    }
    if (rule.type === 'phone' && value && !isPhone(sanitizeText(value))) {
      errors[key] = rule.message || '电话号码格式不正确';
      return;
    }
    if (rule.type === 'email' && value && !isEmail(sanitizeText(value))) {
      errors[key] = rule.message || '邮箱格式不正确';
      return;
    }
    if (rule.min || rule.max) {
      if (!isText(value, rule.min, rule.max)) {
        errors[key] = rule.message || ('长度需在 ' + rule.min + '-' + rule.max + ' 之间');
      }
    }
  });
  return errors;
}
