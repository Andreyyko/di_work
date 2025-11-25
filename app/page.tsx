"use client";

import AboutUs from "@/components/MainPage/AboutUsSection/AboutUs";
import ContactForm from "@/components/MainPage/ContactFormSection/ContactForm";
import CourseSlider from "@/components/MainPage/CourseSlider/CourseSlider";
import FAQSection from "@/components/MainPage/FAQSection/FAQSection";
import HeroSection from "@/components/MainPage/HeroSection/HeroSection";
import IdentityIntro from "@/components/MainPage/IdentityIntroSection/IdentityIntro";
import MakMethodicInfo from "@/components/MainPage/MakMethodicInfo/MakMethodicInfo";
import ReviewSection from "@/components/MainPage/ReviewSection/ReviewSection";
import ValidationSection from "@/components/MainPage/ValidationSection/ValidationSection";

export default function Home() {
  return (
    <main className="bg-brand-background px-5 overflow-hidden">
      <HeroSection />
      <IdentityIntro />
      <AboutUs />
      <CourseSlider />
      <MakMethodicInfo />
      <ReviewSection />
      <ValidationSection />
      <ContactForm />
      <FAQSection/>
    </main>
  );
}
