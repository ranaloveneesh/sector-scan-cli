import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import AgentFundamentalsGame from '@/components/ui/ai-agent-fundamentals-game';

const AIAgentsMinigame = () => {
  const navigate = useNavigate();
  const { surveyData } = useSurvey();

  const getTitleBasedOnAnswer = () => {
    const previousAnswer = surveyData.aiAgentKnowledge;
    
    switch (previousAnswer) {
      case "A chatbot":
        return "That's a piece of the puzzle! Let's build the full picture.";
      case "A tool that automates repetitive tasks":
        return "Exactly! Automation is key. Now let's add its other elements.";
      case "A software entity that can perceive, reason, and act autonomously":
        return "You nailed it! Now, let's put one together piece by piece.";
      case "No idea, but I'm curious":
        return "Perfect, let's dive in! We'll build your first AI agent together.";
      case "I thought I did... now I'm not so sure":
        return "No problem, that's what we're here for. Let's build one and make it all click.";
      default:
        return "Let's build your first AI agent together.";
    }
  };

  const handleSubmit = () => {
    navigate('/company-stats');
  };

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
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">ai_agents_minigame</span>
      </div>

      {/* Main content - centered and responsive */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="w-full max-w-4xl text-center">
          {/* Title - positioned to align with logo */}
          <div className="mb-8 md:mb-12" style={{ paddingTop: 'clamp(2rem, 8vh, 4rem)' }}>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white font-open-sauce leading-relaxed mb-4 px-4">
              {getTitleBasedOnAnswer()}
            </h1>
            <p className="text-base md:text-lg text-slate-100 font-open-sauce leading-relaxed px-4">
              Select the 4 core components that make an AI agent intelligent and autonomous
            </p>
          </div>

          {/* Game component - responsive scaling */}
          <div className="flex justify-center">
            <div className="transform scale-75 md:scale-90 lg:scale-100">
              <AgentFundamentalsGame onComplete={() => {}} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom left terminal text */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="font-mono text-gray-400 text-responsive-terminal flex items-baseline">
          <span className="mr-2">{'>'}</span>
          <span className="terminal-text">initializing agent builder...</span>
        </div>
      </div>

      {/* Bottom right next button */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 animate-fade-in z-50" style={{ animationDelay: '450ms' }}>
        <button 
          onClick={() => {
            console.log('AIAgentsMinigame button clicked');
            handleSubmit();
          }}
          className="px-6 py-3 rounded-lg font-medium transition-all duration-300 font-open-sauce bg-[#5CE1E6] text-[#0a1628] hover:bg-[#5CE1E6]/80 relative"
          style={{
            pointerEvents: 'auto',
            zIndex: 999
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default AIAgentsMinigame;