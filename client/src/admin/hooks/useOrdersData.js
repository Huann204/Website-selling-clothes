import { useQuery } from "@tanstack/react-query";
import api from "@admin/utils/axios";

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
