import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // backend
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const register = async (userData) => {
  const res = await API.post('/api/auth/register', userData);
  return res.data;
};

export const login = async (userData) => {
  const res = await API.post('/api/auth', userData);
  return res.data;
};

export default API;
