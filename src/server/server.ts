//server.ts
//entrypoint (listen) ONLY

import { app } from "./app.js";

import { config } from "./config/env.js";
import { verifyDatabase } from "./db/startUp.js";

async function start() {
  try {
    await verifyDatabase(); //blocks server startup until DB is ready

    //app.listen(PORT) 
    // Opens a TCP socket on that port
    // Starts accepting HTTP requests
    // Routes them through your Express app
    app.listen(config.api.port, () => {
      console.log(`Server is running at http://localhost:${config.api.port}`);
    })
    
  } catch (err) {
    process.exit(1);
  }

}

start();



