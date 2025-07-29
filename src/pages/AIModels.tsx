import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { CompanySizeQuestion } from '@/components/ui/company-size-question';

const AIModels = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();

  const questionData = {
    id: "aimodels",
    title: "What do you think defines a modern AI model?",
    subtitle: "let's test your AI knowledge",
    options: [
      "A way to store and retrieve data 📦",
      "A trained mathematical structure that learns patterns from data 🧮", 
      "An automation script with lots of IF/THEN rules ☝️",
      "Not sure, I just use the output 😅"
    ],
    ui: {
      logo_position: "top-left",
      animation_style: "terminal",
      animation_text: "evaluating user knowledge...",
      next_button_color: "primary",
      selector_style: "modern",
      label: "ai_models"
    },
    validation: {
      required: true,
      error_message: "Please select an option."
    }
  };

  const handleSubmit = (selectedOptions: string[]) => {
    updateSurveyData('aiAgentKnowledge', selectedOptions[0]);
    navigate('/aimodels-minigame');
  };

  return (
    <CompanySizeQuestion
      data={questionData}
      onSubmit={handleSubmit}
    />
  );
};

export default AIModels;