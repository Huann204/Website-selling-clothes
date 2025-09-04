import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" from-slate-50 to-gray-100 border-t border-gray-200">
      <div className="px-[10px] lg:px-[50px] py-16">
        <div className="lg:max-w-[1620px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Tổng đài hỗ trợ */}
            <div className="text-xs lg:text-sm">
              <h4 className="font-bold text-gray-800 mb-6 text-sm lg:text-base tracking-wide">
                TỔNG ĐÀI HỖ TRỢ
              </h4>
              <div className="space-y-4">
                <div className="flex flex-col">
                  <span className="text-gray-600 mb-1">Liên hệ đặt hàng:</span>
                  <a
                    href="tel:0123456789"
                    className="font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    0123.456.789
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600 mb-1">Thắc mắc đơn hàng:</span>
                  <a
                    href="tel:0123456789"
                    className="font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    0123.456.789
                  </a>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600 mb-1">Góp ý, khiếu nại:</span>
                  <a
                    href="tel:0123456789"
                    className="font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    0123.456.789
                  </a>
                </div>
              </div>
            </div>

            {/* Về chúng tôi */}
            <div className="text-xs lg:text-sm">
              <h4 className="font-bold text-gray-800 mb-6 text-sm lg:text-base tracking-wide">
                VỀ CHÚNG TÔI
              </h4>
              <div className="space-y-3">
                {[
                  "Giới thiệu",
                  "Tuyển dụng",
                  "Chính sách bảo mật",
                  "Chính sách vận chuyển",
                  "Chính sách đổi trả",
                  "Chính sách khách hàng VIP",
                ].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Dịch vụ khách hàng */}
            <div className="text-xs lg:text-sm">
              <h4 className="font-bold text-gray-800 mb-6 text-sm lg:text-base tracking-wide">
                DỊCH VỤ KHÁCH HÀNG
              </h4>
              <div className="space-y-3">
                {[
                  "Trung tâm hỗ trợ",
                  "Hướng dẫn mua hàng",
                  "Hướng dẫn thanh toán",
                ].map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="block text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* SSStutter Brand */}
            <div className="text-xs lg:text-sm">
              <h4 className="font-bold text-gray-800 mb-6 text-sm lg:text-base tracking-wide">
                SSSTUTTER
              </h4>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Với thông điệp{" "}
                  <span className="font-semibold text-blue-600">
                    "Refined Life"
                  </span>
                  , SSStutter mong muốn đem đến cho khách hàng một lối sống tinh
                  gọn bằng các sản phẩm thời trang tinh tế.
                </p>
                <div className="flex space-x-4 pt-2">
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
                  >
                    <FaFacebook className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-300 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-xs lg:text-sm text-gray-500">
              <p className="mb-4 md:mb-0">
                © 2024 SSStutter. Tất cả quyền được bảo lưu.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="hover:text-gray-700 transition-colors duration-200"
                >
                  Điều khoản sử dụng
                </a>
                <a
                  href="#"
                  className="hover:text-gray-700 transition-colors duration-200"
                >
                  Chính sách riêng tư
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
