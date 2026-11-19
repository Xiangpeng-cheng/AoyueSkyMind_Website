# 站点图标（Favicon / Touch Icon）

由矢量源 [`../svg/Aoyue_logo_icon_blue.svg`](../svg/Aoyue_logo_icon_blue.svg) 导出的位图，供浏览器标签、搜索结果与 iOS 主屏幕使用。**全部图标文件只存放在本目录**，页面通过绝对路径 `/assets/icons/...` 引用。

| 文件 | 尺寸 | 用途 |
| --- | --- | --- |
| `favicon.ico` | 多尺寸内嵌 | 浏览器 / 搜索引擎 ICO |
| `favicon-16.png` | 16×16 | 标签页小图标 |
| `favicon-32.png` | 32×32 | 标签页 / 书签 |
| `favicon-48.png` | 48×48 | 搜索引擎推荐最小边长 |
| `apple-touch-icon.png` | 180×180 | iOS「添加到主屏幕」 |

部分爬虫仍会尝试请求站点根路径 `/favicon.ico`。若收录异常，可在 CDN（如腾讯云 EO）将 `/favicon.ico` **302 重定向**到 `/assets/icons/favicon.ico`，或在发布流程中复制一份到根目录（不作为仓库内规范路径）。

重新生成（在项目根目录）：

```bash
npx @resvg/resvg-js-cli --fit-width 16 assets/svg/Aoyue_logo_icon_blue.svg assets/icons/favicon-16.png
npx @resvg/resvg-js-cli --fit-width 32 assets/svg/Aoyue_logo_icon_blue.svg assets/icons/favicon-32.png
npx @resvg/resvg-js-cli --fit-width 48 assets/svg/Aoyue_logo_icon_blue.svg assets/icons/favicon-48.png
npx @resvg/resvg-js-cli --fit-width 192 assets/svg/Aoyue_logo_icon_blue.svg assets/icons/apple-touch-icon.png
npx png2icons assets/icons/favicon-48.png assets/icons/favicon -icop -i
```