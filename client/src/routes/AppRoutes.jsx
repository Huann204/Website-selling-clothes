import React from "react";
import { Routes, Route } from "react-router-dom";
import CartPage from "../components/CartPage";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
