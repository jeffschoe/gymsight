import { Express } from "express";
import { registerUserRoutes } from "../modules/users/users.routes.js";


export function registerRoutes(app: Express) {
  registerUserRoutes(app);
  // registerWorKOrderRoutes(app); FUTURE ONLY
}