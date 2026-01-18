import { profile_page_images } from "@/public/images/ProfilePage";
import Link from "next/link";
import Image from "next/image";

const ProfilePageHeader = () => {
  return (
    <div className="flex flex-row justify-between w-full pt-37 pb-50">
      <div className="flex flex-row items-center gap-5">
        <Image src={profile_page_images.MY_PROFILE_ICON} alt={"profile_icon"} />
        <div className="flex flex-col gap-3">
          <h3 className="heading-3 uppercase text-black">Імʼя та прізвище</h3>
          <h6 className="heading-6 underline cursor-pointer w-fit">Вийти</h6>
        </div>
      </div>
      <Link href="/">
        <h6 className="heading-6 underline cursor-pointer h-fit">
          Повернутися на головну
        </h6>
      </Link>
    </div>
  );
};

export default ProfilePageHeader;
