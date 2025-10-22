import React from "react";
import AdminLayout from "../components/Layout/AdminLayout";
import UnderDevelopment from "../components/UnderDevelopment";

const Analytics = () => {
  return (
    <AdminLayout
      title="Phân tích & Báo cáo"
      activeLabel="Phân tích"
      showBackButton={false}
      showSaveButton={false}
    >
      <UnderDevelopment title="Phân tích & Báo cáo" />
    </AdminLayout>
  );
};

export default Analytics;
