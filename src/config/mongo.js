import mongoose from "mongoose";
import { env } from "./env.js";

export const connectMongo = async () => {
  try {
    await mongoose.connect(env.mongoUri, {
      autoIndex: env.nodeEnv === "development",
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed");
    console.error(error);
    process.exit(1);
  }
};
