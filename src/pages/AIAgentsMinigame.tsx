import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { CompanySizeQuestion } from '@/components/ui/company-size-question';

const AIAgentsMinigame = () => {
  const navigate = useNavigate();
  const { surveyData } = useSurvey();

  const getTitleBasedOnAnswer = () => {
    const previousAnswer = surveyData.aiAgentKnowledge;
    
    switch (previousAnswer) {
      case "A chatbot":
        return "Let's build an AI agent together — you'll see it's much more than a chatbot.";
      case "A tool that automates repetitive tasks":
        return "Time to build your first agent and see how it thinks autonomously.";
      case "A software entity that can perceive, reason, and act autonomously":
        return "Perfect understanding — now let's build one together.";
      case "No idea, but I'm curious":
        return "Best way to learn? Build one yourself — let's go.";
      case "I thought I did... now I'm not so sure 😅":
        return "Building one will make it crystal clear — ready?";
      default:
        return "Let's build your first AI agent together.";
    }
  };

  const questionData = {
    id: "aiagents-minigame",
    title: getTitleBasedOnAnswer(),
    ui: {
      logo_position: "top-left",
      animation_style: "terminal",
      animation_text: "initializing agent builder...",
      next_button_color: "#5CE1E6",
      selector_style: "modern",
      label: "ai_agents_minigame"
    },
    isStatic: true,
    showBrainGame: true
  };

  const handleSubmit = () => {
    navigate('/aiagent-explained');
  };

  return (
    <CompanySizeQuestion
      data={questionData}
      onSubmit={handleSubmit}
    />
  );
};

export default AIAgentsMinigame;