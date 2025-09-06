import React from "react";
import { Routes, Route } from "react-router-dom";
import CartPage from "../components/CartPage";
import HomePage from "../pages/HomePage";
import CategoryPage from "../components/CategoryPage";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category" element={<CategoryPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
