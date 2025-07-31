interface OptionCategory {
  category_title: string;
  options: string[];
}

interface AgentUtilityOptionsData {
  option_categories: OptionCategory[];
  evergreen_options: string[];
}

export const agentUtilityOptions: AgentUtilityOptionsData = {
  "option_categories": [
    {
      "category_title": "Analysis & Reporting",
      "options": [
        "Continuous Data Analysis & Reporting",
        "Proactive Opportunity/Risk Finding"
      ]
    },
    {
      "category_title": "Automation & Execution",
      "options": [
        "Workflow & Process Automation",
        "System & Compliance Monitoring"
      ]
    },
    {
      "category_title": "Planning & Strategy",
      "options": [
        "Scenario Planning & Simulation",
        "Project & Resource Management"
      ]
    },
    {
      "category_title": "Communication & Creation",
      "options": [
        "Drafting & Managing Communications",
        "Stakeholder & Client Interaction"
      ]
    }
  ],
  "evergreen_options": [
    "Other (please specify)",
    "I don't believe AI agents could realistically take over tasks in my team."
  ]
};