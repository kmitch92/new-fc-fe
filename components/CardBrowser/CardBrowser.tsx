import { ICardExtra } from "@/lib/api/types/types";
import { RowData, columns } from "./columns"
import { DataTable } from "./DataTable"

interface ICardBrowserProps {
    cardInfos: ICardExtra[];
}

export const CardBrowser = ({ cardInfos }: ICardBrowserProps) => {

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
