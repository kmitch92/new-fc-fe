'use client';

import { createContext, useEffect, useState } from 'react';
import { ISessionUser } from '@/lib/api/types/types';
import { IUserData } from '@/lib/api/types/types';
import { IDeck } from '@/lib/api/models/deck-model';

export const UserContext = createContext<IUserData>({
  user: null,
  setUser: (_user: ISessionUser) => { },
  decksOfCardsReview: [],
  setDecksOfCardsReview: (_decks: IDeck[]) => { },
});

export function UserProvider({
  fetchedUser = undefined,
  fetchedDecks = undefined,
  children,
}: {
  fetchedUser: ISessionUser | undefined;
  fetchedDecks: IDeck[] | undefined;
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<ISessionUser | null>(null);
  const [decksOfCardsReview, setDecksOfCardsReview] = useState<IDeck[]>(
    []
  );

  useEffect(() => {
    fetchedUser && setUser(fetchedUser);
    fetchedDecks && setDecksOfCardsReview(fetchedDecks);
    console.log("CONTEXT CHANGED", user, decksOfCardsReview)
  }, [fetchedUser, fetchedDecks]);

  return (
    <UserContext.Provider
      value={{ user, setUser, decksOfCardsReview, setDecksOfCardsReview }}
    >
      {children}
    </UserContext.Provider>
  );
}
