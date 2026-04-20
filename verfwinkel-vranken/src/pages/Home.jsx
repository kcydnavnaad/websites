import React from 'react';
import HeroSection from '@/components/verfwinkel/HeroSection';
import OverOnsSection from '@/components/verfwinkel/OverOnsSection';
import DienstenSection from '@/components/verfwinkel/DienstenSection';
import KleuradviesSection from '@/components/verfwinkel/KleuradviesSection';
import MerkenSection from '@/components/verfwinkel/MerkenSection';
import RealisatiesSection from '@/components/verfwinkel/RealisatiesSection';
import ReviewsSection from '@/components/verfwinkel/ReviewsSection';
import CTASection from '@/components/verfwinkel/CTASection';
import ContactSection from '@/components/verfwinkel/ContactSection';
import Footer from '@/components/verfwinkel/Footer';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <OverOnsSection />
      <DienstenSection />
      <KleuradviesSection />
      <MerkenSection />
      <RealisatiesSection />
      <ReviewsSection />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
}