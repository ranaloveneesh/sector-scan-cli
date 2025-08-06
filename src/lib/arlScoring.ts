import { SurveyData } from '@/contexts/SurveyContext';

interface ScoreResult {
  totalScore: number;
  normalizedScore: number; // 1-9 scale
  level: string;
  comment: string;
  userNumber: number;
}

// Weights for different question types
const WEIGHTS = {
  knowledge: 1,      // Basic knowledge questions
  utility: 3,        // Implementation/utility questions  
  minigame: 2        // Interactive games/tests
};

// Score mapping for different answer types
const getKnowledgeScore = (answer: string): number => {
  // For knowledge questions, higher understanding = higher score
  if (!answer) return 0;
  
  // RAG knowledge scoring
  if (answer.includes('retrieve') || answer.includes('Retrieval')) return 3;
  if (answer.includes('automated') || answer.includes('databases')) return 2;
  if (answer.includes('heard') || answer.includes('No idea')) return 0;
  
  // LLM knowledge scoring  
  if (answer.includes('transformer') || answer.includes('neural')) return 3;
  if (answer.includes('language model') || answer.includes('algorithms')) return 2;
  if (answer.includes('chatbot') || answer.includes('No idea')) return 0;
  
  // AI Agent knowledge scoring
  if (answer.includes('autonomous') || answer.includes('workflow')) return 3;
  if (answer.includes('automate') || answer.includes('tasks')) return 2;
  if (answer.includes('chatbot') || answer.includes('No idea')) return 0;
  
  return 1; // Default for other answers
};

const getUtilityScore = (answer: string): number => {
  // For utility questions, more advanced/realistic answers = higher score
  if (!answer) return 0;
  
  // Model utility scoring
  if (answer.includes('All of the above') || answer.includes('data analysis')) return 3;
  if (answer.includes('customer service') || answer.includes('content')) return 2;
  if (answer.includes('Don\'t see') || answer.includes('No current')) return 0;
  
  // Data accessibility scoring
  if (answer.includes('centralized and structured')) return 3;
  if (answer.includes('Some systems are connected')) return 2;
  if (answer.includes('unstructured') || answer.includes('manual')) return 1;
  if (answer.includes('No idea')) return 0;
  
  // RAG impact scoring
  if (answer.includes('Game-changer') || answer.includes('Significant')) return 3;
  if (answer.includes('Helpful') || answer.includes('Modest')) return 2;
  if (answer.includes('Minimal') || answer.includes('No impact')) return 0;
  
  // Agent utility scoring (multiple selections possible)
  const selections = answer.split(', ').length;
  if (selections >= 3 || answer.includes('already use')) return 3;
  if (selections === 2) return 2;
  if (selections === 1) return 1;
  
  // Agent intent scoring
  if (answer.includes('All of the above')) return 3;
  if (answer.includes('Free up human') || answer.includes('Speed up')) return 2;
  if (answer.includes('Save time') || answer.includes('Reduce errors')) return 1;
  
  // Agent timeline scoring
  if (answer.includes('already testing')) return 3;
  if (answer.includes('3 months') || answer.includes('3–6 months')) return 2;
  if (answer.includes('6–12 months')) return 1;
  if (answer.includes('next year') || answer.includes('no current plan')) return 0;
  
  return 1; // Default
};

export const calculateARLScore = (surveyData: SurveyData): ScoreResult => {
  let totalWeightedScore = 0;
  let maxPossibleScore = 0;

  // Knowledge questions (weight: 1)
  const knowledgeQuestions = [
    'ragPipelineKnowledge',
    'llmKnowledge', 
    'aiAgentKnowledge'
  ] as const;

  knowledgeQuestions.forEach(key => {
    if (surveyData[key]) {
      const score = getKnowledgeScore(surveyData[key]!);
      totalWeightedScore += score * WEIGHTS.knowledge;
      maxPossibleScore += 3 * WEIGHTS.knowledge;
    }
  });

  // Utility questions (weight: 3)
  const utilityQuestions = [
    'modelUtility',
    'dataAccessibility', 
    'ragImpact',
    'agentUtility',
    'agentIntent',
    'agentTimeline'
  ] as const;

  utilityQuestions.forEach(key => {
    if (surveyData[key]) {
      const score = getUtilityScore(surveyData[key]!);
      totalWeightedScore += score * WEIGHTS.utility;
      maxPossibleScore += 3 * WEIGHTS.utility;
    }
  });

  // Minigames would be added here if we track completion
  // For now, assume some baseline minigame engagement
  // This could be enhanced to track actual game performance
  
  // Calculate normalized score (1-9 scale)
  const percentage = maxPossibleScore > 0 ? totalWeightedScore / maxPossibleScore : 0;
  const normalizedScore = Math.max(1, Math.min(9, Math.round(1 + (percentage * 8))));

  // Generate user number (simulate growing user base starting from 47)
  const userNumber = 47 + Math.floor(Math.random() * 150); // Random between 47-197

  // Determine level and comment
  let level: string;
  let comment: string;

  if (normalizedScore >= 8) {
    level = "AI Pioneer";
    comment = "Impressive! You have a deep understanding of AI technologies and clear implementation strategies. You're well-positioned to lead AI initiatives in your organization.";
  } else if (normalizedScore >= 6) {
    level = "AI Practitioner"; 
    comment = "Great job! You have solid knowledge of AI concepts and realistic implementation plans. You're ready to start experimenting with AI solutions.";
  } else if (normalizedScore >= 4) {
    level = "AI Explorer";
    comment = "Good foundation! You understand key AI concepts but could benefit from more hands-on experience and strategic planning for implementation.";
  } else {
    level = "AI Newcomer";
    comment = "Welcome to your AI journey! There's exciting potential ahead. Consider starting with small AI experiments and building your knowledge step by step.";
  }

  return {
    totalScore: totalWeightedScore,
    normalizedScore,
    level,
    comment,
    userNumber
  };
};