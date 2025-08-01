import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';

const AIAgentsComponents = () => {
  const navigate = useNavigate();
  const { surveyData } = useSurvey();

  const getTitleBasedOnAnswer = () => {
    const previousAnswer = surveyData.aiAgentKnowledge;
    
    switch (previousAnswer) {
      case "A chatbot":
        return "Great job! Now you see how AI agents work beyond simple chatbots.";
      case "A tool that automates repetitive tasks":
        return "Perfect! You've discovered how agents think and act autonomously.";
      case "A software entity that can perceive, reason, and act autonomously":
        return "Excellent! You had the right idea — now you've seen it in action.";
      case "No idea, but I'm curious":
        return "Perfect! You've just built your first AI agent. Here's what you discovered.";
      case "I thought I did... now I'm not so sure":
        return "Now you know for sure! Here are the 4 core components you just assembled.";
      default:
        return "Great work! Here are the 4 core components of every AI agent.";
    }
  };

  const handleSubmit = () => {
    navigate('/aiagent-explained');
  };

  const components = [
    {
      title: "TOOLS",
      description: "Domain-specific instruments that extend the agent's capabilities",
      examples: "APIs, databases, calculators, web browsers, specialized software",
      color: "#5CE1E6"
    },
    {
      title: "KNOWLEDGE",
      description: "Domain-specific information the agent can access and reference",
      examples: "Documentation, real-time data, training materials, context files",
      color: "#5CE1E6"
    },
    {
      title: "PLANNING",
      description: "Strategic reasoning to break down complex tasks into steps",
      examples: "Goal decomposition, task prioritization, decision trees, logic chains",
      color: "#5CE1E6"
    },
    {
      title: "EXECUTION",
      description: "Coordinated workflows to complete tasks autonomously",
      examples: "Action sequences, process automation, result validation, error handling",
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
        <div className="max-w-4xl w-full">
          
          {/* Title - positioned to align with logo */}
          <div className="text-center mb-8 md:mb-12" style={{ paddingTop: 'clamp(4rem, 10vh, 6rem)' }}>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white font-open-sauce leading-relaxed mb-4">
              {getTitleBasedOnAnswer()}
            </h1>
            <p className="text-base md:text-lg text-slate-100 font-open-sauce leading-relaxed max-w-3xl mx-auto">
              Every intelligent agent combines these 4 core components to work autonomously
            </p>
          </div>

          {/* Components explanation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            {components.map((component, index) => (
              <div 
                key={component.title}
                className="bg-[#5CE1E6]/5 border border-[#5CE1E6]/20 rounded-lg p-4 md:p-6 animate-fade-in hover:bg-[#5CE1E6]/10 transition-all duration-300"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 rounded-full bg-[#5CE1E6] mr-3 shadow-[0_0_10px_#5CE1E6]"></div>
                  <h3 className="text-base md:text-lg font-bold text-[#5CE1E6] font-open-sauce tracking-wide">
                    {component.title}
                  </h3>
                </div>
                
                <p className="text-sm md:text-base text-white font-open-sauce leading-relaxed mb-3">
                  {component.description}
                </p>
                
                <div className="text-xs md:text-sm text-slate-300 font-mono leading-relaxed">
                  <span className="text-slate-400">Examples: </span>
                  {component.examples}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="text-center mt-8 md:mt-12 max-w-3xl mx-auto">
            <div className="bg-[#5CE1E6]/5 border border-[#5CE1E6]/20 rounded-lg p-4 md:p-6 animate-fade-in" style={{ animationDelay: '700ms' }}>
              <p className="text-sm md:text-base text-slate-100 font-open-sauce leading-relaxed">
                <span className="text-[#5CE1E6] font-semibold">Together,</span> these components enable AI agents to perceive their environment, reason about complex problems, and take autonomous actions — making them far more capable than simple automation scripts.
              </p>
            </div>
          </div>
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