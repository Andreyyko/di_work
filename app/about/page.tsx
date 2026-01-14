import ValidationSection from "@/components/MainPage/ValidationSection/ValidationSection";
import BioSection from "../../components/AboutUsPage/BioSection";
import BoxSectionBottom from "../../components/AboutUsPage/BoxSectionBottom";
import BoxSectionTop from "../../components/AboutUsPage/BoxSectionTop";
import HeroSection from "../../components/AboutUsPage/HeroSection";
import FrameWrapper from "@/components/common/FrameWrapper";

export default function AboutUs() {
  return (
    <div className="px-5 relative overflow-hidden bg-[url('/images/MainPageImages/backgrounds/hero_section_background.svg')]">
      <HeroSection />
      <BoxSectionTop />
      <BoxSectionBottom />
      <BioSection />
      <FrameWrapper showOrnaments />
      <h3 className="heading-3 text-[250%] text-black uppercase flex flex-col pt-50">
        <span>“</span>
        <span className="first-letter-plan text-end" data-first-letter="С">
          формуємо нову світлу
        </span>
        <span className="">
          реальність, знайшовши сенс та унікальність.<span> „</span>
        </span>
      </h3>
      <h5 className="heading-5 pb-50">
        Onnia vincit amor - все перемагає любов.
      </h5>
      <ValidationSection />
    </div>
  );
}
