import { notFound } from "next/navigation";
import ErrorMonitorDashboardBoot from "@/components/dev/ErrorMonitorDashboardBoot";

export const metadata = {
  title: "Монітор клієнта | РОК-М",
  robots: { index: false, follow: false },
};

export default function ErrorMonitorDashboardPage() {
  const enabled =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_ERROR_MONITOR_TEST === "true";

  if (!enabled) {
    notFound();
  }

  return (
    <>
      <link rel="stylesheet" href="/error-monitor-dashboard.css?v=10" />
      <ErrorMonitorDashboardBoot />
      <div className="emd-body">
        <div className="emd-wrap">
          <header className="emd-header">
            <div>
              <h1>Монітор клієнта</h1>
              <p>Помилки та Web Vitals · дослідницький дашборд РОК-М</p>
            </div>
            <div className="emd-actions">
              <button type="button" className="emd-btn" id="emd-refresh">
                Оновити
              </button>
              <label className="emd-btn">
                <input type="checkbox" id="emd-auto" style={{ marginRight: 8 }} />
                Авто (10с)
              </label>
              <a className="emd-btn" href="/">
                На головну
              </a>
              <a className="emd-btn" href="/dev/error-monitor-test">
                QA тести
              </a>
            </div>
          </header>

          <div className="emd-tabs">
            <button type="button" className="emd-tab active" id="emd-tab-btn-errors">
              Помилки
            </button>
            <button type="button" className="emd-tab" id="emd-tab-btn-perf">
              Performance
            </button>
          </div>

          <p id="emd-status" className="emd-status">
            Завантаження…
          </p>

          <div id="emd-panel-errors">
            <section className="emd-stats">
              <div className="emd-stat">
                <div className="emd-stat-label">Всього</div>
                <div className="emd-stat-value" id="emd-total">
                  0
                </div>
              </div>
              <div className="emd-stat">
                <div className="emd-stat-label">За 24 год</div>
                <div className="emd-stat-value ok" id="emd-24h">
                  0
                </div>
              </div>
              <div className="emd-stat">
                <div className="emd-stat-label">Fatal</div>
                <div className="emd-stat-value fatal" id="emd-fatal">
                  0
                </div>
              </div>
              <div className="emd-stat">
                <div className="emd-stat-label">Chunk / bundle</div>
                <div className="emd-stat-value warn" id="emd-chunk">
                  0
                </div>
              </div>
              <div className="emd-stat">
                <div className="emd-stat-label">Сесії</div>
                <div className="emd-stat-value" id="emd-sessions">
                  0
                </div>
              </div>
            </section>

            <section className="emd-grid">
              <div className="emd-panel">
                <h2>Динаміка (останні 12 год)</h2>
                <div className="emd-canvas-wrap">
                  <canvas id="emd-chart-timeline" />
                </div>
              </div>
              <div className="emd-panel">
                <h2>За типом</h2>
                <div className="emd-canvas-wrap">
                  <canvas id="emd-chart-types" />
                </div>
                <div className="emd-legend" id="emd-legend-types" />
              </div>
            </section>

            <section className="emd-panel" style={{ marginBottom: 16 }}>
              <h2>Тестові події</h2>
              <div className="emd-actions">
                <button type="button" className="emd-btn emd-btn-danger" id="emd-test-sync">
                  Sync throw
                </button>
                <button type="button" className="emd-btn emd-btn-danger" id="emd-test-promise">
                  Promise reject
                </button>
                <button type="button" className="emd-btn" id="emd-test-manual">
                  Manual report
                </button>
                <button type="button" className="emd-btn" id="emd-test-resource">
                  Resource 404
                </button>
              </div>
            </section>

            <section className="emd-panel">
              <h2>Журнал помилок</h2>
              <div className="emd-filters">
                <input id="emd-search" type="search" placeholder="Пошук…" />
                <select id="emd-filter-severity">
                  <option value="">Усі severity</option>
                  <option value="fatal">fatal</option>
                  <option value="error">error</option>
                  <option value="warning">warning</option>
                </select>
                <select id="emd-filter-type">
                  <option value="">Усі типи</option>
                  <option value="window.onerror">window.onerror</option>
                  <option value="unhandledrejection">unhandledrejection</option>
                  <option value="chunk.load">chunk.load</option>
                  <option value="resource.error">resource.error</option>
                  <option value="console.error">console.error</option>
                </select>
              </div>
              <div className="emd-table-wrap">
                <table className="emd-table">
                  <thead>
                    <tr>
                      <th>Час</th>
                      <th>Severity</th>
                      <th>Тип</th>
                      <th>Сторінка</th>
                      <th>Повідомлення</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="emd-tbody" />
                </table>
              </div>
              <p id="emd-empty" className="emd-empty" style={{ display: "none" }}>
                Помилок ще немає. Використайте Dev Monitor на сайті або кнопки тестів вище.
              </p>
              <div id="emd-detail-panel" className="emd-detail-panel" style={{ marginTop: 16 }} />
            </section>
          </div>

          <div id="emd-panel-perf" style={{ display: "none" }}>
            <section className="emd-stats">
              <div className="emd-stat">
                <div className="emd-stat-label">Звітів perf</div>
                <div className="emd-stat-value" id="emd-perf-total">
                  0
                </div>
              </div>
              <div className="emd-stat">
                <div className="emd-stat-label">Середній LCP</div>
                <div className="emd-stat-value" id="emd-perf-lcp">
                  —
                </div>
              </div>
              <div className="emd-stat">
                <div className="emd-stat-label">Середній CLS</div>
                <div className="emd-stat-value" id="emd-perf-cls">
                  —
                </div>
              </div>
              <div className="emd-stat">
                <div className="emd-stat-label">Середній TTFB</div>
                <div className="emd-stat-value" id="emd-perf-ttfb">
                  —
                </div>
              </div>
            </section>
            <section className="emd-panel">
              <h2>Звіти продуктивності та рекомендації</h2>
              <p className="emd-status" style={{ marginBottom: 12 }}>
                На будь-якій сторінці в dev: кнопка «Dev Monitor» → зняти метрики. Автозвіт ~3 с
                після завантаження.
              </p>
              <div className="emd-table-wrap">
                <table className="emd-table">
                  <thead>
                    <tr>
                      <th>Час</th>
                      <th>Сторінка</th>
                      <th>Rating</th>
                      <th>LCP</th>
                      <th>CLS</th>
                      <th>TTFB</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="emd-perf-tbody" />
                </table>
              </div>
              <p id="emd-perf-empty" className="emd-empty" style={{ display: "none" }}>
                Немає perf-звітів. Відкрийте головну або натисніть «Зняти метрики» у Dev Monitor.
              </p>
              <div id="emd-perf-detail" className="emd-detail-panel" style={{ marginTop: 16 }} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
