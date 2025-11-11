import { useLocation } from "react-router-dom";
import AnnouncementBar from "@layouts/DefaultLayout/components/AnnouncementBar";
import Loading from "@/shared/components/Loading";
import ProductCard from "@products/components/ProductCard";
import API_URL from "@/config";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const SearchResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q");
  useEffect(() => {
    if (!keyword) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [keyword]);
  const fetchSearchResults = async () => {
    const res = await axios.get(
      `${API_URL}/api/products/search?q=${encodeURIComponent(keyword)}`
    );
    return res.data;
  };
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["searchResults", keyword],
    queryFn: fetchSearchResults,
    enabled: !!keyword,
  });
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loading />
      </div>
    );
  if (isError) return <p>Lỗi: {error.message}</p>;

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
