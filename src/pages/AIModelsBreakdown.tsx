import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';

const AIModelsBreakdown = () => {
  const navigate = useNavigate();
  const { surveyData } = useSurvey();

  const getTitleBasedOnAnswer = () => {
    const previousAnswer = surveyData.aiAgentKnowledge;
    
    switch (previousAnswer) {
      case "A trained mathematical structure that learns patterns from data":
        return "You've got it!";
      case "A way to store and retrieve data":
        return "That's one ingredient! There are 3 more";
      case "An automation script with lots of IF/THEN rules":
        return "A great thought! Here's how modern AI learns instead of just following rules.";
      case "Not sure, I just use the output":
        return "No problem! Let's break it down piece by piece.";
      default:
        return "Let's explore what AI models really are.";
    }
  };

  const handleSubmit = () => {
    navigate('/LLMs');
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white relative overflow-hidden">

      {/* User label in top right */}
      <div className="absolute top-6 right-6 md:top-12 md:right-16 z-10 flex items-end animate-fade-in" style={{ animationDelay: '150ms' }}>
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">ai_models</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="max-w-4xl w-full text-center">
          {/* Title - positioned to align with logo */}
          <div className="mb-8 md:mb-12" style={{ paddingTop: 'clamp(1rem, 2vh, 1.5rem)' }}>
            <h1 className="text-2xl md:text-3xl lg:text-3.5xl font-bold text-white font-open-sauce leading-relaxed mb-4">
              {getTitleBasedOnAnswer()}
            </h1>
            <p className="text-lg md:text-xl text-slate-100 font-open-sauce leading-relaxed">
              An AI model is like a digital brain trained on data to recognize patterns and make predictions.
            </p>
          </div>

          {/* Simple visual explanation */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-[#5CE1E6]/10 border border-[#5CE1E6]/30 rounded-lg p-4 md:p-6">
                <div className="text-[#5CE1E6] text-2xl md:text-3xl mb-2">📊</div>
                <h3 className="text-sm md:text-base font-semibold text-[#5CE1E6] mb-2">Data</h3>
                <p className="text-xs md:text-sm text-slate-300">Training examples</p>
              </div>
              
              <div className="bg-[#5CE1E6]/10 border border-[#5CE1E6]/30 rounded-lg p-4 md:p-6">
                <div className="text-[#5CE1E6] text-2xl md:text-3xl mb-2">⚙️</div>
                <h3 className="text-sm md:text-base font-semibold text-[#5CE1E6] mb-2">Algorithm</h3>
                <p className="text-xs md:text-sm text-slate-300">Learning method</p>
              </div>
              
              <div className="bg-[#5CE1E6]/10 border border-[#5CE1E6]/30 rounded-lg p-4 md:p-6">
                <div className="text-[#5CE1E6] text-2xl md:text-3xl mb-2">🧠</div>
                <h3 className="text-sm md:text-base font-semibold text-[#5CE1E6] mb-2">Weights</h3>
                <p className="text-xs md:text-sm text-slate-300">Learned patterns</p>
              </div>
              
              <div className="bg-[#5CE1E6]/10 border border-[#5CE1E6]/30 rounded-lg p-4 md:p-6">
                <div className="text-[#5CE1E6] text-2xl md:text-3xl mb-2">💡</div>
                <h3 className="text-sm md:text-base font-semibold text-[#5CE1E6] mb-2">Inference</h3>
                <p className="text-xs md:text-sm text-slate-300">Making predictions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom left terminal text */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="font-mono text-gray-400 text-responsive-terminal flex items-baseline">
          <span className="mr-2">{'>'}</span>
          <span className="terminal-text">AI model components identified...</span>
        </div>
      </div>

      {/* Bottom right next button */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 animate-fade-in z-[999]" style={{ animationDelay: '450ms' }}>
        <button 
          onClick={() => {
            console.log('AIModelsBreakdown button clicked - starting navigation');
            handleSubmit();
          }}
          className="px-6 py-3 rounded-lg font-medium transition-all duration-300 font-open-sauce bg-[#5CE1E6] text-[#0a1628] hover:bg-[#5CE1E6]/80 relative z-[999]"
          style={{
            pointerEvents: 'auto'
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default AIModelsBreakdown;