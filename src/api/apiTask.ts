import axios from 'axios';

export const instanceUrlTaskApi = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`,
});
