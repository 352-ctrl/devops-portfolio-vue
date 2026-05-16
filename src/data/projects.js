export const projects = [
  { 
    id: '1', 
    title: 'DevOps Portfolio：基于 K8s 与 JAMstack 的云原生作品集', 
    github: 'https://github.com/352-ctrl/devops-portfolio-vue',
    description: '采用 Vue 3 与 Vite 构建的响应式纯静态数据驱动单页应用。生产环境全面拥抱 Kubernetes (K8s) 云原生架构，通过 Nginx Ingress 实现七层负载均衡与全站 HTTPS 强制跳转。配置了精细化的 Pod 资源配额 (QoS) 与历史版本保留策略，实现前端服务的高可用与极致访问体验。', 
    cover: 'https://qiniu.ctrlblog.cn/covers/portfolio.png',
    tags: [
      { name: "Kubernetes", color: "#326CE5" },
      { name: "Vue 3", color: "#4FC08D" },
      { name: "Ingress", color: "#009639" },
      { name: "JAMstack", color: "#FF6C37" }
    ],
    articleBlocks: [
      {
        type: 'text',
        title: '🎯 架构解耦与极客化前端实践',
        content: '项目立项之初决定抛弃臃肿的后端，采用 JAMstack 架构实现彻底的前端纯静态化。所有的个人信息、项目列表均通过静态 JS 配置文件动态驱动，实现了数据与视图的完全解耦。为了契合 DevOps 的极客主题，除了沉浸式的 Glassmorphism UI 设计，我还在路由守卫中加入了特色逻辑：根据页面状态动态切换浏览器 Title 为 "200 OK" 或 "404 Not Found" 等 HTTP 状态码语义，从细节处强化工程师属性。'
      },
      {
        type: 'text',
        title: '☸️ 云原生基石：K8s 容器编排与资源治理',
        content: '在服务交付层，本项目的生产环境完全依托于 Kubernetes 架构。为了保障高可用性，配置了 3 个副本 (Replicas) 并设置了 revisionHistoryLimit 以支持版本的快速回滚。在运维实践中，我极其重视集群资源的精细化治理：在 Deployment 中为 Pod 声明了严格的 Requests 与 Limits（CPU 50m~200m，内存 64Mi~128Mi）。这不仅防止了潜在的内存泄漏导致的节点雪崩，也为集群的 QoS（服务质量）分类和后续可能的 HPA 弹性伸缩打下了标准的基础。'
      },
      {
        type: 'code',
        title: 'Kubernetes Deployment 资源管控策略源码：',
        language: 'yaml',
        code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: portfolio-deployment
spec:
  replicas: 3
  revisionHistoryLimit: 3
  template:
    spec:
      imagePullSecrets:
      - name: aliyun-acr-secret
      containers:
      - name: portfolio-web
        image: crpi-***.cn-guangzhou.personal.cr.aliyuncs.com/ctrl-devops/portfolio:latest
        resources:
          requests:
            cpu: "50m"
            memory: "64Mi"
          limits:
            cpu: "200m"
            memory: "128Mi"`
      },
      {
        type: 'text',
        title: '🔒 七层流量网关：Ingress 路由分发与安全加密',
        content: '网络接入层放弃了传统 NodePort 的粗放暴露模式，转而采用 Nginx Ingress 统一接管七层入口流量。通过定义 Ingress 规则，将 ctrlblog.cn 域名的访问请求精准路由至后端的 Service 集群。为了保障数据传输的绝对安全，预先通过 Secret 挂载了 TLS 证书，并利用 Annotations 注入了 \`force-ssl-redirect: "true"\` 指令，在边缘网关节点直接实现了 HTTP 到 HTTPS 的全站强制无感重定向，构建了企业级的安全访问链路。'
      },
      {
        type: 'code',
        title: '流量网关 Ingress 路由与强制 SSL 配置：',
        language: 'yaml',
        code: `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: portfolio-ingress
  annotations:
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
spec:
  ingressClassName: "nginx"
  tls:
  - hosts:
    - ctrlblog.cn
    secretName: ctrlblog-tls-secret
  rules:
  - host: ctrlblog.cn
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: portfolio-svc
            port:
              number: 80`
      }
    ]
  },
  { 
    id: '2', 
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