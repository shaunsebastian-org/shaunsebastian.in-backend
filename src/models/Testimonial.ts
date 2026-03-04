import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  position: string;
  company: string;
  comment: string;
  image: string;
  rating: number;
}

const TestimonialSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  comment: { type: String, required: true },
  image: { type: String },
  rating: { type: Number, default: 5 },
}, { timestamps: true });

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
