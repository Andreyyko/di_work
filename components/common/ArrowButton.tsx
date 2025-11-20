"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

interface ArrowButtonProps {
  direction?: "left" | "right";
  onClick?: () => void;
  className?: string;
}

const ArrowButton = ({
  direction = "right",
  onClick,
  className = "",
}: ArrowButtonProps) => {
  const [cycle, setCycle] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  const handleClick = () => {
    setCycle((c) => c + 1);
    onClick?.();
  };

  useEffect(() => {
    if (!pathRef.current) return;

    gsap.set(pathRef.current, {
      strokeDasharray: 1000,
      strokeDashoffset: 1000,
      opacity: 0,
      fillOpacity: 0,
    });

    const tl = gsap.timeline();

    tl.to(pathRef.current, {
      opacity: 1,
      strokeDashoffset: 0,
      duration: 1.6,
      ease: "power2.inOut",
    });

    tl.to(
      pathRef.current,
      {
        fillOpacity: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.7"
    );
  }, [cycle]);

  return (
    <div
      onClick={handleClick}
      onKeyDown={(e) =>
        e.key === "Enter" || e.key === " " ? handleClick() : null
      }
      role="button"
      tabIndex={0}
      className={`inline-block cursor-pointer select-none text-brand-bordo ${className}`}
      style={{
        width: "clamp(50px, 8vw, 117px)",
        height: "clamp(33px, 4vw, 77px)",
        transform: direction === "left" ? "scaleX(-1)" : "scaleX(1)",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 117 77"
        preserveAspectRatio="xMidYMid meet"
        width="100%"
        height="100%"
      >
        <path
          ref={pathRef}
          d="M34 724 c-22 -51 -30 -190 -14 -239 28 -86 120 -144 236 -149 52 -3
          69 -8 96 -31 49 -42 142 -82 238 -102 65 -14 129 -18 273 -18 103 0 187 0 187
          0 0 -1 -22 -18 -50 -39 -27 -21 -69 -61 -92 -89 l-43 -52 66 53 c37 28 105 76
          152 106 l86 53 -87 23 c-47 13 -115 38 -149 56 -35 18 -63 31 -63 28 0 -10
          124 -83 153 -90 l32 -8 -40 -7 c-67 -13 -344 -9 -425 5 -98 18 -185 51 -224
          86 l-31 29 30 10 c58 22 80 36 131 86 161 160 54 301 -114 150 -66 -60 -97
          -122 -88 -181 l6 -44 -64 0 c-87 0 -142 30 -175 95 -22 41 -25 61 -25 134 1
          47 6 104 12 125 15 53 6 59 -14 10z m512 -126 c-9 -45 -62 -123 -110 -162 -37
          -31 -97 -66 -111 -66 -12 0 -4 64 14 98 34 67 149 160 200 162 10 0 12 -8 7
          -32z"
          transform="translate(0,77) scale(0.1,-0.1)"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default ArrowButton;
