"use client"

import { createContext, useContext } from "react";
import { useAudioPlayer } from "./useAudioPlayer";

const AudioContext = createContext<any>(null);

export const AudioProvider = ({ children }: any) => {
  const player = useAudioPlayer();

  return (
    <AudioContext.Provider value={player}>
      {children}

      <audio
        ref={player.audioRef}
        onTimeUpdate={player.handleTimeUpdate}
        onLoadedMetadata={player.handleLoaded}
        onEnded={player.next}
      />
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);