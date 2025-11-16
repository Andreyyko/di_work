import Image, { StaticImageData } from "next/image";
import { check_icon } from "@/public/images/CommonImages/CheckItemIcon";

type CheckItemProps = {
  items?: Array<React.ReactNode>;
  children?: React.ReactNode;
  size?: number;
  className?: string;
  icon?: StaticImageData | string;
};

const CheckItem = ({
  items,
  children,
  size = 18,
  className = "",
  icon,
}: CheckItemProps) => {
  const ICON = icon ?? check_icon.CHECK;

  if (items && items.length > 0) {
    return (
      <ul className={` ${className}`}>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 leading-tight">
            <Image
              src={ICON}
              alt=""
              width={size}
              height={size}
              className="shrink-0 mt-[3px]"
            />
            <span>{item}</span>
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
        <span>{children}</span>
      </li>
    </ul>
  );
};

export default CheckItem;
