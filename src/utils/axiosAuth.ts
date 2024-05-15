import axios from 'axios';
import { getAuth } from 'firebase/auth';

// Create a new Axios instance
const axiosAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosAuth.interceptors.request.use(
  async (config) => {
    // Get the current user's token
    const token = await getAuth().currentUser?.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosAuth;
