"use client"

import { ColumnDef } from "@tanstack/react-table"

export type RowData = {
    frontField: string;
    nextReview: Date;
    deckName: string;
}

export const columns: ColumnDef<RowData>[] = [
    {
        accessorKey: "nextReview",
        header: "nextReview"
    },
    {
        accessorKey: "frontField",
        header: "Front Field"
    },
    {
        accessorKey: "deckName",
        header: "Deck Name"
    }
]