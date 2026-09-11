# 内容审核记录

## 审核范围
所有面向用户的文案，包括但不限于：公司介绍、产品名称与描述、行业方案、合作案例、资质说明、联系方式、新闻与里程碑。

## 已删除 / 调整为中性表述的内容

| 原内容 | 处理 | 原因 |
| --- | --- | --- |
| 国家电网、南方电网战略合作 | 删除 | 未核实且涉及商业敏感 |
| 2026 中国无人机系统金翼奖 | 删除 | 未核实 |
| 湖北省工业无人机工程研究中心 | 删除 | 未核实 |
| 武汉光谷智能制造基地二期投产 | 删除 | 未经证实的时间表 |
| 光谷菁英产教融合计划 | 删除 | 未核实 |
| 具体客户名单 | 改为「行业类别」（电力能源行业用户等） | 商业保密 |
| 具体资质 / 奖项名 | 改为「公司具备质量管理体系认证及行业相关资质（具体资质以官网公示与登记机关信息为准）」 | 来源不可考 |

## 审核流程
1. 业务/产品团队提交内容修订请求（含来源依据）。
2. 在 PR 中修改 `js/data/content.js`，**不得**在其他文件中硬编码业务文案。
3. 内容审核人员审查后合并。
4. 同步更新 [CHANGELOG.md](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/docs/CHANGELOG.md)。

## 定期审核
- **季度**：所有"行业客户""里程碑""投产日期"等需重新核实。
- **年度**：全站内容全面审核，更新 [CHANGELOG.md](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/docs/CHANGELOG.md) 与本文档。

## 失效链接处理
- 所有 `href` 必须指向真实存在的资源（页面内锚点 / 已上线 URL）。
- 失效链接统一改为锚点 `#`，并在 [CHANGELOG.md](file:///F:/Win11/User/Desktop/UAV%20Project%20Collection/%E5%85%AC%E5%8F%B8/%E5%85%AC%E5%8F%B8%E5%AE%98%E7%BD%91/wuhan-aoyue-website/docs/CHANGELOG.md) 记录。

## 联系方式
- 邮箱：contact@aoyue-uav.com
- 工作时间：周一至周五 09:00 - 18:00
