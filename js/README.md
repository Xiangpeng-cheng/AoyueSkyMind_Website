# JS 模块总览

原生 ES Modules，**无第三方依赖**。`index.html` 通过 `<script type="module" src="js/main.js" defer>` 加载。

```
js/
├─ main.js              入口
├─ utils/               通用工具
│  ├─ dom.js            $ / $$ / h / on
│  ├─ escape.js         XSS / 注入防御转义
│  ├─ format.js         数字 / 时间 / 复制
│  └─ random.js         加密随机
├─ data/                内容数据
│  └─ content.js
├─ security/            客户端层安全
│  ├─ csrf.js
│  ├─ captcha.js
│  ├─ rate-limiter.js
│  ├─ honeypot.js
│  ├─ behavior-score.js
│  └─ validator.js
└─ services/            业务编排
   ├─ nav.js
   ├─ reveal.js
   ├─ counter.js
   ├─ render.js
   ├─ form.js
   └─ structured-data.js
```

## 模块依赖规则（强制）
- **单向依赖**：`services` → `security` / `data` / `utils`；`security` → `utils`；`utils` 不依赖任何业务模块。
- **禁止循环依赖**；ES Modules 的 `import` 会以拓扑排序执行，循环会导致未初始化值。
- **第三方依赖**：当前项目**零依赖**，仅使用浏览器原生 API；新增依赖前需评估体积与安全。
