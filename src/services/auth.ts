import type { IRegistrationDataTypes } from "@/types/types";
import api from "./api";

export const registerUser = async (data: IRegistrationDataTypes) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  console.log("Regular login response:", res.data);
  return res.data;
};

export const refreshTokens = async (refreshToken: string) => {
  const res = await api.post("/auth/refresh", { token: refreshToken });
  return res.data;
};

export const registerAdmin = async (data: IRegistrationDataTypes) => {
  const res = await api.post("/auth/admin/register", data);
  return res.data;
};

export const loadUsersInTable = async ({
  page,
  limit,
  search,
}: {
  page: number;
  limit: number;
  search?: string;
}) => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());

  if (search) {
    params.append("search", search);
  }

  const res = await api.get(`/auth/admin/loadUsers?${params.toString()}`);
  return res.data;
};

export const loginUserGoogleService = async (credential: string) => {
  const res = await api.post("/auth/google", { credential });
  console.log("Google login response:", res.data);
  return res.data;
};
