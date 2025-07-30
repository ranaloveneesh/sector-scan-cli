import { AgentUtilityQuestion } from '@/components/ui/agent-utility-question';
import { useNavigate } from 'react-router-dom';
import { useSurvey } from '@/contexts/SurveyContext';

const AgentUtility = () => {
  const navigate = useNavigate();
  const { updateSurveyData } = useSurvey();
  const questionData = {
    id: "Q10_agent_utility",
    type: "question",
    code_label: "agent_utility",
    code_label_color: "#000000",
    title: "What tasks could AI agents realistically take over in your team?",
    subtitle: "Select up to 3 tasks where agents could reduce effort or time.",
    question_type: "multi_choice",
    options_style: "block",
    maxSelections: 3,
    options: [
      "Data processing and report generation",
      "Customer/internal support",
      "Email or meeting preparation",
      "Tool coordination and workflow execution",
      "Monitoring and alerting",
      "We already use agents for some of these",
      "I'm not sure yet"
    ],
    ui: {
      logo_position: "top_right",
      animation_style: "terminal_simulation",
      animation_text: "agent_utility",
      next_button_color: "#5CE1E6",
      selector_style: "neon_block_brackets",
      label: "agent_utility"
    },
    validation: {
      required: true,
      error_message: "Please select up to 3 tasks for AI agents."
    }
  };

  const handleSubmit = (selectedOptions: string[]) => {
    console.log('Selected agent utility:', selectedOptions);
    updateSurveyData('agentUtility', selectedOptions.join(', '));
    navigate('/agent-intent');
  };

  return <AgentUtilityQuestion data={questionData} onSubmit={handleSubmit} />;
};

export default AgentUtility;