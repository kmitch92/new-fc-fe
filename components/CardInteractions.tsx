import { IDeckOfCards, ISessionUser } from '@/lib/api/types/types';
import { AddCardDashboard } from './AddCardDashboard';
import { EditCardDashboard } from './EditCardDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardReview, CardWithInfo } from './CardReview';

export const CardInteractions = ({
  sUser,
  cardsToReview,
}: {
  sUser: ISessionUser;
  cardsToReview: IDeckOfCards[] | [];
}) => {
  const reviews: CardWithInfo[] = [];
  cardsToReview.forEach((deckCards) => {
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
    <Tabs defaultValue="add" className="w-[40vw]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="review">review</TabsTrigger>
        <TabsTrigger value="add">add</TabsTrigger>
        <TabsTrigger value="edit">edit</TabsTrigger>
      </TabsList>
      <TabsContent value="review">
        <CardReview reviews={reviews} />
      </TabsContent>
      <TabsContent value="add">
        <AddCardDashboard sessionUser={sUser} />
      </TabsContent>
      <TabsContent value="edit">
        <EditCardDashboard sessionUser={sUser} />
      </TabsContent>
    </Tabs>
  );
};
