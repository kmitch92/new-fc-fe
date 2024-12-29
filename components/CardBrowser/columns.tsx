"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type RowData = {
    frontField: string;
    nextReview: Date;
    deckName: string;
}

export const columns: ColumnDef<RowData>[] = [
    {
        accessorKey: "nextReview",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Next Review
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("nextReview") as Date)
            const formatted = new Intl.DateTimeFormat("en-GB").format(date)
            return <div className="text-center font-medium text-xs">{formatted}</div>
        },
    },
    {
        accessorKey: "frontField",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Front Field
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
            )
        },
    },
    {
        accessorKey: "deckName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Deck Name
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const card = row.original
            // consider creating some kind of factory function for columns, so that it can accept setters that set active card and deck
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="xs" className="h-8 w-8 p-0">

                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            Edit Card (?)
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Review Card (?)</DropdownMenuItem>
                        <DropdownMenuItem>Delete Card (?)</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]