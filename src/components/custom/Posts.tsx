import { Card } from "flowbite-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { AdminPopup } from "./PopUps";

interface WarrantyCardProps {
  id: string;
  title: string;
  image: string;
  billImage: string;
  description: string;
  purchase_date: string;
  expiry_date: string;
  serial_number: string;
  onEdit: (data: FormData, id: string) => void;
  onDelete: (id: string) => void;
}

export function WarrantyCard({
  id,
  title,
  image,
  billImage,
  description,
  purchase_date,
  expiry_date,
  serial_number,
  onEdit,
  onDelete,
}: WarrantyCardProps) {
  const editBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <Card
      className="
        max-w-xs mt-6
        bg-[#0f0f0f] dark:bg-[#0f0f0f]
        border border-gray-800 
        rounded-xl overflow-hidden
        shadow-[0_0_20px_rgba(0,0,0,0.35)]
        hover:shadow-[0_0_35px_rgba(0,0,0,0.55)]
        transition-all duration-300 
        hover:-translate-y-1 
      "
      imgSrc={image}
      imgAlt={title}
    >
      {/* Title */}
      <h5 className="text-lg font-semibold text-gray-200">{title}</h5>

      {/* Description */}
      <p className="text-sm text-gray-400 line-clamp-2 mt-1">{description}</p>

      {/* Buttons */}
      <div className="flex items-center justify-between gap-2 mt-4">
        {/* BILL BUTTON */}
        <Button
          onClick={() => window.open(billImage, "_blank")}
          className="
            flex-1 rounded-lg text-xs font-medium
            bg-blue-600 hover:bg-blue-700 
            text-white 
            shadow-none
          "
        >
          Bill
        </Button>

        {/* EDIT BUTTON */}
        <Button
          onClick={() => editBtnRef.current?.click()}
          className="
            flex-1 rounded-lg text-xs font-medium
            bg-yellow-500 hover:bg-yellow-600
            text-black 
            shadow-none
          "
        >
          Edit
        </Button>

        {/* DELETE BUTTON */}
        <Button
          onClick={() => onDelete(id)}
          className="
            flex-1 rounded-lg text-xs font-medium
            bg-red-600 hover:bg-red-700
            text-white
            shadow-none
          "
        >
          Delete
        </Button>
      </div>

      {/* EDIT POPUP */}
      <AdminPopup
        ref={editBtnRef}
        hideTrigger={true}
        triggerLabel="Edit Warranty"
        title="Edit Warranty"
        description="Update your warranty details below."
        onSubmit={(form) => onEdit(form, id)}
        fields={[
          {
            id: "name",
            label: "Product Name",
            type: "text",
            component: (
              <input
                name="name"
                defaultValue={title}
                className="w-full rounded-md border border-gray-700 bg-[#111] text-gray-200 p-2"
              />
            ),
          },
          {
            id: "description",
            label: "Description",
            type: "textarea",
            component: (
              <textarea
                name="description"
                defaultValue={description}
                className="w-full rounded-md border border-gray-700 bg-[#111] text-gray-200 p-2"
              />
            ),
          },
          {
            id: "purchase_date",
            label: "Purchase Date",
            type: "date",
            component: (
              <input
                type="date"
                name="purchase_date"
                defaultValue={purchase_date}
                className="w-full rounded-md border border-gray-700 bg-[#111] text-gray-200 p-2"
              />
            ),
          },
          {
            id: "expiry_date",
            label: "Expiry Date",
            type: "date",
            component: (
              <input
                type="date"
                name="expiry_date"
                defaultValue={expiry_date}
                className="w-full rounded-md border border-gray-700 bg-[#111] text-gray-200 p-2"
              />
            ),
          },
          {
            id: "serial_number",
            label: "Serial Number",
            type: "text",
            component: (
              <input
                name="serial_number"
                defaultValue={serial_number}
                className="w-full rounded-md border border-gray-700 bg-[#111] text-gray-200 p-2"
              />
            ),
          },
          {
            id: "bill_image",
            label: "Bill Image",
            type: "file",
          },
        ]}
      />
    </Card>
  );
}

