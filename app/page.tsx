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
import { main_page_backrounds } from "@/public/images/MainPageImages/backgrounds";


export default function Home() {
  return (
    <main className="bg-brand-background overflow-hidden">
      <section className="px-5 bg-cover bg-center bg-no-repeat" 
      style={{backgroundImage: `url(${main_page_backrounds.HERO_SECTION_BACKGROUND.src})`,
      }}> 
        <HeroSection />
      </section>
      <section className="px-5 bg-cover bg-center bg-no-repeat" 
      style={{backgroundImage: `url(${main_page_backrounds.IDENTITY_SECTION_BACKGROUND.src})`,
      }}>
        <IdentityIntro />
      </section>
      <section className="px-5 bg-cover bg-center bg-no-repeat" 
      style={{backgroundImage: `url(${main_page_backrounds.ABOUT_US_BACKGROUND.src})`,
      }}>
        <AboutUs />
      </section>
      <section className="px-5 bg-cover bg-center bg-no-repeat" 
      style={{backgroundImage: `url(${main_page_backrounds.CATEGORIES_FT_TH_CAROUSEL.src})`,
      }}>
        <CategoriesFrThСarousel />
      </section>
      <section className="px-5 bg-cover bg-center bg-no-repeat" 
      style={{backgroundImage: `url(${main_page_backrounds.COURSE_CAROUSEL_BACKGROUND.src})`,
      }}>
        <CourseSlider />
      </section>
      <section className="px-5 bg-cover bg-center bg-no-repeat" 
      style={{backgroundImage: `url(${main_page_backrounds.MAK_METHODIC_INFO_BACKGROUND.src})`,
      }}>
        <MakMethodicInfo />
      </section>
      <section className="px-5 bg-cover bg-center bg-no-repeat" 
      style={{backgroundImage: `url(${main_page_backrounds.SECTION_SLIDER_BACKGROUND.src})`,
      }}>
        <SectionSlider/>
      </section>
      <section className="px-5 bg-cover bg-center bg-no-repeat" 
      style={{backgroundImage: `url(${main_page_backrounds.CHOOSE_PLAN_SECTION_BACKGROUND.src})`,
      }}>
        <ChoosePlanSection/>
      </section>
      <section className="px-5 bg-cover bg-center bg-no-repeat" 
      style={{backgroundImage: `url(${main_page_backrounds.REVIEW_SECTION_BACKGROUND.src})`,
      }}>
      <ReviewSection />
      </section>
      <section className="px-5 bg-cover bg-center bg-no-repeat" 
      style={{backgroundImage: `url(${main_page_backrounds.VALIDATION_SECTION_BACKGROUND.src})`,
      }}>
        <ValidationSection />
      </section>
      <section className="px-5 bg-cover bg-center bg-no-repeat" 
      style={{backgroundImage: `url(${main_page_backrounds.FAQ_SECTION_BACKGROUND.src})`,
      }}>
        <FAQSection />
      </section>
      <section className="px-5 bg-cover bg-center bg-no-repeat" 
      style={{backgroundImage: `url(${main_page_backrounds.CONRACT_FORM_BACKGROUND.src})`,
      }}>
        <ContactForm />
      </section>
    </main>
  );
}
