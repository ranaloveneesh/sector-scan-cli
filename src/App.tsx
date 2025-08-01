import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SurveyProvider } from "@/contexts/SurveyContext";
import { PageTransition } from "@/components/ui/page-transition";
import Index from "./pages/Index";
import CompanySize from "./pages/CompanySize";
import Department from "./pages/Department";
import RagPipeline from "./pages/RagPipeline";
import RagDemo from "./pages/RagDemo";
import RagDemoTopic from "./pages/RagDemoTopic";
import AIModelKnowledgeTest from "./pages/AIModelKnowledgeTest";
import AIModelGame from "./pages/AIModelGame";
import AIModelSummary from "./pages/AIModelSummary";
import LLMs from "./pages/LLMs";
// import RagPipelineExplained from "./pages/RagPipelineExplained";
// import LLMsCompared from "./pages/LLMsCompared";
import CompanyStats from "./pages/CompanyStats";
import AIModels from "./pages/AIModels";
import AIModelsMinigame from "./pages/AIModelsMinigame";
import AIModelsExplained from "./pages/AIModelsExplained";
import Slide4 from "./pages/Slide4";
import Slide5 from "./pages/Slide5";
import AIAgentsMinigame from "./pages/AIAgentsMinigame";
import ModelUtility from "./pages/ModelUtility";
import DataAccessibility from "./pages/DataAccessibility";
import RagImpact from "./pages/RagImpact";
import AgentUtility from "./pages/AgentUtility";
import AgentIntent from "./pages/AgentIntent";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SurveyProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageTransition><Index /></PageTransition>} />
            <Route path="/company-size" element={<PageTransition><CompanySize /></PageTransition>} />
            <Route path="/department" element={<PageTransition><Department /></PageTransition>} />
            <Route path="/aimodels" element={<PageTransition><AIModels /></PageTransition>} />
            <Route path="/aimodels-minigame" element={<PageTransition><AIModelsMinigame /></PageTransition>} />
            <Route path="/aimodels-explained" element={<PageTransition><AIModelsExplained /></PageTransition>} />
            <Route path="/LLMs" element={<PageTransition><LLMs /></PageTransition>} />
            {/* <Route path="/llms-compared" element={<PageTransition><LLMsCompared /></PageTransition>} /> */}
            <Route path="/rag-pipeline" element={<PageTransition><RagPipeline /></PageTransition>} />
            <Route path="/rag-demo" element={<PageTransition><RagDemo /></PageTransition>} />
            <Route path="/rag-demo/:topicId" element={<PageTransition><RagDemoTopic /></PageTransition>} />
            <Route path="/ai-model-test" element={<PageTransition><AIModelKnowledgeTest /></PageTransition>} />
            <Route path="/ai-model-game" element={<PageTransition><AIModelGame /></PageTransition>} />
            <Route path="/ai-model-summary" element={<PageTransition><AIModelSummary /></PageTransition>} />
            {/* <Route path="/ragpipeline-explained" element={<PageTransition><RagPipelineExplained /></PageTransition>} /> */}
            <Route path="/aiagents" element={<PageTransition><Slide4 /></PageTransition>} />
            <Route path="/aiagents-minigame" element={<PageTransition><AIAgentsMinigame /></PageTransition>} />
            <Route path="/aiagent-explained" element={<PageTransition><Slide5 /></PageTransition>} />
            <Route path="/model-utility" element={<PageTransition><ModelUtility /></PageTransition>} />
            <Route path="/data-accessibility" element={<PageTransition><DataAccessibility /></PageTransition>} />
            <Route path="/rag-impact" element={<PageTransition><RagImpact /></PageTransition>} />
            <Route path="/agent-utility" element={<PageTransition><AgentUtility /></PageTransition>} />
            <Route path="/agent-intent" element={<PageTransition><AgentIntent /></PageTransition>} />
            
            <Route path="/company-stats" element={<PageTransition><CompanyStats /></PageTransition>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SurveyProvider>
  </QueryClientProvider>
);

export default App;
