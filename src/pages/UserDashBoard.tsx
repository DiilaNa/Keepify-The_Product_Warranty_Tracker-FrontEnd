import { AppSidebar } from "@/components/app-sidebar";
import { WarrantyCard } from "@/components/custom/Posts";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import SearchAppBar from "@/components/ui/search";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/hooks/hook";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import {
  deleteWarrantyThunk,
  loadWarrantiesThunk,
  updateWarrantyThunk,
} from "@/slices/warranty/warrantyThunk";
import { searchPosts } from "@/slices/warranty/warrantySlice";
import Chatbot from "@/components/custom/ChatBot";

export default function UserDashBoard() {
  const dispatch = useAppDispatch();
  const { warranties, loadingWarranties, page, totalPages, search } =
    useAppSelector((state) => state.warranty);

  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    dispatch(loadWarrantiesThunk({ page, limit: 10, search }));
  }, [dispatch, page, search]);

  const handleEdit = async (id: string, formData: FormData) => {
    const result = await dispatch(updateWarrantyThunk({ id, formData }));
    if (updateWarrantyThunk.fulfilled.match(result)) {
      toast.success("Edited successfully");
      return true;
    } else {
      toast.error("Edit operation failed");
      return false;
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this warranty?"
    );
    if (!confirmDelete) {
      toast.error("Delete operation canceled");
      return false;
    }
    const result = await dispatch(deleteWarrantyThunk(id));
    if (deleteWarrantyThunk.fulfilled.match(result)) {
      toast.success("Warranty deleted successfully");
      return true;
    } else {
      toast.error("Failed to delete warranty");
      return false;
    }
  };

  const handleSearch = useCallback(
    (value: string) => {
      setLocalSearch(value);
      dispatch(searchPosts(value));
      dispatch(loadWarrantiesThunk({ page: 1, limit: 10, search: value }));
    },
    [dispatch]
  );

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />

              <div className="px-4 lg:px-6 flex flex-col flex-1">
                <SearchAppBar
                  placeholder="Search warranty by name or serial number…"
                  onSearch={handleSearch}
                />

                {/* Loading State */}
                {loadingWarranties && warranties.length === 0 && (
                  <div className="flex justify-center items-center w-full py-20">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          className="animate-pulse bg-gray-800 dark:bg-gray-700 h-60 rounded-xl"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Warranty Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {warranties.map((p: any) => (
                    <WarrantyCard
                      key={p._id}
                      id={p._id}
                      title={p.name}
                      image={
                        p.category?.image_url ||
                        "https://placehold.co/600x400?text=No+Category+Image"
                      }
                      billImage={p.bill_image}
                      description={p.description}
                      purchase_date={p.purchase_date}
                      expiry_date={p.expiry_date}
                      serial_number={p.serial_number}
                      status={p.status}
                      onEdit={(form) => handleEdit(p._id, form)}
                      onDelete={() => handleDelete(p._id)}
                    />
                  ))}
                </div>

                {/* Empty State */}
                {!loadingWarranties && warranties.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 w-full text-center">
                    <div className="bg-gray-900 rounded-3xl p-10 flex flex-col items-center justify-center shadow-xl border border-gray-800 max-w-sm mx-auto">
                      <div className="flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 animate-pulse">
                        <span className="text-4xl">😕</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        No posts found
                      </h3>
                      {localSearch ? (
                        <p className="text-gray-400 text-sm md:text-base mb-4">
                          We couldn’t find any posts matching "
                          <span className="text-blue-400">{localSearch}</span>".
                        </p>
                      ) : (
                        <p className="text-gray-400 text-sm md:text-base mb-4">
                          You haven’t added any warranties yet. Start adding
                          products to track your purchases and warranty expiries
                          here.
                        </p>
                      )}
                      <button
                        onClick={() =>
                          dispatch(
                            loadWarrantiesThunk({
                              page: 1,
                              limit: 10,
                              search: "",
                            })
                          )
                        }
                        className="mt-4 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition"
                      >
                        Show All Warranties
                      </button>
                    </div>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-6 gap-2">
                    <button
                      disabled={page === 1}
                      onClick={() =>
                        dispatch(
                          loadWarrantiesThunk({
                            page: page - 1,
                            limit: 10,
                            search: localSearch,
                          })
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
                              loadWarrantiesThunk({
                                page: pageNum,
                                limit: 10,
                                search: localSearch,
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
                          loadWarrantiesThunk({
                            page: page + 1,
                            limit: 10,
                            search: localSearch,
                          })
                        )
                      }
                      className="px-3 py-1.5 rounded-md text-sm text-gray-300 disabled:opacity-30 hover:bg-gray-700/40 transition"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      <Chatbot />
    </SidebarProvider>
  );
}
