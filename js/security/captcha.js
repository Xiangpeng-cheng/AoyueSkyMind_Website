/* =============================================================
   security/captcha.js  前端算术验证码
   - 用于基础防自动化脚本；生产建议叠加 hCaptcha / reCAPTCHA
   ============================================================= */

import { $ } from '../utils/dom.js';
import { randomInt } from '../utils/random.js';

const captcha = (function () {
  let answer = 0;
  return {
    refresh: function () {
      const a = randomInt(1, 9);
      const b = randomInt(1, 9);
      answer = a + b;
      const q = $('#captcha-q');
      const input = $('#captcha-input');
      if (q) q.textContent = '请计算 ' + a + ' + ' + b + ' = ?';
      if (input) input.value = '';
    },
    check: function (value) {
      return parseInt(value, 10) === answer;
    },
  };
})();

export { captcha };
