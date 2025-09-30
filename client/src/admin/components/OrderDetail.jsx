import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "./Layout/LayoutAdmin";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Printer,
  Download,
} from "lucide-react";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - thay thế bằng API call thực tế
  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setOrder({
          id: id || "ORD001",
          orderNumber: "ORD001",
          customer: {
            name: "Nguyễn Văn A",
            email: "nguyenvana@email.com",
            phone: "0123456789",
            address: "123 Đường ABC, Quận 1, TP.HCM",
          },
          total: 1500000,
          subtotal: 1500000,
          shipping: 0,
          discount: 0,
          status: "pending",
          paymentMethod: "COD",
          paymentStatus: "pending",
          date: "2024-01-15T10:30:00Z",
          shippingDate: null,
          deliveryDate: null,
          notes: "Giao hàng vào buổi chiều",
          items: [
            {
              id: 1,
              name: "Áo thun nam cao cấp",
              variant: "Trắng - Size L",
              price: 500000,
              quantity: 2,
              image: "/api/placeholder/100/100",
              total: 1000000,
            },
            {
              id: 2,
              name: "Quần jeans slim fit",
              variant: "Xanh - Size 32",
              price: 500000,
              quantity: 1,
              image: "/api/placeholder/100/100",
              total: 500000,
            },
          ],
          shipping: {
            method: "Giao hàng tiêu chuẩn",
            trackingNumber: "GH123456789",
            estimatedDelivery: "2024-01-20",
          },
        });
        setLoading(false);
      }, 1000);
    };

    fetchOrder();
  }, [id]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Package className="h-5 w-5 text-yellow-500" />;
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "confirmed":
        return "Đã xác nhận";
      case "shipped":
        return "Đang giao";
      case "delivered":
        return "Đã giao";
      case "cancelled":
        return "Đã hủy";
      default:
        return "Không xác định";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + "₫";
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleStatusUpdate = (newStatus) => {
    // API call để cập nhật trạng thái
    console.log("Updating status to:", newStatus);
    setOrder((prev) => ({ ...prev, status: newStatus }));
  };

  if (loading) {
    return (
      <AdminLayout
        title="Chi tiết đơn hàng"
        activeLabel="Đơn hàng"
        backTo="/admin/orders"
        showSaveButton={false}
      >
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900 mx-auto mb-4"></div>
            <p className="text-slate-600">Đang tải thông tin đơn hàng...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!order) {
    return (
      <AdminLayout
        title="Chi tiết đơn hàng"
        activeLabel="Đơn hàng"
        backTo="/admin/orders"
        showSaveButton={false}
      >
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">
            Không tìm thấy đơn hàng
          </h3>
          <p className="text-slate-600">Đơn hàng với ID này không tồn tại.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={`Chi tiết đơn hàng #${order.orderNumber}`}
      activeLabel="Đơn hàng"
      backTo="/admin/orders"
      showSaveButton={false}
      customActions={
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">
            <Printer className="h-4 w-4" />
            In hóa đơn
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50">
            <Download className="h-4 w-4" />
            Xuất PDF
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Order Status */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              {getStatusIcon(order.status)}
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Trạng thái đơn hàng
                </h3>
                <p className="text-sm text-slate-600">
                  Cập nhật lần cuối: {formatDate(order.date)}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {getStatusText(order.status)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Information */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Thông tin khách hàng
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Họ tên
                  </label>
                  <p className="text-slate-900">{order.customer.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Email
                    </label>
                    <p className="text-slate-900">{order.customer.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Số điện thoại
                    </label>
                    <p className="text-slate-900">{order.customer.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-slate-400 mt-1" />
                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Địa chỉ
                    </label>
                    <p className="text-slate-900">{order.customer.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Order Items */}
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Sản phẩm đã đặt
                </h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg"
                    >
                      <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center">
                        <Package className="h-8 w-8 text-slate-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-sm text-slate-600">{item.variant}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-slate-600">
                            Số lượng: {item.quantity}
                          </span>
                          <span className="text-sm font-medium text-slate-900">
                            {formatPrice(item.price)} × {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">
                          {formatPrice(item.total)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Tóm tắt đơn hàng
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tạm tính:</span>
                    <span className="text-slate-900">
                      {formatPrice(order.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Phí vận chuyển:</span>
                    <span className="text-slate-900">
                      {formatPrice(order.shipping)}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Giảm giá:</span>
                      <span className="text-green-600">
                        -{formatPrice(order.discount)}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-slate-900">
                        Tổng cộng:
                      </span>
                      <span className="text-lg font-semibold text-slate-900">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment & Shipping Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Thông tin thanh toán
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Phương thức:</span>
                      <span className="text-slate-900">
                        {order.paymentMethod}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Trạng thái:</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.paymentStatus === "paid"
                          ? "Đã thanh toán"
                          : "Chưa thanh toán"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Thông tin vận chuyển
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Phương thức:</span>
                      <span className="text-slate-900">
                        {order.shipping.method}
                      </span>
                    </div>
                    {order.shipping.trackingNumber && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Mã vận đơn:</span>
                        <span className="text-slate-900 font-mono">
                          {order.shipping.trackingNumber}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-600">Dự kiến giao:</span>
                      <span className="text-slate-900">
                        {order.shipping.estimatedDelivery}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              {order.notes && (
                <div className="rounded-xl border border-slate-200 bg-white p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Ghi chú đơn hàng
                  </h3>
                  <p className="text-slate-700 bg-slate-50 p-3 rounded-lg">
                    {order.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-end">
          <button
            onClick={() => navigate("/admin/orders")}
            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            Quay lại
          </button>
          {order.status === "pending" && (
            <>
              <button
                onClick={() => handleStatusUpdate("confirmed")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Xác nhận đơn hàng
              </button>
              <button
                onClick={() => handleStatusUpdate("cancelled")}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Hủy đơn hàng
              </button>
            </>
          )}
          {order.status === "confirmed" && (
            <button
              onClick={() => handleStatusUpdate("shipped")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Bắt đầu giao hàng
            </button>
          )}
          {order.status === "shipped" && (
            <button
              onClick={() => handleStatusUpdate("delivered")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Xác nhận đã giao
            </button>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
