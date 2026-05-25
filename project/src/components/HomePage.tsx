"use client";

import AboutSection from "@components/AboutSection";
import ContactSection from "@components/ContactSection";
import FAQSection from "@components/FAQSection";
import HeroSection from "@components/HeroSection";
import IndustriesSection from "@components/IndustriesSection";
import ProcessSection from "@components/ProcessSection";
import ServicesSection from "@components/ServicesSection";
import ServicesCarousel3D from "@components/ServicesCarousel3D";
import WhyChooseSection from "@components/WhyChooseSection";

export default function HomePage() {
  return (
    <div className="bg-white">
      <HeroSection />
      <ServicesCarousel3D />
      <ServicesSection />
      <WhyChooseSection />
      <AboutSection />
      <ProcessSection />
      <IndustriesSection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
