"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getMe } from "@/api/auth-api";
import { getMyMethodSections } from "@/api/user-method-sections";
import { getPaymentStatus } from "@/api/payments-api";
import {
  clearOrderReference,
  getOrderReference,
  PaymentKind,
} from "@/lib/paymentOrderReference";
import { downloadPremiumCertificateIfNeeded } from "@/lib/premiumCertificate";
import LoadingScreen from "@/components/common/LoadingScreen";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function PaymentReturnPage() {
  const router = useRouter();
  const params = useSearchParams();
  const kind = params.get("kind");
  const category = params.get("category");
  const methodic = params.get("methodic");

  const resolveSectionRoute = () => {
    if (category && methodic) return `/methodics-sections/${category}/${methodic}`;
    if (category) return `/methodics-sections/${category}`;
    return "/catalog-methodics";
  };

  const redirectByKind = () => {
    if (kind === "mak") {
      router.replace("/mak-cards");
      return true;
    }
    if (kind === "medium" || kind === "premium") {
      router.replace("/profile/my-sections");
      return true;
    }
    if (kind === "section") {
      router.replace(resolveSectionRoute());
      return true;
    }
    return false;
  };

  useEffect(() => {
    let cancelled = false;

    const resolveReturn = async () => {
      const kindValue = (kind ?? "") as PaymentKind | "";
      const hasKnownKind =
        kindValue === "mak" ||
        kindValue === "medium" ||
        kindValue === "premium" ||
        kindValue === "section";
      const orderReferenceFromQuery = params.get("orderReference");
      const orderReference = hasKnownKind
        ? getOrderReference(kindValue) || orderReferenceFromQuery
        : orderReferenceFromQuery;

      if (orderReference) {
        for (let i = 0; i < 10; i += 1) {
          try {
            const status = await getPaymentStatus(orderReference);
            if (cancelled) return;
            if (status.paid) {
              if (hasKnownKind) clearOrderReference(kindValue);
              if (kind === "premium") {
                try {
                  const me = await getMe();
                  if (!cancelled) {
                    await downloadPremiumCertificateIfNeeded(me, orderReference);
                  }
                } catch {
                  /* ignore */
                }
              }
              if (redirectByKind()) return;
            }
          } catch {
            if (cancelled) return;
          }

          await sleep(1500);
        }
      }

      for (let i = 0; i < 8; i += 1) {
        try {
          const [me, mySections] = await Promise.all([
            getMe(),
            getMyMethodSections(),
          ]);
          if (cancelled) return;

          const hasMedium = me.isMedium === true;
          const hasPremium = me.isPremium === true;
          const hasMak = me.makCardsAccess === true || mySections.makCardsAccess === true;

          if (kind === "mak" && hasMak) {
            router.replace("/mak-cards");
            return;
          }
          if (kind === "medium" && hasMedium) {
            router.replace("/profile/my-sections");
            return;
          }
          if (kind === "premium" && hasPremium) {
            await downloadPremiumCertificateIfNeeded(me, orderReference);
            router.replace("/profile/my-sections");
            return;
          }
          if (kind === "section") {
            router.replace(resolveSectionRoute());
            return;
          }

          if (!kind && (hasPremium || hasMedium)) {
            router.replace("/profile/my-sections");
            return;
          }
          if (!kind && hasMak) {
            router.replace("/mak-cards");
            return;
          }
        } catch {
          if (cancelled) return;
          router.replace("/auth/sign-in");
          return;
        }

        await sleep(2000);
      }

      if (cancelled) return;
      if (kind === "mak") {
        router.replace("/mak-cards");
        return;
      }
    };

    resolveReturn();

    return () => {
      cancelled = true;
    };
  }, [category, kind, methodic, params, router]);

  return <LoadingScreen />;
}
