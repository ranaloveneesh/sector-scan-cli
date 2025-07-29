import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { AIBrainGame } from '@/components/ui/ai-brain-game';

const AIModelsMinigame = () => {
  const navigate = useNavigate();
  const { surveyData } = useSurvey();

  const getTitleBasedOnAnswer = () => {
    const previousAnswer = surveyData.aiAgentKnowledge;
    
    switch (previousAnswer) {
      case "A way to store and retrieve data 📦":
        return "Close, but there's much more to it. Try to guess what...🧐";
      case "A trained mathematical structure that learns patterns from data 🧮":
        return "Solid answer. Now let's see if you can piece it together 🗿";
      case "An automation script with lots of IF/THEN rules ☝️":
        return "Old-school thinking, but modern models are built differently. Try for yourself 🤗";
      case "Not sure, I just use the output 😅":
        return "Fair enough, but let's fix that. You're about to build your first AI model 😼";
      default:
        return "Let's explore what AI models really are.";
    }
  };

  const handleComplete = () => {
    navigate('/aiagents');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with dynamic title */}
      <div className="flex-shrink-0 p-6 text-center border-b">
        <h1 className="text-3xl font-bold text-foreground">
          {getTitleBasedOnAnswer()}
        </h1>
      </div>
      
      {/* Game Container */}
      <div className="flex-1 flex items-center justify-center p-6">
        <AIBrainGame onComplete={handleComplete} />
      </div>
    </div>
  );
};

export default AIModelsMinigame;