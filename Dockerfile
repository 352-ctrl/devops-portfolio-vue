# 第一阶段：Node 构建环境
FROM docker.m.daocloud.io/library/node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# 跳过 vue-tsc 检查，直接打包静态文件
RUN npm run build-only

# 第二阶段：Nginx 运行环境
FROM docker.m.daocloud.io/library/nginx:alpine
# 复制 Vite 构建输出的 dist 文件夹到 Nginx 静态目录
COPY --from=builder /app/dist /usr/share/nginx/html
# 复制自定义的 Nginx 配置文件
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]