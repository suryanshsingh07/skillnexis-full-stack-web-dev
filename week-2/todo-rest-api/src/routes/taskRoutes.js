const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const {
  validateTaskId,
  validateCreateTask,
  validateUpdateTask,
} = require('../validators/taskValidator');

router.route('/')
  .get(getTasks)
  .post(validateCreateTask, createTask);

router.route('/:id')
  .get(validateTaskId, getTaskById)
  .patch(validateTaskId, validateUpdateTask, updateTask)
  .delete(validateTaskId, deleteTask);

module.exports = router;
