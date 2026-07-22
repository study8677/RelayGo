import { filterStations, sortStations, stations } from "./data.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const state = { compare: new Set() };

const dom = {
  search: $("#search"), grid: $("#stationGrid"), count: $("#resultCount"), sort: $("#sort"), active: $("#activeFilters"),
  empty: $("#emptyState"), compareBar: $("#compareBar"), compareNames: $("#compareNames"), compareCount: $("#compareCount"),
  detail: $("#detailDialog"), detailContent: $("#detailContent"), compareDialog: $("#compareDialog"), compareContent: $("#compareContent"),
  submitDialog: $("#submitDialog"), toast: $("#toast")
};

function getFilters() {
  return {
    query: dom.search.value,
    models: $$("input[name=model]:checked").map((input) => input.value),
    invoice: $("#invoice").checked, specialInvoice: $("#specialInvoice").checked,
    corporate: $("#corporate").checked, contract: $("#contract").checked,
    available: $("#available").checked, claimed: $("#claimed").checked
  };
}

function tags(station) {
  return station.models.map((model) => `<span>${model}</span>`).join("");
}

function card(station, index) {
  const selected = state.compare.has(station.id);
  return `<article class="station-card" style="--delay:${index * 45}ms">
    <div class="card-top">
      <div class="station-identity"><div class="station-mark ${station.accent}">${station.mark}</div><div><h3>${station.name}</h3><p>${station.claimed ? '<span class="verified">◆ 已认领</span>' : '<span class="unclaimed">○ 未认领</span>'}</p></div></div>
      <span class="status ${station.available ? "online" : "offline"}"><i></i>${station.available ? "运行正常" : "服务异常"}</span>
    </div>
    <p class="station-description">${station.description}</p>
    <div class="model-tags">${tags(station)}</div>
    <div class="metrics"><div><span>最低参考价</span><strong>¥${station.minPrice.toFixed(1)}</strong><small>/ 百万输入 Token</small></div><div><span>近 30 天可用率</span><strong>${station.uptime}%</strong><small>${station.latency}ms 首字延迟</small></div></div>
    <div class="service-row"><span class="${station.invoice ? "yes" : "no"}">${station.invoice ? "✓" : "×"} 发票</span><span class="${station.specialInvoice ? "yes" : "no"}">${station.specialInvoice ? "✓" : "×"} 专票</span><span class="${station.corporate ? "yes" : "no"}">${station.corporate ? "✓" : "×"} 对公</span><span>${station.updated}</span></div>
    <div class="card-actions"><button class="compare-toggle ${selected ? "selected" : ""}" data-compare="${station.id}">${selected ? "✓ 已加入对比" : "+ 加入对比"}</button><button class="detail-button" data-detail="${station.id}">查看详情 <span>→</span></button></div>
  </article>`;
}

function render() {
  const filters = getFilters();
  const results = sortStations(filterStations(stations, filters), dom.sort.value);
  dom.grid.innerHTML = results.map(card).join("");
  dom.count.textContent = `${results.length} 个结果`;
  dom.empty.hidden = results.length > 0;
  renderActiveFilters(filters);
}

function renderActiveFilters(filters) {
  const names = [...filters.models];
  const map = { invoice: "可开发票", specialInvoice: "支持专票", corporate: "对公转账", contract: "可签合同", available: "当前可用", claimed: "已认领" };
  Object.entries(map).forEach(([key, label]) => filters[key] && names.push(label));
  dom.active.innerHTML = names.length ? names.map((name) => `<span>${name}</span>`).join("") : "<em>全部站点</em>";
}

function updateCompare() {
  const selected = stations.filter((station) => state.compare.has(station.id));
  dom.compareBar.classList.toggle("show", selected.length > 0);
  dom.compareCount.textContent = selected.length;
  dom.compareNames.innerHTML = selected.map((station) => `<span>${station.name}<button data-remove="${station.id}" aria-label="移除 ${station.name}">×</button></span>`).join("");
  render();
}

function toggleCompare(id) {
  if (state.compare.has(id)) state.compare.delete(id);
  else if (state.compare.size < 4) state.compare.add(id);
  else return showToast("一次最多比较 4 个中转站");
  updateCompare();
}

