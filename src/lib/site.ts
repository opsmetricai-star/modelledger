export const BRAND = "ModelLedger";
export const PAY = {
  starter: process.env.NEXT_PUBLIC_PAY_STARTER || "https://selar.com/47plan?currency=USD",
  team: process.env.NEXT_PUBLIC_PAY_TEAM || "https://selar.com/57plan?currency=USD",
  pro: process.env.NEXT_PUBLIC_PAY_PRO || "https://selar.com/97plan?currency=USD",
};

export const products = [
  { slug: "traces", name: "Traces", blurb: "Explore and debug AI applications", icon: "chat",
    headline: "See every step your AI takes", body: "Capture each model call, tool call and retrieval as a nested trace. Filter, compare and replay runs to find exactly where an agent went wrong.",
    points: ["Automatic capture with one decorator", "Nested call trees with latency and token cost", "Search across inputs, outputs and metadata", "Share a trace link with your team"] },
  { slug: "evaluations", name: "Evaluations", blurb: "Rigorous evaluations of AI applications", icon: "bars",
    headline: "Measure quality before users do", body: "Score applications against curated datasets with code scorers or model judges, then compare versions side by side before you ship.",
    points: ["Dataset versioning", "Code and LLM-judge scorers", "Side-by-side version comparison", "Regression alerts in CI"] },
  { slug: "playground", name: "Playground", blurb: "Explore prompts and models", icon: "play",
    headline: "Iterate on prompts in minutes", body: "Open any traced call in the playground, swap the model or edit the prompt, and rerun it against real production inputs.",
    points: ["Run against traced inputs", "Compare models in parallel", "Save prompt versions", "Promote a prompt to production"] },
  { slug: "monitors", name: "Monitors", blurb: "Continuously improve in production", icon: "search",
    headline: "Keep quality visible in production", body: "Attach scorers to live traffic, watch quality trends and get alerted when behaviour drifts from your baseline.",
    points: ["Online scoring of live traffic", "Drift and cost alerts", "Slack and email notifications", "Auto-curate failures into datasets"] },
];

export const useCases = ["AI governance","Computer vision","Contact centers","Evaluations","Fine-tune LLMs","Physical AI","RAG","Train LLMs"];
export const industries = ["Autonomous Vehicles","Communications","Financial Services","Healthcare & Life Sciences","Public Sector","Scientific Research"];
export const caseStudies = [
  { name: "Northwind Design", note: "How Northwind ships generative features with confidence", initial: "N" },
  { name: "Halcyon Cloud", note: "How Halcyon tracks every ML experiment across teams", initial: "H" },
  { name: "Torque Motors", note: "How Torque validates models for autonomous driving", initial: "T" },
];
export const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const plans = [
  { id: "starter", name: "Starter", price: 47, tagline: "For individuals shipping their first AI app", link: PAY.starter,
    features: ["1 user", "10,000 traced calls / month", "3 projects", "7-day trace retention", "Community support"] },
  { id: "team", name: "Team", price: 57, tagline: "For small teams that need shared visibility", link: PAY.team, popular: true,
    features: ["Up to 5 users", "100,000 traced calls / month", "Unlimited projects", "30-day trace retention", "Evaluations & monitors", "Email support"] },
  { id: "pro", name: "Pro", price: 97, tagline: "For production workloads at scale", link: PAY.pro,
    features: ["Up to 20 users", "1,000,000 traced calls / month", "Unlimited projects", "1-year trace retention", "AI-assisted trace analysis", "Priority support"] },
];

export const footerCols = [
  { title: "Platform", links: [["Traces","/product/traces"],["Evaluations","/product/evaluations"],["Playground","/product/playground"],["Monitors","/product/monitors"],["Pricing","/pricing"]] },
  { title: "Solutions", links: useCases.slice(0,5).map(u => [u, `/solutions/${slugify(u)}`]) },
  { title: "Industries", links: industries.map(u => [u, `/industries/${slugify(u)}`]) },
  { title: "Resources", links: [["Documentation","/docs"],["Case studies","/customers"],["Blog","/blog"],["Support","/contact"]] },
  { title: "Company", links: [["About","/about"],["Enterprise","/enterprise"],["Contact","/contact"],["Security","/enterprise#security"]] },
];
