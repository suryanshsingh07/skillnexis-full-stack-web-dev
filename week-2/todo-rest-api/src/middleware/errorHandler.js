// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error in non-test environments
  if (process.env.NODE_ENV !== 'test') {
    console.error(`[Error] ${err.name}: ${err.message}`);
  }

  // Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      error: `Resource not found. Invalid ID: ${err.value}`,
    });
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      error: messages.join('. '),
    });
  }

  // Syntax error in JSON body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: 'Malformed JSON payload in request body.',
    });
  }

  // Default server error
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal Server Error',
  });
};

module.exports = errorHandler;
