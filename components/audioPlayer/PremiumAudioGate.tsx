"use client";

import { useEffect, useState } from "react";
import AudioPlayer from "@/components/audioPlayer/AudioPlayer";
import { getJwt, getMe } from "@/api/auth-api";

export default function PremiumAudioGate() {
  const [isPremium, setIsPremium] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const jwt = getJwt();
      if (!jwt) {
        setIsPremium(false);
        setChecked(true);
        return;
      }

      try {
        const me = await getMe();
        if (cancelled) return;
        setIsPremium(me.isPremium === true);
      } catch {
        if (cancelled) return;
        setIsPremium(false);
      } finally {
        if (cancelled) return;
        setChecked(true);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, []);

  // До перевірки нічого не показуємо, щоб не було “миготіння” музики.
  if (!checked || !isPremium) return null;

  return <AudioPlayer />;
}

