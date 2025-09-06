import React, { useState } from "react";
import ProductList from "./ProductList";
import { FaArrowLeft } from "react-icons/fa";

const CategoryPage = () => {
  const Category = ["Áo thun", "Áo sơ mi", "Quần Jean", "Quần tây", "Váy"];
  const Size = ["S", "M", "L", "XL", "XXL"];
  const Colors = ["Trắng", "Hồng", "Đen", "Vàng", "Xanh dương"];

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="my-[50px]">
        <div className="text-[27.5px] font-semibold  mb-[15px]">FOR HIM</div>
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
              return (
                <div key={index} className="mb-2 text-[15px] flex items-center">
                  <input
                    type="checkbox"
                    name="category"
                    className="mr-[10px] h-[15px] w-[15px]"
                  />
                  {item}
                </div>
              );
            })}
          </div>
          <div className="mb-5">
            <h3 className="font-semibold mb-4 text-base">KÍCH CỠ / SIZE</h3>
            {Size.map((item, index) => {
              return (
                <div key={index} className="mb-2 text-[15px] flex items-center">
                  <input
                    type="checkbox"
                    name="size"
                    className="mr-[10px] h-[15px] w-[15px]"
                  />
                  {item}
                </div>
              );
            })}
          </div>
          <div className="mb-5">
            <h3 className="font-semibold mb-4 text-base">MÀU SẮC</h3>
            {Colors.map((item, index) => {
              return (
                <div key={index} className="mb-2 text-[15px] flex items-center">
                  <input
                    type="checkbox"
                    name="color"
                    className="mr-[10px] h-[15px] w-[15px]"
                  />
                  {item}
                </div>
              );
            })}
          </div>
          <button className="py-2 px-5 bg-black text-white text-center text-sm cursor-pointer">
            Xóa bộ lọc
          </button>
        </div>
        {/* Content */}
        <div className="mt-[-70px] lg:col-span-8">
          <ProductList category="for-him" />
        </div>
      </div>

      {/* Content mobile */}
      <div className="lg:hidden mt-[-70px]">
        <ProductList category="for-him" />
      </div>

      {/* Sidebar filter cho mobile */}
      <div
        className={`fixed top-[70px] left-0 w-[50%] h-full bg-white z-[999] overflow-y-auto p-3 lg:hidden
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
          {Category.map((item, index) => (
            <div key={index} className="mb-2 text-[12px] flex items-center">
              <input type="checkbox" className="mr-2 h-[15px] w-[15px]" />
              {item}
            </div>
          ))}
        </div>

        {/* Size */}
        <div className="mb-5">
          <h3 className="font-semibold mb-4 text-[14px]">KÍCH CỠ</h3>
          {Size.map((item, index) => (
            <div key={index} className="mb-2 text-[12px] flex items-center">
              <input type="checkbox" className="mr-2 h-[15px] w-[15px]" />
              {item}
            </div>
          ))}
        </div>

        {/* Color */}
        <div className="mb-5">
          <h3 className="font-semibold mb-4 text-[14px]">MÀU SẮC</h3>
          {Colors.map((item, index) => (
            <div key={index} className="mb-2 text-[12px] flex items-center">
              <input type="checkbox" className="mr-2 h-[15px] w-[15px]" />
              {item}
            </div>
          ))}
        </div>

        <button className="py-2 px-5 bg-black text-white text-sm w-full">
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
