'use client';

import { createContext, useState } from 'react';
import { ISessionUser } from '@/lib/api/types/types';
import { IDeckOfCards } from '@/lib/api/types/types';
import { IUserData } from '@/lib/api/types/types';

export const UserContext = createContext<IUserData>({
  user: null,
  setUser: (_user: ISessionUser) => {},
  decksOfCardsReview: [],
  setDecksOfCardsReview: (decks: IDeckOfCards[]) => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ISessionUser | null>(null);
  const [decksOfCardsReview, setDecksOfCardsReview] = useState<IDeckOfCards[]>(
    []
  );

  return (
    <UserContext.Provider
      value={{ user, setUser, decksOfCardsReview, setDecksOfCardsReview }}
    >
      {children}
    </UserContext.Provider>
  );
}
