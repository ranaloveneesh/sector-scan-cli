import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { CompanySizeQuestion } from '@/components/ui/company-size-question';
import LLMComparison from '@/components/ui/llm-comparison';

const LLMsCompared = () => {
  const navigate = useNavigate();
  const { surveyData } = useSurvey();

  const getContentBasedOnAnswer = () => {
    return {
      title: "Let's compare the 4 most popular LLMs today",
      subtitle: "",
      description: ""
    };
  };

  const content = getContentBasedOnAnswer();
  
  const questionData = {
    id: "llms-compared",
    title: content.title,
    subtitle: content.subtitle,
    description: content.description,
    ui: {
      logo_position: "top-left",
      animation_style: "terminal",
      animation_text: "comparing LLM capabilities...",
      next_button_color: "primary",
      selector_style: "modern",
      label: "llms_compared"
    },
    isStatic: true
  };

  const handleSubmit = () => {
    navigate('/aiagents');
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
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">{questionData.ui.label}</span>
      </div>

      {/* Title */}
      <div className="absolute top-24 left-6 right-6 md:top-32 md:left-16 md:right-16 z-10 animate-fade-in flex flex-col items-center" style={{ animationDelay: '250ms' }}>
        <h1 className="text-2xl md:text-3xl lg:text-3.5xl font-bold text-white font-open-sauce leading-relaxed max-w-4xl text-center mb-8">
          {content.title}
        </h1>
      </div>

      {/* LLM Comparison */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-16 lg:px-24 pt-32 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <LLMComparison />
      </div>

      {/* Bottom left terminal text */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="font-mono text-gray-400 text-responsive-terminal flex items-baseline">
          <span className="mr-2">{'>'}</span>
          <span className="terminal-text">{questionData.ui.animation_text}</span>
        </div>
      </div>

      {/* Bottom right next button */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 animate-fade-in" style={{ animationDelay: '450ms' }}>
        <button 
          onClick={handleSubmit} 
          className="sci-fi-arrow font-mono text-[#5CE1E6] text-responsive-button neon-glow transition-all duration-300 relative hover:text-[#5CE1E6]/80 digital-glitch-click cursor-pointer"
          data-text="next" 
          style={{
            pointerEvents: 'auto',
            zIndex: 10
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default LLMsCompared;