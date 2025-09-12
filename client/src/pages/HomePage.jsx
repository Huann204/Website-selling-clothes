import React from "react";
import AnnouncementBar from "../components/AnnouncementBar";
import HeroSection from "../components/HeroSection";
import GenderBanner from "../components/GenderBanner";
import NewArrivals from "../components/NewArrivals";
import PolicySection from "../components/PolicySection";
import ProductList from "../components/ProductList";

const HomePage = () => {
  return (
    <div>
      <AnnouncementBar />
      <HeroSection />
      <GenderBanner />
      <NewArrivals title="WHAT'S NEW" />
      <PolicySection />
      <ProductList title="ÁO THUN" subcategory={"ao-thun"} limit={8} />
      <ProductList title="ÁO SƠ MI" subcategory={"ao-so-mi"} limit={8} />
    </div>
  );
};

export default HomePage;
