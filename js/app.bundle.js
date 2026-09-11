/*!
 * Aoyue SkyMind · 站点前端入口（standalone bundle）
 *
 * 本文件由 js/ 下的 17 个 ES Module 合并生成（IIFE 单文件，零依赖）：
 *   utils/{dom,escape,format,random}.js
 *   data/content.js
 *   security/{csrf,captcha,rate-limiter,validator,honeypot,behavior-score}.js
 *   services/{nav,reveal,counter,render,form,structured-data}.js
 *
 * 设计原则：
 *   1. 安全：所有动态内容经 esc() 转义；表单接入 CSRF / 蜜罐 / 行为评分 / 验证码 / 频率限速
 *   2. 高效：IIFE 一次性加载，零模块请求；事件监听被动化，IntersectionObserver 懒触发
 *   3. 模块化：源文件保持模块化结构，bundle 仅为本地预览 / 静态部署的构建产物
 *
 * 使用：在 index.html 中以 <script defer src="js/app.bundle.js"></script> 引入
 */
(function () {
  'use strict';

  /* ============================================================
   *  utils/dom
   * ============================================================ */
  function $(selector, root) {
    return (root || document).querySelector(selector);
  }
  function $$(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }
  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        var value = attrs[key];
        if (value == null || value === false) return;
        if (key === 'class') el.className = value;
        else if (key === 'style' && typeof value === 'object') Object.assign(el.style, value);
        else if (key.indexOf('on') === 0 && typeof value === 'function') {
          el.addEventListener(key.slice(2).toLowerCase(), value);
        } else if (key === 'html') {
          el.innerHTML = value;
        } else {
          el.setAttribute(key, value);
        }
      });
    }
    if (children != null) {
      var list = Array.isArray(children) ? children : [children];
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

  /* ============================================================
   *  utils/escape  XSS / 注入防御
   * ============================================================ */
  var HTML_ENTITIES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };
  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"'`=\/]/g, function (ch) {
      return HTML_ENTITIES[ch] || ch;
    });
  }
  function jsonSafe(obj) {
    return JSON.stringify(obj)
      .replace(/<\/(script)/gi, '<\\/$1')
      .replace(/<!--/g, '\\u003c!--');
  }
  var CTL_RE = /[\u0000-\u001F\u007F]/g;
  function stripCtl(value) {
    return String(value == null ? '' : value).replace(CTL_RE, '');
  }
  function sanitizeText(value, maxLength) {
    var v = stripCtl(value).trim();
    return maxLength && v.length > maxLength ? v.slice(0, maxLength) : v;
  }

  /* ============================================================
   *  utils/format
   * ============================================================ */
  function animateNumber(el, target, duration, suffix) {
    suffix = suffix || '';
    duration = duration || 1200;
    var start = performance.now();
    function tick(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      var value = Math.round((target) * eased);
      el.textContent = value + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  function sleep(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  /* ============================================================
   *  utils/random  加密随机
   * ============================================================ */
  function randomToken(bytes) {
    bytes = bytes || 24;
    var buf = new Uint8Array(bytes);
    var cryptoObj = (typeof window !== 'undefined' && (window.crypto || window.msCrypto)) || null;
    if (cryptoObj && cryptoObj.getRandomValues) {
      cryptoObj.getRandomValues(buf);
    } else {
      for (var i = 0; i < buf.length; i++) buf[i] = Math.floor(Math.random() * 256);
    }
    var out = '';
    for (var j = 0; j < buf.length; j++) {
      var hex = (buf[j] + 0x100).toString(16);
      out += hex.slice(1);
    }
    return out;
  }
  function randomInt(min, max) {
    var range = max - min + 1;
    var buf = new Uint8Array(4);
    var c = (window.crypto || window.msCrypto);
    if (c && c.getRandomValues) c.getRandomValues(buf);
    else buf[0] = Math.floor(Math.random() * 256);
    var n = (buf[0] << 24 | buf[1] << 16 | buf[2] << 8 | buf[3]);
    // 取绝对值避免负数取模
    return min + (Math.abs(n)) % range;
  }

  /* ============================================================
   *  data/content  站点文案与数据（已进行专业化润色）
   * ============================================================ */
  var company = {
    name: '武汉翱越智控科技有限公司',
    shortName: '武汉翱越智控',
    brand: 'Aoyue SkyMind',
    tagline: '智能飞行 · 精准控制 · 为低空生产力而生',
    email: 'contact@aoyue-uav.com',
    hours: '周一至周五 09:00 - 18:00',
    qualification: '公司已通过质量管理体系认证并取得行业相关资质，具体信息以登记机关与官方网站公示为准。',
  };

  var partners = [
    '电力能源行业用户',
    '地理信息与测绘单位',
    '应急管理领域客户',
    '现代化农业生产企业',
    '林业与生态保护机构',
    '城市治理与园区运营方',
    '高校与科研院所',
    '系统集成与生态合作伙伴',
  ];

  var products = [
    { name: 'Aoyue M500 长续航多旋翼', tag: '面向电力巡检、应急救援与测绘建模的旗舰六旋翼平台', cat: '工业无人机' },
    { name: 'Aoyue X12 复合翼无人机',   tag: '融合多旋翼垂直起降与固定翼长航时特性', cat: '工业无人机' },
    { name: 'Aoyue T70 重载作业平台',   tag: '面向植保与中短途物流的大载重任务平台', cat: '工业无人机' },
    { name: 'SkyMind FC-X 飞控系统',   tag: '双冗余 IMU 与 AI 协处理器架构', cat: '飞控载荷' },
    { name: 'Aoyue G200 便携地面站',   tag: '三防一体式任务控制终端', cat: '地面站' },
    { name: 'Aoyue Link Pro 图数链路', tag: '远距离图数一体化 OFDM 加密链路', cat: '链路通信' },
  ];

  var shoton = [
    { title: '电力廊道精细化巡检',  tag: '多旋翼 · 可见光 + 红外双光融合' },
    { title: '灾后态势快速建模',    tag: '复合翼 · 倾斜摄影' },
    { title: '城市低空数字化巡查',  tag: '多机协同 · AI 识别' },
    { title: '农田变量精准喷洒',    tag: '重载平台 · 处方图作业' },
  ];

  var solutions = [
    { title: '电力巡检',   cat: '能源', summary: '杆塔、金具与绝缘子的常态化精细巡检，融合可见光、红外与三维建模。' },
    { title: '测绘建模',   cat: '测绘', summary: '免相控倾斜摄影与机载 LiDAR 一体化建模，高精度成果输出。' },
    { title: '应急救援',   cat: '应急', summary: '侦查、中继、喊话与物资投送协同作业，全流程态势感知。' },
    { title: '智慧农业',   cat: '农业', summary: '从变量喷洒到长势评估的全周期作业闭环，赋能精准农业。' },
    { title: '林业防护',   cat: '林业', summary: '红外烟火识别与网格化巡逻航线，构建全天候防护网络。' },
    { title: '智慧城市',   cat: '城市', summary: '违建识别、交通监测与市容事件主动上报，支撑城市精细化治理。' },
  ];

  var payloads = [
    { title: '飞控系统', desc: '双冗余 IMU、AI 协处理器与毫秒级故障切换，保障飞行安全。' },
    { title: '吊舱与载荷', desc: '可见光、红外、多光谱与激光雷达多模态载荷灵活组合。' },
    { title: '图数链路', desc: '自研 OFDM 远距图数一体链路，端到端加密传输。' },
    { title: '地面站', desc: '便携三防与机柜指挥席多形态适配，满足不同作业规模。' },
    { title: '动力能源', desc: '高能量密度智能电池与混合动力系统，支撑长航时作业。' },
    { title: '数据平台', desc: '航线规划、数据治理与 AI 识别服务一体化运营。' },
  ];

  var navSections = ['home', 'products', 'solutions', 'payloads', 'about', 'contact'];

  /* ============================================================
   *  security/csrf  CSRF Token 管理
   * ============================================================ */
  var CSRF_KEY = 'aoyue_csrf';
  function csrfGetToken() {
    var token = null;
    try { token = sessionStorage.getItem(CSRF_KEY); } catch (e) { /* ignore */ }
    if (!token) {
      token = randomToken(24);
      try { sessionStorage.setItem(CSRF_KEY, token); } catch (e) { /* ignore */ }
    }
    return token;
  }
  function csrfRotateToken() {
    var token = randomToken(24);
    try { sessionStorage.setItem(CSRF_KEY, token); } catch (e) { /* ignore */ }
    return token;
  }
  function csrfAttachToForm(form, fieldName) {
    if (!form) return;
    var name = fieldName || 'csrf_token';
    var input = form.querySelector('input[name="' + name + '"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      form.appendChild(input);
    }
    input.value = csrfGetToken();
  }

  /* ============================================================
   *  security/captcha  算术验证码
   * ============================================================ */
  var captcha = (function () {
    var answer = 0;
    return {
      refresh: function () {
        var a = randomInt(1, 9);
        var b = randomInt(1, 9);
        answer = a + b;
        var q = $('#captcha-q');
        var input = $('#captcha-input');
        if (q) q.textContent = '请计算 ' + a + ' + ' + b + ' = ?';
        if (input) input.value = '';
      },
      check: function (value) {
        return parseInt(value, 10) === answer;
      },
    };
  })();

  /* ============================================================
   *  security/rate-limiter  频率限速
   * ============================================================ */
  var RL_KEY = 'aoyue_submit_attempts';
  var RL_WINDOW_MS = 60 * 1000;
  var RL_MAX = 3;
  function rlRead() {
    try { return JSON.parse(sessionStorage.getItem(RL_KEY) || '[]'); } catch (e) { return []; }
  }
  function rlWrite(arr) {
    try { sessionStorage.setItem(RL_KEY, JSON.stringify(arr)); } catch (e) { /* ignore */ }
  }
  function canSubmit() {
    var now = Date.now();
    var arr = rlRead().filter(function (t) { return now - t < RL_WINDOW_MS; });
    if (arr.length >= RL_MAX) { rlWrite(arr); return false; }
    arr.push(now);
    rlWrite(arr);
    return true;
  }

  /* ============================================================
   *  security/validator  输入校验
   * ============================================================ */
  function isPhone(value) {
    return /^\+?[0-9 \-]{6,20}$/.test(value);
  }
  function isEmail(value) {
    if (!value) return true;
    return /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/.test(value);
  }
  function isText(value, min, max) {
    var v = sanitizeText(value);
    if (typeof min === 'number' && v.length < min) return false;
    if (typeof max === 'number' && v.length > max) return false;
    return v.length > 0;
  }
  function validate(payload, rules) {
    var errors = {};
    Object.keys(rules).forEach(function (key) {
      var rule = rules[key];
      var value = payload[key];
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

  /* ============================================================
   *  security/honeypot  蜜罐字段
   * ============================================================ */
  function isHoneypotTriggered(form, fieldName) {
    if (!form) return false;
    var hp = form.querySelector('input[name="' + (fieldName || 'website') + '"]');
    return !!(hp && hp.value && hp.value.trim().length > 0);
  }

  /* ============================================================
   *  security/behavior-score  行为评分
   * ============================================================ */
  var BEHAVIOR_EVENTS = ['mousemove', 'keydown', 'touchstart', 'focus'];
  var BEHAVIOR_THRESHOLD = 3;
  function attachBehavior(form, hiddenInput, threshold) {
    if (!form || !hiddenInput) return null;
    var limit = typeof threshold === 'number' ? threshold : BEHAVIOR_THRESHOLD;
    var score = 0;
    function bump() {
      score = Math.min(100, score + 1 + Math.random() * 2);
    }
    BEHAVIOR_EVENTS.forEach(function (evt) {
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

  /* ============================================================
   *  services/nav  顶部导航
   *  - 首页：滚动监听高亮当前 section
   *  - 子页面：通过 HTML 静态高亮（aria-current="page"），
   *           updateActiveLink 直接跳过避免破坏静态高亮
   * ============================================================ */
  function isIndexPage() {
    var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    return path === '' || path === 'index.html' || path === '/';
  }

  function setupNav() {
    var nav = $('#nav');
    var burger = $('#burger');
    var panel = $('#mobile-panel');
    if (!nav) return;

    function onScroll() {
      if (window.scrollY > 16) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
      updateActiveLink();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (burger && panel) {
      burger.addEventListener('click', function () {
        var open = panel.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    // 处理页面内 # 锚点平滑滚动（仅在首页有效，子页面通常没有这些锚点）
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href').slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: top, behavior: 'smooth' });
        if (panel) panel.classList.remove('open');
        if (burger) burger.setAttribute('aria-expanded', 'false');
      });
    });

    function updateActiveLink() {
      // 子页面：保留 HTML 静态高亮（aria-current="page" 或 .active 类）
      if (!isIndexPage()) return;

      var sections = navSections
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);
      var scrollPos = window.scrollY + 120;
      var current = sections.length ? sections[0].id : '';
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= scrollPos) current = sections[i].id;
      }
      $$('.nav-link').forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
      });
    }
  }

  /* ============================================================
   *  services/reveal  滚动渐入（立即可见兜底）
   * ============================================================ */
  function setupReveal() {
    var targets = $$('.reveal, .section-title');
    if (!targets.length) return;
    // 立即加 .in 防止任何异常导致首屏空白
    targets.forEach(function (el) { el.classList.add('in'); });
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
   *  services/counter  数字滚动
   * ============================================================ */
  function setupCounters() {
    var els = $$('[data-counter]');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) {
        el.textContent = el.getAttribute('data-counter') + (el.getAttribute('data-suffix') || '');
      });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-counter'), 10) || 0;
        var suffix = el.getAttribute('data-suffix') || '';
        animateNumber(el, target, 1400, suffix);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
   *  services/render  内容渲染（全部经 esc() 转义）
   * ============================================================ */
  var ARROW_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';

  function renderMarquee() {
    var track = $('#marquee');
    if (!track) return;
    var frag = document.createDocumentFragment();
    partners.concat(partners).forEach(function (name) {
      frag.appendChild(
        h('span', { class: 'marquee-item' }, [
          name,
          h('span', { class: 'dot' }),
        ]),
      );
    });
    track.appendChild(frag);
  }

  function renderProducts() {
    var root = $('#carousel');
    if (!root) return;
    root.innerHTML = products.map(function (p) {
      return [
        '<a class="product-card" href="#payloads">',
        '  <div class="media"><span class="card-tag">' + esc(p.cat) + '</span></div>',
        '  <div class="body">',
        '    <div>',
        '      <div class="name">' + esc(p.name) + '</div>',
        '      <div class="tag">' + esc(p.tag) + '</div>',
        '    </div>',
        '    <div class="footer"><span>了解详情</span><span class="arrow">' + ARROW_SVG + '</span></div>',
        '  </div>',
        '</a>',
      ].join('');
    }).join('');

    var prev = $('#prev'), next = $('#next');
    if (prev) prev.addEventListener('click', function () { scrollBy(-1); });
    if (next) next.addEventListener('click', function () { scrollBy(1); });
    function scrollBy(dir) {
      var w = root.clientWidth * 0.7;
      root.scrollBy({ left: dir * w, behavior: 'smooth' });
    }
  }

  function renderShotOn() {
    var root = $('#shot-grid');
    if (!root) return;
    root.innerHTML = shoton.map(function (item) {
      return [
        '<a class="card" href="#solutions">',
        '  <div class="card-media"><span class="card-tag">Shot on Aoyue</span></div>',
        '  <div class="card-body">',
        '    <span style="font-size:11px;letter-spacing:.4em;color:var(--brand-cyan);text-transform:uppercase">' + esc(item.tag) + '</span>',
        '    <h3 style="font-family:Manrope;font-size:22px;color:#fff;margin:6px 0 0">' + esc(item.title) + '</h3>',
        '    <span class="arrow" style="margin-top:12px">' + ARROW_SVG + '</span>',
        '  </div>',
        '</a>',
      ].join('');
    }).join('');
  }

  function renderSolutions() {
    var root = $('#solutions-grid');
    if (!root) return;
    root.innerHTML = solutions.map(function (s) {
      return [
        '<a class="card" href="#contact">',
        '  <div class="card-media"><span class="card-tag">' + esc(s.cat) + '</span></div>',
        '  <div class="card-body">',
        '    <h3 style="font-family:Manrope;font-size:22px;color:#fff;margin:0">' + esc(s.title) + '</h3>',
        '    <p style="margin:6px 0 0;color:var(--haze-300);font-size:14px;line-height:1.6">' + esc(s.summary) + '</p>',
        '  </div>',
        '</a>',
      ].join('');
    }).join('');
  }

  function renderPayloads() {
    var root = $('#payloads-grid');
    if (!root) return;
    root.innerHTML = payloads.map(function (p) {
      return [
        '<div class="card" style="padding:28px">',
        '  <div style="width:44px;height:44px;border-radius:12px;background:rgba(255,255,255,.05);display:inline-flex;align-items:center;justify-content:center;color:var(--brand-cyan);font-family:Manrope;font-weight:700">' + esc(p.title.slice(0, 1)) + '</div>',
        '  <h3 style="font-family:Manrope;font-size:18px;color:#fff;margin:16px 0 6px">' + esc(p.title) + '</h3>',
        '  <p style="color:var(--haze-300);font-size:13.5px;line-height:1.7;margin:0">' + esc(p.desc) + '</p>',
        '</div>',
      ].join('');
    }).join('');
  }

  function renderCompanyQualification() {
    var node = $('#qualification');
    if (node) node.textContent = company.qualification;
  }

  /* ============================================================
   *  services/form  表单编排
   * ============================================================ */
  var RULES = {
    name:    { required: true, min: 1, max: 40, message: '请输入 1-40 个字符的姓名' },
    company: { required: true, min: 1, max: 80, message: '请输入公司名称' },
    phone:   { required: true, type: 'phone', message: '请输入有效的电话号码' },
    email:   { type: 'email', max: 120, message: '邮箱格式不正确' },
    message: { required: true, min: 10, max: 2000, message: '请输入 10-2000 个字符的需求描述' },
  };

  function setupForms() {
    var form = $('#contact-form');
    var sub = $('#subscribe-form');
    if (!form || !sub) return;

    csrfAttachToForm(form);

    var scoreInput = $('#behavior_score');
    var behavior = attachBehavior(form, scoreInput);

    captcha.refresh();

    function formStatus(msg, type) {
      var el = $('#form-status');
      el.className = 'form-status ' + (type || '');
      el.textContent = msg;
    }
    function setInvalid(input, bad) {
      var field = input.closest('.field');
      if (field) field.classList.toggle('invalid', !!bad);
    }
    form.addEventListener('input', function (e) {
      var field = e.target.closest('.field');
      if (field) field.classList.remove('invalid');
    });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (isHoneypotTriggered(form)) {
        formStatus('已收到您的需求，我们会尽快与您联系。', 'success');
        return;
      }
      if (!behavior || !behavior.isHuman()) {
        formStatus('检测到异常提交行为，请稍后再试。', 'error');
        return;
      }
      if (!canSubmit()) {
        $('#throttle-banner').style.display = 'block';
        formStatus('操作过于频繁，请稍后再试。', 'error');
        return;
      }
      $('#throttle-banner').style.display = 'none';

      var payload = {
        name:    sanitizeText(form.name.value, 40),
        company: sanitizeText(form.company.value, 80),
        phone:   sanitizeText(form.phone.value, 20),
        email:   sanitizeText(form.email.value, 120),
        message: sanitizeText(form.message.value, 2000),
        captcha: sanitizeText($('#captcha-input').value, 4),
      };

      var errors = validate(payload, RULES);
      var bad = false;
      Object.keys(RULES).forEach(function (key) {
        var input = form.querySelector('[name="' + key + '"]');
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

      var btn = $('#submit-btn');
      btn.disabled = true;
      btn.style.opacity = '.6';
      try {
        await sleep(700);
        csrfRotateToken();
        csrfAttachToForm(form);
        formStatus('已收到您的需求，我们将在 24 小时内与您联系。', 'success');
        form.reset();
        captcha.refresh();
        if (scoreInput) scoreInput.value = '0';
      } finally {
        btn.disabled = false;
        btn.style.opacity = '';
      }
    });

    sub.addEventListener('submit', async function (e) {
      e.preventDefault();
      var email = sanitizeText(sub.email.value, 120);
      if (!isEmail(email)) {
        sub.querySelector('input').focus();
        return;
      }
      var btn = $('#subscribe-btn');
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

  /* ============================================================
   *  services/structured-data  JSON-LD 注入
   * ============================================================ */
  function injectStructuredData() {
    var node = $('#ld-company');
    if (!node) return;
    var url = location.origin + location.pathname.replace(/[^/]*$/, '');
    // 子页面位于 pages/ 子目录时，共享资源在上级目录，需向上回溯一层
    if (/\/pages\/$/.test(url)) url = url.replace(/\/pages\/$/, '/');
    var data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: company.name,
      alternateName: company.brand,
      url: location.origin + location.pathname,
      logo: url + 'assets/svg/logo_blue.svg',
      contactPoint: [{
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: company.email,
        availableLanguage: ['zh-Hans'],
      }],
    };
    node.textContent = jsonSafe(data);
  }

  /* ============================================================
   *  应用入口（编排）
   * ============================================================ */
  function boot() {
    var year = $('#year');
    if (year) year.textContent = String(new Date().getFullYear());

    // 关键：先让所有 reveal 元素立刻可见
    try { setupReveal(); } catch (e) { console.error('[aoyue] setupReveal', e); }

    // 内容渲染：每个函数独立 try/catch，单个失败不影响其它模块
    [
      renderCompanyQualification,
      renderMarquee,
      renderProducts,
      renderShotOn,
      renderSolutions,
      renderPayloads,
    ].forEach(function (fn) {
      try { fn(); } catch (e) { console.error('[aoyue] render', fn.name, e); }
    });

    // 行为类
    [
      setupNav,
      setupCounters,
      setupForms,
      injectStructuredData,
    ].forEach(function (fn) {
      try { fn(); } catch (e) { console.error('[aoyue] service', fn.name, e); }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // 模块加载失败的兜底：保证 reveal 在 boot 异常时也能展示
  window.addEventListener('error', function () {
    document.querySelectorAll('.reveal, .section-title').forEach(function (el) {
      el.classList.add('in');
    });
  });
})();
