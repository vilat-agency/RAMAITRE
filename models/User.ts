import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string; // Should be hashed in production
  referredBy?: string;
  referralCode: string;
}

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referredBy: { type: String },
  referralCode: { type: String, required: true, unique: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);
