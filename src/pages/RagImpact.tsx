import { CompanySizeQuestion } from '@/components/ui/company-size-question';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';

const RagImpact = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();
  const questionData = {
    id: "Q9_rag_impact",
    type: "question",
    code_label: "rag_impact",
    code_label_color: "#000000",
    title: "What would change if your company's knowledge was always at your fingertips?",
    subtitle: "Imagine answers, insights, and documents served in seconds.",
    question_type: "multi_choice",
    maxSelections: 3,
    minSelections: 1,
    options_style: "block",
    options: [
      "Faster onboarding and internal training",
      "Better decision-making with context",
      "Reduced time spent searching for info",
      "Improved client communication",
      "I don't think it would help much"
    ],
    ui: {
      logo_position: "top_right",
      animation_style: "terminal_simulation",
      animation_text: "rag_impact",
      next_button_color: "#5CE1E6",
      selector_style: "neon_block_brackets",
      label: "rag_impact"
    },
    validation: {
      required: true,
      error_message: "Please select how RAG would help your team."
    }
  };

  const handleSubmit = (selectedOptions: string[]) => {
    console.log('Selected RAG impact:', selectedOptions);
    updateSurveyData('ragImpact', selectedOptions.join(', '));
    navigate('/agent-utility');
  };

  return <CompanySizeQuestion data={questionData} onSubmit={handleSubmit} />;
};

export default RagImpact;