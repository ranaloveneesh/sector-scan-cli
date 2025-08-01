import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { CompanySizeQuestion } from '@/components/ui/company-size-question';
import AIExplanations from '@/components/ui/ai-explanations';

const AIModelsExplained = () => {
  const navigate = useNavigate();
  const { surveyData } = useSurvey();

  const getTitleBasedOnAnswer = () => {
    const previousAnswer = surveyData.aiAgentKnowledge;
    
    switch (previousAnswer) {
      case "A way to store and retrieve data 📦":
        return "Now you see how AI models really work — they're pattern recognition engines.";
      case "A trained mathematical structure that learns patterns from data 🧮":
        return "Perfect! You had it right — and now you've seen it in action.";
      case "An automation script with lots of IF/THEN rules ☝️":
        return "See the difference? Modern AI learns patterns, not rigid rules.";
      case "Not sure, I just use the output 😅":
        return "Now you know what's happening under the hood when you use AI.";
      default:
        return "Understanding AI models helps you use them more effectively.";
    }
  };

  const questionData = {
    id: "aimodels-explained",
    title: getTitleBasedOnAnswer(),
    ui: {
      logo_position: "top-left",
      animation_style: "terminal",
      animation_text: "AI model explanation complete...",
      next_button_color: "#5CE1E6",
      selector_style: "modern",
      label: "ai_models_explained"
    },
    isStatic: true,
    showExplanations: true
  };

  const handleSubmit = () => {
    navigate('/ai-model-test');
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

      {/* Title and subtitle */}
      <div className="absolute top-32 left-6 right-6 md:top-40 md:left-16 md:right-16 z-10 animate-fade-in flex flex-col items-center" style={{ animationDelay: '250ms' }}>
        <h1 className="text-2xl md:text-3xl lg:text-3.5xl font-bold text-white font-open-sauce leading-relaxed max-w-4xl text-center mb-4">
          {questionData.title}
        </h1>
        <p className="text-lg md:text-xl lg:text-xl font-normal text-slate-100 font-open-sauce leading-relaxed max-w-4xl text-center mb-8">
          Here's a quick breakdown of the 4 key components that power every AI model
        </p>
      </div>

      {/* AI Explanations */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 md:px-32 lg:px-48 pt-32 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <AIExplanations />
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

export default AIModelsExplained;