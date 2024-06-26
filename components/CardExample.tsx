import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IDeckInfo } from '@/lib/api/types/types';

interface CardExampleProps {
  deck: IDeckInfo | undefined;
}

export function CardExample({ deck }: CardExampleProps) {
  console.log(deck);
  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>CARD QUESTION</CardTitle>
        <CardDescription>Deck: {deck?.name || 'Choose Deck'}</CardDescription>
      </CardHeader>
      <CardContent>
        <img
          style={{ objectFit: 'cover' }}
          src="https://res.cloudinary.com/totalmerchandise/image/fetch/f_auto,q_auto:eco,w_500/https://www.totalmerchandise.co.uk/media/Playing_Card_Sets_1.jpg"
          alt="stand in for where an image could go"
          className="border border-white rounded-md p-4 my-4 h-36 w-full"
        />
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="input">Input Option</Label>
              <Input id="input" placeholder="You could answer via Input." />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="select">Select Option</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="...Or by Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Option 1">Option 1</SelectItem>
                  <SelectItem value="Option 2">Option 2</SelectItem>
                  <SelectItem value="Option 3">Option 3</SelectItem>
                  <SelectItem value="Option 4">Option 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
        <p className="mt-4">
          figure out a stand in for cloze, and experiment with other input
          types. eventually images and clickable areas will have to be
          implemented
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Skip</Button>
        <Button>Answer</Button>
      </CardFooter>
    </Card>
  );
}
