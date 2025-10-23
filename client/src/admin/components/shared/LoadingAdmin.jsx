import React from "react";

const LoadingAdmin = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900 mx-auto mb-4"></div>
        <p className="text-slate-600">Đang tải danh sách sản phẩm...</p>
      </div>
    </div>
  );
};

export default LoadingAdmin;
