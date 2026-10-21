const rateLimit = require('express-rate-limit');

const isTestEnv = process.env.NODE_ENV === 'test';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isTestEnv ? 1000 : 30, // 30 attempts in production
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login or registration attempts. Please try again after 15 minutes.'
  },
  skip: () => isTestEnv
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isTestEnv ? 10000 : 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after some time.'
  },
  skip: () => isTestEnv
});

module.exports = { authLimiter, apiLimiter };
