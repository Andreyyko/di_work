"use client";

import Image from "next/image";
import FrameWrapper from "../../common/FrameWrapper";

import { X } from "lucide-react";
import { header_images } from "@/public/images/CommonImages/HeaderImages";
import { useWindowWidth } from "@/hooks/useWindowWidth";

import { useEffect, useRef } from "react";

import gsap from "gsap";

type Props = {
  onClose: () => void;
  isMobile: boolean;
  closing: boolean;
};

const BurgerMenu = ({ onClose, isMobile, closing }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const { isSmallerThanSm } = useWindowWidth();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = ".menu-fade";
      const menuItems = ".menu-item";

      if (!closing) {
        gsap.fromTo(
          menuRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
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
            delay: 0.08,
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

        tl.to(
          items,
          {
            opacity: 0,
            duration: 0.25,
            ease: "power2.inOut",
          },
          0
        );

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
            duration: 0.35,
            ease: "power2.in",
          },
          "-=0.2"
        );
      }
    }, menuRef);

    return () => ctx.revert();
  }, [closing]);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 bg-brand-background z-150 flex flex-col justify-between overflow-hidden"
    >
      <div className="relative flex justify-between items-center p-4 z-200 pointer-events-auto">
        <button onClick={onClose} className="menu-fade">
          <X size={32} />
        </button>

        <div className="flex items-center gap-4">
          {!isMobile && (
            <Image
              src={header_images.USER_ICON}
              alt="profile"
              className="w-[17px] h-[17px] menu-fade"
            />
          )}
        </div>
      </div>

      <div className="relative flex-1 flex items-center justify-center">
        <FrameWrapper
          ref={frameRef}
          className="
            menu-frame
            absolute -translate-y-10
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
            <button className="heading-2-burger uppercase menu-item menu-fade">
              <span className="first-letter" data-first-letter="П">ро нас</span>
              <span className="heading-burger pl-2 sm:pl-5">01</span>
            </button>

            <button className="heading-2-burger uppercase sm:translate-x-5 menu-item menu-fade">
              <span className="first-letter-burger" data-first-letter="Р">озділи</span>
              <span className="heading-burger pl-2 sm:pl-5">02</span>
            </button>

            <button className="heading-2-burger uppercase sm:-translate-x-5 menu-item menu-fade">
              <span className="heading-burger mr-2 sm:mr-5">03</span>
              МА<span className="first-letter-burger" data-first-letter="К"></span>
            </button>

            <button className="heading-2-burger uppercase menu-item menu-fade">
              {isSmallerThanSm ? (
                <>
                  <span className="heading-burger mr-2">04</span>
                  <span>
                    FA<span className="first-letter-burger" data-first-letter="Q"></span>
                  </span>
                </>
              ) : (
                <>
                  <span>
                    FA<span className="first-letter-burger" data-first-letter="Q"></span>
                  </span>
                  <span className="heading-burger pl-7">04</span>
                </>
              )}
            </button>
          </div>
        </FrameWrapper>
      </div>

      <div className="flex absolute bottom-0 justify-between items-end w-full px-5.5 pb-5 pointer-events-auto menu-item menu-fade">
        <p className="flex heading-6 gap-10 opacity-60">
          info@rok-m.ua <br />
          +380 00 000 00 00
        </p>

        <div className="flex gap-4 items-center">
          {isMobile && (
            <Image
              src={header_images.USER_ICON}
              alt="profile"
              className="w-5 h-5 menu-fade"
            />
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
