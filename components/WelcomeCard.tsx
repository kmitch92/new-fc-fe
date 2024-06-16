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
import { MySession } from '@/app/api/types/auth-types';

interface WelcomeCardProps {
  session: Session;
}

export function WelcomeCard({ session }: WelcomeCardProps) {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome!</CardTitle>
        <CardDescription>Get ready to learn!</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={session.user?.image as string} className="size-32" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <p>
          You are logged in as <strong>{session.user?.name}</strong>.
        </p>
      </CardFooter>
    </Card>
  );
}
