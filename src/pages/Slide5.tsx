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
    navigate('/company-stats');
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
      {/* Hexagonal logo in top left */}
      <div className="absolute top-6 left-6 md:top-12 md:left-16 z-10 flex items-end animate-fade-in" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center justify-center" style={{
          width: 'clamp(4rem, 6vw, 6.25rem)',
          height: 'clamp(4rem, 6vw, 6.25rem)'
        }}>
          <img src="/lovable-uploads/a8d760f4-8e0c-410d-ae83-a3e6dd4b23e9.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
      </div>

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

        {/* Visual diagram container */}
        <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="relative h-[460px] md:h-[560px] flex items-center justify-center">
            {/* Decorative concentric rings */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5CE1E6]/20 w-[72%] aspect-square" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5CE1E6]/10 w-[48%] aspect-square" />

            {/* Connection lines (soft glow + core) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {computedNodes.map((n) => (
                <g key={`line-${n.id}`}> 
                  <line x1="50" y1="50" x2={n.left} y2={n.top} stroke="#5CE1E6" strokeWidth="0.8" opacity="0.15" />
                  <line x1="50" y1="50" x2={n.left} y2={n.top} stroke="#5CE1E6" strokeWidth="0.25" opacity="0.8" />
                </g>
              ))}
            </svg>

            {/* Central Robot (kept) */}
            <div className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-6 rounded-full bg-[#5CE1E6]/5 blur-2xl" />
                <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                  <img
                    src="/lovable-uploads/f912e5d2-b459-41fc-a7e9-3eb49229a52a.png"
                    alt="AI agent robot"
                    className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow"
                  />
                </div>
              </div>
            </div>

            {/* Nodes - minimal, pill style */}
            {computedNodes.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className="absolute z-30"
                  style={{ left: `${n.left}%`, top: `${n.top}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <div className="group flex items-center gap-3 bg-[#0a1628]/60 backdrop-blur-md border border-[#5CE1E6]/20 hover:border-[#5CE1E6]/40 rounded-xl px-4 py-3 transition-colors">
                    <div className="w-10 h-10 rounded-full border border-[#5CE1E6]/30 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#5CE1E6]" />
                    </div>
                    <div className="text-sm md:text-base font-semibold tracking-wide text-[#5CE1E6]">
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