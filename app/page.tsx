"use client";

import AboutUs from "@/components/MainPage/AboutUsSection/AboutUs";
import CategoriesFrThCarousel from "@/components/MainPage/CategoriesFrThСarouselSection";
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
        <CategoriesFrThCarousel />
      </section>
      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/course_carousel_background.svg')]">
        <CourseSlider />
      </section>
      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')]">
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
