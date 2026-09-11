# 变更日志

本文件记录所有面向用户的可见变更、模块结构变更与重大内容修订。
遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 规范。

## [Unreleased]

### Changed（重构）
- 将单文件 `app.js` (22 KB) 拆分为 `js/utils/*`、`js/data/*`、`js/security/*`、`js/services/*`、`js/main.js`，总计 17 个模块，平均每个 ≤ 100 行。
- 将内联 CSS（≈ 8 KB）拆分为 `css/tokens.css`、`css/base.css`、`css/layout.css`、`css/components.css`、`css/sections.css`。
- SVG 资源迁入 `assets/svg/`，统一相对路径引用。
- 删除旧的 React/Vite 脚手架（src/、public/、package.json、vite.config.ts 等）。

### Added
- 单元测试 [tests/runner.html](../tests/runner.html)：转义、校验、限速、CSRF、加密随机。
- `.editorconfig` / `.eslintrc.json` / `package.json`（仅元信息）。
- 资源分类管理：[assets/README.md](../assets/README.md)、[css/README.md](../css/README.md)、[js/README.md](../js/README.md)。
- 完整文档：[ARCHITECTURE.md](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/docs/ARCHITECTURE.md) / [SECURITY.md](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/docs/SECURITY.md) / [DEPLOYMENT.md](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/docs/DEPLOYMENT.md) / [CONTENT-AUDIT.md](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/docs/CONTENT-AUDIT.md)。

### Security
- 客户端层增加 CSRF token、行为评分、算术验证码、蜜罐、频率限速。
- CSP / X-Frame-Options / Permissions-Policy 等安全头通过 `<meta http-equiv>` 兜底。
- 输入字段统一通过 `sanitizeText` + `validate` 兜底防注入。

### Removed
- 删除所有未核实的具体客户名、奖项、投产日期、资质等内容。
