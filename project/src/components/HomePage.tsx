"use client";

import ContactSection from "@components/ContactSection";
import DeliverySection from "@components/DeliverySection";
import FAQSection from "@components/FAQSection";
import HeroSection from "@components/HeroSection";
import LandingVisualSection from "@components/LandingVisualSection";
import PhilosophySection from "@components/PhilosophySection";
import ProcessSection from "@components/ProcessSection";
import ReliabilitySection from "@components/ReliabilitySection";
import { SegmentSolutionsSection } from "@components/SegmentSolutionsPage";
import ValueSection from "@components/ValueSection";
import WhySection from "@components/WhySection";

export default function HomePage() {
  return (
    <div className="bg-white">
      <HeroSection />
      <SegmentSolutionsSection mobileMode="stack" />
      <WhySection />
      <ValueSection />
      <LandingVisualSection />
      <ReliabilitySection />
      <ProcessSection />
      <DeliverySection />
      <PhilosophySection />
      <FAQSection />
      <ContactSection />
    </div>
  );
}
