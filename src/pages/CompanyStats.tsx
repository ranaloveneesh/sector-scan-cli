import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';
import { CompanySizeQuestion } from '@/components/ui/company-size-question';

const CompanyStats = () => {
  const navigate = useNavigate();
  const { surveyData } = useSurvey();

  const getContentBasedOnAnswer = () => {
    const selectedLLMs = surveyData.llmKnowledge || '';
    const llmCount = selectedLLMs.split(', ').filter(llm => llm.trim() !== '').length;
    
    if (llmCount === 1) {
      return {
        title: "You've picked one — great start.",
        subtitle: "But with so many new models being released, it's worth knowing what else is out there — and what each one does best. Here's a quick comparison of the 4 most widely used models today. It might open up some options for your future AI stack.",
        description: "But with so many new models being released, it's worth knowing what else is out there — and what each one does best. Here's a quick comparison of the 4 most widely used models today. It might open up some options for your future AI stack."
      };
    } else if (llmCount >= 2 && llmCount <= 5) {
      return {
        title: "You're already familiar with some of the key players.",
        subtitle: "But even among the most used models, the differences can be subtle — and they really matter when building agents. Here's a quick comparison to help you understand what each one excels at.",
        description: "But even among the most used models, the differences can be subtle — and they really matter when building agents. Here's a quick comparison to help you understand what each one excels at."
      };
    } else if (llmCount >= 6 && llmCount <= 10) {
      return {
        title: "Impressive — looks like you're pretty up to date.",
        subtitle: "As you probably know, when it comes to building with agents, model selection is fundamental and it depends entirely on the job to be done. Here's a side-by-side breakdown to make that choice easier.",
        description: "As you probably know, when it comes to building with agents, model selection is fundamental and it depends entirely on the job to be done. Here's a side-by-side breakdown to make that choice easier."
      };
    } else {
      return {
        title: "Let's explore what makes each LLM unique.",
        subtitle: "Understanding the strengths of different models will help you make better choices for your AI projects.",
        description: "Understanding the strengths of different models will help you make better choices for your AI projects."
      };
    }
  };

  const content = getContentBasedOnAnswer();
  
  const questionData = {
    id: "company-stats",
    title: content.title,
    subtitle: content.subtitle,
    description: content.description,
    ui: {
      logo_position: "top-left",
      animation_style: "terminal",
      animation_text: "analyzing company statistics...",
      next_button_color: "primary",
      selector_style: "modern",
      label: "company_stats"
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

export default CompanyStats;