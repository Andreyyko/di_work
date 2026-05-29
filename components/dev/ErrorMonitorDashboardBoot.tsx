"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __EMD_INIT__?: () => void;
    __EMD_LOAD__?: () => void;
  }
}

const DASHBOARD_ASSET_VERSION = "10";

/**
 * Next.js App Router не завжди виконує <script> з Server Component.
 * Підвантажуємо vanilla-дашборд після монтування клієнта.
 */
export default function ErrorMonitorDashboardBoot() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const init = () => {
      const api = window.__EMD_INIT__;
      if (typeof api === "function") {
        api();
      } else {
        const status = document.getElementById("emd-status");
        if (status) {
          status.textContent = "Не вдалося завантажити error-monitor-dashboard.js";
          status.className = "emd-status err";
        }
      }
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-emd-dashboard="1"]'
    );
    if (existing) {
      init();
      return;
    }

    const script = document.createElement("script");
    script.src = `/error-monitor-dashboard.js?v=${DASHBOARD_ASSET_VERSION}`;
    script.async = true;
    script.dataset.emdDashboard = "1";
    script.onload = init;
    script.onerror = () => {
      const status = document.getElementById("emd-status");
      if (status) {
        status.textContent = "Помилка завантаження /error-monitor-dashboard.js";
        status.className = "emd-status err";
      }
    };
    document.body.appendChild(script);
  }, []);

  return null;
}
