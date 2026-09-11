/* =============================================================
   utils/random.js  加密随机
   - 仅在加密上下文使用 crypto.getRandomValues
   - 生成 16 进制 token
   ============================================================= */

export function randomToken(bytes) {
  bytes = bytes || 24;
  const buf = new Uint8Array(bytes);
  const cryptoObj = (typeof window !== 'undefined' && (window.crypto || window.msCrypto)) || null;
  if (cryptoObj && cryptoObj.getRandomValues) {
    cryptoObj.getRandomValues(buf);
  } else {
    // 退化（不应在生产触发）
    for (let i = 0; i < buf.length; i++) buf[i] = Math.floor(Math.random() * 256);
  }
  let out = '';
  for (let i = 0; i < buf.length; i++) {
    const hex = (buf[i] + 0x100).toString(16);
    out += hex.slice(1);
  }
  return out;
}

export function randomInt(min, max) {
  const range = max - min + 1;
  const buf = new Uint8Array(4);
  (window.crypto || window.msCrypto).getRandomValues(buf);
  return min + (buf[0] << 24 | buf[1] << 16 | buf[2] << 8 | buf[3]) % range;
}
