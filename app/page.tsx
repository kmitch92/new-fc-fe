import { WelcomeCard } from '@/components/WelcomeCard';
import React from 'react';
import { useServerSessionUser } from '@/lib/hooks/useServerSession';

import { ISessionUser } from '@/lib/api/types/types';

export default async function Home() {
  const sessionUser = (await useServerSessionUser()) as ISessionUser;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      {sessionUser && <WelcomeCard sessionUser={sessionUser} />}
    </main>
  );
}
