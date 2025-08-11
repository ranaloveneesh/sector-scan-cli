import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { Textarea } from '@/components/ui/textarea';

const ModelUtilityOpenText = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();
  const [response, setResponse] = useState('');

  const handleSubmit = () => {
    if (response.trim()) {
      updateSurveyData('modelUtility', response);
      navigate('/data-accessibility');
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
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">model_utility</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
        
        {/* Title - positioned to align with logo */}
        <div className="text-center mb-8 md:mb-12 mt-20 md:mt-24 max-w-4xl">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white font-open-sauce leading-relaxed mb-6">
            How are you currently leveraging AI models to support your team?
          </h1>
          <p className="text-base md:text-lg text-slate-100 font-open-sauce leading-relaxed mb-8">
            Describe your current AI usage, challenges, and where you see the most potential
          </p>
          
          {/* Text area */}
          <div className="w-full max-w-2xl mx-auto">
            <Textarea
              placeholder="Tell us about your AI journey - what models are you using, what challenges are you facing, and what outcomes are you hoping to achieve..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="min-h-[200px] bg-white/10 border-white/20 text-white placeholder:text-slate-400 resize-none text-base font-open-sauce"
              style={{ fontSize: '16px' }}
            />
          </div>
        </div>
      </div>

      {/* Bottom left terminal text */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="font-mono text-gray-400 text-responsive-terminal flex items-baseline">
          <span className="mr-2">{'>'}</span>
          <span className="terminal-text">documenting use case...</span>
        </div>
      </div>

      {/* Bottom right next button */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 animate-fade-in" style={{ animationDelay: '450ms' }}>
        <button 
          onClick={handleSubmit}
          disabled={!response.trim()}
          className="px-6 py-3 rounded-lg font-medium transition-all duration-300 font-open-sauce bg-[#5CE1E6] text-[#0a1628] hover:bg-[#5CE1E6]/80 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default ModelUtilityOpenText;