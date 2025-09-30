import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { FaArrowLeft } from "react-icons/fa";
import AnnouncementBar from "./AnnouncementBar";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { slug } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selected, setSelected] = useState("");

  const Category = [
    "Áo thun",
    "Áo sơ mi",
    "Quần Jean",
    "Quần tây",
    "Váy",
    "Áo khoác",
  ];
  // const Size = ["S", "M", "L", "XL", "XXL"];
  // const Colors = ["Trắng", "Hồng", "Đen", "Vàng", "Xanh dương"];
  const subcategory = {
    "Áo thun": "ao-thun",
    "Áo sơ mi": "ao-so-mi",
    "Quần Jean": "quan-jeans",
    "Quần tây": "quan-tay",
    Váy: "vay",
    "Áo khoác": "ao-khoac",
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  // const handleChange = (item, checked) => {
  //   const slug = subcategory[item]; // map sang slug
  //   if (checked) {
  //     setSelected(slug);
  //   }
  // };

  return (
    <div>
      <AnnouncementBar />
      {/* Header */}
      <div className="my-[50px]">
        <div className="text-[27.5px] font-semibold  mb-[15px]">
          {slug === "for-him" ? "FOR HIM" : "FOR HER"}
        </div>
        <div className="text-[13.2px] text-[#adadad] mb-[50px] lg:max-w-[50%]">
          Tất cả những sản phẩm Mới nhất nằm trong BST được mở bán Hàng Tuần sẽ
          được cập nhật liên tục tại đây. Chắc chắn bạn sẽ tìm thấy những sản
          phẩm Đẹp Nhất - Vừa Vặn Nhất - Phù Hợp nhất với phong cách của mình.
        </div>
      </div>

      <button
        onClick={() => setIsFilterOpen(true)}
        className="py-2 px-4 bg-black text-white text-center text-[11px] cursor-pointer lg:hidden"
      >
        BỘ LỌC
      </button>

      {/* Layout desktop */}
      <div className="hidden lg:grid grid-cols-10 gap-5 mb-[50px]">
        {/* Sidebar */}
        <div className="col-span-2">
          <div className="mb-5">
            <h3 className="font-semibold mb-4 text-base">DANH MỤC SẢN PHẨM</h3>
            {Category.map((item, index) => {
              const slugItem = subcategory[item];
              return (
                <div key={index} className="mb-2 text-[15px] flex items-center">
                  <input
                    type="checkbox"
                    name="category"
                    checked={selected === slugItem}
                    onChange={() =>
                      setSelected((prev) => (prev === slugItem ? "" : slugItem))
                    }
                    className="mr-[10px] h-[15px] w-[15px]"
                  />
                  {item}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setSelected("")}
            className="py-2 px-5 bg-black text-white text-center text-sm cursor-pointer"
          >
            Xóa bộ lọc
          </button>
        </div>
        {/* Content */}
        <div className="mt-[-70px] lg:col-span-8">
          <ProductList category={slug} subcategory={selected} />
        </div>
      </div>

      {/* Content mobile */}
      <div className="lg:hidden mt-[-70px]">
        <ProductList category={slug} subcategory={selected} />
      </div>

      {/* Sidebar filter cho mobile */}
      <div
        className={`fixed top-[70px] left-0 w-[45%] h-full bg-white z-[999] overflow-y-auto p-3 lg:hidden
           transform transition-transform duration-500 ease-in-out
    ${isFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-5">
          <div onClick={() => setIsFilterOpen(false)}>
            <FaArrowLeft />
          </div>
        </div>

        {/* Danh mục */}
        <div className="mb-5">
          <h3 className="font-semibold mb-3 text-[14px]">DANH MỤC SẢN PHẨM</h3>
          {Category.map((item, index) => {
            const slugItem = subcategory[item];
            return (
              <div key={index} className="mb-2 text-[12px] flex items-center">
                <input
                  type="checkbox"
                  checked={slugItem === selected}
                  className="mr-2 h-[15px] w-[15px]"
                  onChange={() => {
                    slugItem === selected
                      ? setSelected("")
                      : setSelected(slugItem);
                  }}
                />
                {item}
              </div>
            );
          })}
        </div>
        <button
          onClick={() => setSelected("")}
          className="py-2 px-5 bg-black text-white text-sm w-full"
        >
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
