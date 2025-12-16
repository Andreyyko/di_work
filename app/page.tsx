"use client";

import HeroSection from "@/components/MainPage/HeroSection/HeroSection";
import LazySection from "@/components/common/LazySection";

export default function Home() {

  return (
    <main className="bg-brand-background overflow-hidden">
      <section className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/hero_section_background.svg')]">
        <HeroSection />
      </section>

      <LazySection
        loader={() =>
          import("@/components/MainPage/IdentityIntroSection/IdentityIntro")
        }
        className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/identity_section_background.svg')]"
      />

      <LazySection
        loader={() => import("@/components/MainPage/AboutUsSection/AboutUs")}
        className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/about_us_background.svg')]"
      />

      <LazySection
        loader={() =>
          import("@/components/MainPage/CategoriesFrThСarouselSection")
        }
        className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/categories_fr_th_carousel.svg')]"
      />

      <LazySection
        loader={() => import("@/components/MainPage/CourseSlider/CourseSlider")}
        className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/course_carousel_background.svg')]"
      />

      <LazySection
        loader={() =>
          import("@/components/MainPage/MakMethodicInfo/MakMethodicInfo")
        }
        className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/Mak_Methodic_Info_Background.svg')]"
      />

      <LazySection
        loader={() =>
          import("@/components/MainPage/SectionSlider/SectionSlider")
        }
        className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/Section_Slider_BackGround.svg')]"
      />

      <LazySection
        loader={() =>
          import("@/components/MainPage/ChoosePlanSection/ChoosePlanSection")
        }
        className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/choose_plan_section_backgrpund.svg')]"
      />

      <LazySection
        loader={() =>
          import("@/components/MainPage/ReviewSection/ReviewSection")
        }
        className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/review_section_background.svg')]"
      />

      <LazySection
        loader={() =>
          import("@/components/MainPage/ValidationSection/ValidationSection")
        }
        className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/validation_section_background.svg')]"
      />

      <LazySection
        loader={() => import("@/components/MainPage/FAQSection/FAQSection")}
        className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/faq_section_background.svg')]"
      />

      <LazySection
        loader={() =>
          import("@/components/MainPage/ContactFormSection/ContactForm")
        }
        className="px-5 bg-cover bg-center bg-no-repeat bg-[url('/images/MainPageImages/backgrounds/contact_from_background.svg')]"
      />
    </main>
  );
}
