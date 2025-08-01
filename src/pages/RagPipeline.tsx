import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { CompanySizeQuestion } from '@/components/ui/company-size-question';

const RagPipeline = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();

  const questionData = {
    id: "slide6",
    title: "Have you ever heard of a RAG pipeline?",
    subtitle: "select your answer",
    options: [
      "It's a tool that scrapes data from websites",
      "A method to teach AI how to generate images", 
      "A system where an AI model retrieves external data before generating a response",
      "I've seen it mentioned, but not sure what it means",
      "Nope, this is new to me"
    ],
    ui: {
      logo_position: "top-left",
      animation_style: "terminal",
      animation_text: "analyzing RAG knowledge...",
      next_button_color: "#5CE1E6",
      selector_style: "modern",
      label: "rag_pipeline"
    },
    validation: {
      required: true,
      error_message: "Please select an option."
    }
  };

  const handleSubmit = (selectedOptions: string[]) => {
    updateSurveyData('ragPipelineKnowledge', selectedOptions[0]);
    navigate('/rag-demo');
  };

  return (
    <CompanySizeQuestion
      data={questionData}
      onSubmit={handleSubmit}
    />
  );
};

export default RagPipeline;