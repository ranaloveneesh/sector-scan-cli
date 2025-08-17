import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiModelGameData } from '@/data/aiModelGameData';
import brainIcon from '@/assets/brain-minimal.png';
import { playSound } from '@/lib/sound';

const AIModelKnowledgeTest = () => {
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const data = aiModelGameData.knowledge_test_slide;

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswer(answerId);
    setShowFeedback(true);
    setIsCorrect(answerId === data.correct_answer_id);
    playSound('click');
  };

  const handleNext = () => {
    navigate('/ai-model-game');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 relative overflow-hidden">

      {/* Label */}
      <div className="absolute top-8 right-8 z-10">
        <span className="text-sm font-mono text-muted-foreground bg-background/80 px-3 py-1 rounded-full border">
          ai_model_test
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 pt-52 md:pt-52">
        <div className="w-full max-w-4xl mx-auto text-center">
          {/* Terminal */}
          <div className="mb-8">
            <div className="text-muted-foreground font-mono text-sm">
              <span className="text-muted-foreground">&gt;</span> testing knowledge...
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            {data.slide_title}
          </h1>

          {/* Question */}
          <p className="text-xl md:text-2xl text-foreground mb-8 max-w-3xl mx-auto">
            {data.question}
          </p>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-4xl mx-auto">
            {data.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={showFeedback}
                className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedAnswer === option.id
                    ? isCorrect
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-red-500 bg-red-500/10'
                    : 'border-border hover:border-primary bg-card hover:bg-card/80'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-lg">
                    {option.id.toUpperCase()}.
                  </span>
                  <span className="text-foreground">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`p-6 rounded-lg mb-8 max-w-2xl mx-auto ${
              isCorrect ? 'bg-green-500/10 border border-green-500' : 'bg-red-500/10 border border-red-500'
            }`}>
              <p className="text-foreground">
                {isCorrect ? data.feedback_correct : data.feedback_incorrect}
              </p>
            </div>
          )}

          {/* Next Button */}
          {showFeedback && (
            <button
              onClick={handleNext}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIModelKnowledgeTest;