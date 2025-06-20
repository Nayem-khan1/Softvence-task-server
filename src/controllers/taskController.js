import {
  createTaskService,
  getTasksService,
  updateTaskService,
  deleteTaskService
} from '../services/taskService.js';

export const createTask = async (req, res) => {
  try {
    const task = await createTaskService(req.user.id, req.body);
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await getTasksService(req.user.id);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await updateTaskService(req.user.id, req.params.id, req.body);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await deleteTaskService(req.user.id, req.params.id);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
