//facilities.services.ts
import { BadRequestError } from "../../errors/errors.js";
import { checkRolePrivilege } from "../../utils/jwt.js";
import { JwtPayloadApp } from "../auth/auth.types.js";
import { getUserByEmail } from "../users/users.repo.js";
import * as facilityRepo from './facilities.repo.js';
import { CreateFacilityInput } from "./facilities.types.js";



export async function createFacility(
  input: CreateFacilityInput,
  requester: JwtPayloadApp,
) {
  //console.log('SERVICE INPUT:', input); //DEBUG LOGGING
  if (!input.name) throw new BadRequestError('Facility Name required');
  if (!input.streetNumberAndName) throw new BadRequestError('Street Number and Name required');
  if (!input.city) throw new BadRequestError('City required');
  if (!input.state) throw new BadRequestError('State required');
  if (!input.zipCode) throw new BadRequestError('Zip Code required');


  checkRolePrivilege(requester.role, ['admin', 'manager'])

  let managerId: string | null = null;

  try {

    if (input.manager) { //if they passed a manager arg in
      const managerUser = await getUserByEmail(input.manager);
      if (!managerUser) throw new BadRequestError("Manager not found");
      
      managerId = managerUser.id;
      if (!managerId) throw new BadRequestError("Manager not found")

      const facility = await facilityRepo.createFacility(
        input,
        requester.sub,
        managerId,
      );

      return facility; 
      
    }
  } catch (err) {
    throw err;
  }
    
}