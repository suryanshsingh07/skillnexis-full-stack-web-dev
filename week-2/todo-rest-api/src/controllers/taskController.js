const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
exports.getTasks = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.completed !== undefined) {
      filter.completed = req.query.completed === 'true';
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task not found with ID: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new task
// @route   POST /api/tasks
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: completed || false,
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task partially
// @route   PATCH /api/tasks/:id
exports.updateTask = async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title.trim();
    if (req.body.description !== undefined) updates.description = req.body.description.trim();
    if (req.body.completed !== undefined) updates.completed = req.body.completed;

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task not found with ID: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: `Task not found with ID: ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {
        id: task._id,
        title: task.title,
      },
    });
  } catch (error) {
    next(error);
  }
};
