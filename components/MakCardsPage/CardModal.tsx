"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Card } from "@/constant/MakCardsData/cards";
import { X, RotateCcw } from "lucide-react";

export default function CardModal({
  card,
  onClose,
}: {
  card: Card;
  onClose: () => void;
}) {
  const [flipped, setFlipped] = useState(false);
  const [isOpening, setIsOpening] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (isClosing || isOpening) return;
    setIsClosing(true);

    const tl = gsap.timeline({
      onComplete: onClose,
    });

    tl.to(
      controlsRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: "power2.in",
      },
      0
    );

    tl.to(
      modalRef.current,
      {
        scale: 0.5,
        opacity: 0,
        y: 150,
        duration: 0.5,
        ease: "power2.in",
      },
      0.1
    );
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpening, isClosing]);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  useEffect(() => {
    if (!modalRef.current || !innerRef.current || !glowRef.current) return;

    gsap.set(modalRef.current, { scale: 0.2, opacity: 0, y: 100 });
    gsap.set(innerRef.current, { rotateY: 0 });
    gsap.set(glowRef.current, { opacity: 0, scale: 0.5 });
    gsap.set(controlsRef.current, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      onComplete: () => setIsOpening(false),
    });

    tl.to(
      modalRef.current,
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "back.out(1.2)",
      },
      0
    );

    tl.to(
      innerRef.current,
      {
        rotateY: 1080,
        duration: 1.4,
        ease: "expo.out",
      },
      0.1
    );

    tl.to(
      controlsRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "-=0.5"
    );

    tl.to(
      glowRef.current,
      {
        opacity: 0.7,
        scale: 1.5,
        duration: 0.4,
        ease: "power2.out",
      },
      0.2
    ).to(glowRef.current, {
      opacity: 0,
      duration: 0.8,
    });
  }, []);

  useEffect(() => {
    if (isOpening || isClosing || !innerRef.current) return;

    gsap.to(innerRef.current, {
      rotateY: flipped ? 1260 : 1080,
      duration: 0.6,
      ease: "power2.inOut",
    });
  }, [flipped, isOpening, isClosing]);

  return (
    <div
      className="fixed inset-0 z-1150 bg-black/90 backdrop-blur-sm flex items-center justify-center overflow-hidden"
      onClick={handleClose}
    >
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] bg-white/30 rounded-full blur-[100px] pointer-events-none"
      />

      <div
        ref={modalRef}
        className="flex flex-col items-center gap-8 translate-z-0"
      >
        <div
          className="relative xl:w-[600px] xl:h-[880px] w-[320px] h-[480px] cursor-pointer"
          style={{ perspective: 2000 }}
          onClick={(e) => {
            e.stopPropagation();
            if (!isOpening && !isClosing) setFlipped((f) => !f);
          }}
        >
          <div
            ref={innerRef}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl shadow-white/10"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Image
                src={card.frontImage}
                alt="Front"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <Image
                src={card.backImage}
                alt="Back"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>

        <div
          ref={controlsRef}
          className="flex items-center gap-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => !isOpening && !isClosing && setFlipped((f) => !f)}
            className="group flex flex-col items-center gap-2 text-white/70 hover:text-white transition-all"
          >
            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white/10 group-active:scale-95 transition-all">
              <RotateCcw size={24} />
            </div>
            <span className="text-xs uppercase tracking-widest font-light">
              Перевернути
            </span>
          </button>

          <button
            onClick={handleClose}
            className="group flex flex-col items-center gap-2 text-white/70 hover:text-brand-bordo transition-all"
          >
            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white/10 group-hover:border-brand-bordo/50 group-active:scale-95 transition-all">
              <X size={24} />
            </div>
            <span className="text-xs uppercase tracking-widest font-light">
              Закрити
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
