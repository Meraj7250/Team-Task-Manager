import express from 'express';
import { prisma } from '../index.js';
import { adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Get all projects for user
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        members: { where: { userId: req.user.id } },
        tasks: true,
      },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: { members: true, tasks: true },
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create project (Admin only)
router.post('/', adminOnly, async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await prisma.project.create({
      data: { name, description },
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project (Admin only)
router.put('/:id', adminOnly, async (req, res) => {
  try {
    const { name, description } = req.body;
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data: { name, description },
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project (Admin only)
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Add member to project (Admin only)
router.post('/:id/members', adminOnly, async (req, res) => {
  try {
    const { userId, role } = req.body;
    const member = await prisma.projectMember.create({
      data: { projectId: req.params.id, userId, role: role || 'MEMBER' },
    });
    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add member' });
  }
});

export default router;

