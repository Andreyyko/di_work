"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { header_images } from "@/public/images/HeaderImages";
import FrameWrapper from "../../common/FrameWrapper";
import InitialsCircle from "../InitialsCircle";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  onClose: () => void;
  isMobile: boolean;
  closing: boolean;
};

const BurgerMenu = ({ onClose, isMobile, closing }: Props) => {
  const { isSmallerThanSm } = useWindowWidth();

  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!closing) {
        gsap.fromTo(
          menuRef.current,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power2.out",
          }
        );

        gsap.fromTo(
          ".menu-item",
          { opacity: 0, y: 40, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          }
        );
      } else {
        gsap.to(menuRef.current, {
          opacity: 0,
          scale: 0.96,
          duration: 0.25,
          ease: "power2.in",
        });

        gsap.to(".menu-item", {
          opacity: 0,
          y: 20,
          scale: 0.9,
          duration: 0.25,
          stagger: 0.05,
          ease: "power1.in",
        });
      }
    }, menuRef);

    return () => ctx.revert();
  }, [closing]);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 bg-brand-background z-150 flex flex-col justify-between overflow-hidden"
    >
      <div className="relative flex justify-between items-center p-4 z-200 pointer-events-auto menu-item">
        <button onClick={onClose}>
          <X size={32} />
        </button>

        {!isMobile && (
          <div
            className="
              absolute left-1/2 -translate-x-11.5 
              translate-y-0 sm:translate-y-7 
              md:translate-y-3 lg:translate-y-7 pt-12
            menu-item
            "
          >
            <InitialsCircle />
          </div>
        )}

        <div className="flex items-center gap-4 menu-item">
          {isMobile && <InitialsCircle />}

          {!isMobile && (
            <Image
              src={header_images.USER_ICON}
              alt="profile"
              className="w-[17px] h-[17px]"
            />
          )}
        </div>
      </div>

      <div className="relative flex-1 flex items-center justify-center">
        <FrameWrapper
          className="
            absolute -translate-y-10
            w-[90%] h-[80%]
            sm:w-[50%] sm:h-[138%]
            md:w-[60%] md:h-[120%]
            lg:w-[63%] lg:h-[120%]
            xl:w-[43%] xl:h-[138%]
            flex justify-center items-center
            menu-item
          "
          borderRadius="282px"
          frameThickness={isMobile ? "4px" : "8px"}
        >
          <div
            ref={itemsRef}
            className="flex flex-col items-center gap-5 sm:gap-7.5"
          >
            <button className="heading-2-burger uppercase menu-item">
              <span className="first-letter-burger">П</span>ро нас
              <span className="heading-burger pl-2 sm:pl-5">01</span>
            </button>

            <button className="heading-2-burger uppercase translate-x-0 sm:translate-x-5 menu-item">
              <span className="first-letter-burger">Р</span>озділи
              <span className="heading-burger pl-2 sm:pl-5">02</span>
            </button>

            <button className="heading-2-burger uppercase sm:-translate-x-5 menu-item">
              <span className="heading-burger mr-2 sm:mr-5">03</span>
              МА<span className="first-letter-burger">К</span>
            </button>

            <button className="heading-2-burger uppercase menu-item">
              {isSmallerThanSm ? (
                <>
                  <span className="heading-burger mr-2">04</span>
                  <span>
                    FA<span className="first-letter-burger">Q</span>
                  </span>
                </>
              ) : (
                <>
                  <span>
                    FA<span className="first-letter-burger">Q</span>
                  </span>
                  <span className="heading-burger pl-7">04</span>
                </>
              )}
            </button>
          </div>
        </FrameWrapper>
      </div>

      {/* FOOTER */}
      <div className="flex absolute bottom-0 justify-between items-end w-full px-5.5 pb-5 pointer-events-auto menu-item">
        <p className="flex heading-6 gap-10 opacity-60">
          info@rok-m.ua <br />
          +380 00 000 00 00
        </p>

        <div className="flex gap-4 items-center menu-item">
          {isMobile && (
            <Image
              src={header_images.USER_ICON}
              alt="profile"
              className="w-5 h-5"
            />
          )}

          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src={header_images.INSTAGRAM_ICON}
              alt="ig"
              className="w-6 h-6"
            />
          </a>

          <a href="#" target="_blank">
            <Image
              src={header_images.FACEBOOK_ICON}
              alt="fb"
              className="w-6 h-6"
            />
          </a>

          <a href="#" target="_blank">
            <Image
              src={header_images.YOUTUBE_ICON}
              alt="yt"
              className="w-6 h-6"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
