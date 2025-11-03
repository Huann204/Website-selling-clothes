// import React, { useEffect, useState } from "react";
import API_URL from "../config";
import Loading from "../shared/Loading";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const TopSellingList = ({ title, homepage, limit, page }) => {
  const fetchProducts = async () => {
    const query = new URLSearchParams();
    if (page) query.append("page", page);
    if (limit) query.append("limit", limit);
    const res = await axios.get(
      `${API_URL}/api/stats/sold-products?${query.toString()}`
    );
    return res.data;
  };
  const {
    data: products,
    isLoading,
    isError,
    error: queryError,
  } = useQuery({
    queryKey: ["topSelling", page, limit],
    queryFn: fetchProducts,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loading />
      </div>
    );
  if (isError) return <p> Lỗi: {queryError}</p>;
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
            homepage ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {products.map((products) => {
            if (products?.productId?.isActive === false) return null;
            return (
              <ProductCard
                key={products.productId._id}
                product={products?.productId}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopSellingList;
