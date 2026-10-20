const validateTask = (req, res, next) => {
  const { title, status, priority, dueDate } = req.body;
  const errors = [];

  if (req.method === 'POST') {
    if (!title || typeof title !== 'string' || title.trim().length < 2) {
      errors.push('Task title is required and must be at least 2 characters');
    }
  }

  if (title !== undefined && (typeof title !== 'string' || title.trim().length > 100)) {
    errors.push('Task title cannot exceed 100 characters');
  }

  if (status !== undefined && !['pending', 'in-progress', 'completed'].includes(status)) {
    errors.push('Status must be pending, in-progress, or completed');
  }

  if (priority !== undefined && !['low', 'medium', 'high'].includes(priority)) {
    errors.push('Priority must be low, medium, or high');
  }

  if (dueDate && isNaN(Date.parse(dueDate))) {
    errors.push('Invalid due date format');
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
