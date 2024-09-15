'use client';
import * as React from 'react';
import type { Session } from 'next-auth';

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
import { IDeckOfCards } from '@/lib/api/types/types';

interface WelcomeCardProps {
  session: Session;
  decksOfCardsReview: IDeckOfCards[] | [];
}

export function WelcomeCard({
  session,
  decksOfCardsReview = [],
}: WelcomeCardProps) {
  const router = useRouter();

  return (
    <Card className="w-[300px] h-[400px]">
      <CardHeader>
        <CardTitle>Welcome, {session.user?.name}!</CardTitle>
        <CardDescription>Get ready to learn!</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={session.user?.image as string}
          className="size-32 rounded-md"
        />
      </CardContent>
      <CardFooter className="flex flex-col gap-8">
        {decksOfCardsReview.length > 0 && (
          <p>
            You have{' '}
            <strong>
              {decksOfCardsReview.reduce((acc) => acc + 1, 0)} reviews
            </strong>{' '}
            in <strong>{decksOfCardsReview.length} decks</strong>.
            <br /> Ready to get started?
          </p>
        )}
        <Button onClick={() => router.push('/learn')}>Start learning</Button>
      </CardFooter>
    </Card>
  );
}
