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
import { postDeck } from '@/lib/api/handlers';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const handlePostDeck = async (
  userId: string,
  formData: FormData,
  formRef: React.RefObject<HTMLFormElement> | null
) => {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  try {
    await postDeck(userId, { name, description, cards: [] });
    formRef && formRef?.current?.reset();
  } catch (error) {
    console.error(error);
  }
};
interface AddDeckProps {
  userId: string;
  isExposed?: boolean;
}
export function AddDeck({ userId, isExposed = false }: AddDeckProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const formRef = React.useRef<HTMLFormElement>(null);

  if (isDesktop && !isExposed) {
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
          <AddDeckForm setOpen={setOpen} userId={userId} formRef={formRef} />
        </DialogContent>
      </Dialog>
    );
  } else if (isDesktop && isExposed) {
    return (
      <Card className="max-w-[425px]">
        <CardContent className="max-w-[425px]">
          <CardHeader>
            <CardTitle>Add Deck</CardTitle>
            <CardDescription>
              Provide a title and description for the new deck.
            </CardDescription>
          </CardHeader>
          <AddDeckForm setOpen={setOpen} userId={userId} formRef={formRef} />
        </CardContent>
      </Card>
    );
  } else
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
          <AddDeckForm
            className="px-4"
            setOpen={setOpen}
            userId={userId}
            formRef={formRef}
          />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
}
interface AddDeckFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  userId: string;
  formRef: React.RefObject<HTMLFormElement> | null;
}

export function AddDeckForm({
  className,
  setOpen,
  userId,
  formRef,
}: AddDeckFormProps) {
  return (
    <form
      className={cn('grid items-start gap-4', className)}
      ref={formRef}
      action={(form) => {
        return handlePostDeck(userId, form, formRef), setOpen(false);
      }}
    >
      <div>
        <div className="grid gap-3">
          <Label htmlFor="title-input">Deck Title</Label>
          <Input
            id="title-input"
            type="text"
            name="name"
            placeholder="Title..."
          />
        </div>
        <div className="grid gap-3 my-8">
          <Label htmlFor="description-input">Deck Description</Label>
          <Textarea
            id="description-input"
            placeholder="Description..."
            name="description"
            className="min-h-[9.5rem]"
          />
        </div>
      </div>
      <Button type="submit">Create</Button>
    </form>
  );
}
