import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import New1 from "../assets/images/NewArrivals/New1.jpeg";
import Newsub1 from "../assets/images/NewArrivals/New1-1.jpeg";
import New2 from "../assets/images/NewArrivals/New2.jpeg";
import Newsub2 from "../assets/images/NewArrivals/New2-2.jpeg";
import New3 from "../assets/images/NewArrivals/New3.jpeg";
import Newsub3 from "../assets/images/NewArrivals/New3-3.jpeg";
import New4 from "../assets/images/NewArrivals/New4.jpeg";
import Newsub4 from "../assets/images/NewArrivals/New4-4.jpeg";
import { FiShoppingCart } from "react-icons/fi";

const NewArrivals = () => {
  return (
    <div className="mt-5">
      <div className="bg-[#aabec6] p-[5%]">
        <h2 className="text-[33px] font-semibold text-center mb-20">
          WHAT'S NEW
        </h2>
        <Splide
          options={{
            perPage: 4,
            type: "loop",
            autoplay: true,
            interval: 3000,
            speed: 800,
            arrows: false,
            pagination: false,
            breakpoints: {
              1024: { perPage: 1 }, // Màn hình <= 1024: 2 items
            },
          }}
        >
          <SplideSlide>
            <div className="px-8 mb-4">
              <div className="group relative w-full overflow-hidden">
                <img
                  src={New1}
                  className="w-full object-cover transform transition-all duration-700 ease-in-out group-hover:scale-0 group-hover:opacity-0"
                  alt=""
                />

                <img
                  src={Newsub1}
                  className="absolute inset-0 w-full h-full object-cover transform scale-0 opacity-0 transition-all duration-700 ease-in-out group-hover:scale-100 group-hover:opacity-100"
                  alt=""
                />
              </div>

              <div className="text-center">
                <h3 className="mt-4 text-sm font-normal mb-[10px]">
                  Unum Tank
                </h3>
                <p className="text-lg font-semibold">
                  299,000
                  <span className="line-through ml-5 text-[#8d8d8d]">
                    499,000
                  </span>
                </p>
              </div>
              <div className="w-full hidden lg:flex justify-center ">
                <button className="relative group min-w-[140px] overflow-hidden">
                  <span
                    className="block px-4 py-2 bg-black text-white font-semibold text-[13px]
                 transition-all duration-300 ease-out
                 group-hover:translate-x-full group-hover:opacity-0"
                  >
                    CHỌN MUA
                  </span>

                  <span
                    className="pointer-events-none absolute inset-0
                 flex items-center justify-center
                 px-4 py-2 bg-black text-white font-semibold
                 transition-all duration-300 ease-out
                 -translate-x-full opacity-0
                 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <FiShoppingCart size={20} />
                  </span>
                </button>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="px-8 mb-4">
              <div className="group relative w-full overflow-hidden">
                <img
                  src={New2}
                  className="w-full object-cover transform transition-all duration-700 ease-in-out group-hover:scale-0 group-hover:opacity-0"
                  alt=""
                />

                <img
                  src={Newsub2}
                  className="absolute inset-0 w-full h-full object-cover transform scale-0 opacity-0 transition-all duration-700 ease-in-out group-hover:scale-100 group-hover:opacity-100"
                  alt=""
                />
              </div>

              <div className="text-center">
                <h3 className="mt-4 text-sm font-normal mb-[10px]">
                  Unum Tank
                </h3>
                <p className="text-lg font-semibold">
                  299,000
                  <span className="line-through ml-5 text-[#8d8d8d]">
                    499,000
                  </span>
                </p>
              </div>
              <div className="w-full hidden lg:flex justify-center ">
                <button className="relative group min-w-[140px] overflow-hidden">
                  <span
                    className="block px-4 py-2 bg-black text-white font-semibold text-[13px]
                 transition-all duration-300 ease-out
                 group-hover:translate-x-full group-hover:opacity-0"
                  >
                    CHỌN MUA
                  </span>

                  <span
                    className="pointer-events-none absolute inset-0
                 flex items-center justify-center
                 px-4 py-2 bg-black text-white font-semibold
                 transition-all duration-300 ease-out
                 -translate-x-full opacity-0
                 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <FiShoppingCart size={20} />
                  </span>
                </button>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="px-8 mb-4">
              <div className="group relative w-full overflow-hidden">
                <img
                  src={New3}
                  className="w-full object-cover transform transition-all duration-700 ease-in-out group-hover:scale-0 group-hover:opacity-0"
                  alt=""
                />

                <img
                  src={Newsub3}
                  className="absolute inset-0 w-full h-full object-cover transform scale-0 opacity-0 transition-all duration-700 ease-in-out group-hover:scale-100 group-hover:opacity-100"
                  alt=""
                />
              </div>

              <div className="text-center">
                <h3 className="mt-4 text-sm font-normal mb-[10px]">
                  Unum Tank
                </h3>
                <p className="text-lg font-semibold">
                  299,000
                  <span className="line-through ml-5 text-[#8d8d8d]">
                    499,000
                  </span>
                </p>
              </div>
              <div className="w-full hidden lg:flex justify-center ">
                <button className="relative group min-w-[140px] overflow-hidden">
                  <span
                    className="block px-4 py-2 bg-black text-white font-semibold text-[13px]
                 transition-all duration-300 ease-out
                 group-hover:translate-x-full group-hover:opacity-0"
                  >
                    CHỌN MUA
                  </span>

                  <span
                    className="pointer-events-none absolute inset-0
                 flex items-center justify-center
                 px-4 py-2 bg-black text-white font-semibold
                 transition-all duration-300 ease-out
                 -translate-x-full opacity-0
                 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <FiShoppingCart size={20} />
                  </span>
                </button>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="px-8 mb-4">
              <div className="group relative w-full overflow-hidden">
                <img
                  src={New4}
                  className="w-full object-cover transform transition-all duration-700 ease-in-out group-hover:scale-0 group-hover:opacity-0"
                  alt=""
                />

                <img
                  src={Newsub4}
                  className="absolute inset-0 w-full h-full object-cover transform scale-0 opacity-0 transition-all duration-700 ease-in-out group-hover:scale-100 group-hover:opacity-100"
                  alt=""
                />
              </div>

              <div className="text-center">
                <h3 className="mt-4 text-sm font-normal mb-[10px]">
                  Unum Tank
                </h3>
                <p className="text-lg font-semibold">
                  299,000
                  <span className="line-through ml-5 text-[#8d8d8d]">
                    499,000
                  </span>
                </p>
              </div>
              <div className="w-full hidden lg:flex justify-center ">
                <button className="relative group min-w-[140px] overflow-hidden">
                  <span
                    className="block px-4 py-2 bg-black text-white font-semibold text-[13px]
                 transition-all duration-300 ease-out
                 group-hover:translate-x-full group-hover:opacity-0"
                  >
                    CHỌN MUA
                  </span>

                  <span
                    className="pointer-events-none absolute inset-0
                 flex items-center justify-center
                 px-4 py-2 bg-black text-white font-semibold
                 transition-all duration-300 ease-out
                 -translate-x-full opacity-0
                 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <FiShoppingCart size={20} />
                  </span>
                </button>
              </div>
            </div>
          </SplideSlide>{" "}
          <SplideSlide>
            <div className="px-8 mb-4">
              <div className="group relative w-full overflow-hidden">
                <img
                  src={New1}
                  className="w-full object-cover transform transition-all duration-700 ease-in-out group-hover:scale-0 group-hover:opacity-0"
                  alt=""
                />

                <img
                  src={Newsub1}
                  className="absolute inset-0 w-full h-full object-cover transform scale-0 opacity-0 transition-all duration-700 ease-in-out group-hover:scale-100 group-hover:opacity-100"
                  alt=""
                />
              </div>

              <div className="text-center">
                <h3 className="mt-4 text-sm font-normal mb-[10px]">
                  Unum Tank
                </h3>
                <p className="text-lg font-semibold">
                  299,000
                  <span className="line-through ml-5 text-[#8d8d8d]">
                    499,000
                  </span>
                </p>
              </div>
              <div className="w-full hidden lg:flex justify-center ">
                <button className="relative group min-w-[140px] overflow-hidden">
                  <span
                    className="block px-4 py-2 bg-black text-white font-semibold text-[13px]
                 transition-all duration-300 ease-out
                 group-hover:translate-x-full group-hover:opacity-0"
                  >
                    CHỌN MUA
                  </span>

                  <span
                    className="pointer-events-none absolute inset-0
                 flex items-center justify-center
                 px-4 py-2 bg-black text-white font-semibold
                 transition-all duration-300 ease-out
                 -translate-x-full opacity-0
                 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <FiShoppingCart size={20} />
                  </span>
                </button>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="px-8 mb-4">
              <div className="group relative w-full overflow-hidden">
                <img
                  src={New2}
                  className="w-full object-cover transform transition-all duration-700 ease-in-out group-hover:scale-0 group-hover:opacity-0"
                  alt=""
                />

                <img
                  src={Newsub2}
                  className="absolute inset-0 w-full h-full object-cover transform scale-0 opacity-0 transition-all duration-700 ease-in-out group-hover:scale-100 group-hover:opacity-100"
                  alt=""
                />
              </div>

              <div className="text-center">
                <h3 className="mt-4 text-sm font-normal mb-[10px]">
                  Unum Tank
                </h3>
                <p className="text-lg font-semibold">
                  299,000
                  <span className="line-through ml-5 text-[#8d8d8d]">
                    499,000
                  </span>
                </p>
              </div>
              <div className="w-full hidden lg:flex justify-center ">
                <button className="relative group min-w-[140px] overflow-hidden">
                  <span
                    className="block px-4 py-2 bg-black text-white font-semibold text-[13px]
                 transition-all duration-300 ease-out
                 group-hover:translate-x-full group-hover:opacity-0"
                  >
                    CHỌN MUA
                  </span>

                  <span
                    className="pointer-events-none absolute inset-0
                 flex items-center justify-center
                 px-4 py-2 bg-black text-white font-semibold
                 transition-all duration-300 ease-out
                 -translate-x-full opacity-0
                 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <FiShoppingCart size={20} />
                  </span>
                </button>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="px-8 mb-4">
              <div className="group relative w-full overflow-hidden">
                <img
                  src={New3}
                  className="w-full object-cover transform transition-all duration-700 ease-in-out group-hover:scale-0 group-hover:opacity-0"
                  alt=""
                />

                <img
                  src={Newsub3}
                  className="absolute inset-0 w-full h-full object-cover transform scale-0 opacity-0 transition-all duration-700 ease-in-out group-hover:scale-100 group-hover:opacity-100"
                  alt=""
                />
              </div>

              <div className="text-center">
                <h3 className="mt-4 text-sm font-normal mb-[10px]">
                  Unum Tank
                </h3>
                <p className="text-lg font-semibold">
                  299,000
                  <span className="line-through ml-5 text-[#8d8d8d]">
                    499,000
                  </span>
                </p>
              </div>
              <div className="w-full hidden lg:flex justify-center ">
                <button className="relative group min-w-[140px] overflow-hidden">
                  <span
                    className="block px-4 py-2 bg-black text-white font-semibold text-[13px]
                 transition-all duration-300 ease-out
                 group-hover:translate-x-full group-hover:opacity-0"
                  >
                    CHỌN MUA
                  </span>

                  <span
                    className="pointer-events-none absolute inset-0
                 flex items-center justify-center
                 px-4 py-2 bg-black text-white font-semibold
                 transition-all duration-300 ease-out
                 -translate-x-full opacity-0
                 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <FiShoppingCart size={20} />
                  </span>
                </button>
              </div>
            </div>
          </SplideSlide>
          <SplideSlide>
            <div className="px-8 mb-4">
              <div className="group relative w-full overflow-hidden">
                <img
                  src={New4}
                  className="w-full object-cover transform transition-all duration-700 ease-in-out group-hover:scale-0 group-hover:opacity-0"
                  alt=""
                />

                <img
                  src={Newsub4}
                  className="absolute inset-0 w-full h-full object-cover transform scale-0 opacity-0 transition-all duration-700 ease-in-out group-hover:scale-100 group-hover:opacity-100"
                  alt=""
                />
              </div>

              <div className="text-center">
                <h3 className="mt-4 text-sm font-normal mb-[10px]">
                  Unum Tank
                </h3>
                <p className="text-lg font-semibold">
                  299,000
                  <span className="line-through ml-5 text-[#8d8d8d]">
                    499,000
                  </span>
                </p>
              </div>
              <div className="w-full hidden lg:flex justify-center ">
                <button className="relative group min-w-[140px] overflow-hidden">
                  <span
                    className="block px-4 py-2 bg-black text-white font-semibold text-[13px]
                 transition-all duration-300 ease-out
                 group-hover:translate-x-full group-hover:opacity-0"
                  >
                    CHỌN MUA
                  </span>

                  <span
                    className="pointer-events-none absolute inset-0
                 flex items-center justify-center
                 px-4 py-2 bg-black text-white font-semibold
                 transition-all duration-300 ease-out
                 -translate-x-full opacity-0
                 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <FiShoppingCart size={20} />
                  </span>
                </button>
              </div>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
  );
};

export default NewArrivals;
