import { ICard, CardSchema } from './card-model';
import { Document, Schema, model } from 'mongoose';
import mongoose from 'mongoose';

export interface IDeck extends Document {
  name: string;
  description: string;
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

export const MDeck =
  mongoose?.models?.MDeck || model<IDeck>('MDeck', DeckSchema);
