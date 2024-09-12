import { ISessionUser } from '@/lib/api/types/types';
import { AddCardDashboard } from './AddCardDashboard';
import { EditCardDashboard } from './EditCardDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// export const CardInteractionsChildren = ({ Mode, sUser }: { Mode: string, sUser: ISessionUser }) => {
//   switch (Mode) {
//     case "Add":
//       return <AddCardDashboard sessionUser={sUser}/>;
//     case "Edit":
//       return <EditCardDashboard sessionUser={sUser}/>;
//     default:
//       return <AddCardDashboard sessionUser={sUser}/>;
//   }
// };

export const CardInteractions = ({
  //   Mode,
  sUser,
}: {
  //   Mode: string;
  sUser: ISessionUser;
}) => {
  return (
    <Tabs defaultValue="add" className="w-[40vw]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="add">add</TabsTrigger>
        <TabsTrigger value="edit">edit</TabsTrigger>
      </TabsList>
      <TabsContent value="add">
        <AddCardDashboard sessionUser={sUser} />;
      </TabsContent>
      <TabsContent value="edit">
        <EditCardDashboard sessionUser={sUser} />;
      </TabsContent>
    </Tabs>
  );
};
