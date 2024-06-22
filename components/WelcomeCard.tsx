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

interface WelcomeCardProps {
  session: Session;
}

export function WelcomeCard({ session }: WelcomeCardProps) {
  return (
    <Card className="w-[400px] h-[500px]">
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
      <CardFooter className="flex justify-between">
        <p>
          You have <strong>XX reviews</strong> in <strong>XX decks</strong>.
          <br /> Ready to get started?
        </p>
        <Button>Start learning</Button>
      </CardFooter>
    </Card>
  );
}
