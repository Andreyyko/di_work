"use client";

import type { ComponentType, ReactNode } from "react";

/**
 * HOC-патерн: обгортає сторінку компонентом контролю доступу (другий рівень після Edge Middleware).
 */
export function withAccessGate<P extends object>(
  Wrapped: ComponentType<P>,
  Gate: ComponentType<{ children: ReactNode }>
): ComponentType<P> {
  function WithAccessGate(props: P) {
    return (
      <Gate>
        <Wrapped {...props} />
      </Gate>
    );
  }

  const wrappedName = Wrapped.displayName || Wrapped.name || "Component";
  WithAccessGate.displayName = `withAccessGate(${wrappedName})`;

  return WithAccessGate;
}
