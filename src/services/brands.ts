import type { IBrandsDataTypes } from "@/types/types";
import api from "./api";



export const saveBrandsService = async (data: IBrandsDataTypes) => {
  const res = await api.post("brands/saveBrand", data);
  return res.data;
};

export const loadBrandsByCategory = async (categoryId: string) => {
  return api.get(`/brands/loadBrandsInCombo/${categoryId}`);
};

export const getBarChartService = async() => {
  const res = await api.get("/brands/top-brands");
  return res.data
}
