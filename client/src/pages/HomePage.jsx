import React, { useEffect } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSection from "@/components/HeroSection";
import GenderBanner from "@/components/GenderBanner";
import NewArrivals from "@/components/NewArrivals";
import PolicySection from "@/components/PolicySection";
import TopSellingList from "@/components/TopSellingList";
import CustomerReviews from "@/components/CustomerReviews";
import BrandValues from "@/components/BrandValues";
import NewsletterSignup from "@/components/NewsletterSignup";

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
      <BrandValues />
      <CustomerReviews />
      <NewsletterSignup />
    </div>
  );
};

export default HomePage;
