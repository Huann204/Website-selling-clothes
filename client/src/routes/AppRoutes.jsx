import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import DefaultLayout from "../layouts/DefaultLayout";
import AdminProductsManagement from "../admin/components/AdminProductsManagement";
import AdminSidebar from "../admin/components/AdminSidebar";
import AdminProductCreate from "../admin/components/AdminProductCreate";
// import Test from "../admin/components/test";
import AdminProductEdit from "../admin/components/AdminProductEdit";
import NotFound from "../shared/NotFound";
import OrderManagement from "../admin/components/OrderManagement";
import OrderDetail from "../admin/components/OrderDetail";
import AdminLogin from "../admin/pages/AdminLogin";
import AdminRegister from "../admin/pages/AdminRegister";
import AdminWrapper from "../admin/components/Layout/AdminWrapper";
import ProtectedRoute from "../admin/ProtectedRoute/ProtectedRoute";
import ManageAdmins from "../admin/components/ManageAdmins";
import GuestRoute from "../admin/components/GuestRoute/GuestRoute";
import OrderSuccessPage from "../components/OrderSuccessPage";
import SearchResultsPage from "../components/SearchResultsPage";
import TrackingPage from "../components/TrackingPage";
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
              path="order-success/:orderId"
              element={<OrderSuccessPage />}
            />
            <Route path="tracking" element={<TrackingPage />} />
            <Route
              path="contact"
              element={<div className="py-10">Liên hệ (đang cập nhật)</div>}
            />
            <Route path="*" element={<NotFound />} />
            <Route path="search" element={<SearchResultsPage />} />
          </Route>

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<AdminWrapper />}>
            <Route
              path="login"
              element={
                <GuestRoute>
                  <AdminLogin />
                </GuestRoute>
              }
            />
            <Route
              path="register"
              element={
                <GuestRoute>
                  <AdminRegister />
                </GuestRoute>
              }
            />
            <Route
              index
              element={
                <ProtectedRoute>
                  <AdminSidebar />
                </ProtectedRoute>
              }
            />
            <Route
              path="products"
              element={
                <ProtectedRoute>
                  <AdminProductsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="products/create"
              element={
                <ProtectedRoute>
                  <AdminProductCreate />
                </ProtectedRoute>
              }
            />
            <Route
              path="products/edit/:id"
              element={
                <ProtectedRoute>
                  <AdminProductEdit />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute>
                  <OrderManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="orderDetail/:id"
              element={
                <ProtectedRoute>
                  <OrderDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-admins"
              element={
                <ProtectedRoute requiredRole="superadmin">
                  <ManageAdmins />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* <Route path="/admin/test" element={<Test />} /> */}
          {/* 404 */}
        </Routes>
      </Suspense>
    </CartProvider>
  );
};

export default AppRoutes;
