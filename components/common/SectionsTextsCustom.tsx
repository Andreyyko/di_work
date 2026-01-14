import React from "react";

export type SectionTextsProps = {
  title?: string;
  description?: string | React.ReactNode;
  descriptionMak?: string | React.ReactNode;
  descriptionpurpose?: string | React.ReactNode;
  descriptionpurposetwo?: string | React.ReactNode;
  descriptionpurposeshort?: string | React.ReactNode;
  list?: string[];
  sourceList?: React.ReactNode[];
  listmakinside?: string[];
  listEffect?: string[];
  extra?: string | React.ReactNode;
  extra_one?: string | React.ReactNode;
  extra_two?: string | React.ReactNode;
  extra_three?: string | React.ReactNode;
  className?: string;
};

const SectionsTextsCustom: React.FC<SectionTextsProps> = ({
  title,
  description,
  descriptionMak,
  descriptionpurpose,
  descriptionpurposetwo,
  descriptionpurposeshort,
  sourceList,
  list,
  listmakinside,
  listEffect,
  extra,
  extra_one,
  extra_two,
  extra_three,
  className = "",
}) => {
  return (
    <div className={` ${className}`}>
      {title && <h3 className="heading-3 uppercase pb-5 w-fit">{title}</h3>}

      {descriptionpurpose && (
        <p className="heading-4 max-w-full lg:w-full pb-10 w-fit">
          {descriptionpurpose}
        </p>
      )}

      {descriptionpurposeshort && (
        <p className="heading-4 max-w-full lg:w-[50%] pb-2.5 w-fit">
          {descriptionpurposeshort}
        </p>
      )}

      {descriptionpurposetwo && (
        <p className="heading-4 max-w-full lg:w-full pb-2.5 w-fit">
          {descriptionpurposetwo}
        </p>
      )}

      {description && (
        <p className="heading-4 max-w-full lg:max-w-[34%] pb-2.5 w-fit">
          {description}
        </p>
      )}

      {descriptionMak && (
        <p className="heading-4 max-w-full pb-2.5 w-fit">{descriptionMak}</p>
      )}

      {list && list.length > 0 && (
        <ul className="list-disc heading-4 pl-5 pb-2.5">
          {list.map((item, i) => (
            <li className="" key={i}>{item}</li>
          ))}
        </ul>
      )}

      {sourceList && sourceList.length > 0 && (
        <ul className="list-disc heading-4 pl-5 pb-2.5 w-full lg:w-[66%] tracking-[-0.05em]">
          {sourceList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}

      {listEffect && listEffect.length > 0 && (
        <ul className="list-disc heading-4 pl-5 w-full lg:w-[60%] pb-2.5 max-w-full">
          {listEffect.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}

      {listmakinside && listmakinside.length > 0 && (
        <ul className="list-disc heading-4 pl-5 pb-2.5 w-fit">
          {listmakinside.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )}

      {extra && (
        <p className="heading-4 max-w-full md:max-w-[85%] pb-5 w-fit">
          {extra}
        </p>
      )}

      {extra_one && (
        <p className="heading-4 max-w-full md:max-w-[80%] pb-5 w-fit">
          {extra_one}
        </p>
      )}

      {extra_two && (
        <p className="heading-4 max-w-full md:max-w-[80%] pb-5 w-fit">
          {extra_two}
        </p>
      )}

      {extra_three && (
        <p className="heading-4 max-w-full md:max-w-[80%] pb-5 w-fit">
          {extra_three}
        </p>
      )}
    </div>
  );
};

export default SectionsTextsCustom;
