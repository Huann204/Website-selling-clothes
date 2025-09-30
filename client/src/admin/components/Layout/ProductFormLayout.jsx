import React from "react";
import AdminLayout from "./AdminLayout";

export default function ProductFormLayout({
  children,
  title,
  onSave,
  loading = false,
  saveText = "Lưu sản phẩm",
  showBackButton = true,
  backTo = "/admin/products",
}) {
  return (
    <AdminLayout
      title={title}
      onSave={onSave}
      loading={loading}
      saveText={saveText}
      showBackButton={showBackButton}
      backTo={backTo}
      activeLabel="Sản phẩm"
    >
      {children}
    </AdminLayout>
  );
}
