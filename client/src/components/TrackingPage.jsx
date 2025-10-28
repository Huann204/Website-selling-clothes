import React, { useEffect, useState } from "react";
import { BiSearch, BiPackage, BiCheckCircle } from "react-icons/bi";
import { MdLocalShipping, MdCancel } from "react-icons/md";
import { FaBoxOpen, FaPhone } from "react-icons/fa";
import { BsReceipt } from "react-icons/bs";
import AnnouncementBar from "./AnnouncementBar";
import API_URL from "../config";

const TrackingPage = () => {
  const [searchType, setSearchType] = useState("orderId");
  const [searchValue, setSearchValue] = useState("");
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchValue.trim()) {
      setError("Vui lòng nhập thông tin tra cứu");
      return;
    }

    setLoading(true);
    setError("");
    setOrderData(null);

    try {
      const endpoint =
        searchType === "orderId"
          ? `${API_URL}/api/admin/orders/${searchValue}`
          : `${API_URL}/api/admin/orders/phone/${searchValue}`;

      const res = await fetch(endpoint);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Không tìm thấy đơn hàng");
      }

      setOrderData(data);
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case "pending":
        return {
          icon: <BiPackage className="text-6xl text-yellow-500" />,
          text: "Chờ xác nhận",
          color: "bg-yellow-100 border-yellow-300 text-yellow-800",
          description: "Đơn hàng đang chờ được xác nhận",
        };
      case "confirmed":
        return {
          icon: <BiCheckCircle className="text-6xl text-blue-500" />,
          text: "Đã xác nhận",
          color: "bg-blue-100 border-blue-300 text-blue-800",
          description: "Đơn hàng đã được xác nhận và đang chuẩn bị",
        };
      case "shipped":
        return {
          icon: <MdLocalShipping className="text-6xl text-purple-500" />,
          text: "Đang giao hàng",
          color: "bg-purple-100 border-purple-300 text-purple-800",
          description: "Đơn hàng đang trên đường giao đến bạn",
        };
      case "delivered":
        return {
          icon: <FaBoxOpen className="text-6xl text-green-500" />,
          text: "Đã giao hàng",
          color: "bg-green-100 border-green-300 text-green-800",
          description: "Đơn hàng đã được giao thành công",
        };
      case "cancelled":
        return {
          icon: <MdCancel className="text-6xl text-red-500" />,
          text: "Đã hủy",
          color: "bg-red-100 border-red-300 text-red-800",
          description: "Đơn hàng đã bị hủy",
        };
      default:
        return {
          icon: <BiPackage className="text-6xl text-gray-500" />,
          text: "Không xác định",
          color: "bg-gray-100 border-gray-300 text-gray-800",
          description: "",
        };
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <AnnouncementBar />

      {/* Hero Section */}
      <div className="bg-white border-b py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-xl md:text-3xl font-bold text-center mb-2 text-gray-800">
            Tra cứu đơn hàng
          </h1>
          <p className="text-sm md:text-base text-center text-gray-600 mb-6 md:mb-8">
            Nhập mã đơn hàng hoặc số điện thoại để kiểm tra
          </p>

          {/* Search Form */}
          <div className="max-w-xl mx-auto bg-white border rounded-lg p-4 md:p-6 shadow-sm">
            <form onSubmit={handleSearch} className="space-y-4">
              {/* Search Type Toggle */}
              <div className="flex gap-2 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setSearchType("orderId");
                    setSearchValue("");
                    setError("");
                  }}
                  className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                    searchType === "orderId"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <BsReceipt className="text-sm md:text-base" />
                  <span>Mã đơn hàng</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchType("phone");
                    setSearchValue("");
                    setError("");
                  }}
                  className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg font-medium transition-all text-xs md:text-sm ${
                    searchType === "phone"
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FaPhone className="text-sm md:text-base" />
                  <span>Số điện thoại</span>
                </button>
              </div>

              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setError("");
                  }}
                  placeholder={
                    searchType === "orderId"
                      ? "Nhập mã đơn hàng"
                      : "Nhập số điện thoại"
                  }
                  className="w-full px-4 py-2.5 md:py-3 pl-10 md:pl-12 border border-gray-300 rounded-lg text-sm md:text-base text-gray-700 focus:border-black focus:outline-none"
                />
                <BiSearch className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg md:text-xl" />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Search Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-2.5 md:py-3 rounded-lg text-sm md:text-base font-medium hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang tìm...
                  </span>
                ) : (
                  "Tra cứu"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {orderData && (
        <div className="container mx-auto px-4 py-6 md:py-12">
          <div className="max-w-2xl mx-auto">
            {/* Status Card */}
            <div className="bg-white rounded-lg border shadow-sm p-4 md:p-8">
              <div className="text-center space-y-3 md:space-y-4">
                {/* Icon */}
                <div className="flex justify-center mb-3 md:mb-4">
                  {getStatusInfo(orderData.status).icon}
                </div>

                {/* Status Text */}
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                    {getStatusInfo(orderData.status).text}
                  </h2>
                  <p className="text-sm md:text-base text-gray-600">
                    {getStatusInfo(orderData.status).description}
                  </p>
                </div>

                {/* Order ID */}
                <div className="py-2">
                  <span className="text-xs md:text-sm text-gray-600">
                    Mã đơn hàng
                  </span>
                  <p className="font-mono text-xs md:text-base font-semibold text-gray-800 break-all">
                    {orderData._id}
                  </p>
                </div>

                {/* Order Date */}
                <div className="pt-3 md:pt-4 border-t">
                  <p className="text-xs md:text-sm text-gray-600">
                    Ngày đặt: {formatDate(orderData.createdAt)}
                  </p>
                </div>

                {/* GHN Tracking */}
                {["confirmed", "shipped", "delivered"].includes(
                  orderData.status
                ) &&
                  orderData.shipping?.trackingNumber && (
                    <div className="pt-4 md:pt-6 space-y-3">
                      <div className="bg-gray-50 border rounded-lg p-3 md:p-4">
                        <p className="text-xs md:text-sm text-gray-600 mb-2">
                          Mã vận đơn GHN
                        </p>
                        <p className="text-base md:text-xl font-mono font-bold text-gray-800 mb-3 md:mb-4 break-all">
                          {orderData.shipping.trackingNumber}
                        </p>
                        <a
                          href={`https://tracking.ghn.dev/?order_code=${orderData.shipping.trackingNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 md:gap-2 bg-black text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-gray-800 transition-all"
                        >
                          <MdLocalShipping className="text-base md:text-lg" />
                          Theo dõi vận chuyển
                        </a>
                      </div>
                    </div>
                  )}

                {/* Customer Info */}
                <div className="pt-4 md:pt-6 border-t text-left space-y-2">
                  <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-2 md:mb-3">
                    Thông tin giao hàng
                  </h3>
                  <div className="space-y-1 text-xs md:text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-800">Tên:</span>{" "}
                      {orderData.customer?.name}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">SĐT:</span>{" "}
                      {orderData.customer?.phone}
                    </p>
                    <p>
                      <span className="font-medium text-gray-800">
                        Địa chỉ:
                      </span>{" "}
                      {orderData.customer?.address?.street},{" "}
                      {orderData.customer?.address?.ward},{" "}
                      {orderData.customer?.address?.district},{" "}
                      {orderData.customer?.address?.province}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!orderData && !loading && (
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-xl mx-auto text-center">
            <BiPackage className="text-gray-300 text-5xl md:text-7xl mx-auto mb-3 md:mb-4" />
            <h3 className="text-base md:text-lg font-medium text-gray-600 mb-2">
              Nhập thông tin để tra cứu
            </h3>
            <p className="text-gray-500 text-xs md:text-sm">
              Tra cứu bằng mã đơn hàng hoặc số điện thoại
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackingPage;
