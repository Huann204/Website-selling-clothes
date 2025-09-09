import React, { useContext } from "react";
import {
  BiHeart,
  BiMenuAltLeft,
  BiSearch,
  BiShoppingBag,
} from "react-icons/bi";
import Logo from "../assets/images/Logo.svg";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
const Header = ({ onOpenMenu }) => {
  const { cart } = useContext(CartContext);
  return (
    <header className="h-[70px] px-[10px] lg:px-[50px] lg:h-[100px] bg-white fixed top-0 left-0 z-[99] transition-all duration-300 w-full shadow-[0px_8px_24px_rgba(150,158,166,0.2)]  ">
      <div className=" h-full lg:max-w-[1620px] mx-auto flex items-center justify-between w-full">
        <div className="lg:hidden" onClick={() => onOpenMenu()}>
          <BiMenuAltLeft size={22} />
        </div>
        <Link
          to={"/"}
          className="font-semibold text-[22px] flex flex-1 justify-center lg:hidden cursor-pointer"
        >
          SSSTUTER
        </Link>
        <div className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[15.6px]">
            <Link to={"/"}>
              <li className="nav-underline cursor-pointer relative  font-semibold">
                TRANG CHỦ
              </li>
            </Link>
            <li className=" nav-underline cursor-pointer relative ">NAM</li>
            <li className=" nav-underline cursor-pointer relative ">NỮ</li>
            <li className=" nav-underline cursor-pointer relative ">LIÊN HỆ</li>
          </ul>
        </div>
        <Link to={"/"} className="hidden lg:flex justify-center flex-1">
          <img src={Logo} alt="logo" />
        </Link>
        <div className="flex items-center gap-[10px] lg:gap-9 ">
          <div>
            <BiSearch className="size-5 lg:size-6" />
          </div>
          <div>
            <BiHeart className="size-5 lg:size-6" />
          </div>
          <Link to={"/cart"} className="relative">
            <BiShoppingBag className="size-5 lg:size-6" />
            <div className="absolute flex text-[13px] bg-black w-[18px] h-[18px] rounded-[50%] items-center justify-center text-white right-[-8px] top-[-6px] ">
              {cart.length ? cart.length : 0}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
