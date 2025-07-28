import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CompanySizeQuestionProps {
  data: {
    id: string;
    title: string;
    subtitle: string;
    options: string[];
    ui: {
      logo_position: string;
      animation_style: string;
      animation_text: string;
      next_button_color: string;
      selector_style: string;
    };
    validation: {
      required: boolean;
      error_message: string;
    };
  };
  onSubmit: (selectedOptions: string[]) => void;
}

export const CompanySizeQuestion: React.FC<CompanySizeQuestionProps> = ({
  data,
  onSubmit
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [animationText, setAnimationText] = useState('');
  const [showError, setShowError] = useState(false);

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
    setSelectedOption(option);
    setShowError(false);
  };

  const handleSubmit = () => {
    if (data.validation.required && !selectedOption) {
      setShowError(true);
      return;
    }
    onSubmit([selectedOption]);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white relative overflow-hidden">
      {/* Header with logo and label */}
      <div className="absolute top-6 left-6 right-6 md:top-12 md:left-16 md:right-16 z-10 flex justify-between items-center">
        <div className="flex items-center justify-center" style={{width: 'clamp(4rem, 6vw, 6.25rem)', height: 'clamp(4rem, 6vw, 6.25rem)'}}>
          <img src="/lovable-uploads/a8d760f4-8e0c-410d-ae83-a3e6dd4b23e9.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">company_size</span>
      </div>

      {/* Main content container */}
      <div className="flex flex-col justify-center min-h-screen px-8 md:px-16 lg:px-24 pt-24 pb-24">
        <div className="max-w-3xl mx-auto w-full">
          {/* Question header */}
          <div className="mb-8">
            <h1 className="text-responsive-title font-bold mb-2 text-white font-open-sauce">
              What's the size of your company?
            </h1>
            <p className="text-responsive-subtitle text-slate-50 font-normal font-open-sauce flex items-center">
              <span className="mr-2">→</span>
              select your team size.
            </p>
          </div>

          {/* Options list */}
          <div className="space-y-3 mb-8">
            {data.options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                className={cn(
                  "group relative w-full px-6 py-3 bg-transparent border-0 transition-all duration-300 text-left flex items-center rounded-lg",
                  "hover:bg-[#5CE1E6]/5 focus:outline-none cursor-pointer",
                  selectedOption === option ? "text-[#5CE1E6] bg-[#5CE1E6]/5" : "text-white"
                )}
              >
                {/* Custom bullet point */}
                <div className={cn(
                  "w-2 h-2 rounded-full mr-4 flex-shrink-0 transition-all duration-300",
                  selectedOption === option ? "bg-[#5CE1E6] shadow-[0_0_8px_#5CE1E6]" : "bg-[#5CE1E6]/60"
                )}></div>
                
                <span className="text-responsive-base font-medium font-open-sauce">
                  {option}
                </span>
              </button>
            ))}
          </div>

          {/* Bottom section with terminal text and button */}
          <div className="flex justify-between items-end mt-12">
            <div className="font-mono text-gray-400 text-responsive-terminal flex items-baseline">
              <span className="mr-2">{'>'}</span>
              <span className="terminal-text">calculating team size...</span>
            </div>
            
            <button
              onClick={handleSubmit}
              className="sci-fi-arrow font-mono text-[#5CE1E6] text-responsive-button neon-glow transition-all duration-300 relative hover:text-[#5CE1E6]/80 cursor-pointer"
              style={{ pointerEvents: 'auto', zIndex: 10 }}
              data-text="next"
            >
              next
            </button>
          </div>
        </div>
      </div>

      {/* Error message */}
      {showError && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <p className="text-red-400 font-medium animate-pulse">
            {data.validation.error_message}
          </p>
        </div>
      )}
    </div>
  );
};