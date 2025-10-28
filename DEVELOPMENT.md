# 开发指南

本文档面向希望基于“今日夸夸机”继续开发或二次创作的同学，提供环境搭建、命令说明以及常见定制方式。

## 环境准备

| 依赖 | 版本建议 | 说明 |
| --- | --- | --- |
| Node.js | 18 LTS 或更高 | 建议使用 [nvm](https://github.com/nvm-sh/nvm) 等版本管理器进行安装与切换 |
| pnpm | 8.x | 如果尚未安装，可执行 `npm install -g pnpm` |

> 项目基于 Vue CLI 5，仍然可以使用 `npm` 或 `yarn` 管理依赖，但推荐使用社区表现更好的 pnpm。

### 克隆仓库并安装依赖

```bash
# 克隆仓库（示例命令，请替换为实际地址）
git clone https://github.com/<your-name>/kua-kua-ji.git
cd kua-kua-ji

# 安装依赖
pnpm install
```

### 常用命令

| 命令 | 作用 |
| --- | --- |
| `pnpm run serve` | 启动本地开发服务器（默认端口 8080），支持热更新 |
| `pnpm run build` | 构建生产环境产物，默认输出到 `dist/` 目录 |
| `pnpm run lint` | 按照 ESLint 规则检查并尝试自动修复代码 |

需要在局域网中共享预览时，可运行 `pnpm run serve -- --host 0.0.0.0` 以允许外部设备访问。

## 项目结构速览

```text
src/
├── assets/                # 静态资源（图片、音频等）
├── components/
│   └── HelloWorld.vue     # 核心业务组件：随机夸奖与拥抱券逻辑
├── App.vue                # 顶层布局，负责加载 PraiseMachine 组件
└── main.js                # Vue 应用入口
```

- **公共静态资源** 存放在 `public/` 目录。
- **构建产物** 默认输出至 `dist/`，仓库中额外提供 `docs/` 目录用于 GitHub Pages 等静态托管场景。

## 代码规范

项目 ESLint 配置位于 `package.json` 中，继承了以下规则集：

- `plugin:vue/vue3-essential`
- `eslint:recommended`

建议在开发过程中启用编辑器的 ESLint 插件，并在提交前运行一次 `pnpm run lint` 确保代码风格统一。

## 常见开发场景

### 添加新的夸奖语句

1. 打开 `src/components/HelloWorld.vue`。
2. 在 `praises` 数组中追加新的字符串。
3. 如需新增新的拥抱券彩蛋，请确保文案与 `hugCouponText` 保持一致或自行扩展判定逻辑。
4. 保存后刷新浏览器即可看到新的夸奖语句被随机抽取。

> 为了延长“保底”之前的随机体验，建议将拥抱券文案在数组中仅保留一份。

### 自定义样式与动画

- 组件样式使用 `<style scoped>`，修改 `HelloWorld.vue` 底部样式即可安全地重定义主题色、布局或动画。
- 爱心漂浮、拥抱券弹窗等动画分别由 `@keyframes float`、`@keyframes showNewHearts` 等定义，可根据需要调整时长与过渡效果。
- 若需要全局样式，可在 `src/App.vue` 中添加或引入额外的 CSS 文件。

### 使用调试模式

访问地址时附加 `?debug` 参数（例如 `http://localhost:8080/?debug`），即可进入调试模式，直接展示拥抱券并跳过随机抽取，便于验证弹窗和动画。

### 本地数据持久化

刷新次数使用 `localStorage` 记忆。如果在隐身模式或受限环境下出现异常，请留意浏览器的隐私设置；需要关闭持久化时，可在开发者控制台执行 `localStorage.removeItem('praiseCounter')`。

## 更多资料

- [核心功能说明（FEATURES.md）](FEATURES.md)
- [部署指南（DEPLOYMENT.md）](DEPLOYMENT.md)
- [贡献指南（CONTRIBUTING.md）](CONTRIBUTING.md)
