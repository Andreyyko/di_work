"use client";

declare global {
  interface Window {
    __ROK_ERROR_MONITOR__?: {
      report: (message: string, extra?: Record<string, unknown>) => string;
    };
  }
}

/**
 * QA: тести помилок по кнопці (без автокрашу при завантаженні —
 * інакше React overlay блокує всю сторінку і навігацію).
 */
export default function ErrorMonitorTestCrash() {
  function triggerSync() {
    throw new Error("Test Crash");
  }

  function triggerPromise() {
    void Promise.reject(new Error("Test Crash (promise)"));
  }

  function triggerManual() {
    if (typeof window !== "undefined" && window.__ROK_ERROR_MONITOR__) {
      window.__ROK_ERROR_MONITOR__.report("Test Crash (manual)", {
        severity: "error",
        tags: ["qa-test"],
      });
      return;
    }
    alert("error-monitor.js не завантажено");
  }

  const btnClass =
    "rounded-lg border border-black/15 bg-white/80 px-4 py-2 text-sm font-medium transition hover:bg-white";

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm opacity-80">
        Оберіть тип тесту. Сторінка залишиться робочою — можна перейти на{" "}
        <a href="/dev/error-monitor-dashboard" className="underline">
          дашборд
        </a>
        .
      </p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={btnClass} onClick={triggerSync}>
          Sync throw (window.onerror)
        </button>
        <button type="button" className={btnClass} onClick={triggerPromise}>
          Promise reject
        </button>
        <button type="button" className={btnClass} onClick={triggerManual}>
          Manual report (без крашу UI)
        </button>
      </div>
    </div>
  );
}
