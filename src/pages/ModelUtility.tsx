import { ModelUtilityQuestion } from '@/components/ui/model-utility-question';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';

const ModelUtility = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();
  const questionData = {
    id: "Q7_model_utility",
    type: "question",
    code_label: "model_utility",
    code_label_color: "#000000",
    title: "How are you currently leveraging AI models to support your team?",
    subtitle: "Pick the statement that best reflects your current usage.",
    question_type: "multi_choice",
    options_style: "block",
    options: [
      "To generate content or insights on demand",
      "To assist in decision-making",
      "To automate responses or actions",
      "We've explored models, but they're not in daily use yet",
      "We're not using any AI models right now"
    ],
    ui: {
      logo_position: "top_right",
      animation_style: "terminal_simulation",
      animation_text: "model_utility",
      next_button_color: "#5CE1E6",
      selector_style: "neon_block_brackets",
      label: "model_utility"
    },
    validation: {
      required: true,
      error_message: "Please select your current AI model usage."
    }
  };

  const handleSubmit = (selectedOptions: string[]) => {
    console.log('Selected model utility:', selectedOptions);
    updateSurveyData('modelUtility', selectedOptions[0]);
    navigate('/data-accessibility');
  };

  return <ModelUtilityQuestion data={questionData} onSubmit={handleSubmit} />;
};

export default ModelUtility;