// entrypoint (listen)

import { app } from "./app.js";
import { config } from "./config/env.js";

//app.listen(PORT) 
// Opens a TCP socket on that port
// Starts accepting HTTP requests
// Routes them through your Express app

app.listen(config.db.dbURL, () => {
  console.log(`Server is running at http://localhost:${config.api.port}`);
})