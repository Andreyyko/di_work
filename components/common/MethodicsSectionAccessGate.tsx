"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getJwt, getMe } from "@/api/auth-api";
import { getMyMethodSections } from "@/api/user-method-sections";
import { canAccessMethodicsCategory } from "@/lib/accessRules";

type Props = {
  categorySlug: string;
  children: React.ReactNode;
};

export default function MethodicsSectionAccessGate({
  categorySlug,
  children,
}: Props) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const jwt = getJwt();
      const returnPath =
        typeof window !== "undefined"
          ? `${window.location.pathname}${window.location.search}`
          : `/methodics-sections/${categorySlug}`;
      const signIn = `/auth/sign-in?returnUrl=${encodeURIComponent(returnPath)}`;

      if (!jwt) {
        router.replace(signIn);
        return;
      }

      try {
        const [me, my] = await Promise.all([
          getMe(),
          getMyMethodSections<{ slug?: string }>(),
        ]);
        if (cancelled) return;

        const owned = new Set<string>();
        for (const rel of my.items || []) {
          const slug = rel.method_section?.slug;
          if (slug) owned.add(slug);
        }

        if (canAccessMethodicsCategory(categorySlug, me, owned)) {
          setReady(true);
          return;
        }

        router.replace("/catalog-methodics");
      } catch {
        if (!cancelled) router.replace(signIn);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [categorySlug, router]);

  if (!ready) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-6 bg-[url('/images/CatalogMethodicsPage/backgrounds/MethodicsListBackGrounds.svg')]">
        <p className="heading-5 opacity-80 text-center">
          Перевірка доступу до розділу…
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
