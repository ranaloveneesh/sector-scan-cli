import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { Database, Cog, Brain, Workflow } from 'lucide-react';

const AIAgentsComponents = () => {
  const navigate = useNavigate();
  const { surveyData } = useSurvey();

  const getTitleBasedOnAnswer = () => {
    const previousAnswer = surveyData.aiAgentKnowledge;
    
    switch (previousAnswer) {
      case "A chatbot":
        return "Great job! Here's what makes AI agents intelligent:";
      case "A tool that automates repetitive tasks":
        return "Perfect! You've discovered the 4 core components:";
      case "A software entity that can perceive, reason, and act autonomously":
        return "Excellent! Here are the 4 components you just assembled:";
      case "No idea, but I'm curious":
        return "Perfect! You've just built an AI agent with these 4 parts:";
      case "I thought I did... now I'm not so sure":
        return "Now you know! These are the 4 core components:";
      default:
        return "Great work! Here are the 4 core components:";
    }
  };

  const handleSubmit = () => {
    navigate('/aiagent-explained');
  };

  const components = [
    {
      id: 'tools',
      title: "TOOLS",
      subtitle: "Specialized instruments",
      icon: Cog,
      position: { x: -180, y: -120 },
      color: "#5CE1E6"
    },
    {
      id: 'knowledge',
      title: "KNOWLEDGE",
      subtitle: "Domain expertise",
      icon: Database,
      position: { x: 180, y: -120 },
      color: "#5CE1E6"
    },
    {
      id: 'planning',
      title: "PLANNING",
      subtitle: "Strategic thinking",
      icon: Brain,
      position: { x: -180, y: 120 },
      color: "#5CE1E6"
    },
    {
      id: 'execution',
      title: "EXECUTION",
      subtitle: "Action workflows",
      icon: Workflow,
      position: { x: 180, y: 120 },
      color: "#5CE1E6"
    }
  ];

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
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">ai_agents_components</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
        
        {/* Title - positioned to align with logo */}
        <div className="text-center mb-8 md:mb-12" style={{ paddingTop: 'clamp(2rem, 8vh, 4rem)' }}>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white font-open-sauce leading-relaxed mb-4">
            {getTitleBasedOnAnswer()}
          </h1>
        </div>

        {/* Visual diagram container */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="relative flex items-center justify-center" style={{ height: '400px' }}>
            
            {/* Connection lines */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              style={{ zIndex: 1 }}
              viewBox="0 0 100 100" 
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Lines connecting center to each component */}
              <line x1="50" y1="50" x2="25" y2="30" stroke="#5CE1E6" strokeWidth="0.3" opacity="0.6" />
              <line x1="50" y1="50" x2="75" y2="30" stroke="#5CE1E6" strokeWidth="0.3" opacity="0.6" />
              <line x1="50" y1="50" x2="25" y2="70" stroke="#5CE1E6" strokeWidth="0.3" opacity="0.6" />
              <line x1="50" y1="50" x2="75" y2="70" stroke="#5CE1E6" strokeWidth="0.3" opacity="0.6" />
            </svg>

            {/* Central AI Agent Character */}
            <div className="absolute z-20" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
              <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
                <img 
                  src="/lovable-uploads/4d22ecc4-3670-475b-a26e-69d839e33fd8.png" 
                  alt="AI Agent" 
                  className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg"
                />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-sm md:text-base font-bold text-[#5CE1E6]">AI AGENT</div>
              </div>
            </div>

            {/* Component nodes */}
            {components.map((component, index) => {
              const IconComponent = component.icon;
              
              // Calculate position as percentage
              const leftPercent = 50 + (component.position.x / 400) * 100;
              const topPercent = 50 + (component.position.y / 400) * 100;
              
              return (
                <div
                  key={component.id}
                  className="absolute z-30 animate-fade-in"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: 'translate(-50%, -50%)',
                    animationDelay: `${400 + index * 100}ms`
                  }}
                >
                  <div className="flex flex-col items-center w-32 md:w-40">
                    {/* Component icon with glow effect */}
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-[#0a1628] border-2 border-[#5CE1E6] rounded-full flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(92,225,230,0.4)]">
                      <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-[#5CE1E6]" />
                    </div>
                    
                    {/* Component labels */}
                    <div className="text-center">
                      <h3 className="text-xs md:text-sm font-bold text-[#5CE1E6] mb-1 tracking-wide">
                        {component.title}
                      </h3>
                      <p className="text-xs text-slate-300 font-open-sauce">
                        {component.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Simple summary */}
        <div className="text-center mt-8 animate-fade-in" style={{ animationDelay: '800ms' }}>
          <p className="text-sm md:text-base text-slate-300 font-open-sauce max-w-2xl mx-auto">
            These 4 components work together to make AI agents autonomous and intelligent
          </p>
        </div>
      </div>

      {/* Bottom left terminal text */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="font-mono text-gray-400 text-responsive-terminal flex items-baseline">
          <span className="mr-2">{'>'}</span>
          <span className="terminal-text">AI agent components identified...</span>
        </div>
      </div>

      {/* Bottom right next button */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 animate-fade-in" style={{ animationDelay: '450ms' }}>
        <button 
          onClick={handleSubmit} 
          className="px-6 py-3 rounded-lg font-medium transition-all duration-300 font-open-sauce bg-[#5CE1E6] text-[#0a1628] hover:bg-[#5CE1E6]/80"
          style={{
            pointerEvents: 'auto',
            zIndex: 10
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default AIAgentsComponents;