# 部署指南

今日夸夸机是一个纯静态的 Vue 3 单页应用。构建完成后即可部署到任意支持静态资源托管的平台。以下内容介绍推荐的部署方式及注意事项。

## Vercel 部署（推荐）

1. 登录 [Vercel](https://vercel.com/)，选择 **New Project**。
2. 导入 GitHub / GitLab / Bitbucket 中的代码仓库。
3. 在「Framework Preset」中选择 **Vue.js**（Vercel 会自动识别）。
4. 构建参数建议如下：
   - **Build Command**：`pnpm run build`
   - **Install Command**：`pnpm install`
   - **Output Directory**：`dist`
5. 在「Environment Variables」中无需额外配置；若需要指定 Node 版本，可在「Project Settings → Environment Variables → NODE_VERSION」设置为 `18`。
6. 点击 **Deploy**，等待部署完成即可获取生产访问地址。

> 在开发分支需要预览时，可启用 Vercel 的 Preview Deployment 功能，方便进行验收。

## GitHub Pages 部署

方式一：使用仓库内置的 `docs/` 目录

1. 执行 `pnpm run build`，随后将生成的 `dist/` 内容复制或移动至 `docs/`（仓库已提供示例）。
2. 在 GitHub 仓库的 **Settings → Pages** 中，将部署分支选择为主分支，目录选择 `docs/`。
3. 保存后等待 GitHub 生成静态站点，完成后即可通过 `https://<username>.github.io/<repository>/` 访问。

方式二：直接部署 `dist/`

- 使用 `actions/setup-node` + `pnpm install` + `pnpm run build` 构建后，将 `dist/` 目录作为 artifact 上传，并交由 GitHub Actions 自动发布。
- 该方式适合需要自动化工作流的场景。

## Netlify / Surge / 其他静态托管

1. 执行 `pnpm run build`，获取 `dist/` 目录。
2. 在部署平台创建新站点并上传 `dist/` 中的文件，或将项目绑定到仓库并设置 build command 为 `pnpm run build`、publish directory 为 `dist`。
3. 完成后即可获得访问链接。

Netlify 示例配置（`netlify.toml`）：

```toml
[build]
  command = "pnpm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
  NPM_FLAGS = "--version"
```

## 构建产物说明

- 默认输出目录为 `dist/`，可通过 `vue.config.js` 中的 `outputDir` 修改。
- 仓库中的 `docs/` 目录存放了一份静态打包结果，便于 GitHub Pages 或离线预览使用。
- 若在 CI/CD 中需要缓存依赖，建议缓存 `~/.pnpm-store` 与 `node_modules/.pnpm`。

## 常见问题

- **404 刷新问题**：单页应用部署在子路径时，请确保服务器开启 SPA fallback（Vercel 会自动处理，GitHub Pages 默认支持）。
- **路径前缀**：如需将项目部署到子目录，请在 `vue.config.js` 中调整 `publicPath`，并重新构建。
- **Node 版本不兼容**：Vercel/Netlify 默认 Node 版本可能较旧，建议手动设置为 18 及以上。
