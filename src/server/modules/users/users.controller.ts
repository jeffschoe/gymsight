//users.controller.ts
import * as userService from './users.services.js';
import { Request, Response } from 'express';
import { config } from "../../config/env.js";
import { createUserSchema, createUserSchemaAsDev, patchUserSchema, updateUserSchema, userIdParamSchema } from './users.schema.js';
import { BadRequestError } from '../../errors/errors.js';
import { getRequester } from '../../utils/getRequester.js';

export async function createUser(
  req: Request, 
  res: Response, 
) {
  const params = createUserSchema.parse(req.body)
  const user = await userService.createUser(params);

  res.status(201).json(user);
};

export async function getUsers(
  _req: Request, 
  res: Response, 
) {
  const users = await userService.getUsers();
  
  res.status(200).json(users); 
}

export async function getUserById(
  req: Request, 
  res: Response, 
) {
  const requester = getRequester(req);
  //console.log('REQ:', req);
  //console.log('REQ PARAMS:', req.params);
  //console.log('REQ PARAMS ID:', req.params.id);
  //console.log('REQUESTER:', requester);
  
  const { id } = userIdParamSchema.parse(req.params);
  const user = await userService.getUserById(
    id, 
    requester
  );

  res.status(200).json(user);
}

export async function updateUserById(
  req: Request,
  res: Response,
) {
  //console.log('REQ PARAMS:', req.params);
  const requester = getRequester(req);

  const { id } = userIdParamSchema.parse(req.params);
  const params = updateUserSchema.parse(req.body)
  const user = await userService.updateUserById(
    id, 
    params,
    requester
  );

  res.status(200).json(user);
}

export async function patchUserById(
  req: Request,
  res: Response,
) {
  const requester = getRequester(req);
  //console.log('REQ PARAMS:', req.params);
  //const requester = (req as any).user;
  
  const { id } = userIdParamSchema.parse(req.params);
  const params = patchUserSchema.parse(req.body)
  
  if (Object.keys(params).length === 0) {
      throw new BadRequestError('At least one field required');
    }

  const user = await userService.patchUserById(
    id, 
    params,
    requester
  );

  res.status(200).json(user);
}


export async function deleteUserById(
  req: Request, 
  res: Response, 
) {
  const requester = getRequester(req);
  //console.log('REQ PARAMS:', req.params);

  const { id } = userIdParamSchema.parse(req.params);
  const user = await userService.deleteUserById(
    id, 
    requester
  );

  res.status(200).json(user);
};

// ⚠️ DEV ONLY, BELOW

export async function createUserAsDev(
  req: Request, 
  res: Response, 
) {
  if (config.api.platform !== "dev") { //not allowed to perform hard users table reset
    console.log(`platform = ${config.api.platform}`)
    return res.status(403).send("Forbidden");
  }

  //console.log('REQ BODY:', req.body);

  const params = createUserSchemaAsDev.parse(req.body);
  const user = await userService.createUserAsDev(params);
  
  res.status(201).json(user);
};

export async function getUsersAsDev(
  _req: Request, 
  res: Response, 
) {
  if (config.api.platform !== "dev") { //not allowed to perform hard users table reset
    console.log(`platform = ${config.api.platform}`)
    return res.status(403).send("Forbidden");
  }

  const users = await userService.getUsers();

  res.status(201).json(users);
}

export async function resetUsers( 
  _req: Request, 
  res: Response, 
) {
  
  if (config.api.platform !== "dev") { //not allowed to perform hard users table reset
    console.log(`platform = ${config.api.platform}`)
    return res.status(403).send("Forbidden");
  }
  
  await userService.resetUsers();

  res.status(200).json({ message: "All users deleted" });
};

