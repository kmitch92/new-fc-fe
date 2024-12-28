'use client'
import React, { Dispatch, SetStateAction } from "react"
import { DeckDropdown } from "./DeckDropdown"
import { IDeckInfo, ISessionUser } from "@/lib/api/types/types"
import { AddDeck } from "./AddDeck";
import { Card, CardDescription, CardHeader } from "../ui/card";
import { ObjectId } from "mongoose";
import { EditDeck } from "./EditDeck";

interface DeckBlockProps {
    activeDeck: IDeckInfo;
    setActiveDeck: Dispatch<SetStateAction<IDeckInfo>>;
    sessionUser: ISessionUser;
}
export const DeckBlock = ({ activeDeck, setActiveDeck, sessionUser }: DeckBlockProps) => {

    return <div className="flex-col justify-between h-full">
        <DeckDropdown setDeck={setActiveDeck} sessionUser={sessionUser} />
        <Card>
            <CardHeader>{activeDeck.name}</CardHeader>
            <CardDescription>{activeDeck.description}</CardDescription>
        </Card>
        <AddDeck userId={sessionUser?.id || "" as unknown as ObjectId} />
        <EditDeck deckInfo={activeDeck} />
    </div>
}