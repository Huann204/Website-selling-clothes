import React from "react";
import Lottie from "lottie-react";
import Error404 from "./404 error page with cat.json";
const NotFound = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Lottie
          animationData={Error404}
          loop={true}
          style={{ width: 300, height: 300 }}
        />
        <h1 className="text-xl font-bold mt-5">Oops! Trang không tồn tại</h1>
      </div>
    </div>
  );
};

export default NotFound;
