import mongoose, { Document } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    decks: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Deck',
      required: true,
      default: [],
    },
    orphanCards: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Card',
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

export interface IUserFE extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
let UserModel: mongoose.Model<IUserFE>;
try {
  // Try to get the existing model from mongoose
  UserModel = mongoose.model<IUserFE>('User');
} catch {
  // If the model doesn't exist, define it
  UserModel = mongoose.model<IUserFE>('User', userSchema);
}
export default UserModel;
