const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
} = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const {
  validateRegister,
  validateLogin
} = require('../validators/authValidator');

router.post('/register', authLimiter, validateRegister, registerUser);
router.post('/login', authLimiter, validateLogin, loginUser);
router.get('/me', authenticate, getUserProfile);
router.put('/profile', authenticate, updateUserProfile);

module.exports = router;
