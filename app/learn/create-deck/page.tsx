import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AddDeckDashboard } from '@/components/AddDeckDashboard';

export default function CreateDeck() {
  return (
    <section className="grid h-screen w-full px-4">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Add Deck</h1>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5" />
            Something
          </Button>
        </header>
        <AddDeckDashboard />
      </div>
    </section>
  );
}
