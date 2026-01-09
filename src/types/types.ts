export interface LineChartItem {
  year: number;
  month: number;
  total: number;
}

export interface IAnnouncement {
  _id: string;
  title: string;
  description: string;
  status: "PUBLISHED" | "UNPUBLISHED";
  createdAt: string;
  updatedAt?: string;
  img_url: string;
  ownerId: string;
  category: {
    _id: string;
    name: string;
  };
}


export type IRegistrationDataTypes = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
};

export type IBrandsDataTypes = {
  category: string;
  brand_name: string;
};

export interface ICategory {
  _id: string;
  name: string;
  image_url: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN"; 
  approved: "ACTIVE" | "PENDING" | "REJECTED";
  createdAt: string;
  updatedAt?: string;
}

export interface IWarranty {
  _id: string;
  name: string;
  purchase_date: string;
  expiry_date: string;
  description?: string;
  serial_number: string;
  bill_image: string;
  status: "ACTIVE" | "EXPIRED" | "CANCELLED";
  ownerId: string;
  category: string;
  brandId: string;
  createdAt: string;
  updatedAt?: string;
}
