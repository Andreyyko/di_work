(function (win) {
  "use strict";

  var API = "/api/log-error";
  var PERF_API = "/api/log-performance";
  var refreshTimer = null;
  var activeTab = "errors";
  var state = { items: [], stats: null, storage: "file" };
  var perfState = { items: [], stats: null };

  /** Кольори лише для canvas-діаграм (не чіпає UI) */
  var CHART = {
    palette: [
      "#5b9fd4",
      "#9b7ede",
      "#5ec992",
      "#ff6b9d",
      "#f0a04a",
      "#e85d5d",
      "#e6c84b",
      "#8fa3bf",
    ],
    barFrom: "#3d7ab8",
    barTo: "#5b9fd4",
    label: "#262626",
    labelMuted: "#6b6560",
    grid: "rgba(0, 0, 0, 0.06)",
    axis: "rgba(0, 0, 0, 0.15)",
    emptyTick: "rgba(143, 163, 191, 0.55)",
  };

  function $(id) {
    return document.getElementById(id);
  }

  function severityClass(s) {
    if (s === "fatal") return "emd-badge-fatal";
    if (s === "warning") return "emd-badge-warning";
    return "emd-badge-error";
  }

  function formatTime(iso) {
    try {
      return new Date(iso).toLocaleString("uk-UA");
    } catch (e) {
      return iso;
    }
  }

  function setStatus(text, ok) {
    var el = $("emd-status");
    if (!el) return;
    el.textContent = text;
    el.className = "emd-status " + (ok ? "ok" : "err");
  }

  function hourKeyFromDate(d) {
    return d.toISOString().slice(0, 13) + ":00";
  }

  /** Останні N годин (з нулями), щоб графік не був одним стовпчиком на всю ширину */
  function expandTimeline(timeline, slots) {
    slots = slots || 12;
    var map = Object.create(null);
    (timeline || []).forEach(function (p) {
      if (p && p.hour) map[p.hour] = p.count || 0;
    });

    var end = new Date();
    end.setMinutes(0, 0, 0);
    var out = [];
    for (var i = slots - 1; i >= 0; i--) {
      var d = new Date(end.getTime() - i * 60 * 60 * 1000);
      var hour = hourKeyFromDate(d);
      out.push({ hour: hour, count: map[hour] || 0 });
    }
    return out;
  }

  function formatHourLabel(hourKey) {
    if (!hourKey || hourKey.length < 16) return "—";
    return hourKey.slice(11, 16);
  }

  function drawBarChart(canvas, timeline) {
    if (!canvas || !canvas.getContext || !canvas.parentElement) return;
    var ctx = canvas.getContext("2d");
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.parentElement.clientWidth || 300;
    var h = canvas.parentElement.clientHeight || 220;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    var points = expandTimeline(timeline, 12);
    var hasData = points.some(function (p) {
      return p.count > 0;
    });

    if (!hasData) {
      ctx.fillStyle = CHART.labelMuted;
      ctx.font = "14px Montserrat, sans-serif";
      ctx.fillText("Немає даних за останні 12 год", 20, h / 2);
      return;
    }

    var pad = { t: 28, r: 16, b: 40, l: 40 };
    var chartW = w - pad.l - pad.r;
    var chartH = h - pad.t - pad.b;
    var max = Math.max.apply(
      null,
      points.map(function (d) {
        return d.count;
      })
    );
    if (max < 1) max = 1;

    var BAR_W = 28;
    var GAP = 10;
    var slotW = BAR_W + GAP;
    var totalBarsW = points.length * slotW - GAP;
    var startX = pad.l + Math.max(0, (chartW - totalBarsW) / 2);
    var baseY = pad.t + chartH;

    ctx.strokeStyle = CHART.grid;
    ctx.lineWidth = 1;
    for (var g = 0; g <= 4; g++) {
      var gy = pad.t + (chartH / 4) * g;
      ctx.beginPath();
      ctx.moveTo(pad.l, gy);
      ctx.lineTo(pad.l + chartW, gy);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.moveTo(pad.l, baseY);
    ctx.lineTo(pad.l + chartW, baseY);
    ctx.strokeStyle = CHART.axis;
    ctx.stroke();

    points.forEach(function (point, i) {
      var x = startX + i * slotW;
      var label = formatHourLabel(point.hour);

      ctx.fillStyle = CHART.labelMuted;
      ctx.font = "10px Montserrat, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(label, x + BAR_W / 2, h - 10);

      if (point.count < 1) {
        ctx.fillStyle = CHART.emptyTick;
        ctx.fillRect(x + BAR_W / 2 - 2, baseY - 3, 4, 3);
        return;
      }

      var barH = Math.max(6, (point.count / max) * chartH);
      var y = baseY - barH;
      var grad = ctx.createLinearGradient(x, y, x, y + barH);
      grad.addColorStop(0, CHART.barFrom);
      grad.addColorStop(1, CHART.barTo);
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, BAR_W, barH);

      ctx.fillStyle = CHART.label;
      ctx.font = "600 10px Montserrat, sans-serif";
      ctx.fillText(String(point.count), x + BAR_W / 2, y - 4);
    });

    ctx.textAlign = "left";
  }

  function drawDonut(canvas, counts, labels) {
    if (!canvas || !canvas.getContext || !canvas.parentElement) return;
    var ctx = canvas.getContext("2d");
    var dpr = window.devicePixelRatio || 1;
    var size = Math.min(canvas.parentElement.clientWidth || 220, 220);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    var entries = labels
      .map(function (label, i) {
        return { label: label, value: counts[i] || 0 };
      })
      .filter(function (e) {
        return e.value > 0;
      });

    if (!entries.length) {
      ctx.fillStyle = CHART.labelMuted;
      ctx.font = "14px Montserrat, sans-serif";
      ctx.fillText("Немає даних", size / 2 - 40, size / 2);
      return;
    }

    var total = entries.reduce(function (s, e) {
      return s + e.value;
    }, 0);
    var cx = size / 2;
    var cy = size / 2;
    var r = size * 0.36;
    var inner = r * 0.55;
    var start = -Math.PI / 2;
    entries.forEach(function (entry, i) {
      var slice = (entry.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, start, start + slice);
      ctx.arc(cx, cy, inner, start + slice, start, true);
      ctx.closePath();
      ctx.fillStyle = CHART.palette[i % CHART.palette.length];
      ctx.fill();
      start += slice;
    });

    ctx.fillStyle = CHART.label;
    ctx.font = "bold 22px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(String(total), cx, cy + 8);
    ctx.font = "11px Montserrat, sans-serif";
    ctx.fillStyle = CHART.labelMuted;
    ctx.fillText("помилок", cx, cy + 24);
  }

  function renderLegend(container, data) {
    if (!container) return;
    container.innerHTML = "";
    data.forEach(function (item) {
      var el = document.createElement("div");
      el.className = "emd-legend-item";
      el.innerHTML =
        '<span class="emd-dot" style="background:' +
        item.color +
        '"></span><span>' +
        item.label +
        " (" +
        item.value +
        ")</span>";
      container.appendChild(el);
    });
  }

  function setText(id, value) {
    var el = $(id);
    if (el) el.textContent = value;
  }

  function renderStats(stats) {
    var bySeverity = stats.bySeverity || {};
    var byCategory = stats.byCategory || {};
    setText("emd-total", stats.total);
    setText("emd-24h", stats.last24h);
    setText("emd-fatal", bySeverity.fatal || 0);
    setText("emd-chunk", byCategory.chunk || 0);
    setText(
      "emd-sessions",
      String(
        new Set(
          state.items.map(function (i) {
            return i.sessionId;
          })
        ).size
      )
    );
  }

  function getFilteredItems() {
    var q = ($("emd-search") && $("emd-search").value.toLowerCase()) || "";
    var sev = $("emd-filter-severity") && $("emd-filter-severity").value;
    var type = $("emd-filter-type") && $("emd-filter-type").value;

    return state.items.filter(function (item) {
      if (sev && item.severity !== sev) return false;
      if (type && item.type !== type) return false;
      if (!q) return true;
      var hay = [
        item.message,
        item.url,
        item.pathname,
        item.source,
        (item.tags || []).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return hay.indexOf(q) !== -1;
    });
  }

  function renderTable() {
    var tbody = $("emd-tbody");
    var empty = $("emd-empty");
    if (!tbody) return;

    var items = getFilteredItems();
    tbody.innerHTML = "";

    if (!items.length) {
      if (empty) empty.style.display = "block";
      return;
    }
    if (empty) empty.style.display = "none";

    items.forEach(function (item) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" +
        formatTime(item.timestamp || item.receivedAt) +
        "</td>" +
        '<td><span class="emd-badge ' +
        severityClass(item.severity) +
        '">' +
        (item.severity || "error") +
        "</span></td>" +
        "<td>" +
        (item.type || "—") +
        "</td>" +
        "<td>" +
        (item.pathname || "/") +
        "</td>" +
        '<td class="emd-msg">' +
        escapeHtml(item.message) +
        "</td>" +
        '<td><button type="button" class="emd-btn" data-id="' +
        escapeHtml(item.id) +
        '">Деталі</button></td>';

      tr.querySelector("button").addEventListener("click", function () {
        showDetail(item);
      });
      tbody.appendChild(tr);
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function showDetail(item) {
    var box = $("emd-detail-panel");
    if (!box) return;
    var crumbs = (item.breadcrumbs || [])
      .map(function (b) {
        return b.ts + " [" + b.kind + "] " + b.message;
      })
      .join("\n");

    box.innerHTML =
      '<div class="emd-detail-panel"><h3>' +
      escapeHtml(item.message) +
      "</h3>" +
      '<div class="emd-detail"><strong>ID:</strong> ' +
      escapeHtml(item.id) +
      "\n<strong>Session:</strong> " +
      escapeHtml(item.sessionId) +
      "\n<strong>URL:</strong> " +
      escapeHtml(item.url) +
      "\n<strong>Tags:</strong> " +
      escapeHtml((item.tags || []).join(", ") || "—") +
      "\n\n<strong>Stack:</strong>\n" +
      escapeHtml(item.stack || "—") +
      "\n\n<strong>Breadcrumbs:</strong>\n" +
      escapeHtml(crumbs || "—") +
      "\n\n<strong>Environment:</strong>\n" +
      escapeHtml(JSON.stringify(item.environment || {}, null, 2)) +
      "</div></div>";
  }

  function renderCharts(stats) {
    drawBarChart($("emd-chart-timeline"), stats.timeline || []);
    /* resize: перемалювати після layout */
    var tlCanvas = $("emd-chart-timeline");
    if (tlCanvas && !tlCanvas.dataset.emdResizeBound) {
      tlCanvas.dataset.emdResizeBound = "1";
      win.addEventListener("resize", function () {
        if (state.stats) drawBarChart(tlCanvas, state.stats.timeline || []);
      });
    }

    var typeLabels = Object.keys(stats.byType || {});
    var typeValues = typeLabels.map(function (k) {
      return stats.byType[k];
    });
    drawDonut($("emd-chart-types"), typeValues, typeLabels);
    renderLegend(
      $("emd-legend-types"),
      typeLabels.map(function (label, i) {
        return {
          label: label,
          value: typeValues[i],
          color: CHART.palette[i % CHART.palette.length],
        };
      })
    );
  }

  function load() {
    setStatus("Завантаження…", true);
    fetch(API + "?limit=200")
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        try {
          if (!data || !data.ok) throw new Error("API error");
          state.items = data.items || [];
          state.stats = data.stats || { total: 0, last24h: 0, byType: {}, bySeverity: {}, byCategory: {}, byPath: {}, timeline: [] };
          state.storage = data.storage || "file";
          renderStats(state.stats);
          renderCharts(state.stats);
          renderTable();
          setStatus(
            "Оновлено " +
              new Date().toLocaleTimeString("uk-UA") +
              " · записів: " +
              state.items.length +
              " · сховище: " +
              state.storage,
            true
          );
        } catch (renderErr) {
          setStatus("Помилка рендеру: " + renderErr.message, false);
          console.error("[emd]", renderErr);
        }
      })
      .catch(function (err) {
        setStatus("Помилка API: " + err.message, false);
        console.error("[emd]", err);
      });
  }

  function triggerTest(kind) {
    if (kind === "sync") {
      throw new Error("Dashboard sync test");
    }
    if (kind === "promise") {
      Promise.reject(new Error("Dashboard promise test"));
      return;
    }
    if (kind === "manual" && window.__ROK_ERROR_MONITOR__) {
      window.__ROK_ERROR_MONITOR__.report("Manual dashboard test", {
        severity: "warning",
        tags: ["dashboard-test"],
      });
      setTimeout(load, 600);
      return;
    }
    if (kind === "resource") {
      var img = new Image();
      img.onerror = function () {};
      img.src = "/__error_monitor_test_asset__.png";
      setTimeout(load, 800);
    }
  }

  function bindEvents() {
    $("emd-refresh") &&
      $("emd-refresh").addEventListener("click", function () {
        load();
      });

    ["emd-search", "emd-filter-severity", "emd-filter-type"].forEach(function (id) {
      var el = $(id);
      if (el) el.addEventListener("input", renderTable);
      if (el) el.addEventListener("change", renderTable);
    });

    $("emd-test-sync") &&
      $("emd-test-sync").addEventListener("click", function () {
        try {
          triggerTest("sync");
        } catch (e) {}
        setTimeout(load, 600);
      });

    $("emd-test-promise") &&
      $("emd-test-promise").addEventListener("click", function () {
        triggerTest("promise");
        setTimeout(load, 600);
      });

    $("emd-test-manual") &&
      $("emd-test-manual").addEventListener("click", function () {
        triggerTest("manual");
      });

    $("emd-test-resource") &&
      $("emd-test-resource").addEventListener("click", function () {
        triggerTest("resource");
      });
  }

  function ratingClass(r) {
    if (r === "good") return "emd-rating-good";
    if (r === "poor") return "emd-rating-poor";
    return "emd-rating-needs";
  }

  function renderPerfStats(stats) {
    setText("emd-perf-total", stats.total);
    setText("emd-perf-lcp", stats.avgLcp != null ? stats.avgLcp + " ms" : "—");
    setText("emd-perf-cls", stats.avgCls != null ? String(stats.avgCls) : "—");
    setText("emd-perf-ttfb", stats.avgTtfb != null ? stats.avgTtfb + " ms" : "—");
  }

  function showPerfDetail(item) {
    var box = $("emd-perf-detail");
    if (!box) return;
    var recs = (item.recommendations || [])
      .map(function (r) {
        return "<li>" + escapeHtml(r) + "</li>";
      })
      .join("");
    var slow = (item.slowResources || [])
      .map(function (r) {
        return (
          "<li>" +
          escapeHtml(r.name) +
          " — " +
          r.duration +
          " ms (" +
          escapeHtml(r.initiatorType) +
          ")</li>"
        );
      })
      .join("");
    box.innerHTML =
      '<div class="emd-detail-panel"><h3>' +
      escapeHtml(item.pathname) +
      " · " +
      escapeHtml(item.rating) +
      "</h3>" +
      '<div class="emd-detail"><strong>Метрики:</strong>\n' +
      "LCP: " +
      (item.metrics.lcp != null ? item.metrics.lcp + " ms" : "—") +
      "\nFCP: " +
      (item.metrics.fcp != null ? item.metrics.fcp + " ms" : "—") +
      "\nCLS: " +
      (item.metrics.cls != null ? item.metrics.cls : "—") +
      "\nTTFB: " +
      (item.metrics.ttfb != null ? item.metrics.ttfb + " ms" : "—") +
      "\nLong tasks: " +
      item.metrics.longTasks +
      '\n\n<strong>Рекомендації:</strong>\n<ul class="emd-rec-list">' +
      recs +
      '</ul>\n\n<strong>Повільні ресурси:</strong>\n<ul class="emd-rec-list">' +
      (slow || "<li>—</li>") +
      "</ul></div></div>";
  }

  function renderPerfTable() {
    var tbody = $("emd-perf-tbody");
    var empty = $("emd-perf-empty");
    if (!tbody) return;
    tbody.innerHTML = "";
    if (!perfState.items.length) {
      if (empty) empty.style.display = "block";
      return;
    }
    if (empty) empty.style.display = "none";
    perfState.items.forEach(function (item) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" +
        formatTime(item.timestamp) +
        "</td><td>" +
        escapeHtml(item.pathname) +
        '</td><td class="' +
        ratingClass(item.rating) +
        '">' +
        escapeHtml(item.rating) +
        "</td><td>" +
        (item.metrics.lcp != null ? item.metrics.lcp + " ms" : "—") +
        "</td><td>" +
        (item.metrics.cls != null ? item.metrics.cls : "—") +
        "</td><td>" +
        (item.metrics.ttfb != null ? item.metrics.ttfb + " ms" : "—") +
        '</td><td><button type="button" class="emd-btn">Деталі</button></td>';
      tr.querySelector("button").addEventListener("click", function () {
        showPerfDetail(item);
      });
      tbody.appendChild(tr);
    });
  }

  function loadPerf() {
    if (activeTab !== "perf") return;
    setStatus("Завантаження performance…", true);
    fetch(PERF_API + "?limit=100")
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        if (!data.ok) throw new Error("API error");
        perfState.items = data.items || [];
        perfState.stats = data.stats || { total: 0, avgLcp: null, avgCls: null, avgTtfb: null };
        renderPerfStats(perfState.stats);
        renderPerfTable();
        setStatus(
          "Performance · записів: " +
            perfState.items.length +
            " · оновлено " +
            new Date().toLocaleTimeString("uk-UA"),
          true
        );
      })
      .catch(function (err) {
        setStatus("Помилка performance API: " + err.message, false);
      });
  }

  function switchTab(tab) {
    activeTab = tab;
    var errPanel = $("emd-panel-errors");
    var perfPanel = $("emd-panel-perf");
    var btnErr = $("emd-tab-btn-errors");
    var btnPerf = $("emd-tab-btn-perf");
    if (errPanel) errPanel.style.display = tab === "errors" ? "block" : "none";
    if (perfPanel) perfPanel.style.display = tab === "perf" ? "block" : "none";
    if (btnErr) btnErr.classList.toggle("active", tab === "errors");
    if (btnPerf) btnPerf.classList.toggle("active", tab === "perf");
    if (tab === "errors") load();
    else loadPerf();
  }

  function init() {
    bindEvents();
    $("emd-tab-btn-errors") &&
      $("emd-tab-btn-errors").addEventListener("click", function () {
        switchTab("errors");
      });
    $("emd-tab-btn-perf") &&
      $("emd-tab-btn-perf").addEventListener("click", function () {
        switchTab("perf");
      });
    load();
    var auto = $("emd-auto");
    if (auto) {
      auto.checked = true;
      auto.addEventListener("change", function (ev) {
        if (ev.target.checked) {
          refreshTimer = setInterval(function () {
            if (activeTab === "errors") load();
            else loadPerf();
          }, 10000);
        } else if (refreshTimer) {
          clearInterval(refreshTimer);
          refreshTimer = null;
        }
      });
      auto.dispatchEvent(new Event("change"));
    }
  }

  win.__EMD_INIT__ = init;
  win.__EMD_LOAD__ = load;
  win.__EMD_LOAD_PERF__ = loadPerf;
})(window);
