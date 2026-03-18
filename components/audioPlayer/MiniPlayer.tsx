"use client";

import { useState } from "react";
import { useAudio } from "../../audio/AudioProvider";
import { Music } from "lucide-react";

export const MiniPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    toggle,
    next,
    prev,
    progress,
    duration,
    seek,
  } = useAudio();

  const [minimized, setMinimized] = useState(false);

  if (!currentTrack) return null;

  if (minimized) {
    return (
      <div
        onClick={() => setMinimized(false)}
        className="
          fixed bottom-4 right-4 z-50
          px-4 py-2 rounded-full
          bg-brand-bordo text-white
          shadow-lg
          cursor-pointer
          text-sm
          flex flex-row gap-2 items-center
        "
      >
        <Music /> {isPlaying ? "Playing" : "Paused"}
      </div>
    );
  }

  return (
    <div
      className="
        fixed bottom-4 left-1/2 -translate-x-1/2
        w-[320px]
        z-50
        
        backdrop-blur-md
        bg-white/20
        
        border border-black/10
        rounded-xl
        
        shadow-[0_10px_30px_rgba(0,0,0,0.2)]
        
        px-4 py-3
        flex flex-col gap-3
        text-black
      "
    >
      <button
        onClick={() => setMinimized(true)}
        className="
          absolute top-2 right-2
          text-black/40 hover:text-black
          text-sm
        "
      >
        ✕
      </button>

      <div className="text-sm font-medium truncate pr-6">
        {currentTrack.title}
      </div>

      <input
        type="range"
        min={0}
        max={duration || 0}
        value={progress}
        onChange={(e) => seek(Number(e.target.value))}
        className="
          w-full h-1
          appearance-none
          bg-black/20
          rounded-lg
          cursor-pointer
          
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-brand-bordo
        "
      />

      <div className="flex items-center justify-between">
        <button
          onClick={prev}
          className="
            px-2 py-1 rounded
            bg-black/10 hover:bg-black/20
            text-xs
          "
        >
          ◀
        </button>

        <button
          onClick={toggle}
          className="
            px-4 py-1.5 rounded-lg
            bg-brand-bordo text-white
            font-medium
            text-sm
          "
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <button
          onClick={next}
          className="
            px-2 py-1 rounded
            bg-black/10 hover:bg-black/20
            text-xs
          "
        >
          ▶
        </button>
      </div>
    </div>
  );
};