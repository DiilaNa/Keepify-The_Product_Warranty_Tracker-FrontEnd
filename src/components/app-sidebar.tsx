import * as React from "react";
import {
  IconDashboard,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconNotification,
  IconReport,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { AdminPopup } from "./custom/PopUps";
import { useRef } from "react";
import { NotificationsSheet } from "./NotifySheet";
import { Combobox } from "./custom/combobox";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { loadBrandsByCategoryThunk } from "@/slices/brands/brandsThunk";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const notificationRef = useRef<HTMLButtonElement>(null);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedBrands, setSelectedBrands] = React.useState("");
  const { brands } = useAppSelector((state) => state.brands);
  const dispatch = useAppDispatch();

  const filteredBrands = brands.filter(
    (b) => b.category.toString() === selectedCategory
  );
  
  React.useEffect(() => {
    if (selectedCategory) {
      dispatch(loadBrandsByCategoryThunk(selectedCategory));
    }
  }, [selectedCategory,dispatch]);

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "#",
        icon: IconDashboard,
      },
      {
        title: "Posts",
        url: "#",
        icon: IconListDetails,
      },
      {
        title: "Notifications",
        url: "#",
        icon: IconNotification,
        onClick: () => notificationRef.current?.click(),
        showUnread: true,
      },
    ],
    navSecondary: [
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
    ],
    documents: [
      {
        name: "Reports",
        url: "#",
        icon: IconReport,
      },
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link to="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Keepify</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <hr />
      <SidebarContent className="mt-4">
        <AdminPopup
          triggerLabel="Add a post"
          title="Add New Warranty"
          description="Fill the details to save a new warranty."
          onSubmit={(form) => console.log("Add Warranty", form)}
          fields={[
            {
              id: "name",
              label: "Product Name",
              type: "text",
            },
            {
              id: "description",
              label: "Description",
              type: "textarea",
            },

            {
              type: "row",
              fields: [
                { id: "purchase_date", label: "Purchase Date", type: "date" },
                { id: "expiry_date", label: "Expiry Date", type: "date" },
              ],
            },
            {
              id: "category",
              label: "Category",
              type: "text",
              component: (
                <>
                  <Combobox
                    type="category"
                    placeholder="Select Category"
                    onChange={(val) => setSelectedCategory(val)}
                  />
                  <input
                    type="hidden"
                    name="category"
                    value={selectedCategory}
                  />
                </>
              ),
            },
            {
              id: "brand_id",
              label: "Brand",
              type: "text",
              component: (
                <>
                  <Combobox
                    type="brand"
                    placeholder="Selct Brands"
                    data={filteredBrands}
                    onChange={(val) => setSelectedBrands(val)}
                  />
                  <input type="hidden" name="brands" value={selectedBrands} />
                </>
              ),
            },
            {
              type: "row",
              fields: [
                { id: "serial_number", label: "Serial Number", type: "text" },
                { id: "bill_image", label: "Bill Image", type: "file" },
              ],
            },
          ]}
        />
        <NotificationsSheet
          ref={notificationRef}
          onUnreadChange={setUnreadCount}
        />

        <NavMain items={data.navMain} unreadCount={unreadCount} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} role="USER" />
      </SidebarFooter>
    </Sidebar>
  );
}
