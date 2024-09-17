import { useServerSessionUser } from '@/lib/hooks/useServerSession';

import { ISessionUser } from '@/lib/api/types/types';
import { AddDeck } from '@/components/AddDeck';
import { WelcomeCard } from '@/components/WelcomeCard';
import { CardInteractions } from '@/components/CardInteractions';
import { getCardsToReview } from '@/lib/api/handlers';

export default async function Draggable() {
  const sessionUser = (await useServerSessionUser()) as ISessionUser;

  const cardsToReviewProm = await getCardsToReview(sessionUser.id);
  const cardsToReview = await cardsToReviewProm.decks;

  return (
    <section className="h-[100vh] w-full px-4 grid grid-flow-col auto-cols-max">
      <div>
        <WelcomeCard
          sessionUser={sessionUser}
          cardsToReview={cardsToReview ?? []}
        />
      </div>
      <div>
        <AddDeck userId={sessionUser.id} isExposed={true} />
      </div>
      <div className="w-[1000px] h-[300px]">
        <CardInteractions
          sUser={sessionUser}
          cardsToReview={cardsToReview ?? []}
        />
      </div>
    </section>
  );
}
