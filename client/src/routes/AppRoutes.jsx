import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
const CartPage = lazy(() => import("../components/CartPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const CategoryPage = lazy(() => import("../components/CategoryPage"));
const ProductDetail = lazy(() => import("../components/ProductDetail"));
import { CartProvider } from "../context/CartContext";
import DefaultLayout from "../layouts/DefaultLayout";
const AppRoutes = () => {
  return (
    <>
      <CartProvider>
        <DefaultLayout>
          <Suspense
            fallback={<div className="py-10 text-center">Đang tải...</div>}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/detail/:slug" element={<ProductDetail />} />
              {/* Placeholder routes */}
              <Route
                path="/contact"
                element={<div className="py-10">Liên hệ (đang cập nhật)</div>}
              />
              {/* 404 */}
              <Route
                path="*"
                element={
                  <div className="py-10 text-center">Trang không tồn tại</div>
                }
              />
            </Routes>
          </Suspense>
        </DefaultLayout>
      </CartProvider>
    </>
  );
};

export default AppRoutes;
