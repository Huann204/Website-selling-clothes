import React, { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import Loading from "../shared/Loading";
import ProductCard from "./ProductCard";

const ProductList = ({ title, category, subcategory = "", page, limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        // Build query string
        const query = new URLSearchParams({
          ...(category && { category }),
          ...(subcategory && { subcategory }),
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
        <div className={`grid grid-cols-1 lg:grid-cols-4`}>
          {products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
