"use client";

import EditProfileDataForm from "@/components/ProfilePage/EditProfileData/EditProfileDataForm";
import ProfilePageHeader from "@/components/ProfilePage/ProfilePageHeader";
import ProfilePageHeaderMobile from "@/components/ProfilePage/ProfilePageHeaderMobile";
import Link from "next/link";

const EditProfilePage = () => {
  return (
    <div className="px-5 bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')]">
      <h5 className="heading-5 lg:w-[20%] w-[40%] left-0 absolute">
        Кожен, хто переступає цей поріг, отримує шанс відкрити власні ресурси і
        сили.
      </h5>
      <div className="hidden lg:block">
        <ProfilePageHeader />
      </div>
      <div className="block lg:hidden">
        <ProfilePageHeaderMobile />
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="lg:flex flex-col gap-1 hidden w-[40%]">
          <h3 className="uppercase heading-3 pb-5 cursor-pointer">Акаунт</h3>
          <Link href="/profile/edit-profile">
            <h4 className="heading-4 cursor-pointer">
              Редагування персональних даних
            </h4>
          </Link>
          <Link href="/auth/forgot-password">
            <h4 className="heading-4 cursor-pointer">Зміна пароля</h4>
          </Link>
          <Link href={"/profile/my-sections"}>
            <h4 className="heading-4 cursor-pointer">Мої розділи</h4>
          </Link>
        </div>
        <EditProfileDataForm />
      </div>
    </div>
  );
};

export default EditProfilePage;
