import React from "react";
import HeroSection from "./HeroSection";
import FeatureShowcase from "./FeatureShowcase";
import AppDownloadSection from "./AppDownloadSection";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <HeroSection />
      <FeatureShowcase />
      <AppDownloadSection />
      <Footer />
    </div>
  );
}
