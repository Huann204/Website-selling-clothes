import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
const AnnouncementBar = () => {
  return (
    <Splide
      options={{
        type: "loop",
        autoplay: true,
        arrows: false,
        pagination: false,
      }}
    >
      <SplideSlide>
        <div className="bg-black text-white text-center text-[11px] lg:text-[13px] py-[10px] font-medium">
          Đồng giá ship chỉ 10.000 cho đơn nội thành
        </div>
      </SplideSlide>
      <SplideSlide>
        <div className="bg-black text-white text-center text-[11px] lg:text-[13px] py-[10px] font-medium">
          Ưu đãi giảm 10.000 khi thanh toán trả trước
        </div>
      </SplideSlide>
      <SplideSlide>
        <div className="bg-black text-white text-center text-[11px] lg:text-[13px] py-[10px] font-medium">
          Đồng giá ship chỉ 20.000 cho đơn toàn quốc
        </div>
      </SplideSlide>
    </Splide>
  );
};

export default AnnouncementBar;
