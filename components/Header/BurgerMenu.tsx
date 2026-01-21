"use client";

import Image from "next/image";
import FrameWrapper from "../common/FrameWrapper";

import { X } from "lucide-react";
import { header_images } from "@/public/images/CommonImages/HeaderImages";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { main_page_backrounds } from "@/public/images/MainPageImages/backgrounds";
import Link from "next/link";

type Props = {
  onClose: () => void;
  isMobile: boolean;
  closing: boolean;
};

const BurgerMenu = ({ onClose, isMobile, closing }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = ".menu-fade";
      const menuItems = ".menu-item";

      if (!closing) {
        gsap.fromTo(
          menuRef.current,
          { opacity: 0, scale: 1.05, filter: "blur(6px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
          }
        );

        gsap.fromTo(
          frameRef.current,
          { opacity: 0, scale: 0.92, filter: "blur(12px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power3.out",
            delay: 0.1,
          }
        );

        gsap.fromTo(
          items,
          { opacity: 0, y: 8, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.07,
            ease: "power3.out",
            delay: 0.25,
          }
        );
      } else {
        const tl = gsap.timeline();

        tl.to(items, {
          opacity: 0,
          duration: 0.25,
          ease: "power2.inOut",
        });

        tl.to(
          menuItems,
          {
            opacity: 0,
            y: 15,
            filter: "blur(8px)",
            duration: 0.35,
            stagger: { each: 0.06, from: "end" },
            ease: "power3.inOut",
          },
          0
        );

        tl.to(
          frameRef.current,
          {
            opacity: 0,
            scale: 0.9,
            filter: "blur(12px)",
            duration: 0.45,
            ease: "power3.inOut",
          },
          "-=0.2"
        );

        tl.to(
          menuRef.current,
          {
            opacity: 0,
            scale: 1.04,
            filter: "blur(8px)",
            duration: 0.45,
            ease: "power3.inOut",
          },
          "-=0.25"
        );
      }
    }, menuRef);

    return () => ctx.revert();
  }, [closing]);

  return (
    <div
      style={{
        backgroundImage: `url(${main_page_backrounds.CONRACT_FORM_BACKGROUND.src})`,
      }}
      ref={menuRef}
      className="fixed inset-0 bg-brand-background z-150 flex flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat"
    >
      <div className="relative flex justify-between items-center p-4 z-200 pointer-events-auto">
        <button onClick={onClose} className="menu-fade">
          <X size={32} className="cursor-pointer" />
        </button>

        <div className="flex items-center gap-4">
          {!isMobile && (
            <Link href="/profile/my-profile" onClick={onClose}>
              <Image
                src={header_images.USER_ICON}
                alt="profile"
                className="menu-fade cursor-pointer"
              />
            </Link>
          )}
        </div>
      </div>

      <div className="relative flex-1 flex items-center justify-center">
        <FrameWrapper
          ref={frameRef}
          className="
            menu-frame
            absolute 
            w-[90%] h-[80%]
            sm:w-[50%] sm:h-[138%]
            md:w-[60%] md:h-[120%]
            lg:w-[63%] lg:h-[120%]
            xl:w-[43%] xl:h-[138%]
            flex justify-center items-center
          "
          borderRadius="282px"
          frameThickness={isMobile ? "4px" : "8px"}
        >
          <div className="flex flex-col items-center gap-5 sm:gap-7.5">
            <Link
              onClick={onClose}
              href="/about"
              className="heading-2-burger uppercase menu-item menu-fade"
            >
              <span className="first-letter" data-first-letter="П">
                ро нас
              </span>
            </Link>

            <Link
              href="/catalog-methodics"
              onClick={onClose}
              className="heading-2-burger uppercase  menu-item menu-fade"
            >
              <span className="first-letter-burger" data-first-letter="Р">
                озділи
              </span>
            </Link>

            <Link
              href="/mak-gallery"
              onClick={onClose}
              className="heading-2-burger uppercase pl-15 md:pl-25 sm:-translate-x-5 menu-item menu-fade"
            >
              МА
              <span className="first-letter-burger" data-first-letter="К">
                <span className="opacity-0">O</span>
              </span>
            </Link>

            <Link
              href="/faq"
              onClick={onClose}
              className="heading-2-burger uppercase menu-item menu-fade"
            >
              <span className="sm:hidden flex items-center">
                <span>
                  FA
                  <span className="first-letter-burger" data-first-letter="Q">
                    <span className="opacity-0">F</span>
                  </span>
                </span>
              </span>

              <span className="hidden sm:flex items-center">
                <span>
                  FA
                  <span
                    className="first-letter-burger"
                    data-first-letter="Q"
                  ></span>
                </span>
              </span>
            </Link>
          </div>
        </FrameWrapper>
      </div>

      <div className="flex absolute bottom-0 justify-between items-end w-full px-5.5 pb-5 pointer-events-auto menu-item menu-fade">
        <p className="flex flex-col heading-6 gap-1 opacity-60">
          <a href="mailto:info@rok-m.ua" className="hover:underline">
            info@rok-m.ua
          </a>
          <a href="tel:+380000000000" className="hover:underline">
            +380 00 000 00 00
          </a>
        </p>

        <div className="flex gap-4 items-center">
          {isMobile && (
            <Link href="/profile/my-profile" onClick={onClose}>
              <Image
                src={header_images.USER_ICON}
                alt="profile"
                className="w-5 h-5 menu-fade cursor-pointer"
              />
            </Link>
          )}

          <a
            href="https://www.instagram.com/bogdanagalitskaandreiko/"
            target="_blank"
          >
            <Image
              src={header_images.INSTAGRAM_ICON}
              alt="ig"
              className="w-6 h-6 menu-fade"
            />
          </a>

          <a href="https://www.facebook.com/share/15xGzPkuLT/" target="_blank">
            <Image
              src={header_images.FACEBOOK_ICON}
              alt="fb"
              className="w-6 h-6 menu-fade"
            />
          </a>

          <a href="#" target="_blank">
            <Image
              src={header_images.YOUTUBE_ICON}
              alt="yt"
              className="w-6 h-6 menu-fade"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
