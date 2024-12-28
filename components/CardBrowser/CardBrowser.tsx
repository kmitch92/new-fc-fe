import { ICardExtra } from "@/lib/api/types/types";
import { RowData, columns } from "./columns"
import { DataTable } from "./DataTable"
import Typography from "../Typography";

interface ICardBrowserProps {
    cardInfos: ICardExtra[];
}

export const CardBrowser = ({ cardInfos }: ICardBrowserProps) => {

    const cardRows: RowData[] = cardInfos.map((card) => {
        return { frontField: card.frontField, deckName: card.deckInfo.name, nextReview: card.nextReview }
    })

    return (
        <div className="h-[500px] w-[400px] bg-[red] border">
            <Typography.H1>
                CARD BROWSER
            </Typography.H1>
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={cardRows} />
            </div>
        </div>
    )
}
