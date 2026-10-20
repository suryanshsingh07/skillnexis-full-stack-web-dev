const Task = require('../models/Task');

const getTasks = async (req, res, next) => {
  try {
    // Strictly isolate by authenticated user's ID
    const filter = { owner: req.user._id };

    if (req.query.status && ['pending', 'in-progress', 'completed'].includes(req.query.status)) {
      filter.status = req.query.status;
    }

    if (req.query.priority && ['low', 'medium', 'high'].includes(req.query.priority)) {
      filter.priority = req.query.priority;
    }

    if (req.query.search) {
      filter.title = { $regex: req.query.search.trim(), $options: 'i' };
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    // Calculate user-specific summary stats
    const allUserTasks = await Task.find({ owner: req.user._id });
    const stats = {
      total: allUserTasks.length,
      pending: allUserTasks.filter(t => t.status === 'pending').length,
      inProgress: allUserTasks.filter(t => t.status === 'in-progress').length,
      completed: allUserTasks.filter(t => t.status === 'completed').length,
      highPriority: allUserTasks.filter(t => t.priority === 'high' && t.status !== 'completed').length
    };

    res.status(200).json({
      success: true,
      count: tasks.length,
      stats,
      tasks
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found or unauthorized'
      });
    }

    res.status(200).json({
      success: true,
      task
    });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    // Derived strictly from verified authenticated user
    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      status: status || 'pending',
      priority: priority || 'medium',
      dueDate: dueDate ? new Date(dueDate) : null,
      owner: req.user._id
    });

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found or unauthorized'
      });
    }

    if (req.body.title !== undefined) task.title = req.body.title.trim();
    if (req.body.description !== undefined) task.description = req.body.description.trim();
    if (req.body.status !== undefined) task.status = req.body.status;
    if (req.body.priority !== undefined) task.priority = req.body.priority;
    if (req.body.dueDate !== undefined) task.dueDate = req.body.dueDate ? new Date(req.body.dueDate) : null;

    await task.save();

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      task
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found or unauthorized'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
