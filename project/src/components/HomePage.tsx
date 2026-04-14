"use client";

import ContactSection from "@components/ContactSection";
import DotPattern from "@components/DotPattern";
import FAQSection from "@components/FAQSection";
import HeroSection from "@components/HeroSection";
import PlansSection from "@components/PlansSection";
import PortfolioSection from "@components/PortfolioSection";
import ServicesSection from "@components/ServicesSection";
import WhyChooseSection from "@components/WhyChooseSection";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-white">
      <DotPattern />
      <div className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <WhyChooseSection />
        <PlansSection />
        <PortfolioSection />
        <FAQSection />
        <ContactSection />
      </div>
    </div>
  );
}
