// import React, { useEffect, useState } from "react";
import Loading from "@/shared/Loading";
import ProductCard from "@/components/ProductCard";
import API_URL from "@/config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const ProductList = ({
  title,
  category,
  subcategory,
  tag,
  page,
  limit,
  homepage,
}) => {
  const fetchProducts = async () => {
    const query = new URLSearchParams();
    if (category) query.append("category", category);
    if (subcategory) {
      subcategory.forEach((s) => query.append("subcategory", s));
    }
    if (tag) query.append("tag", tag);
    if (page) query.append("page", page);
    if (limit) query.append("limit", limit);
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
  if (!products.length) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
        Không có sản phẩm nào trong danh mục này.
      </div>
    );
  }
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
            homepage
              ? "lg:grid-cols-4 md:grid-cols-3"
              : "lg:grid-cols-3 md:grid-cols-2"
          }`}
        >
          {products.map((product) => {
            if (product.isActive === false) return null;
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
