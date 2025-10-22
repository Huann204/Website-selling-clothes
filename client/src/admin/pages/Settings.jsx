import React from "react";
import AdminLayout from "../components/Layout/AdminLayout";
import UnderDevelopment from "../components/UnderDevelopment";

const Settings = () => {
  return (
    <AdminLayout
      title="Cài đặt hệ thống"
      activeLabel="Cài đặt"
      showBackButton={false}
      showSaveButton={false}
    >
      <UnderDevelopment title="Cài đặt hệ thống" />
    </AdminLayout>
  );
};

export default Settings;
