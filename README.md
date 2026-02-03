# electron-naiveui-template

基于 **Electron + electron-vite + Vue 3 + TypeScript + Naive UI** 的桌面端模板工程，内置后台管理类 UI 示例（登录页、侧边栏布局、路由守卫、暗黑模式、基础页面）。

## 你会得到什么

- Electron 主进程 / 预加载 / 渲染进程的标准目录结构
- Vue Router（`hash` 模式，适配 `file://`）+ 登录态示例（localStorage）
- Naive UI：布局、菜单、表格、表单等示例页面
- 主题切换：渲染进程暗黑模式，并通过 IPC 同步到系统 `nativeTheme`
- Windows / Linux：`titleBarOverlay` 示例（随主题变化动态调整标题栏颜色）

## 环境要求

- Node.js：建议使用 **18+**（越新越好）
- 包管理器：npm（本仓库默认）
- Windows 打包：需要可用的构建环境（如遇到原生依赖构建失败，请安装对应的构建工具链）

## 快速开始

```bash
npm install
npm run dev
```

常用命令：

```bash
# 代码格式化 / 质量检查 / 类型检查
npm run format
npm run lint
npm run typecheck

# 构建（仅编译）
npm run build

# 打包产物（electron-builder）
npm run build:win
npm run build:mac
npm run build:linux
npm run build:unpack
```

## 如何使用这个模板（推荐做法）

### 方式 A：GitHub「Use this template」

1. 在 GitHub 页面点击 **Use this template** 创建你自己的仓库
2. 克隆你的新仓库并开始开发

### 方式 B：直接克隆后“断开历史”

```bash
git clone <你的仓库地址> my-app
cd my-app
rm -rf .git
git init
git add .
git commit -m "init: from electron-naiveui-template"
```

Windows PowerShell：

```powershell
git clone <你的仓库地址> my-app
cd my-app
Remove-Item -Recurse -Force .git
git init
git add .
git commit -m "init: from electron-naiveui-template"
```

## 初始化配置（必改项）

将以下字段替换成你自己的应用信息：

- `package.json`：`name` / `version` / `description`
- `electron-builder.yml`：
  - `appId`（强烈建议换成你自己的反向域名，如 `com.yourcompany.yourapp`）
  - `productName`（安装包展示名）
  - `win.executableName`（Windows 可执行文件名）
- `dev-app-update.yml`：`updaterCacheDirName`（更新缓存目录名）
- `src/main/index.ts`：`electronApp.setAppUserModelId('com.electron')`（Windows AppUserModelId，建议与 `appId` 一致或同域）
- `resources/icon.png`：应用图标（Linux 窗口图标示例已引用该文件）

## 工程结构

```
src/
  main/      # Electron 主进程
  preload/   # 预加载（contextBridge）
  renderer/  # 渲染进程（Vue + Naive UI）
```

别名：`electron.vite.config.ts` 中配置了 `@renderer -> src/renderer/src`。

## IPC / Preload 使用方式

模板已在 `src/preload/index.ts` 暴露了：

- `window.electron`：来自 `@electron-toolkit/preload` 的 Electron API 包装
- `window.api`：预留给你自定义的桥接 API（当前为空对象）

建议做法：在 `src/preload/index.ts` 中向 `api` 增加你需要的安全方法，并在 `src/preload/index.d.ts` 里补齐类型。

## 自动更新（可选）

本模板已包含 `electron-updater` 依赖，并提供了示例配置：

- `dev-app-update.yml`
- `electron-builder.yml` 中的 `publish`

注意：目前主进程未内置自动更新逻辑。如果你需要自动更新，请在主进程自行接入 `autoUpdater`（例如在 `app.whenReady()` 后调用 `checkForUpdatesAndNotify()`），并将 `electron-builder.yml` 的 `publish` 配置替换为你真实的发布渠道（如 `github` / `generic` / 私有更新服务）。

## 推荐 IDE

- VSCode + ESLint + Prettier + Volar
