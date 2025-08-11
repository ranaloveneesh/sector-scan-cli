import { CompanySizeQuestion } from '@/components/ui/company-size-question';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';

const AgentTimeline = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();
  const questionData = {
    id: "Q12_agent_timeline",
    type: "question",
    code_label: "agent_timeline",
    code_label_color: "#000000",
    title: "When do you expect to deploy your first AI agent?",
    subtitle: "Think realistically based on your team's roadmap.",
    question_type: "multi_choice",
    options_style: "block",
    options: [
      "We're already testing one",
      "Within the next 3 months",
      "3–6 months",
      "6–12 months",
      "Not before next year",
      "We have no current plan"
    ],
    ui: {
      logo_position: "top_right",
      animation_style: "terminal_simulation",
      animation_text: "agent_timeline",
      next_button_color: "#5CE1E6",
      selector_style: "neon_block_brackets",
      label: "agent_timeline"
    },
    validation: {
      required: true,
      error_message: "Please select your AI agent deployment timeline."
    }
  };

  const handleSubmit = (selectedOptions: string[]) => {
    console.log('Selected agent timeline:', selectedOptions);
    updateSurveyData('agentTimeline', selectedOptions[0]);
    navigate('/ai-knowledge-assessment');
  };

  return <CompanySizeQuestion data={questionData} onSubmit={handleSubmit} />;
};

export default AgentTimeline;