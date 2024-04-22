// import { useAuth } from '@/contexts/AuthContext';
import { auth } from '../app/api/auth/[...nextauth]/route';
import React, { useState } from 'react';
// import LoginHero from '@/components/LoginHero';

export default async function Home() {
  const sess = await auth();
  // console.log(sess?.user);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Hello, {sess?.user?.name as string}!</h1>
    </main>
  );
}
