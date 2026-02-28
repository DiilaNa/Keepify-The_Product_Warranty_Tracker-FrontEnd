import { toast } from "sonner";
import api from "./api";

export const saveWarrantyService = async (formData: FormData) => {
  const res = await api.post("/warranties/saveWarranty", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const loadWarrantiesService = async ({
  page,
  limit,
  search,
}: {
  page?: number;
  limit?: number;
  admin?: boolean;
  search?: string;
}) => {
  const url = "/warranties/loadwarranties";

  const res = await api.get(url, { params: { page, limit, search } });

  return {
    data: res.data.data,
    page: res.data.page,
    totalPages: res.data.totalPages,
  };
};

export const updateWarrantyService = async (id: string, formData: FormData) => {
  const res = await api.put(`/warranties/updateWarranty/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteWarrantyService = async (id: string) => {
  const res = await api.put(`/warranties/deleteWarranty/${id}`);
  return res.data;
};

export const getLineChartService = async () => {
  const res = await api.get("/warranties/warranties-overtime");
  return res.data;
};


export const handleDownloadReport = async () => {
  try {
    const response = await api.get(
      "/warranties/report",
      {
        responseType: "blob", 
      },
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" }),
    );
    const link = document.createElement("a");
    link.href = url;

    link.setAttribute("download", `Keepify_Report_${new Date().getTime()}.pdf`);

    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success("Report downloaded successfully");
  } catch (error) {
    console.error("Download error:", error);
    toast.error("Failed to generate report");
  }
};