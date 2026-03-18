"use client";

import { useState } from "react";
import { audioData } from "../../constant/audioData/audioData";
import { useAudio } from "../../audio/AudioProvider";

export const SideMenu = ({ open }: { open: boolean }) => {
  const { play, toggle, currentTrack, isPlaying } = useAudio();

  const [activeCat, setActiveCat] = useState<number | null>(null);

  return (
    <div
      className="
        pt-10
        h-full w-full
        text-white
        p-6
        space-y-4
        overflow-y-auto
        bg-linear-to-b from-black/40 to-black/60
        backdrop-blur-2xl
      "
    >
      {audioData.map((cat) => (
        <div key={cat.id} className="space-y-2">
          <h3
            onClick={() => setActiveCat(activeCat === cat.id ? null : cat.id)}
            className="
              text-lg font-semibold tracking-wide
              text-white/80 hover:text-white
              cursor-pointer
              transition
            "
          >
            {cat.title}
          </h3>

          {activeCat === cat.id &&
            cat.tracks.map((track, i) => {
              const active = currentTrack?.id === track.id && isPlaying;
              const isCurrent = currentTrack?.id === track.id;

              return (
                <div
                  key={track.id}
                  className={`
                    track-item
                    flex items-center justify-between
                    py-2 px-2 rounded-lg
                    border border-transparent
                    
                    ${
                      active
                        ? "bg-white/10 text-white border-white/10 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }
                    
                    transition-all duration-200
                  `}
                >
                  <span className="text-sm">{track.title}</span>

                  <button
                    onClick={() =>
                      isCurrent && isPlaying ? toggle() : play(cat.tracks, i)
                    }
                    className="
                      text-xs px-2 py-1 rounded
                      bg-white/10 hover:bg-white/20
                      transition
                    "
                  >
                    {isCurrent && isPlaying ? "Pause" : "Play"}
                  </button>
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};
