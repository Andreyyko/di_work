"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { profile_page_images } from "@/public/images/ProfilePage";
import Link from "next/link";
import Image from "next/image";
import { getStoredUser, clearJwt } from "@/api/auth-api";

const ProfilePageHeader = () => {
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string>("Ім'я та прізвище");

  useEffect(() => {
    const user = getStoredUser();
    if (user?.username) {
      setDisplayName(user.username);
    }
  }, []);

  const handleLogout = () => {
    clearJwt();
    router.push("/auth/sign-in");
    router.refresh();
  };

  return (
    <div className="flex flex-row justify-between w-full pt-37 pb-50">
      <div className="flex flex-row items-center gap-5">
        <Image src={profile_page_images.MY_PROFILE_ICON} alt={"profile_icon"} />
        <div className="flex flex-col gap-3">
          <h3 className="heading-3 uppercase text-black">{displayName}</h3>
          <h6
            className="heading-6 underline cursor-pointer w-fit"
            onClick={handleLogout}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleLogout()}
          >
            Вийти
          </h6>
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
