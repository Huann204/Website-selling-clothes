import { useQuery } from "@tanstack/react-query";
import api from "@shared/lib/axios";

export const useOrdersData = (token) => {
  return useQuery({
    queryKey: ["orders", token],
    queryFn: async () => {
      const res = await api.get(`/api/admin/orders`);
      return res.data;
    },
    enabled: !!token,
  });
};
