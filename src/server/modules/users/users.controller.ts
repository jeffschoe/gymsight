import * as userService from './users.services.js';
import { Request, Response, NextFunction } from 'express';
import { config } from "../../config/env.js";
import { DeleteUserByIdParams } from './users.types.js';

export async function createUser(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    const user = await userService.createUser(req.body);
    console.log('REQ BODY:', req.body);

    res.status(201).json(user);
  } catch (err) {
    next(err); //lets Express error middleware handle failures
  }
};

export async function deleteUserById(
  req: Request<DeleteUserByIdParams>, 
  res: Response, 
  next: NextFunction
) {
  try {
    const user = await userService.deleteUserById(req.params.id);
    console.log('REQ PARAMS:', req.params);

    res.status(204).json(user);
  } catch (err: any) {
    if (err.message === 'User not found') {
      return res.status(404).json({ message: err.message });
    }

    next(err); //lets Express error middleware handle failures
  }
};

// ⚠️ DEV ONLY: wipes users table and other cascade-delete tables
export async function resetUsers(
  _req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    if (config.api.platform !== "dev") {
      //not allowed to preform hard users table reset
      console.log(`platform = ${config.api.platform}`)
      return res.status(403).send("Forbidden");
    }
    //can perform reset
    const user = await userService.resetUsers();
    res.status(204).json(user);
    
    
  } catch (err) {
    next(err); //lets Express error middleware handle failures
  }
};