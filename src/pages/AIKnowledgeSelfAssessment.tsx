import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';

const AIKnowledgeSelfAssessment = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const selfAssessmentOptions = [
    "Beginner - I'm just starting to explore AI",
    "Novice - I have basic understanding but limited hands-on experience", 
    "Intermediate - I use AI tools regularly and understand the concepts",
    "Advanced - I have deep knowledge and implement AI solutions",
    "Expert - I develop AI systems and guide others in AI adoption"
  ];

  const handleSubmit = () => {
    if (selectedOption) {
      updateSurveyData('aiKnowledgeSelfAssessment', selectedOption);
      navigate('/arl-results');
    }
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
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">ai_self_assessment</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
        
        {/* Title - positioned to align with logo */}
        <div className="text-center mb-8 md:mb-12 mt-20 md:mt-24 max-w-4xl">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white font-open-sauce leading-relaxed mb-6">
            How would you rate your current AI knowledge?
          </h1>
          <p className="text-base md:text-lg text-slate-100 font-open-sauce leading-relaxed mb-8">
            Help us calibrate your results with an honest self-assessment
          </p>
          
          {/* Options */}
          <div className="space-y-4 max-w-2xl mx-auto">
            {selfAssessmentOptions.map((option, index) => {
              const isSelected = selectedOption === option;
              
              return (
                <button
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  className={`
                    w-full p-6 rounded-lg border-2 transition-all duration-300 font-open-sauce text-left
                    ${isSelected 
                      ? 'bg-[#5CE1E6]/20 border-[#5CE1E6] text-[#5CE1E6]' 
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-[#5CE1E6]/50'
                    }
                    animate-fade-in
                  `}
                  style={{ animationDelay: `${300 + (index * 100)}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base md:text-lg">
                      {option}
                    </span>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#5CE1E6] flex items-center justify-center">
                        <span className="text-[#0a1628] text-sm font-bold">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom left terminal text */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="font-mono text-gray-400 text-responsive-terminal flex items-baseline">
          <span className="mr-2">{'>'}</span>
          <span className="terminal-text">calibrating assessment...</span>
        </div>
      </div>

      {/* Bottom right next button */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 animate-fade-in" style={{ animationDelay: '450ms' }}>
        <button 
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="px-6 py-3 rounded-lg font-medium transition-all duration-300 font-open-sauce bg-[#5CE1E6] text-[#0a1628] hover:bg-[#5CE1E6]/80 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            pointerEvents: 'auto',
            zIndex: 100
          }}
        >
          Complete Assessment →
        </button>
      </div>
    </div>
  );
};

export default AIKnowledgeSelfAssessment;