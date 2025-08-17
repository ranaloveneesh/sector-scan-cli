import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';

const AgentUtilitySimple = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const agentUtilityOptions = [
    "Content Generation & Analysis",
    "Decision Support & Advisory", 
    "Workflow Automation",
    "Monitoring & Alerting",
    "Communication Management",
    "Research & Data Processing"
  ];

  const handleOptionToggle = (option: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(o => o !== option);
      } else if (prev.length < 3) {
        return [...prev, option];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    if (selectedOptions.length > 0) {
      updateSurveyData('agentUtility', selectedOptions.join(', '));
      navigate('/agent-intent');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white relative overflow-hidden">

      {/* User label in top right */}
      <div className="absolute top-6 right-6 md:top-12 md:right-16 z-10 flex items-end animate-fade-in" style={{ animationDelay: '150ms' }}>
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">agent_utility</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
        
        {/* Title - positioned to align with logo */}
        <div className="text-center mb-8 md:mb-12 mt-20 md:mt-24 max-w-4xl">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white font-open-sauce leading-relaxed mb-6">
            What tasks could AI agents realistically take over in your team?
          </h1>
          <p className="text-base md:text-lg text-slate-100 font-open-sauce leading-relaxed mb-8">
            Select up to 3 areas where agents could reduce effort or time
          </p>
          
          {/* Options grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {agentUtilityOptions.map((option, index) => {
              const isSelected = selectedOptions.includes(option);
              const isDisabled = !isSelected && selectedOptions.length >= 3;
              
              return (
                <button
                  key={option}
                  onClick={() => handleOptionToggle(option)}
                  disabled={isDisabled}
                  className={`
                    p-6 rounded-lg border-2 transition-all duration-300 font-open-sauce text-left
                    ${isSelected 
                      ? 'bg-[#5CE1E6]/20 border-[#5CE1E6] text-[#5CE1E6]' 
                      : isDisabled
                        ? 'bg-white/5 border-white/10 text-slate-500 cursor-not-allowed'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-[#5CE1E6]/50'
                    }
                    animate-fade-in
                  `}
                  style={{ animationDelay: `${300 + (index * 100)}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base md:text-lg font-semibold">
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

          {/* Selection counter */}
          <div className="mt-6 text-slate-400 font-open-sauce">
            {selectedOptions.length}/3 selected
          </div>
        </div>
      </div>

      {/* Bottom left terminal text */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="font-mono text-gray-400 text-responsive-terminal flex items-baseline">
          <span className="mr-2">{'>'}</span>
          <span className="terminal-text">analyzing agent utility...</span>
        </div>
      </div>

      {/* Bottom right next button */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 animate-fade-in" style={{ animationDelay: '450ms' }}>
        <button 
          onClick={handleSubmit}
          disabled={selectedOptions.length === 0}
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

export default AgentUtilitySimple;