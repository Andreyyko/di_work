"use client";

import dynamic from "next/dynamic";
import { useInView } from "@/hooks/useInView";
import { useMemo } from "react";

type Props = {
  loader: () => Promise<any>;
  className?: string;
  minHeight?: number;
};

export default function LazySection({
  loader,
  className,
  minHeight = 200,
}: Props) {
  const { ref, isVisible } = useInView({
    rootMargin: "0px",
    threshold: 0.1,
  });

  const Component = useMemo(
    () => dynamic(loader, { ssr: false }),
    [loader]
  );

  return (
    <section
      ref={ref}
      className={className}
      style={{ minHeight }}
    >
      {isVisible && <Component />}
    </section>
  );
}
