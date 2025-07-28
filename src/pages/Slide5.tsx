import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { CompanySizeQuestion } from '@/components/ui/company-size-question';

const Slide5 = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();

  const questionData = {
    id: "slide5",
    title: "AI Agent Explained",
    subtitle: "Select your answer.",
    options: [
      "A chatbot",
      "A tool that automates repetitive tasks", 
      "A software entity that can perceive, reason, and act autonomously",
      "No idea, but I'm curious",
      "I thought I did... now I'm not so sure 😅"
    ],
    ui: {
      logo_position: "top-left",
      animation_style: "terminal",
      animation_text: "explaining AI agents...",
      next_button_color: "primary",
      selector_style: "modern",
      label: "ai_agent_explained"
    },
    validation: {
      required: true,
      error_message: "Please select an option."
    }
  };

  const handleSubmit = (selectedOptions: string[]) => {
    updateSurveyData('aiAgentExplained', selectedOptions[0]);
    navigate('/'); // Update this to next slide when created
  };

  return (
    <CompanySizeQuestion
      data={questionData}
      onSubmit={handleSubmit}
    />
  );
};

export default Slide5;