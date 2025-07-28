import { DepartmentQuestion } from '@/components/ui/department-question';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';

const Department = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();
  const questionData = {
    id: "Q3_user_department",
    type: "question",
    code_label: "user_department",
    code_label_color: "#000000",
    title: "What's your department?",
    subtitle: "Select your functional area.",
    question_type: "multi_choice",
    options_style: "block",
    options: [
      "Executive",
      "Operations",
      "Engineering",
      "Business",
      "Product",
      "Research",
      "Compliance",
      "Support",
      "Finance"
    ],
    ui: {
      logo_position: "top_right",
      animation_style: "terminal_simulation",
      animation_text: "> identifying your role...",
      next_button_color: "#5CE1E6",
      selector_style: "neon_block_brackets"
    },
    validation: {
      required: true,
      error_message: "Please select your department."
    }
  };

  const handleSubmit = (selectedOptions: string[]) => {
    console.log('Selected department:', selectedOptions);
    updateSurveyData('department', selectedOptions[0]);
    navigate('/slide4');
  };

  return <DepartmentQuestion data={questionData} onSubmit={handleSubmit} />;
};

export default Department;