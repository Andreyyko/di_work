import axios from "axios";
import { getJwt, clearJwt } from "./auth-api";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = getJwt();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      clearJwt();
      window.location.href = "/auth/sign-in";
    }
    return Promise.reject(err);
  }
);
