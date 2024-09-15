'use client';

import { useServerSessionUser } from '@/lib/hooks/useServerSession';

import { ISessionUser } from '@/lib/api/types/types';
import { AddDeck } from '@/components/AddDeck';
import { WelcomeCard } from '@/components/WelcomeCard';
import { auth } from '../api/auth/[...nextauth]/route';
import { Session } from 'next-auth';
import { CardInteractions } from '@/components/CardInteractions';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { getCardsToReview } from '@/lib/api/handlers';

export default async function Draggable() {
  const sessionUser = (await useServerSessionUser()) as ISessionUser;
  const sess = (await auth()) as Session;
  const { user, setUser, decksOfCardsReview, setDecksOfCardsReview } =
    useContext(UserContext);

  useEffect(() => {
    !user && setUser(sessionUser);
    if (decksOfCardsReview.length === 0) {
      const reviews = getCardsToReview(sessionUser.id);
      //  @ts-ignore
      setDecksOfCardsReview(reviews.decks);
    }
  }, []);

  return (
    <section className="h-[100vh] w-full px-4 grid grid-flow-col auto-cols-max">
      <div>
        <WelcomeCard session={sess} decksOfCardsReview={decksOfCardsReview} />
      </div>
      <div>
        <AddDeck userId={sessionUser.id} isExposed={true} />
      </div>
      <div className="w-[1000px] h-[300px]">
        <CardInteractions sUser={sessionUser} />
      </div>
    </section>
  );
}
