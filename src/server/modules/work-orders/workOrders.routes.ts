//workOrders.routes.ts
import { Express } from 'express';
import * as facilityController from './workOrders.controller.js'
import { middlewareRequireAuth } from '../../middleware/auth.middleware.js';
import { middlewareRequireRole } from '../../middleware/rbac.middleware.js';






export function registerWorkOrderRoutes(app: Express) {

  /*
  app.post('/api/work_orders', workOrderController.createWorkOrder);
  app.get('/api/work_orders', middlewareRequireAuth, middlewareRequireRole('admin'), workOrderController.getWorkOrder);
  app.get('/api/work_orders/:id', middlewareRequireAuth, workOrderController.getWorkOrderById);
  app.put('/api/work_orders/:id', middlewareRequireAuth, workOrderController.updateWorkOrderById);
  app.delete('/api/work_orders/:id', middlewareRequireAuth, workOrderontroller.deleteWorkOrderById);


  // ⚠️ DEV ONLY: wipes users table and other cascade-delete tables
  app.post('/admin/work_orders', workOrderController.createWorkOrdersAsDev);
  app.get('/admin/work_orders', workOrderController.getWorkOrdersAsDev);
  app.post('/admin/reset', workOrderController.resetWorkOrders); //make facilities version
  */
}