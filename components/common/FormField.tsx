"use client";

import { FC, useState, useEffect } from "react";

type Props = {
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "textarea";
  error?: string;
  onValueChange?: (v: string) => void;
  resetSignal?: number; // ← added for clearing
};

const FormField: FC<Props> = ({
  label,
  placeholder,
  type = "text",
  error,
  onValueChange,
  resetSignal,
}) => {
  const [value, setValue] = useState("");

  // Clear field when resetSignal changes
  useEffect(() => {
    setValue("");
    onValueChange?.("");
  }, [resetSignal]);

  const handleChange = (v: string) => {
    setValue(v);
    onValueChange?.(v);
  };

  const inputClasses = `
    heading-4 pb-3 xl:pb-2.5 outline-none
    ${error ? "text-red-500" : ""}
  `;

  return (
    <div className="flex flex-col w-full">
      <label className="heading-4 lg:text-[25px] mb-[15px]">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        className={inputClasses}
      />

      <div
        className={`w-full h-px ${
          error ? "bg-red-500" : "bg-brand-gray"
        } transition-colors`}
      />

      {error && (
        <p className="text-red-500 text-sm mt-2 leading-tight">{error}</p>
      )}
    </div>
  );
};

export default FormField;
