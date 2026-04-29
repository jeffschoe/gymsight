//users.routes.ts
import { Express } from 'express';
import * as userController from './users.controller.js'
import { middlewareRequireAuth } from '../../middleware/auth.middleware.js';
import { middlewareRequireRole } from '../../middleware/rbac.middleware.js';



export function registerUserRoutes(app: Express) {

  app.post('/api/users', userController.createUser); //zodd done
  app.get('/api/users', middlewareRequireAuth, middlewareRequireRole('admin'), userController.getUsers); //zodd done
  app.get('/api/users/:id', middlewareRequireAuth, userController.getUserById);
  app.patch('/api/users/:id', middlewareRequireAuth, userController.patchUserById);
  app.delete('/api/users/:id', middlewareRequireAuth, userController.deleteUserById);


  // ⚠️ DEV ONLY: wipes users table and other cascade-delete tables
  app.post('/admin/users', userController.createUserAsDev);
  app.get('/admin/users', userController.getUsersAsDev);
  app.post('/admin/reset', userController.resetUsers);

}
