//rbac.middleware.ts
import { Request, Response, NextFunction } from "express";
import { getRequester } from "../utils/getRequester.js";

export function middlewareRequireRole(...roles: string[]) {
  return (
    req: Request, 
    res: Response, 
    next: NextFunction
  ) => {
    const requester = getRequester(req);

    //console.log('USER PAYLOAD:', requester);
    //console.log('USER ROLE:', requester?.role);
    //console.log('REQUIRED ROLES:', roles);

    if (!requester || !roles.includes(requester.role)) { //if user does not have one of the required roles
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();

  };
}
