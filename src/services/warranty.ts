import api from "./api"

export const saveWarrantyService = async(formData:FormData) => {
    const res = await api.post("/warranties/saveWarranty", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
}