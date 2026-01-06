import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import noteRoutes from "./routes/note.routes.js";



const app = express();

/* ---------- Global Middlewares ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

/* ---------- Health Check ---------- */
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Notes API is running"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);


app.use(errorHandler);

export default app;
