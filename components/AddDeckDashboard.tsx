import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const AddDeckDashboard = () => {
  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6">
        <fieldset className="gap-6 w-96 h-[400px] rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-sm font-medium">New Deck</legend>
          <div>
            <div className="grid gap-3">
              <Label htmlFor="title-input">Deck Title</Label>
              <Input id="title-input" type="text" placeholder="Title..." />
            </div>
            <div className="grid gap-3 my-8">
              <Label htmlFor="description-input">Deck Description</Label>
              <Textarea
                id="description-input"
                placeholder="Description..."
                className="min-h-[9.5rem]"
              />
            </div>
          </div>
          <Button>Create</Button>
        </fieldset>
      </form>
    </div>
  );
};
