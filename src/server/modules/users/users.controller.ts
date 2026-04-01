//users.controller.ts
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
    console.log('REQ BODY:', req.body);
    const user = await userService.createUser(req.body);
    
    res.status(201).json(user);
  } catch (err) {
    next(err); //lets Express error middleware handle failures
  }
};

export async function getUsers(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    const users = await userService.getUsers();

    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
}

export async function deleteUserById(
  req: Request<DeleteUserByIdParams>, 
  res: Response, 
  next: NextFunction
) {
  try {
    console.log('REQ PARAMS:', req.params);

    const user = await userService.deleteUserById(req.params.id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


export async function resetUsers( // ⚠️ DEV ONLY
  _req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    if (config.api.platform !== "dev") { //not allowed to preform hard users table reset
      console.log(`platform = ${config.api.platform}`)
      return res.status(403).send("Forbidden");
    }
    //can perform reset
    await userService.resetUsers();
    res.status(200).json({ message: "All users deleted" });
    
  } catch (err) {
    next(err);
  }
};

