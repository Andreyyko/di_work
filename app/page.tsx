"use client";

import AboutUs from "@/components/MainPage/AboutUsSection/AboutUs";
import ChoosePlanSection from "@/components/MainPage/ChoosePlanSection/ChoosePlanSection";
import ContactForm from "@/components/MainPage/ContactFormSection/ContactForm";
import CourseSlider from "@/components/MainPage/CourseSlider/CourseSlider";
import FAQSection from "@/components/MainPage/FAQSection/FAQSection";
import HeroSection from "@/components/MainPage/HeroSection/HeroSection";
import IdentityIntro from "@/components/MainPage/IdentityIntroSection/IdentityIntro";
import MakMethodicInfo from "@/components/MainPage/MakMethodicInfo/MakMethodicInfo";
import ReviewSection from "@/components/MainPage/ReviewSection/ReviewSection";
import SectionSlider from "@/components/MainPage/SectionSlider/SectionSlider";
import ValidationSection from "@/components/MainPage/ValidationSection/ValidationSection";
import CategoriesFrThСarousel from "@/components/MainPage/CategoriesFrThСarouselSection/index"

export default function Home() {
  return (
    <main className="bg-brand-background px-5 overflow-hidden">
      <HeroSection />
      <IdentityIntro />
      <AboutUs />
      <CategoriesFrThСarousel />
      <CourseSlider />
      <MakMethodicInfo />
      <SectionSlider/>
      <ChoosePlanSection/>
      <ReviewSection />
      <ValidationSection />
      <FAQSection />
      <ContactForm />
    </main>
  );
}
