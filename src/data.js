export const stations = [
  {
    id: "northstar", name: "北辰 API", mark: "北", accent: "lime", claimed: true, verified: true, available: true,
    description: "面向开发者的多模型聚合服务，价格透明，支持企业采购。", models: ["Claude", "GPT", "Gemini"],
    modelDetails: [{ name: "Claude Sonnet 4", alias: "claude-sonnet-4", input: 9.8, output: 49 }, { name: "GPT-4.1", alias: "gpt-4.1", input: 13.6, output: 54.4 }, { name: "Gemini 2.5 Pro", alias: "gemini-2.5-pro", input: 8.2, output: 41 }],
    minPrice: 9.8, priceModel: "Claude Sonnet 4", uptime: 99.96, latency: 428, updated: "2 小时前", source: "站长提交 · 平台核验",
    payment: ["支付宝", "微信支付", "对公转账"], minRecharge: 10, refund: "未消费余额可退",
    invoice: true, specialInvoice: true, corporate: true, contract: true, invoiceEntity: "北京北辰云智科技有限公司", invoiceCycle: "3–5 个工作日", invoiceType: "数电普票 / 增值税专票", risk: "低风险"
  },
  {
    id: "matrix", name: "矩阵云", mark: "矩", accent: "violet", claimed: true, verified: true, available: true,
    description: "覆盖主流模型的高可用线路，提供灵活的小额充值。", models: ["Claude", "GPT", "DeepSeek"],
    modelDetails: [{ name: "Claude Sonnet 4", alias: "claude-sonnet-4", input: 10.5, output: 52.5 }, { name: "GPT-4.1", alias: "gpt-4.1", input: 12.9, output: 51.6 }, { name: "DeepSeek V3", alias: "deepseek-chat", input: 1.8, output: 3.6 }],
    minPrice: 10.5, priceModel: "Claude Sonnet 4", uptime: 99.89, latency: 372, updated: "5 小时前", source: "公开价格页 · 自动采集",
    payment: ["支付宝", "微信支付"], minRecharge: 5, refund: "联系客服审核",
    invoice: true, specialInvoice: false, corporate: false, contract: false, invoiceEntity: "上海矩阵网络科技工作室", invoiceCycle: "7 个工作日", invoiceType: "数电普通发票", risk: "低风险"
  },
  {
    id: "island", name: "浮岛 AI", mark: "浮", accent: "orange", claimed: false, verified: false, available: true,
    description: "轻量、简单的模型转发服务，适合个人项目和原型验证。", models: ["GPT", "Gemini", "DeepSeek"],
    modelDetails: [{ name: "GPT-4.1", alias: "gpt-4.1", input: 11.2, output: 44.8 }, { name: "Gemini 2.5 Pro", alias: "gemini-2.5-pro", input: 7.6, output: 38 }, { name: "DeepSeek V3", alias: "deepseek-chat", input: 1.6, output: 3.2 }],
    minPrice: 7.6, priceModel: "Gemini 2.5 Pro", uptime: 98.72, latency: 691, updated: "1 天前", source: "用户提交 · 待站长确认",
    payment: ["支付宝"], minRecharge: 10, refund: "政策未知",
    invoice: false, specialInvoice: false, corporate: false, contract: false, invoiceEntity: "暂未核验", invoiceCycle: "—", invoiceType: "不支持", risk: "信息待核验"
  },
  {
    id: "aurora", name: "极光引擎", mark: "极", accent: "cyan", claimed: true, verified: true, available: true,
    description: "为团队与企业提供稳定线路、账单管理及专属技术支持。", models: ["Claude", "GPT", "Gemini", "DeepSeek"],
    modelDetails: [{ name: "Claude Sonnet 4", alias: "claude-sonnet-4", input: 11, output: 55 }, { name: "GPT-4.1", alias: "gpt-4.1", input: 14.2, output: 56.8 }, { name: "Gemini 2.5 Pro", alias: "gemini-2.5-pro", input: 8.8, output: 44 }],
    minPrice: 11, priceModel: "Claude Sonnet 4", uptime: 99.99, latency: 316, updated: "45 分钟前", source: "站长 API · 平台核验",
    payment: ["支付宝", "微信支付", "对公转账"], minRecharge: 100, refund: "合同约定",
    invoice: true, specialInvoice: true, corporate: true, contract: true, invoiceEntity: "深圳极光智能网络有限公司", invoiceCycle: "1–3 个工作日", invoiceType: "数电普票 / 增值税专票", risk: "低风险"
  },
  {
    id: "pixel", name: "像素栈", mark: "像", accent: "pink", claimed: false, verified: false, available: false,
    description: "专注低门槛模型调用，支持多种 OpenAI 兼容客户端。", models: ["GPT", "DeepSeek"],
    modelDetails: [{ name: "GPT-4.1", alias: "gpt-4.1", input: 9.9, output: 39.6 }, { name: "DeepSeek V3", alias: "deepseek-chat", input: 1.5, output: 3 }],
    minPrice: 9.9, priceModel: "GPT-4.1", uptime: 96.31, latency: 884, updated: "4 天前", source: "公开页面 · 信息过期",
    payment: ["支付宝"], minRecharge: 1, refund: "不支持",
    invoice: false, specialInvoice: false, corporate: false, contract: false, invoiceEntity: "未知", invoiceCycle: "—", invoiceType: "不支持", risk: "近期异常"
  },
  {
    id: "harbor", name: "港湾模型", mark: "港", accent: "blue", claimed: true, verified: true, available: true,
    description: "企业级模型网关，提供项目额度、使用明细与可用性承诺。", models: ["Claude", "GPT", "Gemini"],
    modelDetails: [{ name: "Claude Sonnet 4", alias: "claude-sonnet-4", input: 12, output: 60 }, { name: "GPT-4.1", alias: "gpt-4.1", input: 15, output: 60 }, { name: "Gemini 2.5 Pro", alias: "gemini-2.5-pro", input: 9.2, output: 46 }],
    minPrice: 12, priceModel: "Claude Sonnet 4", uptime: 99.97, latency: 349, updated: "3 小时前", source: "企业资料 · 平台核验",
    payment: ["对公转账", "支付宝"], minRecharge: 500, refund: "支持合同退款条款",
    invoice: true, specialInvoice: true, corporate: true, contract: true, invoiceEntity: "杭州港湾云计算有限公司", invoiceCycle: "当月申请，次月开具", invoiceType: "增值税普票 / 专票", risk: "低风险"
  }
];

export function filterStations(items, filters) {
  const query = filters.query.trim().toLowerCase();
  return items.filter((station) => {
    const text = [station.name, station.description, ...station.models, ...station.modelDetails.map((model) => model.name)].join(" ").toLowerCase();
    return (!query || text.includes(query))
      && (!filters.models.length || filters.models.every((model) => station.models.includes(model)))
      && (!filters.invoice || station.invoice)
      && (!filters.specialInvoice || station.specialInvoice)
      && (!filters.corporate || station.corporate)
      && (!filters.contract || station.contract)
      && (!filters.available || station.available)
      && (!filters.claimed || station.claimed);
  });
}

export function sortStations(items, sort) {
  const copy = [...items];
  const sorters = {
    price: (a, b) => a.minPrice - b.minPrice,
    uptime: (a, b) => b.uptime - a.uptime,
    latency: (a, b) => a.latency - b.latency,
    recommended: (a, b) => Number(b.available) - Number(a.available) || b.uptime - a.uptime
  };
  return copy.sort(sorters[sort] || sorters.recommended);
}
