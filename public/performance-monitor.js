/**
 * ROK-M Performance Monitor — Vanilla JS (Web Vitals + recommendations)
 */
(function (win) {
  "use strict";

  var ENDPOINT = "/api/log-performance";
  var SESSION_KEY = "rok_perf_session";
  var SENT_KEY_PREFIX = "rok_perf_sent:";

  var state = {
    lcp: null,
    fcp: null,
    cls: 0,
    inp: null,
    longTasks: 0,
    sent: false,
  };

  var sessionId = (function () {
    try {
      var id = sessionStorage.getItem(SESSION_KEY);
      if (id) return id;
      id = "perf_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, id);
      return id;
    } catch (e) {
      return "perf_" + Date.now();
    }
  })();

  function uuid() {
    return "pm_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }

  function pathname() {
    try {
      return win.location.pathname || "/";
    } catch (e) {
      return "/";
    }
  }

  function alreadySent() {
    try {
      return sessionStorage.getItem(SENT_KEY_PREFIX + pathname()) === "1";
    } catch (e) {
      return state.sent;
    }
  }

  function markSent() {
    state.sent = true;
    try {
      sessionStorage.setItem(SENT_KEY_PREFIX + pathname(), "1");
    } catch (e) {}
  }

  function getNavMetrics() {
    var nav = performance.getEntriesByType("navigation")[0];
    if (!nav) return { ttfb: null, domContentLoaded: null, loadEvent: null };
    return {
      ttfb: nav.responseStart ? Math.round(nav.responseStart - nav.requestStart) : null,
      domContentLoaded: nav.domContentLoadedEventEnd
        ? Math.round(nav.domContentLoadedEventEnd)
        : null,
      loadEvent: nav.loadEventEnd ? Math.round(nav.loadEventEnd) : null,
    };
  }

  function getSlowResources() {
    var limit = 8;
    var threshold = 800;
    return performance
      .getEntriesByType("resource")
      .filter(function (r) {
        return r.duration >= threshold;
      })
      .sort(function (a, b) {
        return b.duration - a.duration;
      })
      .slice(0, limit)
      .map(function (r) {
        return {
          name: String(r.name).slice(-120),
          duration: Math.round(r.duration),
          transferSize: r.transferSize || null,
          initiatorType: r.initiatorType || "unknown",
        };
      });
  }

  function rateMetric(name, value) {
    if (value == null) return "good";
    if (name === "lcp") {
      if (value <= 2500) return "good";
      if (value <= 4000) return "needs-improvement";
      return "poor";
    }
    if (name === "cls") {
      if (value <= 0.1) return "good";
      if (value <= 0.25) return "needs-improvement";
      return "poor";
    }
    if (name === "ttfb") {
      if (value <= 800) return "good";
      if (value <= 1800) return "needs-improvement";
      return "poor";
    }
    if (name === "fcp") {
      if (value <= 1800) return "good";
      if (value <= 3000) return "needs-improvement";
      return "poor";
    }
    return "good";
  }

  function overallRating(metrics) {
    var scores = [
      rateMetric("lcp", metrics.lcp),
      rateMetric("cls", metrics.cls),
      rateMetric("ttfb", metrics.ttfb),
      rateMetric("fcp", metrics.fcp),
    ];
    if (scores.indexOf("poor") !== -1) return "poor";
    if (scores.indexOf("needs-improvement") !== -1) return "needs-improvement";
    return "good";
  }

  function buildRecommendations(metrics, slowResources) {
    var tips = [];

    if (metrics.lcp != null && metrics.lcp > 2500) {
      tips.push(
        "LCP " +
          metrics.lcp +
          " ms — оптимізуйте головне зображення (preload, WebP, менший розмір)."
      );
    }
    if (metrics.cls != null && metrics.cls > 0.1) {
      tips.push(
        "CLS " +
          metrics.cls +
          " — зафіксуйте розміри для медіа та шрифтів (width/height, font-display: swap)."
      );
    }
    if (metrics.ttfb != null && metrics.ttfb > 800) {
      tips.push(
        "TTFB " +
          metrics.ttfb +
          " ms — прискоріть відповідь сервера або CDN (кеш API, edge)."
      );
    }
    if (metrics.fcp != null && metrics.fcp > 1800) {
      tips.push("FCP " + metrics.fcp + " ms — зменшіть блокуючі ресурси в <head>.");
    }
    if (metrics.longTasks > 2) {
      tips.push(
        "Виявлено " +
          metrics.longTasks +
          " long tasks — розбийте важкий JS, відкладіть некритичний код."
      );
    }

    slowResources.forEach(function (r) {
      if (r.duration >= 1200) {
        tips.push(
          "Повільний ресурс (" +
            r.duration +
            " ms): " +
            r.name +
            " — lazy-load або оптимізація."
        );
      }
    });

    var nextChunks = performance
      .getEntriesByType("resource")
      .filter(function (r) {
        return String(r.name).indexOf("_next/static") !== -1 && r.duration > 600;
      }).length;
    if (nextChunks >= 4) {
      tips.push(
        "Багато повільних chunk-файлів Next.js (" +
          nextChunks +
          ") — dynamic import(), code splitting."
      );
    }

    if (!tips.length) {
      tips.push("Метрики в нормі. Продовжуйте моніторинг після змін у продакшені.");
    }

    return tips.slice(0, 8);
  }

  function buildPayload() {
    var nav = getNavMetrics();
    var slowResources = getSlowResources();
    var metrics = {
      ttfb: nav.ttfb,
      fcp: state.fcp,
      lcp: state.lcp,
      cls: state.cls ? Number(state.cls.toFixed(3)) : 0,
      inp: state.inp,
      domContentLoaded: nav.domContentLoaded,
      loadEvent: nav.loadEvent,
      longTasks: state.longTasks,
    };

    return {
      id: uuid(),
      sessionId: sessionId,
      url: win.location.href,
      pathname: pathname(),
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      metrics: metrics,
      rating: overallRating(metrics),
      recommendations: buildRecommendations(metrics, slowResources),
      slowResources: slowResources,
      tags: ["web-vitals"],
    };
  }

  function transmit(payload) {
    var body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      try {
        var blob = new Blob([body], { type: "application/json" });
        if (navigator.sendBeacon(ENDPOINT, blob)) return;
      } catch (e) {}
    }
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
      keepalive: true,
    }).catch(function () {});
  }

  function report(reason) {
    if (alreadySent() && reason !== "manual") return null;
    var payload = buildPayload();
    if (reason === "manual") {
      payload.tags = (payload.tags || []).concat(["manual", "demo"]);
      payload.id = uuid();
    } else {
      markSent();
    }
    transmit(payload);
    return payload;
  }

  function observeWebVitals() {
    if (!("PerformanceObserver" in win)) return;

    try {
      var lcpObs = new PerformanceObserver(function (list) {
        var entries = list.getEntries();
        var last = entries[entries.length - 1];
        if (last) state.lcp = Math.round(last.startTime);
      });
      lcpObs.observe({ type: "largest-contentful-paint", buffered: true });
    } catch (e) {}

    try {
      var fcpObs = new PerformanceObserver(function (list) {
        list.getEntries().forEach(function (entry) {
          if (entry.name === "first-contentful-paint") {
            state.fcp = Math.round(entry.startTime);
          }
        });
      });
      fcpObs.observe({ type: "paint", buffered: true });
    } catch (e) {}

    try {
      var clsObs = new PerformanceObserver(function (list) {
        list.getEntries().forEach(function (entry) {
          if (!entry.hadRecentInput) {
            state.cls += entry.value;
          }
        });
      });
      clsObs.observe({ type: "layout-shift", buffered: true });
    } catch (e) {}

    try {
      var inpObs = new PerformanceObserver(function (list) {
        list.getEntries().forEach(function (entry) {
          var delay = entry.processingStart - entry.startTime;
          if (!state.inp || delay > state.inp) state.inp = Math.round(delay);
        });
      });
      inpObs.observe({ type: "first-input", buffered: true });
    } catch (e) {}

    try {
      var ltObs = new PerformanceObserver(function (list) {
        state.longTasks += list.getEntries().length;
      });
      ltObs.observe({ type: "longtask", buffered: true });
    } catch (e) {}
  }

  function scheduleReport() {
    var run = function () {
      setTimeout(function () {
        report("auto");
      }, 3000);
    };

    if (document.readyState === "complete") run();
    else win.addEventListener("load", run);

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") report("hidden");
    });
  }

  observeWebVitals();
  scheduleReport();

  win.__ROK_PERF_MONITOR__ = {
    report: function () {
      return report("manual");
    },
    simulateSlowTask: function (ms) {
      var start = performance.now();
      while (performance.now() - start < (ms || 120)) {
        /* demo blocking */
      }
      state.longTasks += 1;
      return report("manual");
    },
    simulateLayoutShift: function () {
      var el = document.createElement("div");
      el.textContent = "Demo layout shift";
      el.style.cssText =
        "position:fixed;top:40%;left:40%;padding:12px;background:#f0a04a;z-index:99998;border-radius:8px;";
      document.body.appendChild(el);
      setTimeout(function () {
        el.remove();
      }, 1500);
      state.cls += 0.15;
      return report("manual");
    },
  };
})(window);
