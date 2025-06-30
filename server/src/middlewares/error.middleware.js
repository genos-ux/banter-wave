export const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };

    error.message = err.message;

    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = "Resource not found.";

      error = new Error(message);
      error.statusCode = 404;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = "Duplicate field value entered.";
      error = new Error(message);
      error.statusCode = 400;
    }

    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        errors, // sends array of detailed messages
      });
    }

    if (err.name === "UnauthorizedError") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid or missing token.",
      });
    }

    res
      .status(error.statusCode || 500)
      .json({
        success: false,
        error: error.message || "Internal Server Error.",
      });
  } catch (error) {
    next(error);
  }
};
