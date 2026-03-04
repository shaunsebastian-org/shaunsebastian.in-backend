import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
  icon: string;
  features: string[];
}

const ServiceSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  features: [{ type: String }],
}, { timestamps: true });

export default mongoose.model<IService>('Service', ServiceSchema);
