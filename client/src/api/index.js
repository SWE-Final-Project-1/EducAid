import axios from "axios";

export const api = axios.create({
  baseURL:
      false
      ? import.meta.env.VITE_API_URL_DEV
      : import.meta.env.VITE_API_URL_PROD,
  withCredentials: true,
});