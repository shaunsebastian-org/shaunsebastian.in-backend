import { Request, Response } from 'express';
import Project from '../models/Project';

export const getProjects = async (req: Request, res: Response) => {
  const projects = await Project.find({});
  res.json(projects);
};

export const getProjectById = async (req: Request, res: Response) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
};

export const createProject = async (req: Request, res: Response) => {
  const project = new Project(req.body);
  const createdProject = await project.save();
  res.status(201).json(createdProject);
};

export const updateProject = async (req: Request, res: Response) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    Object.assign(project, req.body);
    const updatedProject = await project.save();
    res.json(updatedProject);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const project = await Project.findById(req.params.id);

  if (project) {
    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
};
