//facilities.routes.ts
import { Express } from 'express';
import * as facilityController from './facilities.controller.js'
import { middlewareRequireAuth } from '../../middleware/auth.middleware.js';
import { middlewareRequireRole } from '../../middleware/rbac.middleware.js';






export function registerFacilityRoutes(app: Express) {


  app.post('/api/facilities', middlewareRequireAuth, facilityController.createFacility);
  /*
  app.get('/api/facilities', middlewareRequireAuth, middlewareRequireRole('admin'), facilityController.getFacility);
  app.get('/api/facilities/:id', middlewareRequireAuth, facilityController.getFacilityById);
  app.put('/api/facilities/:id', middlewareRequireAuth, facilityController.updateFacilityById);
  app.delete('/api/facilities/:id', middlewareRequireAuth, facilityController.deleteFacilityById);


  // ⚠️ DEV ONLY: wipes users table and other cascade-delete tables
  app.post('/admin/facilities', facilityController.createFacilityAsDev);
  app.get('/admin/facilities', facilityController.getFacilitiesAsDev);
  app.post('/admin/reset', facilityController.resetFacilities); //make facilities version
  */
}