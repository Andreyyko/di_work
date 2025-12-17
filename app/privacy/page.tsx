import PrivacySection from "@/components/common/PrivacySection";
import { footer_images } from "@/public/images/CommonImages/FooterImages";
import Image from "next/image";
import { PravicyData } from "@/constant/PrivacyConstant/privacyData";
import { white_letter } from "@/public/images/CommonImages/PostCard";

export default function PrivacyPage() {
  return (
    <section className="px-5 bg-[url('/images/MainPageImages/backgrounds/hero_section_background.svg')]">
      <Image
        className="absolute right-0 translate-y-250 w-90 lg:w-130 lg:translate-y-290 rotate-15 translate-x-40 hidden md:block"
        src={white_letter.WHITE_POSTCARD}
        alt={"postcard"}
      />
      <h5 className="heading-5 -translate-x-5">
        Ваша довіра — наш
        <br />
        найцінніший ресурс, і ми
        <br />
        оберігаємо її з повагою та
        <br />
        турботою
      </h5>
      <h2 className="heading-privacy text-center flex flex-col uppercase -tracking-widest pt-13 lg:pt-22 pb-37.5 lg:pb-94.5">
        <span className="first-letter-privacy" data-first-letter="П">
          олітика
        </span>
        <span className="first-letter-privacy" data-first-letter="К">
          онфіденційності
        </span>
      </h2>
      {PravicyData.map((block, index) => (
        <PrivacySection key={index} {...block} />
      ))}

      <div className="flex flex-row items-center gap-4 pb-2.5 -translate-y-5">
        <Image
          src={footer_images.EMAIL_ICON}
          alt="email icon"
          className="h-5 w-5"
        />
        <a href="mailto:info@rok-m.ua" className="heading-6 opacity-100">
          info@rok-m.ua
        </a>
      </div>

      <div className="flex flex-row items-center gap-4 pb-2.5 -translate-y-5">
        <Image
          src={footer_images.PHONE_ICON}
          alt="phone icon"
          className="h-5 w-5"
        />
        <a href="tel:+380000000000" className="heading-6 opacity-100">
          +380 00 000 00 00
        </a>
      </div>
    </section>
  );
}
