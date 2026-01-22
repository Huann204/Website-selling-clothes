import React from "react";

const BrandValues = () => {
  return (
    <div className="px-[5%] pb-[5%]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-[33px] font-semibold mb-6">WHY CHOOSE US</h2>
        <p className="text-[16px] text-[#8d8d8d] leading-relaxed mb-12">
          Chúng tôi cam kết mang đến cho bạn những sản phẩm thời trang chất
          lượng cao với giá cả hợp lý. Mỗi sản phẩm đều được tuyển chọn kỹ lưỡng
          để đảm bảo sự hài lòng tuyệt đối của khách hàng.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="text-[48px] font-bold mb-4">100%</div>
            <h3 className="text-[18px] font-semibold mb-2">Chính hãng</h3>
            <p className="text-[14px] text-[#8d8d8d]">
              Cam kết sản phẩm 100% chính hãng
            </p>
          </div>

          <div className="text-center p-6">
            <div className="text-[48px] font-bold mb-4">24/7</div>
            <h3 className="text-[18px] font-semibold mb-2">Hỗ trợ</h3>
            <p className="text-[14px] text-[#8d8d8d]">
              Đội ngũ hỗ trợ luôn sẵn sàng
            </p>
          </div>

          <div className="text-center p-6">
            <div className="text-[48px] font-bold mb-4">10K+</div>
            <h3 className="text-[18px] font-semibold mb-2">Khách hàng</h3>
            <p className="text-[14px] text-[#8d8d8d]">
              Được tin tưởng bởi hàng nghìn khách hàng
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandValues;
