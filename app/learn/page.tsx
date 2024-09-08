import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CreditCard,
  DollarSign,
  Menu,
  Package2,
  Search,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AddDeck } from '@/components/AddDeck';
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
