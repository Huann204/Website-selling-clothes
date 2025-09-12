import React, { useContext, useEffect, useState } from "react";
import AnnouncementBar from "./AnnouncementBar";
import { RiVisaLine } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";
import { BsTruck } from "react-icons/bs";
import { CartContext } from "../context/CartContext";
import { LuMinus, LuPlus } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
const CheckoutPage = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [SelectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    async function getProvinces() {
      const url = "https://provinces.open-api.vn/api/p/";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const cityInfo = await response.json();
        return setProvinces(cityInfo);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    getProvinces();
  }, []);
  const getDistricts = async (code) => {
    const url = `https://provinces.open-api.vn/api/p/${code}?depth=2`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setDistricts(data.districts || []);
    } catch (err) {
      console.error(err);
    }
  };
  const getWards = async (code) => {
    const url = `https://provinces.open-api.vn/api/d/${code}?depth=2`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setWards(data.wards || []);
    } catch (err) {
      console.error(err);
    }
  };

  const { cart, setCart } = useContext(CartContext);
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
    <>
      <AnnouncementBar />
      <div>
        <form className="grid grid-cols-10 lg:gap-4 mt-[30px] items-stretch">
          <div className="col-span-10 lg:col-span-5 ">
            <div className="border border-[#ccc] p-5 mb-10 shadow-[0_8px_24px_hsla(210,8%,62%,0.2)]">
              <h3 className="font-bold mb-5">THÔNG TIN GIAO HÀNG</h3>
              <div className="text-[12.5px] lg:text-[15px]">
                <div className="mb-5">
                  <input
                    type="text"
                    className="py-[10px] px-[15px] border border-[#ccc] w-full"
                    required
                    placeholder="*Họ và tên"
                  />
                </div>

                <div className="mb-5">
                  <input
                    type="text"
                    className="py-[10px] px-[15px] border border-[#ccc] w-full"
                    required
                    placeholder="*Email"
                  />
                </div>
                <div className="mb-5">
                  <input
                    type="text"
                    className="py-[10px] px-[15px] border border-[#ccc] w-full"
                    required
                    placeholder="*Số điện thoại"
                  />
                </div>
                <div className="mb-5">
                  <div className="flex gap-2 justify-between">
                    <select
                      name=""
                      id=""
                      className="border rounded border-[#ccc] p-1 h-[35px] lg:w-[30%]"
                      value={selectedProvince}
                      onChange={(e) => {
                        const code = e.target.value;
                        setSelectedProvince(code);
                        setSelectedDistrict("");
                        setSelectedWard("");
                        setDistricts([]);
                        setWards([]);
                        getDistricts(code);
                      }}
                    >
                      <option value="">Chọn địa chỉ</option>
                      {provinces?.map((city) => (
                        <option key={city.code} value={city.code}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    <select
                      name=""
                      id=""
                      className="border rounded border-[#ccc] p-1 h-[35px] lg:w-[30%]"
                      value={SelectedDistrict}
                      // onChange={(e) => setSelectedDistrict(e.target.value)}
                      onChange={(e) => {
                        const code = e.target.value;
                        setSelectedDistrict(code);
                        setSelectedWard("");
                        setWards([]);
                        getWards(code);
                      }}
                    >
                      <option value="">*Quận/Huyện</option>
                      {districts &&
                        districts?.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                    <select
                      name=""
                      id=""
                      className="border rounded border-[#ccc] p-1 h-[35px] lg:w-[30%]"
                      value={selectedWard}
                      onChange={(e) => setSelectedWard(e.target.value)}
                    >
                      <option value="">*Phường Xã</option>
                      {wards &&
                        wards?.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="mb-5">
                  <input
                    type="text"
                    className="py-[10px] px-[15px] border border-[#ccc] w-full"
                    required
                    placeholder="*Số nhà tên đường..."
                  />
                </div>
                <div className="mb-5">
                  <span className="text-[11px] lg:text-[14px]">
                    * là trường không được để trống
                  </span>
                </div>
              </div>
            </div>

            <div className="border border-[#ccc] p-5 mb-10 shadow-[0_8px_24px_hsla(210,8%,62%,0.2)]">
              <h3 className="font-bold mb-5">PHƯƠNG THỨC THANH TOÁN</h3>
              <div className="text-[12.5px] lg:text-[15px] ">
                <div className="mb-5 py-[10px] px-[15px] border border-[#ccc] w-full flex items-center">
                  <input type="radio" name="payment" />
                  <div className="mx-[10px]">
                    <RiVisaLine size={16} />
                  </div>
                  <span className="text-[11px] lg:text-[14px]">
                    Thanh toán thẻ (ATM, Visa, MasterCard)
                  </span>
                </div>
                <div className="mb-5 py-[10px] px-[15px] border border-[#ccc] w-full flex items-center">
                  <input type="radio" name="payment" />
                  <div className="mx-[10px]">
                    <IoWalletOutline size={16} />
                  </div>
                  <span className="text-[11px] lg:text-[14px]">
                    Thanh toán bằng ví ShoppePay
                  </span>
                </div>
                <div className="mb-5 py-[10px] px-[15px] border border-[#ccc] w-full flex items-center">
                  <input type="radio" name="payment" />
                  <div className="mx-[10px]">
                    <BsTruck size={16} />
                  </div>
                  <span className="text-[11px] lg:text-[14px]">
                    Thanh toán khi giao hàng
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-10 lg:col-span-5 ">
            <div className="border border-[#ccc] p-5 mb-10 shadow-[0_8px_24px_hsla(210,8%,62%,0.2)]">
              <div
                className={`lg:h-[420px] lg:overflow-y-auto`}
                style={{
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }}
              >
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
                        <p className="my-2 ">{`${item.title} ${item.color} - ${item.size}`}</p>
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
              <div>
                <div className="h-10 flex mb-5">
                  <input
                    type="text"
                    placeholder="Mã giảm giá"
                    className="flex-1 px-3 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <button className="w-[30%] bg-black text-white text-sm font-medium rounded-r-md hover:bg-gray-800 transition-colors">
                    Áp dụng
                  </button>
                </div>
                <div className="text-[13.2px] lg:text-[16px]">
                  <div className="flex justify-between font-semibold mb-5">
                    <span>Tổng</span>
                    {totalPrice.toLocaleString()} VNĐ
                  </div>
                  <div className="flex justify-between mb-5">
                    <span>Ưu đãi</span>
                    <span>- 0 VNĐ</span>
                  </div>
                  <div className="flex justify-between mb-5">
                    <span>Phí ship</span> <span>20,000 VNĐ</span>
                  </div>
                  <div className="flex justify-between mb-5 font-semibold">
                    <span>Thành tiền</span>{" "}
                    <span>{(totalPrice + 20000).toLocaleString()} VNĐ</span>
                  </div>
                  <button className="bg-black text-white text-center w-full py-[11px] text-[11px] lg:text-[14px] font-semibold">
                    HOÀN TẤT ĐƠN HÀNG
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutPage;
