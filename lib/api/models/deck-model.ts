import { ICard, CardSchema } from './card-model';
import { Document, ObjectId, Schema, model } from 'mongoose';
import mongoose from 'mongoose';

export interface IDeck extends Document {
  name: string;
  description: string;
  creator: ObjectId;
  private: boolean;
  cards: ICard[];
  dateCreated: Date;
  lastUpdated: Date;
}

export const DeckSchema: Schema = new Schema<IDeck>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  private: {
    type: Boolean,
    required: true,
    default: true,
  },
  cards: {
    type: [CardSchema],
    required: true,
    default: [],
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export const Deck = mongoose?.models?.Deck || model<IDeck>('Deck', DeckSchema);
