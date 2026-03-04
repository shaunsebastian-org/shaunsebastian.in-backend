import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'read' | 'unread';
}

const MessageSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['read', 'unread'], default: 'unread' },
}, { timestamps: true });

export default mongoose.model<IMessage>('Message', MessageSchema);
