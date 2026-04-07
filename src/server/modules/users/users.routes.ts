//users.routes.ts
import { Express } from 'express';
import * as userController from './users.controller.js'
import { middlewareRequireAuth } from '../../middleware/auth.middleware.js';
import { middlewareRequireRole } from '../../middleware/rbac.middleware.js';



export function registerUserRoutes(app: Express) {

  app.post('/api/users', userController.createUser);
  app.get('/api/users', middlewareRequireAuth, middlewareRequireRole('admin'), userController.getUsers);
  app.get('/api/users/:id', middlewareRequireAuth, userController.getUserById);
  app.put('/api/users/:id', middlewareRequireAuth, userController.updateUserById);
  app.delete('/api/users/:id', middlewareRequireAuth, userController.deleteUserById);


  // ⚠️ DEV ONLY: wipes users table and other cascade-delete tables
  app.post('/admin/users', userController.createUserAsDev);
  app.get('/admin/users', userController.getUsersAsDev);
  app.post('/admin/reset', userController.resetUsers);

}
