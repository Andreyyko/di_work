"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { profile_page_images } from "@/public/images/ProfilePage";
import Link from "next/link";

const ProfilePageHeaderMobile = () => {
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const el = dropdownRef.current;
    if (!el) return;

    if (open) {
      gsap.killTweensOf(el);
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: -8, pointerEvents: "none" },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
          onStart: () => {
            el.style.pointerEvents = "auto";
          },
        }
      );
    } else {
      gsap.killTweensOf(el);
      gsap.to(el, {
        autoAlpha: 0,
        y: -8,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          el.style.pointerEvents = "none";
        },
      });
    }
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative flex flex-row gap-2 pt-25 pb-25 w-full"
    >
      <Image
        src={profile_page_images.MY_PROFILE_ICON}
        alt="profile_icon"
        className="w-[50px]"
      />

      <div className="flex flex-col gap-1.5 justify-center w-full">
        <div className="flex flex-row justify-between items-center gap-2">
          <h3 className="heading-3 uppercase text-black text-[18px]">
            Імʼя та прізвище
          </h3>

          <Image
            src={profile_page_images.OPEN_PROFILE_MENU_ICON}
            alt="menu"
            className={`cursor-pointer transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setOpen((v) => !v)}
          />
        </div>

        <div className="flex flex-row justify-between w-full">
          <h6 className="heading-6 underline cursor-pointer text-[14px]">
            Вийти
          </h6>
          <Link href="/">
            <h6 className="heading-6 underline cursor-pointer h-fit">
              Повернутися на головну
            </h6>
          </Link>
        </div>
      </div>

      <div
        ref={dropdownRef}
        className="absolute left-1/2 md:left-3/4 top-33 w-[95%] md:w-[50%] -translate-x-1/2 bg-brand-background border border-brand-black z-50 overflow-hidden"
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        <div className="px-4 py-3 heading-6 text-black opacity-100 border-b border-brand-black hover:bg-brand-background cursor-pointer">
          <Link href="/profile/edit-profile">
            Редагування персональних даних
          </Link>
        </div>
        <Link href="/auth/forgot-password">
          <div className="px-4 py-3 heading-6 text-black opacity-100 border-b border-brand-black hover:bg-brand-background cursor-pointer">
            Зміна пароля
          </div>
        </Link>
        <Link href={"/profile/my-sections"}>
          <div className="px-4 py-3 heading-6 text-black opacity-100  border-brand-black hover:bg-brand-background cursor-pointer">
            Мої розділи
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfilePageHeaderMobile;
