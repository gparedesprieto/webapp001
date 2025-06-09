import { createProxyMiddleware } from 'http-proxy-middleware';
import { Express } from 'express';

export default function setupProxy(app: Express) {
  app.use(
    '/services',
    createProxyMiddleware({
      target: 'http://localhost:8290',
      changeOrigin: true
    })
  );
}
