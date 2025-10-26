// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "", 
  // OR use process.env.REACT_APP_API_BASE_URL if using CRA
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
