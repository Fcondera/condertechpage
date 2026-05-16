"use client";

import AboutSection from "@components/AboutSection";
import ContactSection from "@components/ContactSection";
import DotPattern from "@components/DotPattern";
import FAQSection from "@components/FAQSection";
import HeroSection from "@components/HeroSection";
import IndustriesSection from "@components/IndustriesSection";
import ProcessSection from "@components/ProcessSection";
import ServicesSection from "@components/ServicesSection";
import StatsSection from "@components/StatsSection";
import WhyChooseSection from "@components/WhyChooseSection";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-white">
      <DotPattern />
      <div className="relative z-10">
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <WhyChooseSection />
        <AboutSection />
        <ProcessSection />
        <IndustriesSection />
        <FAQSection />
        <ContactSection />
      </div>
    </div>
  );
}
