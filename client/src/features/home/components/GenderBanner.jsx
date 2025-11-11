import React from "react";
import Him from "@/assets/images/GenderBanner/Him.jpeg";
import Her from "@/assets/images/GenderBanner/Her.jpeg";
import { Link } from "react-router-dom";
const GenderBanner = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Link to={"/category/for-him"}>
        <img
          src={Him}
          className="object-cover hover:brightness-[80%] cursor-pointer"
          alt="Him"
        />
      </Link>
      <Link to={"/category/for-her"}>
        <img
          src={Her}
          className="object-cover hover:brightness-[80%] cursor-pointer"
          alt="Her"
        />
      </Link>
    </div>
  );
};

export default GenderBanner;
