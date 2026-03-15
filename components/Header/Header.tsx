"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import InitialsCircle from "../common/InitialsCircle";
import BurgerMenu from "./BurgerMenu";

import { header_images } from "@/public/images/CommonImages/HeaderImages";
import { getJwt } from "@/api/auth-api";

const Header = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const handleUserIconClick = () => {
    if (getJwt()) {
      router.push("/profile/my-profile");
    } else {
      router.push("/auth/sign-in");
    }
  };

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");

    const update = () => setIsMobile(mq.matches);
    update();

    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleClose = () => {
    setClosing(true);

    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 850);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <div
        className="
          absolute z-999
          transition-all duration-300 ease-[cubic-bezier(.22,.61,.36,1)]
          
          top-3 left-[85%]        /* mobile */
          md:top-2.5 md:left-[47%]  /* desktop */
        "
      >
        <InitialsCircle />
      </div>

      <header
        className="
          absolute top-0 left-0 w-full 
          flex justify-between items-start
          px-5 py-2.5 z-50
        "
      >
        <button onClick={() => setOpen(true)} className="pt-2.5 z-300">
          <Image
            src={header_images.BURGER_ICON}
            alt="burger-icon"
            className="w-[25px] h-[17px] cursor-pointer"
          />
        </button>

        <div className="z-300">
          <button
            type="button"
            onClick={handleUserIconClick}
            className="pt-3 hidden md:block"
            aria-label="Профіль"
          >
            <Image
              src={header_images.USER_ICON}
              alt="profile-icon"
              className="w-[17px] h-[17px] cursor-pointer"
            />
          </button>
        </div>
      </header>

      {open && (
        <BurgerMenu
          onClose={handleClose}
          isMobile={isMobile}
          closing={closing}
        />
      )}
    </>
  );
};

export default Header;
