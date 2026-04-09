//ready.routes.ts
import { Express } from "express";
import { db } from "../db/index.js";




export function registerReadyRoutes(app: Express) {
  
  app.get('/api/readyz', async (_req, res) => {

    try {
      await db.execute('select 1');

      return res.status(200).json({
        status: 'ok',
        db: 'connected',
      });
    } catch {
      return res.status(500).json({
        status: 'error',
        db: 'disconnected'
      });
    }
    
  });

}