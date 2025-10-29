import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import Loading from "../shared/Loading";
import ProductCard from "./ProductCard";
import API_URL from "../config";

const ProductList = ({
  title,
  category,
  subcategory = "",
  page,
  limit,
  homepage,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const query = new URLSearchParams();

        if (category) query.append("category", category);

        if (subcategory) {
          subcategory.forEach((s) => query.append("subcategory", s));
        }
        if (page) query.append("page", page);
        if (limit) query.append("limit", limit);

        const res = await fetch(`${API_URL}/api/products?${query.toString()}`);
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
  }, [category, subcategory, page, limit]);
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
