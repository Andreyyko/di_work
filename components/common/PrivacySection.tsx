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
    <div className={`mb-20  ${className}`}>
      
      {title && (
        <h3 className="heading-3 uppercase mb-5">
          {title}
        </h3>
      )}

      {description && (
        <p className="heading-4 max-w-full md:max-w-[50%] mb-2.5 tracking-[-0.05em]">
          {description}
        </p>
      )}

      {list && list.length > 0 && (
        <ul className="list-disc heading-4 pl-5 mb-2.5 max-w-full md:max-w-[55%] tracking-[-0.05em]">
          {list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}

      {extra && (
        <p className="heading-4 max-w-full md:max-w-[55%] tracking-[-0.05em]">
          {extra}
        </p>
      )}
    </div>
  );
};

export default PrivacySection;
