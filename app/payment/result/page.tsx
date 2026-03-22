"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingScreen from "@/components/common/LoadingScreen";

export default function PaymentResultAliasPage() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const query = params.toString();
    router.replace(query ? `/payment-return?${query}` : "/payment-return");
  }, [params, router]);

  return <LoadingScreen />;
}
