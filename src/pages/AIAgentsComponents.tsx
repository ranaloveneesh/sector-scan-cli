import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';

// Custom SVG Icons inspired by the metallic, 3D look
const ToolsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="22" fill="url(#grad_silver)" stroke="#B0B0B0" strokeWidth="1.5"/>
    <path d="M24 16.5C20.41 16.5 17.5 19.41 17.5 23C17.5 26.59 20.41 29.5 24 29.5C27.59 29.5 30.5 26.59 30.5 23C30.5 19.41 27.59 16.5 24 16.5ZM24 27.5C21.52 27.5 19.5 25.48 19.5 23C19.5 20.52 21.52 18.5 24 18.5C26.48 18.5 28.5 20.52 28.5 23C28.5 25.48 26.48 27.5 24 27.5Z" fill="#E0E0E0"/>
    <path d="M34.24,15.76l-2.12,-2.12l-2.83,2.83l2.12,2.12z M13.76,32.24l-2.12,-2.12l2.83,-2.83l2.12,2.12z" fill="#C0C0C0"/>
    <defs>
      <radialGradient id="grad_silver" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" style={{stopColor: '#F5F5F5', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#A9A9A9', stopOpacity: 1}} />
      </radialGradient>
    </defs>
  </svg>
);

const DataIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="url(#grad_silver)" stroke="#B0B0B0" strokeWidth="1.5"/>
        <ellipse cx="24" cy="18" rx="8" ry="3" fill="#E0E0E0" stroke="#909090" strokeWidth="1"/>
        <path d="M16 18V30C16 33.3137 19.5817 36 24 36C28.4183 36 32 33.3137 32 30V18" stroke="#909090" strokeWidth="1" fill="none"/>
        <ellipse cx="24" cy="24" rx="8" ry="3" fill="#E0E0E0" stroke="#909090" strokeWidth="1"/>
        <ellipse cx="24" cy="30" rx="8" ry="3" fill="#E0E0E0" stroke="#909090" strokeWidth="1"/>
    </svg>
);

const PlanningIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="url(#grad_silver)" stroke="#B0B0B0" strokeWidth="1.5"/>
        <circle cx="24" cy="24" r="8" stroke="#909090" strokeWidth="1.5" fill="#E0E0E0"/>
        <circle cx="24" cy="24" r="4" fill="#C0C0C0"/>
        <line x1="24" y1="12" x2="24" y2="16" stroke="#909090" strokeWidth="1.5"/>
        <line x1="24" y1="32" x2="24" y2="36" stroke="#909090" strokeWidth="1.5"/>
        <line x1="12" y1="24" x2="16" y2="24" stroke="#909090" strokeWidth="1.5"/>
        <line x1="32" y1="24" x2="36" y2="24" stroke="#909090" strokeWidth="1.5"/>
    </svg>
);

const ExecutionIcon = () => (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="22" fill="url(#grad_silver)" stroke="#B0B0B0" strokeWidth="1.5"/>
        <path d="M16 16H32V20H16V16Z" fill="#E0E0E0" stroke="#909090" strokeWidth="1"/>
        <path d="M16 24H32V28H16V24Z" fill="#E0E0E0" stroke="#909090" strokeWidth="1"/>
        <path d="M16 32H24V36H16V32Z" fill="#E0E0E0" stroke="#909090" strokeWidth="1"/>
    </svg>
);


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
      subtitle: "Industry standard tools",
      icon: ToolsIcon,
      position: { x: -220, y: -140 },
    },
    {
      id: 'data',
      title: "DATA",
      subtitle: "Industry Public / Proprietary Data",
      icon: DataIcon,
      position: { x: 220, y: -140 },
    },
    {
      id: 'planning',
      title: "PLANNING & REASONING",
      subtitle: "Domain-specific meta-heuristics algorithms",
      icon: PlanningIcon,
      position: { x: -220, y: 140 },
    },
    {
      id: 'execution',
      title: "EXECUTION",
      subtitle: "Domain Specific Workflows",
      icon: ExecutionIcon,
      position: { x: 220, y: 140 },
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
        
        <div className="text-center mb-8 md:mb-16">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white font-open-sauce leading-tight mb-2">
                AI agents are specialized assistants, not just tools.
            </h1>
            <p className="text-slate-300 text-base md:text-lg">
                AI agents combine these 4 components to work autonomously in specific domains
            </p>
        </div>

        {/* Visual diagram container */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="relative flex items-center justify-center" style={{ height: '450px' }}>
            
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 500 350" 
              preserveAspectRatio="xMidYMid meet"
            >
              <line x1="250" y1="175" x2="100" y2="75" stroke="#888" strokeWidth="1" />
              <line x1="250" y1="175" x2="400" y2="75" stroke="#888" strokeWidth="1" />
              <line x1="250" y1="175" x2="100" y2="275" stroke="#888" strokeWidth="1" />
              <line x1="250" y1="175" x2="400" y2="275" stroke="#888" strokeWidth="1" />
            </svg>

            {/* Central AI Agent Model */}
            <div className="absolute z-20 flex flex-col items-center" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
              <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center animate-fade-in" style={{ animationDelay: '300ms' }}>
                <img 
                  src="https://i.imgur.com/example-astronaut.png" // Replace with your actual astronaut image URL
                  alt="AI Model" 
                  className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-lg"
                />
              </div>
              <div className="text-center mt-2">
                <div className="text-sm md:text-base font-bold text-slate-100">MODEL</div>
              </div>
            </div>

            {/* Component nodes */}
            {components.map((component, index) => {
              const IconComponent = component.icon;
              
              const leftPercent = 50 + (component.position.x / 500) * 100;
              const topPercent = 50 + (component.position.y / 350) * 100;
              
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
                  <div className="flex flex-col items-center w-40 md:w-48">
                    <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-3">
                      <IconComponent />
                    </div>
                    
                    <div className="text-center p-2 rounded-md bg-gray-800/50 border border-gray-700">
                      <h3 className="text-sm md:text-base font-bold text-slate-100 mb-1 tracking-wide">
                        {component.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-open-sauce">
                        {component.subtitle}
                      </p>
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
          <span className="terminal-text">explainin</span>
        </div>
      </div>

      {/* Bottom right next button */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 animate-fade-in" style={{ animationDelay: '450ms' }}>
        <button 
          onClick={handleSubmit} 
          className="px-6 py-3 rounded-lg font-medium transition-all duration-300 font-open-sauce bg-slate-300 text-[#0a1628] hover:bg-white"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default AIAgentsComponents;