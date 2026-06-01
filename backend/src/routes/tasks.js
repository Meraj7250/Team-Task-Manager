import express from 'express';
import { prisma } from '../index.js';
import { adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: { assignee: true, project: true },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: { id: req.params.id },
      include: { assignee: true, project: true },
    });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Create task (Admin only)
router.post('/', adminOnly, async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, priority } = req.body;
    const task = await prisma.task.create({
      data: { title, description, projectId, assignedTo, priority: priority || 'MEDIUM' },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update task (Admin only)
router.put('/:id', adminOnly, async (req, res) => {
  try {
    const { title, description, assignedTo, priority } = req.body;
    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: { title, description, assignedTo, priority },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete task (Admin only)
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    await prisma.task.delete({ where: { id: req.params.id } });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Update task status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task status' });
  }
});

export default router;

