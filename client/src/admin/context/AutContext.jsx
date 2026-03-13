import api from "@admin/utils/axios";
import { AuthContext } from "@admin/context/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const { data: admin, isLoading } = useQuery({
    queryKey: ["admin-info"],
    queryFn: async () => {
      const res = await api.get("/api/admin/auth/info");
      return res.data;
    },
    retry: false,
    staleTime: Infinity,
  });

  const login = async (email, password) => {
    await api.post(
      "/api/admin/auth/login",
      { email, password },
      { withCredentials: true },
    );

    // refetch admin
    await queryClient.invalidateQueries(["admin-info"]);
  };

  const logout = async () => {
    await api.post("/api/admin/auth/logout", {}, { withCredentials: true });

    // clear cache
    queryClient.removeQueries(["admin-info"]);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading: isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
