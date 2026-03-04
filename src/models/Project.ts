import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured: boolean;
  completionDate?: Date;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  technologies: [{ type: String }],
  link: { type: String },
  github: { type: String },
  featured: { type: Boolean, default: false },
  completionDate: { type: Date },
}, { timestamps: true });

export default mongoose.model<IProject>('Project', ProjectSchema);
