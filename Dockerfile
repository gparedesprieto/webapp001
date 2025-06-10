FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine

# ✅ OBLIGATORIO: Agregar USER ID entre 10000-20000
RUN addgroup -g 10001 choreo && adduser -D -s /bin/sh -u 10001 -G choreo choreo

COPY --from=builder /app/out /usr/share/nginx/html/

# Configurar nginx para el usuario
RUN chown -R 10001:10001 /usr/share/nginx/html
RUN chown -R 10001:10001 /var/cache/nginx
RUN chown -R 10001:10001 /var/log/nginx
RUN chown -R 10001:10001 /etc/nginx/conf.d
RUN touch /var/run/nginx.pid
RUN chown -R 10001:10001 /var/run/nginx.pid

# Configuración nginx mejorada
RUN echo 'server { \
    listen 8080; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# ✅ OBLIGATORIO: Especificar USER
USER 10001

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]