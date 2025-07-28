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
export const IndustryQuestion: React.FC<IndustryQuestionProps> = ({
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
  return <div className="min-h-screen bg-[#0a1628] text-white relative overflow-hidden">
      {/* Hexagonal logo in top left */}
      <div className="absolute top-6 left-6 md:top-12 md:left-16 z-10">
        <div className="flex items-center justify-center" style={{width: 'clamp(4rem, 6vw, 6.25rem)', height: 'clamp(4rem, 6vw, 6.25rem)'}}>
          <img src="/lovable-uploads/a8d760f4-8e0c-410d-ae83-a3e6dd4b23e9.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
      </div>

      {/* User industry label in top right */}
      <div className="absolute top-6 right-6 md:top-12 md:right-16 z-10">
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">user_industry</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 md:px-32 lg:px-48">
        <div className="max-w-4xl w-full">
          {/* Question content */}
          <div className="text-left mb-16">
            <h1 className="text-responsive-title font-bold mb-1 text-white font-open-sauce">
              What's your industry?
            </h1>
            <p className="text-responsive-subtitle flex items-center text-slate-50 px-0 pt-2 pl-2 md:pl-8 font-normal font-open-sauce">
              <span className="mr-2 text-slate-50 px-0 py-0 pl-2 md:pl-8">→</span>
              select the field you operate in.
            </p>
          </div>

          {/* Options grid */}
          <div className="grid grid-cols-3 gap-6 mb-16">
            {data.options.map((option, index) => <button key={option} onClick={() => handleOptionSelect(option)} className={cn("group relative px-2 py-3 bg-transparent border-0 transition-all duration-300 text-left min-h-[70px] flex items-center justify-center", "hover:bg-[#5CE1E6]/5 focus:outline-none", selectedOption === option ? "text-[#5CE1E6]" : "text-white")}>
                {/* Corner brackets */}
                <div className={cn("absolute inset-0 transition-all duration-300", selectedOption === option ? "opacity-100" : "opacity-60 group-hover:opacity-80")}>
                  {/* Top left corner */}
                  <div className="absolute top-0 left-0 w-4 h-4">
                    <div className={cn("absolute top-0 left-0 w-4 h-0.5", selectedOption === option ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                    <div className={cn("absolute top-0 left-0 w-0.5 h-4", selectedOption === option ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                  </div>
                  
                  {/* Top right corner */}
                  <div className="absolute top-0 right-0 w-4 h-4">
                    <div className={cn("absolute top-0 right-0 w-4 h-0.5", selectedOption === option ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                    <div className={cn("absolute top-0 right-0 w-0.5 h-4", selectedOption === option ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                  </div>
                  
                  {/* Bottom left corner */}
                  <div className="absolute bottom-0 left-0 w-4 h-4">
                    <div className={cn("absolute bottom-0 left-0 w-4 h-0.5", selectedOption === option ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                    <div className={cn("absolute bottom-0 left-0 w-0.5 h-4", selectedOption === option ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                  </div>
                  
                  {/* Bottom right corner */}
                  <div className="absolute bottom-0 right-0 w-4 h-4">
                    <div className={cn("absolute bottom-0 right-0 w-4 h-0.5", selectedOption === option ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                    <div className={cn("absolute bottom-0 right-0 w-0.5 h-4", selectedOption === option ? "bg-[#5CE1E6]" : "bg-[#5CE1E6]")}></div>
                  </div>
                </div>
                
                <span className="text-responsive-base font-medium relative z-10 font-open-sauce">
                  {option}
                </span>
              </button>)}
          </div>
        </div>
      </div>

      {/* Bottom left terminal text */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-16">
        <div className="font-mono text-gray-400 text-responsive-terminal flex items-baseline">
          <span className="mr-2">{'>'}</span>
          <span className="terminal-text">determining your sector...</span>
        </div>
      </div>

      {/* Bottom right next button */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16">
        <button onClick={handleSubmit} className="font-mono text-[#5CE1E6] text-responsive-button neon-glow neon-glow-hover neon-glow-active transition-all duration-300">
          next
        </button>
      </div>

      {/* Error message */}
      {showError && <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <p className="text-red-400 font-medium animate-pulse">
            {data.validation.error_message}
          </p>
        </div>}
    </div>;
};