// import { useEffect } from "react";
// import {
//   IconUsers,
//   IconCategory,
//   IconBuildingStore,
//   IconSpeakerphone,
//   IconShieldCheck,
//   IconClock,
//   IconAlertTriangle,
//   IconFileText,
// } from "@tabler/icons-react";

// import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// import { useAppDispatch, useAppSelector } from "@/hooks/hook";
// import { loadAdminDashboardStats } from "@/slices/features/adminDashBoardSlice";
// import { loadUserDashboardStats } from "@/slices/features/userDashBoardSlice";

// export function SectionCards() {
//   const dispatch = useAppDispatch();
//   const role = localStorage.getItem("role");

//   const adminState = useAppSelector((state) => state.adminDashBoard);
//   const userState = useAppSelector((state) => state.userDashBoard);

//   useEffect(() => {
//     if (role === "ADMIN") {
//       dispatch(loadAdminDashboardStats());
//     } else {
//       dispatch(loadUserDashboardStats());
//     }
//   }, [dispatch, role]);

//   /* ================= SHARED STYLES ================= */

//   const Grid = ({ children }: { children: React.ReactNode }) => (
//     <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 xl:grid-cols-4">
//       {children}
//     </div>
//   );

//   const cardBase =
//     "group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10";

//   const glowLine =
//     "absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition";

//   const headerBase = "flex items-start justify-between gap-4";
//   const label = "text-sm text-muted-foreground";
//   const metric = "mt-1 text-4xl font-bold tracking-tight";

//   const iconBox =
//     "flex h-11 w-11 items-center justify-center rounded-xl bg-muted/40 text-primary ring-1 ring-border transition-all duration-300 group-hover:scale-110 group-hover:ring-primary/40";

//   const footerBase =
//     "mt-5 flex items-center gap-2 text-xs text-muted-foreground";

//   /* ================= ADMIN ================= */

//   if (role === "ADMIN") {
//     const { stats, loading } = adminState;
//     if (loading || !stats) return null;

//     return (
//       <Grid>
//         <Card className={cardBase}>
//           <div className={glowLine} />
//           <CardHeader className={headerBase}>
//             <div>
//               <p className={label}>Total Users</p>
//               <CardTitle className={metric}>{stats.users.totalUsers}</CardTitle>
//             </div>
//             <div className={iconBox}>
//               <IconUsers size={20} />
//             </div>
//           </CardHeader>
//           <CardFooter className={footerBase}>
//             <span>{stats.users.totalAdmins} Admins</span>
//             <span>•</span>
//             <span>{stats.users.totalNormalUsers} Users</span>
//           </CardFooter>
//         </Card>

//         <Card className={cardBase}>
//           <div className={glowLine} />
//           <CardHeader className={headerBase}>
//             <div>
//               <p className={label}>Categories</p>
//               <CardTitle className={metric}>
//                 {stats.categories.totalCategories}
//               </CardTitle>
//             </div>
//             <div className={iconBox}>
//               <IconCategory size={20} />
//             </div>
//           </CardHeader>
//           <CardFooter className={footerBase}>
//             Active product categories
//           </CardFooter>
//         </Card>

//         <Card className={cardBase}>
//           <div className={glowLine} />
//           <CardHeader className={headerBase}>
//             <div>
//               <p className={label}>Brands</p>
//               <CardTitle className={metric}>
//                 {stats.brands.totalBrands}
//               </CardTitle>
//             </div>
//             <div className={iconBox}>
//               <IconBuildingStore size={20} />
//             </div>
//           </CardHeader>
//           <CardFooter className={footerBase}>
//             Registered partner brands
//           </CardFooter>
//         </Card>

//         <Card className={cardBase}>
//           <div className={glowLine} />
//           <CardHeader className={headerBase}>
//             <div>
//               <p className={label}>Announcements</p>
//               <CardTitle className={metric}>
//                 {stats.announcements.totalAnnouncements}
//               </CardTitle>
//             </div>
//             <div className={iconBox}>
//               <IconSpeakerphone size={20} />
//             </div>
//           </CardHeader>
//           <CardFooter className={footerBase}>
//             <span>{stats.announcements.publishedAnnouncements} Published</span>
//             <span>•</span>
//             <span>{stats.announcements.unpublishedAnnouncements} Draft</span>
//           </CardFooter>
//         </Card>
//       </Grid>
//     );
//   }

//   /* ================= USER ================= */

