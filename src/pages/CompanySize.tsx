import { CompanySizeQuestion } from '@/components/ui/company-size-question';

const CompanySize = () => {
  const questionData = {
    id: "Q2_company_size",
    type: "question",
    code_label: "company_size",
    code_label_color: "#000000",
    title: "What's the size of your company?",
    subtitle: "Select your team size.",
    question_type: "multi_choice",
    options_style: "block",
    options: [
      "Just me / Solo founder",
      "2–10 people",
      "11–50 people",
      "51–200 people",
      "201–1000 people",
      "1000+ people"
    ],
    ui: {
      logo_position: "top_right",
      animation_style: "terminal_simulation",
      animation_text: "> calculating team size...",
      next_button_color: "#5CE1E6",
      selector_style: "neon_block_brackets"
    },
    validation: {
      required: true,
      error_message: "Please select your company size."
    }
  };

  const handleSubmit = (selectedOptions: string[]) => {
    console.log('Selected company size:', selectedOptions);
    // Handle the submission here - could navigate to next question, save to state, etc.
  };

  return <CompanySizeQuestion data={questionData} onSubmit={handleSubmit} />;
};

export default CompanySize;