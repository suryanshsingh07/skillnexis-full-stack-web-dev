const Note = require('../models/Note');

// @desc    Get all notes for authenticated user
// @route   GET /api/notes
exports.getNotes = async (req, res, next) => {
  try {
    const filter = { owner: req.user._id };

    if (req.query.tag) {
      filter.tags = req.query.tag.trim();
    }

    const notes = await Note.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single note by ID for authenticated user
// @route   GET /api/notes/:id
exports.getNoteById = async (req, res, next) => {
  try {
    // Ownership check: must match note ID AND authenticated user ID
    const note = await Note.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        error: `Note not found or you do not have permission to access it.`,
      });
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new note for authenticated user
// @route   POST /api/notes
exports.createNote = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;

    // Strict ownership enforcement: owner is always derived from verified JWT user
    const note = await Note.create({
      title: title.trim(),
      content: content.trim(),
      tags: Array.isArray(tags) ? tags.map((t) => String(t).trim()).filter(Boolean) : [],
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update note for authenticated user
// @route   PATCH /api/notes/:id
exports.updateNote = async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title.trim();
    if (req.body.content !== undefined) updates.content = req.body.content.trim();
    if (req.body.tags !== undefined) {
      updates.tags = Array.isArray(req.body.tags)
        ? req.body.tags.map((t) => String(t).trim()).filter(Boolean)
        : [];
    }

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        error: `Note not found or you do not have permission to modify it.`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete note for authenticated user
// @route   DELETE /api/notes/:id
exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        error: `Note not found or you do not have permission to delete it.`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: {
        id: note._id,
        title: note.title,
      },
    });
  } catch (error) {
    next(error);
  }
};
