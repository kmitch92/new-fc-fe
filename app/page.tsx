import { WelcomeCard } from '@/components/WelcomeCard';
import { auth } from '../app/api/auth/[...nextauth]/route';
import React from 'react';

export default async function Home() {
  const sess = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      {sess && <WelcomeCard session={sess} />}
    </main>
  );
}
