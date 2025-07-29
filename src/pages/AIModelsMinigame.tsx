import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { CompanySizeQuestion } from '@/components/ui/company-size-question';

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

  const questionData = {
    id: "aimodels-minigame",
    title: getTitleBasedOnAnswer(),
    ui: {
      logo_position: "top-left",
      animation_style: "terminal",
      animation_text: "explaining AI models...",
      next_button_color: "primary",
      selector_style: "modern",
      label: "ai_models_test"
    },
    isStatic: true,
    showBrainGame: true
  };

  const handleSubmit = () => {
    navigate('/aiagents');
  };

  return (
    <CompanySizeQuestion
      data={questionData}
      onSubmit={handleSubmit}
    />
  );
};

export default AIModelsMinigame;