'use client';
import { useEffect, useState } from 'react';
import { Bird, Rabbit, Turtle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getUserById } from '@/lib/api/handlers';
import { IResponse } from '@/lib/api/types/types';
import { IUser } from '@/lib/api/models/user-model';
import { ObjectId } from 'mongoose';

export const DeckDropdown = ({ sessionUser }: any) => {
  const [decksIds, setDeckIds] = useState<ObjectId[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<ObjectId | null>(null);

  useEffect(() => {
    const user = JSON.parse(sessionUser.value);
    console.log(user);
    const userResponse = getUserById(user.id);
    userResponse.then((response: IResponse) => {
      console.log(response);
      const returnedUser = response.user as IUser;
      console.log(returnedUser);
      setDeckIds(returnedUser.decks);
    });
  }, []);

  return (
    <>
      <Label htmlFor="choose-deck">Add to Deck:</Label>
      <Select>
        <SelectTrigger
          id="choose-deck"
          className="items-start [&_[data-description]]:hidden"
        >
          <SelectValue
            placeholder={
              decksIds.length > 0 ? 'Choose a deck' : 'No Decks to show'
            }
          />
        </SelectTrigger>
        <SelectContent>
          {decksIds.map((deckId) => (
            <SelectItem key={deckId.toString()} value={deckId.toString()}>
              <div className="flex items-start gap-3 text-muted-foreground">
                <Bird className="size-5" />
                <div className="grid gap-0.5">
                  <p>
                    Deck
                    <span className="font-medium text-foreground">Name</span>
                  </p>
                  <p className="text-xs" data-description>
                    Deck Description
                  </p>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
