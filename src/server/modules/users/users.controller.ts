import * as userService from './users.services.js';
import { Request, Response, NextFunction } from 'express';

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
