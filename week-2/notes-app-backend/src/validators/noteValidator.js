const mongoose = require('mongoose');

const validateNoteId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid Note ID format. Must be a valid 24-character hexadecimal ObjectId.',
    });
  }
  next();
};

const validateCreateNote = (req, res, next) => {
  const { title, content, tags } = req.body;

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Note title is required.',
    });
  }

  const trimmedTitle = title.trim();
  if (trimmedTitle.length < 3 || trimmedTitle.length > 200) {
    return res.status(400).json({
      success: false,
      error: 'Note title must be between 3 and 200 characters.',
    });
  }

  if (!content || typeof content !== 'string' || !content.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Note content is required.',
    });
  }

  if (tags !== undefined && !Array.isArray(tags)) {
    return res.status(400).json({
      success: false,
      error: 'Tags must be an array of strings.',
    });
  }

  next();
};

const validateUpdateNote = (req, res, next) => {
  const { title, content, tags } = req.body;

  if (title === undefined && content === undefined && tags === undefined) {
    return res.status(400).json({
      success: false,
      error: 'Request body must contain at least one field to update (title, content, or tags).',
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

  if (content !== undefined && (typeof content !== 'string' || !content.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Updated content cannot be blank.',
    });
  }

  if (tags !== undefined && !Array.isArray(tags)) {
    return res.status(400).json({
      success: false,
      error: 'Tags must be an array of strings.',
    });
  }

  next();
};

module.exports = {
  validateNoteId,
  validateCreateNote,
  validateUpdateNote,
};
