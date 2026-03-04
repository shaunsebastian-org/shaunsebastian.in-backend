import express from 'express';
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from '../controllers/projectController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', protect, admin, createProject);
router.put('/:id', protect, admin, updateProject);
router.delete('/:id', protect, admin, deleteProject);

export default router;
