# 最小化镜像
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /var/lib/jenkins/workspace/home/dist ./dist
RUN npm install -g http-server

EXPOSE 12445
CMD ["http-server", "dist", "-p", "12445"]
