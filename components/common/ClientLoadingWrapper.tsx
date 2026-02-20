"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import { usePathname } from "next/navigation";

export default function ClientLoaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setShowLoader(true);

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{showLoader ? <LoadingScreen /> : children}</>;
}
