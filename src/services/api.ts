import axios, { AxiosError } from "axios";
import { refreshTokens } from "./auth";

const api = axios.create({
  baseURL:
        "https://keepify-the-product-warranty-tracke-lemon.vercel.app/api/v1",
      //  "http://localhost:5000/api/v1",
});

const PUBLIC_ENDPOINTS = ["/auth/register", "/auth/login", "/auth/google"];

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  const isPublic = PUBLIC_ENDPOINTS.some((some) => config.url?.includes(some));

  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err: AxiosError) => {
    const originalRequest: any = err.config;

    const isPublic = PUBLIC_ENDPOINTS.some((url) =>
      originalRequest.url?.includes(url)
    );

    if (err.response?.status === 401 && !isPublic && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No Refresh TOken Available");
        }

        const res = await refreshTokens(refreshToken);
        localStorage.setItem("accessToken", res.accessToken);

        originalRequest.headers.Authorization = `Bearer ${res.accessToken}`;
        return axios(originalRequest);
      } catch (err) {
        localStorage.clear();
        window.location.href = "/login";
        console.error(err);
        return Promise.reject(err);
      }
    }
    return Promise.reject(err);
  }
);
export default api;
