//health.routes.ts
import { Express } from "express";



export function registerHealthRoutes(app: Express) {
  
  app.get('/api/healthz', (_req, res) => {
    res.status(200).json({
      status: 'ok',
    });
  });

}