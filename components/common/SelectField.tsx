"use client";

import { FC, useState, useRef, useEffect } from "react";

type Props = {
  label: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
};

const SelectField: FC<Props> = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
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

  return (
    <div
      ref={wrapperRef}
      className="relative w-full flex flex-col overflow-visible"
    >
      {/* Floating label */}
      <label
        className={`
          pointer-events-none heading-4 lg:text-[25px] transition-all duration-300
          hidden md:block absolute left-0
          ${value ? "top-0" : "top-7"}
        `}
      >
        {label}
      </label>

      {/* Click area */}
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

        <span className="absolute right-0 -top-2 md:top-6 pointer-events-none text-[15px] md:text-[20px] transition-transform duration-300">
          <span className={`${open ? "rotate-180" : "rotate-0"} inline-block`}>
            ▼
          </span>
        </span>
      </div>

      <div className="w-full h-px bg-brand-gray" />

      <div
        className={`
    absolute left-0 w-full bg-[#FFFBEF] border border-brand-gray shadow-xl mt-2 z-999
    overflow-hidden rounded-lg backdrop-blur-sm

    transition-all duration-300 ease-out
    ${
      open
        ? "opacity-100  blur-0 shadow-[0_12px_32px_rgba(0,0,0,0.12)]"
        : "opacity-0 blur-sm pointer-events-none shadow-none"
    }
  `}
        style={{ top: "60px" }}
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
