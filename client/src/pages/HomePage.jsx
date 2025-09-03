import React from "react";
import AnnouncementBar from "../components/AnnouncementBar";
import HeroSection from "../components/HeroSection";
import GenderBanner from "../components/GenderBanner";

const HomePage = () => {
  return (
    <div>
      <AnnouncementBar />
      <HeroSection />
      <GenderBanner />
    </div>
  );
};

export default HomePage;
