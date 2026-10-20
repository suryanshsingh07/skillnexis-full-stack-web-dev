const express = require('express');
const router = express.Router();
const {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');
const { protect } = require('../middleware/auth');
const {
  validateNoteId,
  validateCreateNote,
  validateUpdateNote,
} = require('../validators/noteValidator');

// Protect all note routes with JWT authentication
router.use(protect);

router.route('/')
  .get(getNotes)
  .post(validateCreateNote, createNote);

router.route('/:id')
  .get(validateNoteId, getNoteById)
  .patch(validateNoteId, validateUpdateNote, updateNote)
  .delete(validateNoteId, deleteNote);

module.exports = router;
