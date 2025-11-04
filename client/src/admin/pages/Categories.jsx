import React from "react";
import AdminLayout from "@admin/components/Layout/AdminLayout";
import UnderDevelopment from "@admin/components/UnderDevelopment";

const Categories = () => {
  return (
    <AdminLayout
      title="Quản lý danh mục"
      activeLabel="Danh mục"
      showBackButton={false}
      showSaveButton={false}
    >
      <UnderDevelopment title="Quản lý danh mục" />
    </AdminLayout>
  );
};

export default Categories;
