import { connectDB } from "./db";
import { MCard, ICard } from "./types/card-model";
import { MUser, IUser } from "./types/user-model";
import { IDeck, MDeck } from "./types/deck-model";
import { ObjectId } from "mongoose";
import { spacedRepetition } from "../../lib/spaced-repetition/spacedRepetition";

interface IResponse {
    status: number;
    message: string;
    [key: string]: ICard | ICard[] | IDeck | IDeck[] | IUser | IUser[] | string | number;
}

class Response implements IResponse {
    status: number;
    message: string;
    [key: string]: ICard | ICard[] | IDeck | IDeck[] | IUser | IUser[] | string | number;
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
    cards:? ICard[];
}

export const postDeck = async({name, description, cards = []}: IPostDeck) => {
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
    } catch (err: Error) {
        return new Response({
            status: 500,
            message: err.message,
        });
    }
}

//get deck by id
export const getDeckById = async(id: ObjectId) => {
    try {
        await connectDB();
        const deck = await MDeck.findById(id);
        return new Response({
            status: 200,
            message: 'Deck returned successfully',
            deck: deck,
        });
    } catch (err: Error) {
        return new Response({
            status: 500,
            message: err.message,
        });
    }
}
// update a deck with one or many new cards
export const addCardsToDeckById = async(cards: ICard[], deckId: ObjectId) => {
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
          } catch (err: Error) {
            return new Response({
                status: 500,
                message: err.message,
            });
          }
        } 

// update a card new nextReview dates
export const updateNextReview = async (cardId: ObjectId, deckId: ObjectId, success: boolean) => {
    try {
      await connectDB();
      const deck = await MDeck.findOne({ _id: deckId});
      const card = deck.find({ 'cards': {
        $elemMatch: { _id: cardId },
      }});
      deck.card.nectReview = spacedRepetition(card.lastReviewed, new Date(), success);
      return new Response({
        status: 200,
        message: `Card updated successfully, next to be reviewed on ${deck.card.nextReview}`,
        card: card
    });
    } catch (err: Error) {
        return new Response({
            status: 500,
            message: err.message,
        });
    }
  };
  
  // update a single card within a deck
export const updateExistingCard =  async (deckId: ObjectId, cardId: ObjectId, updatedCard: ICard) => {
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
    } catch (err: Error) {
      return new Response({
        status: 500,
        message: err.message,
      });
    }
  };



    // delete a single card within a deck
export const deleteCardByIds = async(req, res={}) => {
    try {
        await connectDB();
            const { deckid, cardid } = req.params;
            const { frontField, backField, extraField, imageURL, tags, answerType } =
              req.body;
            await Deck.findOneAndUpdate(
              { _id: deckid, 'cards._id': cardid },
              {
                $set: {
                  'cards.$.frontField': frontField,
                  'cards.$.backField': backField,
                  'cards.$.extraField': extraField,
                  'cards.$.imageURL': imageURL,
                  'cards.$.tags': tags,
                  'cards.$.answerType': answerType,
                },
              },
              { new: true }
            );
            return res.status(200).json({ message: 'Card updated successfully' });
          } catch (error) {
            console.log(error.message);
            response.status(500).send({ message: error.message });
          }
        };


// update the deck details
export const updateDeckDetailsById = async (req, res) => {
    try {
        await connectDB();
      const { deckid } = req.params;
      const { name, description } = req.body;
      await Deck.findByIdAndUpdate(deckid, {
        name,
        description,
        lastUpdated: Date.now(),
      });
      return res.status(200).json({ message: 'Deck updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  // delete a deck by id
export const deleteDeckById = async (req, res) => {
    try {
        await connectDB();
      const { deckid } = req.params;
      await Deck.findByIdAndDelete(deckid);
      return res.status(200).json({ message: 'Deck deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  // users
  export const addUser = async (req, res) => {
    try {
        //fill in
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  export const getUserByEmail = async (req, res) => {
    try {
        // fill in
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  export const updateUserById = async (req, res) => {
    try {
    // fill in
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  export const deleteUserById = async (req, res) => {
    try {
        //fill in
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });
  
  