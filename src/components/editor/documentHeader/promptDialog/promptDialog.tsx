import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brush, FilePlus2 } from 'lucide-react';
import { useState } from 'react';

export interface PromptDialogProps {
  onConfirm: (prompt: string) => void;
}

export function PromptDialog({ onConfirm }: PromptDialogProps) {
  const [prompt, setPrompt] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setPrompt(newValue);
    if (newValue.length > 5) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleConfirm = () => {
    onConfirm(prompt);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Brush />
          Generate Image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate new AI image</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="file-name" className="sr-only">
              Prompt
            </Label>
            <Input
              id="file-name"
              placeholder="Image Prompt"
              value={prompt}
              onChange={handleFileNameChange}
              aria-invalid={!isValid}
            />
            {!isValid && <p className="text-red-500 text-sm mt-1">Prompt too short</p>}
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button disabled={!isValid} type="button" onClick={handleConfirm} variant="secondary">
              Generate
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
