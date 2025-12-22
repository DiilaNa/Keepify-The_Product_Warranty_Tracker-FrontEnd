import {
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { AdminPopup } from "./custom/PopUps";
import { useRef } from "react";
import { NotificationsSheet } from "./NotifySheet";
import React from "react";
import { useNavigate } from "react-router-dom";
import { registerAdminThunk } from "@/slices/auth/authThunk";
import { useAppDispatch } from "@/hooks/hook";
import { toast } from "sonner";

export function NavUser({
  user,
  role,
}: {
  user: {
    name: string;
    email: string;
    avatarFallback: string;
  };
  role: "ADMIN" | "USER";
}) {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const isAdmin = role === "ADMIN";
  const adminPopupRef = useRef<HTMLButtonElement>(null);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const notifyPopupRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem(role);
    localStorage.clear();

    navigate("/login");
  };

  const handliAdminLogin = async (formData: any) => {
    const firstname = formData.get("firstname") as string;
    const lastname = formData.get("lastname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirm = formData.get("confirm") as string;

    if (!firstname || !lastname || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match");
      return;
    }

    const result = await dispatch(
      registerAdminThunk({
        firstname,
        lastname,
        email,
        password,
        role: "ADMIN",
      })
    );

    if (registerAdminThunk.fulfilled.match(result)) {
      toast.success("Admin user created successfully");
      adminPopupRef.current?.click();
    } else {
      toast.error("Failed to register admin");
    }
  };

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg font-semibold">
                    {user.avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
                <IconDotsVertical className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg font-semibold">
                      {user.avatarFallback}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconUserCircle />
                  Account
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem
                    onClick={() => adminPopupRef.current?.click()}
                  >
                    <IconUserCircle />
                    Add Admin User
                  </DropdownMenuItem>
                )}

                {!isAdmin && (
                  <DropdownMenuItem
                    onClick={() => notifyPopupRef.current?.click()}
                    className="relative flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <IconNotification />
                      Notifications
                    </div>
                    {unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-1 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <IconLogout />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <NotificationsSheet
        ref={notifyPopupRef}
        onUnreadChange={setUnreadCount}
      />

      {isAdmin && (
        <AdminPopup
          ref={adminPopupRef} // Attach the ref here
          hideTrigger={true}
          triggerLabel="Add Admin User"
          title="Register Admin User"
          description="Create a new administrator account."
          fields={[
            {
              id: "firstname",
              label: "First Name",
              type: "text",
              placeholder: "Kasun",
            },
            {
              id: "lastname",
              label: "Last Name",
              type: "text",
              placeholder: "Fernando",
            },
            {
              id: "email",
              label: "Email",
              type: "email",
              placeholder: "admin@example.com",
            },
            {
              id: "password",
              label: "Password",
              type: "password",
              placeholder: "********",
            },
            {
              id: "confirm",
              label: "Confirm Password",
              type: "password",
              placeholder: "********",
            },
          ]}
          onSubmit={handliAdminLogin}
        />
      )}
    </>
  );
}
