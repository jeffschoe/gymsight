//rbac.middleware.ts
import { Request, Response, NextFunction } from "express";

export function middlewareRequireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !roles.includes(user.role)) { //if user does not have one of the required roles
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();

  };
}
