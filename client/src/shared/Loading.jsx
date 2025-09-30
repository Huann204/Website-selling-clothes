import React from "react";
import Lottie from "lottie-react";
import loading from "./Liquid 4 Dot Loader.json";
const Loading = () => {
  return (
    <div className=" flex flex-col items-center justify-center bg-white z-50">
      <div className="flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-60 lg:h-60">
        <Lottie animationData={loading} loop />
      </div>
      {/* <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mt-6 text-gray-700 animate-pulse">
        Đang tải ...
      </h1> */}
    </div>
  );
};

export default Loading;
