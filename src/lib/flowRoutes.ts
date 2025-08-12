export const FLOW_ROUTES: string[] = [
  "/",
  "/company-size",
  "/department",
  "/aimodels",
  "/aimodels-breakdown",
  "/LLMs",
  "/rag-pipeline",
  "/rag-demo",
  "/aiagents",
  "/aiagents-minigame",
  "/aiagent-explained",
  "/model-utility",
  "/data-accessibility",
  "/rag-impact",
  "/agent-utility",
  "/agent-intent",
  "/agent-timeline",
  "/ai-knowledge-assessment",
  "/arl-results",
  "/company-stats",
];

export const canonicalizePath = (path: string): string => {
  if (path.startsWith("/rag-demo/")) return "/rag-demo";
  return path;
};
