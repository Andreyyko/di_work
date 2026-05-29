/**
 * Dev-only floating panel: synthetic errors + performance demos
 */
(function (win) {
  "use strict";

  if (win.__ROK_DEV_PANEL__) return;

  var root = document.createElement("div");
  root.id = "rok-dev-panel";
  root.innerHTML =
    '<button type="button" class="rok-dev-toggle" aria-expanded="false">Dev Monitor</button>' +
    '<div class="rok-dev-menu">' +
    '<div class="rok-dev-group"><h4>Помилки (тест)</h4>' +
    '<button type="button" data-action="err-sync" class="rok-dev-danger">Sync throw</button>' +
    '<button type="button" data-action="err-promise" class="rok-dev-danger">Promise reject</button>' +
    '<button type="button" data-action="err-manual">Manual error report</button>' +
    "</div>" +
    '<div class="rok-dev-group"><h4>Performance (тест)</h4>' +
    '<button type="button" data-action="perf-report">Зняти метрики зараз</button>' +
    '<button type="button" data-action="perf-slow">Симулювати long task (~120ms)</button>' +
    '<button type="button" data-action="perf-cls">Симулювати layout shift</button>' +
    "</div>" +
    '<a class="rok-dev-link" href="/dev/error-monitor-dashboard">→ Дашборд помилок & perf</a>' +
    "</div>";

  function toggle() {
    var open = root.classList.toggle("rok-dev-open");
    root.querySelector(".rok-dev-toggle").setAttribute("aria-expanded", open ? "true" : "false");
  }

  root.querySelector(".rok-dev-toggle").addEventListener("click", toggle);

  root.addEventListener("click", function (ev) {
    var btn = ev.target.closest("[data-action]");
    if (!btn) return;
    var action = btn.getAttribute("data-action");

    if (action === "err-sync") {
      throw new Error("Dev panel: Test Crash");
    }
    if (action === "err-promise") {
      void Promise.reject(new Error("Dev panel: Promise Crash"));
      return;
    }
    if (action === "err-manual" && win.__ROK_ERROR_MONITOR__) {
      win.__ROK_ERROR_MONITOR__.report("Dev panel manual error", {
        tags: ["dev-panel", "demo"],
      });
      btn.textContent = "✓ Error надіслано";
      setTimeout(function () {
        btn.textContent = "Manual error report";
      }, 2000);
      return;
    }
    if (action === "perf-report" && win.__ROK_PERF_MONITOR__) {
      win.__ROK_PERF_MONITOR__.report();
      btn.textContent = "✓ Perf звіт надіслано";
      setTimeout(function () {
        btn.textContent = "Зняти метрики зараз";
      }, 2000);
      return;
    }
    if (action === "perf-slow" && win.__ROK_PERF_MONITOR__) {
      win.__ROK_PERF_MONITOR__.simulateSlowTask(120);
      btn.textContent = "✓ Long task + звіт";
      setTimeout(function () {
        btn.textContent = "Симулювати long task (~120ms)";
      }, 2000);
      return;
    }
    if (action === "perf-cls" && win.__ROK_PERF_MONITOR__) {
      win.__ROK_PERF_MONITOR__.simulateLayoutShift();
      btn.textContent = "✓ CLS demo + звіт";
      setTimeout(function () {
        btn.textContent = "Симулювати layout shift";
      }, 2000);
    }
  });

  function mount() {
    if (!document.body) return;
    document.body.appendChild(root);
    win.__ROK_DEV_PANEL__ = { root: root };
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})(window);
