import { Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AddDeckDashboard } from '@/components/AddDeckDashboard';

export default function CreateDeck() {
  return (
    <section className="h-screen w-full px-4">
      <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
        <h1 className="text-xl font-semibold">Add Deck</h1>
      </header>

      <AddDeckDashboard />
    </section>
  );
}
