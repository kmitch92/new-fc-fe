import { model, Schema, Document } from 'mongoose';
import mongoose from 'mongoose';

//declare user type
export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  credits: number;
  decks: Schema.Types.ObjectId[];
  orphanCards: Schema.Types.ObjectId[];
  tagsUsed: string[];
  createdAt: Date;
  lastLogin: Date;
  profile: {
    firstName: String;
    lastName: String;
    phone: String;
    address: {
      street1: String;
      street2: String;
      city: String;
      state: String;
      country: String;
      zip: String;
    };
  };
  active: true;
}
// define user schema
const UserSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Can't be blank"],
    index: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "Can't be blank"],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please use a valid address'],
    unique: true,
    index: true,
  },
  image: {
    type: String,
  },
  credits: {
    type: Number,
  },
  decks: {
    type: [Schema.Types.ObjectId],
    ref: 'Deck',
    required: true,
    default: [],
  },
  orphanCards: {
    type: [Schema.Types.ObjectId],
    required: true,
    default: [],
  },
  tagsUsed: {
    type: [String],
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    address: {
      street1: String,
      street2: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
  },
  active: { type: Boolean, default: true },
});

export const MUser =
  mongoose?.models?.MUser || model<IUser>('MUser', UserSchema);
