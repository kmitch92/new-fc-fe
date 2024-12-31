import { Dispatch, SetStateAction } from "react";
import { ICardExtra } from "@/lib/api/types/types";
import { RowData, columns } from "./columns"
import { DataTable } from "./DataTable"
import { IDeckInfo } from "@/lib/api/types/types";

interface ICardBrowserProps {
    cardInfos: ICardExtra[];
    setActiveDeck: Dispatch<SetStateAction<IDeckInfo | null>>
    setActiveCard: Dispatch<SetStateAction<ICardExtra | null>>
    activeCard: ICardExtra | null
}

export const CardBrowser = ({ cardInfos, setActiveCard, setActiveDeck, activeCard }: ICardBrowserProps) => {

    const cardRows: RowData[] = cardInfos.map((card) => {
        return { frontField: card.frontField, deckName: card.deckInfo.name, nextReview: card.nextReview }
    })

    return (
        <div className="h-[500px] w-full p-1">
            <div className="mx-1 w-full py-2">
                <DataTable columns={columns} data={cardRows} />
            </div>
        </div>
    )
}
