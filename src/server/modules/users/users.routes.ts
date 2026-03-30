import { Express } from 'express';
import * as userController from './users.controller.js'



export function registerUserRoutes(app: Express) {
  app.post('/api/users', userController.createUser);
  


  // ⚠️ DEV ONLY: wipes users table and other cascade-delete tables
  app.post('/admin/reset', userController.resetUsers);

}
