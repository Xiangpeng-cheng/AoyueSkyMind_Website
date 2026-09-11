/* =============================================================
   services/render.js  内容渲染
   - 所有动态内容均通过 esc() 转义后用 innerHTML 注入；
     严格使用 h() 工具或属性赋值，避免拼接未转义字符串。
   ============================================================= */

import { $, h } from '../utils/dom.js';
import { esc } from '../utils/escape.js';
import { cinematicScene } from '../utils/scene.js';
import { partners, products, shoton, solutions, payloads, company } from '../data/content.js';

const ARROW_SVG = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>';

export function renderMarquee() {
  const track = $('#marquee');
  if (!track) return;
  const frag = document.createDocumentFragment();
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

export function renderProducts() {
  const root = $('#carousel');
  if (!root) return;
  const href = /\/pages\//.test(location.pathname) ? 'products.html' : 'pages/products.html';
  root.classList.toggle('is-solo', products.length === 1);
  root.innerHTML = products.map(function (p) {
    return [
      '<a class="product-card' + (products.length === 1 ? ' product-feature' : '') + '" href="' + href + '">',
      '  <div class="media">',
      '    <img src="' + cinematicScene(p.scene) + '" alt="' + esc(p.name) + '" width="800" height="500" loading="lazy" decoding="async" />',
      '    <span class="card-tag">' + esc(p.cat) + '</span>',
      '  </div>',
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

  const prev = $('#prev'), next = $('#next');
  if (prev) prev.addEventListener('click', function () { scrollBy(-1); });
  if (next) next.addEventListener('click', function () { scrollBy(1); });

  function scrollBy(dir) {
    const w = root.clientWidth * 0.7;
    root.scrollBy({ left: dir * w, behavior: 'smooth' });
  }
}

export function renderShotOn() {
  const root = $('#shot-grid');
  if (!root) return;
  root.innerHTML = shoton.map(function (item) {
    return [
      '<a class="card" href="#solutions">',
      '  <div class="card-media shot">',
      '    <img src="' + cinematicScene(item.scene) + '" alt="' + esc(item.title) + '" width="800" height="500" loading="lazy" decoding="async" />',
      '    <span class="card-tag">作业场景</span>',
      '  </div>',
      '  <div class="card-body">',
      '    <span style="font-size:11px;letter-spacing:.4em;color:var(--brand-cyan);text-transform:uppercase">' + esc(item.tag) + '</span>',
      '    <h3 style="font-family:Manrope;font-size:22px;color:#fff;margin:6px 0 0">' + esc(item.title) + '</h3>',
      '    <span class="arrow" style="margin-top:12px">' + ARROW_SVG + '</span>',
      '  </div>',
      '</a>',
    ].join('');
  }).join('');
}

export function renderSolutions() {
  const root = $('#solutions-grid');
  if (!root) return;
  root.innerHTML = solutions.map(function (s) {
    return [
      '<a class="card" href="#contact">',
      '  <div class="card-media scene">',
      '    <img src="' + cinematicScene(s.scene) + '" alt="' + esc(s.title) + '" width="800" height="500" loading="lazy" decoding="async" />',
      '    <span class="card-tag">' + esc(s.cat) + '</span>',
      '  </div>',
      '  <div class="card-body">',
      '    <h3 style="font-family:Manrope;font-size:22px;color:#fff;margin:0">' + esc(s.title) + '</h3>',
      '    <p style="margin:6px 0 0;color:var(--haze-300);font-size:14px;line-height:1.6">' + esc(s.summary) + '</p>',
      (s.offer && s.offer.length
        ? '<ul class="offer-list">' + s.offer.map(function (item) { return '<li>' + esc(item) + '</li>'; }).join('') + '</ul>'
        : ''),
      '  </div>',
      '</a>',
    ].join('');
  }).join('');
}

export function renderPayloads() {
  const root = $('#payloads-grid');
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

export function renderCompanyQualification() {
  const node = $('#qualification');
  if (node) node.textContent = company.qualification;
}

export function hydrateProductVisuals() {
  document.querySelectorAll('[data-scene]').forEach(function (el) {
    if (el.querySelector('img.scene-art')) return;
    const img = document.createElement('img');
    img.className = 'scene-art';
    img.src = cinematicScene(el.getAttribute('data-scene'));
    img.alt = el.getAttribute('data-alt') || '';
    img.width = 800;
    img.height = 500;
    img.decoding = 'async';
    img.loading = 'lazy';
    el.insertBefore(img, el.firstChild);
  });
}
