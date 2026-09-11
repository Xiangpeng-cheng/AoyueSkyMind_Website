/* =============================================================
   services/nav.js  顶部导航
   - 滚动状态、移动端抽屉、平滑锚点、当前章节高亮
   ============================================================= */

import { $, $$ } from '../utils/dom.js';
import { navSections } from '../data/content.js';

export function setupNav() {
  const nav = $('#nav');
  const burger = $('#burger');
  const panel = $('#mobile-panel');
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
      const open = panel.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: top, behavior: 'smooth' });
      if (panel) panel.classList.remove('open');
      if (burger) burger.setAttribute('aria-expanded', 'false');
    });
  });

  function updateActiveLink() {
    const sections = navSections
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);
    const scrollPos = window.scrollY + 120;
    let current = sections.length ? sections[0].id : '';
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= scrollPos) current = sections[i].id;
    }
    $$('.nav-link').forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
}
