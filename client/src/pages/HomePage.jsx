import React, { useEffect } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";
import GenderBanner from "@/components/GenderBanner";
import NewArrivals from "@/components/NewArrivals";
import PolicySection from "@/components/PolicySection";
import TopSellingList from "@/components/TopSellingList";

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
