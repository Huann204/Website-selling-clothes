import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnnouncementBar from "@layouts/DefaultLayout/components/AnnouncementBar";
const OrderFailedPage = () => {
  const { orderId } = useParams();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <div className="min-h-[80vh] flex flex-col justify-center items-center px-4">
        <div
          className={`text-center transition-all duration-500 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-lg lg:text-2xl mb-6 font-semibold text-gray-800">
            Thanh toán thất bại!
          </h1>

          {orderId && (
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Mã đơn hàng</p>
              <p className="font-semibold">{orderId}</p>
            </div>
          )}

          <p className="text-sm lg:text-base text-gray-600 mb-8 max-w-md mx-auto">
            Bạn có thể thử đặt lại đơn mới hoặc liên hệ với chúng tôi để được hỗ
            trợ.
          </p>

          <Link
            to="/"
            className="inline-block py-3 px-6 bg-black text-white text-sm lg:text-base font-semibold rounded-md hover:bg-gray-800 transition-colors duration-200"
          >
            QUAY VỀ TRANG CHỦ
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderFailedPage;
