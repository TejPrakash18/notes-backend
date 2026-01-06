import logger from "../config/logger.js";

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  /* ---------- Centralized Logging ---------- */
  logger.error({
    message: err.message,
    statusCode,
    path: req.originalUrl,
    method: req.method,
    stack: err.stack,
  });

  /* ---------- Client Response ---------- */
  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      statusCode,
      message,
      stack: err.stack,
    });
  }

  res.status(statusCode).json({
    statusCode,
    message,
  });
};
