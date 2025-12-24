// import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { FiShoppingCart } from "react-icons/fi";
import Loading from "@/shared/Loading";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const NewArrivals = ({ title, category, subcategory, tag, page, limit }) => {
  const Navigate = useNavigate();
  const fetchProducts = async () => {
    const query = new URLSearchParams({
      ...(category && { category }),
      ...(subcategory && { subcategory }),
      ...(tag && { tag }),
      ...(page && { page }),
      ...(limit && { limit }),
    });
    const res = await axios.get(`${API_URL}/api/products?${query.toString()}`);
    return res.data.products || res.data;
  };
  const {
    data: products,
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["products", category, subcategory, tag, page, limit],
    queryFn: fetchProducts,
  });
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loading />
      </div>
    );
  if (isError) return <p> Lỗi: {queryError.message}</p>;
  if (!products?.length) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
        Không có sản phẩm nào trong danh mục này.
      </div>
    );
  }
  const formatVND = (n) =>
    typeof n === "number"
      ? n.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      : n;
  return (
    <div className="mt-5 w-full">
      <div className={`${title && "bg-[#aabec6]"} p-[5%]`}>
        {title && (
          <h2 className="text-[33px] font-semibold text-center mb-20">
            {title}
          </h2>
        )}
        <Splide
          options={{
            // perPage: 4,
            rewind: true,
            type: "loop",
            autoplay: true,
            interval: 3000,
            speed: 800,
            arrows: false,
            pagination: true,
            perMove: 1,
            perPage: 4,
            breakpoints: {
              1280: { perPage: 4 }, // >=1280
              1024: { perPage: 2 }, // >=1024 = md
              768: { perPage: 1 }, // <1024
            },
          }}
          className="relative pb-10"
        >
          {products.map((product) => {
            if (product.isActive === false) return null;
            return (
              <SplideSlide key={product._id}>
                <div className="px-8 mb-4">
                  <Link
                    to={`/detail/${product?.slug}-${product?._id}`}
                    state={{ product }}
                    // onClick={() =>
                    //   Navigate(`/detail/${product?.slug}-${product?._id}`)
                    // }
                    className="group relative w-full overflow-hidden cursor-pointer"
                  >
                    <img
                      src={product?.thumbnail?.src}
                      className="w-full object-cover transform transition-all duration-700 ease-in-out group-hover:scale-0 group-hover:opacity-0"
                      alt=""
                    />

                    <img
                      src={product?.hoverImage?.src}
                      className="absolute inset-0 w-full h-full object-cover transform scale-0 opacity-0 transition-all duration-700 ease-in-out group-hover:scale-100 group-hover:opacity-100"
                      alt=""
                    />
                  </Link>

                  <div className="text-center">
                    <h3 className="mt-4 text-sm font-normal mb-[10px]">
                      {product?.title}
                    </h3>
                    <p className="text-lg font-semibold">
                      {formatVND(product?.price)}
                      {product?.salePrice && (
                        <span className="line-through ml-5 text-[#8d8d8d]">
                          {formatVND(product?.salePrice)}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="w-full hidden md:flex justify-center ">
                    <button
                      className="relative group min-w-[140px] overflow-hidden"
                      onClick={() =>
                        Navigate(`/detail/${product?.slug}-${product?._id}`)
                      }
                    >
                      <span
                        className="block px-4 py-2 bg-black text-white font-semibold text-[13px]
                 transition-all duration-300 ease-out
                 group-hover:translate-x-full group-hover:opacity-0"
                      >
                        CHỌN MUA
                      </span>

                      <span
                        className="pointer-events-none absolute inset-0
                 flex items-center justify-center
                 px-4 py-2 bg-black text-white font-semibold
                 transition-all duration-300 ease-out
                 -translate-x-full opacity-0
                 group-hover:translate-x-0 group-hover:opacity-100"
                      >
                        <FiShoppingCart size={20} />
                      </span>
                    </button>
                  </div>
                </div>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
};

export default NewArrivals;
