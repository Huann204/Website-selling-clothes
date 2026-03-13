import axios from "axios";
import API_URL from "@/config";
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      if (window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
    }

    return Promise.reject(error);
  },
);
export default api;
