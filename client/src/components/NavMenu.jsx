import { useEffect } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const NavMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);
  const handleNavigate = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <div
      className={` top-0 left-0 h-[100vh] w-full bg-white fixed inset-0 z-[1000]  pt-[30px]
                  transition-transform duration-500 ease-in-out
                  ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex justify-center">
        <div
          className="cursor-pointer px-3 absolute top-[30px] left-4"
          onClick={() => handleNavigate("/")}
        >
          <IoChevronBackOutline size={20} />
        </div>

        {/* Danh sách menu */}
        <ul className="text-[13px] text-center flex-1">
          <li
            className="mb-[10px] cursor-pointer"
            onClick={() => handleNavigate("/")}
          >
            TRANG CHỦ
          </li>
          <li
            className="mb-[10px] cursor-pointer"
            onClick={() => handleNavigate("/men")}
          >
            NAM
          </li>
          <li
            className="mb-[10px] cursor-pointer"
            onClick={() => handleNavigate("/women")}
          >
            NỮ
          </li>
          <li
            className="cursor-pointer"
            onClick={() => handleNavigate("/contact")}
          >
            LIÊN HỆ
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
