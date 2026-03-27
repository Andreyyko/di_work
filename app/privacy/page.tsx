"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { white_letter } from "@/public/images/CommonImages/PostCard";
import { copyrightData } from "@/constant/PrivacyConstant/privacyData";

function renderTextWithLinks(text: string) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g);

  return parts.map((part, index) => {
    if (/^https?:\/\//.test(part)) {
      const href = part.replace(/[.,;!?)]*$/, "");
      const trailing = part.slice(href.length);

      return (
        <span key={`${part}-${index}`}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline break-all"
          >
            {href}
          </a>
          {trailing}
        </span>
      );
    }
    return <span key={`${index}-${part.slice(0, 10)}`}>{part}</span>;
  });
}

export default function PrivacyPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-privacy-animate]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power1.out",
          stagger: 0.15,
          clearProps: "opacity, transform",
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="px-5 bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')] relative overflow-hidden">
      <Image
        className="absolute right-0 translate-y-250 w-90 lg:w-130 lg:translate-y-290 rotate-15 translate-x-52 hidden md:block"
        src={white_letter.WHITE_POSTCARD}
        alt={"postcard"}
      />

      <h5 className="heading-5 -translate-x-5" data-privacy-animate>
        Ваша довіра — наш
        <br />
        найцінніший ресурс, і ми
        <br />
        оберігаємо її з повагою та
        <br />
        турботою
      </h5>

      <h2
        className="heading-privacy text-center flex flex-col uppercase -tracking-widest pt-13 lg:pt-22 pb-37.5 lg:pb-94.5"
        data-privacy-animate
      >
        <span className="first-letter-privacy" data-first-letter="П">
          олітика
        </span>
        <span className="first-letter-privacy" data-first-letter="К">
          онфіденційності
        </span>
      </h2>

      <div className="pb-20" data-privacy-animate>
        {copyrightData.map((section) => (
          <div key={section.heading} className="mb-14">
            <h3 className="heading-3 uppercase mb-5">{section.heading}</h3>
            {section.paragraphs?.map((paragraph, idx) => (
              <p
                key={`${section.heading}-p-${idx}`}
                className="heading-4 max-w-full md:max-w-[85%] mb-4 tracking-[-0.03em]"
              >
                {renderTextWithLinks(paragraph)}
              </p>
            ))}
            {section.list && section.list.length > 0 && (
              <ul className="list-disc heading-4 pl-5 max-w-full md:max-w-[85%] tracking-[-0.03em]">
                {section.list.map((item, idx) => (
                  <li key={`${section.heading}-li-${idx}`} className="mb-2">
                    {renderTextWithLinks(item)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
