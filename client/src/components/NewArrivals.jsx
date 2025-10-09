import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { FiShoppingCart } from "react-icons/fi";
import Loading from "../shared/Loading";
import { useNavigate } from "react-router-dom";

const NewArrivals = ({
  title,
  category,
  subcategory,
  sort,
  tag,
  page,
  limit,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const query = new URLSearchParams({
          ...(category && { category }),
          ...(subcategory && { subcategory }),
          ...(sort && { sort }),
          ...(tag && { tag }),
          page,
          limit,
        });
        const res = await fetch(
          `http://localhost:5000/api/products?${query.toString()}`
        );
        if (!res.ok) throw new Error("Lỗi fetch products");

        const data = await res.json();

        setProducts(data.products || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category, subcategory, page, limit, sort, tag]);
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loading />
      </div>
    );
  if (error) return <p> Lỗi: {error}</p>;
  if (!products.length) {
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
    <div className="mt-5">
      <div className={`${title && "bg-[#aabec6]"} p-[5%]`}>
        {title && (
          <h2 className="text-[33px] font-semibold text-center mb-20">
            {title}
          </h2>
        )}
        <Splide
          options={{
            perPage: 4,
            rewind: true,
            type: "loop",
            autoplay: true,
            interval: 3000,
            speed: 800,
            arrows: false,
            pagination: false,
            perMove: 1,
            breakpoints: {
              1024: { perPage: 1 },
            },
          }}
        >
          {products.map((product) => (
            <SplideSlide key={product._id}>
              <div className="px-8 mb-4">
                <div
                  onClick={() =>
                    Navigate(`/detail/${product?.slug}-${product?._id}`)
                  }
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
                </div>

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
                <div className="w-full hidden lg:flex justify-center ">
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
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default NewArrivals;
