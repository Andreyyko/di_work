"use client";

import { useEffect } from "react";
import gsap from "gsap";

import FrameWrapper from "@/components/common/FrameWrapper";
import AuthorCol from "../../components/MakGalleryPage/AuthorCol";
import EffectComp from "../../components/MakGalleryPage/EffectComp";
import MakImages from "../../components/MakGalleryPage/ForWhatImages";
import InsideMak from "../../components/MakGalleryPage/InsideMak";
import Purpose from "../../components/MakGalleryPage/Purpose";
import MakPlan from "../../components/MakGalleryPage/MakPlan";
import { mak_gallery_images } from "@/public/images/MakGallery";
import Image from "next/image";
import { white_letter } from "@/public/images/CommonImages/PostCard";

export default function MakGalleryPage() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-mak-animate]",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power1.out",
          stagger: 0.15,
          clearProps: "opacity,transform",
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="px-5 pb-20 overflow-hidden relative" data-mak-animate>
      <Image
        src={
          "/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg"
        }
        alt={"backgorund"}
        fill
        priority
        className="object-cover -z-10"
      />
      <h5 className="heading-5 -translate-x-5" data-mak-animate>
        Тренінги для відновлення
        <br />
        ресурсу — це не просто
        <br />
        практики, це повернення до
        <br />
        внутрішньої гармонії
      </h5>

      <h2
        className="heading-2 uppercase text-center -tracking-widest pt-5 pb-[330px] md:pb-[170px] lg:pb-0 relative"
        data-mak-animate
      >
        <span className="first-letter -tracking-widest" data-first-letter="У">
          нікальна авторська{" "}
          <span className="first-letter -tracking-widest" data-first-letter="З">
            бірка
          </span>
        </span>
        художніх рукотворних
        <span
          className="first-letter tracking-[-0.2em] lg:tracking-[-0.18em]"
          data-first-letter="М"
        >
          етафоричних асоціативних
        </span>{" "}
        картин, створена{" "}
        <span className="first-letter -tracking-widest" data-first-letter="Д">
          ля роботи з
        </span>{" "}
        емоціями, ресурсами й{" "}
        <span className="first-letter -tracking-widest" data-first-letter="В">
          нутрішнім світом{" "}
          <span className="first-letter" data-first-letter="Л">
            юдини
          </span>
        </span>
        <Image
          src={white_letter.WHITE_POSTCARD}
          alt="postcard"
          className="absolute left-[20%] lg:left-[35%] lg:w-[30%] z-50 rotate-10"
          data-mak-animate
        />
      </h2>

      <div data-mak-animate>
        <MakImages />
      </div>
      <div data-mak-animate>
        <AuthorCol />
      </div>
      <div data-mak-animate>
        <InsideMak />
      </div>
      <div data-mak-animate>
        <EffectComp />
      </div>
      <div data-mak-animate>
        <Purpose />
      </div>

      <FrameWrapper
        className="right-0 block lg:hidden mx-auto lg:mx-0"
        src={mak_gallery_images.BOOK_PREVIEW}
        width="330px"
        showOrnaments
        paddingX={20}
        paddingY={40}
        data-mak-animate
      />

      <div data-mak-animate>
        <MakPlan />
      </div>
    </section>
  );
}
