//facilities.controller.ts
import { getRequester } from '../../utils/getRequester.js';
import * as facilityService from './facilities.services.js';
import { Request, Response } from 'express';




export async function createFacility(
  req: Request, 
  res: Response, 
) {

 
  console.log('REQ BODY:', req.body);
  const requester = getRequester(req);
  console.log('REQ.params.id:', req.params.id);
  console.log('requester:', requester);

  const facility = await facilityService.createFacility(
    req.body,
    requester
  );
  
  res.status(201).json(facility);
};
