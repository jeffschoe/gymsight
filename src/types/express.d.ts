// src/types/express.d.ts
import type { JwtPayloadApp } from '../server/modules/auth/auth.types.js';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadApp;
    }
  }
}

// This file needs to be a module - empty export does hat
export {};

/**
 * declare global - merges into Express's global types instead of being a local-only definition.
 * user?: JwtPayloadApp - optional, because not every request has a user. Routes behind middlewareRequireAuth will have it; public routes won't.
 * export {} at the end - forces the file to be treated as a module, which is required for declare global to work correctly.
 */