# data 模块说明

所有面向用户的内容（公司信息、产品列表、行业方案等）集中维护在 [content.js](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/js/data/content.js)。

## 内容审核流程
1. 业务/产品团队提交内容修订请求（含来源依据）。
2. 在 PR 中修改 `content.js`，**不得**在其他文件中硬编码业务文案。
3. 内容审核人员审查后合并，CI 自动生成内容变更摘要到 `docs/CHANGELOG.md`。
4. 任何过期或未经核实的信息（具体客户名 / 奖项 / 投产日期 / 资质等）一律删除或改为中性表述。

## 版本控制
- 每次内容修改都应同步更新 `docs/CHANGELOG.md`，注明：日期、修改人、变更摘要、来源依据。
- 重大改版使用 Git tag 标记（如 `v1.2.0-content`）。
