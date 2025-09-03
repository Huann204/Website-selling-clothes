import React from "react";
import {
  BiHeart,
  BiMenuAltLeft,
  BiSearch,
  BiShoppingBag,
} from "react-icons/bi";
import Logo from "../assets/images/logo.svg";
const Header = () => {
  return (
    <header className="h-[70px] px-[10px] lg:px-[50px] lg:h-[100px] bg-white fixed top-0 left-0 z-999 transition-all duration-300 w-full shadow-[0px_8px_24px_rgba(150,158,166,0.2)] lg:max-w-[1620px] ">
      <div className=" h-full flex items-center justify-between w-full">
        <div className="lg:hidden">
          <BiMenuAltLeft size={22} />
        </div>
        <div className="font-semibold text-[22px] ml-10 lg:hidden">
          SSSTUTER
        </div>
        <div className="hidden lg:block">
          <ul className="flex items-center gap-9 text-[15.6px]">
            <li className="font-semibold cursor-pointer">TRANG CHỦ</li>
            <li className="cursor-pointer">NAM</li>
            <li className="cursor-pointer">NỮ</li>
            <li className="cursor-pointer">LIÊN HỆ</li>
          </ul>
        </div>
        <div className="hidden lg:flex lg:items-center lg:justify-center lg:absolute w-full">
          <img src={Logo} alt="logo" />
        </div>
        <div className="flex items-center gap-[10px] lg:gap-9 ">
          <div>
            <BiSearch className="size-5 lg:size-6" />
          </div>
          <div>
            <BiHeart className="size-5 lg:size-6" />
          </div>
          <div>
            <BiShoppingBag className="size-5 lg:size-6" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