//   const { stats, loading } = userState;
//   if (loading || !stats) return null;

//   return (
//     <Grid>
//       <Card className={cardBase}>
//         <div className={glowLine} />
//         <CardHeader className={headerBase}>
//           <div>
//             <p className={label}>Total Warranties</p>
//             <CardTitle className={metric}>{stats.totalWarranties}</CardTitle>
//           </div>
//           <div className={iconBox}>
//             <IconFileText size={20} />
//           </div>
//         </CardHeader>
//         <CardFooter className={footerBase}>
//           All warranties you’ve added
//         </CardFooter>
//       </Card>

//       <Card className={cardBase}>
//         <div className={glowLine} />
//         <CardHeader className={headerBase}>
//           <div>
//             <p className={label}>Expiring This Month</p>
//             <CardTitle className={metric}>{stats.expiringThisMonth}</CardTitle>
//           </div>
//           <div className={iconBox}>
//             <IconClock size={20} />
//           </div>
//         </CardHeader>
//         <CardFooter className={footerBase}>Requires attention soon</CardFooter>
//       </Card>

//       <Card className={cardBase}>
//         <div className={glowLine} />
//         <CardHeader className={headerBase}>
//           <div>
//             <p className={label}>Next 7 Days</p>
//             <CardTitle className={metric}>{stats.expiringNext7Days}</CardTitle>
//           </div>
//           <div className={iconBox}>
//             <IconAlertTriangle size={20} />
//           </div>
//         </CardHeader>
//         <CardFooter className={footerBase}>High-priority renewals</CardFooter>
//       </Card>

//       <Card className={cardBase}>
//         <div className={glowLine} />
//         <CardHeader className={headerBase}>
//           <div>
//             <p className={label}>Already Expired</p>
//             <CardTitle className={metric}>{stats.alreadyExpired}</CardTitle>
//           </div>
//           <div className={iconBox}>
//             <IconShieldCheck size={20} />
//           </div>
//         </CardHeader>
//         <CardFooter className={footerBase}>Coverage ended</CardFooter>
//       </Card>
//     </Grid>
//   );
// }

import { useEffect } from "react";
import {
  IconUsers,
  IconCategory,
  IconBuildingStore,
  IconSpeakerphone,
  IconShieldCheck,
  IconClock,
  IconAlertTriangle,
  IconFileText,
} from "@tabler/icons-react";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { loadAdminDashboardStats } from "@/slices/features/adminDashBoardSlice";
import { loadUserDashboardStats } from "@/slices/features/userDashBoardSlice";

