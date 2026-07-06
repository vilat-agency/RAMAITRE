import mongoose, { Schema, Document } from 'mongoose';

export interface IStudySession extends Document {
  userId: mongoose.Types.ObjectId;
  subject: string;
  problem: string;
  result: string;
  timestamp: Date;
}

const StudySessionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: String, required: true },
  problem: { type: String, required: true },
  result: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const StudySession = mongoose.model<IStudySession>('StudySession', StudySessionSchema);
