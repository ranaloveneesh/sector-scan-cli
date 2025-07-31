import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSurvey } from '@/contexts/SurveyContext';
import { getQuestionForCombination } from '@/data/questionMatrix';

interface AgentUtilityQuestionProps {
  data: {
    id: string;
    title?: string;
    subtitle?: string;
    description?: string;
    options?: string[];
    maxSelections?: number;
    ui: {
      logo_position: string;
      animation_style: string;
      animation_text: string;
      next_button_color: string;
      selector_style: string;
      label?: string;
    };
    validation?: {
      required: boolean;
      error_message: string;
    };
  };
  onSubmit: (selectedOptions: string[]) => void;
}

export const AgentUtilityQuestion: React.FC<AgentUtilityQuestionProps> = ({
  data,
  onSubmit
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [animationText, setAnimationText] = useState('');
  const [showError, setShowError] = useState(false);
  const { surveyData } = useSurvey();
  
  const maxSelections = data.maxSelections || 1;
  
  // Get dynamic options based on industry and department
  const questionData = getQuestionForCombination(surveyData.industry || '', surveyData.department || '');
  const dynamicOptions = questionData?.options || data.options;

  // Terminal animation effect
  useEffect(() => {
    const text = data.ui.animation_text;
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setAnimationText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [data.ui.animation_text]);

  const handleOptionSelect = (option: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(item => item !== option);
      } else if (prev.length < maxSelections) {
        return [...prev, option];
      } else {
        return [...prev.slice(1), option];
      }
    });
    setShowError(false);
  };

  const handleSubmit = () => {
    if (data.validation?.required && selectedOptions.length === 0) {
      setShowError(true);
      return;
    }
    onSubmit(selectedOptions);
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
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">{data.ui.label || 'agent_utility'}</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 md:px-32 lg:px-48 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="max-w-4xl w-full">
          {/* Question content */}
          <div className="text-left mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-3.5xl font-bold mb-1 text-white font-open-sauce">{data.title}</h1>
            <p className="text-lg md:text-xl lg:text-xl flex items-center text-slate-50 px-0 pt-2 pl-2 md:pl-8 font-normal font-open-sauce">
              <span className="mr-2 text-slate-50 px-0 py-0 pl-2 md:pl-8">→</span>
              {data.subtitle}
            </p>
          </div>

          {/* Options list */}
          <div className="space-y-2 mb-16 max-w-2xl">
            {dynamicOptions?.map((option, index) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                className={cn(
                  "group relative w-full px-4 py-2 bg-transparent border-0 text-left flex items-center digital-glitch animate-fade-in rounded-lg transition-all duration-300",
                  "hover:bg-[#5CE1E6]/5 hover:text-[#5CE1E6] focus:outline-none cursor-pointer",
                  selectedOptions.includes(option) ? "text-[#5CE1E6] bg-[#5CE1E6]/5" : "text-white"
                )}
                style={{ animationDelay: `${300 + index * 50}ms` }}
              >
                {/* Custom bullet point */}
                <div className={cn(
                  "w-2 h-2 rounded-full mr-4 flex-shrink-0 transition-all duration-300",
                  selectedOptions.includes(option) 
                    ? "bg-[#5CE1E6] shadow-[0_0_12px_#5CE1E6] scale-110" 
                    : "bg-[#5CE1E6]/80 hover:bg-[#5CE1E6]/90"
                )}></div>
                
                <span className={cn(
                  "text-responsive-base font-medium font-open-sauce transition-all duration-300",
                  selectedOptions.includes(option) && "transform scale-102"
                )} data-text={option}>
                  {option}
                </span>
              </button>
            ))}
          </div>
          
          {/* Selection counter */}
          <div className="text-center mb-4">
            <p className="text-sm text-gray-400 font-mono">
              Selected: {selectedOptions.length}/{maxSelections}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom left terminal text */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="font-mono text-gray-400 text-responsive-terminal flex items-baseline">
          <span className="mr-2">{'>'}</span>
          <span className="terminal-text">{animationText}</span>
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
          disabled={selectedOptions.length === 0}
        >
          next
        </button>
      </div>

      {/* Error message */}
      {showError && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <p className="text-red-400 font-medium animate-pulse font-mono">
            {data.validation?.error_message || "Please select at least one option to continue!"}
          </p>
        </div>
      )}
    </div>
  );
};