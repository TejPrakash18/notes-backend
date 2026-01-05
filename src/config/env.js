import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  // Mongo
  mongoUri: process.env.MONGO_URI,

  // Postgres
  pgHost: process.env.PG_HOST,
  pgPort: process.env.PG_PORT,
  pgDb: process.env.PG_DB,
  pgUser: process.env.PG_USER,
  pgPassword: process.env.PG_PASSWORD,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};

