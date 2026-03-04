import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  author: string;
  image: string;
  tags: string[];
  category: string;
  isPublished: boolean;
  createdAt: Date;
}

const BlogSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  tags: [{ type: String }],
  category: { type: String, required: true },
  isPublished: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<IBlog>('Blog', BlogSchema);
