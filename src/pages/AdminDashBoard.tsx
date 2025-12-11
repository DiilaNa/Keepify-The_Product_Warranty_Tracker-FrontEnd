import { AdminAppSidebar } from "@/components/admin-app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import SearchAppBar from "@/components/ui/search";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { loadUserTableThunk } from "@/slices/auth/authThunk";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AdminDashBoard() {
  const dispatch = useAppDispatch();
  const { user, page, totalPages, loading } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(loadUserTableThunk({ page: 1, limit: 10 }));
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AdminAppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />

              <div className="px-4 lg:px-6">
                <SearchAppBar />

                <div className="w-full mt-6">
                  <div className="rounded-xl bg-white/5 dark:bg-gray-900/30 backdrop-blur border border-white/10 shadow-lg overflow-hidden">
                    {!loading && user.length === 0 && (
                      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-14 w-14 mb-4 opacity-60"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M5.121 17.804A13.937 13.937 0 0112 16c2.49 0 4.817.64 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <p className="text-lg font-medium">
                          No registered users found
                        </p>
                        <p className="text-sm opacity-70 mt-1">
                          Users will appear here once they sign up.
                        </p>
                      </div>
                    )}

                    {user.length > 0 && (
                      <div className="max-h-[600px] overflow-y-auto">
                        <Table className="w-full">
                          <TableHeader className="sticky top-0 bg-gray-100/80 dark:bg-gray-800/70 backdrop-blur">
                            <TableRow>
                              <TableHead className="py-4 px-4 font-semibold">
                                First Name
                              </TableHead>
                              <TableHead className="py-4 px-4 font-semibold">
                                Last Name
                              </TableHead>
                              <TableHead className="py-4 px-4 font-semibold">
                                Email
                              </TableHead>
                              <TableHead className="py-4 px-4 font-semibold">
                                Role
                              </TableHead>
                              <TableHead className="py-4 px-4 font-semibold text-right">
                                Joined
                              </TableHead>
                            </TableRow>
                          </TableHeader>

                          <TableBody>
                            {loading && (
                              <TableRow>
                                <TableCell
                                  colSpan={4}
                                  className="py-6 text-center text-gray-400"
                                >
                                  Loading...
                                </TableCell>
                              </TableRow>
                            )}

                            {!loading &&
                              user.map((u: any) => (
                                <TableRow
                                  key={u._id}
                                  className="hover:bg-gray-100/40 dark:hover:bg-gray-800/60 transition cursor-pointer"
                                >
                                  <TableCell className="py-4 px-4 font-medium">
                                    {u.firstname}
                                  </TableCell>

                                  <TableCell className="py-4 px-4 font-medium">
                                    {u.lastname}
                                  </TableCell>

                                  <TableCell className="py-4 px-4">
                                    {u.email}
                                  </TableCell>

                                  <TableCell className="py-4 px-4">
                                    <span className="px-3 py-1 rounded-lg text-sm font-medium bg-blue-500/20 text-blue-400 dark:bg-blue-600/30 dark:text-blue-300">
                                      {u.role}
                                    </span>
                                  </TableCell>

                                  <TableCell className="py-4 px-4 text-right">
                                    {new Date(u.createdAt).toLocaleDateString()}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>

                  {user.length > 0 && (
                    <div className="flex justify-center mt-8">
                      <div className="flex items-center gap-2 bg-white/5 dark:bg-gray-900/30 backdrop-blur px-4 py-2 rounded-lg border border-white/10 shadow-lg">
                        <button
                          disabled={page === 1}
                          onClick={() =>
                            dispatch(
                              loadUserTableThunk({ page: page - 1, limit: 10 })
                            )
                          }
                          className="px-3 py-1.5 rounded-md text-sm text-gray-300 disabled:opacity-30 hover:bg-gray-700/40 transition"
                        >
                          Prev
                        </button>

                        {[...Array(totalPages)].map((_, i) => {
                          const pageNum = i + 1;
                          return (
                            <button
                              key={pageNum}
                              onClick={() =>
                                dispatch(
                                  loadUserTableThunk({
                                    page: pageNum,
                                    limit: 10,
                                  })
                                )
                              }
                              className={`px-3 py-1.5 rounded-md text-sm transition ${
                                page === pageNum
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-300 hover:bg-gray-700/40"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        <button
                          disabled={page === totalPages}
                          onClick={() =>
                            dispatch(
                              loadUserTableThunk({ page: page + 1, limit: 10 })
                            )
                          }
                          className="px-3 py-1.5 rounded-md text-sm text-gray-300 disabled:opacity-30 hover:bg-gray-700/40 transition"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
