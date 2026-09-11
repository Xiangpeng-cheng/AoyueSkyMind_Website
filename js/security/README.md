# security 模块说明

按"职责单一"原则拆分的客户端层防御。**仅作为前端兜底，生产环境必须由服务端再次校验**。

| 文件 | 职责 |
| --- | --- |
| [csrf.js](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/js/security/csrf.js) | CSRF token 生成、轮换、注入到表单 |
| [captcha.js](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/js/security/captcha.js) | 前端算术验证码（基础防自动化） |
| [rate-limiter.js](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/js/security/rate-limiter.js) | 频率限速（1 分钟最多 3 次） |
| [honeypot.js](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/js/security/honeypot.js) | 蜜罐字段检测 |
| [behavior-score.js](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/js/security/behavior-score.js) | 行为评分（鼠标/键盘/触屏/聚焦累积） |
| [validator.js](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/js/security/validator.js) | 输入校验（白名单字符 + 长度 + 控制字符过滤） |

## 防御矩阵

| 攻击类型 | 前端兜底 | 生产侧必须 |
| --- | --- | --- |
| XSS | `esc/attr` 转义、CSP meta | 服务端再次转义、CSP 响应头、DOMPurify |
| CSRF | 会话级 token + 提交后轮换 | 服务端下发并校验、SameSite=Strict Cookie |
| SQL 注入 | 字段白名单 + 长度截断 | 参数化查询 / ORM、对 LIKE 通配符转义 |
| 暴力刷表单 | 频率限速、行为评分、验证码、蜜罐 | WAF / 网关限速、reCAPTCHA、威胁情报 |
| 凭据填充 | 表单字段长度限制 | 登录限速、账号锁定、设备指纹 |

> 详细部署清单见 [docs/SECURITY.md](../../docs/SECURITY.md)。
