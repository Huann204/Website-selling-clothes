import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Forbidden from "../components/Forbidden";
import { AuthContext } from "../context/AuthContext";

// requiredRole: "admin" hoặc "superadmin"
export default function ProtectedRoute({ children, requiredRole }) {
  const { admin, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-600">Đang xác thực...</div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requiredRole && admin.role !== requiredRole) {
    return <Forbidden />;
  }

  return children;
}
