import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, errors, json, printf } = winston.format;

/* ---------- Custom Format (Readable in Dev) ---------- */
const devFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  let metaString = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : "";
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message} ${metaString}`;
});


/* ---------- Logger Instance ---------- */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    json()
  ),
  transports: [
    /* ---------- Error Logs ---------- */
    new DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      level: "error",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
    }),

    /* ---------- Combined Logs ---------- */
    new DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

/* ---------- Console Logging (Dev Only) ---------- */
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(
        timestamp({ format: "HH:mm:ss" }),
        errors({ stack: true }),
        devFormat
      ),
    })
  );
}

export default logger;
