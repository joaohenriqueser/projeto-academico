import axios from "axios";
import { REST_CONFIG } from "../constant/sistema.constants";

export const http = axios.create({
  baseURL: REST_CONFIG.BASE_URL.replace(/\/$/, ""),
  timeout: 15000,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('@App:token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Opcional: logout automático em caso de 401
      // localStorage.removeItem('@App:token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
