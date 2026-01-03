import app from "./app.js";
import { env } from "./config/env.js";

const startServer = () => {
  app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`);
  });
};

startServer();
