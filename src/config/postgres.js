import { Sequelize } from "sequelize";
import { env } from "./env.js";

export const sequelize = new Sequelize(
  env.pgDb,
  env.pgUser,
  env.pgPassword,
  {
    host: env.pgHost,
    port: env.pgPort,
    dialect: "postgres",
    logging: env.nodeEnv === "development" ? console.log : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
