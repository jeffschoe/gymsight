//logging.middleware.ts
import { Request, Response, NextFunction } from "express";



export function middlewareLogReponse(
  req: Request,
  res: Response,
  next: NextFunction) {
    res.on("finish", () => {
      const statusCode = res.statusCode;

      if (statusCode < 200 || statusCode >= 300) {
        console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${statusCode}`)
      } else {
        console.log(`[OK] ${req.method} ${req.url} - Status: ${statusCode}`)
      }
      
    })

    next();

}