import express from "express";
import { registerRoutes } from "./routes/index.js";

// build and run the app
export const app = express();





app.use(express.json()); // Built-in JSON body parsing middleware

// set middleware  with app.use

// set routes like app.get("/health, (req, res)")
registerRoutes(app);