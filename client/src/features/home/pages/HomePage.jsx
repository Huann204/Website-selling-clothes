import React, { useEffect } from "react";
import AnnouncementBar from "@layouts/DefaultLayout/components/AnnouncementBar";
import HeroSection from "@home/components/HeroSection";
import GenderBanner from "@home/components/GenderBanner";
import NewArrivals from "@home/components/NewArrivals";
import PolicySection from "@home/components/PolicySection";
import TopSellingList from "@home/components/TopSellingList";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <AnnouncementBar />
      <HeroSection />
      <GenderBanner />
      <NewArrivals title="WHAT'S NEW" />
      <PolicySection />
      <TopSellingList title="BEST SELLERS" limit={8} homepage />
    </div>
  );
};

export default HomePage;
