import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { CompanySizeQuestion } from '@/components/ui/company-size-question';

const RagPipelineExplained = () => {
  const navigate = useNavigate();
  const { surveyData } = useSurvey();

  const getTitleBasedOnAnswer = () => {
    const previousAnswer = surveyData.ragPipelineKnowledge;
    
    switch (previousAnswer) {
      case "It's a tool that scrapes data from websites":
        return "Close, but RAG goes beyond simple data scraping.";
      case "A method to teach AI how to generate images":
        return "Not quite — RAG is actually about enhancing text generation with external data.";
      case "A system where an AI model retrieves external data before generating a response":
        return "Exactly right! You understand what makes RAG so powerful.";
      case "I've seen it mentioned, but not sure what it means":
        return "Perfect timing to learn — RAG is becoming essential in AI.";
      case "Nope, this is new to me":
        return "Welcome to RAG — you're about to discover a game-changing AI technique.";
      default:
        return "Let's explore what RAG pipelines really are.";
    }
  };

  const questionData = {
    id: "ragpipeline-explained",
    title: getTitleBasedOnAnswer(),
    ui: {
      logo_position: "top-left",
      animation_style: "terminal",
      animation_text: "explaining RAG pipelines...",
      next_button_color: "primary",
      selector_style: "modern",
      label: "rag_pipeline_explained"
    },
    isStatic: true
  };

  const handleSubmit = () => {
    navigate('/'); // Update to next slide when created
  };

  return (
    <CompanySizeQuestion
      data={questionData}
      onSubmit={handleSubmit}
    />
  );
};

export default RagPipelineExplained;