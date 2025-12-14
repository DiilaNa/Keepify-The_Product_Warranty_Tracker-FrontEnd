import api from "./api"

export const saveWarrantyService = async(formData:FormData) => {
    const res = await api.post("/warranties/saveWarranty", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
}

export const loadWarrantiesService = async ({
  page,
  limit,
}: {
  page?: number;
  limit?: number;
  admin?: boolean;
}) => {
  const url = "/warranties/loadwarranties";

  const res = await api.get(url, { params: { page, limit } });
  
  return {
    data: res.data.data,
    page: res.data.page,
    totalPages: res.data.totalPages,
  };
};

export const updateWarrantyService = async(
  id:string,
  formData: FormData
) => {
  const res = await api.put(`/warranties/updateWarranty/${id}`,formData,{
    headers: {"Content-Type":"multipart/form-data"}
  });
  return res.data;
}

export const deleteWarrantyService = async (id: string) => {
  const res = await api.put(`/warranties/deleteWarranty/${id}`);
  return res.data;
};