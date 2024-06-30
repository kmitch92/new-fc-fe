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
import { getDecksInfoByUserId } from '@/lib/api/handlers';
import { IDeckInfo, IResponse } from '@/lib/api/types/types';
import { ObjectId } from 'mongoose';

export const DeckDropdown = ({ sessionUser }: any) => {
  const [decksInfo, setDecksInfo] = useState<IDeckInfo[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<ObjectId | null>(null);

  useEffect(() => {
    const user = JSON.parse(sessionUser.value);
    const deckInfoRes = getDecksInfoByUserId(user._id);
    deckInfoRes.then((response: IResponse) => {
      const deckInfos = response.decks as IDeckInfo[];
      setDecksInfo(deckInfos);
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
              decksInfo?.length ? 'Choose a deck' : 'No Decks to show'
            }
          />
        </SelectTrigger>
        <SelectContent>
          {decksInfo?.length &&
            decksInfo.map((deckInfo) => (
              <SelectItem key={deckInfo.name} value={deckInfo.name}>
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
