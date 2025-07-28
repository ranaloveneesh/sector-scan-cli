import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { CompanySizeQuestion } from '@/components/ui/company-size-question';

const Slide5 = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();

  const questionData = {
    id: "slide5",
    ui: {
      logo_position: "top-left",
      animation_style: "terminal",
      animation_text: "explaining AI agents...",
      next_button_color: "primary",
      selector_style: "modern",
      label: "ai_agent_explained"
    },
    isStatic: true
  };

  const handleSubmit = () => {
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