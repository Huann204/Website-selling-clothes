import React, { useContext, useEffect, useState } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import { RiVisaLine } from "react-icons/ri";
import { IoWalletOutline } from "react-icons/io5";
import { BsTruck } from "react-icons/bs";
import { CartContext } from "@/context/CartContext";
import { LuMinus, LuPlus } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { calcGHNFee } from "@/utils/ghn";
import {
  getGHNProvinces,
  getGHNDistricts,
  getGHNWards,
} from "@/utils/ghn-location";
import { useQuery } from "@tanstack/react-query";
import API_URL from "@/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CheckoutPage = () => {
  const navigate = useNavigate();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [shippingFee, setShippingFee] = useState(0); // State để lưu phí ship
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "",
  });

  useEffect(() => {
    async function calculateShipping() {
      if (selectedDistrict && selectedWard) {
        try {
          const fee = await calcGHNFee(selectedDistrict, selectedWard, 1000);
          setShippingFee(fee);
        } catch (error) {
          console.error("Error calculating shipping fee:", error);
          setShippingFee(0); // Fallback to default
        }
      }
    }
    calculateShipping();
  }, [selectedDistrict, selectedWard]);
  const { data: provinces = [] } = useQuery({
    queryKey: ["ghnProvinces"],
    queryFn: getGHNProvinces,
  });

  const { data: districts = [] } = useQuery({
    queryKey: ["ghnDistricts", selectedProvince],
    queryFn: () => getGHNDistricts(selectedProvince),
    enabled: !!selectedProvince,
  });

  const { data: wards = [] } = useQuery({
    queryKey: ["ghnWards", selectedDistrict],
    queryFn: () => getGHNWards(selectedDistrict),
    enabled: !!selectedDistrict,
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Vui lòng nhập họ tên";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (
      !/^(03|05|07|08|09)[0-9]{8}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!selectedProvince) {
      newErrors.province = "Vui lòng chọn tỉnh/thành phố";
    }

    if (!selectedDistrict) {
      newErrors.district = "Vui lòng chọn quận/huyện";
    }

    if (!selectedWard) {
      newErrors.ward = "Vui lòng chọn phường/xã";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Vui lòng nhập địa chỉ cụ thể";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Vui lòng chọn phương thức thanh toán";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    try {
      const selectedProvinceObj = provinces.find(
        (p) => p.ProvinceID == selectedProvince
      );
      const selectedDistrictObj = districts.find(
        (d) => d.DistrictID == selectedDistrict
      );
      const selectedWardObj = wards.find((w) => w.WardCode == selectedWard);
      const orderData = {
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: {
            province: selectedProvinceObj?.ProvinceName || "",
            district: selectedDistrictObj?.DistrictName || "",
            ward: selectedWardObj?.WardName || "",
            street: formData.address,
            // Thêm districtId và wardCode cho GHN
            districtId: selectedDistrict,
            wardCode: selectedWard,
          },
        },
        items: cart.map((item) => ({
          productId: item.productId,
          title: item.title,
          slug: item.slug,
          thumbnail: item.thumbnail,
          color: item.color,
          size: item.size,
          price: item.price,
          qty: item.qty,
        })),
        payment: {
          method: formData.paymentMethod,
          status: "pending",
        },
        shipping: {
          fee: shippingFee,
          status: "preparing",
        },
        discount: 0,
        total: totalPrice,
        grandTotal: totalPrice + shippingFee,
        status: "pending",
      };

      const response = await axios.post(
        `${API_URL}/api/admin/orders`,
        orderData
      );

      const result = response.data;
      const orderId = result._id;
      if (formData.paymentMethod === "vnpay") {
        const vnpayResponse = await axios.post(`${API_URL}/api/pay`, {
          orderId: orderId,
          amount: orderData.grandTotal,
          orderInfo: `Thanh toán đơn hàng ${orderId}`,
        });
        const vnpayUrl = vnpayResponse.data;
        window.location.href = vnpayUrl.paymentUrl;
        setCart([]);
        return;
      }
      if (formData.paymentMethod === "cod") {
        navigate(`/order-success/${orderId}`);
        setCart([]);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!");
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
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-10 lg:gap-4 mt-[30px] items-stretch"
        >
          <div className="col-span-10 lg:col-span-5 ">
            <div className="border border-[#ccc] p-5 mb-10 shadow-[0_8px_24px_hsla(210,8%,62%,0.2)]">
              <h3 className="font-bold mb-5">THÔNG TIN GIAO HÀNG</h3>
              <div className="text-[12.5px] lg:text-[15px]">
                <div className="mb-5">
                  <input
                    type="text"
                    className={`py-[10px] px-[15px] border w-full ${
                      errors.fullName ? "border-red-500" : "border-[#ccc]"
                    }`}
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="*Họ và tên"
                    aria-label="Họ và tên"
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div className="mb-5">
                  <input
                    type="email"
                    className={`py-[10px] px-[15px] border w-full ${
                      errors.email ? "border-red-500" : "border-[#ccc]"
                    }`}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="*Email"
                    aria-label="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div className="mb-5">
                  <input
                    type="tel"
                    className={`py-[10px] px-[15px] border w-full ${
                      errors.phone ? "border-red-500" : "border-[#ccc]"
                    }`}
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="*Số điện thoại"
                    aria-label="Số điện thoại"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                <div className="mb-5">
                  <div className="flex gap-2 justify-between">
                    <select
                      className={`border rounded p-1 h-[35px] w-[30%] ${
                        errors.province ? "border-red-500" : "border-[#ccc]"
                      }`}
                      value={selectedProvince}
                      onChange={(e) => {
                        const id = e.target.value;
                        setSelectedProvince(id);
                        setSelectedDistrict("");
                        setSelectedWard("");
                        // districts và wards sẽ tự động cập nhật qua useQuery
                        if (errors.province) {
                          setErrors((prev) => ({ ...prev, province: "" }));
                        }
                      }}
                      aria-label="Tỉnh/Thành phố"
                    >
                      <option value="">Chọn địa chỉ</option>
                      {provinces?.map((province) => (
                        <option
                          key={province.ProvinceID}
                          value={province.ProvinceID}
                        >
                          {province.ProvinceName}
                        </option>
                      ))}
                    </select>
                    <select
                      className={`border rounded p-1 h-[35px] w-[30%] ${
                        errors.district ? "border-red-500" : "border-[#ccc]"
                      }`}
                      value={selectedDistrict}
                      onChange={(e) => {
                        const id = e.target.value;
                        setSelectedDistrict(id);
                        setSelectedWard("");
                        // wards sẽ tự động cập nhật qua useQuery
                        if (errors.district) {
                          setErrors((prev) => ({ ...prev, district: "" }));
                        }
                      }}
                      aria-label="Quận/Huyện"
                    >
                      <option value="">*Quận/Huyện</option>
                      {districts &&
                        districts?.map((district) => (
                          <option
                            key={district.DistrictID}
                            value={district.DistrictID}
                          >
                            {district.DistrictName}
                          </option>
                        ))}
                    </select>
                    <select
                      className={`border rounded p-1 h-[35px] w-[30%] ${
                        errors.ward ? "border-red-500" : "border-[#ccc]"
                      }`}
                      value={selectedWard}
                      onChange={(e) => {
                        setSelectedWard(e.target.value);
                        if (errors.ward) {
                          setErrors((prev) => ({ ...prev, ward: "" }));
                        }
                      }}
                      aria-label="Phường/Xã"
                    >
                      <option value="">*Phường Xã</option>
                      {wards &&
                        wards?.map((ward) => (
                          <option key={ward.WardCode} value={ward.WardCode}>
                            {ward.WardName}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                {(errors.province || errors.district || errors.ward) && (
                  <div className="mb-3">
                    {errors.province && (
                      <p className="text-red-500 text-xs">{errors.province}</p>
                    )}
                    {errors.district && (
                      <p className="text-red-500 text-xs">{errors.district}</p>
                    )}
                    {errors.ward && (
                      <p className="text-red-500 text-xs">{errors.ward}</p>
                    )}
                  </div>
                )}
                <div className="mb-5">
                  <input
                    type="text"
                    className={`py-[10px] px-[15px] border w-full ${
                      errors.address ? "border-red-500" : "border-[#ccc]"
                    }`}
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="*Số nhà tên đường..."
                    aria-label="Địa chỉ cụ thể"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.address}
                    </p>
                  )}
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
                  <input
                    type="radio"
                    name="payment"
                    value="vnpay"
                    className="accent-black"
                    checked={formData.paymentMethod === "vnpay"}
                    onChange={(e) =>
                      handleInputChange("paymentMethod", e.target.value)
                    }
                  />
                  <div className="mx-[10px]">
                    <IoWalletOutline size={16} />
                  </div>
                  <span className="text-[11px] lg:text-[14px]">
                    Thanh toán bằng VNPAY
                  </span>
                </div>
                <div className="mb-5 py-[10px] px-[15px] border border-[#ccc] w-full flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    className="accent-black"
                    checked={formData.paymentMethod === "cod"}
                    onChange={(e) =>
                      handleInputChange("paymentMethod", e.target.value)
                    }
                    aria-label="Thanh toán khi giao hàng"
                  />
                  <div className="mx-[10px]">
                    <BsTruck size={16} />
                  </div>
                  <span className="text-[11px] lg:text-[14px]">
                    Thanh toán khi giao hàng
                  </span>
                </div>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.paymentMethod}
                  </p>
                )}
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
                        className="h-full object-cover"
                        alt={item.thumbnail}
                      />
                    </div>
                    <div className="flex flex-col lg:flex-row lg:flex-1 lg:items-center lg:justify-between">
                      <div>
                        <p className="my-2 ">{`${item.title} ${
                          item.color.charAt(0).toUpperCase() +
                          item.color.slice(1)
                        } - ${item.size}`}</p>
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
                    <span>Phí ship</span>{" "}
                    <span>{shippingFee.toLocaleString()} VNĐ</span>
                  </div>
                  <div className="flex justify-between mb-5 font-semibold">
                    <span>Thành tiền</span>{" "}
                    <span>
                      {(totalPrice + shippingFee).toLocaleString()} VNĐ
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={cart.length === 0}
                    className={`text-white text-center w-full py-[11px] text-[11px] lg:text-[14px] font-semibold transition-colors ${
                      cart.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black hover:bg-gray-800"
                    }`}
                  >
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
