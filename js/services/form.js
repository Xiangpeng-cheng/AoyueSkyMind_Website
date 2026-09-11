/* =============================================================
   services/form.js  表单编排
   - 集成 CSRF、行为评分、验证码、蜜罐、频率限速
   - 订阅表单：仅邮箱校验
   ============================================================= */

import { $, $$ } from '../utils/dom.js';
import { sanitizeText } from '../utils/escape.js';
import { getToken, rotateToken, attachToForm } from '../security/csrf.js';
import { captcha } from '../security/captcha.js';
import { canSubmit } from '../security/rate-limiter.js';
import { isHoneypotTriggered } from '../security/honeypot.js';
import { attach as attachBehavior } from '../security/behavior-score.js';
import { validate, isPhone, isEmail } from '../security/validator.js';
import { sleep } from '../utils/format.js';

const RULES = {
  name:    { required: true, min: 1, max: 40, message: '请输入 1-40 个字符的姓名' },
  company: { required: true, min: 1, max: 80, message: '请输入公司名称' },
  phone:   { required: true, type: 'phone', message: '请输入有效的电话号码' },
  email:   { type: 'email', max: 120, message: '邮箱格式不正确' },
  message: { required: true, min: 10, max: 2000, message: '请输入 10-2000 个字符的需求描述' },
};

export function setupForms() {
  const form = $('#contact-form');
  const sub = $('#subscribe-form');
  if (!form || !sub) return;

  // CSRF
  attachToForm(form);

  // 行为评分
  const scoreInput = $('#behavior_score');
  const behavior = attachBehavior(form, scoreInput);

  // 验证码
  captcha.refresh();

  // 状态显示
  function formStatus(msg, type) {
    const el = $('#form-status');
    el.className = 'form-status ' + (type || '');
    el.textContent = msg;
  }

  // 字段错误提示
  function setInvalid(input, bad) {
    const field = input.closest('.field');
    if (field) field.classList.toggle('invalid', !!bad);
  }

  // 输入实时清除错误
  form.addEventListener('input', function (e) {
    const field = e.target.closest('.field');
    if (field) field.classList.remove('invalid');
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // 蜜罐
    if (isHoneypotTriggered(form)) {
      formStatus('已收到您的需求，我们会尽快与您联系。', 'success');
      return;
    }

    // 行为评分
    if (!behavior || !behavior.isHuman()) {
      formStatus('检测到异常提交行为，请稍后再试。', 'error');
      return;
    }

    // 频率限速
    if (!canSubmit()) {
      $('#throttle-banner').style.display = 'block';
      formStatus('操作过于频繁，请稍后再试。', 'error');
      return;
    }
    $('#throttle-banner').style.display = 'none';

    // 收集并清洗数据
    const payload = {
      name:    sanitizeText(form.name.value, 40),
      company: sanitizeText(form.company.value, 80),
      phone:   sanitizeText(form.phone.value, 20),
      email:   sanitizeText(form.email.value, 120),
      message: sanitizeText(form.message.value, 2000),
      captcha: sanitizeText($('#captcha-input').value, 4),
    };

    // 校验
    const errors = validate(payload, RULES);
    let bad = false;
    Object.keys(RULES).forEach(function (key) {
      const input = form.querySelector('[name="' + key + '"]');
      if (!input) return;
      setInvalid(input, !!errors[key]);
      if (errors[key]) bad = true;
    });

    if (!captcha.check(payload.captcha)) {
      formStatus('验证码不正确，请重新输入。', 'error');
      captcha.refresh();
      return;
    }
    if (bad) { formStatus('请检查表单中标红的字段。', 'error'); return; }

    // 模拟提交（前端）：实际项目应通过 fetch POST 到后端 API
    const btn = $('#submit-btn');
    btn.disabled = true;
    btn.style.opacity = '.6';

    try {
      await sleep(700); // 模拟网络往返
      rotateToken();
      attachToForm(form);
      formStatus('已收到您的需求，我们将在 24 小时内与您联系。', 'success');
      form.reset();
      captcha.refresh();
      if (scoreInput) scoreInput.value = '0';
    } finally {
      btn.disabled = false;
      btn.style.opacity = '';
    }
  });

  // 订阅表单
  sub.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = sanitizeText(sub.email.value, 120);
    if (!isEmail(email)) {
      sub.querySelector('input').focus();
      return;
    }
    const btn = $('#subscribe-btn');
    btn.disabled = true;
    btn.style.opacity = '.6';
    try {
      await sleep(500);
      btn.textContent = '已订阅';
      sub.email.value = '';
      await sleep(3000);
      btn.textContent = '立即订阅';
    } finally {
      btn.disabled = false;
      btn.style.opacity = '';
    }
  });
}
