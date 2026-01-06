export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

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
