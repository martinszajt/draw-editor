import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FilePlus2 } from "lucide-react"
import { useState } from "react"

const routeRegex = /^[a-zA-Z0-9-_]+$/;

export function CreateDocumentButton() {
  const [fileName, setFileName] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
          setFileName(newValue);
    if (routeRegex.test(newValue) || newValue === "") {

      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New File <FilePlus2 /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create new File</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="file-name" className="sr-only">
              File Name
            </Label>
            <Input
              id="file-name"
              placeholder="Enter file name (no spaces or slashes)"
              value={fileName}
              onChange={handleFileNameChange}
              aria-invalid={!isValid}
            />
            {!isValid && (
              <p className="text-red-500 text-sm mt-1">Invalid file name.</p>
            )}
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button disabled={!isValid} type="button" variant="secondary">
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
