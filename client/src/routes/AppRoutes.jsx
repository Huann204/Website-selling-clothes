import React from "react";
import { Routes, Route } from "react-router-dom";
import CartPage from "../components/CartPage";
import HomePage from "../pages/HomePage";
import CategoryPage from "../components/CategoryPage";
import ProductDetail from "../components/ProductDetail";
import { CartProvider } from "../context/CartContext";
import DefaultLayout from "../layouts/DefaultLayout";
const AppRoutes = () => {
  return (
    <>
      <CartProvider>
        <DefaultLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/detail/:slug" element={<ProductDetail />} />
          </Routes>
        </DefaultLayout>
      </CartProvider>
    </>
  );
};

export default AppRoutes;
