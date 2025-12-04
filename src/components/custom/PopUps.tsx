import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { IconCirclePlusFilled } from "@tabler/icons-react";

interface Field {
  id: string;
  label: string;
  type: "text" | "textarea" | "file";
  placeholder?: string;
}

interface AdminPopupProps {
  triggerLabel: string;
  title: string;
  description: string;
  fields: Field[];
//   onSubmit: (data: FormData) => void;
}

export function AdminPopup({
  triggerLabel,
  title,
  description,
  fields,
  
//   onSubmit,
}: AdminPopupProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // const formData = 
    new FormData(e.currentTarget);
    // onSubmit(formData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-64 bg-primary text-primary-foreground">
          <IconCirclePlusFilled className="ml-1" />
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 mt-4">
            {fields.map((field) => (
              <div key={field.id} className="grid gap-3">
                <Label htmlFor={field.id}>{field.label}</Label>

                {field.type === "text" && (
                  <Input
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                  />
                )}

                {field.type === "textarea" && (
                  <Textarea
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                  />
                )}

                {field.type === "file" && (
                  <Input type="file" id={field.id} name={field.id} />
                )}
              </div>
            ))}
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
