import Task from '../models/Task.js';

export const createTaskService = async (userId, { title, description }) => {
  const task = await Task.create({ title, description, user: userId });
  return task;
};

export const getTasksService = async (userId) => {
  const tasks = await Task.find({ user: userId });
  return tasks;
};

export const updateTaskService = async (userId, taskId, updateData) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    updateData,
    { new: true }
  );
  return task;
};

export const deleteTaskService = async (userId, taskId) => {
  await Task.findOneAndDelete({ _id: taskId, user: userId });
};
