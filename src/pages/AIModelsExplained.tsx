import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { CompanySizeQuestion } from '@/components/ui/company-size-question';

const AIModelsExplained = () => {
  const navigate = useNavigate();
  const { surveyData } = useSurvey();

  const getTitleBasedOnAnswer = () => {
    const previousAnswer = surveyData.aiAgentKnowledge;
    
    switch (previousAnswer) {
      case "A way to store and retrieve data 📦":
        return "Now you see how AI models really work — they're pattern recognition engines.";
      case "A trained mathematical structure that learns patterns from data 🧮":
        return "Perfect! You had it right — and now you've seen it in action.";
      case "An automation script with lots of IF/THEN rules ☝️":
        return "See the difference? Modern AI learns patterns, not rigid rules.";
      case "Not sure, I just use the output 😅":
        return "Now you know what's happening under the hood when you use AI.";
      default:
        return "Understanding AI models helps you use them more effectively.";
    }
  };

  const questionData = {
    id: "aimodels-explained",
    title: getTitleBasedOnAnswer(),
    ui: {
      logo_position: "top-left",
      animation_style: "terminal",
      animation_text: "AI model explanation complete...",
      next_button_color: "#5CE1E6",
      selector_style: "modern",
      label: "ai_models_explained"
    },
    isStatic: true
  };

  const handleSubmit = () => {
    navigate('/LLMs');
  };

  return (
    <CompanySizeQuestion
      data={questionData}
      onSubmit={handleSubmit}
    />
  );
};

export default AIModelsExplained;