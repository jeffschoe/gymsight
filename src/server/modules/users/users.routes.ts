//users.routes.ts
import { Express } from 'express';
import * as userController from './users.controller.js'
import { middlewareRequireAuth } from '../../middleware/auth.middleware.js';



export function registerUserRoutes(app: Express) {

  app.post('/api/users', userController.createUser);
  app.get('/api/users', middlewareRequireAuth, userController.getUsers);
  //app.get('/api/users/:id', userController.getUser);
  //app.put('/api/users/:id, userController.updateUser);
  app.delete('/api/users/:id', middlewareRequireAuth, userController.deleteUserById);


  // ⚠️ DEV ONLY: wipes users table and other cascade-delete tables
  app.post('/admin/reset', userController.resetUsers);

}
