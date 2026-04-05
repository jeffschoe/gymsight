//rbac.middleware.ts
import { Request, Response, NextFunction } from "express";

export function middlewareRequireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    //console.log(`REQ = ${req}`)
    /*
    for (const part of req) {

    }
    */
    const user = (req as any).user;
    //console.log(`user = ${user}`)
    console.log('USER PAYLOAD:', user);
    console.log('USER ROLE:', user?.role);
    console.log('REQUIRED ROLES:', roles);

    if (!user || !roles.includes(user.role)) { //if user does not have one of the required roles
      console.log("*****FAILING HERE")
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();

  };
}
