# 武汉翱越智控 · 官方网站

> 武汉翱越智控科技有限公司（Aoyue SkyMind）官方网站。
> 纯静态、零依赖、模块化，按行业最佳实践构建。

- **纯静态**：无构建步骤，浏览器直接渲染
- **模块化**：原生 ES Modules，按职责分层（`utils` / `data` / `security` / `services`）
- **零运行时依赖**：不引入任何第三方库

## 快速开始

### 1. 获取代码
```bash
git clone git@gitee.com:xiang-pengcheng/AoyueSkyMind_Website.git
cd AoyueSkyMind_Website
```
> HTTPS 方式：`https://gitee.com/xiang-pengcheng/AoyueSkyMind_Website.git`

### 2. 本地预览
- **直接打开**：双击 [index.html](index.html)，浏览器以 `file:///` 协议渲染。
- **本地服务**（推荐，避免部分浏览器的本地文件限制）：
  ```bash
  python -m http.server 8080
  ```
  访问 <http://localhost:8080/>。

### 3. 常用脚本（可选，Node ≥ 18）
| 命令 | 作用 |
| --- | --- |
| `npm run serve` | `npx serve -l 8080 .` 启动本地服务 |
| `npm run lint` | `eslint js/` 检查 JS 规范 |

### 4. 运行单元测试
双击 [tests/runner.html](tests/runner.html)，在浏览器内运行。

## 项目结构
```
index.html               入口（仅 HTML 结构 + 资源引用）
pages/                   子页面（关于 / 产品 / 方案 / 载荷 / 联系）
assets/
  svg/                   图片资源（logo / 主视觉）
css/                     样式（tokens + 5 个分文件 + 注释）
js/
  main.js                入口（按顺序加载模块）
  app.bundle.js          打包产物
  utils/                 DOM / 转义 / 格式化 / 加密随机
  data/                  内容数据（集中可审计）
  security/              CSRF / 验证码 / 限速 / 蜜罐 / 行为评分 / 校验
  services/              导航 / 渲染 / 表单 / JSON-LD / 动效
tests/                   浏览器内运行的单元测试
docs/                    架构 / 安全 / 部署 / 内容审核 / 变更日志
package.json             元信息（scripts 仅作指引）
.eslintrc.json           JS 规范
.editorconfig            编辑器格式规范
```

## 已实施的最佳实践
- **HTTPS / TLS**：详见 [docs/SECURITY.md](docs/SECURITY.md)
- **CSRF**：token 生成 / 校验 / 轮换（前端 + 服务端双重）
- **XSS**：HTML 转义 + CSP + `</script>` 终止符防御
- **SQL 注入**：字段白名单 + 长度截断 + 强制参数化查询（生产）
- **敏感数据加密**：Argon2id 密码 / AES-256-GCM 字段
- **性能**：CSS 拆分 < 12 KB、JS 模块 defer、preload、字体 swap、`prefers-reduced-motion` 适配
- **防爬**：蜜罐 / 行为评分 / 频率限速 / 算术验证码（前端）+ WAF（生产）
- **内容审核**：所有文案集中在 [js/data/content.js](js/data/content.js)，变更同步记录到 [docs/CHANGELOG.md](docs/CHANGELOG.md)

## 文档索引
- [docs/README.md](docs/README.md) — 文档总览
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — 模块架构
- [docs/SECURITY.md](docs/SECURITY.md) — 安全部署
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — 性能与部署
- [docs/CONTENT-AUDIT.md](docs/CONTENT-AUDIT.md) — 内容审核
- [docs/CHANGELOG.md](docs/CHANGELOG.md) — 变更日志

## 相关链接
- [腾讯云](https://www.tencentcloud.com/zh)
- [阿里云](https://www.aliyun.com/)
