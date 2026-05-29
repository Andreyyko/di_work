import { notFound } from "next/navigation";
import ErrorMonitorTestCrash from "@/components/dev/ErrorMonitorTestCrash";

export const metadata = {
  title: "Error Monitor QA",
  robots: { index: false, follow: false },
};

export default function ErrorMonitorTestPage() {
  const enabled =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_ERROR_MONITOR_TEST === "true";

  if (!enabled) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16 font-montserrat text-brand-text">
      <h1 className="mb-4 text-2xl font-semibold">QA: Error Monitor</h1>
      <p className="mb-6 text-sm opacity-80">
        Натисніть кнопку тесту нижче — помилка піде в монітор. Перевірте{" "}
        <code>logs/client-errors.jsonl</code> або{" "}
        <a href="/dev/error-monitor-dashboard" className="underline">
          дашборд →
        </a>
      </p>
      <ErrorMonitorTestCrash />
      <section className="mt-10 space-y-4 rounded-lg border border-black/10 p-4 text-sm">
        <h2 className="font-semibold">Додаткові тести в консолі браузера</h2>
        <pre className="overflow-x-auto rounded bg-black/5 p-3 text-xs">
          {`// Синхронна помилка (window.onerror)
throw new Error("Sync test");

// Помилка проміса (unhandledrejection)
Promise.reject(new Error("Promise test"));`}
        </pre>
        <p className="opacity-80">
          Тест 2 (блокування бандла): DevTools → Network → Block request URL з
          патерном <code>_next/static</code>, потім перезавантажте сторінку.
        </p>
      </section>
    </div>
  );
}
