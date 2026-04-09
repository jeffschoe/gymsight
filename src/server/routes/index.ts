//index.ts
import { Express } from "express";
import { registerUserRoutes } from "../modules/users/users.routes.js";
import { registerHealthRoutes } from "./health.routes.js";
import { registerReadyRoutes } from "./ready.routes.js";
import { registerAuthRoutes } from "../modules/auth/auth.routes.js";


export function registerRoutes(app: Express) {

  registerHealthRoutes(app); //is server alive?

  registerReadyRoutes(app); //is db ready serve traffic?

  registerAuthRoutes(app);

  registerUserRoutes(app);

  // registerWorkOrderRoutes(app); FUTURE ONLY

}