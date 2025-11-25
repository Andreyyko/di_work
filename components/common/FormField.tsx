"use client";

import { FC, useState } from "react";

type Props = {
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "textarea";
};

const FormField: FC<Props> = ({ label, placeholder, type = "text" }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (val: string) => {
    setValue(val);

    if (type === "email") {
      if (!validateEmail(val)) {
        setError("Invalid email format");
      } else {
        setError("");
      }
    }
  };

  const inputClasses = `
    heading-4 pb-3 xl:pb-2.5 outline-none
    ${error ? "text-red-500" : ""}
  `;

  return (
    <div className="flex flex-col w-full">
      <label className="heading-4 lg:text-[25px] mb-[15px]">{label}</label>

      {type === "textarea" ? (
        <input
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className={`heading-4 pb-2.5 resize-none outline-none ${
            error ? "border-b border-red-500" : ""
          }`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          className={inputClasses}
        />
      )}

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
