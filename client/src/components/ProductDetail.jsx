import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AnnouncementBar from "./AnnouncementBar";
import { LuMinus, LuPlus } from "react-icons/lu";
import ProductList from "./ProductList";
import NewArrivals from "./NewArrivals";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import sizeHim from "../assets/images/Size/sizehim.webp";
const ProductDetail = () => {
  const [products, setProducts] = useState({});
  const { slugId } = useParams();
  const navigate = useNavigate();
  const [seeMore, setSeeMore] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [logicImg, setLogicImg] = useState(null);
  const [qty, setQty] = useState(1);
  const colorMap = {
    đen: "#000000",
    trắng: "#FFFFFF",
    đỏ: "#FF0000",
    xanh: "#0000FF",
    vàng: "#FFFF00",
    hồng: "#FFC0CB",
    tím: "#800080",
    cam: "#FFA500",
    nâu: "#8B4513",
    xám: "#808080",
    "xanh lá": "#008000",
    be: "#F5F5DC",
    kem: "#FFFDD0",
    ghi: "#DCDCDC",
    navy: "#000080",
    olive: "#808000",
    than: "#36454F",
    rêu: "#556B2F",
    bạc: "#C0C0C0",
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const id = slugId.split("-").pop(); // lấy id từ slug
        const response = await fetch(
          `https://website-selling-clothes-be-production.up.railway.app/api/products/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProduct();
  }, [slugId]);

  useEffect(() => {
    if (products) {
      setLogicImg(products?.thumbnail?.src);
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [products]);

  const dec = () => setQty((n) => Math.max(1, n - 1));
  const inc = () => setQty((n) => n + 1);

  const formatPrice = (v) =>
    new Intl.NumberFormat("vi-VN").format(Number(v)) + "₫";

  const isActiveThumb = (src) => src === logicImg;
  const handleSize = (sz) => {
    setSelectedSize(sz);
  };
  const activeVariant = products?.variants?.find(
    (v) => v.color.name === selectedColor
  );
  if (!products) {
    return <div className="p-10 text-center">Sản phẩm không tồn tại</div>;
  }
  const { addToCart } = useContext(CartContext);
  const addCardToast = () => {
    if (!selectedColor) {
      toast.info("Bạn vui lòng chọn màu sắc");
      return;
    }
    if (!selectedSize) {
      toast.info("Bạn vui lòng chọn size");
      return;
    }
    addToCart(products, selectedColor, selectedSize, qty);
    toast.success("Đã thêm vào giỏ hàng");
  };
  const buyToast = () => {
    if (!selectedColor) {
      toast.info("Bạn vui lòng chọn màu sắc");
      return;
    }
    if (!selectedSize) {
      toast.info("Bạn vui lòng chọn size");
      return;
    }
    addToCart(products, selectedColor, selectedSize, qty);
    navigate("/cart");
  };
  if (!products) return <p>⏳ Đang tải sản phẩm...</p>;
  return (
    <div>
      <AnnouncementBar />
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-10">
          {/* Left: Images */}
          <div className="grid grid-cols-10 lg:col-span-6 gap-2">
            {/* Thumbnails */}
            <div className="col-span-2">
              {products?.images?.map((img, index) => {
                return (
                  <button
                    key={img._id}
                    type="button"
                    className={`mb-1 block border ${
                      isActiveThumb(img.src)
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    onClick={() => setLogicImg(img.src)}
                    aria-label={`Xem ảnh ${index + 1}`}
                  >
                    <img
                      className="object-cover"
                      src={img.src}
                      loading="lazy"
                      alt="img"
                    />
                  </button>
                );
              })}
            </div>

            {/* Main image */}
            <div className="col-span-8">
              <img
                className="object-cover w-full h-auto"
                src={logicImg}
                alt="thumbnail"
              />
            </div>
          </div>
          {/* Right: Info/Actions */}
          <div className="text-[22px] p-[22px] lg:text-[26px] mt-4 lg:col-span-4 lg:sticky lg:top-[90px] h-fit">
            <h3 className="font-semibold">{products?.title}</h3>

            <div className="font-semibold mt-2">
              <span className="">
                {formatPrice(products?.salePrice || products?.price)}
              </span>
            </div>

            {/* Colors (giữ UI như cũ) */}
            <div className="mt-[22px]">
              <div className="text-[11px] lg:text-[13px] font-medium mb-[11px]">
                MÀU SẮC
              </div>
              <div className="flex items-center justify-start">
                {products?.variants?.map((c, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedColor(c.color.name)}
                    aria-label={`Màu ${c.color.name}`}
                    className={`items-center border-2 ${
                      selectedColor === c.color.name
                        ? "border-black"
                        : "border-[#8d8d8d]"
                    } cursor-pointer flex justify-center mr-[11px] w-[30px] h-[30px] rounded-[50%]`}
                  >
                    <span
                      className="h-5 w-5 rounded-[50%]"
                      style={{ backgroundColor: colorMap[c.color.name] }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mt-[22px]">
              <div className="text-[11px] lg:text-[13px] font-medium mb-[11px]">
                KÍCH CỠ
              </div>

              <div className="flex items-center justify-start text-[11px] lg:text-[13px]">
                {activeVariant ? (
                  activeVariant?.sizes.map((s) => (
                    <button
                      key={s._id}
                      type="button"
                      className={`uppercase items-center border-2 ${
                        selectedSize === s.size
                          ? "border-black"
                          : "border-[#8d8d8d]"
                      } cursor-pointer flex justify-center mr-[11px] w-[30px] h-[30px] rounded-[50%] ${
                        s.stock === 0 ? "opacity-40 cursor-not-allowed" : ""
                      }`}
                      aria-label={`Chọn size ${s.size.toUpperCase()}`}
                      onClick={() => handleSize(s.size)}
                      disabled={s.stock === 0}
                    >
                      <span className="h-5 w-5 flex items-center justify-center rounded-[50%]">
                        {s.size}
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    Vui lòng chọn màu trước
                  </p>
                )}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-[22px]">
              <div className="text-[11px] lg:text-[13px] font-medium mb-[11px]">
                SỐ LƯỢNG
              </div>
              <div className="flex text-[11px] lg:text-[13px]">
                <button
                  type="button"
                  className="h-[30px] w-[30px] border-2 border-[#8d8d8d] flex items-center justify-center cursor-pointer"
                  onClick={dec}
                  aria-label="Giảm số lượng"
                >
                  <LuMinus />
                </button>
                <div className="h-[30px] w-[90px] border-y-2 border-[#8d8d8d] flex items-center justify-center">
                  {qty}
                </div>
                <button
                  type="button"
                  className="h-[30px] w-[30px] border-2 border-[#8d8d8d] flex items-center justify-center cursor-pointer"
                  onClick={inc}
                  aria-label="Tăng số lượng"
                >
                  <LuPlus />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-[22px] text-xs lg:text-[13px] text-white flex gap-5 font-semibold">
              <button
                type="button"
                className="bg-black py-[7.7px] px-[16.5px] cursor-pointer"
                onClick={() => addCardToast()}
              >
                THÊM VÀO GIỎ HÀNG
              </button>
              <button
                type="button"
                className="bg-black py-[7.7px] px-[16.5px] cursor-pointer"
                onClick={() => buyToast()}
              >
                MUA NGAY
              </button>
            </div>
          </div>
          {/* Description / Policy */}
          <div className="p-[22px] text-xs lg:text-[13px] lg:col-span-6 lg:mt-14 text-[rgba(0,0,0,.8)]">
            <div className="font-semibold pb-[30px] text-base lg:text-xl">
              CHI TIẾT SẢN PHẨM
            </div>

            <div className="font-semibold">{products?.description}</div>

            <div className="py-[10px] font-semibold text-[rgba(0,0,0,.8)]">
              THÔNG TIN SẢN PHẨM
            </div>

            <p>--</p>

            <div>Chất liệu: {products?.form}</div>
            <div>Xuất xứ: {products?.origin}</div>

            <div className="py-[10px] font-semibold text-[rgba(0,0,0,.8)] uppercase">
              ✨ Quy định đổi trả hàng khi mua
            </div>

            <div className="text-xs lg:text-[13px]">
              <p>- Mỗi hoá đơn chỉ được đổi một lần</p>
              <p>- Bạn có thể đổi hàng trong 14 ngày kể từ ngày mua hàng</p>
              <p>
                - Mặt hàng phải ở trong tình trạng ban đầu, còn nguyên tem mác,
                chưa qua sử dụng, chưa giặt giũ và có hoá đơn tương ứng
              </p>
              <p>
                - Bạn vui lòng giữ lại hoá đơn để được đổi hàng. Bạn có thể xuất
                trình hóa đơn mua hàng dưới dạng giấy in hoặc định dạng điện tử
                trên điện thoại di động của bạn
              </p>
              <p>
                - SSSTUTTER không áp dụng trả hàng - hoàn tiền dưới mọi hình
                thức (cả trong trường hợp hoá đơn đã mua có giá trị cao hơn hoá
                đơn đổi)
              </p>
            </div>

            {seeMore && (
              <>
                <p>
                  - Với các sản phẩm giảm dưới 30%, SSSTUTTER sẽ hỗ trợ đổi hàng
                  và số lượng sản phẩm đổi nhiều hơn sản phẩm trả, miễn tổng hoá
                  đơn đổi bằng hoặc lớn hơn. Trong trường hợp hoá đơn đổi cao
                  hơn, bạn vui lòng bù thêm phần chênh lệch.
                </p>
                <p>
                  - Với các sản phẩm giảm dưới 30%, SSSTUTTER sẽ hỗ trợ đổi hàng
                  và số lượng sản phẩm đổi nhiều hơn sản phẩm trả, miễn tổng hoá
                  đơn đổi bằng hoặc lớn hơn. Trong trường hợp hoá đơn đổi cao
                  hơn, bạn vui lòng bù thêm phần chênh lệch.
                </p>
                <p>
                  - Với các sản phẩm giảm trên 30% và sản phẩm phụ kiện,
                  SSSTUTTER sẽ không hỗ trợ đổi hàng, - Quà tặng không được đổi
                  hoặc qui ra tiền, voucher.
                </p>

                <div className="py-[10px] font-semibold text-[rgba(0,0,0,.8)] uppercase">
                  ✨ NHỮNG ĐIỀU LƯU Ý KHI BẢO QUẢN ÁO:
                </div>
                <div className="text-xs lg:text-[13px]">
                  <p>
                    Không để áo ở các nơi ẩm và nên giặt áo ngay sau khi sử dụng
                    để tránh ẩm mốc;
                  </p>
                  <p>Không giặt chung áo trắng với quần áo màu;</p>
                  <p>
                    Không nên giặt trong nước nóng quá 40 độ để tránh áo bị giãn
                    và mất form;
                  </p>
                  <p>
                    Không đổ trực tiếp bột giặt lên quần áo khi giặt để tránh áo
                    bị phai và loang màu;
                  </p>
                  <p>Không ngâm áo trong xà phòng quá lâu để tránh bạc màu.</p>
                </div>
                <img src={sizeHim} className="object-cover w-full" alt="" />
              </>
            )}

            <div className="flex justify-center items-center mt-2">
              <button
                type="button"
                className="py-[7.7px] px-[16.5px] bg-black text-white text-xs font-semibold"
                onClick={() => setSeeMore((v) => !v)}
              >
                {seeMore ? "THU GỌN" : "XEM THÊM"}
              </button>
            </div>
          </div>
        </div>
        {/* Sản phẩm tường tự */}
        <div className="mt-8">
          <div className="text-base font-semibold mb-[-30px] lg:text-xl">
            SẢN PHẨM TƯƠNG TỰ
          </div>
          {products?.category && products?.subcategory && (
            <ProductList
              category={products.category}
              subcategory={products.subcategory}
            />
          )}
        </div>
        <div className="mt-8">
          <div className="text-base font-semibold mb-[-30px] lg:text-xl">
            SẢN PHẨM ĐƯỢC YÊU THÍCH
          </div>
          <NewArrivals />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
