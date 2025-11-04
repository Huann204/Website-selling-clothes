import React from "react";
import AdminLayout from "@admin/components/Layout/AdminLayout";
import UnderDevelopment from "@admin/components/UnderDevelopment";

const Customers = () => {
  return (
    <AdminLayout
      title="Quản lý khách hàng"
      activeLabel="Khách hàng"
      showBackButton={false}
      showSaveButton={false}
    >
      <UnderDevelopment title="Quản lý khách hàng" />
    </AdminLayout>
  );
};

export default Customers;
