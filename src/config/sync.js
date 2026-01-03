import { sequelize } from "./postgres.js";

export const syncPostgres = async () => {
  if (process.env.NODE_ENV === "development") {
    await sequelize.sync();
    console.log("PostgreSQL models synced");
  }
};
