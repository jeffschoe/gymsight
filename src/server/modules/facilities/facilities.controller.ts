//facilities.controller.ts
import * as facilityService from './facilities.services.js';
import { Request, Response, NextFunction } from 'express';







export async function createFacility(
  req: Request, 
  res: Response, 
  next: NextFunction
) {

  try {
    console.log('REQ BODY:', req.body);
    const requester = (req as any).user;
    console.log('REQ.params.id:', req.params.id);
    console.log('requester:', requester);

    const facility = await facilityService.createFacility(
      req.body,
      requester
    );
    
    res.status(201).json(facility);
  } catch (err) {
    next(err);
  }
};
