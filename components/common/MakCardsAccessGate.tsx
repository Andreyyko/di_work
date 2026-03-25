"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJwt, getMe } from "@/api/auth-api";
import { getMyMethodSections } from "@/api/user-method-sections";
import { canAccessMakCards } from "@/lib/accessRules";
import LoadingScreen from "./LoadingScreen";

type Props = {
  children: React.ReactNode;
};

export default function MakCardsAccessGate({ children }: Props) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const jwt = getJwt();
      const returnPath =
        typeof window !== "undefined"
          ? `${window.location.pathname}${window.location.search}`
          : "/mak-cards";
      const signIn = `/auth/sign-in?returnUrl=${encodeURIComponent(returnPath)}`;

      if (!jwt) {
        router.replace(signIn);
        return;
      }

      try {
        const [me, my] = await Promise.all([getMe(), getMyMethodSections()]);
        if (cancelled) return;

        const makFlag = my.makCardsAccess === true;

        if (canAccessMakCards(me, makFlag)) {
          setReady(true);
          return;
        }

        router.replace("/mak-gallery");
      } catch {
        if (!cancelled) router.replace(signIn);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (!ready) {
      return <LoadingScreen />;
  }

  return <>{children}</>;
}
