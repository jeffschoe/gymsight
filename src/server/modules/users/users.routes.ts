import { Express } from 'express';
import * as userController from './users.controller.js'



export function registerUserRoutes(app: Express) {
  app.post('/api/users', userController.createUser);
  

  //admin
  app.post('/admin/reset', userController.resetUsers);

}
