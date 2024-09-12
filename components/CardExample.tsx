import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IDeckInfo, ICardInfo } from '@/lib/api/types/types';
import { addCardsToDeckById } from '@/lib/api/handlers';

interface CardExampleProps {
  deck: IDeckInfo | undefined;
  card: ICardInfo | undefined;
}

const renderAnswerField = (cardType: string, backfield: string | string[]) => {
  switch (cardType) {
    case 'type':
      return (
        <Input
          id="answer"
          type="text"
          placeholder="Answer"
          value={backfield}
          onChange={(e) => console.log(e.target.value)}
        />
      );
    case 'bigtype':
      return (
        <Textarea
          id="answer"
          placeholder="Answer"
          value={backfield}
          onChange={(e) => console.log(e.target.value)}
        />
      );
    case 'dropdown':
      return (
        <>
          <Label htmlFor="dropdown">Select Option</Label>
          <Select>
            <SelectTrigger id="dropdown">
              <SelectValue placeholder="...Or by Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value={backfield[0]}>{backfield[0]}</SelectItem>
              <SelectItem value={backfield[1]}>{backfield[1]}</SelectItem>
              <SelectItem value={backfield[2]}>{backfield[2]}</SelectItem>
              <SelectItem value={backfield[3]}>{backfield[3]}</SelectItem>
            </SelectContent>
          </Select>
        </>
      );
    default:
      return <h3>Card Type Required</h3>;
  }
};

export function CardExample({ deck, card }: CardExampleProps) {
  return (
    <Card className="w-[95%] h-[85%] ">
      <CardHeader>
        <CardTitle>CARD QUESTION</CardTitle>
        <CardDescription>Deck: {deck?.name || 'Choose Deck'}</CardDescription>
      </CardHeader>
      <CardContent>
        {card?.imageURL && (
          <img
            style={{ objectFit: 'cover' }}
            src={card.imageURL}
            alt="stand in for where an image could go"
            className="border border-primary rounded-md p-4 my-4 h-36 w-full"
          />
        )}

        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="question">Question:</Label>
            <h1 id="question">{card?.frontField ?? 'Question Required...'}</h1>
            {card?.subfield && <p>{card.subfield}</p>}
          </div>
          <div className="flex flex-col space-y-1.5">
            {renderAnswerField(card?.answerType || '', card?.backField || '')}
          </div>
          <div>
            <p>{card?.extraField}</p>
          </div>
          <div className="flex-wrap">
            {card?.tags &&
              card?.tags.map((tag) => (
                <Badge variant="default" className="bg-primary mx-0.5 mt-1">
                  {tag}
                </Badge>
              ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Skip</Button>
        <Button>Answer</Button>
      </CardFooter>
    </Card>
  );
}
