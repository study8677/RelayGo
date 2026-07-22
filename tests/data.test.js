import test from "node:test";
import assert from "node:assert/strict";
import { filterStations, sortStations, stations } from "../src/data.js";

const empty = { query: "", models: [], invoice: false, specialInvoice: false, corporate: false, contract: false, available: false, claimed: false };

test("search matches station and model names", () => {
  assert.equal(filterStations(stations, { ...empty, query: "浮岛" }).length, 1);
  assert.ok(filterStations(stations, { ...empty, query: "DeepSeek" }).length >= 3);
});

test("combined enterprise filters are applied", () => {
  const results = filterStations(stations, { ...empty, invoice: true, specialInvoice: true, corporate: true, contract: true });
  assert.ok(results.length > 0);
  assert.ok(results.every((station) => station.invoice && station.specialInvoice && station.corporate && station.contract));
});

test("model filters use intersection semantics", () => {
  const results = filterStations(stations, { ...empty, models: ["Claude", "Gemini"] });
  assert.ok(results.every((station) => station.models.includes("Claude") && station.models.includes("Gemini")));
});

test("sort supports price, uptime and latency", () => {
  assert.equal(sortStations(stations, "price")[0].id, "island");
  assert.equal(sortStations(stations, "uptime")[0].id, "aurora");
  assert.equal(sortStations(stations, "latency")[0].id, "aurora");
});
