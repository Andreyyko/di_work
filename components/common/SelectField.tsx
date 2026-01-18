"use client";

import { FC, useState, useRef, useEffect } from "react";
import gsap from "gsap";

type Props = {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
};

const SelectField: FC<Props> = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;

    if (open) {
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        { height: 0, autoAlpha: 0, y: -6, pointerEvents: "none" },
        {
          height: "auto",
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          onStart: () => {
            el.style.pointerEvents = "auto";
          }
        }
      );
    } else {
      gsap.killTweensOf(el);
      gsap.to(el, {
        height: 0,
        autoAlpha: 0,
        y: -6,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          el.style.pointerEvents = "none";
        }
      });
    }
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative w-full flex flex-col overflow-visible">
      <label
        className={`
          pointer-events-none heading-4 lg:text-[25px] transition-all duration-300 hidden md:block absolute left-0
          ${value ? "top-0" : "top-7"}
        `}
      >
        {label}
      </label>

      <div
        className={`w-full cursor-pointer pt-0 md:pt-8 ${
          value ? "lg:pt-[41px]" : "pb-1.5 md:pb-4 lg:pt-11"
        } relative`}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="heading-4 w-full pr-6 pb-2">
          <span className="md:hidden">{value || label}</span>
          <span className="hidden md:inline">{value || ""}</span>
        </div>

        <span className="absolute right-0 -top-2 md:top-6 pointer-events-none text-[15px] md:text-[20px]">
          <span className={`${open ? "rotate-180" : "rotate-0"} inline-block transition-all duration-300`}>
            ▼
          </span>
        </span>
      </div>

      <div className="w-full h-px bg-brand-gray" />

      <div
        ref={dropdownRef}
        className="absolute left-0 w-full bg-brand-background top-[15px] sm:top-[62px] border border-brand-gray shadow-xl mt-2 z-999 overflow-hidden"
        style={{ height: 0, opacity: 0, pointerEvents: "none" }}
      >
        {options.map((opt, i) => (
          <div
            key={i}
            onClick={() => {
              onChange?.(opt);
              setOpen(false);
            }}
            className="px-4 py-4 heading-4 border-b border-brand-gray last:border-0 hover:bg-[#eee7d9] cursor-pointer transition-colors"
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectField;
