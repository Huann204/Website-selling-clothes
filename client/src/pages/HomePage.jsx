import React from "react";
import AnnouncementBar from "../components/AnnouncementBar";
import HeroSection from "../components/HeroSection";
import GenderBanner from "../components/GenderBanner";
import NewArrivals from "../components/NewArrivals";
import PolicySection from "../components/PolicySection";
import WeeklyBestSection from "../components/WeeklyBestSection";

const HomePage = () => {
  return (
    <div>
      <AnnouncementBar />
      <HeroSection />
      <GenderBanner />
      <NewArrivals />
      <PolicySection />
      <WeeklyBestSection />
    </div>
  );
};

export default HomePage;
