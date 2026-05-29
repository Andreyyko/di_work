#!/usr/bin/env node
/**
 * Легкий load test для POST /api/log-error (диплом — стійкість телеметрії).
 *
 * Usage:
 *   node scripts/load-test-log-error.mjs
 *   BASE_URL=http://localhost:3000 CONCURRENCY=20 TOTAL=100 node scripts/load-test-log-error.mjs
 */

const BASE_URL = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const CONCURRENCY = Number(process.env.CONCURRENCY || "10");
const TOTAL = Number(process.env.TOTAL || "50");

function samplePayload(i) {
  const now = new Date().toISOString();
  return {
    message: `Load test error #${i}`,
    type: "error",
    category: "unknown",
    severity: "error",
    url: `${BASE_URL}/load-test`,
    pathname: "/load-test",
    userAgent: "rok-m-load-test/1.0",
    timestamp: now,
    sessionId: "load_test_session",
    tags: ["load-test", "diploma"],
  };
}

async function postOne(index) {
  const t0 = performance.now();
  const res = await fetch(`${BASE_URL}/api/log-error`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(samplePayload(index)),
  });
  const ms = Math.round(performance.now() - t0);
  return { ok: res.ok, status: res.status, ms };
}

async function runPool(start, count) {
  const tasks = [];
  for (let i = 0; i < count; i++) {
    tasks.push(postOne(start + i));
  }
  return Promise.all(tasks);
}

async function main() {
  console.log(`Load test → ${BASE_URL}/api/log-error`);
  console.log(`TOTAL=${TOTAL}, CONCURRENCY=${CONCURRENCY}\n`);

  const all = [];
  let done = 0;
  const started = performance.now();

  while (done < TOTAL) {
    const batch = Math.min(CONCURRENCY, TOTAL - done);
    const results = await runPool(done, batch);
    all.push(...results);
    done += batch;
  }

  const elapsed = Math.round(performance.now() - started);
  const ok = all.filter((r) => r.ok).length;
  const fail = all.length - ok;
  const times = all.map((r) => r.ms).sort((a, b) => a - b);
  const p50 = times[Math.floor(times.length * 0.5)] ?? 0;
  const p95 = times[Math.floor(times.length * 0.95)] ?? 0;
  const max = times[times.length - 1] ?? 0;
  const rps = elapsed > 0 ? ((all.length / elapsed) * 1000).toFixed(1) : "0";

  console.log("--- Results ---");
  console.log(`OK:     ${ok}/${all.length}`);
  console.log(`Failed: ${fail}`);
  console.log(`Time:   ${elapsed} ms`);
  console.log(`RPS:    ~${rps}`);
  console.log(`Latency p50: ${p50} ms`);
  console.log(`Latency p95: ${p95} ms`);
  console.log(`Latency max: ${max} ms`);

  if (fail > 0) {
    const statuses = [...new Set(all.filter((r) => !r.ok).map((r) => r.status))];
    console.log(`Error statuses: ${statuses.join(", ")}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
