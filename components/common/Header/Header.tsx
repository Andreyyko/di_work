"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import InitialsCircle from "../InitialsCircle";
import BurgerMenu from "./BurgerMenu";

import { header_images } from "@/public/images/CommonImages/HeaderImages";
import { useWindowWidth } from "@/hooks/useWindowWidth";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const { isSmallerThanMd } = useWindowWidth();

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

  const circlePosition = (() => {
    let pos = {
      top: "10px",
      left: "47%",
    };

    if (isSmallerThanMd && !open) {
      pos = {
        top: "12px",
        left: "85%",
      };
    }

    if (open) {
      pos = {
        top: "10px",
        left: "47%",
      };
    }

    if (isSmallerThanMd && open) {
      pos = {
        top: "12px",
        left: "85%",
      };
    }

    return pos;
  })();

  return (
    <>
      <div
        className="
        absolute z-999
          transition-all duration-300
          ease-[cubic-bezier(.22,.61,.36,1)]
        "
        style={circlePosition}
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
            className="w-[25px] h-[17px]"
          />
        </button>

        <div className="z-300">
          {!isSmallerThanMd && (
            <button className="pt-3">
              <Image
                src={header_images.USER_ICON}
                alt="profile-icon"
                className="w-[17px] h-[17px]"
              />
            </button>
          )}
        </div>
      </header>

      {open && (
        <BurgerMenu
          onClose={handleClose}
          isMobile={isSmallerThanMd}
          closing={closing}
        />
      )}
    </>
  );
};

export default Header;
