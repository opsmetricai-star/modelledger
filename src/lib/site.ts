export const BRAND = "ModelLedger";

export const PAY = {
  starter: process.env.NEXT_PUBLIC_PAY_STARTER || "https://selar.com/47plan?currency=USD",
  team: process.env.NEXT_PUBLIC_PAY_TEAM || "https://selar.com/57plan?currency=USD",
  pro: process.env.NEXT_PUBLIC_PAY_PRO || "https://selar.com/97plan?currency=USD",
};

export const products = [
  {
    slug: "traces",
    name: "Traces",
    blurb: "Capture and diagnose every AI decision",
    icon: "chat",
    headline: "Every AI decision, recorded and diagnosed",
    body: "Traces capture each model call, tool call and retrieval as a structured record with latency, token volume and cost. On the Pro plan, the analysis engine reads a failing trace and returns a summary, a likely root cause and ranked remediation steps.",
    points: [
      "Structured records of inputs, outputs, latency, tokens and cost",
      "Nested spans that show where time and spend accumulate",
      "AI root-cause analysis on any trace (Pro plan)",
      "Usage metering against your plan, visible in real time",
    ],
  },
  {
    slug: "evaluations",
    name: "Evaluations",
    blurb: "Score output quality before release",
    icon: "bars",
    headline: "Quantify output quality before it reaches a customer",
    body: "Run a prompt template across a dataset of expected outcomes and receive a deterministic pass rate per row and per run. Release decisions rest on measured quality, not on spot checks.",
    points: [
      "Dataset rows with expected outcomes",
      "Exact-match and contains scorers with reproducible results",
      "Full run history for version-over-version comparison",
      "Every evaluated call is traced and metered",
    ],
  },
  {
    slug: "playground",
    name: "Playground",
    blurb: "Iterate on prompts with live model output",
    icon: "play",
    headline: "Shorten the path from failing prompt to verified fix",
    body: "Run prompts against a live model, inspect latency and token cost on every run, and save versioned prompts for the team. Each run is written to Traces automatically.",
    points: [
      "Live model execution with system instructions",
      "Latency and token cost reported on every run",
      "Named, versioned prompt library",
      "Every run recorded as a trace",
    ],
  },
  {
    slug: "monitors",
    name: "Monitors",
    blurb: "Automated alerts on cost, speed and errors",
    icon: "search",
    headline: "Automated thresholds on the metrics that carry risk",
    body: "Define limits on average latency, spend and error rate. Monitors evaluate the last 24 hours of traces and flag any breach, so operators act on a signal instead of reading logs.",
    points: [
      "Thresholds on latency, cost and error rate",
      "Evaluation over a rolling 24-hour window",
      "Clear alert state for every monitor",
      "Available on the Team and Pro plans",
    ],
  },
];

export const useCases = [
  {
    name: "Agent reliability",
    summary: "Multi-step agents fail in ways a single log line never shows. Traces expose every step, and the analysis engine isolates the step that broke the outcome.",
  },
  {
    name: "RAG quality",
    summary: "Retrieval errors become wrong answers at scale. Evaluations score answers against expected facts so retrieval changes ship with a measured effect.",
  },
  {
    name: "Contact center AI",
    summary: "Automated support carries brand and compliance risk on every conversation. Monitors surface error and latency breaches before they reach customers.",
  },
  {
    name: "AI governance",
    summary: "Auditors ask what the model did and why. A complete trace record answers with evidence: inputs, outputs, model, time and cost.",
  },
  {
    name: "Release evaluation",
    summary: "Replace subjective review with a pass rate. Every prompt or model change is scored against the same dataset before release.",
  },
];

export const industries = [
  {
    name: "Financial Services",
    summary: "Model-driven decisions in lending, fraud and servicing require a defensible record. ModelLedger retains the evidence trail and quantifies quality before a change goes live.",
  },
  {
    name: "Healthcare & Life Sciences",
    summary: "Clinical and operational AI demands traceability. Teams record every model interaction and measure output accuracy against expected results.",
  },
  {
    name: "Communications",
    summary: "High-volume customer interactions magnify small model errors. Monitors on latency, cost and error rate keep automated service inside defined limits.",
  },
  {
    name: "Public Sector",
    summary: "Public accountability requires explainable automation. A searchable trace history documents how each automated outcome was produced.",
  },
];

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 47,
    tagline: "Instrument your first production AI workflow",
    link: PAY.starter,
    features: ["10,000 traced calls per month", "Traces with cost and latency", "Playground with versioned prompts", "API keys for trace ingestion"],
  },
  {
    id: "team",
    name: "Team",
    price: 57,
    tagline: "Measure quality and automate alerting",
    link: PAY.team,
    popular: true,
    features: ["100,000 traced calls per month", "Everything in Starter", "Evaluations with deterministic scoring", "Monitors on latency, cost and error rate"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 97,
    tagline: "Add AI diagnosis at production scale",
    link: PAY.pro,
    features: ["1,000,000 traced calls per month", "Everything in Team", "AI root-cause analysis on every trace"],
  },
];

export const footerCols: { title: string; links: [string, string][] }[] = [
  { title: "Platform", links: products.map((p) => [p.name, `/product/${p.slug}`] as [string, string]) },
  { title: "Solutions", links: useCases.map((u) => [u.name, `/solutions/${slugify(u.name)}`] as [string, string]) },
  { title: "Industries", links: industries.map((u) => [u.name, `/industries/${slugify(u.name)}`] as [string, string]) },
  { title: "Company", links: [["About", "/about"], ["Documentation", "/docs"], ["Pricing", "/pricing"]] },
];
