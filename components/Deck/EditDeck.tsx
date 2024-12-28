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
import { editDeckInfoById } from '@/lib/api/handlers';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ObjectId } from 'mongoose';
import { IDeckInfo } from '@/lib/api/types/types';

const handleUpdateDeck = async (
    deckId: ObjectId,
    formData: FormData,
    formRef: React.RefObject<HTMLFormElement> | null
) => {
    const newName = formData.get('name') as string;
    const newDescription = formData.get('description') as string;

    try {
        await editDeckInfoById(deckId, newName, newDescription);
        formRef && formRef?.current?.reset();
    } catch (error) {
        console.error(error);
    }
};
interface EditDeckProps {
    deckInfo: IDeckInfo | null;
    isExposed?: boolean;
}
export function EditDeck({ deckInfo, isExposed = false }: EditDeckProps) {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const formRef = React.useRef<HTMLFormElement>(null);

    if (deckInfo?.id && isDesktop && !isExposed) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost">Edit Deck</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Deck</DialogTitle>
                        <DialogDescription>
                            Update title and/or description for the chosen deck.
                        </DialogDescription>
                    </DialogHeader>
                    <EditDeckForm setOpen={setOpen} deckInfo={deckInfo} formRef={formRef} />
                </DialogContent>
            </Dialog>
        );
    } else if (deckInfo?.id && isDesktop && isExposed) {
        return (
            <Card className="max-w-[425px]">
                <CardContent className="max-w-[425px]">
                    <CardHeader>
                        <CardTitle>Edit Deck</CardTitle>
                        <CardDescription>
                            Update title and/or description for the chosen deck.
                        </CardDescription>
                    </CardHeader>
                    <EditDeckForm setOpen={setOpen} deckInfo={deckInfo} formRef={formRef} />
                </CardContent>
            </Card>
        );
    } else if (deckInfo?.id) {
        return (
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline">Edit Deck</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Edit Deck</DrawerTitle>
                        <DrawerDescription>
                            Update title and/or description for the chosen deck.
                        </DrawerDescription>
                    </DrawerHeader>
                    <EditDeckForm
                        className="px-4"
                        setOpen={setOpen}
                        deckInfo={deckInfo}
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
    } else return <Button variant="outline" disabled>Edit Deck</Button>
}
interface EditDeckFormProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    className?: string;
    deckInfo: IDeckInfo;
    formRef: React.RefObject<HTMLFormElement> | null;
}

export function EditDeckForm({
    className,
    setOpen,
    deckInfo,
    formRef,
}: EditDeckFormProps) {
    return (
        <form
            className={cn('grid items-start gap-4', className)}
            ref={formRef}
            action={(form) => {
                return handleUpdateDeck(deckInfo.id, form, formRef), setOpen(false);
            }}
        >
            <div>
                <div className="grid gap-3">
                    <Label htmlFor="title-input">Deck Title</Label>
                    <Input
                        id="title-input"
                        type="text"
                        name="name"
                        placeholder={deckInfo.name}
                    />
                </div>
                <div className="grid gap-3 my-8">
                    <Label htmlFor="description-input">Deck Description</Label>
                    <Textarea
                        id="description-input"
                        placeholder={deckInfo.description}
                        name="description"
                        className="min-h-[9.5rem]"
                    />
                </div>
            </div>
            <Button type="submit">Update</Button>
        </form>
    );
}
