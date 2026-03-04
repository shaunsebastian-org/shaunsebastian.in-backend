import { Request, Response } from 'express';
import Service from '../models/Service';

export const getServices = async (req: Request, res: Response) => {
  const services = await Service.find({});
  res.json(services);
};

export const createService = async (req: Request, res: Response) => {
  const service = new Service(req.body);
  const createdService = await service.save();
  res.status(201).json(createdService);
};

export const updateService = async (req: Request, res: Response) => {
  const service = await Service.findById(req.params.id);
  if (service) {
    Object.assign(service, req.body);
    const updatedService = await service.save();
    res.json(updatedService);
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
};

export const deleteService = async (req: Request, res: Response) => {
  const service = await Service.findById(req.params.id);
  if (service) {
    await service.deleteOne();
    res.json({ message: 'Service removed' });
  } else {
    res.status(404);
    throw new Error('Service not found');
  }
};
