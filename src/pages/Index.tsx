import { IndustryQuestion } from '@/components/ui/industry-question';

const Index = () => {
  const questionData = {
    id: "Q1_user_industry",
    type: "question",
    code_label: "user_industry",
    code_label_color: "#5CE1E6",
    title: "What's your industry?",
    subtitle: "Select the field you operate in.",
    question_type: "multi_choice",
    options_style: "block",
    options: [
      "Aerospace",
      "Defense", 
      "Software",
      "Consulting",
      "Banking",
      "Robotics",
      "Biotech",
      "Sustainability",
      "Insurance"
    ],
    ui: {
      logo_position: "top_right",
      animation_style: "terminal_simulation",
      animation_text: "> scanning your sector...",
      next_button_color: "#5CE1E6",
      selector_style: "neon_block_brackets"
    },
    validation: {
      required: true,
      error_message: "Please select at least one industry."
    }
  };

  const handleSubmit = (selectedOptions: string[]) => {
    console.log('Selected industries:', selectedOptions);
    // Handle the submission here - could navigate to next question, save to state, etc.
  };

  return <IndustryQuestion data={questionData} onSubmit={handleSubmit} />;
};

export default Index;
