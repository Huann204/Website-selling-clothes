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
    await new Promise((resolve) => setTimeout(resolve, 50));

    await queryClient.refetchQueries({ queryKey: ["admin-info"] });
  };

  const logout = async () => {
    await api.post("/api/admin/auth/logout", {}, { withCredentials: true });

    // clear cache
    queryClient.setQueryData(["admin-info"], null);
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
