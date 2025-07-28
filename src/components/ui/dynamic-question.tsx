import React, { useState, useEffect } from 'react';
import { useSurvey } from '@/contexts/SurveyContext';
import { getQuestionForCombination, QuestionData } from '@/data/questionMatrix';

interface DynamicQuestionProps {
  onSubmit: (selectedOptions: string[]) => void;
}

export const DynamicQuestion: React.FC<DynamicQuestionProps> = ({ onSubmit }) => {
  const { getSurveyData } = useSurvey();
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [animationText, setAnimationText] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);

  useEffect(() => {
    const surveyData = getSurveyData();
    const { industry, department } = surveyData;
    
    if (industry && department) {
      const question = getQuestionForCombination(industry, department);
      setQuestionData(question);
      
      if (question) {
        // Terminal animation effect
        let index = 0;
        const animationInterval = setInterval(() => {
          setAnimationText(question.animation_text.slice(0, index));
          index++;
          if (index > question.animation_text.length) {
            clearInterval(animationInterval);
          }
        }, 50);

        return () => clearInterval(animationInterval);
      }
    }
  }, [getSurveyData]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowError(false);
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      setShowError(true);
      return;
    }
    onSubmit([selectedOption]);
  };

  if (!questionData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#5CE1E6] font-mono">
          &gt; loading personalized question...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Logo placeholder */}
      <div className="absolute top-6 right-6 md:top-12 md:right-16">
        <div className="w-8 h-8 border border-[#5CE1E6] bg-black"></div>
      </div>

      {/* Animation text */}
      <div className="absolute top-6 left-6 md:top-12 md:left-16 font-mono text-[#5CE1E6] text-sm">
        {animationText}
      </div>

      {/* Back button */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 md:top-12">
        <button className="sci-fi-arrow font-mono text-[#5CE1E6] text-responsive-button neon-glow transition-all duration-300 relative hover:text-[#5CE1E6]/80 rotate-180">
          next
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 md:px-16">
        <h1 className="font-mono text-white text-responsive-title mb-4 text-center max-w-4xl leading-tight">
          {questionData.title}
        </h1>
        
        <p className="font-mono text-gray-400 text-responsive-subtitle mb-12 text-center max-w-2xl">
          {questionData.subtitle}
        </p>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
          {questionData.options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionSelect(option)}
              className={`
                relative p-6 border cursor-pointer transition-all duration-300 font-mono text-responsive-option
                ${selectedOption === option 
                  ? 'border-[#5CE1E6] bg-[#5CE1E6]/10 text-[#5CE1E6] sci-fi-selected' 
                  : 'border-gray-600 hover:border-[#5CE1E6]/50 hover:bg-[#5CE1E6]/5'
                }
              `}
            >
              <span className="relative z-10">{option}</span>
              {selectedOption === option && (
                <>
                  <span className="absolute top-2 left-2 text-[#5CE1E6] text-xs">[</span>
                  <span className="absolute bottom-2 right-2 text-[#5CE1E6] text-xs">]</span>
                </>
              )}
            </div>
          ))}
        </div>

        {showError && (
          <div className="mt-6 text-red-400 font-mono text-sm text-center">
            Please select an option.
          </div>
        )}
      </div>

      {/* Next button */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-16">
        <button
          onClick={handleSubmit}
          className="sci-fi-arrow font-mono text-[#5CE1E6] text-responsive-button neon-glow transition-all duration-300 relative hover:text-[#5CE1E6]/80 digital-glitch-click cursor-pointer"
          data-text="next"
          style={{ pointerEvents: 'auto', zIndex: 10 }}
        >
          next
        </button>
      </div>
    </div>
  );
};