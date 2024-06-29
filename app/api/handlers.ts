import { connectDB } from './db';
import { MCard, ICard } from './types/card-model';
import { MUser, IUser } from './types/user-model';
import { IDeck, MDeck } from './types/deck-model';
import { ObjectId } from 'mongoose';
import { spacedRepetition } from '../../lib/spaced-repetition/spacedRepetition';

interface IResponse {
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
    | number;
}

class Response implements IResponse {
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
    | number;
  constructor({ status, message, ...rest }: IResponse) {
    this.status = status;
    this.message = message;
    Object.assign(this, rest);
  }
}

// post a deck
interface IPostDeck {
  name: string;
  description: string;
  cards: ICard[] | null | undefined;
}

export const postDeck = async ({
  name,
  description,
  cards = [],
}: IPostDeck) => {
  try {
    await connectDB();
    const newDeck = await MDeck.create({
      name,
      description,
      cards,
      dateCreated: new Date(),
      lastUpdated: new Date(),
    });
    return new Response({
      status: 201,
      message: 'Deck created successfully',
      deck: newDeck,
    });
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    return new Response({
      status: 500,
      message: message,
    });
  }
};

//get deck by id
export const getDeckById = async (id: ObjectId) => {
  try {
    await connectDB();
    const deck = await MDeck.findById(id);
    return new Response({
      status: 200,
      message: 'Deck returned successfully',
      deck: deck,
    });
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    return new Response({
      status: 500,
      message: message,
    });
  }
};
// update a deck with one or many new cards
export const addCardsToDeckById = async (cards: ICard[], deckId: ObjectId) => {
  try {
    await connectDB();
    const newCards = cards.map((card) => {
      return new MCard({
        frontField: card.frontField,
        backField: card.backField,
        extraField: card.extraField || '',
        imageURL: card.imageURL || '',
        tags: card.tags || [],
        answerType: card.answerType,
        lastReviewed: new Date(),
        nextReview: new Date(),
        totalReviews: 0,
        failedReviews: 0,
        dateCreated: new Date(),
      });
    });
    await MDeck.findByIdAndUpdate(deckId, {
      $addToSet: { cards: newCards },
      lastUpdated: Date.now(),
    });
    return new Response({
      status: 200,
      message: `Cards added successfully to deck ${deckId}`,
      cards: newCards,
    });
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    return new Response({
      status: 500,
      message: message,
    });
  }
};

// update a card new nextReview dates
export const updateNextReview = async (
  cardId: ObjectId,
  deckId: ObjectId,
  success: boolean
) => {
  try {
    await connectDB();
    const deck = await MDeck.findOne({ _id: deckId });
    const card = deck.find({
      cards: {
        $elemMatch: { _id: cardId },
      },
    });
    deck.card.nectReview = spacedRepetition(
      card.lastReviewed,
      new Date(),
      success
    );
    return new Response({
      status: 200,
      message: `Card updated successfully, next to be reviewed on ${deck.card.nextReview}`,
      card: card,
    });
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    return new Response({
      status: 500,
      message: message,
    });
  }
};

// update a single card within a deck
export const updateExistingCard = async (
  deckId: ObjectId,
  cardId: ObjectId,
  updatedCard: ICard
) => {
  try {
    await connectDB();
    await MDeck.findOneAndUpdate(
      { _id: deckId, 'cards._id': cardId },
      {
        $set: {
          'cards.$.frontField': updatedCard.frontField,
          'cards.$.backField': updatedCard.backField,
          'cards.$.extraField': updatedCard.extraField,
          'cards.$.imageURL': updatedCard.imageURL,
          'cards.$.tags': updatedCard.tags,
          'cards.$.answerType': updatedCard.answerType,
        },
        lastUpdated: Date.now(),
      },
      { new: true }
    );
    return new Response({
      status: 200,
      message: 'Card updated successfully',
    });
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    return new Response({
      status: 500,
      message: message,
    });
  }
};

// delete a single card within a deck
export const deleteCardByIds = async (deckId: ObjectId, cardId: ObjectId) => {
  try {
    await connectDB();
    await MDeck.findOneAndUpdate(
      { _id: deckId },
      { $pull: { cards: { _id: cardId } } },
      { new: true }
    );
    return new Response({
      status: 200,
      message: 'Card deleted successfully',
    });
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    return new Response({
      status: 500,
      message: message,
    });
  }
};

// update the deck details
export const updateDeckDetailsById = async (
  deckId: ObjectId,
  newName: string,
  newDescription: string
) => {
  try {
    await connectDB();
    await MDeck.findByIdAndUpdate(deckId, {
      newName,
      newDescription,
      lastUpdated: Date.now(),
    });
    return new Response({
      status: 200,
      message: 'Deck details updated successfully',
    });
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    return new Response({
      status: 500,
      message: message,
    });
  }
};

// delete a deck by id
export const deleteDeckById = async (deckId: ObjectId) => {
  try {
    await connectDB();
    await MDeck.findByIdAndDelete(deckId);
    return new Response({
      status: 200,
      message: 'Deck deleted successfully',
    });
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    return new Response({
      status: 500,
      message: message,
    });
  }
};

// get user by email
export const getUserByEmail = async (email: string) => {
  try {
    await connectDB();
    const user = await MUser.findOne({ email });
    return new Response({
      status: 200,
      message: 'User returned successfully',
      user: user,
    });
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    return new Response({
      status: 500,
      message: message,
    });
  }
};

// get user by id
export const updateUserById = async (userId: ObjectId, updatedUser: IUser) => {
  try {
    await connectDB();
    await MUser.findByIdAndUpdate(userId, updatedUser);
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    return new Response({
      status: 500,
      message: message,
    });
  }
};

// delete user by id
export const deleteUserById = async (userId: ObjectId) => {
  try {
    await connectDB();
    await MUser.findByIdAndDelete(userId);
    return new Response({
      status: 200,
      message: 'User deleted successfully',
    });
  } catch (err) {
    let message = 'Unknown Error';
    if (err instanceof Error) message = err.message;
    return new Response({
      status: 500,
      message: message,
    });
  }
};
