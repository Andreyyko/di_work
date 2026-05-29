"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __ROK_DEV_PANEL__?: unknown;
  }
}

const ASSET_VERSION = "3";

/**
 * Плаваюча dev-панель на всіх сторінках (лише development).
 */
export default function DevMonitorPanelBoot() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    const loadScript = (src: string, attr?: string) => {
      if (document.querySelector(`script[data-rok-dev="${attr || src}"]`)) return;
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      if (attr) s.dataset.rokDev = attr;
      document.body.appendChild(s);
    };

    if (!document.querySelector('link[data-rok-dev-panel-css="1"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `/dev-monitor-panel.css?v=${ASSET_VERSION}`;
      link.dataset.rokDevPanelCss = "1";
      document.head.appendChild(link);
    }

    loadScript(`/dev-monitor-panel.js?v=${ASSET_VERSION}`, "panel");
  }, []);

  return null;
}
