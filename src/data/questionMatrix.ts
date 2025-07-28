// 9 industries × 9 departments = 81 unique question combinations for slide 16
export interface QuestionData {
  title: string;
  subtitle: string;
  options: string[];
  animation_text: string;
}

export const questionMatrix: Record<string, Record<string, QuestionData>> = {
  "Aerospace": {
    "Executive": {
      title: "How do you prioritize aerospace innovation?",
      subtitle: "Select your strategic focus.",
      options: ["R&D Investment", "Market Expansion", "Regulatory Compliance", "Cost Optimization"],
      animation_text: "> analyzing aerospace executive priorities..."
    },
    "Operations": {
      title: "What's your main operational challenge in aerospace?",
      subtitle: "Select your primary concern.",
      options: ["Supply Chain", "Quality Control", "Safety Standards", "Production Efficiency"],
      animation_text: "> scanning aerospace operations..."
    },
    "Engineering": {
      title: "Which aerospace engineering area needs improvement?",
      subtitle: "Select your focus area.",
      options: ["Propulsion Systems", "Avionics", "Structural Design", "Testing Protocols"],
      animation_text: "> analyzing aerospace engineering..."
    },
    "Business": {
      title: "What's your aerospace business priority?",
      subtitle: "Select your market focus.",
      options: ["Contract Bidding", "Client Relations", "Market Analysis", "Partnership Development"],
      animation_text: "> evaluating aerospace business..."
    },
    "Product": {
      title: "Which aerospace product area drives your strategy?",
      subtitle: "Select your development focus.",
      options: ["Aircraft Design", "Component Innovation", "System Integration", "Performance Optimization"],
      animation_text: "> mapping aerospace products..."
    },
    "Research": {
      title: "What's your aerospace research focus?",
      subtitle: "Select your research area.",
      options: ["Materials Science", "Aerodynamics", "Propulsion Research", "Safety Analysis"],
      animation_text: "> scanning aerospace research..."
    },
    "Compliance": {
      title: "Which aerospace compliance area needs attention?",
      subtitle: "Select your regulatory focus.",
      options: ["FAA Regulations", "International Standards", "Safety Certifications", "Environmental Compliance"],
      animation_text: "> checking aerospace compliance..."
    },
    "Support": {
      title: "What aerospace support function needs improvement?",
      subtitle: "Select your support area.",
      options: ["Technical Support", "Training Programs", "Documentation", "Customer Service"],
      animation_text: "> optimizing aerospace support..."
    },
    "Finance": {
      title: "What's your aerospace financial priority?",
      subtitle: "Select your financial focus.",
      options: ["Project Budgeting", "Cost Analysis", "Investment Planning", "Risk Management"],
      animation_text: "> calculating aerospace finances..."
    }
  },
  // TODO: Add remaining 8 industries with their 9 departments each
  // This structure will hold all 81 combinations
  "Defense": {
    // 9 departments for Defense
    "Executive": {
      title: "How do you approach defense strategy?",
      subtitle: "Select your strategic priority.",
      options: ["National Security", "Technology Advancement", "Budget Allocation", "International Relations"],
      animation_text: "> analyzing defense strategy..."
    },
    // ... continue for other 8 departments
  },
  // Continue for Software, Consulting, Banking, Robotics, Biotech, Sustainability, Insurance
};

export const getQuestionForCombination = (industry: string, department: string): QuestionData | null => {
  return questionMatrix[industry]?.[department] || null;
};