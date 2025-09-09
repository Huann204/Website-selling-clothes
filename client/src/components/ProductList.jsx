import React from "react";

import { products } from "./data/products";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const ProductList = ({ title, category }) => {
  const list = category
    ? products.filter((p) => p.category === category)
    : products;
  const formatVND = (n) =>
    typeof n === "number"
      ? n.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      : n;
  return (
    <div className="lg:mt-5 mt-20">
      <div className=" p-[5%]">
        {title && (
          <h2 className="text-[33px] font-semibold text-center mb-[70px] ">
            {title}
          </h2>
        )}
        <div
          className={`grid grid-cols-1 ${
            category ? "lg:grid-cols-3" : "lg:grid-cols-4"
          }`}
        >
          {list.map((product) => {
            const thumb = product?.thumbnail?.src;
            const hover = product?.hoverImage?.src;
            const hasSale =
              typeof product?.salePrice === "number" &&
              product.salePrice < product.price;

            return (
              <div key={product.id} className="px-8 mb-14">
                <Link
                  to={`/detail/${product.slug}`}
                  className="group relative w-full overflow-hidden"
                >
                  <img
                    src={thumb}
                    className="w-full object-cover transform transition-all duration-700 ease-in-out group-hover:scale-0 group-hover:opacity-0"
                    alt={product?.thumbnail?.alt || product.title}
                  />

                  <img
                    src={hover}
                    className="absolute inset-0 w-full h-full object-cover transform scale-0 opacity-0 transition-all duration-700 ease-in-out group-hover:scale-100 group-hover:opacity-100"
                    alt={product?.hoverImage?.alt || product.title}
                  />
                </Link>

                <div className="text-center">
                  <h3 className="mt-4 text-sm font-normal mb-[10px]">
                    {product.title}
                  </h3>
                  <p className="text-lg font-semibold">
                    <span className="text-lg font-semibold">
                      {hasSale
                        ? formatVND(product.salePrice)
                        : formatVND(product.price)}
                      {hasSale && (
                        <span className="line-through ml-5 text-[#8d8d8d]">
                          {formatVND(product.price)}
                        </span>
                      )}
                    </span>
                  </p>
                </div>
                <div className="w-full hidden lg:flex justify-center ">
                  <button className="relative group min-w-[140px] overflow-hidden">
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
