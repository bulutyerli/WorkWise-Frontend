import axios from 'axios';
import { auth } from '../config/firebase-config';

// Create a new Axios instance
const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosAuth.interceptors.request.use(
  async (config) => {
    // Get the current user's token
    const token = await auth.currentUser?.getIdToken(true);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAuth;
