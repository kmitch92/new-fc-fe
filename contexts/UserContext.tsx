'use client';

import { createContext, useEffect, useState } from 'react';
import { ISessionUser } from '@/lib/api/types/types';
import { IDeckOfCards } from '@/lib/api/types/types';
import { IUserData } from '@/lib/api/types/types';

export const UserContext = createContext<IUserData>({
  user: null,
  setUser: (_user: ISessionUser) => {},
  decksOfCardsReview: [],
  setDecksOfCardsReview: (decks: IDeckOfCards[]) => {},
});

export function UserProvider({
  fetchedUser = undefined,
  fetchedDecks = undefined,
  children,
}: {
  fetchedUser: ISessionUser | undefined;
  fetchedDecks: IDeckOfCards[] | undefined;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<ISessionUser | null>(null);
  const [decksOfCardsReview, setDecksOfCardsReview] = useState<IDeckOfCards[]>(
    []
  );

  useEffect(() => {
    fetchedUser && setUser(fetchedUser);
    fetchedDecks && setDecksOfCardsReview(fetchedDecks);
  }, [fetchedUser, fetchedDecks]);

  return (
    <UserContext.Provider
      value={{ user, setUser, decksOfCardsReview, setDecksOfCardsReview }}
    >
      {children}
    </UserContext.Provider>
  );
}
