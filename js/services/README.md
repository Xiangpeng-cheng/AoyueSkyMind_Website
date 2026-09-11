# services 模块说明

业务编排层：把 utils 与 security 模块组合成可观测的行为。

| 文件 | 职责 |
| --- | --- |
| [nav.js](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/js/services/nav.js) | 顶部导航：滚动状态、移动端抽屉、平滑锚点、当前章节高亮 |
| [reveal.js](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/js/services/reveal.js) | 滚动渐入 |
| [counter.js](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/js/services/counter.js) | 首屏数字滚动 |
| [render.js](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/js/services/render.js) | 内容渲染（合作伙伴/产品/Shot on/方案/载荷） |
| [form.js](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/js/services/form.js) | 表单编排（CSRF / 行为评分 / 验证码 / 蜜罐 / 限速） |
| [structured-data.js](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/js/services/structured-data.js) | JSON-LD 注入（SEO） |

## 依赖关系
```
services/*  →  utils/*
             →  security/*  →  utils/*
             →  data/*
```
- **services** 不允许互相依赖，避免循环。
- **security** 可依赖 utils；不可依赖 services。
- **utils** 是叶子模块，不依赖任何业务模块。
