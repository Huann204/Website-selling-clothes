import React, { useContext, useEffect, useState } from "react";
import New3 from "../assets/images/NewArrivals/New3-3.jpeg";
import New4 from "../assets/images/NewArrivals/New4-4.jpeg";
import { LuMinus, LuPlus } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import AnnouncementBar from "../components/AnnouncementBar";
import { CartContext } from "../context/CartContext";

const CartPage = () => {
  const { cart, setCart } = useContext(CartContext);
  console.log(cart);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  // const { cart, total, removeFromCart, updateQty } = useContext(CartContext);
  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "Stone Short - blue - xl",
  //     price: 194000,
  //     qty: 3,
  //     image: New3,
  //   },
  //   {
  //     id: 2,
  //     name: "Stone Short - red - m",
  //     price: 210000,
  //     qty: 1,
  //     image: New4,
  //   },
  //   {
  //     id: 3,
  //     name: "Stone Short - black - l",
  //     price: 180000,
  //     qty: 2,
  //     image: New3,
  //   },
  // ]);

  // tăng số lượng
  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  //  giảm số lượng (không cho nhỏ hơn 1)
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  // xóa sản phẩm
  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  //  tính tổng tiền
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div>
      <AnnouncementBar />
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 ">
        {/* Cột bên trái */}
        <div className="text-sm lg:col-span-3 my-[30px] shadow-[0_8px_24px_hsla(210,8%,62%,0.2)] p-5 lg:sticky lg:top-[100px] h-fit">
          <p className="mb-[10px] ">
            Bạn đang có {cart.length} sản phẩm trong giỏ hàng
          </p>
          <div className="flex justify-between items-center py-[10px] mb-[10px]">
            <p>Thành tiền</p>
            <span className="text-[22px] font-semibold">
              {totalPrice.toLocaleString()} VNĐ
            </span>
          </div>
          <div className="text-center">
            {cart.length > 0 && (
              <button className="bg-black w-full text-white py-2 px-4 rounded mb-4">
                Đặt hàng
              </button>
            )}
            <button className="bg-black w-full text-white py-2 px-4 rounded">
              Tiếp tục mua hàng
            </button>
          </div>
        </div>

        {/* Cột bên phải */}
        <div className=" lg:col-span-7 lg:mt-[30px] ">
          {cart.length === 0 && (
            <p className="text-center my-10">Giỏ hàng trống</p>
          )}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex text-sm lg:text-base items-center lg:gap-5 mb-5"
            >
              <div className="mr-5 h-[150px] ">
                <img
                  src={item.thumbnail}
                  className="h-full"
                  alt={item.thumbnail}
                />
              </div>
              <div className="flex flex-col lg:flex-row lg:flex-1 lg:items-center lg:justify-between">
                <div>
                  <p className="my-2 ">{item.title}</p>
                </div>
                <span>{item.price.toLocaleString()} VNĐ</span>
                <div className="flex my-3">
                  <div
                    onClick={() => decreaseQty(item.id)}
                    className="h-[30px] w-[30px] border-2 border-[#8d8d8d] flex items-center justify-center cursor-pointer"
                  >
                    <LuMinus />
                  </div>
                  <div className="h-[30px] w-[90px] border-y-2 border-[#8d8d8d] flex items-center justify-center">
                    {item.qty}
                  </div>
                  <div
                    onClick={() => increaseQty(item.id)}
                    className="h-[30px] w-[30px] border-2 border-[#8d8d8d] flex items-center justify-center cursor-pointer"
                  >
                    <LuPlus />
                  </div>
                </div>
                <div
                  onClick={() => removeItem(item.id)}
                  className="cursor-pointer text-red-500"
                >
                  <FaRegTrashAlt size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
