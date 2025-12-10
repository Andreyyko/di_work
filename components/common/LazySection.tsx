"use client";

import dynamic from "next/dynamic";
import { useInView } from "@/hooks/useInView";

export default function LazySection({ loader, className }: { loader: () => Promise<any>, className?: string }) {
  const { ref, isVisible } = useInView({ rootMargin: "200px" });

  const Component = dynamic(loader, { ssr: false });

  return (
    <section ref={ref} className={className}>
      {isVisible ? <Component /> : null}
    </section>
  );
}
