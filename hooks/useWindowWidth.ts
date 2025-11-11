import { useState, useEffect } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface WindowWidthState {
  width: number | null;
  isSmallerThanSm: boolean;
  breakpoint: Breakpoint;
}

export const useWindowWidth = (): WindowWidthState => {
  const [state, setState] = useState<WindowWidthState>({
    width: null,
    isSmallerThanSm: false,
    breakpoint: "xs",
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
      else breakpoint = "xs";

      setState({
        width: w,
        isSmallerThanSm: w < 640,
        breakpoint,
      });
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return state;
};
