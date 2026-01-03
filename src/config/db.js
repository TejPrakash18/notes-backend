import { sequelize } from "./postgres.js";

export const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("PostgreSQL connection failed");
    console.error(error);
    process.exit(1);
  }
};
