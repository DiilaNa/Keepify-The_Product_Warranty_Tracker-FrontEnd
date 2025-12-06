import { AppSidebar } from "@/components/app-sidebar";
import { WarrantyCard } from "@/components/custom/Posts";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import SearchAppBar from "@/components/ui/search";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function UserDashBoard() {
  const posts = [
    {
      id: "123",
      title: "Apple Watch Warranty",
      image:
        "https://imgs.search.brave.com/TzTjzdA9c6vauPpBV1xJIXC0UZSDxnXwrq4HdjaWhL4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDQv/NjUxLzU4MS9zbWFs/bC9hLXBlcnNvbi1p/bi1hLWJ1c2luZXNz/LXNoaXJ0LWFkanVz/dHMtYS1zbWFydHdh/dGNoLXBuZy5wbmc",
      billImage:
        "https://imgs.search.brave.com/UntvBPju8hwc7ONfP2eCDsr4nytMQ-BH24EXkazVxoQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMTMvU21h/cnR3YXRjaC1Eb3du/bG9hZC1QTkctSW1h/Z2UucG5n",
      description: "This is a amazing watch",

      // ⭐ NEW FIELDS ADDED — MUST EXIST
      purchase_date: "2024-01-01",
      expiry_date: "2025-01-01",
      serial_number: "SN-ABCD-12345",
    },
  ];

  const handleEdit = (id: string, data: any) => {
    console.log("Editing Warranty:", id, data);

    // dispatch(updateWarrantyThunk({ id, ...data }))
  };

  const handleDelete = (id: string) => {
    console.log("Delete", id);
    // dispatch(deleteWarrantyThunk(id));
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />

              <div className="px-4 lg:px-6">
                <SearchAppBar />
                {posts.map((p) => (
                  <WarrantyCard
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    image={p.image}
                    billImage={p.billImage}
                    description={p.description}
                    purchase_date={p.purchase_date}
                    expiry_date={p.expiry_date}
                    serial_number={p.serial_number}
                    onEdit={(updatedData) => handleEdit(p.id, updatedData)}
                    onDelete={() => handleDelete(p.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
