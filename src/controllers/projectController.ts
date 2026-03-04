import { Request, Response } from 'express';
import Project from '../models/Project';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message || 'Failed to fetch projects' });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message || 'Failed to fetch project' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    console.log('Creating project with data:', req.body);
    const project = new Project(req.body);
    const createdProject = await project.save();
    console.log('Project created successfully:', createdProject._id);
    res.status(201).json(createdProject);
  } catch (error) {
    const err = error as Error;
    console.error('Create project error:', err);
    res.status(400).json({ message: err.message || 'Failed to create project' });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      Object.assign(project, req.body);
      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    const err = error as Error;
    console.error('Update project error:', err);
    res.status(400).json({ message: err.message || 'Failed to update project' });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message || 'Failed to delete project' });
  }
};
