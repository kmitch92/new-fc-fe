import Link from 'next/link';
import { AddDeck } from '@/components/Deck/AddDeck';
import { useServerSessionUser } from '@/lib/hooks/useServerSession';

export default async function Learn() {
  const sessionUser = await useServerSessionUser();
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          {sessionUser?.id ? (
            <AddDeck userId={sessionUser?.id} />
          ) : (
            'Loading...'
          )}
          <Link
            href="/learn/create-card"
            className="text-foreground transition-colors hover:text-foreground w-20"
          >
            Add Cards
          </Link>
          <Link
            href="/learn/edit-card"
            className="text-foreground transition-colors hover:text-foreground w-20"
          >
            Edit Cards
          </Link>
        </nav>
      </header>
    </div>
  );
}
