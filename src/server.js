import app from "./app.js";
import { connectPostgres } from "./config/db.js";
import { env } from "./config/env.js";
import { connectMongo } from "./config/mongo.js";
import { syncPostgres } from "./config/sync.js";



console.log("PG_PASSWORD =", process.env.PG_PASSWORD);

const startServer = async () => {
    await connectPostgres();
    await syncPostgres();
    await connectMongo();

const server =  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer();
const shutdown = async () => {
  console.log("🛑 Shutting down server...");

  await sequelize.close();
  await mongoose.connection.close();

  server.close(() => {
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
