//equipment.routes.ts
import { Express } from 'express';
import * as facilityController from './equipment.controller.js'
import { middlewareRequireAuth } from '../../middleware/auth.middleware.js';
import { middlewareRequireRole } from '../../middleware/rbac.middleware.js';






export function registerEquipmentRoutes(app: Express) {

  /*
  app.post('/api/equipment', facilityController.createFacility);
  app.get('/api/equipment', middlewareRequireAuth, middlewareRequireRole('admin'), equipmentController.getEquipment);
  app.get('/api/equipment/:id', middlewareRequireAuth, equipmentController.getEquipmentById);
  app.put('/api/equipment/:id', middlewareRequireAuth, equipmentController.updateEquipmentById);
  app.delete('/api/equipment/:id', middlewareRequireAuth, equipmentController.deleteEquipmentById);


  // ⚠️ DEV ONLY: wipes users table and other cascade-delete tables
  app.post('/admin/equipment', equipmentController.createEquipmentAsDev);
  app.get('/admin/equipment', equipmentController.getEquipmentAsDev);
  app.post('/admin/reset', equipmentController.resetEquipment); //make facilities version
  */
 
}