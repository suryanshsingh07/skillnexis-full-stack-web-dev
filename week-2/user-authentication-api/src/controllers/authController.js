const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET || 'fallback_default_jwt_secret_skillnexis_week2';
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d';
  return jwt.sign({ id: userId }, secret, { expiresIn });
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'An account with this email address already exists.',
      });
    }

    // Create user (password is hashed in pre-save hook)
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user & issue JWT
// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    // Find user by email, explicitly including password field for bcrypt comparison
    const user = await User.findOne({ email: normalizedEmail }).select('+password');

    // Generic error to prevent user enumeration attacks
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        error: 'Invalid email or password combination.',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current authenticated user profile
// @route   GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
