import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import noteRoutes from "./routes/note.routes.js";

import logger from "./config/logger.js";


import swaggerUi from "swagger-ui-express";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger-output.json");



const app = express();

/* ---------- Global Middlewares ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

/* ---------- Request Logger Middleware ---------- */
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  });
  next();
});

/* ---------- Health Check ---------- */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Health is Good:)"
  });
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);


app.use(errorHandler);

export default app;
