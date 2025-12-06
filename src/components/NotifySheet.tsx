import * as React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
}

interface NotificationsSheetProps {
  ref: React.RefObject<HTMLButtonElement>;
  onUnreadChange?: (count: number) => void;
}

export const NotificationsSheet = React.forwardRef<
  HTMLButtonElement,
  NotificationsSheetProps
>(({ onUnreadChange }, ref) => {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "1",
      title: "Test Notification",
      message: "This is a test notification.",
      read: false,
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  // Update unread count for NavUser badge
  const unreadCount = notifications.filter((n) => !n.read).length;
  React.useEffect(() => {
    onUnreadChange?.(unreadCount);
  }, [unreadCount, onUnreadChange]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button ref={ref} className="hidden" />
      </SheetTrigger>

      <SheetContent side="right" className="w-80 bg-gray-900 text-gray-100">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            All your recent notifications. Mark as read to remove them.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-2 mt-4 overflow-y-auto max-h-[60vh]">
          {notifications.length === 0 && (
            <p className="text-gray-400">No notifications</p>
          )}
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`flex justify-between items-center p-3 rounded-lg transition ${
                n.read
                  ? "bg-gray-800 text-gray-500 line-through"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              <div>
                <p className="font-semibold">{n.title}</p>
                <p className="text-sm text-gray-200">{n.message}</p>
              </div>
              {!n.read && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => markAsRead(n.id)}
                >
                  Mark as read
                </Button>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
});
