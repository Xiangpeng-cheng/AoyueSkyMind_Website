# 安全部署指南

部署到生产环境时，**必须由 Web 服务器 / WAF / 网关** 完成本指南列出的所有加固项。
前端模块仅作为客户端兜底。

## 1. HTTPS 与传输层
- 全站 HTTPS（TLS 1.2+，推荐 TLS 1.3）。
- HTTP 强制 301 → HTTPS。
- 启用 HSTS：`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- OCSP Stapling，禁用 RC4 / 3DES 等弱套件。

## 2. 安全响应头（Web 服务器下发）
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: accelerometer=(),camera=(),geolocation=(),gyroscope=(),microphone=(),payment=(),usb=()
Content-Security-Policy:
  default-src 'self';
  img-src 'self' https: data: blob:;
  style-src 'self' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  script-src 'self';
  connect-src 'self' https://api.aoyue-uav.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
  upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```
> `index.html` 中的 `<meta http-equiv>` 在 `file://` / 静态托管下生效；生产应使用响应头代替。

## 3. CSRF
- **会话级 token**（已实现）作为前端兜底。
- **生产必须**：后端使用 [Synchronizer Token Pattern](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) 或双重提交 Cookie。
- 所有状态变更请求使用 `SameSite=Strict` Cookie。

## 4. XSS
- 客户端：`utils/escape.js` 全量转义；`structured-data.js` 使用 `jsonSafe()`。
- 服务端：再次转义，对富文本使用 DOMPurify 白名单清洗。
- CSP `script-src 'self'` 禁止内联脚本执行。

## 5. SQL 注入
- **必须**使用参数化查询或 ORM；禁止字符串拼接。
- 对 `LIKE '%x%'` 中的 `%` `_` `\` 进行转义。
- 数据库账号最小权限原则；分离读写账号。

## 6. 敏感数据加密
| 类型 | 算法 |
| --- | --- |
| 用户密码 | Argon2id（首选） / bcrypt cost ≥ 12 |
| 敏感字段 | AES-256-GCM（KMS / HSM 托管密钥） |
| 内部通信 | mTLS |
| Token / Session | 不可逆哈希 + 过期时间 |

## 7. 防爬与反爬
**前端层（已实现）：**
- 蜜罐字段 `name="website"`
- 行为评分（鼠标/键盘/触屏/聚焦）
- 频率限速（1 分钟 3 次）
- 算术验证码

**边缘层（必须）：**
- IP 限速：单 IP 1 分钟 ≤ 60 请求，敏感接口 ≤ 5 次。
- UA 黑名单：空 UA、Python-requests、curl、headless 浏览器指纹。
- TLS 指纹（JA3 / JA4）异常识别。
- 威胁情报 IP 黑名单同步。
- hCaptcha / reCAPTCHA 策略化升级。
- Honeypot 路由：`/admin` `/wp-admin` 等敏感路径直返 403。

## 8. 监控与响应
- APM（OpenTelemetry → Prometheus / Grafana / SkyWalking）。
- 5xx 突增、登录失败突增、CSRF 校验失败、行为评分低值集中告警。
- 凭据轮换周期 ≤ 90 天。
- 应急响应预案与演练（季度）。

## 9. 合规
- 《网络安全法》《数据安全法》《个人信息保护法》。
- 隐私政策 / Cookie 同意横幅（GDPR / PIPL）。
- ICP / 公安备案（生产前补充真实备案号）。
