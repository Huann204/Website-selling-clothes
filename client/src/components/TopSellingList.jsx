import React, { useEffect, useState } from "react";
import API_URL from "../config";
import Loading from "../shared/Loading";
import ProductCard from "./ProductCard";
const TopSellingList = ({ title, homepage, limit, page }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const query = new URLSearchParams();
        if (page) query.append("page", page);
        if (limit) query.append("limit", limit);
        const res = await fetch(
          `${API_URL}/api/stats/sold-products?${query.toString()}`
        );
        if (!res.ok) throw new Error("Lỗi fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [limit, page]);
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loading />
      </div>
    );
  if (error) return <p> Lỗi: {error}</p>;
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
              <ProductCard key={products._id} product={products?.productId} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopSellingList;
