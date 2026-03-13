import { useQuery } from "@tanstack/react-query";
import api from "@admin/utils/axios";

export const useOrdersData = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get(`/api/admin/orders`);
      return res.data;
    },
  });
};
