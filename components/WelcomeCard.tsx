'use client';
import { IDeckOfCards, ISessionUser } from '@/lib/api/types/types';
import { IDeck } from '@/lib/api/models/deck-model';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { useServerSessionUser } from '@/lib/hooks/useServerSession';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';

// interface IWelcomeCardProps {
//   cardsToReview: IDeckOfCards[] | IDeck[] | [];
// }

export function WelcomeCard() {
// { cardsToReview }: IWelcomeCardProps
  // const sessionUser = (await useServerSessionUser()) as ISessionUser;
  const { user, decksOfCardsReview } = useContext(UserContext);

  console.log('welcome card!!', {
    // ...cardsToReview,
    user,
    decksOfCardsReview,
  });
  return (
    <Card className="w-[300px] h-[400px]">
      <CardHeader>
        <CardTitle>Welcome, {user?.name ?? 'unknown'}!</CardTitle>
        <CardDescription>Get ready to learn!</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={user?.image as string} className="size-32 rounded-md" />
      </CardContent>
      <CardFooter className="flex flex-col gap-8"></CardFooter>
    </Card>
  );
}
