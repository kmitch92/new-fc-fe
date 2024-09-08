// import { Share } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { AddCardDashboard } from '@/components/AddCardDashboard';
import { useServerSessionUser } from '@/lib/hooks/useServerSession';

import { AddCardDashboard } from '@/components/AddCardDashboard';
import { ISessionUser } from '@/lib/api/types/types';
import { AddDeck } from '@/components/AddDeck';

export default async function Draggable() {
  const sessionUser = (await useServerSessionUser()) as ISessionUser;
  return (
    <section className="h-screen w-full px-4">
      <div>
        <AddDeck userId={sessionUser.id} isExposed={true} />
      </div>
      <div className="w-[1000px] h-[300px]">
        <AddCardDashboard sessionUser={sessionUser} />
      </div>
    </section>
  );
}
