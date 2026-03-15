"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

import { layoutMap } from "./layoutMap";
import { CategoriesFrThCarouselData } from "@/constant/common/CategoriesFrThCarouselData";

export const useCarouselLogic = (breakpoint: string) => {
  const layout = layoutMap[breakpoint] ?? layoutMap["xl"];

  const [items, setItems] = useState(CategoriesFrThCarouselData);
  const center = items[3];
  const [activeItem, setActiveItem] = useState(center);

  const slots = useRef<(HTMLImageElement | null)[]>([]);
  const setSlot =
    (index: number) =>
    (el: HTMLImageElement | null): void => {
      slots.current[index] = el;
    };

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);

  const left = items.slice(0, 3);
  const right = items.slice(4, 7);

  /* ----------------------------------------------------
     Animations — always return Tween to avoid TS issues
  ---------------------------------------------------- */

  const animateOut = () => {
    const elements = slots.current.filter(Boolean);

    if (!elements.length) {
      return gsap.to({}, { duration: 0 });
    }

    return gsap.to(elements, {
      opacity: 0,
      scale: 0.94,
      y: -10,
      filter: "blur(6px)",
      duration: 0.45,
      ease: "power2.inOut",
      stagger: 0.04,
    });
  };

  const animateIn = () => {
    const elements = slots.current.filter(Boolean);

    if (!elements.length) {
      return gsap.to({}, { duration: 0 });
    }

    return gsap.fromTo(
      elements,
      { opacity: 0, scale: 1.06, filter: "blur(6px)", y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.95,
        ease: "power3.out",
        stagger: 0.06,
      }
    );
  };

  /* ----------------------------------------------------
     Text animation
  ---------------------------------------------------- */

  useEffect(() => {
    if (!titleRef.current || !descRef.current) return;

    const tl = gsap.timeline();

    tl.to([titleRef.current, descRef.current], {
      opacity: 0,
      y: -10,
      duration: 0.25,
      ease: "power2.out",
      onComplete: () => setActiveItem(center),
    });

    tl.to([titleRef.current, descRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [center]);

  /* ----------------------------------------------------
     Movement logic — ZERO DELAY version
  ---------------------------------------------------- */

  const moveRight = () => {
    const tl = gsap.timeline();

    tl.add(animateOut())
      .add(() => {
        // Hide all valid DOM elements (ignore null)
        const validSlots = slots.current.filter(Boolean);
        gsap.set(validSlots, { opacity: 0 });

        // Update items
        setItems((prev) => [prev[6], ...prev.slice(0, 6)]);
      })
      .add(() => {
        requestAnimationFrame(() => animateIn());
      });
  };

  const moveLeft = () => {
    const tl = gsap.timeline();

    tl.add(animateOut())
      .add(() => {
        gsap.set(slots.current, { opacity: 0 });

        setItems((prev) => [...prev.slice(1, 7), prev[0]]);
      })
      .add(() => {
        requestAnimationFrame(() => animateIn());
      });
  };

  return {
    layout,
    items,
    center,
    activeItem,
    setSlot,
    titleRef,
    descRef,
    left,
    right,
    moveLeft,
    moveRight,
  };
};
