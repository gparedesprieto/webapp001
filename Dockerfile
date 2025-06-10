FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Debug: Verificar que out/ se generó correctamente
RUN echo "=== Checking build output ==="
RUN ls -la /app/
RUN echo "=== Checking out directory ==="
RUN ls -la /app/out/ || echo "ERROR: out directory not found!"
RUN echo "=== Checking index.html ==="
RUN cat /app/out/index.html | head -10 || echo "ERROR: index.html not found!"

FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html/

# Debug: Verificar que los archivos se copiaron a nginx
RUN echo "=== Checking nginx html directory ==="
RUN ls -la /usr/share/nginx/html/
RUN echo "=== Checking index.html in nginx ==="
RUN cat /usr/share/nginx/html/index.html | head -10 || echo "ERROR: index.html not copied!"

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]