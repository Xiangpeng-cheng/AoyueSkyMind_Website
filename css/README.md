# CSS 模块说明

按"单一职责"拆分，所有视觉常量集中在 `tokens.css`。

| 文件 | 职责 |
| --- | --- |
| [tokens.css](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/css/tokens.css) | 设计令牌：颜色、字体、圆角、阴影、间距、缓动 |
| [base.css](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/css/base.css) | 全局重置、字体、可访问性、`prefers-reduced-motion` 适配 |
| [layout.css](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/css/layout.css) | 容器、顶部导航、移动端抽屉、页脚、订阅区 |
| [components.css](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/css/components.css) | 按钮、图标按钮、eyebrow、卡片、表单、蜜罐、验证码、reveal |
| [sections.css](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/css/sections.css) | Hero / Marquee / Products / Shot-on / Solutions / News / Contact 等业务区块 |

## 命名约定
- BEM 简化：`block__element--modifier`。
- 状态前缀：`.is-open` / `.is-active` / `.is-invalid` / `.in`。
- 设计令牌统一以 `--xxx` 形式声明在 `:root`，业务样式只引用 var。

## 性能说明
- 5 个文件合计 < 12 KB（未压缩）。
- 所有 `transition` / `animation` 已限制在 `transform` / `opacity`，避免触发布局。
- 兼容 `prefers-reduced-motion: reduce`，自动停用动画。
