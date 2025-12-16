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
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { fetchNotificationThunk, markNotificationReadThunk } from "@/slices/features/NotificationThunk";


export const NotificationsSheet = React.forwardRef<
  HTMLButtonElement
>((_, ref) => {
  const dispatch = useAppDispatch();

  const { notifications, loading } = useAppSelector(
    (state) => state.notifications
  );

  React.useEffect(() => {
    dispatch(fetchNotificationThunk());
  }, [dispatch]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button ref={ref} className="hidden" />
      </SheetTrigger>

      <SheetContent side="right" className="w-80 bg-gray-900 text-gray-100">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            Warranty expiry alerts and updates
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-2 mt-4 overflow-y-auto max-h-[60vh]">
          {loading && <p className="text-gray-400">Loading...</p>}

          {!loading && notifications.length === 0 && (
            <p className="text-gray-400">No notifications</p>
          )}

          {notifications.map((n) => (
            <div
              key={n._id}
              className={`flex justify-between items-center p-3 rounded-lg transition ml-4 mr-1 ${
                n.read
                  ? "bg-gray-800 text-gray-500"
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
                  onClick={() => dispatch(markNotificationReadThunk(n._id))}
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

