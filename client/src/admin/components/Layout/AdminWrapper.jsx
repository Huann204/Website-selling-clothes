import { Outlet } from "react-router-dom";
import { AuthProvider } from "../../context/AutContext";

function AdminWrapper() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
export default AdminWrapper;