function showDetail(id) {
  const station = stations.find((item) => item.id === id);
  dom.detailContent.innerHTML = `<div class="detail-hero"><div class="station-mark ${station.accent}">${station.mark}</div><div><span>STATION PROFILE</span><h2>${station.name}</h2><p>${station.description}</p></div></div>
    <div class="detail-badges"><span class="status ${station.available ? "online" : "offline"}"><i></i>${station.available ? "运行正常" : "服务异常"}</span><span>${station.risk}</span><span>${station.claimed ? "已认领" : "未认领"}</span></div>
    <section class="detail-section"><div class="detail-section-title"><span>01</span><h3>模型与费率</h3><small>人民币 / 百万 Token</small></div><div class="model-table"><div class="table-row table-head"><span>模型</span><span>站内别名</span><span>输入</span><span>输出</span></div>${station.modelDetails.map((model) => `<div class="table-row"><strong>${model.name}</strong><code>${model.alias}</code><b>¥${model.input}</b><b>¥${model.output}</b></div>`).join("")}</div></section>
    <section class="detail-section"><div class="detail-section-title"><span>02</span><h3>支付与企业服务</h3></div><div class="detail-grid"><div><small>支付方式</small><strong>${station.payment.join(" · ")}</strong></div><div><small>最低充值</small><strong>¥${station.minRecharge}</strong></div><div><small>退款政策</small><strong>${station.refund}</strong></div><div><small>发票类型</small><strong>${station.invoiceType}</strong></div><div><small>开票主体</small><strong>${station.invoiceEntity}</strong></div><div><small>开票周期</small><strong>${station.invoiceCycle}</strong></div></div></section>
    <div class="source-note"><span>数据来源</span><strong>${station.source}</strong><small>更新于 ${station.updated} · 请以站点实际账单和服务条款为准</small></div>`;
  dom.detail.showModal();
}

function openComparison() {
  const selected = stations.filter((station) => state.compare.has(station.id));
  if (selected.length < 2) return showToast("请至少选择 2 个中转站");
  const rows = [
    ["运行状态", (s) => s.available ? "正常" : "异常"], ["最低输入价", (s) => `¥${s.minPrice}/M`], ["30 天可用率", (s) => `${s.uptime}%`],
    ["首字延迟", (s) => `${s.latency}ms`], ["开发票", (s) => s.invoice ? "支持" : "不支持"], ["增值税专票", (s) => s.specialInvoice ? "支持" : "不支持"],
    ["对公转账", (s) => s.corporate ? "支持" : "不支持"], ["签订合同", (s) => s.contract ? "支持" : "不支持"], ["开票周期", (s) => s.invoiceCycle]
  ];
  dom.compareContent.innerHTML = `<div class="dialog-heading"><span>COMPARE</span><h2>中转站横向对比</h2><p>统一口径呈现价格、稳定性与企业服务。</p></div><div class="comparison" style="--columns:${selected.length}"><div class="comparison-head"><span>对比项目</span>${selected.map((s) => `<strong>${s.name}</strong>`).join("")}</div>${rows.map(([label, value]) => `<div class="comparison-row"><span>${label}</span>${selected.map((s) => `<b>${value(s)}</b>`).join("")}</div>`).join("")}</div><p class="comparison-note">数据更新周期不同，使用前请前往站点确认最新价格和条款。</p>`;
  dom.compareDialog.showModal();
}

function showToast(message) {
  dom.toast.textContent = message;
  dom.toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => dom.toast.classList.remove("show"), 2600);
}

document.addEventListener("input", (event) => {
  if (event.target.matches("#search, .filters input, #sort")) render();
});
document.addEventListener("change", (event) => {
  if (event.target.matches(".filters input, #sort")) render();
});
document.addEventListener("click", (event) => {
  const compare = event.target.closest("[data-compare]");
  const detail = event.target.closest("[data-detail]");
  const remove = event.target.closest("[data-remove]");
  if (compare) toggleCompare(compare.dataset.compare);
  if (detail) showDetail(detail.dataset.detail);
  if (remove) toggleCompare(remove.dataset.remove);
  if (event.target.closest("[data-close]")) event.target.closest("dialog").close();
  const quick = event.target.closest("[data-query]");
  if (quick) { dom.search.value = quick.dataset.query; render(); document.querySelector("#stations").scrollIntoView({ behavior: "smooth" }); }
});

$("#openCompare").addEventListener("click", openComparison);
$("#submitStation").addEventListener("click", () => dom.submitDialog.showModal());
$("#clearFilters").addEventListener("click", () => { dom.search.value = ""; $$(".filters input").forEach((input) => { input.checked = false; }); render(); });
$("#submitForm").addEventListener("submit", (event) => { event.preventDefault(); dom.submitDialog.close(); event.target.reset(); showToast("提交成功，我们会尽快审核"); });
document.addEventListener("keydown", (event) => { if ((event.metaKey || event.ctrlKey) && event.key === "k") { event.preventDefault(); dom.search.focus(); } });
$$("dialog").forEach((dialog) => dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); }));

render();
