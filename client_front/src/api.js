// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // same-origin relative base
  timeout: 15000,
  withCredentials: false,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export default api;
