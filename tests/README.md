# 单元测试

打开 [runner.html](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/tests/runner.html) 在浏览器中查看测试结果（纯静态，无构建工具）。

## 当前覆盖
- `utils/escape.js`：HTML/属性/JSON 转义、控制字符过滤、长度限制
- `security/validator.js`：电话/邮箱/文本长度校验
- `security/rate-limiter.js`：频率限速
- `security/csrf.js`：token 持久化与轮换
- `utils/random.js`：加密随机数生成

## 运行
- 双击 `tests/runner.html` → 浏览器内立即执行并展示 PASS/FAIL。
- 集成到 CI 时可通过 [Playwright](https://playwright.dev/) / [Puppeteer](https://pptr.dev/) 抓取 `#summary` 文本判断通过率。
