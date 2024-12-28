import { WelcomeCard } from '@/components/draggable/WelcomeCard';
import React from 'react';
import { useServerSessionUser } from '@/lib/hooks/useServerSession';

import { ISessionUser } from '@/lib/api/types/types';
import Draggable from '@/components/draggable/Draggable';

export default async function Home() {
  const sessionUser = (await useServerSessionUser()) as ISessionUser;

  return (
    <main>
      <Draggable sessionUser={sessionUser} />
    </main>
  );
}
