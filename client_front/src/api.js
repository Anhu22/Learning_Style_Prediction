// api.js
import axios from 'axios';

// Create an axios instance with the base URL
const API = axios.create({
  baseURL: 'http://localhost:5000', // Make sure this matches your backend port
});

// Register function
export const register = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login function
export const login = async (userData) => {
  try {
    const response = await API.post('/auth', userData); // Note: your login route is '/'
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default API;