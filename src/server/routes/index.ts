import { Express } from "express";
import { registerUserRoutes } from "../modules/users/users.routes.js";
import { registerHealthRoutes } from "./health.routes.js";


export function registerRoutes(app: Express) {

  registerHealthRoutes(app); //is the server alive?

  registerUserRoutes(app);
  // registerWorKOrderRoutes(app); FUTURE ONLY

}