import axios, { type AxiosInstance } from "axios";

const API_BASE_URL =
  import.meta.env.API_BASE_URL || "http://localhost:8000/api";

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 1000,
});

api.interceptors.request.use(
  (config) => {
    if (config.data && config.method != "get") {
      // if it is not get method then data sent will be in json format
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;
