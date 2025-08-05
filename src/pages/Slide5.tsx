import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { Database, Cog, Brain, Workflow } from 'lucide-react';

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
      description: 'Domain-specific instruments\n(APIs, specialized software)',
      icon: Cog,
      position: { x: -200, y: -120 }, // top left
    },
    {
      id: 'data',
      name: 'KNOWLEDGE',
      description: 'Domain-specific information\n(Real-time data, documentation)',
      icon: Database,
      position: { x: 200, y: -120 }, // top right
    },
    {
      id: 'reasoning',
      name: 'PLANNING',
      description: 'Strategic thinking\n(Breaking down complex tasks)',
      icon: Brain,
      position: { x: -200, y: 120 }, // bottom left
    },
    {
      id: 'workflows',
      name: 'EXECUTION',
      description: 'Action workflows\n(Coordinated task completion)',
      icon: Workflow,
      position: { x: 200, y: 120 }, // bottom right
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
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="relative flex items-center justify-center" style={{ height: '400px' }}>
            
            {/* Connection lines with proper calculations */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              style={{ zIndex: 1 }}
              viewBox="0 0 100 100" 
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Line to TOOLS (top left) */}
              <line 
                x1="50" 
                y1="50" 
                x2="20" 
                y2="25" 
                stroke="#5CE1E6" 
                strokeWidth="0.5" 
                opacity="0.8"
              />
              
              {/* Line to KNOWLEDGE (top right) */}
              <line 
                x1="50" 
                y1="50" 
                x2="80" 
                y2="25" 
                stroke="#5CE1E6" 
                strokeWidth="0.5" 
                opacity="0.8"
              />
              
              {/* Line to PLANNING (bottom left) */}
              <line 
                x1="50" 
                y1="50" 
                x2="20" 
                y2="75" 
                stroke="#5CE1E6" 
                strokeWidth="0.5" 
                opacity="0.8"
              />
              
              {/* Line to EXECUTION (bottom right) */}
              <line 
                x1="50" 
                y1="50" 
                x2="80" 
                y2="75" 
                stroke="#5CE1E6" 
                strokeWidth="0.5" 
                opacity="0.8"
              />
            </svg>

            {/* Central Agent */}
            <div className="absolute z-20" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/f912e5d2-b459-41fc-a7e9-3eb49229a52a.png" 
                  alt="AI Agent" 
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <div className="text-sm md:text-base font-bold text-[#5CE1E6]">AI AGENT</div>
              </div>
            </div>

            {/* Component nodes positioned precisely */}
            {components.map((component) => {
              const IconComponent = component.icon;
              
              // Calculate position as percentage
              const leftPercent = 50 + (component.position.x / 400) * 100; // Scale to percentage
              const topPercent = 50 + (component.position.y / 400) * 100;
              
              return (
                <div
                  key={component.id}
                  className="absolute z-30"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div className="flex flex-col items-center w-48 md:w-56">
                    {/* Node icon */}
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#0a1628] border-2 border-[#5CE1E6] rounded-full flex items-center justify-center mb-3">
                      <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-[#5CE1E6]" />
                    </div>
                    
                    {/* Node content */}
                    <div className="text-center">
                      <h3 className="text-sm md:text-base font-bold text-[#5CE1E6] mb-2 tracking-wide">
                        {component.name}
                      </h3>
                      <div className="bg-[#0a1628]/90 border border-[#5CE1E6]/20 rounded-lg p-3">
                        <p className="text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                          {component.description}
                        </p>
                      </div>
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

export default Slide5;