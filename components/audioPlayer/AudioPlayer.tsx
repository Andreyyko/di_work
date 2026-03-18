"use client";

import { AudioProvider } from "@/audio/AudioProvider";
import { useState, useRef } from "react";
import { SideMenu } from "./SideMenu";
import { MiniPlayer } from "./MiniPlayer";
import { gsap } from "gsap";

const AudioPlayer = () => {
  const [open, setOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    const next = !open;
    setOpen(next);

    gsap.to(buttonRef.current, {
      scale: next ? 1.05 : 1,
      x: next ? -8 : 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(menuRef.current, {
      x: next ? 0 : 380,
      duration: 0.6,
      ease: "expo.out",
    });
  };

  return (
    <AudioProvider>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="
          fixed right-0 top-1/2 -translate-y-1/2
          w-[50px] h-20
          rounded-l-[40px]
          z-50
          
          backdrop-blur-xl
          bg-black/10
          border border-black/20
          
          shadow-[0_0_20px_rgba(255,255,255,0.08)]
          
          flex items-center justify-center
          text-white text-xl
          
          transition-all duration-300
          hover:bg-black/20
        "
      >
        {open ? "→" : "🎧"}
      </button>

      <div
        ref={menuRef}
        className="
          fixed top-0 right-0 h-full w-[380px]
          translate-x-full
          z-40
          
          backdrop-blur-2xl
          bg-black/40
          


        "
      >
        <SideMenu open={open} />
      </div>


      <MiniPlayer />
    </AudioProvider>
  );
};

export default AudioPlayer;