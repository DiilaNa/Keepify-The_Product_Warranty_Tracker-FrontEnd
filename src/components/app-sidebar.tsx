import * as React from "react";
import {
  IconDashboard,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconNotification,
  IconReport,
} from "@tabler/icons-react";

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
import { useEffect, useRef } from "react";
import { NotificationsSheet } from "./NotifySheet";
import { Combobox } from "./custom/combobox";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { loadBrandsByCategoryThunk } from "@/slices/brands/brandsThunk";
import { toast } from "sonner";
import { saveWarrantyThunk } from "@/slices/warranty/warrantyThunk";
import { loadCurrentUserThunk } from "@/slices/auth/authThunk";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const notificationRef = useRef<HTMLButtonElement>(null);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedBrands, setSelectedBrands] = React.useState("");
  const { brands } = useAppSelector((state) => state.brands);
  const dispatch = useAppDispatch();
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const { loadingWarranties } = useAppSelector((state) => state.warranty);

  const [currentUser, setCurrentUser] = React.useState<{
    email: string;
    firstname: string;
    lastname: string;
  } | null>(null);

  const filteredBrands = brands.filter((b) => b.category === selectedCategory);

  React.useEffect(() => {
    if (selectedCategory) {
      dispatch(loadBrandsByCategoryThunk(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await dispatch(loadCurrentUserThunk());
      if (loadCurrentUserThunk.fulfilled.match(result)) {
        setCurrentUser(result.payload.user); 
      }
    };

    if (!currentUser) {
      fetchUser();
    }
  }, [dispatch]);

  const saveWarranty = async (formData: FormData) => {
    formData.append("category", selectedCategory);
    formData.append("brand", selectedBrands);
    try {
      const result = await dispatch(saveWarrantyThunk(formData));

      if (saveWarrantyThunk.fulfilled.match(result)) {
        toast.success("saved warranties successfully");
        closeButtonRef.current?.click();
      } else {
        toast.error((result.payload as string) || "adding warrnties failed");
      }
    } catch (err: any) {
      toast.error("warranties saving failed");
    }
  };


  const email = currentUser?.email ?? "user@example.com";
  const name = currentUser
    ? `${currentUser.firstname} ${currentUser.lastname}`
    : "User";
  const data = {
    user: {
      name,
      email,
      avatarFallback: name.charAt(0).toUpperCase() || "U",
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

  const unreadCount = useAppSelector(
    (state) => state.notifications.unreadCount
  );

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
                  <input type="hidden" name="brandId" value={selectedBrands} />
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
          onSubmit={saveWarranty}
          closeButtonRef={closeButtonRef}
          loading={loadingWarranties}
        />
        <NotificationsSheet ref={notificationRef} />

        <NavMain items={data.navMain} unreadCount={unreadCount} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} role="USER" />
      </SidebarFooter>
    </Sidebar>
  );
}
