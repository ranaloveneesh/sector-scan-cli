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
import Slide4 from "./pages/Slide4";
import Slide5 from "./pages/Slide5";
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
            <Route path="/aiagents" element={<PageTransition><Slide4 /></PageTransition>} />
            <Route path="/aiagent-explained" element={<PageTransition><Slide5 /></PageTransition>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SurveyProvider>
  </QueryClientProvider>
);

export default App;
