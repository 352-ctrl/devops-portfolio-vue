// src/data/projects.js
export const projects = [
  { 
    id: '1', 
    title: 'CtrlBlog：云原生全栈企业级博客系统', 
    github: 'https://github.com/352-ctrl/ctrl-blog',
    description: '基于 Spring Boot 3 与 Vue 3 构建的前后端分离现代化博客。系统深度集成 Spring AI 智能化摘要、Quartz 定时调度与 DFA 敏感词风控过滤。生产环境采用 Docker Swarm 跨主机 Overlay 网络架构，配合 GitHub Actions 实现业务级的 CI/CD 零停机滚动发布 (Rolling Update)。', 
    cover: 'https://qiniu.ctrlblog.cn/covers/ctrlBlog.png',
    tags: [
      { name: "Java 21", color: "#3C8CE7" },
      { name: "Vue 3", color: "#4FC08D" },
      { name: "Docker Swarm", color: "#409EFF" },
      { name: "CI/CD", color: "#E6A23C" }
    ],
    // 扩充为类似真实技术博客的长篇解析
    articleBlocks: [
      {
        type: 'text',
        title: '🎯 架构演进与全栈技术选型',
        content: 'CtrlBlog 的初衷是打造一个完全受控、极具现代感的个人内容发布平台。在后端选型上，激进地采用了 JDK 21 配合 Spring Boot 3.5 体系，充分利用虚拟线程（Virtual Threads）降低高并发下的内存上下文切换开销；持久层通过 MyBatis-Plus 对接 MySQL 8.0，并通过 Redis 5.0 实现热点数据的毫秒级缓存与 JWT Token 的状态管理。前端则采用 Vue 3.5 (Composition API) 与 Vite 构建，利用 Pinia 实现轻量级状态管理，整体架构彻底实现了前后端解耦。'
      },
      {
        type: 'text',
        title: '🤖 核心业务：Spring AI 接入与风控护城河',
        content: '为了提升阅读体验与社区生态，系统在业务层做了两项重度创新。第一是智能化：底层深度接入 Spring AI (OpenAI) 大模型能力，针对长篇博文实现自动化提取摘要。数据库层面专门设计了 `is_ai_summary` 标识位，用于在前端无缝渲染 AI 专属 UI 动效。第二是安全防护：系统内置了基于 DFA（确定有穷自动机）算法的敏感词过滤引擎，并结合 IP2Region 实现访问者的属地定位与恶意行为记录，打造了高可用的内容风控护城河。'
      },
      {
        type: 'text',
        title: '🚢 最佳实践：前端 Multi-stage 构建与 CI/CD 流水线',
        content: '在交付环节，抛弃了低效的手动编译上传。借助 GitHub Actions 实现了代码 Push 即触发构建的自动化流水线。在 Dockerfile 编写上，采用了 Multi-stage Build（多阶段构建）策略。首先利用 Node 22-alpine 环境完成依赖安装与 Vite 打包，随后将编译好的静态资源（dist）移交至极简的 Nginx 运行环境，并替换自定义的 nginx.conf 以解决 Vue Router 的 History 路由 404 问题，最终将镜像体积压缩到了极致，并推送到阿里云 ACR 容器镜像服务。'
      },
      {
        type: 'code',
        title: '前端 Dockerfile 多阶段构建源码：',
        language: 'dockerfile',
        code: `# 第一阶段：基于 Node 22 编译环境
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 第二阶段：Nginx 轻量级运行环境
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html
# 注入自定义配置，完美适配 Vue History 模式
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`
      },
      {
        type: 'text',
        title: '⚖️ 运维破局：基于 Docker Swarm 的高可用集群调度',
        content: '为了在有限的 1 Master + 2 Worker 节点资源下实现高可用，生产环境摒弃了传统的 docker-compose 裸跑，转而全面拥抱 Docker Swarm 跨主机集群模式。通过 Overlay 网络实现跨节点容器通信；利用 `placement constraints` 将 MySQL 和 Redis 严格锁定在 Manager 节点以保障底层数据的一致性与持久化安全。对于前后端无状态服务，则通过 `update_config` 的延迟策略实现了平滑的零宕机重启。'
      },
      {
        type: 'code',
        title: '服务栈编排（docker-compose.yml）约束与更新策略：',
        language: 'yaml',
        code: `  ctrl-blog-server:
    image: crpi-***.cn-hongkong.personal.cr.aliyuncs.com/ctrl-blog/ctrl-blog-server:latest
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DB_HOST=mysql
      - REDIS_HOST=redis
    networks:
      - blog-network
    deploy:
      replicas: 1
      update_config:
        parallelism: 1 # 发版时每次更新1个副本，保证服务0中断
        delay: 10s
        order: start-first # 启动优先策略
      restart_policy:
        condition: on-failure`
      }
    ]
  }
];