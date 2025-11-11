import { check_icon } from "@/public/images/CheckItemIcon";
import Image from "next/image";

type CheckItemProps = {
  children: React.ReactNode;
  size?: number;
};

const CheckItem = ({ children, size = 18 }: CheckItemProps) => {
  return (
    <p className="flex items-start gap-3 leading-tight">
      <Image
        src={check_icon.CHECK}
        alt=""
        width={size}
        height={size}
        className="shrink-0 mt-[3px]"
      />
      {children}
    </p>
  );
};

export default CheckItem;
