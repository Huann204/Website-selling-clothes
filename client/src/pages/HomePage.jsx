import React from "react";
import AnnouncementBar from "../components/AnnouncementBar";
import HeroSection from "../components/HeroSection";
import GenderBanner from "../components/GenderBanner";
import NewArrivals from "../components/NewArrivals";

const HomePage = () => {
  return (
    <div>
      <AnnouncementBar />
      <HeroSection />
      <GenderBanner />
      <NewArrivals />
    </div>
  );
};

export default HomePage;
