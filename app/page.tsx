"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/MainPage/HeroSection/HeroSection";

const IdentityIntro = dynamic(() => import("@/components/MainPage/IdentityIntroSection/IdentityIntro"));
const AboutUs = dynamic(() => import("@/components/MainPage/AboutUsSection/AboutUs"));
const CategoriesFrThСarousel = dynamic(() => import("@/components/MainPage/CategoriesFrThСarouselSection"));
const CourseSlider = dynamic(() => import("@/components/MainPage/CourseSlider/CourseSlider"));
const MakMethodicInfo = dynamic(() => import("@/components/MainPage/MakMethodicInfo/MakMethodicInfo"));
const SectionSlider = dynamic(() => import("@/components/MainPage/SectionSlider/SectionSlider"));
const ChoosePlanSection = dynamic(() => import("@/components/MainPage/ChoosePlanSection/ChoosePlanSection"));
const ReviewSection = dynamic(() => import("@/components/MainPage/ReviewSection/ReviewSection"));
const ValidationSection = dynamic(() => import("@/components/MainPage/ValidationSection/ValidationSection"));
const FAQSection = dynamic(() => import("@/components/MainPage/FAQSection/FAQSection"));
const ContactForm = dynamic(() => import("@/components/MainPage/ContactFormSection/ContactForm"));


export default function Home() {
  return (
    <main className="bg-brand-background overflow-hidden">

      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/hero_section_background.svg')]">
        <HeroSection />
      </section>

      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/identity_section_background.svg')]">
        <IdentityIntro />
      </section>

      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/about_us_background.svg')]">
        <AboutUs />
      </section>

      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/categories_fr_th_carousel.svg')]">
        <CategoriesFrThСarousel />
      </section>

      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/course_carousel_background.svg')]">
        <CourseSlider />
      </section>

      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/Mak_Methodic_Info_Background.svg')]">
        <MakMethodicInfo />
      </section>

      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/Section_Slider_BackGround.svg')]">
        <SectionSlider />
      </section>

      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/choose_plan_section_backgrpund.svg')]">
        <ChoosePlanSection />
      </section>

      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/review_section_background.svg')]">
        <ReviewSection />
      </section>

      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/validation_section_background.svg')]">
        <ValidationSection />
      </section>

      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/faq_section_background.svg')]">
        <FAQSection />
      </section>

      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/contact_from_background.svg')]">
        <ContactForm />
      </section>
    </main>
  );
}
