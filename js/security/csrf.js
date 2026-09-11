/* =============================================================
   security/csrf.js  CSRF Token 管理
   - 前端层防御：会话级 token + 提交后轮换
   - 生产环境必须由后端下发并校验
   ============================================================= */

import { randomToken } from '../utils/random.js';

const STORAGE_KEY = 'aoyue_csrf';

export function getToken() {
  let token = null;
  try { token = sessionStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  if (!token) {
    token = randomToken(24);
    try { sessionStorage.setItem(STORAGE_KEY, token); } catch (e) { /* ignore */ }
  }
  return token;
}

export function rotateToken() {
  const token = randomToken(24);
  try { sessionStorage.setItem(STORAGE_KEY, token); } catch (e) { /* ignore */ }
  return token;
}

export function attachToForm(form, fieldName) {
  if (!form) return;
  let input = form.querySelector('input[name="' + (fieldName || 'csrf_token') + '"]');
  if (!input) {
    input = document.createElement('input');
    input.type = 'hidden';
    input.name = fieldName || 'csrf_token';
    form.appendChild(input);
  }
  input.value = getToken();
}
