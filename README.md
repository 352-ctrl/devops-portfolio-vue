# 🚀 DevOps Portfolio Vue

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vue.js&logoColor=white" alt="Vue 3">
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Element_Plus-2.8-409EFF?logo=element-plus&logoColor=white" alt="Element Plus">
  <img src="https://img.shields.io/badge/Deployment-Docker/Nginx-2496ED?logo=docker&logoColor=white" alt="Docker">
  <img src="https://img.shields.io/badge/Architecture-JAMstack-FF6C37?logo=jamstack&logoColor=white" alt="JAMstack">
</p>

<p align="center">
  <strong>DevOps Portfolio</strong> 是一个基于 Vue 3 + Vite 构建的个人作品集与技术展示主页。项目采用纯静态数据驱动（JAMstack 架构）与高级毛玻璃（Glassmorphism）UI 设计，致力于为 DevOps / SRE 工程师或全栈开发者提供一个极致轻量、极具视觉冲击力的个人名片。
</p>

---

## ✨ 核心特性

* **🎨 极致视觉体验 (Glassmorphism)**：采用全局动态沉浸式背景，配合精心调校的灰色半透明毛玻璃卡片、流光渐变头像框及平滑的交互动效。
* **📱 完美响应式布局**：通过 CSS 与 Vue 动态计算精准控制断点。支持 PC（3列）、平板（2列）、移动端（单列）的完美适配，解决一切由于拉伸导致的错位与滚动条问题。
* **⚡ 纯粹的数据驱动**：彻底实现**数据与视图解耦**。无需笨重的后端与数据库，只需修改 `src/data/` 下的 JS 配置文件，即可一键更新个人信息、联系方式与项目列表。
* **🖱️ 丝滑的现代交互**：支持全局屏幕的鼠标拖拽与移动端触控翻页；社交联系方式一键复制（Clipboard API 防拦截）；项目卡片悬停简介平滑升起。
* **🚢 云原生无缝部署**：项目极其轻量，支持直接托管于七牛云等 CDN 节点，或通过 Nginx + Docker 镜像极速部署于 K8s / Swarm 集群。

---

## 🛠️ 技术栈

* **核心框架**：Vue 3 (Composition API) / Vite 
* **路由管理**：Vue Router 4
* **UI 组件库**：Element Plus
* **图标系统**：@element-plus/icons-vue / SVG
* **特效实现**：原生 CSS3 (Backdrop-filter / Keyframes 动画 / Flex 响应式)
* **API 调用**：Web Clipboard API

---

## 📂 核心目录说明

为了便于二次开发与个性化定制，项目遵循严格的目录职责划分：

```text
devops-portfolio-vue/
├── src/
│   ├── assets/            # 全局样式配置 (main.css)
│   ├── components/        # 可复用组件 (项目卡片、关于我弹窗、页脚)
│   ├── data/              # 核心：纯静态数据源
│   │   ├── profile.js     # 全局背景、个人信息、头像、联系方式配置
│   │   └── projects.js    # 项目实战列表、封面图、技术解析长文配置
│   ├── views/             # 核心视图
│   │   ├── HomeView.vue     # 主页：侧边栏与项目轮播墙
│   │   └── ProjectsView.vue # 项目详情页：支持长文与代码高亮解析
│   ├── App.vue            # 根组件：全局背景接管
│   └── main.ts            # Vue 实例挂载
└── package.json           # 项目依赖

```

---

## 🚀 快速开始

### 1. 本地开发运行

请确保您的计算机上已安装 [Node.js](https://nodejs.org/) (建议 v18+)。

```bash
# 1. 克隆项目或进入项目根目录
cd devops-portfolio-vue

# 2. 安装项目依赖
npm install

# 3. 启动本地热更新开发服务器
npm run dev

```

### 2. 个性化定制您的主页

由于项目采用了数据驱动架构，**您无需修改任何 Vue 视图代码**，只需修改以下两个文件即可完成私人定制：

* 修改 `src/data/profile.js`：替换 `background`（全局背景）、`avatar`（头像）、`name`（网名）、`skills`（技能标签）以及 `socials`（QQ/邮箱）。
* 修改 `src/data/projects.js`：按需增删您的实战项目。该文件支持配置 `techPoints`（列表）和 `articleBlocks`（支持文本与代码片段长文解析）。

> **💡 建议**：推荐将图片资源上传至七牛云、阿里云 OSS 等对象存储，并在代码中使用 CDN 加速链接，以获得最佳加载体验。

---

## 🚢 生产环境部署建议

项目构建后为纯静态 HTML/CSS/JS 文件，天然契合极简运维体系。

### 方式一：Docker 容器化部署（推荐）

本项目已内置了生产级别的 Docker 部署配置，并**解决了 Vue Router History 模式下刷新页面导致 404 的问题**。

项目中包含以下核心部署文件：
* `Dockerfile`：采用多阶段构建（Node.js 编译 + Nginx 运行），保证最终镜像体积极致轻量。
* `default.conf`：自定义 Nginx 配置，内置 `try_files` 指令，优雅接管前端路由。

**构建与运行步骤：**

1. 在项目根目录（`Dockerfile` 所在目录）执行镜像构建：

```bash
docker build -t devops-portfolio .
```

2. 启动容器（后台运行，并将容器的 80 端口映射到本机的 8080 端口）：

```bash
docker run -d -p 8080:80 --name my-portfolio devops-portfolio
```

启动成功后，浏览器访问 http://localhost:8080 即可查看您的作品集。不管怎么跳转、刷新，Nginx 都会稳稳地将路由交由 Vue 处理。

### 方式二：Serverless / 对象存储托管

如果不想自己维护服务器，也可以直接编译纯静态文件：

```bash
npm run build
```

随后将生成的 dist 目录内的所有文件，上传至 七牛云、腾讯云 COS、Vercel 或 GitHub Pages，即可享受零服务器成本的全球极速访问(注意：如果使用对象存储托管，需要在平台控制台开启静态网站托管，并配置错误页面/索引页面均指向 index.html)。