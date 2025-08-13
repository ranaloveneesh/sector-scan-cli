import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { Database, Search, FileCheck, Wrench } from 'lucide-react';

const Slide5 = () => {
  const navigate = useNavigate();
  const { surveyData } = useSurvey();

  const getTitleBasedOnAnswer = () => {
    const previousAnswer = surveyData.aiAgentKnowledge;
    
    switch (previousAnswer) {
      case "A chatbot":
        return "AI agents are specialized assistants, not just chatbots.";
      case "A tool that automates repetitive tasks":
        return "They automate intelligently — with reasoning and adaptation.";
      case "A software entity that can perceive, reason, and act autonomously":
        return "Exactly. Here's what makes them autonomous and intelligent.";
      case "No idea, but I'm curious":
        return "Here's what makes AI agents different from regular software.";
      case "I thought I did... now I'm not so sure":
        return "Let's clarify what makes AI agents truly autonomous.";
      default:
        return "AI agents are specialized assistants, not just tools.";
    }
  };

  const handleSubmit = () => {
    navigate('/model-utility');
  };

  const components = [
    {
      id: 'tools',
      name: 'TOOLS',
      description: 'Industry standard tools',
      icon: Wrench,
      position: { x: -200, y: 0 }, // left
    },
    {
      id: 'data',
      name: 'KNOWLEDGE / DATA',
      description: 'Industry Public / Proprietary Data',
      icon: Database,
      position: { x: 200, y: 0 }, // right
    },
    {
      id: 'reasoning',
      name: 'PLANNING & REASONING',
      description: 'Domain-specific meta-heuristics algorithms',
      icon: Search,
      position: { x: 0, y: -160 }, // top
    },
    {
      id: 'workflows',
      name: 'EXECUTION',
      description: 'Domain Specific Workflows',
      icon: FileCheck,
      position: { x: 0, y: 160 }, // bottom
    }
  ];

  const computedNodes = components.map((c) => {
    const left = 50 + (c.position.x / 400) * 100; // percent
    const top = 50 + (c.position.y / 400) * 100;  // percent
    return { ...c, left, top };
  });

  return (
    <div className="min-h-screen bg-[#0a1628] text-white relative overflow-hidden">

      {/* User label in top right */}
      <div className="absolute top-6 right-6 md:top-12 md:right-16 z-10 flex items-end animate-fade-in" style={{ animationDelay: '150ms' }}>
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">ai_agent_explained</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
        
        {/* Title - positioned to align with logo */}
        <div className="text-center mb-8 md:mb-12 mt-20 md:mt-24">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white font-open-sauce leading-relaxed mb-4">
            {getTitleBasedOnAnswer()}
          </h1>
          <p className="text-base md:text-lg text-slate-100 font-open-sauce leading-relaxed max-w-3xl mx-auto">
            AI agents combine these 4 components to work autonomously in specific domains
          </p>
        </div>

        {/* Visual diagram container - clean and minimal */}
        <div className="relative w-full max-w-4xl mx-auto px-8 md:px-16 py-8">
          <div className="relative w-full h-[320px] flex items-center justify-center">
            
            {/* Connection lines - simple and clean */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {computedNodes.map((n) => (
                <line 
                  key={`line-${n.id}`}
                  x1="50" y1="50" 
                  x2={n.left} y2={n.top} 
                  stroke="#5CE1E6" 
                  strokeWidth="0.3" 
                  opacity="0.6" 
                />
              ))}
            </svg>

            {/* Central AI Agent */}
            <div className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-[#0a1628]/80 rounded-full border border-[#5CE1E6]/30">
                <img
                  src="/lovable-uploads/f912e5d2-b459-41fc-a7e9-3eb49229a52a.png"
                  alt="AI agent"
                  className="w-10 h-10 md:w-12 md:h-12 object-contain"
                />
              </div>
            </div>

            {/* Component nodes - minimal circles with labels */}
            {computedNodes.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className="absolute z-30"
                  style={{ left: `${n.left}%`, top: `${n.top}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className="flex flex-col items-center">
                    {/* Icon circle */}
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0a1628]/80 border border-[#5CE1E6]/40 flex items-center justify-center mb-2">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#5CE1E6]" />
                    </div>
                    {/* Label */}
                    <div className="text-xs md:text-sm font-medium text-[#5CE1E6] text-center max-w-20 md:max-w-24 leading-tight">
                      {n.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom left terminal text */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="font-mono text-gray-400 text-responsive-terminal flex items-baseline">
          <span className="mr-2">{'>'}</span>
          <span className="terminal-text">explaining AI agents...</span>
        </div>
      </div>

      {/* Bottom right next button */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 animate-fade-in" style={{ animationDelay: '450ms' }}>
        <button 
          onClick={() => {
            console.log('Slide5 (AI Agent Explained) button clicked');
            handleSubmit();
          }}
          className="px-6 py-3 rounded-lg font-medium transition-all duration-300 font-open-sauce bg-[#5CE1E6] text-[#0a1628] hover:bg-[#5CE1E6]/80"
          style={{
            pointerEvents: 'auto',
            zIndex: 100
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Slide5;