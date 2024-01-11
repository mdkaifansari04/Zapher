"use client";
import { Copy } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FadeImg } from "../core/fadeImg";

function ShareModal({ iconImage, url }: { iconImage: string; url: string }) {
  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(url);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <FadeImg
            src={iconImage}
            alt="heart"
            width={24}
            height={24}
            className="cursor-pointer object-contain"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                className="bg-dark-4"
                id="link"
                defaultValue={url}
                readOnly
              />
            </div>
            <Button
              onClick={copyToClipboard}
              type="submit"
              size="sm"
              className="px-3"
            >
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ShareModal;
