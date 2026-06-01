import express from 'express';
import { prisma } from '../index.js';

const router = express.Router();

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    const totalProjects = await prisma.project.count();
    const totalTasks = await prisma.task.count();
    const completedTasks = await prisma.task.count({ where: { status: 'DONE' } });
    const inProgressTasks = await prisma.task.count({ where: { status: 'IN_PROGRESS' } });
    const totalUsers = await prisma.user.count();

    res.json({
      totalProjects,
      totalTasks,
      completedTasks,
      inProgressTasks,
      totalUsers,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

export default router;

