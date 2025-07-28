import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SurveyData {
  industry?: string;
  companySize?: string;
  department?: string;
  ragPipelineKnowledge?: string;
  ragPipelineExplained?: string;
  aiAgentKnowledge?: string;
  aiAgentExplained?: string;
  // Add more fields as we build more slides
}

interface SurveyContextType {
  surveyData: SurveyData;
  updateSurveyData: (field: keyof SurveyData, value: string) => void;
  getSurveyData: () => SurveyData;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [surveyData, setSurveyData] = useState<SurveyData>({});

  const updateSurveyData = (field: keyof SurveyData, value: string) => {
    setSurveyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getSurveyData = () => surveyData;

  return (
    <SurveyContext.Provider value={{ surveyData, updateSurveyData, getSurveyData }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};