import { Request, Response } from 'express';
import Service from '../models/Service';

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message || 'Failed to fetch services' });
  }
};

export const createService = async (req: Request, res: Response) => {
  try {
    const service = new Service(req.body);
    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    const err = error as Error;
    console.error('Create service error:', err);
    res.status(400).json({ message: err.message || 'Failed to create service' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      Object.assign(service, req.body);
      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    const err = error as Error;
    console.error('Update service error:', err);
    res.status(400).json({ message: err.message || 'Failed to update service' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      await service.deleteOne();
      res.json({ message: 'Service removed' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message || 'Failed to delete service' });
  }
};
