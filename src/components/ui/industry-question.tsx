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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div 
              key={i} 
              className="border-l border-neon-cyan/20 animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* Logo positioned top left */}
      <div className="absolute top-8 left-8 z-10">
        <img 
          src="/lovable-uploads/11e6e5b7-bfc4-4779-b6fa-3ea16d7b2fe2.png" 
          alt="Company Logo" 
          className="w-12 h-12 object-contain"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8">
        <div className="max-w-4xl w-full">
          {/* Terminal animation */}
          <div className="mb-12 text-center">
            <div className="font-mono text-terminal-green text-lg mb-4">
              {animationText}
              <span className="animate-pulse">_</span>
            </div>
          </div>

          {/* Question content */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-neon-cyan to-neon-cyan-glow bg-clip-text text-transparent">
              {data.title}
            </h1>
            <p className="text-xl text-muted-foreground">
              {data.subtitle}
            </p>
          </div>

          {/* Options grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {data.options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleOptionToggle(option)}
                className={cn(
                  "group relative p-6 rounded-lg border-2 transition-all duration-300 text-left",
                  "hover:border-neon-cyan hover:bg-dark-surface/50",
                  "focus:outline-none focus:ring-2 focus:ring-neon-cyan",
                  selectedOptions.includes(option)
                    ? "border-neon-cyan bg-dark-surface shadow-lg shadow-neon-cyan/25"
                    : "border-border bg-card"
                )}
              >
                {/* Neon brackets for selected items */}
                {selectedOptions.includes(option) && (
                  <>
                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 text-neon-cyan font-mono text-2xl">
                      [
                    </span>
                    <span className="absolute -right-2 top-1/2 -translate-y-1/2 text-neon-cyan font-mono text-2xl">
                      ]
                    </span>
                  </>
                )}
                
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-lg font-medium transition-colors",
                    selectedOptions.includes(option) ? "text-neon-cyan" : "text-foreground"
                  )}>
                    {option}
                  </span>
                  
                  {/* Selection indicator */}
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 transition-all",
                    selectedOptions.includes(option)
                      ? "border-neon-cyan bg-neon-cyan shadow-md shadow-neon-cyan/50"
                      : "border-muted-foreground"
                  )}>
                    {selectedOptions.includes(option) && (
                      <div className="w-full h-full rounded-full bg-neon-cyan animate-pulse" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Error message */}
          {showError && (
            <div className="text-center mb-6">
              <p className="text-destructive font-medium animate-pulse">
                {data.validation.error_message}
              </p>
            </div>
          )}

          {/* Submit button */}
          <div className="text-center">
            <Button
              onClick={handleSubmit}
              className="px-12 py-4 text-lg font-semibold bg-neon-cyan text-primary-foreground hover:bg-neon-cyan-glow transition-all duration-300 shadow-lg shadow-neon-cyan/25 hover:shadow-neon-cyan/40"
              disabled={selectedOptions.length === 0}
            >
              Continue
              <span className="ml-2 font-mono">→</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};