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

              <div className="px-4 lg:px-6">
                <SearchAppBar
                  placeholder="Search warranty by name or serial number…"
                  onSearch={handleSearch}
                />

                {loadingWarranties && (
                  <p className="text-gray-500">Loading warranties...</p>
                )}

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
                      onEdit={(form) => handleEdit(p._id, form)}
                      onDelete={() => handleDelete(p._id)}
                    />
                  ))}

                  {!loadingWarranties && warranties.length === 0 && (
                    <p className="text-gray-400 text-sm mt-4">
                      No warranty posts found.
                    </p>
                  )}
                </div>

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
    </SidebarProvider>
  );
}
