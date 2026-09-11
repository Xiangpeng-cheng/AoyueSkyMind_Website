/* =============================================================
   security/rate-limiter.js  频率限速
   - 默认：1 分钟窗口内最多 3 次
   - 持久化于 sessionStorage（标签页级隔离）
   ============================================================= */

const KEY = 'aoyue_submit_attempts';
const WINDOW_MS = 60 * 1000;
const MAX = 3;

function read() {
  try { return JSON.parse(sessionStorage.getItem(KEY) || '[]'); } catch (e) { return []; }
}
function write(arr) {
  try { sessionStorage.setItem(KEY, JSON.stringify(arr)); } catch (e) { /* ignore */ }
}

export function canSubmit() {
  const now = Date.now();
  const arr = read().filter(function (t) { return now - t < WINDOW_MS; });
  if (arr.length >= MAX) { write(arr); return false; }
  arr.push(now);
  write(arr);
  return true;
}

export function remaining() {
  const now = Date.now();
  const arr = read().filter(function (t) { return now - t < WINDOW_MS; });
  write(arr);
  return Math.max(0, MAX - arr.length);
}

export function reset() {
  try { sessionStorage.removeItem(KEY); } catch (e) { /* ignore */ }
}
