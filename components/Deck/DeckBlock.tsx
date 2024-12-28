'use client'
import React, { Dispatch, SetStateAction } from "react"
import { DeckDropdown } from "./DeckDropdown"
import { IDeckInfo, ISessionUser } from "@/lib/api/types/types"
import { AddDeck } from "./AddDeck";
import { ObjectId } from "mongoose";
import { EditDeck } from "./EditDeck";

interface DeckBlockProps {
    activeDeck: IDeckInfo | null;
    setActiveDeck: Dispatch<SetStateAction<IDeckInfo | null>>;
    sessionUser: ISessionUser;
}
export const DeckBlock = ({ activeDeck, setActiveDeck, sessionUser }: DeckBlockProps) => {

    return <div className="flex-col justify-between h-full">
        <DeckDropdown setDeck={setActiveDeck} sessionUser={sessionUser} />
        <AddDeck userId={sessionUser?.id || "" as unknown as ObjectId} />
        <EditDeck deckInfo={activeDeck} />
    </div>
}