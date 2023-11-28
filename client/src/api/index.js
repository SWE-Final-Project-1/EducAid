import axios from "axios";

export const api = axios.create({
  baseURL:
    import.meta.env.MODE == "development"
      ? import.meta.env.VITE_API_URL_DEV
      : import.meta.env.VITE_API_URL_PROD,
  withCredentials: true,
});