import { useEffect } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

const NavMenu = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);
  const Nav = [
    { name: "Trang chủ", to: "/" },
    { name: "Nam", to: "/category/for-him" },
    { name: "Nữ", to: "/category/for-her" },
    { name: "Tra cứu đơn hàng", to: "/tracking" },
    { name: "Liên Hệ", to: "/contact" },
  ];
  return (
    <div
      className={` top-0 left-0 h-[100vh] w-full bg-white fixed inset-0 z-[1000]  pt-[30px]
                  transition-transform duration-500 ease-in-out
                  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex justify-center">
        <div
          className="cursor-pointer px-3 absolute top-[30px] left-4"
          onClick={() => onClose()}
        >
          <IoChevronBackOutline size={20} />
        </div>

        {/* Danh sách menu */}
        <ul className="text-[13px] text-center flex-1">
          {Nav.map((item, index) => (
            <li key={index} className="mb-6 uppercase">
              <NavLink
                to={item.to}
                onClick={() => onClose()}
                className={({ isActive }) =>
                  `nav-underline cursor-pointer relative ${
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
    </div>
  );
};

export default NavMenu;
