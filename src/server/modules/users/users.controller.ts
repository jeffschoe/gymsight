import * as userService from './users.services.js';
import { Request, Response, NextFunction } from 'express';
import { config } from "../../config/env.js";

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
    res.status(200).json(user);
    
    
  } catch (err) {
    next(err); //lets Express error middleware handle failures
  }
};