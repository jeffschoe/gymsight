//error.middleware.ts
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/errors.js";
import { ZodError } from "zod";


export function middlewareHandleError(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: err.issues.map(e => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  }
  
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      message: err.message 
    })
  }

  return res.status(500).json({
    message: 'Internal Server Error'
  })

}
