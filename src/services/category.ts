import api from "./api";

export const saveCategoryService = async (formData: FormData) => {
  const res = await api.post("categories/saveCategory", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const loadCategoriesInComboBox = async() => {
  const res = await api.get("/categories/loadCategoriesInCombo");
  return res.data
}
