import { Card } from "flowbite-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { AdminPopup } from "./PopUps";
import { useAppSelector } from "@/hooks/hook";

interface WarrantyCardProps {
  id: string;
  title: string;
  image: string;
  billImage: string;
  description: string;
  purchase_date: string;
  expiry_date: string;
  serial_number: string;
  status: "ACTIVE" | "EXPIRED" | "EXPIRING_SOON";
  onEdit: (data: FormData, id: string) => Promise<boolean>;
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
  status,
  onEdit,
  onDelete,
}: WarrantyCardProps) {
  const { loadingWarranties } = useAppSelector((state) => state.warranty);

  const editBtnRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isExpired = status === "EXPIRED";

  const [name, setName] = useState(title);
  const [desc, setDesc] = useState(description);
  const [purchaseDate, setPurchaseDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [serial, setSerial] = useState(serial_number);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
  };

  useEffect(() => {
    setName(title);
    setDesc(description);
    setPurchaseDate(formatDate(purchase_date));
    setExpiryDate(formatDate(expiry_date));
    setSerial(serial_number);
  }, [title, description, purchase_date, expiry_date, serial_number]);

  const openEditPopup = () => {
    setName(title);
    setDesc(description);
    setPurchaseDate(formatDate(purchase_date));
    setExpiryDate(formatDate(expiry_date));
    setSerial(serial_number);

    editBtnRef.current?.click();
  };

  return (
    <Card
      imgSrc={image}
      imgAlt={title}
      className={`relative max-w-xs mt-6 rounded-xl overflow-hidden transition-all duration-300
${
  isExpired
    ? "bg-gray-900 border border-red-500/40 opacity-75"
    : "bg-[#0f0f0f] border border-gray-800 hover:-translate-y-1"
}
`}
    >
      {isExpired && (
        <span className="absolute top-3 right-3 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow">
          EXPIRED
        </span>
      )}
      <h5 className="text-lg font-semibold text-gray-200">{title}</h5>
      <p className="text-sm text-gray-400 line-clamp-2 mt-1">{description}</p>

      <div className="flex items-center justify-between gap-2 mt-4">
        <Button
          onClick={() => window.open(billImage, "_blank")}
          className="flex-1 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-none"
        >
          Bill
        </Button>
        <Button
          disabled={isExpired}
          onClick={openEditPopup}
          className={`flex-1 rounded-lg text-xs font-medium
${
  isExpired
    ? "bg-gray-600 cursor-not-allowed"
    : "bg-yellow-500 hover:bg-yellow-600 text-black"
}
`}
        >
          Edit
        </Button>
        <Button
          onClick={() => onDelete(id)}
          className="flex-1 rounded-lg text-xs font-medium bg-red-600 hover:bg-red-700 text-white shadow-none"
        >
          Delete
        </Button>
      </div>

      <AdminPopup
        ref={editBtnRef}
        hideTrigger
        triggerLabel="Edit Warranty"
        title="Edit Warranty"
        description="Update your warranty details below."
        onSubmit={async (form) => {
          form.set("name", name);
          form.set("description", desc);
          form.set("purchase_date", purchaseDate);
          form.set("expiry_date", expiryDate);
          form.set("serial_number", serial);

          const success = await onEdit(form, id);
          if (success) {
            closeButtonRef.current?.click();
          }
        }}
        closeButtonRef={closeButtonRef}
        loading={loadingWarranties}
        fields={[
          {
            id: "name",
            label: "Product Name",
            type: "text",
            component: (
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full rounded-md border border-gray-700 bg-[#111] text-gray-200 p-2"
              />
            ),
          },
          {
            type: "row",
            fields: [
              {
                id: "purchase_date",
                label: "Purchase Date",
                type: "date",
                component: (
                  <input
                    type="date"
                    name="purchase_date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
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
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full rounded-md border border-gray-700 bg-[#111] text-gray-200 p-2"
                  />
                ),
              },
            ],
          },
          {
            id: "serial_number",
            label: "Serial Number",
            type: "text",
            component: (
              <input
                name="serial_number"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
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
