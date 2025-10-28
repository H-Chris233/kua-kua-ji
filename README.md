# 今日夸夸机 (Kua-Kua-Ji)

> 一台专属的仪式感夸夸机，让甜甜的鼓励、拥抱和彩蛋在每一次点击中出现。

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

## 在线演示

- **Vercel**：[`https://kua-kua-ji.vercel.app`](https://kua-kua-ji.vercel.app)（如尚未部署，可按照下文快速开始步骤在本地体验）
- **静态预览**：打开仓库中的 `docs/index.html` 即可离线查看构建产物。

## 项目简介

今日夸夸机是一款基于 Vue 3 构建的轻量级互动网页，灵感来源于给挚爱的 Queena 送上日常鼓励的小仪式。项目内置多种随机夸奖语句、拥抱券彩蛋以及心动的动画效果，旨在让使用者在繁忙的生活中及时收获温暖。

## 功能亮点

- 🎯 **随机夸奖算法**：内置防重复逻辑，最大程度保证每次刷新都是新鲜的夸夸。
- 🫂 **拥抱券系统**：带概率生成的真人拥抱券，包含保底机制，保证不会长时间“错过”彩蛋。
- 💖 **点击动画与彩蛋**：刷新按钮伴随爱心动画，拥抱券支持点击开启大图弹窗。
- 🗄️ **状态记忆**：浏览器 `localStorage` 持久化查看次数，让每一次夸夸都被记录。
- 🧪 **调试模式**：通过 `?debug` 查询参数打开拥抱券预览，方便开发调试。
- ♿ **无障碍体验**：ARIA 区域提示、键盘可关闭弹窗等细节照顾不同使用场景。
- 🧩 **可扩展性**：夸奖语句与样式集中维护，支持快速扩展新的内容与主题。

## 演示截图

![拥抱券彩蛋示意](src/assets/mua.png "点击拥抱券后展示的彩蛋大图")

## 技术栈与架构

- **框架**：Vue 3（基于 Vue CLI 5，默认使用 Options API，可平滑引入 Composition API）
- **语言**：现代 JavaScript（ES2020+）
- **构建工具**：`@vue/cli-service`，配合 pnpm 包管理
- **样式**：Scoped CSS + 轻量动画
- **部署**：推荐通过 Vercel 托管，亦可使用任意静态托管平台
- **目录结构**：入口文件 `src/main.js`，核心业务组件 `src/components/HelloWorld.vue`

## 快速开始

### 环境要求

- Node.js **18 LTS** 或更高版本
- pnpm **8.x**（推荐），如未安装可运行 `npm install -g pnpm`

### 安装与运行

```bash
# 安装依赖
pnpm install

# 启动本地开发服务器（默认 http://localhost:8080）
pnpm run serve

# 生产构建
pnpm run build

# 代码质量检查
pnpm run lint
```

## 项目结构

```text
.
├── docs/                  # 打包后的静态站点（用于部署或预览）
├── public/                # 公共静态资源与模板
├── src/
│   ├── assets/            # 组件使用的静态资源
│   ├── components/
│   │   └── HelloWorld.vue # 核心夸夸机组件
│   ├── App.vue            # 顶层应用组件
│   └── main.js            # 应用入口
├── package.json
├── pnpm-lock.yaml
└── vue.config.js
```

## 核心功能说明

项目的夸奖机制、拥抱券保底策略、计数器持久化等核心逻辑均集中在 `HelloWorld.vue` 中整理。请查阅 [`FEATURES.md`](FEATURES.md) 了解更细致的业务说明与扩展建议。

## 开发与部署文档

- [开发指南（DEVELOPMENT.md）](DEVELOPMENT.md)
- [部署指南（DEPLOYMENT.md）](DEPLOYMENT.md)
- [贡献指南（CONTRIBUTING.md）](CONTRIBUTING.md)

## 浏览器兼容性

项目遵循 `browserslist` 配置：`> 1%`, `last 2 versions`, `not dead`, `not ie 11`。经验证可在以下浏览器获得良好体验：

- Chrome / Edge（最新版）
- Firefox（最新版）
- Safari 14 或更高版本
- 移动端基于 Chromium 或 WebKit 的现代浏览器

## 许可证

本项目基于 [MIT License](LICENSE) 开源，欢迎自由使用与二次创作。
