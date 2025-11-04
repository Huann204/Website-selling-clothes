import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@admin/components/Layout/LayoutAdmin";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Printer,
  Download,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { createGHNOrder } from "../../utils/ghn";
import API_URL from "../../config";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [ghnOrderCode, setGhnOrderCode] = useState(null);
  const { admin } = useContext(AuthContext);
  const token = admin?.token;

  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id, token],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/api/admin/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
  });

  const getOrderStatus = (status) => {
    const statusConfig = {
      pending: {
        icon: <Package className="h-5 w-5 text-yellow-500" />,
        text: "Chờ xử lý",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      confirmed: {
        icon: <CheckCircle className="h-5 w-5 text-blue-500" />,
        text: "Đã xác nhận",
        color: "bg-blue-100 text-blue-800 border-blue-200",
      },
      shipped: {
        icon: <Truck className="h-5 w-5 text-blue-500" />,
        text: "Đang giao",
        color: "bg-blue-100 text-blue-800 border-blue-200",
      },
      delivered: {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        text: "Đã giao",
        color: "bg-green-100 text-green-800 border-green-200",
      },
      cancelled: {
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        text: "Đã hủy",
        color: "bg-red-100 text-red-800 border-red-200",
      },
    };

    return (
      statusConfig[status] || {
        icon: <Package className="h-5 w-5 text-gray-500" />,
        text: "Không xác định",
        color: "bg-gray-100 text-gray-800 border-gray-200",
      }
    );
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

  const { mutate: updateOrderStatus } = useMutation({
    mutationFn: (newStatus) => {
      const payload = {
        status: newStatus,
        ...(ghnOrderCode && {
          shipping: { trackingNumber: ghnOrderCode },
        }),
      };

      return axios.put(`${API_URL}/api/admin/orders/${order._id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      alert(
        `Đã cập nhật trạng thái thành công!${
          ghnOrderCode ? `\nMã vận đơn GHN: ${ghnOrderCode}` : ""
        }`
      );
      queryClient.invalidateQueries(["order", id, token]);
    },
    onError: (error) => {
      console.error("Lỗi cập nhật trạng thái:", error);
      alert(
        `Cập nhật trạng thái thất bại!\n${
          error.response?.data?.message || error.message || "Vui lòng thử lại"
        }`
      );
    },
  });

  const handleStatusUpdate = async (newStatus) => {
    if (newStatus === "confirmed") {
      const districtId = order.customer?.address?.districtId;
      const wardCode = order.customer?.address?.wardCode;

      if (!districtId || !wardCode) {
        alert(
          "Không thể tạo đơn GHN: Thiếu thông tin districtId hoặc wardCode."
        );
        return;
      }

      try {
        const ghnData = {
          toName: order.customer?.name || "",
          toPhone: order.customer?.phone || "",
          toAddress: `${order.customer?.address?.street}, ${order.customer?.address?.ward}, ${order.customer?.address?.district}, ${order.customer?.address?.province}`,
          toWardCode: wardCode,
          toDistrictId: districtId,
          codAmount: order.payment?.method === "cod" ? order.grandTotal : 0,
          weight: 1000,
          length: 20,
          width: 15,
          height: 10,
          note: order.notes || "Giao hàng cẩn thận",
          orderCode: order._id,
          items: order.items?.map((item) => ({
            name: item.title || "Sản phẩm",
            code: Number(item.productId),
            quantity: item.qty || 1,
            price: item.price || 0,
            length: 20,
            width: 15,
            height: 10,
            weight: 200,
          })),
        };

        const ghnResponse = await createGHNOrder(ghnData);
        setGhnOrderCode(ghnResponse.order_code);
      } catch (error) {
        console.error("Lỗi tạo đơn GHN:", error);
        alert(
          `Không thể tạo đơn GHN!\n${
            error.response?.data?.message ||
            error.message ||
            "Vui lòng kiểm tra thông tin"
          }`
        );
        return;
      }
    }

    updateOrderStatus(newStatus);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Chi tiết đơn hàng" activeLabel="Đơn hàng">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-900 mx-auto mb-4"></div>
            <p className="text-slate-600">Đang tải thông tin đơn hàng...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={`Chi tiết đơn hàng #${order._id}`}
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
              {getOrderStatus(order.status).icon}
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Trạng thái đơn hàng
                </h3>
                <p className="text-sm text-slate-600">
                  Cập nhật lần cuối: {formatDate(order.updatedAt)}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${
                  getOrderStatus(order.status).color
                }`}
              >
                {getOrderStatus(order.status).text}
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
                  <p className="text-slate-900">{order.customer?.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Email
                    </label>
                    <p className="text-slate-900">{order.customer?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Số điện thoại
                    </label>
                    <p className="text-slate-900">{order.customer?.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-slate-400 mt-1" />
                  <div>
                    <label className="text-sm font-medium text-slate-600">
                      Địa chỉ
                    </label>
                    <p className="text-slate-900">
                      {order.customer.address?.street},{" "}
                      {order.customer.address?.ward},{" "}
                      {order.customer.address?.district},{" "}
                      {order.customer.address?.province}
                    </p>
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
                      key={item._id}
                      className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg"
                    >
                      <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center">
                        {/* <Package className="h-8 w-8 text-slate-400" /> */}
                        <img src={item.thumbnail} alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-slate-900 truncate">
                          {item.title}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {item.color} {item.size}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-slate-600">
                            Số lượng: {item.qty}
                          </span>
                          <span className="text-sm font-medium text-slate-900">
                            {formatPrice(item.price)} × {item.qty}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">
                          {formatPrice(item.price * item.qty)}
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
                      {formatPrice(order.total)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Phí vận chuyển:</span>
                    <span className="text-slate-900">
                      {formatPrice(order.shipping?.fee)}
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
                        {formatPrice(order.grandTotal)}
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
                        {order.payment?.method}
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
                        {order.payment?.status === "paid"
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
                        Giao hàng tiêu chuẩn
                      </span>
                    </div>
                    {(order?.shipping?.trackingNumber || ghnOrderCode) && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Mã vận đơn:</span>
                        <span className="text-slate-900 font-mono">
                          {order?.shipping?.trackingNumber || ghnOrderCode}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-600">Dự kiến giao:</span>
                      <span className="text-slate-900">3-5 ngày</span>
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
                    {/* {order.notes} */}
                    Giao hàng vào buổi chiều
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
