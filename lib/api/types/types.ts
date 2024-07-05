import { ObjectId } from 'mongoose';
import { ICard } from '../models/card-model';
import { IDeck } from '../models/deck-model';
import { IUser } from '../models/user-model';

export interface IResponse {
  status: number;
  message: string;
  [key: string]:
    | ICard
    | ICard[]
    | IDeck
    | IDeck[]
    | IUser
    | IUser[]
    | string
    | number
    | IDeckInfo;
}

export interface IDeckInfo {
  id: ObjectId;
  name: string;
  description: string;
}

export interface ICardInfo {
  frontField: string;
  subfield?: string;
  backField: string;
  extraField?: string;
  imageURL?: string;
  tags?: string[];
  answerType: string;
}

export interface ISessionUser {
  id: string;
  name: string;
  email: string;
  image: string;
}
