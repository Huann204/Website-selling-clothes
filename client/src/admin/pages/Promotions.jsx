import React from "react";
import AdminLayout from "@admin/components/Layout/AdminLayout";
import UnderDevelopment from "@admin/components/UnderDevelopment";

const Promotions = () => {
  return (
    <AdminLayout
      title="Quản lý khuyến mãi"
      activeLabel="Khuyến mãi"
      showBackButton={false}
      showSaveButton={false}
    >
      <UnderDevelopment title="Quản lý khuyến mãi" />
    </AdminLayout>
  );
};

export default Promotions;
