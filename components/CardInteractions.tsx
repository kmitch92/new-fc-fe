import { IDeckOfCards, ISessionUser } from '@/lib/api/types/types';
import { AddCardDashboard } from './AddCardDashboard';
import { EditCardDashboard } from './EditCardDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardReview, CardWithInfo } from './CardReview';

interface CardInteractionsProps {
  cardsToReview: IDeckOfCards[];
  sessionUser: ISessionUser;
}

export const CardInteractions = ({ cardsToReview, sessionUser }: CardInteractionsProps) => {
  const reviews: CardWithInfo[] = [];
  cardsToReview.filter((deck) => deck != undefined && deck?.cards?.length > 0);
  cardsToReview.forEach((deckCards) => {
    deckCards?.cards?.length > 0 &&
      deckCards.cards.forEach((card) => {
        const cardWithInfo: CardWithInfo = {
          ...card,
          deckName: deckCards.deck.name ?? 'unknown',
          deckId: deckCards.deck.id.toString() ?? 'unknown',
          deckDescription: deckCards.deck.description ?? 'unknown',
        } as CardWithInfo;
        reviews.push(cardWithInfo);
      });
  });

  return (
    <Tabs defaultValue="add" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="review">review</TabsTrigger>
        <TabsTrigger value="add">add</TabsTrigger>
        <TabsTrigger value="edit">edit</TabsTrigger>
      </TabsList>
      <TabsContent value="review">
        <CardReview reviews={reviews} />
      </TabsContent>
      <TabsContent value="add">
        <AddCardDashboard sessionUser={sessionUser} />
      </TabsContent>
      <TabsContent value="edit">
        <EditCardDashboard sessionUser={sessionUser} />
      </TabsContent>
    </Tabs>
  );
};
