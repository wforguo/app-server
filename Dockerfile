# https://hub.docker.com/_/node
# 使用官方 Node.js 12 轻量级镜像.
FROM node:12-slim

# Create and change to the app directory.
# 定义工作目录
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
# 将依赖定义文件拷贝到工作目录下
COPY package*.json ./

# Install production dependencies.
# 以 production 形式安装依赖
RUN npm install --only=production

# Copy local code to the container image.
# 将本地代码复制到工作目录内
COPY . ./

# Run the web service on container startup.
# 启动服务
CMD [ "npm", "start" ]
