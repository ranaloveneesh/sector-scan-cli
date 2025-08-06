import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { LLMNetwork } from '@/components/ui/llm-network';

const LLMs = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();

  const questionData = {
    id: "llms",
    title: "Which of these AI models have you tried?",
    subtitle: "select all that apply",
    options: [
      "ChatGPT",
      "Claude",
      "Gemini",
      "Grok",
      "Mistral",
      "Llama",
      "Qwen",
      "DeepSeek",
      "Phi"
    ],
    ui: {
      logo_position: "top-left",
      animation_style: "terminal",
      animation_text: "analyzing LLM knowledge...",
      next_button_color: "primary",
      selector_style: "modern",
      label: "large_language_models"
    },
    validation: {
      required: true,
      error_message: "Please select at least one option."
    }
  };

  const handleSubmit = (selectedOptions: string[]) => {
    updateSurveyData('llmKnowledge', selectedOptions.join(', '));
    navigate('/aiagents');
  };

  return (
    <LLMNetwork
      data={questionData}
      onSubmit={handleSubmit}
    />
  );
};

export default LLMs;