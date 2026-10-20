const mongoose = require('mongoose');

const validateTaskId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Task ID format. Must be a valid 24-character hexadecimal ObjectId.',
    });
  }
  next();
};

const validateCreateTask = (req, res, next) => {
  const { title, description, completed } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Task title is required and cannot be blank.',
    });
  }

  const trimmedTitle = title.trim();
  if (trimmedTitle.length < 3) {
    return res.status(400).json({
      success: false,
      error: 'Task title must be at least 3 characters long.',
    });
  }

  if (trimmedTitle.length > 200) {
    return res.status(400).json({
      success: false,
      error: 'Task title cannot exceed 200 characters.',
    });
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Task description must be a string.',
    });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({
      success: false,
      error: 'Task completed field must be a boolean (true or false).',
    });
  }

  next();
};

const validateUpdateTask = (req, res, next) => {
  const { title, description, completed } = req.body;

  if (title === undefined && description === undefined && completed === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Request body must contain at least one field to update (title, description, or completed).',
    });
  }

  if (title !== undefined) {
    if (typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Updated title cannot be blank.',
      });
    }
    const trimmedTitle = title.trim();
    if (trimmedTitle.length < 3 || trimmedTitle.length > 200) {
      return res.status(400).json({
        success: false,
        error: 'Updated title must be between 3 and 200 characters.',
      });
    }
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Description must be a string.',
    });
  }

  if (completed !== undefined && typeof completed !== 'boolean') {
    return res.status(400).json({
      success: false,
      error: 'Completed status must be a boolean.',
    });
  }

  next();
};

module.exports = {
  validateTaskId,
  validateCreateTask,
  validateUpdateTask,
};