export function SectionCards() {
  const dispatch = useAppDispatch();
  const role = localStorage.getItem("role");

  const adminState = useAppSelector((state) => state.adminDashBoard);
  const userState = useAppSelector((state) => state.userDashBoard);

  useEffect(() => {
    if (role === "ADMIN") {
      dispatch(loadAdminDashboardStats());
    } else {
      dispatch(loadUserDashboardStats());
    }
  }, [dispatch, role]);

  /* ================== SHARED STYLES ================== */

  const Grid = ({ children }: { children: React.ReactNode }) => (
    <div className="grid grid-cols-1 gap-5 px-4 sm:grid-cols-2 xl:grid-cols-4">
      {children}
    </div>
  );

  const cardBase =
    "group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10";

  const glowLine =
    "absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition";

  const headerLayout = "flex items-start justify-between gap-4";

  const iconWrap =
    "flex h-11 w-11 items-center justify-center rounded-xl bg-muted/40 text-primary ring-1 ring-border transition-all duration-300 group-hover:scale-110 group-hover:ring-primary/50";

  const metric = "text-4xl font-bold tracking-tight leading-none mt-1";

  const footerText = "flex flex-wrap gap-2 text-xs text-muted-foreground";

  /* ================= ADMIN ================= */
  if (role === "ADMIN") {
    const { stats, loading } = adminState;
    if (loading || !stats) return null;

    return (
      <Grid>
        {/* Total Users */}
        <Card className={cardBase}>
          <div className={glowLine} />
          <CardHeader className={headerLayout}>
            <div>
              <CardDescription>Total Users</CardDescription>
              <CardTitle className={metric}>{stats.users.totalUsers}</CardTitle>
            </div>
            <CardAction className={iconWrap}>
              <IconUsers size={20} />
            </CardAction>
          </CardHeader>
          <CardFooter className={footerText}>
            <Badge variant="secondary">{stats.users.totalAdmins} Admins</Badge>
            <Badge variant="outline">
              {stats.users.totalNormalUsers} Users
            </Badge>
          </CardFooter>
        </Card>

        {/* Categories */}
        <Card className={cardBase}>
          <div className={glowLine} />
          <CardHeader className={headerLayout}>
            <div>
              <CardDescription>Categories</CardDescription>
              <CardTitle className={metric}>
                {stats.categories.totalCategories}
              </CardTitle>
            </div>
            <CardAction className={iconWrap}>
              <IconCategory size={20} />
            </CardAction>
          </CardHeader>
          <CardFooter className={footerText}>
            <span>Active product categories</span>
          </CardFooter>
        </Card>

        {/* Brands */}
        <Card className={cardBase}>
          <div className={glowLine} />
          <CardHeader className={headerLayout}>
            <div>
              <CardDescription>Brands</CardDescription>
              <CardTitle className={metric}>
                {stats.brands.totalBrands}
              </CardTitle>
            </div>
            <CardAction className={iconWrap}>
              <IconBuildingStore size={20} />
            </CardAction>
          </CardHeader>
          <CardFooter className={footerText}>
            <span>Registered vendors & brands</span>
          </CardFooter>
        </Card>

        {/* Announcements */}
        <Card className={cardBase}>
          <div className={glowLine} />
          <CardHeader className={headerLayout}>
            <div>
              <CardDescription>Announcements</CardDescription>
              <CardTitle className={metric}>
                {stats.announcements.totalAnnouncements}
              </CardTitle>
            </div>
            <CardAction className={iconWrap}>
              <IconSpeakerphone size={20} />
            </CardAction>
          </CardHeader>
          <CardFooter className={footerText}>
            <Badge className="bg-emerald-500/15 text-emerald-400">
              {stats.announcements.publishedAnnouncements} Live
            </Badge>
            <Badge variant="outline">
              {stats.announcements.unpublishedAnnouncements} Draft
            </Badge>
          </CardFooter>
        </Card>
      </Grid>
    );
  }

  /* ================= USER ================= */
  const { stats, loading } = userState;
  if (loading || !stats) return null;

  return (
    <Grid>
      {/* Total Warranties */}
      <Card className={cardBase}>
        <div className={glowLine} />
        <CardHeader className={headerLayout}>
          <div>
            <CardDescription>Total Warranties</CardDescription>
            <CardTitle className={metric}>{stats.totalWarranties}</CardTitle>
          </div>
          <CardAction className={iconWrap}>
            <IconFileText size={20} />
          </CardAction>
        </CardHeader>
        <CardFooter className={footerText}>
          <span>All warranties you’ve added</span>
        </CardFooter>
      </Card>

      {/* Expiring This Month */}
      <Card className={cardBase}>
        <div className={glowLine} />
        <CardHeader className={headerLayout}>
          <div>
            <CardDescription>Expiring This Month</CardDescription>
            <CardTitle className={metric}>{stats.expiringThisMonth}</CardTitle>
          </div>
          <CardAction className={iconWrap}>
            <IconClock size={20} />
          </CardAction>
        </CardHeader>
        <CardFooter className={footerText}>
          <Badge className="bg-yellow-500/15 text-yellow-400">
            Needs attention
          </Badge>
        </CardFooter>
      </Card>

      {/* Next 7 Days */}
      <Card className={cardBase}>
        <div className={glowLine} />
        <CardHeader className={headerLayout}>
          <div>
            <CardDescription>Next 7 Days</CardDescription>
            <CardTitle className={metric}>{stats.expiringNext7Days}</CardTitle>
          </div>
          <CardAction className={iconWrap}>
            <IconAlertTriangle size={20} />
          </CardAction>
        </CardHeader>
        <CardFooter className={footerText}>
          <Badge className="bg-red-500/15 text-red-400">Urgent renewals</Badge>
        </CardFooter>
      </Card>

      {/* Already Expired */}
      <Card className={cardBase}>
        <div className={glowLine} />
        <CardHeader className={headerLayout}>
          <div>
            <CardDescription>Already Expired</CardDescription>
            <CardTitle className={metric}>{stats.alreadyExpired}</CardTitle>
          </div>
          <CardAction className={iconWrap}>
            <IconShieldCheck size={20} />
          </CardAction>
        </CardHeader>
        <CardFooter className={footerText}>
          <span>No longer covered</span>
        </CardFooter>
      </Card>
    </Grid>
  );
}

