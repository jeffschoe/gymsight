//users.controller.ts
import * as userService from './users.services.js';
import { Request, Response, NextFunction } from 'express';
import { config } from "../../config/env.js";
import { DeleteUserByIdParams, UpdateUserByIdParams } from './users.types.js';

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
  _req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    const users = await userService.getUsers();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export async function getUserById(
  req: Request<UpdateUserByIdParams>, 
  res: Response, 
  next: NextFunction
) {
  try {
    console.log('REQ PARAMS:', req.params);
    const requester = (req as any).user;

    const user = await userService.getUserById(
      req.params.id, 
      requester
    );

    res.status(200).json(user);
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
    const requester = (req as any).user;

    const user = await userService.deleteUserById(
      req.params.id, 
      requester
    );

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// ⚠️ DEV ONLY, BELOW

export async function createUserAsDev(
  req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    if (config.api.platform !== "dev") { //not allowed to perform hard users table reset
      console.log(`platform = ${config.api.platform}`)
      return res.status(403).send("Forbidden");
    }

    console.log('REQ BODY:', req.body);

    const user = await userService.createUserAsDev(req.body);
    
    res.status(201).json(user);
  } catch (err) {
    next(err); 
  }
};

export async function getUsersAsDev(
  _req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    if (config.api.platform !== "dev") { //not allowed to perform hard users table reset
      console.log(`platform = ${config.api.platform}`)
      return res.status(403).send("Forbidden");
    }

    const users = await userService.getUsers();

    res.status(201).json(users);
  } catch (err) {
    next(err);
  }
}

export async function resetUsers( 
  _req: Request, 
  res: Response, 
  next: NextFunction
) {
  try {
    if (config.api.platform !== "dev") { //not allowed to perform hard users table reset
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

