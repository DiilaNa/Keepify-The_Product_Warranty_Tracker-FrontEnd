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
import { forwardRef } from "react";
import { useAppSelector } from "@/hooks/hook";

interface Field {
  id?: string;
  label?: string;
  type:
    | "text"
    | "textarea"
    | "file"
    | "password"
    | "email"
    | "date"
    | "custom"
    | "row";
  placeholder?: string;
  component?: React.ReactNode;
  fields?: Field[];
  render?: () => React.ReactNode;
}

interface AdminPopupProps {
  triggerLabel: string;
  title: string;
  description: string;
  fields: Field[];
  hideTrigger?: boolean;
  onSubmit?: (data: FormData | any) => void;
  closeButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

// Use forwardRef to expose the button for programmatic click
export const AdminPopup = forwardRef<HTMLButtonElement, AdminPopupProps>(
  (
    {
      triggerLabel,
      title,
      description,
      fields,
      onSubmit,
      hideTrigger,
      closeButtonRef,
    },
    ref
  ) => {
    const { loading } = useAppSelector((state) => state.category);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      onSubmit?.(formData);
    }

    function renderField(field: Field) {
      if (field.component) return field.component;

      switch (field.type) {
        case "text":
        case "password":
        case "email":
          return (
            <Input
              id={field.id}
              name={field.id}
              placeholder={field.placeholder}
            />
          );

        case "textarea":
          return (
            <Textarea
              id={field.id}
              name={field.id}
              placeholder={field.placeholder}
            />
          );

        case "file":
          return <Input type="file" id={field.id} name={field.id} />;

        case "date":
          return <Input type="date" id={field.id} name={field.id} />;

        case "custom":        
          return field.render ? field.render() : null;

        default:
          return null;
      }
    }

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            ref={ref}
            data-admin-popup-trigger="true"
            className={`w-full gap-2 ${hideTrigger ? "hidden" : ""}`}
          >
            <IconCirclePlusFilled className="h-4 w-4" />
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
              {fields.map((field) =>
                field.type === "row" ? (
                  <div
                    key={JSON.stringify(field.fields)}
                    className="grid grid-cols-2 gap-4"
                  >
                    {field.fields?.map((subField) => (
                      <div key={subField.id} className="grid gap-4">
                        <Label htmlFor={subField.id}>{subField.label}</Label>
                        {renderField(subField)}
                      </div>
                    ))}
                  </div>
                ) : (
                  // regular fields:
                  <div key={field.id} className="grid gap-2">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    {renderField(field)}
                  </div>
                )
              )}
            </div>

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button ref={closeButtonRef} variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
);
