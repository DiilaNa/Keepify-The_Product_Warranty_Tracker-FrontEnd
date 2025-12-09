import api from "./api";

export type BrandsDataTypes = {
    category: string;
    brand_name:string;
}

export const saveBrands = async(data:BrandsDataTypes) => {
    const res = await api.post("brands/saveBrand",data);
    return res.data
}