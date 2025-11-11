import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
// Shared
import { CartProvider } from "@cart/context/CartContext";
import NotFound from "@shared/components/NotFound";

// Layouts
import DefaultLayout from "@layouts/DefaultLayout";

// Admin Components
import AdminProductsManagement from "@admin/components/products/ProductsManagement";
import AdminProductCreate from "@admin/components/products/ProductCreate";
import AdminProductEdit from "@admin/components/products/ProductEdit";
import OrderManagement from "@admin/components/orders/OrderManagement";
import OrderDetail from "@admin/components/orders/OrderDetail";
import ManageAdmins from "@admin/components/admins/ManageAdmins";
import AdminWrapper from "@admin/components/layout/AdminWrapper";
import ProtectedRoute from "@admin/ProtectedRoute/ProtectedRoute";
import GuestRoute from "@admin/components/GuestRoute/GuestRoute";

// Admin Pages
import AdminLogin from "@admin/pages/AdminLogin";
import AdminRegister from "@admin/pages/AdminRegister";
import Dashboard from "@admin/pages/Dashboard";
import Categories from "@admin/pages/Categories";
import Promotions from "@admin/pages/Promotions";
import Settings from "@admin/pages/Settings";
import Messages from "@admin/pages/Messages";

// Customer Feature Pages
import OrderSuccessPage from "@checkout/pages/OrderSuccessPage";
import OrderFailedPage from "@checkout/pages/OrderFailedPage";
import SearchResultsPage from "@products/pages/SearchResultsPage";
import TrackingPage from "@tracking/pages/TrackingPage";

// Lazy loaded pages
const CartPage = lazy(() => import("@cart/components/CartPage"));
const HomePage = lazy(() => import("@home/pages/HomePage"));
const CategoryPage = lazy(() => import("@products/pages/CategoryPage"));
const ProductDetail = lazy(() => import("@products/pages/ProductDetailPage"));
const CheckoutPage = lazy(() => import("@checkout/pages/CheckoutPage"));
const ContactPage = lazy(() => import("@home/pages/ContactPage"));

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
            <Route path="order-failed/:orderId" element={<OrderFailedPage />} />
            <Route path="tracking" element={<TrackingPage />} />
            <Route path="contact" element={<ContactPage />} />
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
                  <Dashboard />
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
            <Route
              path="categories"
              element={
                <ProtectedRoute>
                  <Categories />
                </ProtectedRoute>
              }
            />

            <Route
              path="promotions"
              element={
                <ProtectedRoute>
                  <Promotions />
                </ProtectedRoute>
              }
            />

            <Route
              path="settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="messages"
              element={
                <ProtectedRoute>
                  <Messages />
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
