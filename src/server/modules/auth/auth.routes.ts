//auth.routes.ts
import { Express } from 'express';
import * as authController from './auth.controller.js'


export function registerAuthRoutes(app: Express) {

  app.post('/api/login', authController.login);

}