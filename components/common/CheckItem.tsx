import Image, { StaticImageData } from "next/image";
import { check_icon } from "@/public/images/CommonImages/CheckItemIcon";

type CheckItemProps = {
  items?: Array<React.ReactNode>;
  children?: React.ReactNode;
  size?: number;
  className?: string;
  icon?: StaticImageData | string;
  showFor?: number[];
  minText?: boolean; 
};

const CheckItem = ({
  items,
  children,
  size = 18,
  className = "",
  icon,
  showFor,
  minText = false, 
}: CheckItemProps) => {
  const ICON = icon ?? check_icon.CHECK;

  const textClass = minText
    ? "text-[clamp(14px,3vw,18px)]"
    : "";

  if (items && items.length > 0) {
    const filteredItems =
      showFor && showFor.length > 0
        ? items.filter((_, index) => showFor.includes(index))
        : items;

    return (
      <ul className={` ${className}`}>
        {filteredItems.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 leading-tight">
            <Image
              src={ICON}
              alt=""
              width={size}
              height={size}
              className="shrink-0 mt-[3px]"
            />
            <span className={textClass}>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={className}>
      <li className="flex items-start gap-3 leading-tight">
        <Image
          src={ICON}
          alt=""
          width={size}
          height={size}
          className="shrink-0 mt-[3px]"
        />
        <span className={textClass}>{children}</span>
      </li>
    </ul>
  );
};

export default CheckItem;