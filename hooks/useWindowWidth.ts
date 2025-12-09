"use client"

import { useState, useEffect } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface WindowWidthState {
  width: number | null;
  breakpoint: Breakpoint;
  isSmallerThanSm: boolean;
  isbiggerThanMd: boolean;
  isSmallerThanMd: boolean;
  isSmallerThanLgTitle: boolean;
  isSmallerThanLg: boolean;
  isSmallerThanXl: boolean;
  isLgOrLarger: boolean;
  isXlOrLarger: boolean;
  is2xlOrLarger: boolean;
}

export const useWindowWidth = (): WindowWidthState => {
  const [state, setState] = useState<WindowWidthState>({
    width: null,
    breakpoint: "xs",
    isSmallerThanSm: false,
    isbiggerThanMd: false,
    isSmallerThanMd: false,
    isSmallerThanLgTitle: false,
    isSmallerThanLg: false,
    isSmallerThanXl: false,
    isLgOrLarger: false,
    isXlOrLarger: false,
    is2xlOrLarger: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;

      let breakpoint: Breakpoint = "xs";
      if (w >= 1536) breakpoint = "2xl";
      else if (w >= 1280) breakpoint = "xl";
      else if (w >= 1024) breakpoint = "lg";
      else if (w >= 768) breakpoint = "md";
      else if (w >= 640) breakpoint = "sm";

      setState({
        width: w,
        breakpoint,
        isSmallerThanSm: w < 640,
        isbiggerThanMd: w > 768,
        isSmallerThanMd: w < 768,
        isSmallerThanLgTitle: w < 886,
        isSmallerThanLg: w < 1024,
        isSmallerThanXl: w < 1280,
        isLgOrLarger: w >= 1024,
        isXlOrLarger: w >= 1280,
        is2xlOrLarger: w >= 1536,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return state;
};