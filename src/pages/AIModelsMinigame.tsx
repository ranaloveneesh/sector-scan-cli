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
      case "A chatbot":
        return "That's a common assumption — but AI agents go way beyond chatbots.";
      case "A tool that automates repetitive tasks":
        return "You're partially right — agents often automate things, but there's more to it.";
      case "A software entity that can perceive, reason, and act autonomously":
        return "Exactly. You nailed it — that's what makes agents different from regular tools.";
      case "No idea, but I'm curious":
        return "Curiosity is the perfect place to start — let's break it down together.";
      case "I thought I did... now I'm not so sure 😅":
        return "Love the honesty — you're definitely not alone. Let's clear it up.";
      default:
        return "Let's explore what AI agents really are.";
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
      label: "ai_models_minigame"
    },
    isStatic: true
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