import express from 'express';
import { createTask, getTasks, updateTask, deleteTask, getTaskById } from '../controllers/taskController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.use(protect);
router.post('/', createTask);
router.get('/', getTasks);
router.get('/:id', getTaskById);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
