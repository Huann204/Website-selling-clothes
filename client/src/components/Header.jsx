import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  BiHeart,
  BiMenuAltLeft,
  BiSearch,
  BiShoppingBag,
  BiX,
} from "react-icons/bi";
import Logo from "../assets/images/Logo.svg";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
const Header = ({ onOpenMenu }) => {
  const { cart } = useContext(CartContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const Nav = [
    { name: "Trang chủ", to: "/" },
    { name: "Nam", to: "/category/for-him" },
    { name: "Nữ", to: "/category/for-her" },
    { name: "Tra cứu đơn hàng", to: "/tracking" },
    { name: "Liên Hệ", to: "/contact" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [isSearchOpen]);
  // const [active, setActive] = useState("Trang chủ");
  return (
    <header className="h-[70px] px-[10px] lg:px-[50px] lg:h-[100px] bg-white fixed top-0 left-0 z-[99] transition-all duration-300 w-full shadow-[0px_8px_24px_rgba(150,158,166,0.2)]  ">
      <div className=" h-full lg:max-w-[1620px] mx-auto flex items-center justify-between w-full">
        <div className="lg:hidden" onClick={() => onOpenMenu()}>
          <BiMenuAltLeft size={22} />
        </div>
        <Link
          to={"/"}
          className="font-semibold text-[22px] flex flex-1 justify-center lg:hidden cursor-pointer "
        >
          SSSTUTER
        </Link>
        <div className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[15.6px]">
            {Nav.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-underline cursor-pointer relative uppercase ${
                      isActive ? "font-semibold" : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <NavLink to={"/"} className="hidden lg:flex justify-center flex-1">
          <img src={Logo} alt="logo" />
        </NavLink>
        <div className="flex items-center gap-[10px] lg:gap-9 ">
          <button
            type="button"
            aria-label="Tìm kiếm"
            onClick={() => setIsSearchOpen(true)}
          >
            <BiSearch className="size-5 lg:size-6" />
          </button>
          <button type="button" aria-label="Yêu thích">
            <BiHeart className="size-5 lg:size-6" />
          </button>
          <NavLink to={"/cart"} className="relative" aria-label="Giỏ hàng">
            <BiShoppingBag className="size-5 lg:size-6" />
            <div className="absolute flex text-[13px] bg-black w-[18px] h-[18px] rounded-[50%] items-center justify-center text-white right-[-8px] top-[-6px] ">
              {cart.length ? cart.length : 0}
            </div>
          </NavLink>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        >
          <div className="flex items-start justify-center min-h-screen pt-20 px-4">
            <div
              className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <BiSearch className="text-gray-400 flex-shrink-0" size={20} />
                  <form onSubmit={handleSearchSubmit} className="flex-1">
                    <input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-base outline-none placeholder-gray-400 bg-transparent"
                      autoFocus
                    />
                  </form>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                  >
                    <BiX size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="px-6 py-4">
                {searchQuery ? (
                  <div className="text-sm text-gray-500">
                    Nhấn Enter để tìm kiếm "{searchQuery}"
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">
                    Nhập từ khóa để tìm kiếm sản phẩm
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Enter để tìm kiếm</span>
                  <span>ESC để đóng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
