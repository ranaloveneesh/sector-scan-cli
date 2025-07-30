import { CompanySizeQuestion } from '@/components/ui/company-size-question';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';

const DataAccessibility = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();
  const questionData = {
    id: "Q8_data_access",
    type: "question",
    code_label: "data_access",
    code_label_color: "#000000",
    title: "How would you describe your team's access to knowledge and data?",
    subtitle: "Think about how easy it is for people (or systems) to find what they need.",
    question_type: "multi_choice",
    options_style: "block",
    options: [
      "We have centralized and structured knowledge — easy to use",
      "Some systems are connected, others are scattered",
      "Most of our knowledge is unstructured or in silos",
      "We rely on manual retrieval and human knowledge holders",
      "No idea, not my area"
    ],
    ui: {
      logo_position: "top_right",
      animation_style: "terminal_simulation",
      animation_text: "data_access",
      next_button_color: "#5CE1E6",
      selector_style: "neon_block_brackets",
      label: "data_access"
    },
    validation: {
      required: true,
      error_message: "Please select your data accessibility status."
    }
  };

  const handleSubmit = (selectedOptions: string[]) => {
    console.log('Selected data accessibility:', selectedOptions);
    updateSurveyData('dataAccessibility', selectedOptions[0]);
    navigate('/rag-impact');
  };

  return <CompanySizeQuestion data={questionData} onSubmit={handleSubmit} />;
};

export default DataAccessibility;