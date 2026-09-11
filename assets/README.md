# 资源说明

所有图片资源统一放在 `assets/` 下，按类型分子目录。

## 当前结构
```
assets/
└─ svg/
   ├─ logo.svg     公司 Logo（favicon、apple-touch-icon、导航、页脚）
   └─ hero.svg     首页主视觉插画（已 preload + fetchpriority=high）
```

## 分类原则
| 类别 | 路径 | 说明 |
| --- | --- | --- |
| SVG（图标 / 插画） | `assets/svg/` | 矢量、可直接 `fetchpriority="high"` 预加载 |
| 产品图 | `assets/images/products/` | 待补：产品大图（建议 WebP，宽度 ≥ 1280） |
| 真实作业影像 | `assets/images/shoton/` | 待补：Shot on Aoyue 视频帧 / 图片 |
| 客户案例图 | `assets/images/cases/` | 待补：场景案例（已脱敏） |
| 文档 / PDF | `assets/docs/` | 白皮书 / 手册 / 资质（公开版本） |

## 新增资源流程
1. 选择合适分类目录（不存在则新建）。
2. 文件命名使用 kebab-case：`m500-overview.svg`、`shot-on-grid-line.webp`。
3. 体积控制：
   - SVG：单文件 < 50 KB
   - WebP：单文件 < 200 KB（首屏图 < 100 KB）
4. 在 `index.html` 引用时使用相对路径，并按需添加 `loading="lazy"` / `fetchpriority`。
5. 在 [CHANGELOG.md](../docs/CHANGELOG.md) 中记录新增资源。
