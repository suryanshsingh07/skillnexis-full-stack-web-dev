const validateTask = (req, res, next) => {
  const { title } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length < 2) {
    errors.push('Task title is required and must be at least 2 characters');
  } else if (title.trim().length > 100) {
    errors.push('Task title cannot exceed 100 characters');
  }

  if (req.body.description !== undefined && typeof req.body.description !== 'string') {
    errors.push('Task description must be a string');
  } else if (req.body.description && req.body.description.length > 500) {
    errors.push('Task description cannot exceed 500 characters');
  }

  if (req.body.completed !== undefined && typeof req.body.completed !== 'boolean') {
    errors.push('Completed status must be a boolean');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors.join(', ')
    });
  }

  next();
};

module.exports = { validateTask };
