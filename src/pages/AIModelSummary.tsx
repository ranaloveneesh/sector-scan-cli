import React from 'react';
import { useNavigate } from 'react-router-dom';
import { aiModelGameData } from '@/data/aiModelGameData';
import brainIcon from '@/assets/brain-minimal.png';

const AIModelSummary = () => {
  const navigate = useNavigate();
  const data = aiModelGameData.summary_slide;

  const handleNext = () => {
    navigate('/model-utility');
  };

  const correctComponents = aiModelGameData.interactive_game_slide.components.filter(c => c.is_correct);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 relative overflow-hidden">
      {/* Logo */}
      <div className="absolute top-8 left-8 z-10">
        <img src={brainIcon} alt="Brain Logo" className="h-12 w-12" />
      </div>

      {/* Label */}
      <div className="absolute top-8 right-8 z-10">
        <span className="text-sm font-mono text-muted-foreground bg-background/80 px-3 py-1 rounded-full border">
          ai_model_complete
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-52 md:pt-52">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Terminal */}
          <div className="mb-8">
            <div className="text-muted-foreground font-mono text-sm">
              <span className="text-muted-foreground">&gt;</span> model assembly complete...
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-8">
            {data.slide_title}
          </h1>

          {/* Visual Model Core */}
          <div className="mb-8">
            <div className="w-80 h-80 mx-auto border-4 border-primary rounded-lg bg-primary/5 p-6">
              <div className="grid grid-cols-2 gap-4 w-full h-full">
                {correctComponents.map((component, index) => (
                  <div
                    key={component.id}
                    className="border-2 border-green-500 bg-green-500/10 rounded-lg flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="w-8 h-8 bg-green-500 rounded-lg mx-auto mb-1 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">✓</span>
                      </div>
                      <span className="text-xs font-medium text-foreground">{component.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Text */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="text-lg md:text-xl text-foreground leading-relaxed whitespace-pre-line">
              {data.summary_text}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIModelSummary;