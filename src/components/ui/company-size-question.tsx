import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AIModelBuilder from './ai-model-builder';
interface CompanySizeQuestionProps {
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
  isStatic?: boolean;
  showBrainGame?: boolean;
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
  const [brainGameCompleted, setBrainGameCompleted] = useState<boolean>(false);

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

  const handleBrainGameComplete = (success: boolean) => {
    setBrainGameCompleted(true);
    if (success) {
      setShowError(false);
    }
  };

  const handleSubmit = () => {
    if (data.showBrainGame && !brainGameCompleted) {
      setShowError(true);
      return;
    }
    
    if (data.validation?.required && !selectedOption && !data.isStatic && !data.showBrainGame) {
      setShowError(true);
      return;
    }
    onSubmit(data.isStatic ? [] : [selectedOption]);
  };
  return <div className="min-h-screen bg-[#0a1628] text-white relative overflow-hidden">
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
        <span className="font-tomorrow text-responsive-label text-[#5CE1E6] neon-glow">{data.ui.label || 'company_size'}</span>
      </div>

      {/* Static text box positioned high */}
      {data.isStatic && !data.showBrainGame && data.title && (
        <div className="absolute top-32 left-6 right-6 md:top-40 md:left-16 md:right-16 z-10 animate-fade-in flex flex-col items-center" style={{ animationDelay: '250ms' }}>
          <h1 className="text-2xl md:text-3xl lg:text-3.5xl font-bold text-white font-open-sauce leading-relaxed max-w-4xl text-center mb-2">
            {data.title}
          </h1>
          {data.description && (
            <p className="text-lg md:text-xl lg:text-xl font-normal text-slate-100 font-open-sauce leading-relaxed max-w-4xl text-center">
              {data.description}
            </p>
          )}
        </div>
      )}

      {/* AI Model Builder Game */}
      {data.showBrainGame && (
        <div className="absolute inset-x-4 md:inset-x-8 lg:inset-x-16 z-50 animate-fade-in" style={{ top: '50%', transform: 'translateY(-50%)', animationDelay: '200ms' }}>
          <div className="text-center mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-3.5xl font-bold text-white font-open-sauce leading-relaxed max-w-4xl mx-auto px-4">
              {data.title}
            </h1>
          </div>
          <AIModelBuilder onGameComplete={handleBrainGameComplete} />
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 md:px-32 lg:px-48 animate-fade-in" style={{ animationDelay: '200ms' }}>
        <div className="max-w-4xl w-full">
          {!data.isStatic && !data.showBrainGame && (
            <>
              {/* Question content */}
              <div className="text-left mb-16">
                <h1 className="text-responsive-title font-bold mb-1 text-white font-open-sauce">{data.title}</h1>
                <p className="text-responsive-subtitle flex items-center text-slate-50 px-0 pt-2 pl-2 md:pl-8 font-normal font-open-sauce">
                  <span className="mr-2 text-slate-50 px-0 py-0 pl-2 md:pl-8">→</span>
                  {data.subtitle}
                </p>
              </div>

              {/* Options list */}
              <div className="space-y-2 mb-16 max-w-2xl">
                {data.options?.map((option, index) => <button key={option} onClick={() => handleOptionSelect(option)} className={cn("group relative w-full px-4 py-2 bg-transparent border-0 text-left flex items-center digital-glitch animate-fade-in rounded-lg transition-all duration-300", "hover:bg-[#5CE1E6]/5 hover:text-[#5CE1E6] focus:outline-none cursor-pointer", selectedOption === option ? "text-[#5CE1E6] bg-[#5CE1E6]/5" : "text-white")} style={{ animationDelay: `${300 + index * 50}ms` }}>
                    {/* Custom bullet point */}
                    <div className={cn("w-2 h-2 rounded-full mr-4 flex-shrink-0 transition-all duration-300", selectedOption === option ? "bg-[#5CE1E6] shadow-[0_0_12px_#5CE1E6] scale-110" : "bg-[#5CE1E6]/80 hover:bg-[#5CE1E6]/90")}></div>
                    
                    <span className={cn("text-responsive-base font-medium font-open-sauce transition-all duration-300", selectedOption === option && "transform scale-102")} data-text={option}>
                      {option}
                    </span>
                  </button>)}
              </div>
            </>
          )}
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
          disabled={data.showBrainGame ? !brainGameCompleted : (!selectedOption && !data.isStatic)}
        >
          next
        </button>
      </div>

      {/* Error message */}
      {showError && <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <p className="text-red-400 font-medium animate-pulse font-mono">
            {data.showBrainGame ? "Complete the brain game to continue!" : (data.validation?.error_message || "Please complete the task to continue!")}
          </p>
        </div>}
    </div>;
};