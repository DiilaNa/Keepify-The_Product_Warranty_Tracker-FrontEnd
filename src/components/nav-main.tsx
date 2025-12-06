import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
  unreadCount = 0,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
    onClick?: () => void;
    showUnread?: boolean;
  }[];
  unreadCount?: number;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2"></SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                onClick={item.onClick}
                className="relative flex items-center gap-2"
              >
                <div className="flex items-center justify-center gap-2">
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </div>
                {/* Show unread badge only for notifications */}
                {item.showUnread && unreadCount > 0 && (
                  <span className="flex items-center justify-center bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
