import { InputFile } from "@/components/InputFile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconCirclePlusFilled } from "@tabler/icons-react";

export function AddAnnouncementsPopup() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="w-64 bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/90 min-w-8 duration-200 ease-linear">
            <IconCirclePlusFilled className="ml-1" />
            <span className="mr-2">Add Announcements</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a new Announcements</DialogTitle>
            <DialogDescription>
              Add a new announcements for the system from here.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Title</Label>
              <Input id="name-1" name="name" placeholder="add a title" />
            </div>
            <InputFile />
            <Textarea placeholder="describe your annoucement"/>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
