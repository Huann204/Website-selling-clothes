import { useEffect } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const NavMenu = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

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
          <li className="mb-[10px]">
            <Link to="/" onClick={onClose} className="block">
              TRANG CHỦ
            </Link>
          </li>
          <li className="mb-[10px]">
            <Link to="/category/for-him" onClick={onClose} className="block">
              NAM
            </Link>
          </li>
          <li className="mb-[10px]">
            <Link to="/category/for-her" onClick={onClose} className="block">
              NỮ
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={onClose} className="block">
              LIÊN HỆ
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
