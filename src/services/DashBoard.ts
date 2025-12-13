import api from "./api";

export const fetchAdminDashboardStats = async () => {
  const response = await api.get("auth/admin/dashboard-stats");
  return response.data.data;
};

export const fetchUserDashboardStats = async () => {
  const response = await api.get("/warranties/dashboard-stats");
  return response.data.data;
};
