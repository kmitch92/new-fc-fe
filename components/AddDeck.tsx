'use client';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function AddDeck() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost">Add Deck</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Deck</DialogTitle>
            <DialogDescription>
              Provide a title and description for the new deck.
            </DialogDescription>
          </DialogHeader>
          <AddDeckForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Deck</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Deck</DrawerTitle>
          <DrawerDescription>
            Provide a title and description for the new deck.
          </DrawerDescription>
        </DrawerHeader>
        <AddDeckForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function AddDeckForm({ className }: React.ComponentProps<'form'>) {
  return (
    <form className={cn('grid items-start gap-4', className)}>
      <fieldset className="gap-6 w-96 h-auto rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">New Deck</legend>
        <div>
          <div className="grid gap-3">
            <Label htmlFor="title-input">Deck Title</Label>
            <Input id="title-input" type="text" placeholder="Title..." />
          </div>
          <div className="grid gap-3 my-8">
            <Label htmlFor="description-input">Deck Description</Label>
            <Textarea
              id="description-input"
              placeholder="Description..."
              className="min-h-[9.5rem]"
            />
          </div>
        </div>
        <Button type="submit">Create</Button>
      </fieldset>
    </form>
  );
}
