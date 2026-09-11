/* =============================================================
   services/structured-data.js  JSON-LD 注入
   - SEO：Organization schema
   ============================================================= */

import { $ } from '../utils/dom.js';
import { jsonSafe } from '../utils/escape.js';
import { company } from '../data/content.js';

export function injectStructuredData() {
  const node = $('#ld-company');
  if (!node) return;
  // 子页面位于 pages/ 子目录时，共享资源在上级目录，需向上回溯一层
  let url = location.origin + location.pathname.replace(/[^/]*$/, '');
  if (/\/pages\/$/.test(url)) url = url.replace(/\/pages\/$/, '/');
  const data = {
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
