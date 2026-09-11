# 部署与性能优化

## 部署清单

### 静态托管
- 推荐：阿里云 OSS / 腾讯云 COS + CDN + 自定义域名。
- 启用 HTTPS（证书托管）+ HSTS。
- 启用 Brotli 压缩与 HTTP/2（或 HTTP/3）。
- 配置缓存策略：
  - HTML：`Cache-Control: no-cache`
  - CSS/JS/SVG：长缓存（1 年）+ 文件名哈希（当前为路径稳定型，可加 `?v=1`）。

### 反向代理（Nginx 示例）
```nginx
# /etc/nginx/sites-enabled/aoyue.conf
server {
  listen 443 ssl http2;
  server_name www.aoyue-uav.com;

  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers HIGH:!aNULL:!MD5;

  add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "DENY" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;
  add_header Permissions-Policy "accelerometer=(),camera=(),geolocation=(),gyroscope=(),microphone=(),payment=(),usb=()" always;
  add_header Content-Security-Policy "default-src 'self'; img-src 'self' https: data: blob:; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; script-src 'self'; connect-src 'self' https://api.aoyue-uav.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests" always;

  root /var/www/aoyue;
  index index.html;

  location ~* \.(?:css|js|svg|png|jpg|jpeg|webp|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  location / { try_files $uri $uri/ /index.html; }
}
```

### CDN 缓存策略
| 资源 | 缓存 TTL | 备注 |
| --- | --- | --- |
| HTML | no-cache | 始终回源 |
| CSS / JS | 1y + 文件名版本 | immutable |
| SVG / 图片 | 1y + 文件名版本 | immutable |
| 字体 | 1y | gstatic 已经处理 |

## 性能优化（已完成）
- 5 个 CSS 文件合计 < 12 KB（未压缩）。
- JS 模块懒加载：`<script type="module" defer>`。
- 首屏图 `fetchpriority="high"` + `preload`。
- 字体 `display=swap` + `preconnect`。
- 滚动渐入 `IntersectionObserver`，避免布局抖动。
- 适配 `prefers-reduced-motion`。

## 性能目标（Web Vitals）
| 指标 | 目标 |
| --- | --- |
| LCP | ≤ 2.5s |
| FID / INP | ≤ 200ms |
| CLS | ≤ 0.1 |
| TTFB | ≤ 600ms |

## 容量与可用性
- 单实例 4C8G 即可支撑百万 PV/月（静态）。
- CDN 多地域缓存，主源就近回源。
- 监控：CDN 命中率、回源率、源站 5xx。
