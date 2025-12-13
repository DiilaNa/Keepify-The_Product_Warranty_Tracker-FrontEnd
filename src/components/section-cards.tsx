import { useEffect } from "react";
import {
  IconUsers,
  IconCategory,
  IconBuildingStore,
  IconSpeakerphone,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { loadAdminDashboardStats } from "@/slices/features/adminDashBoardSlice";


export function SectionCards() {
  const dispatch = useAppDispatch();
  const { stats, loading } = useAppSelector((state) => state.adminDashBoard);

  const isAdmin = localStorage.getItem("role")  

  useEffect(() => {
    if (isAdmin) {
      dispatch(loadAdminDashboardStats());
    }
  }, [dispatch, isAdmin]);

  if (!isAdmin || loading || !stats) return null;

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 2xl:grid-cols-4">
      {/* USERS */}
      <Card>
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-3xl font-semibold">
            {stats.users.totalUsers}
          </CardTitle>
          <CardAction>
            <IconUsers className="text-muted-foreground" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex flex-col items-start text-sm gap-1">
          <span>Admins: {stats.users.totalAdmins}</span>
          <span>Users: {stats.users.totalNormalUsers}</span>
        </CardFooter>
      </Card>

      {/* CATEGORIES */}
      <Card>
        <CardHeader>
          <CardDescription>Categories</CardDescription>
          <CardTitle className="text-3xl font-semibold">
            {stats.categories.totalCategories}
          </CardTitle>
          <CardAction>
            <IconCategory className="text-muted-foreground" />
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Total active categories
        </CardFooter>
      </Card>

      {/* BRANDS */}
      <Card>
        <CardHeader>
          <CardDescription>Brands</CardDescription>
          <CardTitle className="text-3xl font-semibold">
            {stats.brands.totalBrands}
          </CardTitle>
          <CardAction>
            <IconBuildingStore className="text-muted-foreground" />
          </CardAction>
        </CardHeader>
        <CardFooter className="text-sm text-muted-foreground">
          Registered brands
        </CardFooter>
      </Card>

      {/* ANNOUNCEMENTS */}
      <Card>
        <CardHeader>
          <CardDescription>Announcements</CardDescription>
          <CardTitle className="text-3xl font-semibold">
            {stats.announcements.totalAnnouncements}
          </CardTitle>
          <CardAction>
            <IconSpeakerphone className="text-muted-foreground" />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex flex-col items-start text-sm gap-1">
          <Badge variant="outline">
            Published: {stats.announcements.publishedAnnouncements}
          </Badge>
          <Badge variant="secondary">
            Unpublished: {stats.announcements.unpublishedAnnouncements}
          </Badge>
        </CardFooter>
      </Card>
    </div>
  );
}
