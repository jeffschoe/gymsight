//app.ts
import express from "express";
import { registerRoutes } from "./routes/index.js";
import { middlewareLogReponse } from "./middleware/logging.middleware.js";
import { middlewareHandleError } from "./middleware/error.middleware.js";


// build and run the app
export const app = express();





app.use(express.json()); // Built-in JSON body parsing middleware

// set middleware
app.use(middlewareLogReponse); 

// set routes like app.get("/health, (req, res)")
registerRoutes(app);

//set error handling middleware last
app.use(middlewareHandleError);