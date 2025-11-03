import React, { useEffect, useState } from "react";
import AnnouncementBar from "./AnnouncementBar";
import { Link, useParams } from "react-router-dom";
import API_URL from "../config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const OrderSuccessPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { orderId } = useParams();
  // const [data, setData] = useState({});
  useEffect(() => {
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Animation delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  const fetchOderDetail = async () => {
    const res = await axios.get(`${API_URL}/api/admin/orders/${orderId}`);
    return res.data;
  };
  const { data } = useQuery({
    queryKey: ["orderId", orderId],
    queryFn: fetchOderDetail,
    enabled: !!orderId,
  });
  return (
    <>
      <AnnouncementBar />
      <div className="min-h-[80vh] flex flex-col justify-center items-center px-4">
        <div
          className={`text-center transition-all duration-500 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-lg lg:text-2xl mb-6 font-semibold text-gray-800">
            Bạn đã đặt hàng thành công!
          </h1>

          {/* Order Details */}
          {orderId && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Mã đơn hàng</p>
              <p className="font-semibold">{orderId}</p>
            </div>
          )}

          {/* Information */}
          <div className="text-sm lg:text-base flex flex-col text-center text-gray-600 mb-8 max-w-md mx-auto">
            <p className="mb-2">
              Chúng tôi sẽ liên lạc với bạn qua số điện thoại để xác nhận lại
              đơn hàng.
            </p>
            {data?.customer?.email && (
              <p className="mb-2">
                Email xác nhận đã được gửi đến:{" "}
                <strong>{data?.customer.email}</strong>
              </p>
            )}
            <p className="font-medium">Xin chân thành cảm ơn quý khách!</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-block py-3 px-6 bg-black text-white text-sm lg:text-base font-semibold rounded-md hover:bg-gray-800 transition-colors duration-200"
              aria-label="Quay về trang chủ để tiếp tục mua hàng"
            >
              TIẾP TỤC MUA HÀNG
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

// OrderSuccessPage accepts orderId and customerEmail as optional props

export default OrderSuccessPage;
