import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface IndustryQuestionProps {
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

export const IndustryQuestion: React.FC<IndustryQuestionProps> = ({ data, onSubmit }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
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

  const handleOptionToggle = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
    setShowError(false);
  };

  const handleSubmit = () => {
    if (data.validation.required && selectedOptions.length === 0) {
      setShowError(true);
      return;
    }
    onSubmit(selectedOptions);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white relative overflow-hidden">
      {/* Hexagonal logo in top left */}
      <div className="absolute top-8 left-8 z-10">
        <div className="w-16 h-16 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-[#5CE1E6]">
            <polygon points="25,15 75,15 90,50 75,85 25,85 10,50" strokeWidth="2" stroke="#5CE1E6" fill="#5CE1E6" opacity="0.8"/>
            <polygon points="35,35 65,35 70,50 65,65 35,65 30,50" fill="#0a1628"/>
            <circle cx="50" cy="50" r="8" fill="#5CE1E6"/>
          </svg>
        </div>
      </div>

      {/* User industry label in top right */}
      <div className="absolute top-8 right-8 z-10">
        <span className="font-mono text-[#5CE1E6] text-lg">user_industry</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        <div className="max-w-6xl w-full">
          {/* Question content */}
          <div className="text-left mb-16">
            <h1 className="text-3xl font-bold mb-6 text-white">
              What's your industry?
            </h1>
            <p className="text-xl text-gray-300 flex items-center">
              <span className="mr-3 text-[#5CE1E6]">→</span>
              select the field you operate in.
            </p>
          </div>

          {/* Options grid */}
          <div className="grid grid-cols-3 gap-6 mb-16">
            {data.options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleOptionToggle(option)}
                className={cn(
                  "group relative p-8 bg-transparent border-0 transition-all duration-300 text-left min-h-[120px] flex items-center justify-center",
                  "hover:bg-[#5CE1E6]/5 focus:outline-none",
                  selectedOptions.includes(option) ? "text-[#5CE1E6]" : "text-white"
                )}
              >
                {/* Corner brackets */}
                <div className={cn(
                  "absolute inset-0 transition-all duration-300",
                  selectedOptions.includes(option) ? "opacity-100" : "opacity-60 group-hover:opacity-80"
                )}>
                  {/* Top left corner */}
                  <div className="absolute top-0 left-0 w-6 h-6">
                    <div className={cn("absolute top-0 left-0 w-6 h-0.5", selectedOptions.includes(option) ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                    <div className={cn("absolute top-0 left-0 w-0.5 h-6", selectedOptions.includes(option) ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                  </div>
                  
                  {/* Top right corner */}
                  <div className="absolute top-0 right-0 w-6 h-6">
                    <div className={cn("absolute top-0 right-0 w-6 h-0.5", selectedOptions.includes(option) ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                    <div className={cn("absolute top-0 right-0 w-0.5 h-6", selectedOptions.includes(option) ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                  </div>
                  
                  {/* Bottom left corner */}
                  <div className="absolute bottom-0 left-0 w-6 h-6">
                    <div className={cn("absolute bottom-0 left-0 w-6 h-0.5", selectedOptions.includes(option) ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                    <div className={cn("absolute bottom-0 left-0 w-0.5 h-6", selectedOptions.includes(option) ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                  </div>
                  
                  {/* Bottom right corner */}
                  <div className="absolute bottom-0 right-0 w-6 h-6">
                    <div className={cn("absolute bottom-0 right-0 w-6 h-0.5", selectedOptions.includes(option) ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                    <div className={cn("absolute bottom-0 right-0 w-0.5 h-6", selectedOptions.includes(option) ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                  </div>
                </div>
                
                <span className="text-2xl font-medium relative z-10">
                  {option}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom left terminal text */}
      <div className="absolute bottom-8 left-8">
        <div className="font-mono text-gray-400 text-lg flex items-center">
          <span className="mr-2">{'>'}</span>
          scanning your sector...
        </div>
      </div>

      {/* Bottom right next button */}
      <div className="absolute bottom-8 right-8">
        <button
          onClick={handleSubmit}
          className="font-mono text-[#5CE1E6] text-2xl hover:text-[#5CE1E6]/80 transition-colors"
        >
          next
        </button>
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