import { useServerSessionUser } from '@/lib/hooks/useServerSession';

import { ISessionUser } from '@/lib/api/types/types';
import { AddDeck } from '@/components/AddDeck';
import { WelcomeCard } from '@/components/WelcomeCard';
import { auth } from '../api/auth/[...nextauth]/route';
import { Session } from 'next-auth';
import { CardInteractions } from '@/components/CardInteractions';

export default async function Draggable() {
  const sessionUser = (await useServerSessionUser()) as ISessionUser;
  // const sess = (await auth()) as Session;

  return (
    <section className="h-[100vh] w-full px-4 grid grid-flow-col auto-cols-max">
      <div>
        <WelcomeCard sessionUser={sessionUser} />
      </div>
      <div>
        <AddDeck userId={sessionUser.id} isExposed={true} />
      </div>
      <div className="w-[1000px] h-[300px]">
        <CardInteractions sUser={sessionUser} />
      </div>
    </section>
  );
}
