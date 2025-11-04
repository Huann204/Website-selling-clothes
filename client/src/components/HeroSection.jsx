import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Hero1 from "@/assets/images/Hero/Hero1.jpeg";
import Hero2 from "@/assets/images/Hero/Hero2.jpeg";
import Hero3 from "@/assets/images/Hero/Hero3.jpeg";
import Hero4 from "@/assets/images/Hero/Hero4.jpeg";

import Hero1pc from "@/assets/images/Hero/Hero1-1.png";
import Hero2pc from "@/assets/images/Hero/Hero2-2.jpeg";
import Hero3pc from "@/assets/images/Hero/Hero3-3.jpeg";
import Hero4pc from "@/assets/images/Hero/Hero4-4.jpeg";

const slides = [
  { mobile: Hero1, desktop: Hero1pc },
  { mobile: Hero2, desktop: Hero2pc },
  { mobile: Hero3, desktop: Hero3pc },
  { mobile: Hero4, desktop: Hero4pc },
];

const HeroSection = () => {
  return (
    <Splide
      options={{
        type: "loop",
        autoplay: true,
        interval: 3000,
        speed: 800,
        arrows: false,
        pagination: true,
      }}
      className="w-full mb-10"
    >
      {slides.map((img, index) => (
        <SplideSlide key={index}>
          <div className="w-full lg:hidden">
            <img
              src={img.mobile}
              alt={`Slide ${index + 1}`}
              className="w-full"
            />
          </div>
          <div className="hidden lg:block w-full">
            <img
              src={img.desktop}
              alt={`Slide ${index + 1}`}
              className="w-full"
            />
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default HeroSection;
