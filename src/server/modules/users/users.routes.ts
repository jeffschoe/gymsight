//users.routes.ts
import { Express } from 'express';
import * as userController from './users.controller.js'



export function registerUserRoutes(app: Express) {

  app.post('/api/users', userController.createUser);
  app.get('/api/users', userController.getUsers);
  //app.get('/api/users/:id', userController.getUser);
  //app.put('/api/users/:id, userController.updateUser);
  app.delete('/api/users/:id', userController.deleteUserById);


  // ⚠️ DEV ONLY: wipes users table and other cascade-delete tables
  app.post('/admin/reset', userController.resetUsers);

}
