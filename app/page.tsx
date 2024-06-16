import { auth } from '../app/api/auth/[...nextauth]/route';
import React from 'react';

export default async function Home() {
  const sess = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="hero w-auto h-48 px-6 rounded-2xl prose shadow-lg flex flex-row items-center justify-center gap-4">
        {sess?.user?.image && (
          <div className="w-24 mask mask-hexagon">
            <img src={sess?.user?.image as string} />
          </div>
        )}
        <h1>Hello, {sess?.user?.name as string}!</h1>
      </div>
    </main>
  );
}
