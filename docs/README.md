# 武汉翱越智控 · 官方网站

> 纯静态、零依赖、模块化的官方网站。
> 直接双击 [index.html](../index.html) 即可在浏览器中查看；部署时建议启用 HTTPS + CDN。

## 目录结构

```
wuhan-aoyue-website/
├─ index.html               入口（仅 HTML 结构 + 资源引用）
├─ assets/
│  └─ svg/                  图片资源（logo / 主视觉）
├─ css/                     样式（5 个分文件 + tokens）
├─ js/                      脚本（utils / data / security / services / main）
├─ tests/                   浏览器内可运行的单元测试
├─ docs/                    文档
├─ .eslintrc.json           JS 规范（建议在 IDE / CI 中使用）
├─ .editorconfig            编辑器格式规范
└─ package.json             仅元信息（scripts 仅作指引）
```

## 文档索引
- [ARCHITECTURE.md](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/docs/ARCHITECTURE.md) — 架构与模块依赖
- [SECURITY.md](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/docs/SECURITY.md) — 安全部署指南
- [DEPLOYMENT.md](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/docs/DEPLOYMENT.md) — 性能优化 / 部署清单
- [CONTENT-AUDIT.md](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/docs/CONTENT-AUDIT.md) — 内容审核记录
- [CHANGELOG.md](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/docs/CHANGELOG.md) — 变更日志

## 快速开始
1. **双击打开**：直接双击 `index.html`，浏览器自动用 `file:///` 协议渲染。
2. **本地静态服务**（推荐）：
   ```bash
   cd wuhan-aoyue-website
   python -m http.server 8080     # 或 npx serve -l 8080 .
   ```
   然后访问 <http://localhost:8080/>。
3. **运行单元测试**：双击 [tests/runner.html](../tests/runner.html)。

## 设计原则
- **零依赖**：仅使用浏览器原生 API，避免供应链风险。
- **单一职责**：每个模块 ≤ 200 行，专注于一件事。
- **可读性优先**：命名直观、注释说明意图而非行为。
- **安全默认**：所有用户输入均经过转义/校验/限速。
- **渐进增强**：核心内容使用静态 HTML 即可阅读，JS 仅增强体验。
