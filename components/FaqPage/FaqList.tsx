"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Item {
  question: string;
  answer: string;
}

interface Props {
  items: Item[];
}

export default function FaqList({ items }: Props) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0, 1]);

  const listRef = useRef<HTMLDivElement | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tweenRefs = useRef<(gsap.core.Tween | null)[]>([]);

  const isOpen = (index: number) => openIndexes.includes(index);

  const toggle = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  useEffect(() => {
    setOpenIndexes([0, 1]);
  }, [items]);

  useEffect(() => {
    if (!listRef.current) return;

    gsap.fromTo(
      listRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      }
    );
  }, [items]);

  useEffect(() => {
    contentRefs.current.forEach((el, i) => {
      if (!el) return;

      tweenRefs.current[i]?.kill();

      tweenRefs.current[i] = gsap.to(el, {
        height: isOpen(i) ? "auto" : 0,
        opacity: isOpen(i) ? 1 : 0,
        duration: isOpen(i) ? 0.75 : 0.6,
        ease: isOpen(i) ? "power2.out" : "power2.inOut",
      });
    });
  }, [openIndexes]);

  return (
    <div
      ref={listRef}
      className="w-full px-3 pt-20 sm:mt-50 pb-20 sm:pb-50"
    >
      {items.map((item, i) => {
        const open = isOpen(i);

        return (
          <div
            key={i}
            className="relative flex flex-col md:flex-row md:items-start cursor-pointer select-none"
            onClick={() => toggle(i)}
          >
            <div className="relative flex flex-col justify-center w-[90%] z-10">
              <h3 className="heading-3 pb-5 max-w-full relative pr-10 md:pr-0 uppercase">
                {item.question}

                <span className="absolute -right-10 md:right-[-10%] top-1/3 -translate-y-1/2 w-4 h-4 flex items-center justify-center">
                  <span className="relative w-full h-full">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[3px] bg-brand-gray transition-all duration-500" />
                    <span
                      className={`
                        absolute left-1/2 top-0 -translate-x-1/2
                        w-[3px] h-full bg-brand-gray transition-all duration-500
                        ${
                          open
                            ? "scale-y-0 opacity-0"
                            : "scale-y-100 opacity-100"
                        }
                      `}
                    />
                  </span>
                </span>
              </h3>

              <div
                ref={(el) => {
                  contentRefs.current[i] = el;
                  return undefined;
                }}
                className="overflow-hidden opacity-0 h-0"
              >
                <p className="heading-4 pb-7 max-w-150">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
