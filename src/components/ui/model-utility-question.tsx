import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useSurvey } from '@/contexts/SurveyContext';
import { getUseCasesForCombination } from '@/data/modelUtilityUseCases';

interface ModelUtilityQuestionProps {
  data: {
    id: string;
    title?: string;
    subtitle?: string;
    description?: string;
    options?: string[];
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

export const ModelUtilityQuestion: React.FC<ModelUtilityQuestionProps> = ({
  data,
  onSubmit
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [otherText, setOtherText] = useState('');
  const [animationText, setAnimationText] = useState('');
  const [showError, setShowError] = useState(false);
  const { surveyData } = useSurvey();
  
  // Get dynamic options based on industry and department
  const dynamicUseCases = getUseCasesForCombination(surveyData.industry || '', surveyData.department || '');
  const evergreenOptions = [
    "I've explored AI, but it's not in daily use yet",
    "Other"
  ];
  const dynamicOptions = [...dynamicUseCases, ...evergreenOptions];

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
    if (option === "Other") return; // Don't handle "Other" click, it's handled by input
    
    setSelectedOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(o => o !== option);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), option]; // Replace oldest if at max
        }
        return [...prev, option];
      }
    });
    setShowError(false);
  };

  const handleSubmit = () => {
    const finalOptions = [...selectedOptions];
    if (otherText.trim()) {
      finalOptions.push(`Other: ${otherText.trim()}`);
    }
    
    if (data.validation?.required && finalOptions.length === 0) {
      setShowError(true);
      return;
    }
    onSubmit(finalOptions);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white relative overflow-hidden">

      {/* User label in top right */}
      <div className="absolute top-6 right-6 md:top-12 md:right-16 z-10 flex items-end animate-fade-in" style={{ animationDelay: '150ms' }}>
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">{data.ui.label || 'model_utility'}</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 md:px-32 lg:px-48 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="max-w-4xl w-full">
          {/* Question content */}
          <div className="text-left mb-16">
                <h1 className="text-responsive-title font-bold mb-1 text-white font-open-sauce">{data.title}</h1>
                <p className="text-responsive-subtitle flex items-center text-slate-50 px-0 pt-2 pl-2 md:pl-8 font-normal font-open-sauce">
                  <span className="mr-2 text-slate-50 px-0 py-0 pl-2 md:pl-8">→</span>
                  {data.subtitle}
                </p>
          </div>

          {/* Options list */}
          <div className="space-y-1 md:space-y-2 mb-16 max-w-2xl">
            {dynamicOptions?.map((option, index) => (
              <div key={option} style={{ animationDelay: `${300 + index * 50}ms` }} className="animate-fade-in">
                {option === "Other" ? (
                  <div className="w-full px-4 py-2 flex items-center">
                    <div className="w-2 h-2 rounded-full mr-4 flex-shrink-0 bg-[#5CE1E6]/80"></div>
                    <span className="text-responsive-base font-medium font-open-sauce text-white mr-3">Other:</span>
                    <Input
                      value={otherText}
                      onChange={(e) => setOtherText(e.target.value)}
                      placeholder="Describe your use case..."
                      className="flex-1 bg-transparent border border-[#5CE1E6]/30 text-white placeholder:text-slate-400 focus:border-[#5CE1E6] focus:ring-[#5CE1E6]"
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => handleOptionSelect(option)}
                    className={cn(
                      "group relative w-full px-3 md:px-4 py-1.5 md:py-2 bg-transparent border-0 text-left flex items-center digital-glitch rounded-lg transition-all duration-300",
                      "hover:bg-[#5CE1E6]/5 hover:text-[#5CE1E6] focus:outline-none cursor-pointer",
                      selectedOptions.includes(option) ? "text-[#5CE1E6] bg-[#5CE1E6]/5" : "text-white"
                    )}
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
                )}
              </div>
            ))}
          </div>
          
          {/* Selection counter */}
          <div className="mb-4 text-center">
            <p className="text-slate-400 text-sm font-mono">
              Selected: {selectedOptions.length + (otherText.trim() ? 1 : 0)}/3 
              {selectedOptions.length + (otherText.trim() ? 1 : 0) === 0 && " (minimum 1 required)"}
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
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16 animate-fade-in z-[999]" style={{ animationDelay: '450ms' }}>
        <button 
          onClick={handleSubmit} 
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 font-open-sauce relative z-[999] ${
            selectedOptions.length === 0 && otherText.trim().length === 0
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-[#5CE1E6] text-[#0a1628] hover:bg-[#5CE1E6]/80'
          }`}
          style={{
            pointerEvents: (selectedOptions.length > 0 || otherText.trim().length > 0) ? 'auto' : 'none'
          }}
          disabled={selectedOptions.length === 0 && otherText.trim().length === 0}
        >
          Next →
        </button>
      </div>

      {/* Error message */}
      {showError && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <p className="text-red-400 font-medium animate-pulse font-mono">
            {data.validation?.error_message || "Please select an option to continue!"}
          </p>
        </div>
      )}
    </div>
  );
};