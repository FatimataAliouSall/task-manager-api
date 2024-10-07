import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/TaskController.js';

const router = express.Router();
router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;
