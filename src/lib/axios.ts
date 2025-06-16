import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:2000",
  // baseURL: "https://futsal.authenticrinjani.com",
  baseURL: "http://localhost:3000",
  // baseURL: "http://futsal-backend:3000",
  // baseURL: "http://192.168.1.4:3000",
  // baseURL: "/api", // Gunakan proxy di Nginx
});

// Interceptor untuk menambahkan token JWT ke header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
