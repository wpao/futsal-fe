import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:2000",
  // baseURL: "https://futsal.authenticrinjani.com",
  baseURL: "http://localhost:3000",
});

// Interceptor untuk menambahkan token JWT ke header
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;