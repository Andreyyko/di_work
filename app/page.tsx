"use client";


import AboutUs from "@/components/AboutUsSection/AboutUs";
import CourseSlider from "@/components/CourseSlider/CourseSlider";
import HeroSection from "@/components/HeroSection/HeroSection";
import IdentityIntro from "@/components/IdentityIntroSection/IdentityIntro";
import MakMethodicInfo from "@/components/MakMethodicInfo/MakMethodicInfo";

export default function Home() {
  return (
    <main
      className="bg-brand-background px-5 overflow-hidden"
    >
      <HeroSection />
      <IdentityIntro />
      <AboutUs />
      {/* <CourseSlider/> */}
      <MakMethodicInfo />
    </main>
  );
}
