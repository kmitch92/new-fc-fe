import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditCardDashboard } from '@/components/EditCardDashboard';
import { useServerSessionUser } from '@/lib/hooks/useServerSession';

export default async function CreateCard() {
  const sessionUser = await useServerSessionUser();
  return (
    <section className="grid h-screen w-full px-4">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Edit Card</h1>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5" />
            Something
          </Button>
        </header>
        {sessionUser && <EditCardDashboard sessionUser={sessionUser} />}
      </div>
    </section>
  );
}
