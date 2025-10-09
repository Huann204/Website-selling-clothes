import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar";
import Loading from "../shared/Loading";
import ProductCard from "./ProductCard";

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!keyword) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setLoading(true);
    fetch(
      `http://localhost:5000/api/products/search?q=${encodeURIComponent(
        keyword
      )}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, [keyword]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loading />
      </div>
    );

  return (
    <>
      <AnnouncementBar />
      <div className="text-lg md:text-2xl font-semibold mt-6 mb-4">
        Kết quả tìm kiếm cho: <strong className="font-bold">{keyword}</strong>
      </div>
      <div className="lg:mt-5 mt-20">
        <div className=" p-[5%]">
          <div className={`grid grid-cols-1 lg:grid-cols-4`}>
            {products.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResultsPage;
