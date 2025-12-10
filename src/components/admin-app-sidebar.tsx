import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconUsers,
} from "@tabler/icons-react";

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
import { Combobox } from "./custom/combobox";
import { saveCategoryThunk } from "@/slices/category/categoryThunk";
import { useAppDispatch } from "@/hooks/hook";
import { toast } from "sonner";
import type { BrandsDataTypes } from "@/services/brands";
import { saveBrandsThunk } from "@/slices/brands/brandsThunk";
import { saveAnnouncementsThunk } from "@/slices/announcements/announcementsThunk";

export function AdminAppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {

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
        title: "Lifecycle",
        url: "#",
        icon: IconListDetails,
      },
      {
        title: "Analytics",
        url: "#",
        icon: IconChartBar,
      },
      {
        title: "Projects",
        url: "#",
        icon: IconFolder,
      },
      {
        title: "Team",
        url: "#",
        icon: IconUsers,
      },
    ],
  };

  const dispatch = useAppDispatch();
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  const handleAddAnnouncements = async(formdata:FormData) => {
    try{
      const result = await dispatch(saveAnnouncementsThunk(formdata));

      if(saveAnnouncementsThunk.fulfilled.match(result)){
        toast.success("save announcements successfully")
        closeButtonRef.current?.click();
      }else{
        toast.error((result.payload as string) || "adding announcements failed")
      }
    }catch(err:any){
      toast.error("announcements saving failed")
    }
  }

  const handleAddCategory = async (formData: FormData) => {
    try {
      const result = await dispatch(saveCategoryThunk(formData));
      if (saveCategoryThunk.fulfilled.match(result)) {
        toast.success("Category saved successfully!");
        closeButtonRef.current?.click();
      } else {
        toast.error((result.payload as string) || "Saving failed");
      }
    } catch (err) {
      toast.error("Saving failed");
    }
  };

  const saveBrands = async (formData: FormData) => {
    const brand_name = formData.get("brand_name") as string;

    const data: BrandsDataTypes = {
      brand_name,
      category: selectedCategory,
    };
    try {
      const result = await dispatch(saveBrandsThunk(data));

      if (saveBrandsThunk.fulfilled.match(result)) {
        toast.success("Brands added successfully");
        closeButtonRef.current?.click();
      } else {
        toast.error((result.payload as string) || "Brands saving failed");
      }
    } catch (err) {
      toast.error("Saving Brands Failed");
    }
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
                <span className="text-base font-semibold">Keepify-Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <hr />
      <SidebarContent>
        <div className="flex mt-5">
          <AdminPopup
            triggerLabel="Add Announcements"
            title="Add a new Announcement"
            description="Add a new announcement for the system."
            fields={[
              {
                id: "title",
                label: "Title",
                type: "text",
                placeholder: "Enter title",
              },
              {
                id: "category",
                label: "Category",
                component: (
                  <>
                  <Combobox
                    type="category"
                    placeholder="Select Category"
                    onChange={(val) => setSelectedCategory(val)}
                    />
                    <input type="hidden" name="category" value={selectedCategory} />
                  </>
                ),
                placeholder: "Smartphones",
                type: "text",
              },
              { id: "image", label: "Image", type: "file" },
              {
                id: "description",
                label: "Description",
                type: "textarea",
                placeholder: "Describe the announcement",
              },
            ]}
            onSubmit={handleAddAnnouncements}
            closeButtonRef={closeButtonRef}
          />
        </div>
        <div className="flex mt-5">
          <AdminPopup
            triggerLabel="Add a new Brand"
            title="Add a new Brand"
            description="Add a new brand for the system."
            fields={[
              {
                id: "category",
                label: "Category",
                component: (
                  <Combobox
                    type="category"
                    placeholder="Select Category"
                    onChange={(val) => setSelectedCategory(val)}
                  />
                ),
                placeholder: "Smartphones",
                type: "text",
              },
              {
                id: "brand_name",
                label: "Brand Name",
                type: "text",
                placeholder: "Samsung Galaxy",
              },
            ]}
            onSubmit={saveBrands}
            closeButtonRef={closeButtonRef}
          />
        </div>
        <div className="flex mt-5">
          <AdminPopup
            triggerLabel="Add Categories"
            title="Add a new Category"
            description="Add a new category for the system."
            fields={[
              {
                id: "name",
                label: "Category Name",
                type: "text",
                placeholder: "Smartphones",
              },
              { id: "image", label: "Image", type: "file" },
            ]}
            onSubmit={handleAddCategory}
            closeButtonRef={closeButtonRef}
          />
        </div>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} role={"ADMIN"} />
      </SidebarFooter>
    </Sidebar>
  );
}
