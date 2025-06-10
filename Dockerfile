# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine
COPY --from=builder /app/out /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]