const ErrorHandler = require("../utils/ErrorHandler");

const ErrorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const field = err.path;
    const message = `Invalid MongoDB ID in field: ${field}`;
    const error = new ErrorHandler(message, 400);
    return next(error);
  }

  if (err.code === 11000) {
    const keys = Object.keys(err.keyValue);
    const message = `${keys.join(", ")} already exists`;
    const error = new ErrorHandler(message, 400);
    return next(error);
  }

  if (err.message === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid, please try again";
    const error = new ErrorHandler(message, 400);
    return next(error);
  }

  if (err.name === "TokenExpiredError") {
    const message = "JSON Web Token has expired";
    const error = new ErrorHandler(message, 400);
    return next(error);
  }

  res.status(statusCode).json({
    success: false,
    message: message,
  });
};

module.exports = ErrorMiddleware;
