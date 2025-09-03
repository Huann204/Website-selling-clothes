import React from "react";
import Header from "../components/Header";

const DefaultLayout = ({ children }) => {
  return (
    <div className="font-roboto">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default DefaultLayout;
