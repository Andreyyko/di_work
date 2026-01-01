import React from "react";

export type PrivacySectionProps = {
  title?: string;
  description?: string | React.ReactNode;
  list?: string[];
  extra?: string | React.ReactNode;
  className?: string;
};

const PrivacySection: React.FC<PrivacySectionProps> = ({
  title,
  description,
  list,
  extra,
  className = "",
}) => {
  return (
    <section className={`mb-10 ${className}`}>
      
      {title && (
        <h3 className="heading-3 uppercase mb-5">
          {title}
        </h3>
      )}

      {description && (
        <p className="heading-4 max-w-full md:max-w-[50%] mb-2.5">
          {description}
        </p>
      )}

      {list && list.length > 0 && (
        <ul className="list-disc heading-4 pl-5 mb-2.5 max-w-full md:max-w-[55%]">
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}

      {extra && (
        <p className="heading-4 max-w-full md:max-w-[55%]">
          {extra}
        </p>
      )}
    </section>
  );
};

export default PrivacySection;
