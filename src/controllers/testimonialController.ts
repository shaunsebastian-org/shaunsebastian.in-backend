import { Request, Response } from 'express';
import Testimonial from '../models/Testimonial';

export const getTestimonials = async (req: Request, res: Response) => {
  const testimonials = await Testimonial.find({});
  res.json(testimonials);
};

export const createTestimonial = async (req: Request, res: Response) => {
  const testimonial = new Testimonial(req.body);
  const createdTestimonial = await testimonial.save();
  res.status(201).json(createdTestimonial);
};

export const updateTestimonial = async (req: Request, res: Response) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (testimonial) {
    Object.assign(testimonial, req.body);
    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } else {
    res.status(404);
    throw new Error('Testimonial not found');
  }
};

export const deleteTestimonial = async (req: Request, res: Response) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (testimonial) {
    await testimonial.deleteOne();
    res.json({ message: 'Testimonial removed' });
  } else {
    res.status(404);
    throw new Error('Testimonial not found');
  }
};
