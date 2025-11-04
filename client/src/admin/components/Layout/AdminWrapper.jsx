import { Outlet } from "react-router-dom";
import { AuthProvider } from "@admin/context/AutContext";

function AdminWrapper() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
export default AdminWrapper;
