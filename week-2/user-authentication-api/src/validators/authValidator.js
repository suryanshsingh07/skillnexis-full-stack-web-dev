const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Name is required.',
    });
  }

  if (name.trim().length < 2 || name.trim().length > 50) {
    return res.status(400).json({
      success: false,
      error: 'Name must be between 2 and 50 characters.',
    });
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Email is required.',
    });
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address.',
    });
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Password is required.',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'Password must be at least 6 characters long.',
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || typeof email !== 'string' || !email.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Please provide an email address.',
    });
  }

  if (!password || typeof password !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Please provide a password.',
    });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
