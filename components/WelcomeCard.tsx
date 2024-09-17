'use client';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { useServerSessionUser } from '@/lib/hooks/useServerSession';
import { IDeckOfCards, ISessionUser } from '@/lib/api/types/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { getCardsToReview } from '@/lib/api/handlers';

interface IWelcomeCardProps {
  sessionUser: ISessionUser;
  cardsToReview: IDeckOfCards[] | [];
}

export function WelcomeCard({ sessionUser, cardsToReview }: IWelcomeCardProps) {
  const router = useRouter();
  // const { user, setUser, decksOfCardsReview, setDecksOfCardsReview } =
  //   useContext(UserContext);
  // const sessionUser = useServerSessionUser() as unknown as ISessionUser;

  // useEffect(() => {
  //   !user && setUser(sessionUser);
  //   if (decksOfCardsReview?.length === 0) {
  //     const reviews = getCardsToReview(sessionUser?.id);
  //     setDecksOfCardsReview(reviews?.decks);
  //   }
  // }, []);

  return (
    <Card className="w-[300px] h-[400px]">
      <CardHeader>
        <CardTitle>Welcome, {sessionUser?.name}!</CardTitle>
        <CardDescription>Get ready to learn!</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={sessionUser?.image as string}
          className="size-32 rounded-md"
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-8">
        {cardsToReview?.length > 0 && (
          <p>
            You have{' '}
            <strong>{cardsToReview.reduce((acc) => acc + 1, 0)} reviews</strong>{' '}
            in <strong>{cardsToReview.length} decks</strong>.
            <br /> Ready to get started?
          </p>
        )}
        <Button onClick={() => router.push('/learn')}>Start learning</Button>
      </CardFooter>
    </Card>
  );
}
