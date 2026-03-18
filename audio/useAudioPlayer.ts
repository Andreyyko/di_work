import { useEffect, useMemo, useRef, useState } from "react";
import { Track } from "../constant/audioData/audioData";

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = useMemo(() => {
    if (currentIndex === -1) return null;
    return playlist[currentIndex];
  }, [playlist, currentIndex]);

  const play = (tracks: Track[], index: number) => {
    const selectedTrack = tracks[index];

    if (currentTrack?.id === selectedTrack.id) {
      toggle();
      return;
    }

    setPlaylist([...tracks]);
    setCurrentIndex(index);
  };

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src) return;

    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  const next = () => {
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (currentIndex === -1) return;
    if (!playlist[currentIndex]) return;

    audio.src = playlist[currentIndex].src;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [currentIndex, playlist]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setProgress(audio.currentTime);
  };

  const handleLoaded = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
  };

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setProgress(time);
  };

  return {
    audioRef,
    currentTrack,
    isPlaying,
    progress,
    duration,
    play,
    toggle,
    next,
    prev,
    seek,
    handleTimeUpdate,
    handleLoaded,
  };
};