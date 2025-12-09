"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

type FAQItemProps = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

const FAQItem = ({ question, answer, defaultOpen = false }: FAQItemProps) => {
  const [open, setOpen] = useState(defaultOpen ?? false);
  const contentRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (tlRef.current) tlRef.current.kill();

    if (open) {
      tlRef.current = gsap.to(el, {
        height: "auto",
        opacity: 1,
        duration: 0.75,
        ease: "power2.out",
      });
    } else {
      tlRef.current = gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.65,
        ease: "power2.inOut",
      });
    }
  }, [open]);

  return (
    <div
      className="relative flex flex-col md:flex-row md:items-start cursor-pointer select-none"
      onClick={() => setOpen((v) => !v)}
    >
      <div className="relative flex flex-col justify-center w-[90%] md:w-full z-100">

        <h3 className="heading-3 pb-5 max-w-140 relative pr-10 md:pr-0">
          {question}

          <span
            className="
              absolute 
              -right-10 md:right-[-70px]
              top-1/3 -translate-y-1/2
              w-4 h-4
              flex items-center justify-center 
            "
          >
            <span className="relative w-full h-full">
              <span
                className="
                  absolute left-0 top-1/2 -translate-y-1/2
                  w-full h-[3px] bg-brand-gray
                  transition-all duration-500
                "
              ></span>

              <span
                className={`
                  absolute left-1/2 top-0 -translate-x-1/2
                  w-[3px] h-full bg-brand-gray
                  transition-all duration-500
                  ${open ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"}
                `}
              ></span>
            </span>
          </span>
        </h3>

        <div
          ref={contentRef}
          className="overflow-hidden opacity-0 h-0"
        >
          <p className="heading-4 mb-7 max-w-150">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
