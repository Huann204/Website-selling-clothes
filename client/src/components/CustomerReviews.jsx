import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Sơn Tùng M-TP",
      content:
        "Sản phẩm chất lượng tuyệt vời, giao hàng nhanh chóng. Rất hài lòng với dịch vụ của shop!",
      rating: 5,
    },
    {
      id: 2,
      name: "Nguyễn Phương Hằng",
      content:
        "Shop uy tín, sản phẩm đúng mô tả. Nhân viên tư vấn nhiệt tình, chu đáo.",
      rating: 5,
    },
    {
      id: 3,
      name: "Soobin Hoàng Sơn",
      content:
        "Mình đã tìm được phong cách phù hợp nhất tại đây. Đa dạng mẫu mã, giá cả hợp lý.",
      rating: 5,
    },
    {
      id: 4,
      name: "Trịnh Trần Phương Tuấn",
      content:
        "Chất liệu tốt, form chuẩn. Sẽ tiếp tục ủng hộ shop trong thời gian tới.",
      rating: 5,
    },
  ];

  return (
    <div className="mt-5 p-[5%] bg-[#f5f5f5]">
      <h2 className="text-[33px] font-semibold text-center mb-[70px]">
        CUSTOMER REVIEWS
      </h2>

      <Splide
        options={{
          rewind: true,
          type: "slide",
          autoplay: true,
          interval: 4000,
          speed: 800,
          arrows: false,
          pagination: true,
          perMove: 1,
          perPage: 3,
          breakpoints: {
            1024: { perPage: 2 },
            768: { perPage: 1 },
          },
        }}
        className="pb-10"
      >
        {reviews.map((review) => (
          <SplideSlide key={review.id}>
            <div className="px-4">
              <div className="bg-white h-[200px]  p-8 shadow-[0_8px_24px_hsla(210,8%,62%,0.2)] hover:translate-y-[-10px] transition-all duration-500">
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-black fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#8d8d8d] mb-6 leading-relaxed h-16">
                  "{review.content}"
                </p>
                <h4 className="font-semibold text-[16px] h-6">{review.name}</h4>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default CustomerReviews;
