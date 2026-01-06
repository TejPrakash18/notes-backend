import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                // 100 requests/IP
  message: {
    statusCode: 429,
    message: "Too many requests, please try later",
  },
});
