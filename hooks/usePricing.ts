"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_PRICING,
  getPricing,
  type Pricing,
} from "@/api/pricing-api";

export function usePricing() {
  const [pricing, setPricing] = useState<Pricing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    getPricing()
      .then((data) => {
        if (!cancelled) setPricing(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err : new Error("Failed to load pricing"));
        setPricing(DEFAULT_PRICING);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { pricing, isLoading, error };
}
