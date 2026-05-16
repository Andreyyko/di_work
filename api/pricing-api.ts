const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export type Pricing = {
  makCardsPrice: number;
  mediumPrice: number;
  premiumPrice: number;
  sectionPrice: number;
  currency: string;
};

export const DEFAULT_PRICING: Pricing = {
  makCardsPrice: 1890,
  mediumPrice: 3990,
  premiumPrice: 4990,
  sectionPrice: 890,
  currency: "UAH",
};

type StrapiPricingResponse = {
  data?: {
    makCardsPrice?: number;
    mediumPrice?: number;
    premiumPrice?: number;
    sectionPrice?: number;
    currency?: string;
  };
};

let pricingPromise: Promise<Pricing> | null = null;

function parsePricing(data: StrapiPricingResponse["data"]): Pricing {
  return {
    makCardsPrice: data?.makCardsPrice ?? DEFAULT_PRICING.makCardsPrice,
    mediumPrice: data?.mediumPrice ?? DEFAULT_PRICING.mediumPrice,
    premiumPrice: data?.premiumPrice ?? DEFAULT_PRICING.premiumPrice,
    sectionPrice: data?.sectionPrice ?? DEFAULT_PRICING.sectionPrice,
    currency: data?.currency ?? DEFAULT_PRICING.currency,
  };
}

export async function fetchPricing(): Promise<Pricing> {
  const isServer = typeof window === "undefined";
  const res = await fetch(
    `${API_URL}/pricing`,
    isServer ? { next: { revalidate: 60 } } : undefined
  );

  if (!res.ok) {
    throw new Error(`Failed to load pricing (${res.status})`);
  }

  const json = (await res.json()) as StrapiPricingResponse;
  return parsePricing(json.data);
}

export function getPricing(): Promise<Pricing> {
  if (!pricingPromise) {
    pricingPromise = fetchPricing().catch((error) => {
      pricingPromise = null;
      throw error;
    });
  }
  return pricingPromise;
}

export function resetPricingCache(): void {
  pricingPromise = null;
}
