import { ISessionUser } from '@/lib/api/types/types';
import { AddCardDashboard } from './AddCardDashboard';
import { EditCardDashboard } from './EditCardDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CardReview } from './CardReview';

export const CardInteractions = ({ sUser }: { sUser: ISessionUser }) => {
  return (
    <Tabs defaultValue="add" className="w-[40vw]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="review">review</TabsTrigger>
        <TabsTrigger value="add">add</TabsTrigger>
        <TabsTrigger value="edit">edit</TabsTrigger>
      </TabsList>
      <TabsContent value="review">
        <CardReview />
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
