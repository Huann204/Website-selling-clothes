import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "@admin/context/AuthContext";

export default function GuestRoute({ children }) {
  const { admin, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-600">Đang xác thực...</div>
    );
  }

  if (admin) {
    // Nếu đã login thì không cho vào login/register nữa
    return <Navigate to="/admin" replace />;
  }

  return children;
}
