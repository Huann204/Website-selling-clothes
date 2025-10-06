import React from "react";
import { Link } from "react-router-dom";

export default function Forbidden() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-6xl font-bold text-red-500">403</div>
      <h1 className="mt-4 text-2xl font-semibold">Không có quyền truy cập</h1>
      <p className="mt-2 text-gray-600 max-w-md">
        Tài khoản của bạn không đủ quyền để vào trang này. Vui lòng liên hệ quản
        trị viên hoặc quay lại trang quản lý.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          to="/admin"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Về trang quản trị
        </Link>
        <Link
          to="/"
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}

