import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API_URL from "@/config";

export const useOrdersData = (token) => {
  return useQuery({
    queryKey: ["orders", token],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    enabled: !!token,
  });
};
