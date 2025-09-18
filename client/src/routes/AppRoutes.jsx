import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import DefaultLayout from "../layouts/DefaultLayout";
import AdminProductsManagement from "../admin/components/AdminProductsManagement";
import AdminSidebar from "../admin/components/AdminSidebar";
import AdminProductCreate from "../admin/components/AdminProductCreate";
import Test from "../admin/components/test";
import AdminProductEdit from "../admin/components/AdminProductEdit";
const CartPage = lazy(() => import("../components/CartPage"));
const HomePage = lazy(() => import("../pages/HomePage"));
const CategoryPage = lazy(() => import("../components/CategoryPage"));
const ProductDetail = lazy(() => import("../components/ProductDetail"));
const CheckoutPage = lazy(() => import("../components/CheckoutPage"));

const AppRoutes = () => {
  return (
    <CartProvider>
      <Suspense fallback={<div className="py-10 text-center">Đang tải...</div>}>
        <Routes>
          {/* CLIENT ROUTES */}
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="category/:slug" element={<CategoryPage />} />
            <Route path="detail/:slugId" element={<ProductDetail />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route
              path="contact"
              element={<div className="py-10">Liên hệ (đang cập nhật)</div>}
            />
          </Route>

          {/* ADMIN ROUTES */}
          <Route>
            <Route path="/admin" element={<AdminSidebar />} />
          </Route>
          <Route path="/admin/products" element={<AdminProductsManagement />} />
          <Route
            path="/admin/products/create"
            element={<AdminProductCreate />}
          />
          <Route
            path="/admin/products/edit/:id"
            element={<AdminProductEdit />}
          />
          <Route path="/admin/test" element={<Test />} />
          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="py-10 text-center">Trang không tồn tại</div>
            }
          />
        </Routes>
      </Suspense>
    </CartProvider>
  );
};

export default AppRoutes;
