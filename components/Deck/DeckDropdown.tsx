'use client';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Typography from '../Typography';
import { getDecksInfoByUserId } from '@/lib/api/handlers';
import { IDeckInfo, IResponse, ISessionUser } from '@/lib/api/types/types';

interface DeckDropdownProps {
  sessionUser: ISessionUser;
  setDeck: React.Dispatch<React.SetStateAction<IDeckInfo>>;
}
export const DeckDropdown = ({ sessionUser, setDeck }: DeckDropdownProps) => {
  const [decksInfo, setDecksInfo] = useState<IDeckInfo[]>([]);
  const [dropdownLoading, setDropdownLoading] = useState<boolean>(true);

  useEffect(() => {
    if (sessionUser) {
      const deckInfoRes = getDecksInfoByUserId(sessionUser.id);
      deckInfoRes.then((response: IResponse) => {
        const deckInfos = response.decks as IDeckInfo[];
        setDecksInfo(deckInfos);
        setDropdownLoading(false);
      });
    }
  }, []);

  const handleDropdownClick = (e: string) => {
    setDeck(decksInfo[parseInt(e)]);
  };

  return (
    <>
      <Select onValueChange={(e) => handleDropdownClick(e)}>
        <SelectTrigger
          id="choose-deck"
          className="items-start [&_[data-description]]:hidden"
        >
          <SelectValue
            placeholder={
              dropdownLoading
                ? 'Loading...'
                : decksInfo?.length
                  ? 'Choose a deck'
                  : 'No Decks to show'
            }
          />
        </SelectTrigger>
        <SelectContent>
          {decksInfo?.length &&
            decksInfo.map((deckInfo, idx) => (
              <SelectItem key={deckInfo.id.toString()} value={idx.toString()}>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <div className="grid gap-0.5">
                    <Typography.Small text={deckInfo.name} />
                    <Typography.Muted text={deckInfo.description} />
                  </div>
                </div>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </>
  );
};
