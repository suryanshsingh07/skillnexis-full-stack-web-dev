const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Not authorized to access this resource. Missing Bearer authentication token.',
    });
  }

  try {
    const secret = process.env.JWT_SECRET || 'fallback_default_jwt_secret_skillnexis_week2';
    // Verify token signature and expiration
    const decoded = jwt.verify(token, secret);

    // Attach user identity to request object
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized. User associated with this token no longer exists.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        error: 'Authentication token has expired. Please log in again.',
      });
    }

    return res.status(401).json({
      success: false,
      error: 'Not authorized. Invalid or malformed authentication token.',
    });
  }
};

module.exports = { protect };
