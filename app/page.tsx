"use client";


import Footer from "@/components/common/Footer/Footer";
import AboutUs from "@/components/MainPage/AboutUsSection/AboutUs";
import CourseSlider from "@/components/MainPage/CourseSlider/CourseSlider";
import HeroSection from "@/components/MainPage/HeroSection/HeroSection";
import IdentityIntro from "@/components/MainPage/IdentityIntroSection/IdentityIntro";
import MakMethodicInfo from "@/components/MainPage/MakMethodicInfo/MakMethodicInfo";
import ValidationSection from "@/components/MainPage/ValidationSection/ValidationSection";

export default function Home() {
  return (
    <main
      className="bg-brand-background px-5 overflow-hidden"
    >
      <HeroSection />
      <IdentityIntro />
      <AboutUs />
      <CourseSlider/>
      <MakMethodicInfo />
      <ValidationSection />
      <Footer />
    </main>
  );
}
