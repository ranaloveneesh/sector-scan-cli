import { CompanySizeQuestion } from '@/components/ui/company-size-question';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';

const AgentIntent = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();
  const questionData = {
    id: "Q11_agent_intent",
    type: "question",
    code_label: "agent_intent",
    code_label_color: "#000000",
    title: "What would be your #1 reason to adopt an AI agent?",
    subtitle: "Select the goal that matters most to you.",
    question_type: "multi_choice",
    options_style: "block",
    options: [
      "Save time on repetitive tasks",
      "Reduce manual errors",
      "Free up human resources",
      "Speed up workflows",
      "Deliver faster results to clients",
      "We're already building toward this"
    ],
    ui: {
      logo_position: "top_right",
      animation_style: "terminal_simulation",
      animation_text: "agent_intent",
      next_button_color: "#5CE1E6",
      selector_style: "neon_block_brackets",
      label: "agent_intent"
    },
    validation: {
      required: true,
      error_message: "Please select your main reason for adopting AI agents."
    }
  };

  const handleSubmit = (selectedOptions: string[]) => {
    console.log('Selected agent intent:', selectedOptions);
    updateSurveyData('agentIntent', selectedOptions[0]);
    navigate('/agent-timeline');
  };

  return <CompanySizeQuestion data={questionData} onSubmit={handleSubmit} />;
};

export default AgentIntent;