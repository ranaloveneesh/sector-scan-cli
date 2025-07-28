import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { CompanySizeQuestion } from '@/components/ui/company-size-question';

const LLMsCompared = () => {
  const navigate = useNavigate();
  const { surveyData } = useSurvey();

  const getTitleBasedOnAnswer = () => {
    const selectedLLMs = surveyData.llmKnowledge || '';
    const llmCount = selectedLLMs.split(', ').filter(llm => llm.trim() !== '').length;
    
    if (llmCount === 0) {
      return "Let's explore what makes each LLM unique.";
    } else if (llmCount === 1) {
      return "Great choice! Here's how it compares to other leading models.";
    } else if (llmCount <= 3) {
      return "Nice selection! Here's how these models stack up against each other.";
    } else {
      return "Wow, you've tried quite a few! Here's a breakdown of the key differences.";
    }
  };

  const questionData = {
    id: "llms-compared",
    title: getTitleBasedOnAnswer(),
    ui: {
      logo_position: "top-left",
      animation_style: "terminal",
      animation_text: "comparing LLM capabilities...",
      next_button_color: "primary",
      selector_style: "modern",
      label: "llms_compared"
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

export default LLMsCompared;