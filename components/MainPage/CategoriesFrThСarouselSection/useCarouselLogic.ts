"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

import { layoutMap } from "./layoutMap";
import { CategoriesFrThCarouselData } from "@/constant/MainPageConstant/CategoriesFrThCarouselData";

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

  const animateImages = () => {
    const elements = slots.current.filter(Boolean);
    if (!elements.length) return;

    gsap.fromTo(
      elements,
      { opacity: 0, scale: 1.06, filter: "blur(6px)", y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.08,
      }
    );
  };

  useEffect(() => {
    setTimeout(() => animateImages(), 10);
  }, [items, breakpoint]);

  useEffect(() => {
    if (!titleRef.current || !descRef.current) return;

    const tl = gsap.timeline();

    tl.to([titleRef.current, descRef.current], {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => setActiveItem(center),
    });

    tl.to([titleRef.current, descRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [center]);

  const moveRight = () =>
    setItems((prev) => [prev[6], ...prev.slice(0, 6)]);

  const moveLeft = () =>
    setItems((prev) => [...prev.slice(1, 7), prev[0]]);

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
