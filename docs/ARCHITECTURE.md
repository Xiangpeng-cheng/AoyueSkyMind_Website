# 架构说明

## 模块依赖图

```
              ┌──────────────────────┐
              │   index.html (入口)   │
              └──────────┬───────────┘
                         │ <script type="module">
                         ▼
                  ┌────────────┐
                  │  main.js   │
                  └─────┬──────┘
        ┌────────────────┼─────────────────┐
        ▼                ▼                 ▼
   services/*         data/*         （启动各模块）
   ├─ nav.js          ├─ content.js
   ├─ reveal.js       └─ navSections.js
   ├─ counter.js              ▲
   ├─ render.js               │
   ├─ form.js  ─────► security/*  ─────► utils/*
   └─ structured-data.js  ├─ csrf.js        ├─ dom.js
                          ├─ captcha.js     ├─ escape.js
                          ├─ rate-limiter.js├─ format.js
                          ├─ honeypot.js    └─ random.js
                          ├─ behavior-score.js
                          └─ validator.js
```

## 分层

| 层级 | 目录 | 职责 |
| --- | --- | --- |
| 入口 | `index.html`, `js/main.js` | 装配资源、启动各模块 |
| 业务编排 | `js/services/` | 把底层模块组合成可观测行为 |
| 客户端安全 | `js/security/` | CSRF / 验证码 / 限速 / 蜜罐 / 行为评分 / 校验 |
| 内容数据 | `js/data/` | 文案与数据，集中可改可审计 |
| 通用工具 | `js/utils/` | DOM / 转义 / 格式化 / 加密随机 |
| 样式 | `css/` | 设计令牌 + 重置 + 布局 + 组件 + 业务区块 |
| 资源 | `assets/` | SVG 图标与插画 |
| 测试 | `tests/` | 浏览器内运行的单元测试 |

## 强制约束
1. **单向依赖**：`services` → `security` / `data` / `utils`；`security` → `utils`；`utils` 不依赖任何业务模块。
2. **禁止循环依赖**：所有依赖必须形成 DAG；新增跨层调用需 review。
3. **零第三方依赖**：浏览器原生 API 优先；任何 npm 依赖需走审批。
4. **每个文件 ≤ 200 行**：超出必须拆分（保持单一职责）。

## 数据流（以表单提交为例）
```
用户输入 ─► services/form.js
              │
              ├─ security/honeypot.js   → 蜜罐检测
              ├─ security/behavior-score → 行为评分
              ├─ security/rate-limiter.js → 频率限速
              ├─ utils/escape.js#sanitizeText → 清洗
              ├─ security/validator.js → 校验
              └─ security/captcha.js   → 验证码
                                          │
                                          ▼
                                    fetch POST /api/leads
                                          │
                                          ▼
                              服务端再次校验（参数化查询 / ORM / CSP）
```
