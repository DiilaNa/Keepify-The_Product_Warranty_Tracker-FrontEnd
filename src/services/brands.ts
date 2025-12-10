import api from "./api";

export type BrandsDataTypes = {
  category: string;
  brand_name: string;
};

export const saveBrandsService = async (data: BrandsDataTypes) => {
  const res = await api.post("brands/saveBrand", data);
  return res.data;
};

export const loadBrandsByCategory = async (categoryId: string) => {
  return api.get(`/brands/loadBrandsInCombo/${categoryId}`);
};
