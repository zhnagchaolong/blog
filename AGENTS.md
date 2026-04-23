<!-- From: E:\myblog\AGENTS.md -->
# AGENTS.md — 思考室（Immersive Personal Blog）

> 本文件面向 AI 编程助手。如果你正在阅读此文件，说明你对本项目一无所知——以下信息将帮助你快速建立上下文，避免假设与泛化。

---

## 项目概述

**思考室**是一个基于 Astro 5.x 的沉浸式个人博客（数字花园），主张 **Zero Runtime JS** 与 **Typography-first** 的设计哲学。站点以中文为主要内容语言，同时支持英文双语切换。设计上强调「慢阅读」体验：大量留白、衬线体正文、无衬线标题、细腻的暗色模式与极简交互。

当前站点地址为 `https://zhnagchaolong.github.io/blog`，在 `astro.config.mjs` 的 `site` 和 `base` 字段中配置（`base: '/blog'`）。部署前若更换域名或路径，需同步修改 `astro.config.mjs`、`src/config/site.json` 以及多处 SEO 组件中的 URL 逻辑。

---

## 技术栈与运行时架构

| 层级 | 技术 |
|------|------|
| 框架 | [Astro](https://astro.build/) 5.7.4（Static 输出模式） |
| 语言 | TypeScript 5.8（严格模式，路径别名 `@/*` → `src/*`） |
| 样式 | Tailwind CSS 3.4 + `@tailwindcss/typography` + 自定义 `global.css` |
| 内容 | Astro Content Collections（Zod Schema 校验） |
| 搜索 | 客户端全文本搜索，数据源为构建时生成的 `/search.json` |
| OG 图 | [Satori](https://github.com/vercel/satori) + `@resvg/resvg-js` 运行时生成 PNG |
| 高亮 | Shiki（主题 `github-dark-dimmed`，启用 `transformerNotationHighlight`） |
| Markdown | `remark-gfm` 启用 GitHub Flavored Markdown（表格、删除线、脚注等） |
| 字体 | LXGW WenKai（霞鹜文楷，正文/标题）、JetBrains Mono（代码） |

**架构原则**：
- 纯静态构建（`output: 'static'`），除少量岛屿脚本外不携带前端框架运行时。
- 使用 Astro View Transitions 实现页面间平滑过渡。
- 所有交互（主题切换、搜索、图片缩放、阅读进度、滚动恢复）均通过原生 `<script>` 标签实现，不引入 React/Vue/Svelte。

---

## 目录结构

```
myblog/
├── astro.config.mjs          # Astro 主配置（站点、base、i18n、集成、Markdown）
├── tailwind.config.mjs       # Tailwind 配置（自定义颜色、字体、动画、prose）
├── tsconfig.json             # TypeScript 配置（继承 astro/tsconfigs/strict）
├── package.json              # 依赖与脚本（无测试框架）
├── .github/workflows/
│   └── deploy.yml            # GitHub Pages 自动部署工作流
├── public/
│   ├── fonts/                # LXGW WenKai + JetBrains Mono 字体文件
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/           # Astro 组件（按职责分组）
│   │   ├── content/          # 内容相关：Prose、Toc、ReadingProgress、CodeCopy、SeriesNav、Aside、CodeHeader
│   │   ├── effects/          # 视觉/交互效果：MediumZoom、ScrollToTop
│   │   ├── layout/           # 布局辅助：BackLink、PageHeader
│   │   ├── navigation/       # 导航：NavDock、LanguageSwitcher
│   │   ├── search/           # 搜索：SearchModal
│   │   ├── seo/              # SEO：MetaTags、JsonLd
│   │   └── sections/         # 首页区块：FeaturedPosts、FeaturedProjects、HeroSection、RecentMemos
│   ├── config/               # 站点配置中心
│   │   ├── site.json         # 站点核心配置（导航、首页、搜索、功能开关、页面 Meta、SEO 等）
│   │   ├── site.ts           # site.json 的 TypeScript 包装器（保持向后兼容）
│   │   ├── labels.json       # 标签映射表（分类、Aside 类型、状态配置）
│   │   ├── labels.ts         # labels.json 的 TypeScript 包装器
│   │   └── constants.ts      # 全局常量（滚动阈值、导航安全区等）
│   ├── content/              # Astro 内容集合（四态内容池）
│   │   ├── config.ts         # Zod Schema 定义（posts / memos / projects / now）
│   │   ├── posts/            # 深度长文（Markdown）
│   │   ├── memos/            # 碎念短笔记（Markdown）
│   │   ├── projects/         # 项目展示（Markdown）
│   │   └── now/              # 当下状态（Markdown）
│   ├── layouts/
│   │   ├── Base.astro        # 根布局（HTML 骨架、主题切换、全局脚本、NavDock/SearchModal）
│   │   ├── Post.astro        # 文章页布局（目录、系列导航、上下篇、延伸阅读、阅读进度）
│   │   └── AdminLayout.astro # 管理后台布局（无 SEO、屏蔽搜索引擎）
│   ├── pages/                # 文件系统路由
│   │   ├── index.astro       # 首页（精选文章、碎念、项目）
│   │   ├── about.astro       # 关于页（Bento Grid 布局）
│   │   ├── archive.astro     # 归档（按年份分组）
│   │   ├── ideas.astro       # 主题分类总览（tech/design/philosophy/essay）
│   │   ├── 404.astro
│   │   ├── rss.xml.ts        # RSS 动态端点
│   │   ├── search.json.ts    # 搜索索引动态端点
│   │   ├── admin/
│   │   │   └── index.astro   # 管理后台（配置与内容可视化编辑）
│   │   ├── api/
│   │   │   └── save.ts       # 开发模式文件写入 API（供 Admin 本地保存）
│   │   ├── memos/
│   │   │   └── index.astro   # 碎念时间轴（双栏交替布局）
│   │   ├── now/
│   │   │   └── index.astro   # Now 页面（当前状态 + 历史流）
│   │   ├── og/
│   │   │   └── [...slug].png.ts   # OG 图片动态端点
│   │   ├── posts/
│   │   │   ├── index.astro   # 文章列表
│   │   │   └── [...slug].astro    # 文章详情（动态路由）
│   │   ├── projects/
│   │   │   └── index.astro   # 项目列表
│   │   └── tags/
│   │       ├── index.astro   # 标签索引
│   │       └── [tag].astro   # 标签详情页
│   ├── styles/
│   │   └── global.css        # Tailwind 指令 + CSS 变量 + 自定义排版类 .prose-zen
│   └── utils/
│       ├── date.ts           # formatDate（zh-CN 长格式）
│       └── readingTime.ts    # getReadingTime（300 字/分钟，基于 reading-time 库）
```

---

## 构建与开发命令

```bash
# 开发服务器
npm run dev        # astro dev

# 生产构建（输出到 dist/）
npm run build      # astro build

# 预览生产构建
npm run preview    # astro preview
```

**注意**：
- 本项目没有任何测试命令或测试框架配置。
- 构建产物为纯静态文件，可直接部署到任何静态托管服务。
- OG 图片生成依赖构建时的 Node.js 环境（读取 `public/fonts/lxgwwenkai-regular.ttf`），因此需要在支持 Node 运行时的环境中构建。

---

## 内容模型（四态内容池）

所有内容位于 `src/content/` 下，由 `src/content/config.ts` 中的 Zod Schema 严格约束。

### posts（深度长文）
```yaml
---
title: string          # 最大 100 字符
description: string    # 最大 200 字符
pubDate: date
updatedDate: date?     # 可选
cover: image?          # 可选，Astro 图片资源
category: enum         # essay | tech | design | philosophy
tags: string[]         # 最多 5 个
series: string?        # 系列名称
relatedPosts: string[] # 关联文章 slug 列表
featured: boolean      # 是否首页精选
draft: boolean         # 草稿（构建时排除）
toc: boolean           # 是否生成目录，默认 true
---
```

### memos（碎念）
```yaml
---
pubDate: date
mood: string?          # 情绪标签
tags: string[]
images: image[]?       # 最多 4 张
---
```

### projects（项目）
```yaml
---
title: string
description: string    # 最大 300 字符
thumbnail: image?
techStack: string[]
link: url?
github: url?
featured: boolean
startDate: date
endDate: date?
status: enum            # active | archived | wip
---
```

### now（当下状态）
```yaml
---
date: date
status: enum           # input | output | thinking | resting
mood: string?
tags: string[]
projects: string[]     # 关联项目 slug
energy: number?        # 1-10
---
```

**编写内容时的约定**：
- 正文使用标准 Markdown，支持 GFM（表格、脚注、`~~删除线~~`、任务列表）。
- 代码块使用 Shiki 高亮，支持 `[!code highlight:3]` 等行高亮语法（`@shikijs/transformers`）。
- 脚注会被自动渲染为自定义样式（见 `.prose-zen .footnotes`）。
- 文章正文字数统计算法由 `reading-time` 库处理，默认 300 字/分钟。

---

## 配置系统

本项目采用 **JSON 中心化配置**，所有可变文案与开关集中在 `src/config/site.json` 和 `src/config/labels.json` 中，通过 TypeScript 包装器导出：

| 配置域 | 文件 | 说明 |
|--------|------|------|
| 站点身份/导航/首页/搜索/功能开关/页面 Meta/SEO/About/项目文案 | `src/config/site.json` → `site.ts` | 运行时通过 `import { site, navigation, features, ... } from '@/config/site'` 读取 |
| 分类标签/Aside 类型/状态配置 | `src/config/labels.json` → `labels.ts` | 运行时通过 `import { categoryLabels, statusConfig, ... } from '@/config/labels'` 读取 |
| 滚动/导航阈值 | `src/config/constants.ts` | 纯常量，不可在 Admin 中编辑 |

**管理后台（`/admin`）**：
- 提供可视化编辑 `site.json` 与 `labels.json` 的能力。
- 提供可视化编辑四态内容池的能力（新建、修改、删除 Markdown 内容）。
- 首次访问需设置密码（SHA-256 存储于 `localStorage`）。
- **本地开发**：点击「保存到本地」调用 `/api/save` 直接写入文件系统，开发服务器将热重载。
- **生产环境**：点击「推送到 GitHub」通过 GitHub Contents API 直接提交文件，触发 GitHub Actions 重新构建部署。
- 生产推送需要：仓库名（`username/repo`）、分支（默认 `main`）、GitHub PAT（Personal Access Token）。PAT 仅存储在浏览器 `localStorage` 中。

---

## 代码风格与开发约定

### 通用风格
- **缩进**：2 空格。
- **引号**：JavaScript/TypeScript 使用单引号；Astro 模板中 HTML 属性使用双引号。
- **类型**：优先显式接口定义（见 `src/layouts/Post.astro` 顶部的 `interface Props`）。
- **注释**：关键 CSS 与复杂交互脚本使用中文注释，常带有设计意图说明。

### Astro 组件约定
- 组件文件使用 `.astro` 扩展名。
- Props 接口统一命名为 `Props`。
- 布局组件接收 `title`、`description` 等 SEO 相关属性，并透传给 `Base.astro`。
- 原生脚本统一包裹在 IIFE 中：`<script>(function() { ... })();</script>`，避免全局污染。
- 需要 Astro 视图过渡后重新执行的逻辑，必须监听 `astro:after-swap` 事件。

### 路径别名
- 统一使用 `@/` 前缀引用 `src/` 下的模块，例如 `import Base from '@/layouts/Base.astro'`。

---

## 样式系统

### Tailwind 配置要点
- `darkMode: 'class'` —— 通过 `html.dark` 类手动控制暗色模式，而非媒体查询。
- 自定义颜色全部基于 CSS 变量（`--bg-base`、`--text-primary`、`--accent` 等），支持平滑过渡。
- 自定义字体族：`font-sans`（LXGW WenKai + Noto Serif SC + Georgia）、`font-serif`（同上）、`font-mono`（JetBrains Mono）。
- 自定义字号：`fluid-xs` 到 `fluid-2xl`，使用 `clamp()` 实现流式排版。
- 自定义动画：`animate-fade-up`、`animate-ghost-in`。

### 核心 CSS 变量（global.css）
亮色模式与暗色模式通过同一组 CSS 变量切换：

```css
:root {
  --bg-base: 252 250 247;
  --bg-surface: 255 255 255;
  --text-primary: 44 44 44;
  --accent: 6 95 70;           /* 森林绿 */
  --border: 229 226 220;
  /* ... */
}
html.dark {
  --bg-base: 18 18 20;
  --text-primary: 220 220 220;
  --accent: 125 211 190;       /* 薄荷绿 */
  /* ... */
}
```

### 排版类 `.prose-zen`
这是整个站点的核心阅读排版引擎，定义于 `global.css` 的 `@layer components` 中。它覆盖：
- 标题层级（`h1`–`h4`，无衬线体，大间距呼吸感）
- 段落（无衬线体，1.8 行高）
- 链接（细下划线，悬浮加深）
- 引用块（斜粗干 + 森林绿左边框 + 渐变背景 + 自动添加中文引号「」）
- 图片（圆角 + 边框 + 悬浮效果）
- 代码块（Mac OS 三色灯装饰 + 复制按钮）
- 脚注（自定义计数器样式）

**任何修改正文渲染样式的操作，都应优先检查 `.prose-zen` 的作用范围。**

---

## 国际化（i18n）

- 配置位于 `astro.config.mjs`：默认语言 `zh`，支持 `['zh', 'en']`。
- `prefixDefaultLocale: false` —— 中文页面无 `/zh/` 前缀，英文页面以 `/en/` 开头。
- UI 文案已全面迁移至 `src/config/site.json` 集中管理（如 `pageMeta`、`postConfig.labels`、`searchConfig` 等），不再使用单独的 `src/i18n/ui.ts`。
- 语言切换器组件 `LanguageSwitcher.astro` 通过替换 URL 前缀实现跳转。

---

## SEO 与开放图谱

- 每个页面通过 `MetaTags.astro` 注入 `<title>`、OG、Twitter Card 标签。
- `JsonLd.astro` 注入 Schema.org 结构化数据（`BlogPosting` / `WebSite`）。
- 文章页自动生成 OG 图片：`/og/{slug}.png` 通过 Satori 将标题、描述渲染为 1200×630 PNG。
- RSS 订阅地址：`/rss.xml`，由 `src/pages/rss.xml.ts` 生成。
- 站点地图通过 `@astrojs/sitemap` 自动生成。

**部署前必须修改**：若更换域名或 base 路径，需同步更新 `astro.config.mjs` 中的 `site` 和 `base`，以及 `src/config/site.json` 中的 `url`。

---

## 搜索实现

- 构建时生成 `/search.json`，聚合 posts、memos、projects 的标题、描述、正文片段、标签。
- 客户端通过 `fetch('/search.json')` 加载索引，使用简单的关键词匹配与权重评分（标题命中 +10 分，正文命中 +3 分）。
- 快捷键：`Cmd/Ctrl + K` 打开，`ESC` 关闭。
- 结果按三栏展示：文章、碎念、项目。

---

## 交互与脚本注意事项

站点的客户端脚本均为原生 JavaScript，分散在各个组件中。关键交互包括：

| 功能 | 所在组件 | 关键机制 |
|------|----------|----------|
| 主题切换 | `Base.astro` + `NavDock.astro` | `localStorage.theme` + `html.dark` 类 |
| 阅读进度 | `ReadingProgress.astro` | `scroll` 事件更新宽度 |
| 阅读位置恢复 | `Post.astro` | `localStorage['scroll-pos:' + pathname]` |
| 代码复制 | `CodeCopy.astro` | 监听 `pre` 悬浮，写入剪贴板 |
| 图片缩放 | `MediumZoom.astro` | 点击 `img` → DOMRect 动画克隆 |
| 滚动显隐导航 | `NavDock.astro` | 向下滚动隐藏，向上滚动显示 |
| 回到顶部 | `ScrollToTop.astro` | 滚动超过 60% 视口高度时显示 |
| 搜索 | `SearchModal.astro` | `Cmd/Ctrl+K` 打开，客户端索引匹配 |

**重要**：所有监听 `scroll` 的脚本都使用了 `{ passive: true }`，且通过 `requestAnimationFrame` 节流。在 Astro View Transitions 环境下，页面切换后需要重新绑定的事件都已通过 `document.addEventListener('astro:after-swap', ...)` 处理。

---

## 测试策略

**当前状态：本项目没有任何自动化测试。**

如果未来需要添加测试，建议方向：
- **内容 Schema 校验**：在 CI 中运行 `astro build`，Zod 会在构建时自动校验所有 frontmatter。
- **视觉回归测试**：OG 图片生成、暗色模式切换、排版渲染。
- **端到端测试**：搜索功能、导航滚动显隐、阅读位置恢复等客户端交互。

---

## 部署与安全

### 部署
- 输出目录：`dist/`（纯静态 HTML/CSS/JS/图片）。
- 无服务端依赖，运行时无需 Node.js。
- OG 图片生成仅在**构建时**发生，运行时无需字体文件或 Satori。
- 已配置 GitHub Actions 工作流（`.github/workflows/deploy.yml`），推送至 `main` 分支后自动构建并部署到 GitHub Pages。

### 安全注意事项
- **XSS**：搜索模态框使用 `innerHTML` 直接拼接结果字符串（`SearchModal.astro`）。当前数据源为构建时静态 JSON，风险可控；若未来允许用户提交内容，必须转义 HTML。
- **外部链接**：项目卡片中的 `link` / `github` 使用 `target="_blank"`，但没有添加 `rel="noopener noreferrer"`。建议补充。
- **Admin 安全**：管理后台密码通过 SHA-256 存储在浏览器 `localStorage` 中，仅用于前端拦阻，不具备服务端安全强度。生产环境若需更高安全性，应增加服务端鉴权层。
- **API 安全**：`/api/save.ts` 仅在开发模式（`!import.meta.env.PROD`）下可用，且限制写入路径必须以 `src/` 开头、禁止 `..` 目录遍历。
- **敏感文件**：`.env` 文件被 Astro 默认保护；当前项目未使用环境变量。

---

## 常见修改场景速查

| 场景 | 操作位置 |
|------|----------|
| 修改站点标题/域名/base 路径 | `astro.config.mjs` → `site`/`base`；`src/config/site.json` → `url`；`Base.astro`、`MetaTags.astro` |
| 修改导航项 | `src/config/site.json` → `navigation.items` |
| 修改页面文案（标题、副标题、标签） | `src/config/site.json` → `pageMeta` / `postConfig.labels` / `searchConfig` |
| 修改分类/状态标签 | `src/config/labels.json` → `categoryLabels` / `statusConfig` |
| 新增内容集合字段 | `src/content/config.ts` + 对应页面查询逻辑 + `admin/index.astro` 中的 schema |
| 调整文章排版 | `src/styles/global.css` → `.prose-zen` |
| 调整暗色/亮色配色 | `src/styles/global.css` → `:root` / `html.dark` |
| 调整 OG 图片样式 | `src/pages/og/[...slug].png.ts` |
| 添加新页面 | `src/pages/` 下创建 `.astro` 文件 |
| 添加新组件 | `src/components/` 下按职责放入子目录 |
| 修改 Admin 后台行为 | `src/pages/admin/index.astro`（内置原生 JS 管理面板） |

---

*最后更新：2026-04-23*
