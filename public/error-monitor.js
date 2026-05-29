/**
 * ROK-M Client Error Monitor v2 — Vanilla JS
 * Early-loaded global monitor: errors, promises, resources, console, offline queue.
 */
(function (global) {
  "use strict";

  var ENDPOINT = "/api/log-error";
  var QUEUE_KEY = "rok_error_monitor_queue_v2";
  var SESSION_KEY = "rok_error_monitor_session_v2";
  var DEDUPE_MS = 4000;
  var MAX_BREADCRUMBS = 25;
  var MAX_QUEUE = 40;
  var FLUSH_INTERVAL_MS = 15000;

  var recent = Object.create(null);
  var breadcrumbs = [];
  var isSending = false;

  var sessionId = (function () {
    try {
      var existing = sessionStorage.getItem(SESSION_KEY);
      if (existing) return existing;
      var id = "ses_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, id);
      return id;
    } catch (e) {
      return "ses_" + Date.now();
    }
  })();

  function uuid() {
    return "err_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  }

  function nowIso() {
    return new Date().toISOString();
  }

  function safeString(value, max) {
    var s = value == null ? "" : String(value);
    return s.length > (max || 4000) ? s.slice(0, max || 4000) + "…" : s;
  }

  function pushBreadcrumb(kind, message, meta) {
    breadcrumbs.push({
      ts: nowIso(),
      kind: kind,
      message: safeString(message, 500),
      meta: meta || undefined,
    });
    if (breadcrumbs.length > MAX_BREADCRUMBS) {
      breadcrumbs.shift();
    }
  }

  function getEnvironment() {
    var nav = global.navigator || {};
    var conn = nav.connection || nav.mozConnection || nav.webkitConnection;
    var mem = nav.deviceMemory ? nav.deviceMemory + "GB" : null;
    var connection = conn
      ? [conn.effectiveType, conn.downlink ? conn.downlink + "Mbps" : ""].filter(Boolean).join(" ")
      : null;

    return {
      language: nav.language || "unknown",
      platform: nav.platform || "unknown",
      screen: global.screen ? global.screen.width + "x" + global.screen.height : "unknown",
      viewport: global.innerWidth + "x" + global.innerHeight,
      online: nav.onLine !== false,
      connection: connection,
      memory: mem,
      referrer: safeString(document.referrer || "", 500),
      readyState: document.readyState,
      visibility: document.visibilityState || "unknown",
    };
  }

  function classifyCategory(partial) {
    if (partial.category) return partial.category;
    var type = partial.type || "";
    if (type === "unhandledrejection") return "promise";
    if (type === "resource.error") return "resource";
    if (type === "chunk.load") return "chunk";
    if (type === "console.error") return "console";
    if (type === "window.onerror") return "javascript";
    return "unknown";
  }

  function classifySeverity(partial) {
    if (partial.severity) return partial.severity;
    var msg = (partial.message || "").toLowerCase();
    var type = partial.type || "";
    if (type === "chunk.load" || msg.indexOf("chunkloaderror") !== -1) return "fatal";
    if (type === "resource.error" && (partial.source || "").indexOf("_next/static") !== -1) {
      return "fatal";
    }
    if (type === "console.error") return "warning";
    return "error";
  }

  function buildTags(partial) {
    var tags = partial.tags ? partial.tags.slice() : [];
    if (partial.source && partial.source.indexOf("_next/static") !== -1 && tags.indexOf("next-chunk") === -1) {
      tags.push("next-chunk");
    }
    if (!global.navigator || global.navigator.onLine === false) {
      if (tags.indexOf("offline") === -1) tags.push("offline");
    }
    return tags;
  }

  function fingerprint(payload) {
    return [
      payload.message,
      payload.source,
      payload.line,
      payload.column,
      payload.type,
      payload.pathname,
    ].join("|");
  }

  function shouldSend(payload) {
    var key = fingerprint(payload);
    var now = Date.now();
    if (recent[key] && now - recent[key] < DEDUPE_MS) return false;
    recent[key] = now;
    return true;
  }

  function buildPayload(partial) {
    var pathname = "/";
    try {
      pathname = global.location.pathname || "/";
    } catch (e) {}

    return {
      id: partial.id || uuid(),
      sessionId: sessionId,
      message: safeString(partial.message || "Unknown error", 2000),
      source: partial.source != null ? safeString(partial.source, 1000) : null,
      line: partial.line != null ? partial.line : null,
      column: partial.column != null ? partial.column : null,
      stack: partial.stack != null ? safeString(partial.stack, 8000) : null,
      type: partial.type || "error",
      severity: classifySeverity(partial),
      category: classifyCategory(partial),
      url: (function () {
        try {
          return global.location.href;
        } catch (e) {
          return "unknown";
        }
      })(),
      pathname: pathname,
      userAgent: (global.navigator && global.navigator.userAgent) || "unknown",
      timestamp: partial.timestamp || nowIso(),
      breadcrumbs: breadcrumbs.map(function (b) {
        return { ts: b.ts, kind: b.kind, message: b.message, meta: b.meta };
      }),
      environment: getEnvironment(),
      tags: buildTags(partial),
    };
  }

  function readQueue() {
    try {
      var raw = localStorage.getItem(QUEUE_KEY);
      if (!raw) return [];
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function writeQueue(items) {
    try {
      localStorage.setItem(QUEUE_KEY, JSON.stringify(items.slice(-MAX_QUEUE)));
    } catch (e) {}
  }

  function enqueue(payload) {
    var queue = readQueue();
    queue.push(payload);
    writeQueue(queue);
  }

  function transmit(payload, done) {
    var body = JSON.stringify(payload);

    function onSuccess() {
      pushBreadcrumb("monitor", "Error reported: " + payload.id);
      if (done) done(true);
    }

    function onFail() {
      enqueue(payload);
      if (done) done(false);
    }

    if (global.navigator && global.navigator.sendBeacon) {
      try {
        var blob = new Blob([body], { type: "application/json" });
        if (global.navigator.sendBeacon(ENDPOINT, blob)) {
          onSuccess();
          return;
        }
      } catch (e) {}
    }

    try {
      global
        .fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: body,
          keepalive: true,
        })
        .then(function (res) {
          if (res && res.ok) onSuccess();
          else onFail();
        })
        .catch(onFail);
    } catch (e) {
      onFail();
    }
  }

  function send(partial) {
    var payload = buildPayload(partial);
    if (!shouldSend(payload)) return payload.id;

    pushBreadcrumb("error", payload.message, {
      type: payload.type,
      severity: payload.severity,
    });

    transmit(payload);
    return payload.id;
  }

  function flushQueue() {
    if (isSending || !global.navigator || global.navigator.onLine === false) return;
    var queue = readQueue();
    if (!queue.length) return;

    isSending = true;
    var item = queue[0];

    transmit(item, function (ok) {
      var next = readQueue();
      if (ok && next.length && next[0].id === item.id) {
        next.shift();
        writeQueue(next);
      }
      isSending = false;
      if (readQueue().length) flushQueue();
    });
  }

  function parseReason(reason) {
    if (reason instanceof Error) {
      return { message: reason.message, stack: reason.stack || null };
    }
    if (typeof reason === "string") {
      return { message: reason, stack: null };
    }
    try {
      return { message: JSON.stringify(reason), stack: null };
    } catch (e) {
      return { message: String(reason), stack: null };
    }
  }

  function isChunkSource(src) {
    return src && (src.indexOf("_next/static") !== -1 || src.indexOf("/chunks/") !== -1);
  }

  function initBreadcrumbListeners() {
    document.addEventListener(
      "click",
      function (ev) {
        var t = ev.target;
        if (!t || !t.tagName) return;
        var tag = t.tagName.toLowerCase();
        if (tag !== "a" && tag !== "button") return;
        pushBreadcrumb("ui.click", tag + (t.id ? "#" + t.id : "") + (t.className ? "." + safeString(t.className, 80) : ""));
      },
      true
    );

    global.addEventListener("popstate", function () {
      pushBreadcrumb("navigation", "popstate:" + global.location.pathname);
    });

    global.addEventListener("online", function () {
      pushBreadcrumb("network", "online");
      flushQueue();
    });

    global.addEventListener("offline", function () {
      pushBreadcrumb("network", "offline");
    });

    document.addEventListener("visibilitychange", function () {
      pushBreadcrumb("visibility", document.visibilityState);
    });
  }

  function shouldSkipConsoleMessage(text) {
    var skip = [
      "Download the React DevTools",
      "[Fast Refresh]",
      "[HMR]",
      "Warning: ",
    ];
    for (var i = 0; i < skip.length; i++) {
      if (text.indexOf(skip[i]) !== -1) return true;
    }
    return false;
  }

  function wrapConsole() {
    if (!global.console) return;
    var original = global.console.error;
    if (typeof original !== "function") return;

    global.console.error = function () {
      try {
        original.apply(global.console, arguments);
      } catch (e) {}

      try {
        var parts = [];
        var hasError = false;
        for (var i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (arg instanceof Error) {
            hasError = true;
            parts.push(arg.message);
          } else if (typeof arg === "object") {
            try {
              parts.push(JSON.stringify(arg));
            } catch (e2) {
              parts.push(String(arg));
            }
          } else parts.push(String(arg));
        }
        var text = parts.join(" ");
        if (!hasError && text.length < 24) return;
        if (shouldSkipConsoleMessage(text)) return;

        send({
          message: text,
          type: "console.error",
          severity: "error",
          category: "console",
          tags: ["console-error"],
        });
      } catch (e3) {}
    };
  }

  function initResourceMonitor() {
    global.addEventListener(
      "error",
      function (event) {
        var target = event.target;
        if (!target || target === global) return;

        var tag = target.tagName ? target.tagName.toLowerCase() : "unknown";
        var src =
          target.src || target.href || target.currentSrc || target.getAttribute?.("src") || "unknown";

        var type = isChunkSource(src) ? "chunk.load" : "resource.error";
        var category = isChunkSource(src) ? "chunk" : "resource";

        send({
          message: "Failed to load " + tag + ": " + src,
          source: src,
          type: type,
          category: category,
          severity: type === "chunk.load" ? "fatal" : "error",
          tags: [tag, "resource"],
        });
      },
      true
    );
  }

  global.onerror = function (message, source, lineno, colno, error) {
    var text =
      typeof message === "string"
        ? message
        : error && error.message
          ? error.message
          : String(message);

    var isChunk = isChunkSource(source) || text.toLowerCase().indexOf("loading chunk") !== -1;

    send({
      message: text,
      source: source,
      line: lineno,
      column: colno,
      stack: error && error.stack ? error.stack : null,
      type: isChunk ? "chunk.load" : "window.onerror",
      category: isChunk ? "chunk" : "javascript",
      severity: isChunk ? "fatal" : "error",
    });

    return false;
  };

  global.addEventListener("unhandledrejection", function (event) {
    var parsed = parseReason(event.reason);
    send({
      message: parsed.message,
      stack: parsed.stack,
      type: "unhandledrejection",
      category: "promise",
      severity: "error",
    });
  });

  initBreadcrumbListeners();
  initResourceMonitor();
  wrapConsole();

  setInterval(flushQueue, FLUSH_INTERVAL_MS);
  if (document.readyState === "complete") {
    flushQueue();
  } else {
    global.addEventListener("load", flushQueue);
  }

  pushBreadcrumb("monitor", "Error monitor v2 initialized");

  global.__ROK_ERROR_MONITOR__ = {
    version: 2,
    sessionId: sessionId,
    report: function (message, extra) {
      return send(
        Object.assign(
          {
            message: message,
            type: "error",
            category: "unknown",
          },
          extra || {}
        )
      );
    },
    flush: flushQueue,
    getBreadcrumbs: function () {
      return breadcrumbs.slice();
    },
  };
})(window);
